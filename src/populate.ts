import fs from 'fs';
import { CherrytwistClient } from './CherrytwistClient';
import { EnvironmentFactory } from './util/EnvironmentFactory';

const main = async () => {
  const config = EnvironmentFactory.getEnvironmentConfig();
  const ctClient = new CherrytwistClient(config);
  ctClient.logger.info(`Cherrytwist server: ${config}`);

  // Setup for authenitcating to the CT server
  ctClient.loadAdminToken();

  // Update the context and set the host
  const ecoverseContextVariable = './src/data/cherrytwist-ecoverse.json';
  await ctClient.updateEcoverseContext(ecoverseContextVariable);
  await ctClient.updateHostOrganisation(
    'Cherrytwist Sample Ecoverse',
    'https://cherrytwist.org/wp-content/uploads/2020/10/cherrytwist-2.png'
  );

  await createGroups(ctClient);

  // Assume teams + challenges are available so load them in as needed for users + orgs
  await ctClient.ecoverseInfo.initialise(ctClient);
};

// Load in mutations file
async function createGroups(ctClient: CherrytwistClient) {
  const groupNames = [
    'Team Leads',
    'Team Members',
    'Jedis',
    'Stakeholders',
    'Challenge Leads',
  ];
  await ctClient.createGroups(groupNames);
}

try {
  main();
} catch (error) {
  console.error(error);
}
