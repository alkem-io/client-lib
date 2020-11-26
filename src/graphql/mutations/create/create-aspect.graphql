import { gql } from 'graphql-request';

export const CreateAspect=gql`
mutation CreateAspect($aspectData: AspectInput!, $opportunityID: Float!) {
  createAspect(aspectData: $aspectData, opportunityID: $opportunityID) {
    title
    framing
    explanation
  }
}
`