import { gql } from 'graphql-request';

export const createOpportunityOnChallenge = gql`
  mutation createOpportunityOnChallenge(
    $opportunityData: OpportunityInput!
    $challengeID: Float!
  ) {
    createOpportunityOnChallenge(
      opportunityData: $opportunityData
      challengeID: $challengeID
    ) {
      name
      id
    }
  }
`;
