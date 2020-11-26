import { gql } from 'graphql-request';

export const createGroupOnEcoverseMutation = gql`
  mutation createGroupOnEcoverse($groupName: String!) {
    createGroupOnEcoverse(groupName: $groupName) {
      id
      name
      profile {
        tagsets {
          name
          id
        }
      }
    }
  }
`;
