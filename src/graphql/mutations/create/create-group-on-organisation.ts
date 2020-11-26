import { gql } from 'graphql-request';

export const createGroupOnOrganisationMutation = gql`
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
