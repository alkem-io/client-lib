import { AlkemioClient } from '../AlkemioClient';

const main = (async () => {
  const server =
    process.env.ALKEMIO_SERVER ||
    'http://localhost:3000/api/private/non-interactive/graphql';

  if (!server) {
    throw new Error('server url not provided');
  }

  const alkemioClientConfig = {
    apiEndpointPrivateGraphql: server,
    authInfo: {
      credentials: {
        email: 'admin@alkem.io',
        password: 'obichamazis',
      },
      kratosPublicApiEndpoint:
        'http://localhost:3000/identity/ory/kratos/public',
    },
  };

  const alkemioClient = new AlkemioClient(alkemioClientConfig);
  await alkemioClient.enableAuthentication();

  await alkemioClient
    .uploadFileOnReference(
      __dirname + '/org.png',
      'b5e240e1-9e89-4ae9-9ee5-c0132f88307d'
    )
    .then(console.log);
})().catch(console.error);
