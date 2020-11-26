import { gql } from 'graphql-request';

export const createGroupOnOrganisation = gql`
  mutation createGroupOnOrganisation(
    $groupName: String!
    $organisationID: Float!
  ) {
    createGroupOnOrganisation(groupName: $groupName, orgID: $organisationID) {
      id
      name
    }
  }
`;
