/* eslint-disable @typescript-eslint/no-explicit-any */
import * as SchemaTypes from './types/cherrytwist-schema';

import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import { GraphQLError } from 'graphql-request/dist/types';
import { Headers } from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type ChallengeDetailsFragment = {
  id: string;
  name: string;
  tagset?: SchemaTypes.Maybe<{ tags: Array<string>; id: string; name: string }>;
  groups?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
};

export type AddChallengeLeadMutationVariables = SchemaTypes.Exact<{
  challengeID: SchemaTypes.Scalars['Float'];
  organisationID: SchemaTypes.Scalars['Float'];
}>;

export type AddChallengeLeadMutation = { addChallengeLead: boolean };

export type AddTagToTagsetMutationVariables = SchemaTypes.Exact<{
  tag: SchemaTypes.Scalars['String'];
  tagsetID: SchemaTypes.Scalars['Float'];
}>;

export type AddTagToTagsetMutation = {
  addTagToTagset: { id: string; name: string; tags: Array<string> };
};

export type AddUserToChallengeMutationVariables = SchemaTypes.Exact<{
  userID: SchemaTypes.Scalars['Float'];
  challengeID: SchemaTypes.Scalars['Float'];
}>;

export type AddUserToChallengeMutation = {
  addUserToChallenge: {
    name: string;
    id: string;
    members?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
  };
};

export type AddUserToGroupMutationVariables = SchemaTypes.Exact<{
  userID: SchemaTypes.Scalars['Float'];
  groupID: SchemaTypes.Scalars['Float'];
}>;

export type AddUserToGroupMutation = { addUserToGroup: boolean };

export type CreateActorGroupMutationVariables = SchemaTypes.Exact<{
  actorGroupData: SchemaTypes.ActorGroupInput;
  opportunityID: SchemaTypes.Scalars['Float'];
}>;

export type CreateActorGroupMutation = {
  createActorGroup: { id: string; name: string };
};

export type CreateActorMutationVariables = SchemaTypes.Exact<{
  actorData: SchemaTypes.ActorInput;
  actorGroupID: SchemaTypes.Scalars['Float'];
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
  aspectData: SchemaTypes.AspectInput;
  opportunityID: SchemaTypes.Scalars['Float'];
}>;

export type CreateAspectMutation = {
  createAspect: { title: string; framing: string; explanation: string };
};

export type CreateChallengeMutationVariables = SchemaTypes.Exact<{
  challengeData: SchemaTypes.ChallengeInput;
}>;

export type CreateChallengeMutation = {
  createChallenge: ChallengeDetailsFragment;
};

export type CreateGroupOnChallengeMutationVariables = SchemaTypes.Exact<{
  groupName: SchemaTypes.Scalars['String'];
  challengeID: SchemaTypes.Scalars['Float'];
}>;

export type CreateGroupOnChallengeMutation = {
  createGroupOnChallenge: { name: string; id: string };
};

export type CreateGroupOnEcoverseMutationVariables = SchemaTypes.Exact<{
  groupName: SchemaTypes.Scalars['String'];
}>;

export type CreateGroupOnEcoverseMutation = {
  createGroupOnEcoverse: {
    id: string;
    name: string;
    profile?: SchemaTypes.Maybe<{
      tagsets?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
    }>;
  };
};

export type CreateGroupOnOrganisationMutationVariables = SchemaTypes.Exact<{
  groupName: SchemaTypes.Scalars['String'];
  organisationID: SchemaTypes.Scalars['Float'];
}>;

export type CreateGroupOnOrganisationMutation = {
  createGroupOnOrganisation: { id: string; name: string };
};

export type CreateOpportunityMutationVariables = SchemaTypes.Exact<{
  opportunityData: SchemaTypes.OpportunityInput;
  challengeID: SchemaTypes.Scalars['Float'];
}>;

export type CreateOpportunityMutation = {
  createOpportunityOnChallenge: { id: string; name: string; textID: string };
};

export type CreateOrganisationMutationVariables = SchemaTypes.Exact<{
  organisationData: SchemaTypes.OrganisationInput;
}>;

export type CreateOrganisationMutation = {
  createOrganisation: { name: string; id: string; profile: { id: string } };
};

export type CreateReferenceOnProfileMutationVariables = SchemaTypes.Exact<{
  referenceInput: SchemaTypes.ReferenceInput;
  profileID: SchemaTypes.Scalars['Float'];
}>;

export type CreateReferenceOnProfileMutation = {
  createReferenceOnProfile: { name: string; uri: string; description: string };
};

