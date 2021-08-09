/* eslint-disable @typescript-eslint/no-explicit-any */
import * as SchemaTypes from './types/alkemio-schema';

import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import { GraphQLError } from 'graphql-request/dist/types';
import { Headers } from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type ChallengeDetailsFragment = {
  id: string;
  nameID: string;
  tagset?: SchemaTypes.Maybe<{ tags: Array<string>; id: string; name: string }>;
  community?: SchemaTypes.Maybe<{
    groups?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
  }>;
  context?: SchemaTypes.Maybe<{
    ecosystemModel?: SchemaTypes.Maybe<{
      id: string;
      actorGroups?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
    }>;
  }>;
};

export type OpportunityDetailsFragment = {
  id: string;
  nameID: string;
  tagset?: SchemaTypes.Maybe<{ tags: Array<string>; id: string; name: string }>;
  community?: SchemaTypes.Maybe<{
    groups?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
  }>;
};

export type AddUserToCommunityMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.AssignCommunityMemberInput;
}>;

export type AddUserToCommunityMutation = {
  assignUserToCommunity: { displayName: string; id: string };
};

export type AddUserToGroupMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.AssignUserGroupMemberInput;
}>;

export type AddUserToGroupMutation = {
  assignUserToGroup: {
    id: string;
    members?: SchemaTypes.Maybe<
      Array<{ id: string; email: string; firstName: string; lastName: string }>
    >;
  };
};

export type AssignUserAsChallengeAdminMutationVariables = SchemaTypes.Exact<{
  membershipData: SchemaTypes.AssignChallengeAdminInput;
}>;

export type AssignUserAsChallengeAdminMutation = {
  assignUserAsChallengeAdmin: { id: string };
};

export type AssignUserAsEcoverseAdminMutationVariables = SchemaTypes.Exact<{
  membershipData: SchemaTypes.AssignEcoverseAdminInput;
}>;

export type AssignUserAsEcoverseAdminMutation = {
  assignUserAsEcoverseAdmin: { id: string };
};

export type AssignUserAsOrganisationAdminMutationVariables = SchemaTypes.Exact<{
  membershipData: SchemaTypes.AssignOrganisationAdminInput;
}>;

export type AssignUserAsOrganisationAdminMutation = {
  assignUserAsOrganisationAdmin: { id: string };
};

export type AuthorizationPolicyResetOnEcoverseMutationVariables = SchemaTypes.Exact<{
  authorizationResetData: SchemaTypes.EcoverseAuthorizationResetInput;
}>;

export type AuthorizationPolicyResetOnEcoverseMutation = {
  authorizationPolicyResetOnEcoverse: { nameID: string };
};

export type AuthorizationPolicyResetOnOrganisationMutationVariables = SchemaTypes.Exact<{
  authorizationResetData: SchemaTypes.OrganisationAuthorizationResetInput;
}>;

export type AuthorizationPolicyResetOnOrganisationMutation = {
  authorizationPolicyResetOnOrganisation: { nameID: string };
};

export type AuthorizationPolicyResetOnUserMutationVariables = SchemaTypes.Exact<{
  authorizationResetData: SchemaTypes.UserAuthorizationResetInput;
}>;

export type AuthorizationPolicyResetOnUserMutation = {
  authorizationPolicyResetOnUser: { nameID: string };
};

export type AgrantCredentialToUserMutationVariables = SchemaTypes.Exact<{
  grantCredentialData: SchemaTypes.GrantAuthorizationCredentialInput;
}>;

export type AgrantCredentialToUserMutation = {
  grantCredentialToUser: {
    displayName: string;
    id: string;
    agent?: SchemaTypes.Maybe<{
      credentials?: SchemaTypes.Maybe<
        Array<{
          id: string;
          resourceID: string;
          type: SchemaTypes.AuthorizationCredential;
        }>
      >;
    }>;
  };
};

export type RevokeCredentialFromUserMutationVariables = SchemaTypes.Exact<{
  revokeCredentialData: SchemaTypes.RevokeAuthorizationCredentialInput;
}>;

export type RevokeCredentialFromUserMutation = {
  revokeCredentialFromUser: {
    displayName: string;
    id: string;
    agent?: SchemaTypes.Maybe<{
      credentials?: SchemaTypes.Maybe<
        Array<{
          id: string;
          resourceID: string;
          type: SchemaTypes.AuthorizationCredential;
        }>
      >;
    }>;
  };
};

export type CreateActorGroupMutationVariables = SchemaTypes.Exact<{
  actorGroupData: SchemaTypes.CreateActorGroupInput;
}>;

export type CreateActorGroupMutation = {
  createActorGroup: { id: string; name: string };
};

export type CreateActorMutationVariables = SchemaTypes.Exact<{
  actorData: SchemaTypes.CreateActorInput;
}>;

export type CreateActorMutation = {
  createActor: {
    id: string;
    name: string;
    description?: SchemaTypes.Maybe<string>;
    value?: SchemaTypes.Maybe<string>;
    impact?: SchemaTypes.Maybe<string>;
  };
};

