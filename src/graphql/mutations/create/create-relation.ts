import { gql } from '@apollo/client';

export const CreateRelation = gql`
  mutation CreateRelation(
    $relationData: RelationInput!
    $opportunityID: Float!
  ) {
    createRelation(relationData: $relationData, opportunityID: $opportunityID) {
      type
    }
  }
`;
