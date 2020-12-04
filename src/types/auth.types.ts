import { IAuthConfig } from "src/contracts/auth.config";

export type AuthConfigFactory = () => IAuthConfig;
export type TokenEndpointFactory = () => string;
