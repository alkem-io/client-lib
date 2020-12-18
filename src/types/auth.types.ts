import { AuthConfig } from '../contracts/auth.config';

export type AuthConfigFactory = () => AuthConfig;
export type TokenEndpointFactory = () => string;
