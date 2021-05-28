import { CherrytwistClient } from './CherrytwistClient';

const main = async () => {
  const ctClient = new CherrytwistClient({
    graphqlEndpoint: 'http://localhost:4000/graphql',
    accessToken: 'notSet',
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
