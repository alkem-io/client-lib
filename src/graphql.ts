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
  context?: SchemaTypes.Maybe<{
    ecosystemModel?: SchemaTypes.Maybe<{
      id: string;
      actorGroups?: SchemaTypes.Maybe<Array<{ name: string; id: string }>>;
    }>;
  }>;
};

export type AddChallengeLeadMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.AssignChallengeLeadInput;
}>;

export type AddChallengeLeadMutation = {
  assignChallengeLead: {
    id: string;
    leadOrganisations: Array<{ id: string; name: string }>;
  };
};

export type AddUserToCommunityMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.AssignCommunityMemberInput;
}>;

export type AddUserToCommunityMutation = {
  assignUserToCommunity: {
    name: string;
    id: string;
    members?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
  };
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
  createChallenge: { id: string; name: string };
};

export type CreateChildChallengeMutationVariables = SchemaTypes.Exact<{
  childChallengeData: SchemaTypes.CreateChallengeInput;
}>;

export type CreateChildChallengeMutation = {
  createChildChallenge: { id: string; name: string; textID: string };
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

export type CreateOrganisationMutationVariables = SchemaTypes.Exact<{
  organisationData: SchemaTypes.CreateOrganisationInput;
}>;

export type CreateOrganisationMutation = {
  createOrganisation: { name: string; id: string; profile: { id: string } };
};

export type CreateReferenceOnContextMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.CreateReferenceInput;
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
  createTagsetOnProfile: { id: string; tags: Array<string> };
};

export type CreateUserMutationVariables = SchemaTypes.Exact<{
  userData: SchemaTypes.CreateUserInput;
}>;

export type CreateUserMutation = {
  createUser: {
    name: string;
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
    name: string;
    context?: SchemaTypes.Maybe<{ tagline?: SchemaTypes.Maybe<string> }>;
  };
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
  profileData: SchemaTypes.UpdateProfileInput;
}>;

export type UpdateProfileMutation = { updateProfile: { id: string } };

export type ChallengeQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['String'];
}>;

export type ChallengeQuery = {
  ecoverse: {
    challenge: {
      name: string;
      id: string;
      textID: string;
      community?: SchemaTypes.Maybe<{ id: string; name: string }>;
    };
  };
};

export type ChallengesBaseQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type ChallengesBaseQuery = {
  ecoverse: {
    challenges?: SchemaTypes.Maybe<
      Array<{ id: string; textID: string; name: string }>
    >;
  };
};

export type ChallengesQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type ChallengesQuery = {
  ecoverse: { challenges?: SchemaTypes.Maybe<Array<ChallengeDetailsFragment>> };
};

export type EcoverseInfoQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type EcoverseInfoQuery = {
  ecoverse: {
    id: string;
    textID: string;
    name: string;
    community?: SchemaTypes.Maybe<{ id: string }>;
    context?: SchemaTypes.Maybe<{
      id: string;
      references?: SchemaTypes.Maybe<
        Array<{ id: string; name: string; description: string; uri: string }>
      >;
    }>;
  };
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
  ecoverse: {
    opportunities: Array<
      {
        id: string;
        collaboration?: SchemaTypes.Maybe<{
          relations?: SchemaTypes.Maybe<Array<{ actorName: string }>>;
        }>;
      } & OpportunityProfileFragment
    >;
  };
};

export type OpportunityProfileFragment = {
  textID: string;
  name: string;
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
    ecosystemModel?: SchemaTypes.Maybe<{
      actorGroups?: SchemaTypes.Maybe<Array<{ id: string; name: string }>>;
    }>;
  }>;
};

export type OrganisationQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['String'];
}>;

export type OrganisationQuery = {
  organisation: {
    name: string;
    id: string;
    textID: string;
    profile: { id: string };
  };
};

export type OrganisationsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type OrganisationsQuery = {
  organisations: Array<{
    name: string;
    id: string;
    textID: string;
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
export const OpportunityProfileFragmentDoc = gql`
  fragment OpportunityProfile on Challenge {
    textID
    name
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
      ecosystemModel {
        actorGroups {
          id
          name
        }
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
        name
      }
    }
  }
`;
export const AddUserToCommunityDocument = gql`
  mutation addUserToCommunity($input: AssignCommunityMemberInput!) {
    assignUserToCommunity(membershipData: $input) {
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
      name
    }
  }
`;
export const CreateChildChallengeDocument = gql`
  mutation createChildChallenge($childChallengeData: CreateChallengeInput!) {
    createChildChallenge(challengeData: $childChallengeData) {
      id
      name
      textID
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
export const CreateOrganisationDocument = gql`
  mutation createOrganisation($organisationData: CreateOrganisationInput!) {
    createOrganisation(organisationData: $organisationData) {
      name
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
      name
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
      name
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
  mutation updateProfile($profileData: UpdateProfileInput!) {
    updateProfile(profileData: $profileData) {
      id
    }
  }
`;
export const ChallengeDocument = gql`
  query challenge($id: String!) {
    ecoverse {
      challenge(ID: $id) {
        name
        id
        textID
        community {
          id
          name
        }
      }
    }
  }
`;
export const ChallengesBaseDocument = gql`
  query challengesBase {
    ecoverse {
      challenges {
        id
        textID
        name
      }
    }
  }
`;
export const ChallengesDocument = gql`
  query challenges {
    ecoverse {
      challenges {
        ...ChallengeDetails
      }
    }
  }
  ${ChallengeDetailsFragmentDoc}
`;
export const EcoverseInfoDocument = gql`
  query ecoverseInfo {
    ecoverse {
      id
      textID
      name
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
    ecoverse {
      opportunities {
        id
        ...OpportunityProfile
        collaboration {
          relations {
            actorName
          }
        }
      }
    }
  }
  ${OpportunityProfileFragmentDoc}
`;
export const OrganisationDocument = gql`
  query organisation($id: String!) {
    organisation(ID: $id) {
      name
      id
      textID
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
      textID
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
