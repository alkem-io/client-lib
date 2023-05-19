import { GraphQLResponse } from 'graphql-request/dist/types';

export type ErrorResponse<T = any> = Error & {
  request: Record<string, unknown>;
  response: GraphQLResponse<T>;
};
