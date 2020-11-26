import { gql } from '@apollo/client';

export const createActor = gql`
  mutation createActor($actorData: ActorInput!, $actorGroupID: Float!) {
    createActor(actorData: $actorData, actorGroupID: $actorGroupID) {
      id
      name
      description
      value
      impact
    }
  }
`;
