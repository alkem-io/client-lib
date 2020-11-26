import { gql } from 'graphql-request';

export const createOpportunityMutation = gql`
  mutation createOpportunityMutation(
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
