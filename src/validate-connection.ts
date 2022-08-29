import { AlkemioClient } from './AlkemioClient';
import * as dotenv from 'dotenv';
import { log, LOG_LEVEL } from './util/logger';
import { createConfigUsingEnvVars } from './util/create-config-using-envvars';

const main = async () => {
  dotenv.config();

  const config = createConfigUsingEnvVars();
  const alkemioClient = new AlkemioClient(config);

  await alkemioClient.enableAuthentication();
  const serverVersion = await alkemioClient.validateConnection();
  log(`Alkemio platform version: ${serverVersion}`, LOG_LEVEL.INFO);

  const hubID = 'eco1';
  const hubExists = await alkemioClient.hubExists(hubID);
  log(`Hub '${hubID}' exists: ${hubExists}`, LOG_LEVEL.INFO);
};

try {
  main();
} catch (error) {
  console.error(error);
}
