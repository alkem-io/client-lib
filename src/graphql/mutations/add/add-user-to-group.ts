import { gql } from 'graphql-request';

export const addUserToGroup=gql`
mutation addUserToGroup($userID: Float!, $groupID: Float!) {
  addUserToGroup(userID: $userID, groupID: $groupID)
}
`