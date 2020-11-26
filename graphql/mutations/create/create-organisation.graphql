import { gql } from 'graphql-request';

export const CreateOrganisationMutation = gql`
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