export type CreateRelationMutationVariables = SchemaTypes.Exact<{
  relationData: SchemaTypes.RelationInput;
  opportunityID: SchemaTypes.Scalars['Float'];
}>;

export type CreateRelationMutation = { createRelation: { type: string } };

export type CreateTagsetOnProfileMutationVariables = SchemaTypes.Exact<{
  tagsetName: SchemaTypes.Scalars['String'];
  profileID: SchemaTypes.Scalars['Float'];
}>;

export type CreateTagsetOnProfileMutation = {
  createTagsetOnProfile: { id: string; tags: Array<string> };
};

export type CreateUserMutationVariables = SchemaTypes.Exact<{
  userData: SchemaTypes.UserInput;
}>;

export type CreateUserMutation = {
  createUserProfile: {
    name: string;
    id: string;
    profile?: SchemaTypes.Maybe<{ id: string }>;
  };
};

export type ReplaceTagsOnTagsetMutationVariables = SchemaTypes.Exact<{
  tags: Array<SchemaTypes.Scalars['String']>;
  tagsetID: SchemaTypes.Scalars['Float'];
}>;

export type ReplaceTagsOnTagsetMutation = {
  replaceTagsOnTagset: { name: string; tags: Array<string> };
};

export type UpdateActorMutationVariables = SchemaTypes.Exact<{
  actorData: SchemaTypes.ActorInput;
  ID: SchemaTypes.Scalars['Float'];
}>;

export type UpdateActorMutation = { updateActor: { name: string } };

export type UpdateChallengeMutationVariables = SchemaTypes.Exact<{
  challengeID: SchemaTypes.Scalars['Float'];
  challengeData: SchemaTypes.ChallengeInput;
}>;

export type UpdateChallengeMutation = {
  updateChallenge: ChallengeDetailsFragment;
};

export type UpdateEcoverseMutationVariables = SchemaTypes.Exact<{
  ecoverseData: SchemaTypes.EcoverseInput;
}>;

export type UpdateEcoverseMutation = {
  updateEcoverse: {
    name: string;
    context?: SchemaTypes.Maybe<{ tagline?: SchemaTypes.Maybe<string> }>;
  };
};

export type UpdateOrganisationMutationVariables = SchemaTypes.Exact<{
  orgID: SchemaTypes.Scalars['Float'];
  organisationData: SchemaTypes.OrganisationInput;
}>;

export type UpdateOrganisationMutation = {
  updateOrganisation: {
    id: string;
    name: string;
    profile: {
      id: string;
      references?: SchemaTypes.Maybe<
        Array<{ id: string; name: string; uri: string }>
      >;
    };
  };
};

export type UpdateProfileMutationVariables = SchemaTypes.Exact<{
  profileData: SchemaTypes.ProfileInput;
  ID: SchemaTypes.Scalars['Float'];
}>;

export type UpdateProfileMutation = { updateProfile: boolean };

export type ChallengesBaseQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type ChallengesBaseQuery = {
  challenges: Array<{ id: string; name: string }>;
};

export type ChallengesQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type ChallengesQuery = { challenges: Array<ChallengeDetailsFragment> };

export type EcoverseNameQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type EcoverseNameQuery = { name: string };

export type GroupsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type GroupsQuery = { groups: Array<{ id: string; name: string }> };

export type HostInfoQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type HostInfoQuery = {
  host: {
    id: string;
    name: string;
    profile: {
      id: string;
      tagsets?: SchemaTypes.Maybe<
        Array<{ id: string; name: string; tags: Array<string> }>
      >;
    };
  };
};

export type OpportunitiesQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type OpportunitiesQuery = {
  opportunities: Array<
    {
      id: string;
      actorGroups?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
    } & OpportunityProfileFragment
  >;
};

