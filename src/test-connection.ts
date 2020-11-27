import fs from 'fs';
import { CherrytwistClient } from './CherrytwistClient';
// import { EnvironmentFactory } from './util/EnvironmentFactory';

const main = async () => {
  // TODO [ATS]
  //const config = EnvironmentFactory.getEnvironmentConfig();
  const ctClient = new CherrytwistClient({
    graphqlEndpoint: 'http://localhost:4000/graphql',
  });
  await ctClient.testConnection();
};

try {
  main();
} catch (error) {
  console.error(error);
}
