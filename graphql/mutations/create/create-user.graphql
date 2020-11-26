import { gql } from 'graphql-request';

export const CreateUserMutation = gql`
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
