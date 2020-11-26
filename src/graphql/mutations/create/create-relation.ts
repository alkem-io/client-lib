import { gql } from 'graphql-request';

export const createRelationMutation = gql`
  mutation createRelation(
    $relationData: RelationInput!
    $opportunityID: Float!
  ) {
    createRelation(relationData: $relationData, opportunityID: $opportunityID) {
      type
    }
  }
`;
