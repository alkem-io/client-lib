import { gql } from 'graphql-request';

export const addTagToTagsetMutation = gql`
  mutation addTagToTagset($tag: String!, $tagsetID: Float!) {
    addTagToTagset(tag: $tag, tagsetID: $tagsetID) {
      id
    }
  }
`;
