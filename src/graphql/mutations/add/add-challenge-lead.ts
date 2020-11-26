import { gql } from '@apollo/client';

export const addChallengeLead = gql`
  mutation addChallengeLead($challengeID: Float!, $organisationID: Float!) {
    addChallengeLead(organisationID: $organisationID, challengeID: $challengeID)
  }
`;
