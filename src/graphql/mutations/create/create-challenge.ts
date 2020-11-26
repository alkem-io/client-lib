import { gql } from 'graphql-request';

export const CreateChallengeMutation = gql`
  mutation CreateChallenge($challengeData: ChallengeInput!) {
    createChallenge(challengeData: $challengeData) {
      name
      id
      tagset {
        tags
        id
        name
      }
      groups {
        id
        name
      }
    }
  }
`;
