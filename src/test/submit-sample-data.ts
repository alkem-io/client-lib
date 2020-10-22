import { CherrytwistClient } from '../CherrytwistClient';

const main = async () => {

  //const endpoint = 'http://dev.cherrytwist.org/graphql'
  const endpoint = 'http://localhost:4000/graphql'
  const ctClient = new CherrytwistClient(endpoint, null);

  // Test can connect to the server
  const serverAvailable = await ctClient.testConnection();
  if (!serverAvailable) {
    throw new Error("Unable to connect, aborting...");
  }


  // Load in users 
  const multipleMutationsFile = "./src/test/multiple-mutations.json";
  const result = await ctClient.submitMultipleMutations(multipleMutationsFile);
  if (result) {
    ctClient.logger.info(`Loading data complete!`);
  }
  
}

main().catch((error) => console.error(error))