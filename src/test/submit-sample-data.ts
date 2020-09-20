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
  const userMutationFile = "./src/queries/create-user";
  const userVariablesDir = './src/queries/user-variables';
  await ctClient.submitMutations(userMutationFile, userVariablesDir, 'user');

  console.log(`Loading data complete!`);
  
}

 
main().catch((error) => console.error(error))