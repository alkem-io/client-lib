import { gql } from 'graphql-request';

export const createReferenceOnProfileMutation = gql`
  mutation createReferenceOnProfile(
    $referenceInput: ReferenceInput!
    $profileID: Float!
  ) {
    createReferenceOnProfile(
      referenceInput: $referenceInput
      profileID: $profileID
    ) {
      name
      uri
      description
    }
  }
`;
