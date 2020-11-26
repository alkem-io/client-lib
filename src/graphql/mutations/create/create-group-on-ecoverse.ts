import { gql } from '@apollo/client';

export const createGroupOnEcoverse = gql`
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
