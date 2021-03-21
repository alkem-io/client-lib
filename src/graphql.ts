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
  community?: SchemaTypes.Maybe<{
    groups?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
  }>;
};

export type OpportunityDetailsFragment = {
  id: string;
  name: string;
  tagset?: SchemaTypes.Maybe<{ tags: Array<string>; id: string; name: string }>;
  community?: SchemaTypes.Maybe<{
    groups?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
  }>;
};

export type AddChallengeLeadMutationVariables = SchemaTypes.Exact<{
  challengeID: SchemaTypes.Scalars['String'];
  organisationID: SchemaTypes.Scalars['String'];
}>;

export type AddChallengeLeadMutation = { addChallengeLead: boolean };

export type AddTagToTagsetMutationVariables = SchemaTypes.Exact<{
  tag: SchemaTypes.Scalars['String'];
  tagsetID: SchemaTypes.Scalars['Float'];
}>;

export type AddTagToTagsetMutation = {
  addTagToTagset: { id: string; name: string; tags: Array<string> };
};

export type AddUserToCommunityMutationVariables = SchemaTypes.Exact<{
  userID: SchemaTypes.Scalars['Float'];
  communityID: SchemaTypes.Scalars['Float'];
}>;

export type AddUserToCommunityMutation = {
  addUserToCommunity: {
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

export type CreateGroupOnCommunityMutationVariables = SchemaTypes.Exact<{
  groupName: SchemaTypes.Scalars['String'];
  communityID: SchemaTypes.Scalars['Float'];
}>;

export type CreateGroupOnCommunityMutation = {
  createGroupOnCommunity: { name: string; id: string };
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
}>;

export type CreateOpportunityMutation = {
  createOpportunity: { id: string; name: string; textID: string };
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
  createUser: {
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
  challengeData: SchemaTypes.UpdateChallengeInput;
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

export type UpdateOpportunityMutationVariables = SchemaTypes.Exact<{
  opportunityData: SchemaTypes.UpdateOpportunityInput;
}>;

export type UpdateOpportunityMutation = {
  updateOpportunity: OpportunityDetailsFragment;
};

export type UpdateOrganisationMutationVariables = SchemaTypes.Exact<{
  organisationData: SchemaTypes.UpdateOrganisationInput;
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

export type ChallengeQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['String'];
}>;

export type ChallengeQuery = {
  challenge: {
    name: string;
    id: string;
    community?: SchemaTypes.Maybe<{ id: string; name: string }>;
  };
};

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

export type EcoverseInfoQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type EcoverseInfoQuery = {
  ecoverse: { name: string; community?: SchemaTypes.Maybe<{ id: string }> };
};

export type GroupsQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type GroupsQuery = {
  ecoverse: {
    community?: SchemaTypes.Maybe<{
      groups?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
    }>;
  };
};

export type HostInfoQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type HostInfoQuery = {
  ecoverse: {
    host?: SchemaTypes.Maybe<{
      id: string;
      name: string;
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

export type OpportunityQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['String'];
}>;

export type OpportunityQuery = {
  opportunity: {
    name: string;
    id: string;
    community?: SchemaTypes.Maybe<{ id: string; name: string }>;
  };
};

export type OrganisationQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['String'];
}>;

export type OrganisationQuery = {
  organisation: { name: string; id: string; profile: { id: string } };
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
    community {
      groups {
        id
        name
      }
    }
  }
`;
export const OpportunityDetailsFragmentDoc = gql`
  fragment OpportunityDetails on Opportunity {
    id
    name
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
  mutation addChallengeLead($challengeID: String!, $organisationID: String!) {
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
export const AddUserToCommunityDocument = gql`
  mutation addUserToCommunity($userID: Float!, $communityID: Float!) {
    addUserToCommunity(communityID: $communityID, userID: $userID) {
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
export const CreateGroupOnCommunityDocument = gql`
  mutation createGroupOnCommunity($groupName: String!, $communityID: Float!) {
    createGroupOnCommunity(groupName: $groupName, communityID: $communityID) {
      name
      id
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
  mutation createOpportunity($opportunityData: OpportunityInput!) {
    createOpportunity(opportunityData: $opportunityData) {
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
    createUser(userData: $userData) {
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
  mutation updateChallenge($challengeData: UpdateChallengeInput!) {
    updateChallenge(challengeData: $challengeData) {
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
export const UpdateOpportunityDocument = gql`
  mutation updateOpportunity($opportunityData: UpdateOpportunityInput!) {
    updateOpportunity(opportunityData: $opportunityData) {
      ...OpportunityDetails
    }
  }
  ${OpportunityDetailsFragmentDoc}
`;
export const UpdateOrganisationDocument = gql`
  mutation updateOrganisation($organisationData: UpdateOrganisationInput!) {
    updateOrganisation(organisationData: $organisationData) {
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
export const ChallengeDocument = gql`
  query challenge($id: String!) {
    challenge(ID: $id) {
      name
      id
      community {
        id
        name
      }
    }
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
export const EcoverseInfoDocument = gql`
  query ecoverseInfo {
    ecoverse {
      name
      community {
        id
      }
    }
  }
`;
export const GroupsDocument = gql`
  query groups {
    ecoverse {
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
  query hostInfo {
    ecoverse {
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
export const OpportunityDocument = gql`
  query opportunity($id: String!) {
    opportunity(ID: $id) {
      name
      id
      community {
        id
        name
      }
    }
  }
`;
export const OrganisationDocument = gql`
  query organisation($id: String!) {
    organisation(ID: $id) {
      name
      id
      profile {
        id
      }
    }
  }
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
    ecoverseInfo(
      variables?: EcoverseInfoQueryVariables
    ): Promise<{
      data?: EcoverseInfoQuery | undefined;
      extensions?: any;
      headers: Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(() =>
        client.rawRequest<EcoverseInfoQuery>(
          print(EcoverseInfoDocument),
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
