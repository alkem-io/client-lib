import { gql } from '@apollo/client';

export const updateEcoverse = gql`
  mutation updateEcoverse($ecoverseData: EcoverseInput!) {
    updateEcoverse(ecoverseData: $ecoverseData) {
      name
      context {
        tagline
      }
    }
  }
`;
