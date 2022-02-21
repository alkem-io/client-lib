import { AuthInfo } from 'src/types';

export interface ClientConfig {
  apiEndpointPrivateGraphql: string;
  authInfo?: AuthInfo;
  loggingEnabled?: boolean;
}
