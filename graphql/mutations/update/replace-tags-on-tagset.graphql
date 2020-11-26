import { gql } from 'graphql-request';

export const replaceTagsOnTagsetMutation = gql`
  mutation replaceTagsOnTagset($tags: [String!]!, $tagsetID: Float!) {
    replaceTagsOnTagset(tags: $tags, tagsetID: $tagsetID) {
      name
      tags
    }
  }
`;
