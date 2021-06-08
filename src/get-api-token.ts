import { AuthInfo } from 'src';
import { KratosPublicApiClient } from './util/kratos.public.api.client';
import * as dotenv from 'dotenv';

export async function getApiToken(authInfo: AuthInfo): Promise<string> {
  const authClient = new KratosPublicApiClient(authInfo.apiEndpointFactory);

  return await authClient.authenticate(authInfo.credentials);
}

const main = async () => {
  dotenv.config();

  const apiEndpointConfig = () =>
    process.env.AUTH_ORY_KRATOS_PUBLIC_BASE_URL ?? 'http://localhost:4433/';

  const token = await getApiToken({
    credentials: {
      email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@cherrytwist.org',
      password: process.env.AUTH_ADMIN_PASSWORD ?? '!Rn5Ez5FuuyUNc!',
    },
    apiEndpointFactory: apiEndpointConfig,
  });

  console.log(token);
};

try {
  main();
} catch (error) {
  console.error(error);
}
