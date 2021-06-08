import { UserCredentials } from './types';
import { KratosPublicApiClient } from './util/kratos.public.api.client';

export async function getApiToken(
  credentials: UserCredentials
): Promise<string> {
  const apiEndpointConfig = () =>
    process.env.AUTH_ORY_KRATOS_PUBLIC_BASE_URL ?? 'http://localhost:4433/';

  const authClient = new KratosPublicApiClient(apiEndpointConfig);

  return await authClient.authenticate(credentials);
}

const main = async () => {
  const token = await getApiToken({
    email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@cherrytwist.org',
    password: process.env.AUTH_ADMIN_PASSWORD ?? '!Rn5Ez5FuuyUNc!',
  });

  console.log(token);
};

try {
  main();
} catch (error) {
  console.error(error);
}
