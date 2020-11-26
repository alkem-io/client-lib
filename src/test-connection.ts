import fs from "fs";
import { CherrytwistClient } from "./CherrytwistClient";
import { EnvironmentFactory } from "./util/EnvironmentFactory";

const main = async () => {
  const config = EnvironmentFactory.getEnvironmentConfig();
  const ctClient = new CherrytwistClient(config);
  ctClient.logger.info(`Cherrytwist server: ${config}`);

  await ctClient.testConnection();

};

try {
  main();
} catch (error) {
  console.error(error);
}
