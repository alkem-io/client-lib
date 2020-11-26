import { gql } from 'graphql-request';

export const createGroupOnEcoverse=gql`
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
`