/* eslint-disable @typescript-eslint/no-explicit-any */
import * as SchemaTypes from './types/cherrytwist-schema';

import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import { GraphQLError } from 'graphql-request/dist/types';
import { Headers } from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type ChallengeDetailsFragment = {
  id: any;
  nameID: any;
  tagset?: SchemaTypes.Maybe<{ tags: Array<string>; id: any; name: string }>;
  community?: SchemaTypes.Maybe<{
    groups?: SchemaTypes.Maybe<Array<{ id: any; name: string }>>;
  }>;
  context?: SchemaTypes.Maybe<{
    ecosystemModel?: SchemaTypes.Maybe<{
      id: any;
      actorGroups?: SchemaTypes.Maybe<Array<{ name: string; id: any }>>;
    }>;
  }>;
};

export type OpportunityDetailsFragment = {
  id: any;
  nameID: any;
  tagset?: SchemaTypes.Maybe<{ tags: Array<string>; id: any; name: string }>;
  community?: SchemaTypes.Maybe<{
    groups?: SchemaTypes.Maybe<Array<{ id: any; name: string }>>;
  }>;
};

export type AddChallengeLeadMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.AssignChallengeLeadInput;
}>;

export type AddChallengeLeadMutation = {
  assignChallengeLead: {
    id: any;
    leadOrganisations: Array<{ id: any; nameID: any }>;
  };
};

export type AddUserToCommunityMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.AssignCommunityMemberInput;
}>;

export type AddUserToCommunityMutation = {
  assignUserToCommunity: { nameID: any; id: any };
};

export type AddUserToGroupMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.AssignUserGroupMemberInput;
}>;

export type AddUserToGroupMutation = {
  assignUserToGroup: {
    id: any;
    members?: SchemaTypes.Maybe<
      Array<{ id: any; email: string; firstName: string; lastName: string }>
    >;
  };
};

export type CreateActorGroupMutationVariables = SchemaTypes.Exact<{
  actorGroupData: SchemaTypes.CreateActorGroupInput;
}>;

export type CreateActorGroupMutation = {
  createActorGroup: { id: any; name: string };
};

export type CreateActorMutationVariables = SchemaTypes.Exact<{
  actorData: SchemaTypes.CreateActorInput;
}>;

export type CreateActorMutation = {
  createActor: {
    id: any;
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
  createChallenge: { id: any; nameID: any };
};

export type CreateChildChallengeMutationVariables = SchemaTypes.Exact<{
  childChallengeData: SchemaTypes.CreateChallengeInput;
}>;

export type CreateChildChallengeMutation = {
  createChildChallenge: { id: any; nameID: any; displayName: string };
};

export type CreateEcoverseMutationVariables = SchemaTypes.Exact<{
  ecoverseData: SchemaTypes.CreateEcoverseInput;
}>;

export type CreateEcoverseMutation = {
  createEcoverse: { id: any; nameID: any };
};

export type CreateGroupOnCommunityMutationVariables = SchemaTypes.Exact<{
  groupData: SchemaTypes.CreateUserGroupInput;
}>;

export type CreateGroupOnCommunityMutation = {
  createGroupOnCommunity: { name: string; id: any };
};

export type CreateGroupOnOrganisationMutationVariables = SchemaTypes.Exact<{
  groupData: SchemaTypes.CreateUserGroupInput;
}>;

export type CreateGroupOnOrganisationMutation = {
  createGroupOnOrganisation: { id: any; name: string };
};

export type CreateOpportunityMutationVariables = SchemaTypes.Exact<{
  opportunityData: SchemaTypes.CreateOpportunityInput;
}>;

export type CreateOpportunityMutation = {
  createOpportunity: { id: any; displayName: string; nameID: any };
};

export type CreateOrganisationMutationVariables = SchemaTypes.Exact<{
  organisationData: SchemaTypes.CreateOrganisationInput;
}>;

export type CreateOrganisationMutation = {
  createOrganisation: {
    displayName: string;
    nameID: any;
    id: any;
    profile: { id: any };
  };
};

export type CreateReferenceOnContextMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.CreateReferenceInput;
}>;

