import { GraphQLResponse } from 'graphql-request/dist/types';
import { ErrorResponse } from '../types';

export const toGraphQLResponse = <T>(
  responseOrErrorResponse: GraphQLResponse<T> | ErrorResponse<T>
) => {
  return isErrorResponse(responseOrErrorResponse)
    ? { ...responseOrErrorResponse.response }
    : responseOrErrorResponse;
};

const isErrorResponse = (obj: unknown): obj is ErrorResponse => {
  return (obj as ErrorResponse).hasOwnProperty('response');
};