export type OpportunityProfileFragment = {
  textID: string;
  name: string;
  state?: SchemaTypes.Maybe<string>;
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

export type OrganisationsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type OrganisationsQuery = {
  organisations: Array<{
    name: string;
    id: string;
    profile: {
      id: string;
      avatar?: SchemaTypes.Maybe<string>;
      description?: SchemaTypes.Maybe<string>;
    };
  }>;
};

export type UserQueryVariables = SchemaTypes.Exact<{
  email: SchemaTypes.Scalars['String'];
}>;

export type UserQuery = {
  user: {
    name: string;
    id: string;
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
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    profile?: SchemaTypes.Maybe<{
      id: string;
      avatar?: SchemaTypes.Maybe<string>;
      description?: SchemaTypes.Maybe<string>;
    }>;
  }>;
};

export const ChallengeDetailsFragmentDoc = gql`
  fragment ChallengeDetails on Challenge {
    id
    name
    tagset {
      tags
      id
      name
    }
    groups {
      id
      name
    }
  }
`;
export const OpportunityProfileFragmentDoc = gql`
  fragment OpportunityProfile on Opportunity {
    textID
    name
    state
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
  mutation addChallengeLead($challengeID: Float!, $organisationID: Float!) {
    addChallengeLead(organisationID: $organisationID, challengeID: $challengeID)
  }
`;
export const AddTagToTagsetDocument = gql`
  mutation addTagToTagset($tag: String!, $tagsetID: Float!) {
    addTagToTagset(tag: $tag, tagsetID: $tagsetID) {
      id
      name
      tags
    }
  }
`;
export const AddUserToChallengeDocument = gql`
  mutation addUserToChallenge($userID: Float!, $challengeID: Float!) {
    addUserToChallenge(challengeID: $challengeID, userID: $userID) {
      name
      id
      members {
        id
        name
      }
    }
  }
`;
export const AddUserToGroupDocument = gql`
  mutation addUserToGroup($userID: Float!, $groupID: Float!) {
    addUserToGroup(userID: $userID, groupID: $groupID)
  }
`;
export const CreateActorGroupDocument = gql`
  mutation createActorGroup(
    $actorGroupData: ActorGroupInput!
    $opportunityID: Float!
  ) {
    createActorGroup(
      actorGroupData: $actorGroupData
      opportunityID: $opportunityID
    ) {
      id
      name
    }
  }
`;
export const CreateActorDocument = gql`
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
export const CreateAspectDocument = gql`
  mutation createAspect($aspectData: AspectInput!, $opportunityID: Float!) {
    createAspect(aspectData: $aspectData, opportunityID: $opportunityID) {
      title
      framing
      explanation
    }
  }
`;
export const CreateChallengeDocument = gql`
  mutation createChallenge($challengeData: ChallengeInput!) {
    createChallenge(challengeData: $challengeData) {
      ...ChallengeDetails
    }
  }
  ${ChallengeDetailsFragmentDoc}
`;
export const CreateGroupOnChallengeDocument = gql`
  mutation createGroupOnChallenge($groupName: String!, $challengeID: Float!) {
    createGroupOnChallenge(groupName: $groupName, challengeID: $challengeID) {
      name
      id
    }
  }
`;
export const CreateGroupOnEcoverseDocument = gql`
  mutation createGroupOnEcoverse($groupName: String!) {
    createGroupOnEcoverse(groupName: $groupName) {
      id
      name
      profile {
        tagsets {
          name
          id
        }
      }
    }
  }
`;
export const CreateGroupOnOrganisationDocument = gql`
  mutation createGroupOnOrganisation(
    $groupName: String!
    $organisationID: Float!
  ) {
    createGroupOnOrganisation(groupName: $groupName, orgID: $organisationID) {
      id
      name
    }
  }
`;
export const CreateOpportunityDocument = gql`
  mutation createOpportunity(
    $opportunityData: OpportunityInput!
    $challengeID: Float!
  ) {
    createOpportunityOnChallenge(
      opportunityData: $opportunityData
      challengeID: $challengeID
    ) {
      id
      name
      textID
    }
  }
`;
export const CreateOrganisationDocument = gql`
  mutation createOrganisation($organisationData: OrganisationInput!) {
    createOrganisation(organisationData: $organisationData) {
      name
      id
      profile {
        id
      }
    }
  }
`;
export const CreateReferenceOnProfileDocument = gql`
  mutation createReferenceOnProfile(
    $referenceInput: ReferenceInput!
    $profileID: Float!
  ) {
    createReferenceOnProfile(
      referenceInput: $referenceInput
      profileID: $profileID
    ) {
      name
      uri
      description
    }
  }
`;
export const CreateRelationDocument = gql`
  mutation createRelation(
    $relationData: RelationInput!
    $opportunityID: Float!
  ) {
    createRelation(relationData: $relationData, opportunityID: $opportunityID) {
      type
    }
  }
`;
export const CreateTagsetOnProfileDocument = gql`
  mutation createTagsetOnProfile($tagsetName: String!, $profileID: Float!) {
    createTagsetOnProfile(tagsetName: $tagsetName, profileID: $profileID) {
      id
      tags
    }
  }
`;
export const CreateUserDocument = gql`
  mutation createUser($userData: UserInput!) {
    createUserProfile(userData: $userData) {
      name
      id
      profile {
        id
      }
    }
  }
`;
export const ReplaceTagsOnTagsetDocument = gql`
  mutation replaceTagsOnTagset($tags: [String!]!, $tagsetID: Float!) {
    replaceTagsOnTagset(tags: $tags, tagsetID: $tagsetID) {
      name
      tags
    }
  }
`;
export const UpdateActorDocument = gql`
  mutation updateActor($actorData: ActorInput!, $ID: Float!) {
    updateActor(actorData: $actorData, ID: $ID) {
      name
    }
  }
`;
export const UpdateChallengeDocument = gql`
  mutation updateChallenge(
    $challengeID: Float!
    $challengeData: ChallengeInput!
  ) {
    updateChallenge(challengeID: $challengeID, challengeData: $challengeData) {
      ...ChallengeDetails
    }
  }
  ${ChallengeDetailsFragmentDoc}
`;
export const UpdateEcoverseDocument = gql`
  mutation updateEcoverse($ecoverseData: EcoverseInput!) {
    updateEcoverse(ecoverseData: $ecoverseData) {
      name
      context {
        tagline
      }
    }
  }
`;
export const UpdateOrganisationDocument = gql`
  mutation updateOrganisation(
    $orgID: Float!
    $organisationData: OrganisationInput!
  ) {
    updateOrganisation(orgID: $orgID, organisationData: $organisationData) {
      id
      name
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
  mutation updateProfile($profileData: ProfileInput!, $ID: Float!) {
    updateProfile(profileData: $profileData, ID: $ID)
  }
`;
export const ChallengesBaseDocument = gql`
  query challengesBase {
    challenges {
      id
      name
    }
  }
`;
export const ChallengesDocument = gql`
  query challenges {
    challenges {
      ...ChallengeDetails
    }
  }
  ${ChallengeDetailsFragmentDoc}
`;
export const EcoverseNameDocument = gql`
  query ecoverseName {
    name
  }
`;
export const GroupsDocument = gql`
  query groups {
    groups {
      id
      name
    }
  }
`;
export const HostInfoDocument = gql`
  query hostInfo {
    host {
      id
      name
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
`;
export const OpportunitiesDocument = gql`
  query opportunities {
    opportunities {
      id
      ...OpportunityProfile
      actorGroups {
        id
        name
      }
    }
  }
  ${OpportunityProfileFragmentDoc}
`;
export const OrganisationsDocument = gql`
  query organisations {
    organisations {
      name
      id
      profile {
        id
        avatar
        description
      }
    }
  }
`;
export const UserDocument = gql`
  query user($email: String!) {
    user(ID: $email) {
      name
      id
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
      name
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
    addTagToTagset(
      variables: AddTagToTagsetMutationVariables
    ): Promise<{
      data?: AddTagToTagsetMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AddTagToTagsetMutation>(
          print(AddTagToTagsetDocument),
          variables
        )
      );
    },
    addUserToChallenge(
      variables: AddUserToChallengeMutationVariables
    ): Promise<{
      data?: AddUserToChallengeMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<AddUserToChallengeMutation>(
          print(AddUserToChallengeDocument),
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
    createGroupOnChallenge(
      variables: CreateGroupOnChallengeMutationVariables
    ): Promise<{
      data?: CreateGroupOnChallengeMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateGroupOnChallengeMutation>(
          print(CreateGroupOnChallengeDocument),
          variables
        )
      );
    },
    createGroupOnEcoverse(
      variables: CreateGroupOnEcoverseMutationVariables
    ): Promise<{
      data?: CreateGroupOnEcoverseMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<CreateGroupOnEcoverseMutation>(
          print(CreateGroupOnEcoverseDocument),
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
    replaceTagsOnTagset(
      variables: ReplaceTagsOnTagsetMutationVariables
    ): Promise<{
      data?: ReplaceTagsOnTagsetMutation | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<ReplaceTagsOnTagsetMutation>(
          print(ReplaceTagsOnTagsetDocument),
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
    challengesBase(
      variables?: ChallengesBaseQueryVariables
    ): Promise<{
      data?: ChallengesBaseQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<ChallengesBaseQuery>(
          print(ChallengesBaseDocument),
          variables
        )
      );
    },
    challenges(
      variables?: ChallengesQueryVariables
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
    ecoverseName(
      variables?: EcoverseNameQueryVariables
    ): Promise<{
      data?: EcoverseNameQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<EcoverseNameQuery>(
          print(EcoverseNameDocument),
          variables
        )
      );
    },
    groups(
      variables?: GroupsQueryVariables
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
      variables?: HostInfoQueryVariables
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
    opportunities(
      variables?: OpportunitiesQueryVariables
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
