<p align="center">
    <a href="https://alkemio.foundation/" target="blank"><img src="https://alkemio.foundation/uploads/logos/alkemio-logo.svg" width="400" alt="Alkemio Logo" /></a>
</p>
<p align="center"><i>Enabling society to collaborate. Building a better future, together.</i></p>

# Alkemio Client Library
The alkemio-lib package is for working directly with the Alkemio server, primarily using the graphql based api. For more details about Alkemio please visit either the [webiste](http://alkem.io) or [repo](http://github.com/alkem-io/alkemio).

The key capabilities of this package include:
* Authentication to the Alkemio platform
* Managing connections to the Alkemio api
* Wrapping key Alkemio api capabilities in convenient local javascript calls, taking care of generating the graphql query / mutation and filling in parameters as appropriate

This package also provides a sample script, `src/validate-connection.ts`, to demonstrate the usage of the package.

Finally, this package provides a utility for carrying out performance test data population for a Alkemio server.

## Connecting to the Alkemio platform api
To use this package, first instantiate an instance of the AlkemioClient class, passing in the Alkemio server end point:
```
  const alkemioClient = new AlkemioClient({
    apiEndpointPrivateGraphql: 'http://localhost:3000/api/private/non-interactive/graphql',
  });
  ```
The alkemioClient can then be used to access the Alkemio server api using provided wrapper methods e.g.
```
  await alkemioClient.testConnection();
```
The capabilities provided by the Alkemio server api is continually expanding, so not all capabillities of the server are guaranteed to be exposed by this package. For full details of the graphql api exposed by the Alkemio server please browse the schema for the graphql api via our [Dev environment](http://dev.alkem.io/graphql).

The set of wrapper calls provided is based on needs to date; feel free to augment with new ones as the needs arise.

## Authentication
The following environment variables are used to specify the api endpoint and authentication parameters:

* API_ENDPOINT_PRIVATE_GRAPHQL=http://localhost:3000/api/private/non-interactive/graphql
* AUTH_ORY_KRATOS_PUBLIC_BASE_URL=http://localhost:3000/ory/kratos/public
* AUTH_ADMIN_EMAIL=admin@alkem.io
* AUTH_ADMIN_PASSWORD=changeMe
*
To set them, make a copy of the provided `.env.default` as `.env` and edit to reflect the target server values.

Other usages of client lib, such as from `populator`, are expected to provide the key parameters programmatically.
