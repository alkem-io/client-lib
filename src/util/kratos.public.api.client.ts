import { UserCredentials } from 'src';
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
 * export async function getApiToken(authInfo: AuthInfo): Promise<string> {
 * const authClient = new KratosPublicApiClient(authInfo.apiEndpointFactory);
 *
 * return await authClient.authenticate(authInfo.credentials);
 * }
 *
 * const main = async () => {
 *
 * const token = await getApiToken({
 *   credentials: {
 *     email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@alkem.io',
 *     password: process.env.AUTH_ADMIN_PASSWORD ?? '!Rn5Ez5FuuyUNc!',
 *   },
 *   kratosPublicApiEndpoint: process.env.AUTH_ORY_KRATOS_PUBLIC_BASE_URL ?? 'http://localhost:4433/',
 * });
 *
 * console.log(token);
 * };
 */
export class KratosPublicApiClient extends HttpClient {
  public constructor(apiEndpoint: string) {
    super(apiEndpoint);
  }

  private async getActionUrl(): Promise<string> {
    const kratosData: any = await this.instance.get(
      '/self-service/login/api',
      this.config
    );
    return await this.buildActionURI(kratosData.ui?.action);
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

  // Without this, we always get the action URI from the Kratos config (kratos.yml).
  // Essentially without this an API token can not be received cross-domain, if the application
  // using client lib can't resolve the endpoints in kratos.yml.

  private async buildActionURI(kratosActionURL: string): Promise<string> {
    const regex = '(flow=[a-zA-Z0-9-]*)';
    const found = kratosActionURL.match(regex);
    if (!found)
      throw new Error('Could not get Kratos Action URI for API flow!');

    // const actionURI = `${this.apiBaseURL}self-service/login?${found[0]}`;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const urljoin = require('url-join');

    const actionURI = urljoin(
      this.apiBaseURL,
      `self-service/login?${found[0]}`
    );
    return actionURI;
  }
}