export type CreateReferenceOnContextMutation = {
  createReferenceOnContext: {
    id: any;
    name: string;
    description: string;
    uri: string;
  };
};

export type CreateReferenceOnProfileMutationVariables = SchemaTypes.Exact<{
  referenceInput: SchemaTypes.CreateReferenceInput;
}>;

export type CreateReferenceOnProfileMutation = {
  createReferenceOnProfile: { name: string; uri: string; description: string };
};

export type CreateRelationMutationVariables = SchemaTypes.Exact<{
  relationData: SchemaTypes.CreateRelationInput;
}>;

export type CreateRelationMutation = { createRelation: { type: string } };

export type CreateTagsetOnProfileMutationVariables = SchemaTypes.Exact<{
  tagsetData: SchemaTypes.CreateTagsetInput;
}>;

export type CreateTagsetOnProfileMutation = {
  createTagsetOnProfile: { id: any; tags: Array<string> };
};

export type CreateUserMutationVariables = SchemaTypes.Exact<{
  userData: SchemaTypes.CreateUserInput;
}>;

export type CreateUserMutation = {
  createUser: {
    nameID: any;
    id: any;
    profile?: SchemaTypes.Maybe<{ id: any }>;
  };
};

export type DeleteReferenceMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.DeleteReferenceInput;
}>;

export type DeleteReferenceMutation = {
  deleteReference: { id: any; name: string; description: string; uri: string };
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
    nameID: any;
    host?: SchemaTypes.Maybe<{ nameID: any }>;
    context?: SchemaTypes.Maybe<{ tagline?: SchemaTypes.Maybe<string> }>;
  };
};

export type UpdateOrganisationMutationVariables = SchemaTypes.Exact<{
  organisationData: SchemaTypes.UpdateOrganisationInput;
}>;

export type UpdateOrganisationMutation = {
  updateOrganisation: {
    id: any;
    nameID: any;
    profile: {
      id: any;
      references?: SchemaTypes.Maybe<
        Array<{ id: any; name: string; uri: string }>
      >;
    };
  };
};

export type UpdateProfileMutationVariables = SchemaTypes.Exact<{
  profileData: SchemaTypes.UpdateProfileInput;
}>;

export type UpdateProfileMutation = { updateProfile: { id: any } };

