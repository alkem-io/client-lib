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
    visuals?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
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

export type UserDetailsFragment = {
  id: string;
  nameID: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  profile?: SchemaTypes.Maybe<{
    id: string;
    description?: SchemaTypes.Maybe<string>;
    avatar?: SchemaTypes.Maybe<{ id: string; uri: string }>;
  }>;
  agent?: SchemaTypes.Maybe<{
    id: string;
    credentials?: SchemaTypes.Maybe<
      Array<{ type: SchemaTypes.AuthorizationCredential; resourceID: string }>
    >;
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

export type AssignUserToOrganizationMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.AssignOrganizationMemberInput;
}>;

export type AssignUserToOrganizationMutation = {
  assignUserToOrganization: { displayName: string; id: string };
};

export type AssignUserAsChallengeAdminMutationVariables = SchemaTypes.Exact<{
  membershipData: SchemaTypes.AssignChallengeAdminInput;
}>;

export type AssignUserAsChallengeAdminMutation = {
  assignUserAsChallengeAdmin: { id: string };
};

export type AssignUserAsHubAdminMutationVariables = SchemaTypes.Exact<{
  membershipData: SchemaTypes.AssignEcoverseAdminInput;
}>;

export type AssignUserAsHubAdminMutation = {
  assignUserAsEcoverseAdmin: { id: string };
};

export type AssignUserAsOrganizationAdminMutationVariables = SchemaTypes.Exact<{
  membershipData: SchemaTypes.AssignOrganizationAdminInput;
}>;

export type AssignUserAsOrganizationAdminMutation = {
  assignUserAsOrganizationAdmin: { id: string };
};

export type AuthorizationPolicyResetOnHubMutationVariables = SchemaTypes.Exact<{
  authorizationResetData: SchemaTypes.EcoverseAuthorizationResetInput;
}>;

export type AuthorizationPolicyResetOnHubMutation = {
  authorizationPolicyResetOnEcoverse: { nameID: string };
};

export type AuthorizationPolicyResetOnOrganizationMutationVariables = SchemaTypes.Exact<{
  authorizationResetData: SchemaTypes.OrganizationAuthorizationResetInput;
}>;

export type AuthorizationPolicyResetOnOrganizationMutation = {
  authorizationPolicyResetOnOrganization: { nameID: string };
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
  challengeData: SchemaTypes.CreateChallengeOnEcoverseInput;
}>;

export type CreateChallengeMutation = {
  createChallenge: {
    id: string;
    nameID: string;
    context?: SchemaTypes.Maybe<{
      visuals?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
    }>;
  };
};

export type CreateChildChallengeMutationVariables = SchemaTypes.Exact<{
  childChallengeData: SchemaTypes.CreateChallengeOnChallengeInput;
}>;

export type CreateChildChallengeMutation = {
  createChildChallenge: {
    id: string;
    nameID: string;
    displayName: string;
    context?: SchemaTypes.Maybe<{
      visuals?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
    }>;
  };
};

export type CreateGroupOnCommunityMutationVariables = SchemaTypes.Exact<{
  groupData: SchemaTypes.CreateUserGroupInput;
}>;

export type CreateGroupOnCommunityMutation = {
  createGroupOnCommunity: {
    name: string;
    id: string;
    profile?: SchemaTypes.Maybe<{
      id: string;
      avatar?: SchemaTypes.Maybe<{ id: string }>;
    }>;
  };
};

export type CreateGroupOnOrganizationMutationVariables = SchemaTypes.Exact<{
  groupData: SchemaTypes.CreateUserGroupInput;
}>;

export type CreateGroupOnOrganizationMutation = {
  createGroupOnOrganization: {
    id: string;
    name: string;
    profile?: SchemaTypes.Maybe<{
      id: string;
      avatar?: SchemaTypes.Maybe<{ id: string }>;
    }>;
  };
};

export type CreateHubMutationVariables = SchemaTypes.Exact<{
  hubData: SchemaTypes.CreateEcoverseInput;
}>;

export type CreateHubMutation = {
  createEcoverse: {
    id: string;
    nameID: string;
    context?: SchemaTypes.Maybe<{
      visuals?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
    }>;
  };
};

export type CreateOpportunityMutationVariables = SchemaTypes.Exact<{
  opportunityData: SchemaTypes.CreateOpportunityInput;
}>;

export type CreateOpportunityMutation = {
  createOpportunity: {
    id: string;
    displayName: string;
    nameID: string;
    context?: SchemaTypes.Maybe<{
      visuals?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
    }>;
  };
};

export type CreateOrganizationMutationVariables = SchemaTypes.Exact<{
  organizationData: SchemaTypes.CreateOrganizationInput;
}>;

export type CreateOrganizationMutation = {
  createOrganization: {
    displayName: string;
    nameID: string;
    id: string;
    profile: { id: string; avatar?: SchemaTypes.Maybe<{ id: string }> };
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
    profile?: SchemaTypes.Maybe<{
      id: string;
      avatar?: SchemaTypes.Maybe<{ id: string }>;
    }>;
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

export type UpdateHubMutationVariables = SchemaTypes.Exact<{
  hubData: SchemaTypes.UpdateEcoverseInput;
}>;

export type UpdateHubMutation = {
  updateEcoverse: {
    nameID: string;
    host?: SchemaTypes.Maybe<{ nameID: string }>;
    context?: SchemaTypes.Maybe<{
      tagline?: SchemaTypes.Maybe<string>;
      visuals?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
    }>;
  };
};

export type UpdateOpportunityMutationVariables = SchemaTypes.Exact<{
  opportunityData: SchemaTypes.UpdateOpportunityInput;
}>;

export type UpdateOpportunityMutation = {
  updateOpportunity: {
    id: string;
    displayName: string;
    nameID: string;
    context?: SchemaTypes.Maybe<{
      visuals?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
    }>;
  };
};

export type UpdateOrganizationMutationVariables = SchemaTypes.Exact<{
  organizationData: SchemaTypes.UpdateOrganizationInput;
}>;

export type UpdateOrganizationMutation = {
  updateOrganization: {
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

export type UpdateVisualMutationVariables = SchemaTypes.Exact<{
  updateData: SchemaTypes.UpdateVisualInput;
}>;

export type UpdateVisualMutation = { updateVisual: { id: string } };

export type ChallengeQueryVariables = SchemaTypes.Exact<{
  hubID: SchemaTypes.Scalars['UUID_NAMEID'];
  challengeID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type ChallengeQuery = {
  ecoverse: {
    challenge: {
      nameID: string;
      id: string;
      displayName: string;
      community?: SchemaTypes.Maybe<{ id: string; displayName: string }>;
      leadOrganizations: Array<{ nameID: string; id: string }>;
    };
  };
};

export type ChallengesQueryVariables = SchemaTypes.Exact<{
  hubID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type ChallengesQuery = {
  ecoverse: {
    challenges?: SchemaTypes.Maybe<
      Array<{
        id: string;
        nameID: string;
        displayName: string;
        context?: SchemaTypes.Maybe<{
          visuals?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
        }>;
      }>
    >;
  };
};

export type ConfigurationQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type ConfigurationQuery = {
  configuration: {
    authentication: {
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

export type FeatureFlagsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type FeatureFlagsQuery = {
  configuration: {
    platform: { featureFlags: Array<{ name: string; enabled: boolean }> };
  };
};

export type GroupsQueryVariables = SchemaTypes.Exact<{
  hubID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type GroupsQuery = {
  ecoverse: {
    community?: SchemaTypes.Maybe<{
      groups?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
    }>;
  };
};

export type HostInfoQueryVariables = SchemaTypes.Exact<{
  hubID: SchemaTypes.Scalars['UUID_NAMEID'];
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

export type HubQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type HubQuery = {
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
      visuals?: SchemaTypes.Maybe<Array<{ name: string; uri: string }>>;
    }>;
  };
};

export type HubsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type HubsQuery = {
  ecoverses: Array<{
    displayName: string;
    id: string;
    nameID: string;
    context?: SchemaTypes.Maybe<{
      visuals?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
    }>;
  }>;
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
  hubID: SchemaTypes.Scalars['UUID_NAMEID'];
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
    visuals?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
    references?: SchemaTypes.Maybe<
      Array<{ name: string; uri: string; description: string }>
    >;
  }>;
};

export type OpportunityQueryVariables = SchemaTypes.Exact<{
  hubID: SchemaTypes.Scalars['UUID_NAMEID'];
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
        visuals?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
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

export type OrganizationQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type OrganizationQuery = {
  organization: {
    displayName: string;
    id: string;
    nameID: string;
    profile: { id: string };
  };
};

export type OrganizationsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type OrganizationsQuery = {
  organizations: Array<{
    displayName: string;
    id: string;
    nameID: string;
    profile: {
      id: string;
      description?: SchemaTypes.Maybe<string>;
      avatar?: SchemaTypes.Maybe<{ id: string; uri: string }>;
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

export type UserQuery = { user: UserDetailsFragment };

export type UsersQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type UsersQuery = { users: Array<UserDetailsFragment> };

export type UsersWithAuthorizationCredentialQueryVariables = SchemaTypes.Exact<{
  credentialsCriteriaData: SchemaTypes.UsersWithAuthorizationCredentialInput;
}>;

export type UsersWithAuthorizationCredentialQuery = {
  usersWithAuthorizationCredential: Array<UserDetailsFragment>;
};

export type UsersWithAuthorizationCredentialWithPreferencesQueryVariables = SchemaTypes.Exact<{
  credentialsCriteriaData: SchemaTypes.UsersWithAuthorizationCredentialInput;
}>;

export type UsersWithAuthorizationCredentialWithPreferencesQuery = {
  usersWithAuthorizationCredential: Array<
    {
      preferences: Array<{
        value: string;
        definition: {
          group: string;
          displayName: string;
          description: string;
          valueType: SchemaTypes.UserPreferenceValueType;
          type: SchemaTypes.UserPreferenceType;
        };
      }>;
    } & UserDetailsFragment
  >;
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
      visuals {
        name
        id
      }
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
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    id
    nameID
    displayName
    firstName
    lastName
    email
    profile {
      id
      avatar {
        id
        uri
      }
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
      visuals {
        name
        id
      }
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
export const AssignUserToOrganizationDocument = gql`
  mutation assignUserToOrganization($input: AssignOrganizationMemberInput!) {
    assignUserToOrganization(membershipData: $input) {
      displayName
      id
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
export const AssignUserAsHubAdminDocument = gql`
  mutation assignUserAsHubAdmin($membershipData: AssignEcoverseAdminInput!) {
    assignUserAsEcoverseAdmin(membershipData: $membershipData) {
      id
    }
  }
`;
export const AssignUserAsOrganizationAdminDocument = gql`
  mutation assignUserAsOrganizationAdmin(
    $membershipData: AssignOrganizationAdminInput!
  ) {
    assignUserAsOrganizationAdmin(membershipData: $membershipData) {
      id
    }
  }
`;
export const AuthorizationPolicyResetOnHubDocument = gql`
  mutation authorizationPolicyResetOnHub(
    $authorizationResetData: EcoverseAuthorizationResetInput!
  ) {
    authorizationPolicyResetOnEcoverse(
      authorizationResetData: $authorizationResetData
    ) {
      nameID
    }
  }
`;
export const AuthorizationPolicyResetOnOrganizationDocument = gql`
  mutation authorizationPolicyResetOnOrganization(
    $authorizationResetData: OrganizationAuthorizationResetInput!
  ) {
    authorizationPolicyResetOnOrganization(
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
  mutation createChallenge($challengeData: CreateChallengeOnEcoverseInput!) {
    createChallenge(challengeData: $challengeData) {
      id
      nameID
      context {
        visuals {
          name
          id
        }
      }
    }
  }
`;
export const CreateChildChallengeDocument = gql`
  mutation createChildChallenge(
    $childChallengeData: CreateChallengeOnChallengeInput!
  ) {
    createChildChallenge(challengeData: $childChallengeData) {
      id
      nameID
      displayName
      context {
        visuals {
          name
          id
        }
      }
    }
  }
`;
export const CreateGroupOnCommunityDocument = gql`
  mutation createGroupOnCommunity($groupData: CreateUserGroupInput!) {
    createGroupOnCommunity(groupData: $groupData) {
      name
      id
      profile {
        id
        avatar {
          id
        }
      }
    }
  }
`;
export const CreateGroupOnOrganizationDocument = gql`
  mutation createGroupOnOrganization($groupData: CreateUserGroupInput!) {
    createGroupOnOrganization(groupData: $groupData) {
      id
      name
      profile {
        id
        avatar {
          id
        }
      }
    }
  }
`;
export const CreateHubDocument = gql`
  mutation createHub($hubData: CreateEcoverseInput!) {
    createEcoverse(ecoverseData: $hubData) {
      id
      nameID
      context {
        visuals {
          name
          id
        }
      }
    }
  }
`;
export const CreateOpportunityDocument = gql`
  mutation createOpportunity($opportunityData: CreateOpportunityInput!) {
    createOpportunity(opportunityData: $opportunityData) {
      id
      displayName
      nameID
      context {
        visuals {
          name
          id
        }
      }
    }
  }
`;
export const CreateOrganizationDocument = gql`
  mutation createOrganization($organizationData: CreateOrganizationInput!) {
    createOrganization(organizationData: $organizationData) {
      displayName
      nameID
      id
      profile {
        id
        avatar {
          id
        }
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
        avatar {
          id
        }
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
export const UpdateHubDocument = gql`
  mutation updateHub($hubData: UpdateEcoverseInput!) {
    updateEcoverse(ecoverseData: $hubData) {
      nameID
      host {
        nameID
      }
      context {
        tagline
        visuals {
          id
          name
        }
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
      context {
        visuals {
          id
          name
        }
      }
    }
  }
`;
export const UpdateOrganizationDocument = gql`
  mutation updateOrganization($organizationData: UpdateOrganizationInput!) {
    updateOrganization(organizationData: $organizationData) {
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
export const UpdateVisualDocument = gql`
  mutation updateVisual($updateData: UpdateVisualInput!) {
    updateVisual(updateData: $updateData) {
      id
    }
  }
`;
export const ChallengeDocument = gql`
  query challenge($hubID: UUID_NAMEID!, $challengeID: UUID_NAMEID!) {
    ecoverse(ID: $hubID) {
      challenge(ID: $challengeID) {
        nameID
        id
        displayName
        community {
          id
          displayName
        }
        leadOrganizations {
          nameID
          id
        }
      }
    }
  }
`;
export const ChallengesDocument = gql`
  query challenges($hubID: UUID_NAMEID!) {
    ecoverse(ID: $hubID) {
      challenges {
        id
        nameID
        displayName
        context {
          visuals {
            name
            id
          }
        }
      }
    }
  }
`;
export const ConfigurationDocument = gql`
  query configuration {
    configuration {
      authentication {
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
export const FeatureFlagsDocument = gql`
  query featureFlags {
    configuration {
      platform {
        featureFlags {
          name
          enabled
        }
      }
    }
  }
`;
export const GroupsDocument = gql`
  query groups($hubID: UUID_NAMEID!) {
    ecoverse(ID: $hubID) {
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
  query hostInfo($hubID: UUID_NAMEID!) {
    ecoverse(ID: $hubID) {
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
export const HubDocument = gql`
  query hub($id: UUID_NAMEID!) {
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
        visuals {
          name
          uri
        }
      }
    }
  }
`;
export const HubsDocument = gql`
  query hubs {
    ecoverses {
      displayName
      id
      nameID
      context {
        visuals {
          name
          id
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
  query opportunities($hubID: UUID_NAMEID!) {
    ecoverse(ID: $hubID) {
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
  query opportunity($hubID: UUID_NAMEID!, $opportunityID: UUID_NAMEID!) {
    ecoverse(ID: $hubID) {
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
          visuals {
            name
            id
          }
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
export const OrganizationDocument = gql`
  query organization($id: UUID_NAMEID!) {
    organization(ID: $id) {
      displayName
      id
      nameID
      profile {
        id
      }
    }
  }
`;
export const OrganizationsDocument = gql`
  query organizations {
    organizations {
      displayName
      id
      nameID
      profile {
        id
        avatar {
          id
          uri
        }
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
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`;
export const UsersDocument = gql`
  query users {
    users {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`;
export const UsersWithAuthorizationCredentialDocument = gql`
  query usersWithAuthorizationCredential(
    $credentialsCriteriaData: UsersWithAuthorizationCredentialInput!
  ) {
    usersWithAuthorizationCredential(
      credentialsCriteriaData: $credentialsCriteriaData
    ) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`;
export const UsersWithAuthorizationCredentialWithPreferencesDocument = gql`
  query usersWithAuthorizationCredentialWithPreferences(
    $credentialsCriteriaData: UsersWithAuthorizationCredentialInput!
  ) {
    usersWithAuthorizationCredential(
      credentialsCriteriaData: $credentialsCriteriaData
    ) {
      ...UserDetails
      preferences {
        definition {
          group
          displayName
          description
          valueType
          type
        }
        value
      }
    }
  }
  ${UserDetailsFragmentDoc}
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
    assignUserToOrganization(
      variables: AssignUserToOrganizationMutationVariables
    ): Promise<{
      data?: AssignUserToOrganizationMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AssignUserToOrganizationMutation>(
          print(AssignUserToOrganizationDocument),
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
    assignUserAsHubAdmin(
      variables: AssignUserAsHubAdminMutationVariables
    ): Promise<{
      data?: AssignUserAsHubAdminMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AssignUserAsHubAdminMutation>(
          print(AssignUserAsHubAdminDocument),
          variables
        )
      );
    },
    assignUserAsOrganizationAdmin(
      variables: AssignUserAsOrganizationAdminMutationVariables
    ): Promise<{
      data?: AssignUserAsOrganizationAdminMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AssignUserAsOrganizationAdminMutation>(
          print(AssignUserAsOrganizationAdminDocument),
          variables
        )
      );
    },
    authorizationPolicyResetOnHub(
      variables: AuthorizationPolicyResetOnHubMutationVariables
    ): Promise<{
      data?: AuthorizationPolicyResetOnHubMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AuthorizationPolicyResetOnHubMutation>(
          print(AuthorizationPolicyResetOnHubDocument),
          variables
        )
      );
    },
    authorizationPolicyResetOnOrganization(
      variables: AuthorizationPolicyResetOnOrganizationMutationVariables
    ): Promise<{
      data?: AuthorizationPolicyResetOnOrganizationMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AuthorizationPolicyResetOnOrganizationMutation>(
          print(AuthorizationPolicyResetOnOrganizationDocument),
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
    createGroupOnOrganization(
      variables: CreateGroupOnOrganizationMutationVariables
    ): Promise<{
      data?: CreateGroupOnOrganizationMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateGroupOnOrganizationMutation>(
          print(CreateGroupOnOrganizationDocument),
          variables
        )
      );
    },
    createHub(
      variables: CreateHubMutationVariables
    ): Promise<{
      data?: CreateHubMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateHubMutation>(
          print(CreateHubDocument),
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
    createOrganization(
      variables: CreateOrganizationMutationVariables
    ): Promise<{
      data?: CreateOrganizationMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateOrganizationMutation>(
          print(CreateOrganizationDocument),
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
    updateHub(
      variables: UpdateHubMutationVariables
    ): Promise<{
      data?: UpdateHubMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UpdateHubMutation>(
          print(UpdateHubDocument),
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
    updateOrganization(
      variables: UpdateOrganizationMutationVariables
    ): Promise<{
      data?: UpdateOrganizationMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UpdateOrganizationMutation>(
          print(UpdateOrganizationDocument),
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
    updateVisual(
      variables: UpdateVisualMutationVariables
    ): Promise<{
      data?: UpdateVisualMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UpdateVisualMutation>(
          print(UpdateVisualDocument),
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
    featureFlags(
      variables?: FeatureFlagsQueryVariables
    ): Promise<{
      data?: FeatureFlagsQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<FeatureFlagsQuery>(
          print(FeatureFlagsDocument),
          variables
        )
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
    hub(
      variables: HubQueryVariables
    ): Promise<{
      data?: HubQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<HubQuery>(print(HubDocument), variables)
      );
    },
    hubs(
      variables?: HubsQueryVariables
    ): Promise<{
      data?: HubsQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<HubsQuery>(print(HubsDocument), variables)
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
    organization(
      variables: OrganizationQueryVariables
    ): Promise<{
      data?: OrganizationQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<OrganizationQuery>(
          print(OrganizationDocument),
          variables
        )
      );
    },
    organizations(
      variables?: OrganizationsQueryVariables
    ): Promise<{
      data?: OrganizationsQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<OrganizationsQuery>(
          print(OrganizationsDocument),
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
    usersWithAuthorizationCredential(
      variables: UsersWithAuthorizationCredentialQueryVariables
    ): Promise<{
      data?: UsersWithAuthorizationCredentialQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UsersWithAuthorizationCredentialQuery>(
          print(UsersWithAuthorizationCredentialDocument),
          variables
        )
      );
    },
    usersWithAuthorizationCredentialWithPreferences(
      variables: UsersWithAuthorizationCredentialWithPreferencesQueryVariables
    ): Promise<{
      data?: UsersWithAuthorizationCredentialWithPreferencesQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<UsersWithAuthorizationCredentialWithPreferencesQuery>(
          print(UsersWithAuthorizationCredentialWithPreferencesDocument),
          variables
        )
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
