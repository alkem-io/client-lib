import { gql } from 'graphql-request';

export const user = gql`
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
