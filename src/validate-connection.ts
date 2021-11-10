import { AlkemioClient } from './AlkemioClient';
import * as dotenv from 'dotenv';
import { AuthInfo } from 'src';

const main = async () => {
  dotenv.config();

  const ctClient = new AlkemioClient({
    graphqlEndpoint:
      process.env.GRAPHQL_ENDPOINT ?? 'http://localhost:3000/graphql',
  });
  ctClient.config.authInfo = {
    credentials: {
      email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@alkem.io',
      password: process.env.AUTH_ADMIN_PASSWORD ?? '!Rn5Ez5FuuyUNc!',
    },
    kratosPublicApiEndpoint:
      'http://localhost:3000/identity/ory/kratos/public/',
  } as AuthInfo;

  await ctClient.enableAuthentication();

  const serverVersion = await ctClient.validateConnection();
  console.log(`Alkemio platform version: ${serverVersion}`);

  const hubID = 'Test';
  const hubExists = await ctClient.hubExists(hubID);
  console.log(`Hub '${hubID}' exists: ${hubExists}`);
};

try {
  main();
} catch (error) {
  console.error(error);
}
