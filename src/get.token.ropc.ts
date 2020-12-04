import { AuthenticationClient } from './authentication/authentication.client';
import { IToken } from './contracts/token';
import * as dotenv from 'dotenv';

const main = async () => {

  dotenv.config();

  const authConfig  = {
    clientID: process.env.AUTH_AAD_CLIENT_APP_ID ?? '',
    clientSecret: process.env.AUTH_AAD_CLIENT_APP_SECRET ?? '',
    scope: process.env.AUTH_AAD_API_SCOPE ?? '',
    tenant: process.env.AUTH_AAD_TENANT ?? '',
    username: process.env.AUTH_AAD_USER_UPN ?? '',
    password: process.env.AUTH_AAD_USER_PASSWORD ?? '',
  }

  const authClient = new AuthenticationClient(() => authConfig);
  const res = await authClient.authenticateROPC();
  const token = res as IToken;

  if(token)
    console.log(token.access_token);
  else
  {
    console.log(res);
  }

};

try {
  main();
} catch (error) {
  console.error(error);
}
