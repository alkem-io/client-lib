import dotenv from 'dotenv';
import { AlkemioClientConfig } from 'src/config/alkemio-client-config';

export const createConfigUsingEnvVars = (): AlkemioClientConfig => {
  dotenv.config();

  const server =
    process.env.API_ENDPOINT_PRIVATE_GRAPHQL ||
    'http://localhost:3000/api/private/non-interactive/graphql';

  return {
    apiEndpointPrivateGraphql: server,
    authInfo: {
      credentials: {
        email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@alkem.io',
        password: process.env.AUTH_ADMIN_PASSWORD ?? 'test',
      },
      kratosPublicApiEndpoint:
        'http://localhost:3000/identity/ory/kratos/public/',
    },
  };
};
