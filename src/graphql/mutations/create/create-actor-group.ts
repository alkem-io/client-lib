import { gql } from '@apollo/client';

export const CreateActorGroup = gql`
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
`;
