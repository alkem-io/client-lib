import { gql } from 'graphql-request';

export const createActorMutation = gql`
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
