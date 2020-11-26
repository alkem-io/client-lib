import { gql } from '@apollo/client';

export const replaceTagsOnTagset = gql`
  mutation replaceTagsOnTagset($tags: [String!]!, $tagsetID: Float!) {
    replaceTagsOnTagset(tags: $tags, tagsetID: $tagsetID) {
      name
      tags
    }
  }
`;
