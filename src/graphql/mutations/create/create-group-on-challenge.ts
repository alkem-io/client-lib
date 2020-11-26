import { gql } from 'graphql-request';

export const createGroupOnChallengeMutation = gql`
  mutation createGroupOnChallenge($groupName: String!, $challengeID: Float!) {
    createGroupOnChallenge(groupName: $groupName, challengeID: $challengeID) {
      name
      id
    }
  }
`;
