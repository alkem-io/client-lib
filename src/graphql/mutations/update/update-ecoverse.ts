import { gql } from 'graphql-request';

export const updateEcoverseMutation = gql`
  mutation updateEcoverse($ecoverseData: EcoverseInput!) {
    updateEcoverse(ecoverseData: $ecoverseData) {
      name
      context {
        tagline
      }
    }
  }
`;
