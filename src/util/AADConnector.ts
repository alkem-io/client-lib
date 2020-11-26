import winston from "winston";

const { promisify } = require("util");

var fs = require("fs");
var adal = require("adal-node");

var AuthenticationContext = adal.AuthenticationContext;

export class AADConnector {
  TENANT = "524e761c-d162-4fdf-ab43-2855246d986c";
  AUTHORITY_HOST_URL = "https://login.microsoftonline.com";
  CLIENT_ID = "505041fc-fca2-4a74-88ee-6d50a6417e38";
  CLIENT_SECRET: string = "";

  AAD_API_SCOPE =
    "Directory.AccessAsUser.All Directory.ReadWrite.All User.ReadWrite.All";

  authResponse: any = "";
  logger: any;

  constructor(logger:any) {
    require("dotenv").config();
    this.logger = logger;
    const tenantID = process.env.AAD_TENANT;
    if (tenantID) this.TENANT = tenantID;

    const clientID = process.env.AAD_CLIENT;
    if (clientID) this.CLIENT_ID = clientID;

    const clientSecret = process.env.AAD_CLIENT_SECRET;
    if (clientSecret) {
      this.CLIENT_SECRET = clientSecret;
    } else {
      throw new Error("Client secret not specified");
    }
  }

  turnOnLogging() {
    var log = adal.Logging;
    var logger = this.logger;
    log.setLoggingOptions({
      level: log.LOGGING_LEVEL.VERBOSE,
      log: function (_level: any, message: any, error: any) {
        logger.info(message);
        if (error) {
          logger.error(error);
        }
      },
    });
  }

  async connect(): Promise<Boolean> {
    const authorityUrl = `${this.AUTHORITY_HOST_URL}/${this.TENANT}`;

    const resource = "00000002-0000-0000-c000-000000000000";

    this.turnOnLogging();

    const context = new AuthenticationContext(authorityUrl);

    var obj = this;
    function getAsyncData(
      obj: any,
      resource: any,
      clientID: string,
      clientSecret: string
    ) {
      return new Promise(function (resolve, reject) {
        context.acquireTokenWithClientCredentials(
          resource,
          clientID,
          clientSecret,
          function (error: any, result: string) {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
    }
    await getAsyncData(this, resource, this.CLIENT_ID, this.CLIENT_SECRET)
      .then(function (tokenResponse) {
        obj.authResponse = tokenResponse as string;
      })
      .catch(function (error) {
        obj.logger.error("well that didn't work: " + error.stack);
      });

    this.logger.info(`bearer token: ${this.authResponse.accessToken}`);
    return true;
  }
}