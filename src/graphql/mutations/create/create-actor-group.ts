import { gql } from 'graphql-request';

export const createActorGroupMutation = gql`
  mutation createActorGroup(
    $actorGroupData: ActorGroupInput!
    $opportunityID: Float!
  ) {
    createActorGroup(
      actorGroupData: $actorGroupData
      opportunityID: $opportunityID
    ) {
      name
      id
    }
  }
`;
