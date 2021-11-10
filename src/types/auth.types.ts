export type UserCredentials = { email: string; password: string };
export type AuthInfo = {
  credentials: UserCredentials;
  kratosPublicApiEndpoint: string;
};
