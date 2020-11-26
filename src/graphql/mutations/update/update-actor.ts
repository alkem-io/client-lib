import { gql } from 'graphql-request';

export const updateActorMutation = gql`
  mutation updateActor($actorData: ActorInput!, $ID: Float!) {
    updateActor(actorData: $actorData, ID: $ID) {
      name
    }
  }
`;
