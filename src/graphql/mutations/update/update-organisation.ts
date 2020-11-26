import { gql } from 'graphql-request';

export const updateOrganisation = gql`
  mutation updateOrganisation(
    $orgID: Float!
    $organisationData: OrganisationInput!
  ) {
    updateOrganisation(orgID: $orgID, organisationData: $organisationData) {
      name
      id
    }
  }
`;
