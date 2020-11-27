import { GraphQLError } from 'graphql-request/dist/types';
import { Logger } from 'winston';

export const handleErrors = (logger?: Logger) => {
  return (errors: GraphQLError[] | undefined) => {
    if (errors) {
      errors.forEach(e => {
        if (logger) {
          logger.error(e.message);
        } else {
          console.error(e.message);
        }
      });
      throw errors[0];
    }
  };
};

export type ErrorHandler = ReturnType<typeof handleErrors>;