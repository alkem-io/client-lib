import { AuthInfo } from 'src/types';

export interface ClientConfig {
  graphqlEndpoint: string;
  authInfo?: AuthInfo;
}
