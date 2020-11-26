import { gql } from 'graphql-request';

export const updateOrganisationMutation = gql`
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
