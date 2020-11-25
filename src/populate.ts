import fs from "fs";
import { CherrytwistClient } from "./CherrytwistClient";
import { CtGSheetPopulator } from "./CtGSheetPopulator";
import { EnvironmentFactory } from "./util/EnvironmentFactory";

const main = async () => {
  const config = EnvironmentFactory.getEnvironmentConfig();
  const ctClient = new CherrytwistClient(config);
  ctClient.logger.info(`Cherrytwist server: ${config}`);

  // Setup for authenitcating to the CT server
  ctClient.loadAdminToken();

  // Loading data from google sheets
  const gsheetPopulator = new CtGSheetPopulator(ctClient);

  ////////// Now connect to google  /////////////////////////
  const sheetsObj = await gsheetPopulator.gsheetConnector.getSheetsObj();
  if (sheetsObj) {
    ctClient.logger.info(`[GSheet] Authentication succussful...`);
  }

  // Update the context and set the host
  const ecoverseContextVariable = "./src/data/cherrytwist-ecoverse.json";
  await ctClient.updateEcoverseContext(ecoverseContextVariable);
  await ctClient.updateHostOrganisation(
    "Cherrytwist Sample Ecoverse",
    "https://cherrytwist.org/wp-content/uploads/2020/10/cherrytwist-2.png"
  );

  await gsheetPopulator.loadChallenges("Challenges");
  await gsheetPopulator.loadTeams("Teams");
  await createGroups(ctClient);

  // Assume teams + challenges are available so load them in as needed for users + orgs
  await ctClient.ecoverseInfo.initialise(ctClient);
  await gsheetPopulator.loadOrganisations("Organisations");
  await gsheetPopulator.loadUsers("Users");
};



async function loadOpportunity(ctClient: CherrytwistClient) {
  const opportunityJsonFile = "./src/data/opportunities/earth-gas-for-bio.json";
  const opportunityJsonStr = fs.readFileSync(opportunityJsonFile).toString();
  const opportunityJson = JSON.parse(opportunityJsonStr);

  await ctClient.createOpportunity(4, opportunityJson);
}

// Load in mutations file
async function createGroups(ctClient: CherrytwistClient) {
  const groups = [
    "Team Leads",
    "Team Members",
    "Jedis",
    "Stakeholders",
    "Challenge Leads",
  ];
  ctClient.logger.info(
    `===================================================================`
  );

  ctClient.logger.info(`To create ${groups.length} ecoverse groups`);
  // Iterate over the rows
  for (let i = 0; i < groups.length; i++) {
    const groupName = groups[i];
    await ctClient.createEcoverseGroup(groupName);
  }
}

try {
  main();
} catch (error) {
  console.error(error);
}
