export type ApiEndpointFactory = () => string;
export type UserCredentials = { email: string; password: string };
export type AuthInfo = {
  credentials: UserCredentials;
  apiEndpointFactory: ApiEndpointFactory;
};
