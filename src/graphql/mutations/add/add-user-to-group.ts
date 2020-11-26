import { gql } from '@apollo/client';

export const addUserToGroup = gql`
  mutation addUserToGroup($userID: Float!, $groupID: Float!) {
    addUserToGroup(userID: $userID, groupID: $groupID)
  }
`;
