import { gql } from 'graphql-request';

export const addUserToChallengeMutation = gql`
  mutation addUserToChallenge($userID: Float!, $challengeID: Float!) {
    addUserToChallenge(challengeID: $challengeID, userID: $userID) {
      name
      id
      members {
        id
        name
      }
    }
  }
`;
