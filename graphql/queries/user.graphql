import { gql } from 'graphql-request';

export const userQuery = gql`
  query user($ID: String!) {
    user(ID: $ID) {
      name
      id
      profile {
        id
        avatar
      }
    }
  }
`;
