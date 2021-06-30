import { AuthInfo } from 'src';
import { AlkemioClient } from './AlkemioClient';
import * as dotenv from 'dotenv';

const main = async () => {
  dotenv.config();

  const ctClient = new AlkemioClient({
    graphqlEndpoint:
      process.env.GRAPHQL_ENDPOINT ?? 'http://localhost:4455/graphql',
  });
  console.log(await ctClient.isAuthenticationEnabled());
  ctClient.config.authInfo = await getAuthInfo();

  await ctClient.enableAuthentication();

  const serverVersion = await ctClient.validateConnection();
  console.log(`Alkemio platform version: ${serverVersion}`);

  const ecoverseID = 'Test';
  const ecoverseExists = await ctClient.ecoverseExists(ecoverseID);
  console.log(`Ecoverse '${ecoverseID}' exists: ${ecoverseExists}`);
};

async function getAuthInfo(): Promise<AuthInfo | undefined> {
  return {
    credentials: {
      email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@alkem.io',
      password: process.env.AUTH_ADMIN_PASSWORD ?? '!Rn5Ez5FuuyUNc!',
    },
    apiEndpointFactory: () => {
      return 'http://localhost:4433/';
    },
  };
}

try {
  main();
} catch (error) {
  console.error(error);
}
