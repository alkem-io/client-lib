import { GraphQLResponse } from 'graphql-request/dist/types';

export type AlkemioClientError = Error & {
  request: Record<string, unknown>;
  response: GraphQLResponse;
};
