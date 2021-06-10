# Cherrytwist Client Library
The cherrytwist-lib package is for working directly with the Cherrytwist server, primarily using the graphql based api. For more details about Cherrytwist please visit either the [webiste](http://cherrytwist.org) or [repo](http://github.com/cherrytwist/coordination).

The key capabilities of this package include:
* Managing connections to the Cherrytwist api
* Wrapping key Cherrytwist api capabilities in convenient local javascript calls, taking care of generating the graphql query / mutation and filling in parameters as appropriate
* Command line authentication with AAD, which is the Identity Provider supported out of the box by Cherrytwist platform
* Using the authentication to obtain a Token to allow command line interaction with Cherrytwist api elements that require authorisation (and thus authentication)

This package also provides a sample script, `src/test-connection.ts`, to demonstrate the usage of the package.

Finally, this package provides a utility for carrying out performance test data population for a Cherrytwist server.

## Connecting to the Cherrytwist platform api
To use this package, first instantiate an instance of the CherrytwistClient class, passing in the Cherrytwist server end point:
```
  const ctClient = new CherrytwistClient({
    graphqlEndpoint: 'http://localhost:4000/graphql',
  });
  ```
The ctClient can then be used to access the Cherrytwist server api using provided wrapper methods e.g.
```
  await ctClient.testConnection();
```
The capabilities provided by the Cherrytwist server api is continually expanding, so not all capabillities of the server are guaranteed to be exposed by this package. For full details of the graphql api exposed by the Cherrytwist server please browse the schema for the graphql api via our [Dev environment](http://dev.cherrytwist.org/graphql).

The set of wrapper calls provided is based on needs to date; feel free to augment with new ones as the needs arise.

## Authentication
The default usage for client-lib is against an non-authenticated server, but it can also be run against a server with authentication enabled.

There is a sample program provided, `npm run get-api-token`, that reads in the following environment variables to authenticate:
* AUTH_ORY_KRATOS_PUBLIC_BASE_URL=http://localhost:4433/
* AUTH_ADMIN_EMAIL=admin@cherrytwist.org
* AUTH_ADMIN_PASSWORD=changeMe
To set these, make a copy of the provided `.env.default` as `.env` and edit to reflect the target server values.

Other usages of client lib, such as from `populator`, are expected to provide the key parameters programmatically.
