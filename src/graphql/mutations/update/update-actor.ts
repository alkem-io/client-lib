import { gql } from '@apollo/client';

export const updateActor = gql`
  mutation updateActor($actorData: ActorInput!, $ID: Float!) {
    updateActor(actorData: $actorData, ID: $ID) {
      name
    }
  }
`;
