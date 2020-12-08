# Client.Lib

Library of capabilities to make it easier to interact with and populate a Cherrytwist server

## Acquire Token with Resource Owner Password Credentials flow (ROPC)

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
