import { AuthorizationClient } from './authentication/authorization.client';
import * as dotenv from 'dotenv';
import { IToken } from './contracts/token';

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

  const authClient = new AuthorizationClient(() => authConfig);
  const token = await authClient.authenticateROPC();
  console.log(token);
};

try {
  main();
} catch (error) {
  console.error(error);
}
