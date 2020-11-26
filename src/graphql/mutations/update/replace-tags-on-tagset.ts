import { gql } from 'graphql-request';

export const replaceTagsOnTagset = gql`
  mutation replaceTagsOnTagset($tags: [String!]!, $tagsetID: Float!) {
    replaceTagsOnTagset(tags: $tags, tagsetID: $tagsetID) {
      name
      tags
    }
  }
`;
