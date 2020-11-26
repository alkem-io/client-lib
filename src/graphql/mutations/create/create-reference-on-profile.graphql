import { gql } from 'graphql-request';

export const createReferenceOnProfile=gql`
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
`