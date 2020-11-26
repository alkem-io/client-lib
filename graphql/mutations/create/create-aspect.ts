import { gql } from 'graphql-request';

export const createAspectMutation = gql`
  mutation createAspect($aspectData: AspectInput!, $opportunityID: Float!) {
    createAspect(aspectData: $aspectData, opportunityID: $opportunityID) {
      title
      framing
      explanation
    }
  }
`;
