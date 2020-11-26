import { gql } from '@apollo/client';

export const CreateOrganisation = gql`
  mutation CreateOrganisation($organisationData: OrganisationInput!) {
    createOrganisation(organisationData: $organisationData) {
      name
      id
      profile {
        id
      }
    }
  }
`;
