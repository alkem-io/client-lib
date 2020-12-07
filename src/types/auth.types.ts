import { AuthConfig } from "src/contracts/auth.config";

export type AuthConfigFactory = () => AuthConfig;
export type TokenEndpointFactory = () => string;
