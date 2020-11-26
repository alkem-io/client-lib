import { gql } from '@apollo/client';

export const createGroupOnOrganisation = gql`
  mutation createGroupOnOrganisation(
    $groupName: String!
    $organisationID: Float!
  ) {
    createGroupOnOrganisation(
      groupName: $groupName
      organisationID: $organisationID
    ) {
      name
      id
      groups {
        name
      }
    }
  }
`;
