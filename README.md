# Cherrytwist Client Library
The cherrytwist-lib package is for working directly with the Cherrytwist server, primarily using the graphql based api. For more details about Cherrytwist please visit either the [webiste](http://cherrytwist.org) or [repo](http://github.com/cherrytwist/coordination).

The key capabilities of this package include:
* Managing connections to the Cherrytwist api
* Wrapping key Cherrytwist api capabilities in convenient local javascript calls, taking care of generating the graphql query / mutation and filling in parameters as appropriate
* Command line authentication with AAD, which is the Identity Provider supported out of the box by Cherrytwist platform
* Using the authentication to obtain a Token to allow command line interaction with Cherrytwist api elements that require authorisation (and thus authentication)

This package also provides a sample script, `src/test-connectopn.ts`, to demonstrate the usage of the package.

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

## Authentication: Acquire Token with Resource Owner Password Credentials flow (ROPC)

**Meet the prerequisites**:

1. The Username/Password flow is not compatible with conditional access and multi-factor authentication: As a consequence, if your app runs in an Azure AD tenant where the tenant admin requires multi-factor authentication, you cannot use this flow. Many organizations do that.
1. It works only for Work and school accounts (not MSA).
1. All scopes required by the user are already consented. Any user interaction requiring UI will break this flow.

Do the following:

1. Add the following env variables (usually in your .env):

```conf
AUTH_AAD_TENANT=[tenant (directory) ID]
AUTH_AAD_CLIENT_APP_ID= [client (application) ID]
AUTH_AAD_API_SCOPE= [API Scopes Requested for access]
AUTH_AAD_CLIENT_APP_SECRET=[App Client Secret obtained from a web app registration*]
AUTH_AAD_USER_UPN=[UPN of the user, e.g. xxx@yyy.onmicrosoft.com]
AUTH_AAD_USER_PASSWORD=[user password]

```

1. run npm run get-access-token in terminal
