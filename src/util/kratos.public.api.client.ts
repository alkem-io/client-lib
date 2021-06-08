import { ApiEndpointFactory, UserCredentials } from 'src';
import { HttpClient } from './http.client';

/**
 * Http client for authentication scenarios against Ory Kratos.
 *
 *
 * Examples:
 *
 * import { UserCredentials } from './types';
 * import { KratosPublicApiClient } from './util/kratos.public.api.client';
 *
 * export async function getApiToken(
 *   credentials: UserCredentials
 * ): Promise<string> {
 *   const apiEndpointConfig = () =>
 *     process.env.AUTH_ORY_KRATOS_PUBLIC_BASE_URL ?? 'http://localhost:4433/';
 *
 *   const authClient = new KratosPublicApiClient(apiEndpointConfig);
 *
 *   return await authClient.authenticate(credentials);
 * }
 */
export class KratosPublicApiClient extends HttpClient {
  public constructor(apiEndpoint: ApiEndpointFactory) {
    super(() => apiEndpoint());
  }

  private async getActionUrl(): Promise<string> {
    const kratosData: any = await this.instance.get(
      '/self-service/login/api',
      this.config
    );
    return kratosData.ui?.action;
  }

  /**
   * [Ory Kratos login for API Clients](https://www.ory.sh/kratos/docs/self-service/flows/user-login/)
   *
   *
   * @api public
   * @param credentials - user credentials in the form of { email: ..., password: ... }
   * @returns Returns API session token from the API login flow.
   *
   * }
   **/
  async authenticate(credentials: UserCredentials): Promise<string> {
    const actionUrl = await this.getActionUrl();

    const payload = {
      password_identifier: credentials.email,
      password: credentials.password,
      method: 'password',
    };

    const kratosData: any = await this.instance.post(
      actionUrl,
      payload,
      this.config
    );
    return kratosData.session_token;
  }
}