export type ChallengeQueryVariables = SchemaTypes.Exact<{
  ecoverseID: SchemaTypes.Scalars['UUID_NAMEID'];
  challengeID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type ChallengeQuery = {
  ecoverse: {
    challenge: {
      nameID: any;
      id: any;
      displayName: string;
      community?: SchemaTypes.Maybe<{ id: any; displayName: string }>;
    };
  };
};

export type ChallengesQueryVariables = SchemaTypes.Exact<{
  ecoverseID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type ChallengesQuery = {
  ecoverse: {
    challenges?: SchemaTypes.Maybe<
      Array<{ id: any; nameID: any; displayName: string }>
    >;
  };
};

export type EcoverseQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type EcoverseQuery = {
  ecoverse: {
    id: any;
    nameID: any;
    displayName: string;
    community?: SchemaTypes.Maybe<{ id: any }>;
    context?: SchemaTypes.Maybe<{
      id: any;
      references?: SchemaTypes.Maybe<
        Array<{ id: any; name: string; description: string; uri: string }>
      >;
    }>;
  };
};

export type EcoversesQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type EcoversesQuery = {
  ecoverses: Array<{ displayName: string; id: any; nameID: any }>;
};

export type GroupsQueryVariables = SchemaTypes.Exact<{
  ecoverseID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type GroupsQuery = {
  ecoverse: {
    community?: SchemaTypes.Maybe<{
      groups?: SchemaTypes.Maybe<Array<{ id: any; name: string }>>;
    }>;
  };
};

export type HostInfoQueryVariables = SchemaTypes.Exact<{
  ecoverseID: SchemaTypes.Scalars['UUID_NAMEID'];
}>;

export type HostInfoQuery = {
  ecoverse: {
    host?: SchemaTypes.Maybe<{
      id: any;
      nameID: any;
      displayName: string;
      profile: {
        id: any;
        tagsets?: SchemaTypes.Maybe<
          Array<{ id: any; name: string; tags: Array<string> }>
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
        id: any;
        context?: SchemaTypes.Maybe<{
          ecosystemModel?: SchemaTypes.Maybe<{
            actorGroups?: SchemaTypes.Maybe<Array<{ id: any; name: string }>>;
          }>;
        }>;
        relations?: SchemaTypes.Maybe<Array<{ actorName: string }>>;
      } & OpportunityProfileFragment
    >;
  };
};

export type OpportunityProfileFragment = {
  nameID: any;
  displayName: string;
  lifecycle?: SchemaTypes.Maybe<{ state?: SchemaTypes.Maybe<string> }>;
  context?: SchemaTypes.Maybe<{
    tagline?: SchemaTypes.Maybe<string>;
    background?: SchemaTypes.Maybe<string>;
    vision?: SchemaTypes.Maybe<string>;
    impact?: SchemaTypes.Maybe<string>;
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
      id: any;
      nameID: any;
      community?: SchemaTypes.Maybe<{ id: any; displayName: string }>;
      context?: SchemaTypes.Maybe<{
        id: any;
        ecosystemModel?: SchemaTypes.Maybe<{
          id: any;
          actorGroups?: SchemaTypes.Maybe<
            Array<{
              id: any;
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
    id: any;
    nameID: any;
    profile: { id: any };
  };
};

export type OrganisationsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type OrganisationsQuery = {
  organisations: Array<{
    displayName: string;
    id: any;
    nameID: any;
    profile: {
      id: any;
      avatar?: SchemaTypes.Maybe<string>;
      description?: SchemaTypes.Maybe<string>;
    };
  }>;
};

export type UserQueryVariables = SchemaTypes.Exact<{
  userID: SchemaTypes.Scalars['UUID_NAMEID_EMAIL'];
}>;

export type UserQuery = {
  user: {
    displayName: string;
    id: any;
    nameID: any;
    profile?: SchemaTypes.Maybe<{
      id: any;
      avatar?: SchemaTypes.Maybe<string>;
    }>;
  };
};

export type UsersQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type UsersQuery = {
  users: Array<{
    id: any;
    nameID: any;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    profile?: SchemaTypes.Maybe<{
      id: any;
      avatar?: SchemaTypes.Maybe<string>;
      description?: SchemaTypes.Maybe<string>;
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
export const AddChallengeLeadDocument = gql`
  mutation addChallengeLead($input: AssignChallengeLeadInput!) {
    assignChallengeLead(assignInput: $input) {
      id
      leadOrganisations {
        id
        nameID
      }
    }
  }
`;
export const AddUserToCommunityDocument = gql`
  mutation addUserToCommunity($input: AssignCommunityMemberInput!) {
    assignUserToCommunity(membershipData: $input) {
      nameID
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
  mutation createReferenceOnContext($input: CreateReferenceInput!) {
    createReferenceOnContext(referenceInput: $input) {
      id
      name
      description
      uri
    }
  }
`;
export const CreateReferenceOnProfileDocument = gql`
  mutation createReferenceOnProfile($referenceInput: CreateReferenceInput!) {
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
  mutation createTagsetOnProfile($tagsetData: CreateTagsetInput!) {
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
    addChallengeLead(
      variables: AddChallengeLeadMutationVariables
    ): Promise<{
      data?: AddChallengeLeadMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AddChallengeLeadMutation>(
          print(AddChallengeLeadDocument),
          variables
        )
      );
    },
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
