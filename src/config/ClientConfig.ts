import { UserCredentials } from 'src/types';

export interface ClientConfig {
  graphqlEndpoint: string;
  credentials: UserCredentials;
}