export type CreateAspectMutationVariables = SchemaTypes.Exact<{
  aspectData: SchemaTypes.CreateAspectInput;
}>;

export type CreateAspectMutation = {
  createAspect: { title: string; framing: string; explanation: string };
};

export type CreateChallengeMutationVariables = SchemaTypes.Exact<{
  challengeData: SchemaTypes.CreateChallengeInput;
}>;

export type CreateChallengeMutation = {
  createChallenge: { id: string; nameID: string };
};

export type CreateChildChallengeMutationVariables = SchemaTypes.Exact<{
  childChallengeData: SchemaTypes.CreateChallengeInput;
}>;

export type CreateChildChallengeMutation = {
  createChildChallenge: { id: string; nameID: string; displayName: string };
};

export type CreateEcoverseMutationVariables = SchemaTypes.Exact<{
  ecoverseData: SchemaTypes.CreateEcoverseInput;
}>;

export type CreateEcoverseMutation = {
  createEcoverse: { id: string; nameID: string };
};

export type CreateGroupOnCommunityMutationVariables = SchemaTypes.Exact<{
  groupData: SchemaTypes.CreateUserGroupInput;
}>;

export type CreateGroupOnCommunityMutation = {
  createGroupOnCommunity: { name: string; id: string };
};

export type CreateGroupOnOrganisationMutationVariables = SchemaTypes.Exact<{
  groupData: SchemaTypes.CreateUserGroupInput;
}>;

export type CreateGroupOnOrganisationMutation = {
  createGroupOnOrganisation: { id: string; name: string };
};

export type CreateOpportunityMutationVariables = SchemaTypes.Exact<{
  opportunityData: SchemaTypes.CreateOpportunityInput;
}>;

export type CreateOpportunityMutation = {
  createOpportunity: { id: string; displayName: string; nameID: string };
};

export type CreateOrganisationMutationVariables = SchemaTypes.Exact<{
  organisationData: SchemaTypes.CreateOrganisationInput;
}>;

export type CreateOrganisationMutation = {
  createOrganisation: {
    displayName: string;
    nameID: string;
    id: string;
    profile: { id: string };
  };
};

export type CreateReferenceOnContextMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.CreateReferenceOnContextInput;
}>;

export type CreateReferenceOnContextMutation = {
  createReferenceOnContext: {
    id: string;
    name: string;
    description: string;
    uri: string;
  };
};

export type CreateReferenceOnProfileMutationVariables = SchemaTypes.Exact<{
  referenceInput: SchemaTypes.CreateReferenceOnProfileInput;
}>;

export type CreateReferenceOnProfileMutation = {
  createReferenceOnProfile: { name: string; uri: string; description: string };
};

export type CreateRelationMutationVariables = SchemaTypes.Exact<{
  relationData: SchemaTypes.CreateRelationInput;
}>;

export type CreateRelationMutation = { createRelation: { type: string } };

export type CreateTagsetOnProfileMutationVariables = SchemaTypes.Exact<{
  tagsetData: SchemaTypes.CreateTagsetOnProfileInput;
}>;

export type CreateTagsetOnProfileMutation = {
  createTagsetOnProfile: { id: string; tags: Array<string> };
};

export type CreateUserMutationVariables = SchemaTypes.Exact<{
  userData: SchemaTypes.CreateUserInput;
}>;

export type CreateUserMutation = {
  createUser: {
    nameID: string;
    id: string;
    profile?: SchemaTypes.Maybe<{ id: string }>;
  };
};

export type DeleteReferenceMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.DeleteReferenceInput;
}>;

export type DeleteReferenceMutation = {
  deleteReference: {
    id: string;
    name: string;
    description: string;
    uri: string;
  };
};

export type UpdateActorMutationVariables = SchemaTypes.Exact<{
  actorData: SchemaTypes.UpdateActorInput;
}>;

export type UpdateActorMutation = { updateActor: { name: string } };

export type UpdateChallengeMutationVariables = SchemaTypes.Exact<{
  challengeData: SchemaTypes.UpdateChallengeInput;
}>;

export type UpdateChallengeMutation = {
  updateChallenge: ChallengeDetailsFragment;
};

export type UpdateEcoverseMutationVariables = SchemaTypes.Exact<{
  ecoverseData: SchemaTypes.UpdateEcoverseInput;
}>;

export type UpdateEcoverseMutation = {
  updateEcoverse: {
    nameID: string;
    host?: SchemaTypes.Maybe<{ nameID: string }>;
    context?: SchemaTypes.Maybe<{ tagline?: SchemaTypes.Maybe<string> }>;
  };
};

export type UpdateOpportunityMutationVariables = SchemaTypes.Exact<{
  opportunityData: SchemaTypes.UpdateOpportunityInput;
}>;

export type UpdateOpportunityMutation = {
  updateOpportunity: { id: string; displayName: string; nameID: string };
};

export type UpdateOrganisationMutationVariables = SchemaTypes.Exact<{
  organisationData: SchemaTypes.UpdateOrganisationInput;
}>;

