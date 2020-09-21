import { CherrytwistClient } from '../CherrytwistClient';

const main = async () => {

  //const endpoint = 'http://dev.cherrytwist.org/graphql'
  const endpoint = 'http://localhost:4000/graphql'
  const ctClient = new CherrytwistClient(endpoint);

  // Test can connect to the server
  const serverAvailable = await ctClient.testConnection();
  if (!serverAvailable) {
    throw new Error("Unable to connect, aborting...");
  }


  // Load in users 
  const multipleMutationsFile = "./src/test/multiple-mutations.json";
  const result = await ctClient.submitMultipleMutations(multipleMutationsFile);
  if (result) {
    console.log(`Loading data complete!`);
  }
  
}

main().catch((error) => console.error(error))