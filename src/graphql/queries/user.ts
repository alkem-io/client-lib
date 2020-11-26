import { gql } from '@apollo/client';

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