export type UpdateOrganisationMutation = {
  updateOrganisation: {
    id: string;
    nameID: string;
    profile: {
      id: string;
      references?: SchemaTypes.Maybe<
        Array<{ id: string; name: string; uri: string }>
      >;
    };
  };
};

export type UpdateProfileMutationVariables = SchemaTypes.Exact<{
  profileData: SchemaTypes.UpdateProfileInput;
}>;

export type UpdateProfileMutation = { updateProfile: { id: string } };

export type ChallengeQueryVariables = SchemaTypes.Exact<{
  ecoverseID: SchemaTypes.Scalars['UUID_NAMEID'];
  challengeID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type ChallengeQuery = {
  ecoverse: {
    challenge: {
      nameID: string;
      id: string;
      displayName: string;
      community?: SchemaTypes.Maybe<{ id: string; displayName: string }>;
      leadOrganisations: Array<{ nameID: string; id: string }>;
    };
  };
};

export type ChallengesQueryVariables = SchemaTypes.Exact<{
  ecoverseID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type ChallengesQuery = {
  ecoverse: {
    challenges?: SchemaTypes.Maybe<
      Array<{ id: string; nameID: string; displayName: string }>
    >;
  };
};

export type ConfigurationQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type ConfigurationQuery = {
  configuration: {
    authentication: {
      enabled: boolean;
      providers: Array<{
        name: string;
        label: string;
        icon: string;
        enabled: boolean;
        config: {
          __typename: 'OryConfig';
          issuer: string;
          kratosPublicBaseURL: string;
        };
      }>;
    };
  };
};

export type EcoverseQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type EcoverseQuery = {
  ecoverse: {
    id: string;
    nameID: string;
    displayName: string;
    community?: SchemaTypes.Maybe<{ id: string }>;
    context?: SchemaTypes.Maybe<{
      id: string;
      references?: SchemaTypes.Maybe<
        Array<{ id: string; name: string; description: string; uri: string }>
      >;
      visual?: SchemaTypes.Maybe<{
        avatar: string;
        background: string;
        banner: string;
      }>;
    }>;
  };
};

export type EcoversesQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type EcoversesQuery = {
  ecoverses: Array<{ displayName: string; id: string; nameID: string }>;
};

export type GroupsQueryVariables = SchemaTypes.Exact<{
  ecoverseID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type GroupsQuery = {
  ecoverse: {
    community?: SchemaTypes.Maybe<{
      groups?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
    }>;
  };
};

export type HostInfoQueryVariables = SchemaTypes.Exact<{
  ecoverseID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type HostInfoQuery = {
  ecoverse: {
    host?: SchemaTypes.Maybe<{
      id: string;
      nameID: string;
      displayName: string;
      profile: {
        id: string;
        tagsets?: SchemaTypes.Maybe<
          Array<{ id: string; name: string; tags: Array<string> }>
        >;
      };
    }>;
  };
};

export type MetadataQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type MetadataQuery = {
  metadata: {
    services: Array<{
      name?: SchemaTypes.Maybe<string>;
      version?: SchemaTypes.Maybe<string>;
    }>;
  };
};

export type OpportunitiesQueryVariables = SchemaTypes.Exact<{
  ecoverseID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type OpportunitiesQuery = {
  ecoverse: {
    opportunities: Array<
      {
        id: string;
        context?: SchemaTypes.Maybe<{
          ecosystemModel?: SchemaTypes.Maybe<{
            actorGroups?: SchemaTypes.Maybe<
              Array<{ id: string; name: string }>
            >;
          }>;
        }>;
        relations?: SchemaTypes.Maybe<Array<{ actorName: string }>>;
      } & OpportunityProfileFragment
    >;
  };
};

export type OpportunityProfileFragment = {
  nameID: string;
  displayName: string;
  lifecycle?: SchemaTypes.Maybe<{ state?: SchemaTypes.Maybe<string> }>;
  context?: SchemaTypes.Maybe<{
    tagline?: SchemaTypes.Maybe<string>;
    background?: SchemaTypes.Maybe<string>;
    vision?: SchemaTypes.Maybe<any>;
    impact?: SchemaTypes.Maybe<any>;
    who?: SchemaTypes.Maybe<string>;
    references?: SchemaTypes.Maybe<
      Array<{ name: string; uri: string; description: string }>
    >;
  }>;
};

export type OpportunityQueryVariables = SchemaTypes.Exact<{
  ecoverseID: SchemaTypes.Scalars['UUID_NAMEID'];
  opportunityID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type OpportunityQuery = {
  ecoverse: {
    opportunity: {
      displayName: string;
      id: string;
      nameID: string;
      community?: SchemaTypes.Maybe<{ id: string; displayName: string }>;
      context?: SchemaTypes.Maybe<{
        id: string;
        ecosystemModel?: SchemaTypes.Maybe<{
          id: string;
          actorGroups?: SchemaTypes.Maybe<
            Array<{
              id: string;
              name: string;
              actors?: SchemaTypes.Maybe<Array<{ name: string }>>;
            }>
          >;
        }>;
      }>;
    };
  };
};

export type OrganisationQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type OrganisationQuery = {
  organisation: {
    displayName: string;
    id: string;
    nameID: string;
    profile: { id: string };
  };
};

export type OrganisationsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type OrganisationsQuery = {
  organisations: Array<{
    displayName: string;
    id: string;
    nameID: string;
    profile: {
      id: string;
      avatar?: SchemaTypes.Maybe<string>;
      description?: SchemaTypes.Maybe<string>;
    };
    agent?: SchemaTypes.Maybe<{
      id: string;
      credentials?: SchemaTypes.Maybe<
        Array<{ type: SchemaTypes.AuthorizationCredential; resourceID: string }>
      >;
    }>;
  }>;
};

export type UserQueryVariables = SchemaTypes.Exact<{
  userID: SchemaTypes.Scalars['UUID_NAMEID_EMAIL'];
}>;

export type UserQuery = {
  user: {
    displayName: string;
    id: string;
    nameID: string;
    profile?: SchemaTypes.Maybe<{
      id: string;
      avatar?: SchemaTypes.Maybe<string>;
    }>;
  };
};

export type UsersQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type UsersQuery = {
  users: Array<{
    id: string;
    nameID: string;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    profile?: SchemaTypes.Maybe<{
      id: string;
      avatar?: SchemaTypes.Maybe<string>;
      description?: SchemaTypes.Maybe<string>;
    }>;
    agent?: SchemaTypes.Maybe<{
      id: string;
      credentials?: SchemaTypes.Maybe<
        Array<{ type: SchemaTypes.AuthorizationCredential; resourceID: string }>
      >;
    }>;
  }>;
};

export const ChallengeDetailsFragmentDoc = gql`
  fragment ChallengeDetails on Challenge {
    id
    nameID
    tagset {
      tags
      id
      name
    }
    community {
      groups {
        id
        name
      }
    }
    context {
      ecosystemModel {
        id
        actorGroups {
          name
          id
        }
      }
    }
  }
`;
export const OpportunityDetailsFragmentDoc = gql`
  fragment OpportunityDetails on Opportunity {
    id
    nameID
    tagset {
      tags
      id
      name
    }
    community {
      groups {
        id
        name
      }
    }
  }
`;
export const OpportunityProfileFragmentDoc = gql`
  fragment OpportunityProfile on Opportunity {
    nameID
    displayName
    lifecycle {
      state
    }
    context {
      tagline
      background
      vision
      impact
      who
      references {
        name
        uri
        description
      }
    }
  }
`;
export const AddUserToCommunityDocument = gql`
  mutation addUserToCommunity($input: AssignCommunityMemberInput!) {
    assignUserToCommunity(membershipData: $input) {
      displayName
      id
    }
  }
`;
export const AddUserToGroupDocument = gql`
  mutation addUserToGroup($input: AssignUserGroupMemberInput!) {
    assignUserToGroup(membershipData: $input) {
      id
      members {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
export const AssignUserAsChallengeAdminDocument = gql`
  mutation assignUserAsChallengeAdmin(
    $membershipData: AssignChallengeAdminInput!
  ) {
    assignUserAsChallengeAdmin(membershipData: $membershipData) {
      id
    }
  }
`;
export const AssignUserAsEcoverseAdminDocument = gql`
  mutation assignUserAsEcoverseAdmin(
    $membershipData: AssignEcoverseAdminInput!
  ) {
    assignUserAsEcoverseAdmin(membershipData: $membershipData) {
      id
    }
  }
`;
export const AssignUserAsOrganisationAdminDocument = gql`
  mutation assignUserAsOrganisationAdmin(
    $membershipData: AssignOrganisationAdminInput!
  ) {
    assignUserAsOrganisationAdmin(membershipData: $membershipData) {
      id
    }
  }
`;
export const AuthorizationPolicyResetOnEcoverseDocument = gql`
  mutation authorizationPolicyResetOnEcoverse(
    $authorizationResetData: EcoverseAuthorizationResetInput!
  ) {
    authorizationPolicyResetOnEcoverse(
      authorizationResetData: $authorizationResetData
    ) {
      nameID
    }
  }
`;
export const AuthorizationPolicyResetOnOrganisationDocument = gql`
  mutation authorizationPolicyResetOnOrganisation(
    $authorizationResetData: OrganisationAuthorizationResetInput!
  ) {
    authorizationPolicyResetOnOrganisation(
      authorizationResetData: $authorizationResetData
    ) {
      nameID
    }
  }
`;
export const AuthorizationPolicyResetOnUserDocument = gql`
  mutation authorizationPolicyResetOnUser(
    $authorizationResetData: UserAuthorizationResetInput!
  ) {
    authorizationPolicyResetOnUser(
      authorizationResetData: $authorizationResetData
    ) {
      nameID
    }
  }
`;
export const AgrantCredentialToUserDocument = gql`
  mutation agrantCredentialToUser(
    $grantCredentialData: GrantAuthorizationCredentialInput!
  ) {
    grantCredentialToUser(grantCredentialData: $grantCredentialData) {
      displayName
      id
      agent {
        credentials {
          id
          resourceID
          type
        }
      }
    }
  }
`;
export const RevokeCredentialFromUserDocument = gql`
  mutation revokeCredentialFromUser(
    $revokeCredentialData: RevokeAuthorizationCredentialInput!
  ) {
    revokeCredentialFromUser(revokeCredentialData: $revokeCredentialData) {
      displayName
      id
      agent {
        credentials {
          id
          resourceID
          type
        }
      }
    }
  }
`;
export const CreateActorGroupDocument = gql`
  mutation createActorGroup($actorGroupData: CreateActorGroupInput!) {
    createActorGroup(actorGroupData: $actorGroupData) {
      id
      name
    }
  }
`;
export const CreateActorDocument = gql`
  mutation createActor($actorData: CreateActorInput!) {
    createActor(actorData: $actorData) {
      id
      name
      description
      value
      impact
    }
  }
`;
export const CreateAspectDocument = gql`
  mutation createAspect($aspectData: CreateAspectInput!) {
    createAspect(aspectData: $aspectData) {
      title
      framing
      explanation
    }
  }
`;
export const CreateChallengeDocument = gql`
  mutation createChallenge($challengeData: CreateChallengeInput!) {
    createChallenge(challengeData: $challengeData) {
      id
      nameID
    }
  }
`;
export const CreateChildChallengeDocument = gql`
  mutation createChildChallenge($childChallengeData: CreateChallengeInput!) {
    createChildChallenge(challengeData: $childChallengeData) {
      id
      nameID
      displayName
    }
  }
`;
export const CreateEcoverseDocument = gql`
  mutation createEcoverse($ecoverseData: CreateEcoverseInput!) {
    createEcoverse(ecoverseData: $ecoverseData) {
      id
      nameID
    }
  }
`;
export const CreateGroupOnCommunityDocument = gql`
  mutation createGroupOnCommunity($groupData: CreateUserGroupInput!) {
    createGroupOnCommunity(groupData: $groupData) {
      name
      id
    }
  }
`;
export const CreateGroupOnOrganisationDocument = gql`
  mutation createGroupOnOrganisation($groupData: CreateUserGroupInput!) {
    createGroupOnOrganisation(groupData: $groupData) {
      id
      name
    }
  }
`;
export const CreateOpportunityDocument = gql`
  mutation createOpportunity($opportunityData: CreateOpportunityInput!) {
    createOpportunity(opportunityData: $opportunityData) {
      id
      displayName
      nameID
    }
  }
`;
export const CreateOrganisationDocument = gql`
  mutation createOrganisation($organisationData: CreateOrganisationInput!) {
    createOrganisation(organisationData: $organisationData) {
      displayName
      nameID
      id
      profile {
        id
      }
    }
  }
`;
export const CreateReferenceOnContextDocument = gql`
  mutation createReferenceOnContext($input: CreateReferenceOnContextInput!) {
    createReferenceOnContext(referenceInput: $input) {
      id
      name
      description
      uri
    }
  }
`;
export const CreateReferenceOnProfileDocument = gql`
  mutation createReferenceOnProfile(
    $referenceInput: CreateReferenceOnProfileInput!
  ) {
    createReferenceOnProfile(referenceInput: $referenceInput) {
      name
      uri
      description
    }
  }
`;
export const CreateRelationDocument = gql`
  mutation createRelation($relationData: CreateRelationInput!) {
    createRelation(relationData: $relationData) {
      type
    }
  }
`;
export const CreateTagsetOnProfileDocument = gql`
  mutation createTagsetOnProfile($tagsetData: CreateTagsetOnProfileInput!) {
    createTagsetOnProfile(tagsetData: $tagsetData) {
      id
      tags
    }
  }
`;
export const CreateUserDocument = gql`
  mutation createUser($userData: CreateUserInput!) {
    createUser(userData: $userData) {
      nameID
      id
      profile {
        id
      }
    }
  }
`;
export const DeleteReferenceDocument = gql`
  mutation deleteReference($input: DeleteReferenceInput!) {
    deleteReference(deleteData: $input) {
      id
      name
      description
      uri
    }
  }
`;
export const UpdateActorDocument = gql`
  mutation updateActor($actorData: UpdateActorInput!) {
    updateActor(actorData: $actorData) {
      name
    }
  }
`;
export const UpdateChallengeDocument = gql`
  mutation updateChallenge($challengeData: UpdateChallengeInput!) {
    updateChallenge(challengeData: $challengeData) {
      ...ChallengeDetails
    }
  }
  ${ChallengeDetailsFragmentDoc}
`;
export const UpdateEcoverseDocument = gql`
  mutation updateEcoverse($ecoverseData: UpdateEcoverseInput!) {
    updateEcoverse(ecoverseData: $ecoverseData) {
      nameID
      host {
        nameID
      }
      context {
        tagline
      }
    }
  }
`;
export const UpdateOpportunityDocument = gql`
  mutation updateOpportunity($opportunityData: UpdateOpportunityInput!) {
    updateOpportunity(opportunityData: $opportunityData) {
      id
      displayName
      nameID
    }
  }
`;
export const UpdateOrganisationDocument = gql`
  mutation updateOrganisation($organisationData: UpdateOrganisationInput!) {
    updateOrganisation(organisationData: $organisationData) {
      id
      nameID
      profile {
        id
        references {
          id
          name
          uri
        }
      }
    }
  }
`;
export const UpdateProfileDocument = gql`
  mutation updateProfile($profileData: UpdateProfileInput!) {
    updateProfile(profileData: $profileData) {
      id
    }
  }
`;
export const ChallengeDocument = gql`
  query challenge($ecoverseID: UUID_NAMEID!, $challengeID: UUID_NAMEID!) {
    ecoverse(ID: $ecoverseID) {
      challenge(ID: $challengeID) {
        nameID
        id
        displayName
        community {
          id
          displayName
        }
        leadOrganisations {
          nameID
          id
        }
      }
    }
  }
`;
export const ChallengesDocument = gql`
  query challenges($ecoverseID: UUID_NAMEID!) {
    ecoverse(ID: $ecoverseID) {
      challenges {
        id
        nameID
        displayName
      }
    }
  }
`;
export const ConfigurationDocument = gql`
  query configuration {
    configuration {
      authentication {
        enabled
        providers {
          name
          label
          icon
          enabled
          config {
            __typename
            ... on OryConfig {
              issuer
              kratosPublicBaseURL
            }
          }
        }
      }
    }
  }
`;
export const EcoverseDocument = gql`
  query ecoverse($id: UUID_NAMEID!) {
    ecoverse(ID: $id) {
      id
      nameID
      displayName
      community {
        id
      }
      context {
        id
        references {
          id
          name
          description
          uri
        }
        visual {
          avatar
          background
          banner
        }
      }
    }
  }
`;
export const EcoversesDocument = gql`
  query ecoverses {
    ecoverses {
      displayName
      id
      nameID
    }
  }
`;
export const GroupsDocument = gql`
  query groups($ecoverseID: UUID_NAMEID!) {
    ecoverse(ID: $ecoverseID) {
      community {
        groups {
          id
          name
        }
      }
    }
  }
`;
export const HostInfoDocument = gql`
  query hostInfo($ecoverseID: UUID_NAMEID!) {
    ecoverse(ID: $ecoverseID) {
      host {
        id
        nameID
        displayName
        profile {
          id
          tagsets {
            id
            name
            tags
          }
        }
      }
    }
  }
`;
export const MetadataDocument = gql`
  query metadata {
    metadata {
      services {
        name
        version
      }
    }
  }
`;
export const OpportunitiesDocument = gql`
  query opportunities($ecoverseID: UUID_NAMEID!) {
    ecoverse(ID: $ecoverseID) {
      opportunities {
        id
        ...OpportunityProfile
        context {
          ecosystemModel {
            actorGroups {
              id
              name
            }
          }
        }
        relations {
          actorName
        }
      }
    }
  }
  ${OpportunityProfileFragmentDoc}
`;
export const OpportunityDocument = gql`
  query opportunity($ecoverseID: UUID_NAMEID!, $opportunityID: UUID_NAMEID!) {
    ecoverse(ID: $ecoverseID) {
      opportunity(ID: $opportunityID) {
        displayName
        id
        nameID
        community {
          id
          displayName
        }
        context {
          id
          ecosystemModel {
            id
            actorGroups {
              id
              name
              actors {
                name
              }
            }
          }
        }
      }
    }
  }
`;
export const OrganisationDocument = gql`
  query organisation($id: UUID_NAMEID!) {
    organisation(ID: $id) {
      displayName
      id
      nameID
      profile {
        id
      }
    }
  }
`;
export const OrganisationsDocument = gql`
  query organisations {
    organisations {
      displayName
      id
      nameID
      profile {
        id
        avatar
        description
      }
      agent {
        id
        credentials {
          type
          resourceID
        }
      }
    }
  }
`;
export const UserDocument = gql`
  query user($userID: UUID_NAMEID_EMAIL!) {
    user(ID: $userID) {
      displayName
      id
      nameID
      profile {
        id
        avatar
      }
    }
  }
`;
export const UsersDocument = gql`
  query users {
    users {
      id
      nameID
      displayName
      firstName
      lastName
      email
      profile {
        id
        avatar
        description
      }
      agent {
        id
        credentials {
          type
          resourceID
        }
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    addUserToCommunity(
      variables: AddUserToCommunityMutationVariables
    ): Promise<{
      data?: AddUserToCommunityMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AddUserToCommunityMutation>(
          print(AddUserToCommunityDocument),
          variables
        )
      );
    },
    addUserToGroup(
      variables: AddUserToGroupMutationVariables
    ): Promise<{
      data?: AddUserToGroupMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AddUserToGroupMutation>(
          print(AddUserToGroupDocument),
          variables
        )
      );
    },
    assignUserAsChallengeAdmin(
      variables: AssignUserAsChallengeAdminMutationVariables
    ): Promise<{
      data?: AssignUserAsChallengeAdminMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AssignUserAsChallengeAdminMutation>(
          print(AssignUserAsChallengeAdminDocument),
          variables
        )
      );
    },
    assignUserAsEcoverseAdmin(
      variables: AssignUserAsEcoverseAdminMutationVariables
    ): Promise<{
      data?: AssignUserAsEcoverseAdminMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AssignUserAsEcoverseAdminMutation>(
          print(AssignUserAsEcoverseAdminDocument),
          variables
        )
      );
    },
    assignUserAsOrganisationAdmin(
      variables: AssignUserAsOrganisationAdminMutationVariables
    ): Promise<{
      data?: AssignUserAsOrganisationAdminMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AssignUserAsOrganisationAdminMutation>(
          print(AssignUserAsOrganisationAdminDocument),
          variables
        )
      );
    },
    authorizationPolicyResetOnEcoverse(
      variables: AuthorizationPolicyResetOnEcoverseMutationVariables
    ): Promise<{
      data?: AuthorizationPolicyResetOnEcoverseMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AuthorizationPolicyResetOnEcoverseMutation>(
          print(AuthorizationPolicyResetOnEcoverseDocument),
          variables
        )
      );
    },
    authorizationPolicyResetOnOrganisation(
      variables: AuthorizationPolicyResetOnOrganisationMutationVariables
    ): Promise<{
      data?: AuthorizationPolicyResetOnOrganisationMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AuthorizationPolicyResetOnOrganisationMutation>(
          print(AuthorizationPolicyResetOnOrganisationDocument),
          variables
        )
      );
    },
    authorizationPolicyResetOnUser(
      variables: AuthorizationPolicyResetOnUserMutationVariables
    ): Promise<{
      data?: AuthorizationPolicyResetOnUserMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AuthorizationPolicyResetOnUserMutation>(
          print(AuthorizationPolicyResetOnUserDocument),
          variables
        )
      );
    },
    agrantCredentialToUser(
      variables: AgrantCredentialToUserMutationVariables
    ): Promise<{
      data?: AgrantCredentialToUserMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AgrantCredentialToUserMutation>(
          print(AgrantCredentialToUserDocument),
          variables
        )
      );
    },
    revokeCredentialFromUser(
      variables: RevokeCredentialFromUserMutationVariables
    ): Promise<{
      data?: RevokeCredentialFromUserMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<RevokeCredentialFromUserMutation>(
          print(RevokeCredentialFromUserDocument),
          variables
        )
      );
    },
    createActorGroup(
      variables: CreateActorGroupMutationVariables
    ): Promise<{
      data?: CreateActorGroupMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateActorGroupMutation>(
          print(CreateActorGroupDocument),
          variables
        )
      );
    },
    createActor(
      variables: CreateActorMutationVariables
    ): Promise<{
      data?: CreateActorMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateActorMutation>(
          print(CreateActorDocument),
          variables
        )
      );
    },
    createAspect(
      variables: CreateAspectMutationVariables
    ): Promise<{
      data?: CreateAspectMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateAspectMutation>(
          print(CreateAspectDocument),
          variables
        )
      );
    },
    createChallenge(
      variables: CreateChallengeMutationVariables
    ): Promise<{
      data?: CreateChallengeMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateChallengeMutation>(
          print(CreateChallengeDocument),
          variables
        )
      );
    },
    createChildChallenge(
      variables: CreateChildChallengeMutationVariables
    ): Promise<{
      data?: CreateChildChallengeMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateChildChallengeMutation>(
          print(CreateChildChallengeDocument),
          variables
        )
      );
    },
    createEcoverse(
      variables: CreateEcoverseMutationVariables
    ): Promise<{
      data?: CreateEcoverseMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateEcoverseMutation>(
          print(CreateEcoverseDocument),
          variables
        )
      );
    },
    createGroupOnCommunity(
      variables: CreateGroupOnCommunityMutationVariables
    ): Promise<{
      data?: CreateGroupOnCommunityMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateGroupOnCommunityMutation>(
          print(CreateGroupOnCommunityDocument),
          variables
        )
      );
    },
    createGroupOnOrganisation(
      variables: CreateGroupOnOrganisationMutationVariables
    ): Promise<{
      data?: CreateGroupOnOrganisationMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateGroupOnOrganisationMutation>(
          print(CreateGroupOnOrganisationDocument),
          variables
        )
      );
    },
    createOpportunity(
      variables: CreateOpportunityMutationVariables
    ): Promise<{
      data?: CreateOpportunityMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateOpportunityMutation>(
          print(CreateOpportunityDocument),
          variables
        )
      );
    },
    createOrganisation(
      variables: CreateOrganisationMutationVariables
    ): Promise<{
      data?: CreateOrganisationMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateOrganisationMutation>(
          print(CreateOrganisationDocument),
          variables
        )
      );
    },
    createReferenceOnContext(
      variables: CreateReferenceOnContextMutationVariables
    ): Promise<{
      data?: CreateReferenceOnContextMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateReferenceOnContextMutation>(
          print(CreateReferenceOnContextDocument),
          variables
        )
      );
    },
    createReferenceOnProfile(
      variables: CreateReferenceOnProfileMutationVariables
    ): Promise<{
      data?: CreateReferenceOnProfileMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateReferenceOnProfileMutation>(
          print(CreateReferenceOnProfileDocument),
          variables
        )
      );
    },
    createRelation(
      variables: CreateRelationMutationVariables
    ): Promise<{
      data?: CreateRelationMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateRelationMutation>(
          print(CreateRelationDocument),
          variables
        )
      );
    },
    createTagsetOnProfile(
      variables: CreateTagsetOnProfileMutationVariables
    ): Promise<{
      data?: CreateTagsetOnProfileMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateTagsetOnProfileMutation>(
          print(CreateTagsetOnProfileDocument),
          variables
        )
      );
    },
    createUser(
      variables: CreateUserMutationVariables
    ): Promise<{
      data?: CreateUserMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateUserMutation>(
          print(CreateUserDocument),
          variables
        )
      );
    },
    deleteReference(
      variables: DeleteReferenceMutationVariables
    ): Promise<{
      data?: DeleteReferenceMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<DeleteReferenceMutation>(
          print(DeleteReferenceDocument),
          variables
        )
      );
    },
    updateActor(
      variables: UpdateActorMutationVariables
    ): Promise<{
      data?: UpdateActorMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UpdateActorMutation>(
          print(UpdateActorDocument),
          variables
        )
      );
    },
    updateChallenge(
      variables: UpdateChallengeMutationVariables
    ): Promise<{
      data?: UpdateChallengeMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UpdateChallengeMutation>(
          print(UpdateChallengeDocument),
          variables
        )
      );
    },
    updateEcoverse(
      variables: UpdateEcoverseMutationVariables
    ): Promise<{
      data?: UpdateEcoverseMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UpdateEcoverseMutation>(
          print(UpdateEcoverseDocument),
          variables
        )
      );
    },
    updateOpportunity(
      variables: UpdateOpportunityMutationVariables
    ): Promise<{
      data?: UpdateOpportunityMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UpdateOpportunityMutation>(
          print(UpdateOpportunityDocument),
          variables
        )
      );
    },
    updateOrganisation(
      variables: UpdateOrganisationMutationVariables
    ): Promise<{
      data?: UpdateOrganisationMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UpdateOrganisationMutation>(
          print(UpdateOrganisationDocument),
          variables
        )
      );
    },
    updateProfile(
      variables: UpdateProfileMutationVariables
    ): Promise<{
      data?: UpdateProfileMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UpdateProfileMutation>(
          print(UpdateProfileDocument),
          variables
        )
      );
    },
    challenge(
      variables: ChallengeQueryVariables
    ): Promise<{
      data?: ChallengeQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<ChallengeQuery>(print(ChallengeDocument), variables)
      );
    },
    challenges(
      variables: ChallengesQueryVariables
    ): Promise<{
      data?: ChallengesQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<ChallengesQuery>(print(ChallengesDocument), variables)
      );
    },
    configuration(
      variables?: ConfigurationQueryVariables
    ): Promise<{
      data?: ConfigurationQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<ConfigurationQuery>(
          print(ConfigurationDocument),
          variables
        )
      );
    },
    ecoverse(
      variables: EcoverseQueryVariables
    ): Promise<{
      data?: EcoverseQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<EcoverseQuery>(print(EcoverseDocument), variables)
      );
    },
    ecoverses(
      variables?: EcoversesQueryVariables
    ): Promise<{
      data?: EcoversesQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<EcoversesQuery>(print(EcoversesDocument), variables)
      );
    },
    groups(
      variables: GroupsQueryVariables
    ): Promise<{
      data?: GroupsQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<GroupsQuery>(print(GroupsDocument), variables)
      );
    },
    hostInfo(
      variables: HostInfoQueryVariables
    ): Promise<{
      data?: HostInfoQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<HostInfoQuery>(print(HostInfoDocument), variables)
      );
    },
    metadata(
      variables?: MetadataQueryVariables
    ): Promise<{
      data?: MetadataQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<MetadataQuery>(print(MetadataDocument), variables)
      );
    },
    opportunities(
      variables: OpportunitiesQueryVariables
    ): Promise<{
      data?: OpportunitiesQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<OpportunitiesQuery>(
          print(OpportunitiesDocument),
          variables
        )
      );
    },
    opportunity(
      variables: OpportunityQueryVariables
    ): Promise<{
      data?: OpportunityQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<OpportunityQuery>(
          print(OpportunityDocument),
          variables
        )
      );
    },
    organisation(
      variables: OrganisationQueryVariables
    ): Promise<{
      data?: OrganisationQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<OrganisationQuery>(
          print(OrganisationDocument),
          variables
        )
      );
    },
    organisations(
      variables?: OrganisationsQueryVariables
    ): Promise<{
      data?: OrganisationsQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<OrganisationsQuery>(
          print(OrganisationsDocument),
          variables
        )
      );
    },
    user(
      variables: UserQueryVariables
    ): Promise<{
      data?: UserQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UserQuery>(print(UserDocument), variables)
      );
    },
    users(
      variables?: UsersQueryVariables
    ): Promise<{
      data?: UsersQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UsersQuery>(print(UsersDocument), variables)
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
