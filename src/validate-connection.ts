import { AlkemioClient } from './AlkemioClient';
import * as dotenv from 'dotenv';
import { AuthInfo } from 'src';
import { log, LOG_LEVEL } from './util/logger';

const main = async () => {
  dotenv.config();

  const loggingEnabled = process.env.LOGGING_ENABLED === 'true' ?? false;
  const alkemioClient = new AlkemioClient({
    apiEndpointPrivateGraphql:
      process.env.API_ENDPOINT_PRIVATE_GRAPHQL ??
      'http://localhost:3000/api/private/non-interactive/graphql',
    loggingEnabled: loggingEnabled,
  });
  alkemioClient.config.authInfo = {
    credentials: {
      email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@alkem.io',
      password: process.env.AUTH_ADMIN_PASSWORD ?? '!Rn5Ez5FuuyUNc!',
    },
    kratosPublicApiEndpoint:
      'http://localhost:3000/identity/ory/kratos/public/',
  } as AuthInfo;

  await alkemioClient.enableAuthentication();

  const serverVersion = await alkemioClient.validateConnection();
  log(`Alkemio platform version: ${serverVersion}`, LOG_LEVEL.INFO);

  const hubID = 'eco1';
  const hubExists = await alkemioClient.hubExists(hubID);
  log(`Hub '${hubID}' exists: ${hubExists}`, LOG_LEVEL.INFO);
};

try {
  main();
} catch (error) {
  console.error(error);
}
