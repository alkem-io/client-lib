import { ITokenError } from 'src/contracts/token.error';
import { IAuthConfig } from '../contracts/auth.config';
import { IToken } from '../contracts/token';
import { AuthConfigFactory } from '../types/auth.types';
import { AuthFlow } from '../util/auth.flow.enum';
import { HttpClient } from '../util/http.client';



export class AuthenticationClient extends HttpClient {

  authConfig : IAuthConfig;

  public constructor(authConfig: AuthConfigFactory) {
    super(() => `https://login.microsoftonline.com/${authConfig().tenant}/oauth2/v2.0/token`);
    this.authConfig = authConfig();
    };

  async authenticateROPC(): Promise<IToken | ITokenError> {
    let token;
    const params = new URLSearchParams();
    params.append('client_id', this.authConfig.clientID);
    params.append('scope', this.authConfig.scope);
    params.append('username', this.authConfig.username);
    params.append('password', this.authConfig.password);
    params.append('grant_type', AuthFlow.ROPC);

    try {
      token = await this.authenticate(params);
    } catch (error) {
      return error.response.data as ITokenError;
    }

    return token as IToken;
  }


  async authenticateClientCredentials(): Promise<IToken | ITokenError> {
    let token;
    const params = new URLSearchParams();
    params.append('client_id', this.authConfig.clientID);
    params.append('client_secret', this.authConfig.clientSecret);
    params.append('scope', this.authConfig.scope);
    params.append('grant_type', AuthFlow.CLIENT_CREDENTIALS);

    try {
      token = await this.authenticate(params);
    } catch (error) {
      return error.response.data as ITokenError;
    }

    return token as IToken;
  }
}