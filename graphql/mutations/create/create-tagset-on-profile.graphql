import { gql } from 'graphql-request';

export const createTagsetOnProfileMutation = gql`
  mutation createTagsetOnProfile($tagsetName: String!, $profileID: Float!) {
    createTagsetOnProfile(tagsetName: $tagsetName, profileID: $profileID) {
      id
      tags
    }
  }
`;
