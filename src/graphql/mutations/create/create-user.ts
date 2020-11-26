import { gql } from '@apollo/client';

export const CreateUser = gql`
  mutation CreateUser($userData: UserInput!) {
    createUserProfile(userData: $userData) {
      name
      id
      profile {
        id
      }
    }
  }
`;
