import { gql } from 'graphql-request';

export const createTagsetOnProfile=gql`
mutation createTagsetOnProfile($tagsetName: String!, $profileID: Float!) {
  createTagsetOnProfile(tagsetName: $tagsetName, profileID: $profileID) {
    id
    tags
  }
}
`