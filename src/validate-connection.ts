import { CherrytwistClient } from './CherrytwistClient';

const main = async () => {
  const ctClient = new CherrytwistClient({
    ecoverseID: 'Ecoverse1',
    graphqlEndpoint: 'http://localhost:4000/graphql',
    accessToken: 'notSet',
  });
  const serverVersion = await ctClient.validateConnection();
  console.log(`Cherrytwist platform version: ${serverVersion}`);
  const ecoverseExists = await ctClient.ecoverseExists();
  console.log(
    `Ecoverse '${ctClient.config.ecoverseID}' exists: ${ecoverseExists}`
  );
  if (!ecoverseExists) {
    const newEcoverse = await ctClient.createEcoverse({
      nameID: ctClient.config.ecoverseID,
    });
    console.log(`Created ecoverse: ${newEcoverse?.nameID}`);
  }
};

try {
  main();
} catch (error) {
  console.error(error);
}
