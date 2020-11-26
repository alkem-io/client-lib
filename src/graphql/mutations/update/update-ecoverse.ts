import { gql } from 'graphql-request';

export const updateEcoverse=gql`
mutation updateEcoverse($ecoverseData: EcoverseInput!) {
  updateEcoverse(ecoverseData: $ecoverseData) {
    name
    context {
      tagline
    }
  }
}
`