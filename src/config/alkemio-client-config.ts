import { AuthInfo } from 'src/types';

export interface AlkemioClientConfig {
  apiEndpointPrivateGraphql: string;
  authInfo?: AuthInfo;
  loggingEnabled?: boolean;
}
