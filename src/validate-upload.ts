import { AlkemioClient } from './AlkemioClient';
import * as dotenv from 'dotenv';
import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import path from 'path';

const main = async () => {
  dotenv.config();

  const config = createConfigUsingEnvVars();
  const alkemioClient = new AlkemioClient(config);

  await alkemioClient.enableAuthentication();
  const filepath = path.join(__dirname, 'image.png');
  console.log(filepath);
  const res = await alkemioClient.uploadImageOnVisual(
    filepath,
    '0d34503f-0258-45e6-b617-fb804973e61c'
  );

  console.log(JSON.stringify(res));
};

try {
  main();
} catch (error) {
  console.error(error);
}
