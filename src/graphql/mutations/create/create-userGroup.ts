import { gql } from '@apollo/client';

export const CreateUserGroup = gql`
  mutation CreateUserGroup($userGroupData: UserGroupInput!) {
    createUserGroup(userGroupData: $userGroupData) {
      name
      id
      members {
        id
      }
    }
  }
`;
