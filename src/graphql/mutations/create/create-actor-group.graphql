import { gql } from 'graphql-request';

export const CreateActorGroup=gql`
mutation CreateActorGroup(
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
`