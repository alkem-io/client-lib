import { CherrytwistClient } from './CherrytwistClient';

const main = async () => {
  const ctClient = new CherrytwistClient();
  await ctClient.configureGraphqlClient({
    graphqlEndpoint: 'http://localhost:4455/graphql',
    authInfo: {
      credentials: {
        email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@cherrytwist.org',
        password: process.env.AUTH_ADMIN_PASSWORD ?? '!Rn5Ez5FuuyUNc!',
      },
      apiEndpointFactory: () => {
        return (
          process.env.AUTH_ORY_KRATOS_PUBLIC_BASE_URL ??
          'http://localhost:4433/'
        );
      },
    },
  });
  const serverVersion = await ctClient.validateConnection();
  console.log(`Cherrytwist platform version: ${serverVersion}`);

  const ecoverseID = 'Test';
  const ecoverseExists = await ctClient.ecoverseExists(ecoverseID);
  console.log(`Ecoverse '${ecoverseID}' exists: ${ecoverseExists}`);
};

try {
  main();
} catch (error) {
  console.error(error);
}
