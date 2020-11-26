import { gql } from 'graphql-request';

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
