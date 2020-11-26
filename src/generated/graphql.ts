export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Context = {
  __typename?: 'Context';
  id: Scalars['ID'];
  /** A one line description */
  tagline: Maybe<Scalars['String']>;
  /** A detailed description of the current situation */
  background: Maybe<Scalars['String']>;
  /** The goal that is being pursued */
  vision: Maybe<Scalars['String']>;
  /** What is the potential impact? */
  impact: Maybe<Scalars['String']>;
  /** Who should get involved in this challenge */
  who: Maybe<Scalars['String']>;
  /** A list of URLs to relevant information. */
  references: Maybe<Array<Reference>>;
};

export type Tagset = {
  __typename?: 'Tagset';
  id: Scalars['ID'];
  name: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['ID'];
  /** A list of URLs to relevant information. */
  references: Maybe<Array<Reference>>;
  /** A list of named tagsets, each of which has a list of tags. */
  tagsets: Maybe<Array<Tagset>>;
  /** A URI that points to the location of an avatar, either on a shared location or a gravatar */
  avatar: Maybe<Scalars['String']>;
  /** A short description of the entity associated with this profile. */
  description: Maybe<Scalars['String']>;
};

export type Reference = {
  __typename?: 'Reference';
  id: Scalars['ID'];
  name: Scalars['String'];
  uri: Scalars['String'];
  description: Scalars['String'];
};

export type Template = {
  __typename?: 'Template';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  /** The set of user types that are available within this template */
  users: Maybe<Array<User>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  /** The unique personal identifier (upn) for the account associated with this user profile */
  accountUpn: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  gender: Scalars['String'];
  /** The profile for this user */
  profile: Maybe<Profile>;
  /** The last timestamp, in seconds, when this user was modified - either via creation or via update. Note: updating of profile data or group memberships does not update this field. */
  lastModified: Maybe<Scalars['Int']>;
  /** An overview of the groups this user is a memberof. Note: all groups are returned without members to avoid recursion. */
  memberof: Maybe<MemberOf>;
};

export type Actor = {
  __typename?: 'Actor';
  id: Scalars['ID'];
  name: Scalars['String'];
  /** A description of this actor */
  description: Maybe<Scalars['String']>;
  /** A value derived by this actor */
  value: Maybe<Scalars['String']>;
  /** The change / effort required of this actor */
  impact: Maybe<Scalars['String']>;
};

export type ActorGroup = {
  __typename?: 'ActorGroup';
  id: Scalars['ID'];
  name: Scalars['String'];
  /** A description of this group of actors */
  description: Maybe<Scalars['String']>;
  /** The set of actors in this actor group */
  actors: Maybe<Array<Actor>>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  /** A short text identifier for this Opportunity */
  textID: Scalars['String'];
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  /** The maturity phase of the project i.e. new, being refined, committed, in-progress, closed etc */
  state: Maybe<Scalars['String']>;
  /** The set of tags for the project */
  tagset: Maybe<Tagset>;
  /** The set of aspects for this Project. Note: likley to change. */
  aspects: Maybe<Array<Aspect>>;
};

export type Aspect = {
  __typename?: 'Aspect';
  id: Scalars['ID'];
  title: Scalars['String'];
  framing: Scalars['String'];
  explanation: Scalars['String'];
};

export type Relation = {
  __typename?: 'Relation';
  id: Scalars['ID'];
  type: Scalars['String'];
  actorName: Scalars['String'];
  actorType: Scalars['String'];
  actorRole: Scalars['String'];
  description: Scalars['String'];
};

export type Opportunity = {
  __typename?: 'Opportunity';
  id: Scalars['ID'];
  /** The name of the Opportunity */
  name: Scalars['String'];
  /** A short text identifier for this Opportunity */
  textID: Scalars['String'];
  /** The maturity phase of the Opportunity i.e. new, being refined, ongoing etc */
  state: Maybe<Scalars['String']>;
  /** The shared understanding for the opportunity */
  context: Maybe<Context>;
  /** The set of projects within the context of this Opportunity */
  projects: Maybe<Array<Project>>;
  /** Groups of users related to a Opportunity. */
  groups: Maybe<Array<UserGroup>>;
  /** All users that are contributing to this Opportunity. */
  contributors: Maybe<Array<User>>;
  /** The set of actor groups within the context of this Opportunity. */
  actorGroups: Maybe<Array<ActorGroup>>;
  /** The set of aspects within the context of this Opportunity. */
  aspects: Maybe<Array<Aspect>>;
  /** The set of relations within the context of this Opportunity. */
  relations: Maybe<Array<Relation>>;
};

export type UserGroup = {
  __typename?: 'UserGroup';
  id: Scalars['ID'];
  name: Scalars['String'];
  /** The set of users that are members of this group */
  members: Maybe<Array<User>>;
  /** The focal point for this group */
  focalPoint: Maybe<User>;
  /** The profile for the user group */
  profile: Maybe<Profile>;
};

export type Organisation = {
  __typename?: 'Organisation';
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Groups defined on this organisation. */
  groups: Maybe<Array<UserGroup>>;
  /** Users that are contributing to this organisation. */
  members: Maybe<Array<User>>;
  /** The profile for this organisation. */
  profile: Profile;
};

export type Ecoverse = {
  __typename?: 'Ecoverse';
  id: Scalars['ID'];
  name: Scalars['String'];
  /** The organisation that hosts this Ecoverse instance */
  host: Maybe<Organisation>;
  /** The shared understanding for the Ecoverse */
  context: Maybe<Context>;
  /** The set of groups at the Ecoverse level */
  groups: Maybe<Array<UserGroup>>;
  /** The set of partner organisations associated with this Ecoverse */
  organisations: Maybe<Array<Organisation>>;
  /** The Challenges hosted by the Ecoverse */
  challenges: Maybe<Array<Challenge>>;
  /** The set of templates registered with this Ecoverse */
  templates: Maybe<Array<Template>>;
  /** The set of tags for the ecoverse */
  tagset: Maybe<Tagset>;
};

export type Challenge = {
  __typename?: 'Challenge';
  id: Scalars['ID'];
  /** The name of the challenge */
  name: Scalars['String'];
  /** A short text identifier for this challenge */
  textID: Scalars['String'];
  /** The shared understanding for the challenge */
  context: Maybe<Context>;
  /** The leads for the challenge. The focal point for the user group is the primary challenge lead. */
  leadOrganisations: Array<Organisation>;
  /** The maturity phase of the challenge i.e. new, being refined, ongoing etc */
  state: Maybe<Scalars['String']>;
  /** The set of tags for the challenge */
  tagset: Maybe<Tagset>;
  /** Groups of users related to a challenge. */
  groups: Maybe<Array<UserGroup>>;
  /** The set of opportunities within this challenge. */
  opportunities: Maybe<Array<Opportunity>>;
  /** All users that are contributing to this challenge. */
  contributors: Maybe<Array<User>>;
};

export type MemberOf = {
  __typename?: 'MemberOf';
  /** References to the groups the user is in at the ecoverse level */
  groups: Array<UserGroup>;
  /** References to the challenges the user is a member of */
  challenges: Array<Challenge>;
  /** References to the orgnaisaitons the user is a member of */
  organisations: Array<Organisation>;
};

export type AadClientConfig = {
  __typename?: 'AadClientConfig';
  /** Config for MSAL authentication library on Cherrytwist Web Client. */
  msalConfig: MsalConfig;
  /** Config for accessing the Cherrytwist API. */
  apiConfig: AadApiConfig;
  /** Scopes required for the user login. For OpenID Connect login flows, these are openid and profile + optionally offline_access if refresh tokens are utilized. */
  loginRequest: AadScope;
  /** Scopes for requesting a token. This is the Cherrytwist API app registration URI + ./default. */
  tokenRequest: AadScope;
  /** Scopes for silent token acquisition. Cherrytwist API scope + OpenID mandatory scopes. */
  silentRequest: AadScope;
  /** Is the client and server authentication enabled? */
  authEnabled: Scalars['Boolean'];
};

export type MsalConfig = {
  __typename?: 'MsalConfig';
  /** Azure Active Directory OpenID Connect endpoint configuration. */
  auth: MsalAuth;
  /** Token cache configuration.  */
  cache: MsalCache;
};

export type MsalAuth = {
  __typename?: 'MsalAuth';
  /** Cherrytwist Web Client App Registration Client Id. */
  clientId: Scalars['String'];
  /** Azure Active Directory OpenID Connect Authority. */
  authority: Scalars['String'];
  /** Cherrytwist Web Client Login Redirect Uri. */
  redirectUri: Scalars['String'];
};

export type MsalCache = {
  __typename?: 'MsalCache';
  /** Cache location, e.g. localStorage.  */
  cacheLocation: Maybe<Scalars['String']>;
  /** Is the authentication information stored in a cookie? */
  storeAuthStateInCookie: Maybe<Scalars['Boolean']>;
};

export type AadApiConfig = {
  __typename?: 'AadApiConfig';
  /** Configuration payload for the Cherrytwist API. */
  resourceScope: Scalars['String'];
};

export type AadScope = {
  __typename?: 'AadScope';
  /** OpenID Scopes. */
  scopes: Array<Scalars['String']>;
};

export type SearchResultEntry = {
  __typename?: 'SearchResultEntry';
  /** The score for this search result; more matches means a higher score. */
  score: Maybe<Scalars['Float']>;
  /** The terms that were matched for this result */
  terms: Maybe<Array<Scalars['String']>>;
  /** Each search result contains either a User or UserGroup */
  result: Maybe<SearchResult>;
};

export type SearchResult = User | UserGroup;

export type Query = {
  __typename?: 'Query';
  /** The currently logged in user */
  me: User;
  /** All opportunities within the ecoverse */
  opportunities: Array<Opportunity>;
  /** A particular opportunitiy, identified by the ID */
  opportunity: Opportunity;
  /** All projects within this ecoverse */
  projects: Array<Project>;
  /** A particular Project, identified by the ID */
  project: Project;
  /** The name for this ecoverse */
  name: Scalars['String'];
  /** The host organisation for the ecoverse */
  host: Organisation;
  /** The shared understanding for this ecoverse */
  context: Context;
  /** The members of this this ecoverse */
  users: Array<User>;
  /** A particular user, identified by the ID or by email */
  user: User;
  /** The members of this this ecoverse filtered by list of IDs. */
  usersById: Array<User>;
  /** All groups at the ecoverse level */
  groups: Array<UserGroup>;
  /** All groups that have the provided tag */
  groupsWithTag: Array<UserGroup>;
  /** The user group with the specified id anywhere in the ecoverse */
  group: UserGroup;
  /** All challenges */
  challenges: Array<Challenge>;
  /** All templates */
  templates: Array<Template>;
  /** A particular challenge */
  challenge: Challenge;
  /** All organisations */
  organisations: Array<Organisation>;
  /** A particular organisation */
  organisation: Organisation;
  /** The tagset associated with this Ecoverse */
  tagset: Tagset;
  /** CT Web Client Configuration */
  clientConfig: AadClientConfig;
  /** Search the ecoverse for terms supplied */
  search: Array<SearchResultEntry>;
};

export type QueryOpportunityArgs = {
  ID: Scalars['Float'];
};

export type QueryProjectArgs = {
  ID: Scalars['Float'];
};

export type QueryUserArgs = {
  ID: Scalars['String'];
};

export type QueryUsersByIdArgs = {
  IDs: Array<Scalars['String']>;
};

export type QueryGroupsWithTagArgs = {
  tag: Scalars['String'];
};

export type QueryGroupArgs = {
  ID: Scalars['Float'];
};

export type QueryChallengeArgs = {
  ID: Scalars['Float'];
};

export type QueryOrganisationArgs = {
  ID: Scalars['Float'];
};

export type QuerySearchArgs = {
  searchData: SearchInput;
};

export type SearchInput = {
  /** The terms to be searched for within this Ecoverse. Max 5. */
  terms: Array<Scalars['String']>;
  /** Expand the search to includes Tagsets with the provided names. Max 2. */
  tagsetNames: Maybe<Array<Scalars['String']>>;
  /** Restrict the search to only the specified entity types. Values allowed: user, group. Default is both. */
  typesFilter: Maybe<Array<Scalars['String']>>;
  /** Restrict the search to only the specified challenges. Default is all Challenges. */
  challengesFilter: Maybe<Array<Scalars['Float']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Update the base user information. Note: email address cannot be updated. */
  updateUser: User;
  /** Removes the reference  with the specified ID */
  removeReference: Scalars['Boolean'];
  /** Replace the set of tags in a tagset with the provided tags */
  replaceTagsOnTagset: Tagset;
  /** Add the provided tag to the tagset with the given ID */
  addTagToTagset: Tagset;
  /** Creates a new tagset with the specified name for the profile with given id */
  createTagsetOnProfile: Tagset;
  /** Creates a new reference with the specified name for the profile with given id */
  createReferenceOnProfile: Reference;
  /** Updates the fields on the Profile, such as avatar location or description */
  updateProfile: Scalars['Boolean'];
  /** Adds the user with the given identifier to the specified user group */
  addUserToGroup: Scalars['Boolean'];
  /** Remove the user with the given identifier to the specified user group */
  removeUserFromGroup: UserGroup;
  /** Assign the user with the given ID as focal point for the given group */
  assignGroupFocalPoint: Maybe<UserGroup>;
  /** Remove the focal point for the given group */
  removeGroupFocalPoint: Maybe<UserGroup>;
  /** Creates a new user group for the challenge with the given id */
  createGroupOnChallenge: UserGroup;
  /** Creates a new Opportunity for the challenge with the given id */
  createOpportunityOnChallenge: Opportunity;
  /** Updates the specified Challenge with the provided data (merge) */
  updateChallenge: Challenge;
  /** Removes the Challenge with the specified ID */
  removeChallenge: Scalars['Boolean'];
  /** Adds the user with the given identifier as a member of the specified challenge */
  addUserToChallenge: UserGroup;
  /** Adds the specified organisation as a lead for the specified challenge */
  addChallengeLead: Scalars['Boolean'];
  /** Remove the specified organisation as a lead for the specified challenge */
  removeChallengeLead: Scalars['Boolean'];
  /** Creates a new reference with the specified name for the context with given id */
  createReferenceOnContext: Reference;
  /** Updates the specified Opportunity with the provided data (merge) */
  updateOpportunity: Opportunity;
  /** Removes the Opportunity with the specified ID */
  removeOpportunity: Scalars['Boolean'];
  /** Create a new Project on the Opportunity identified by the ID */
  createProject: Project;
  /** Create a new aspect on the Opportunity identified by the ID */
  createAspect: Aspect;
  /** Create a new actor group on the Opportunity identified by the ID */
  createActorGroup: ActorGroup;
  /** Create a new relation on the Opportunity identified by the ID */
  createRelation: Relation;
  /** Creates a new user group for the opportunity with the given id */
  createGroupOnOpportunity: UserGroup;
  /** Adds the user with the given identifier as a member of the specified opportunity */
  addUserToOpportunity: UserGroup;
  /** Removes the aspect with the specified ID */
  removeAspect: Scalars['Boolean'];
  /** Updates the aspect with the specified ID */
  updateAspect: Aspect;
  /** Removes the actor  with the specified ID */
  removeActor: Scalars['Boolean'];
  /** Updates the actor with the specified ID with the supplied data */
  updateActor: Actor;
  /** Create a new actor on the ActorGroup with the specified ID */
  createActor: Actor;
  /** Removes the actor group with the specified ID */
  removeActorGroup: Scalars['Boolean'];
  /** Removes the relation with the specified ID */
  removeRelation: Scalars['Boolean'];
  /** Removes the Project with the specified ID */
  removeProject: Scalars['Boolean'];
  /** Updates the Project with the specified ID */
  updateProject: Project;
  /** Create a new aspect on the Project identified by the ID */
  createAspectOnProject: Aspect;
  /** Creates a new user group for the organisation with the given id */
  createGroupOnOrganisation: UserGroup;
  /** Updates the organisation with the given data */
  updateOrganisation: Organisation;
  /** Creates a new user group at the ecoverse level */
  createGroupOnEcoverse: UserGroup;
  /** Updates the Ecoverse with the provided data */
  updateEcoverse: Ecoverse;
  /** Creates a new user as a member of the ecoverse, including an account if enabled */
  createUser: User;
  /** Creates a new template for the population of entities within tis ecoverse */
  createTemplate: Template;
  /** Creates a new user as a member of the ecoverse, without an account */
  createUserProfile: User;
  /** Removes the specified user from the ecoverse */
  removeUser: Scalars['Boolean'];
  /** Creates a new challenge and registers it with the ecoverse */
  createChallenge: Challenge;
  /** Creates a new organisation and registers it with the ecoverse */
  createOrganisation: Organisation;
  /** Creates a new account on the identity provider for the user profile with the given ID and with the given one time password */
  createUserAccount: Scalars['Boolean'];
};

export type MutationUpdateUserArgs = {
  userData: UserInput;
  userID: Scalars['Float'];
};

export type MutationRemoveReferenceArgs = {
  ID: Scalars['Float'];
};

export type MutationReplaceTagsOnTagsetArgs = {
  tags: Array<Scalars['String']>;
  tagsetID: Scalars['Float'];
};

export type MutationAddTagToTagsetArgs = {
  tag: Scalars['String'];
  tagsetID: Scalars['Float'];
};

export type MutationCreateTagsetOnProfileArgs = {
  tagsetName: Scalars['String'];
  profileID: Scalars['Float'];
};

export type MutationCreateReferenceOnProfileArgs = {
  referenceInput: ReferenceInput;
  profileID: Scalars['Float'];
};

export type MutationUpdateProfileArgs = {
  profileData: ProfileInput;
  ID: Scalars['Float'];
};

export type MutationAddUserToGroupArgs = {
  groupID: Scalars['Float'];
  userID: Scalars['Float'];
};

export type MutationRemoveUserFromGroupArgs = {
  groupID: Scalars['Float'];
  userID: Scalars['Float'];
};

export type MutationAssignGroupFocalPointArgs = {
  groupID: Scalars['Float'];
  userID: Scalars['Float'];
};

export type MutationRemoveGroupFocalPointArgs = {
  groupID: Scalars['Float'];
};

export type MutationCreateGroupOnChallengeArgs = {
  groupName: Scalars['String'];
  challengeID: Scalars['Float'];
};

export type MutationCreateOpportunityOnChallengeArgs = {
  opportunityData: OpportunityInput;
  challengeID: Scalars['Float'];
};

export type MutationUpdateChallengeArgs = {
  challengeData: ChallengeInput;
  challengeID: Scalars['Float'];
};

export type MutationRemoveChallengeArgs = {
  ID: Scalars['Float'];
};

export type MutationAddUserToChallengeArgs = {
  challengeID: Scalars['Float'];
  userID: Scalars['Float'];
};

export type MutationAddChallengeLeadArgs = {
  challengeID: Scalars['Float'];
  organisationID: Scalars['Float'];
};

export type MutationRemoveChallengeLeadArgs = {
  challengeID: Scalars['Float'];
  organisationID: Scalars['Float'];
};

export type MutationCreateReferenceOnContextArgs = {
  referenceInput: ReferenceInput;
  contextID: Scalars['Float'];
};

export type MutationUpdateOpportunityArgs = {
  opportunityData: OpportunityInput;
  ID: Scalars['Float'];
};

export type MutationRemoveOpportunityArgs = {
  ID: Scalars['Float'];
};

export type MutationCreateProjectArgs = {
  projectData: ProjectInput;
  opportunityID: Scalars['Float'];
};

export type MutationCreateAspectArgs = {
  aspectData: AspectInput;
  opportunityID: Scalars['Float'];
};

export type MutationCreateActorGroupArgs = {
  actorGroupData: ActorGroupInput;
  opportunityID: Scalars['Float'];
};

export type MutationCreateRelationArgs = {
  relationData: RelationInput;
  opportunityID: Scalars['Float'];
};

export type MutationCreateGroupOnOpportunityArgs = {
  groupName: Scalars['String'];
  opportunityID: Scalars['Float'];
};

export type MutationAddUserToOpportunityArgs = {
  opportunityID: Scalars['Float'];
  userID: Scalars['Float'];
};

export type MutationRemoveAspectArgs = {
  ID: Scalars['Float'];
};

export type MutationUpdateAspectArgs = {
  aspectData: AspectInput;
  ID: Scalars['Float'];
};

export type MutationRemoveActorArgs = {
  ID: Scalars['Float'];
};

export type MutationUpdateActorArgs = {
  actorData: ActorInput;
  ID: Scalars['Float'];
};

export type MutationCreateActorArgs = {
  actorData: ActorInput;
  actorGroupID: Scalars['Float'];
};

export type MutationRemoveActorGroupArgs = {
  ID: Scalars['Float'];
};

export type MutationRemoveRelationArgs = {
  ID: Scalars['Float'];
};

export type MutationRemoveProjectArgs = {
  ID: Scalars['Float'];
};

export type MutationUpdateProjectArgs = {
  projectData: ProjectInput;
  ID: Scalars['Float'];
};

export type MutationCreateAspectOnProjectArgs = {
  aspectData: AspectInput;
  projectID: Scalars['Float'];
};

export type MutationCreateGroupOnOrganisationArgs = {
  groupName: Scalars['String'];
  orgID: Scalars['Float'];
};

export type MutationUpdateOrganisationArgs = {
  organisationData: OrganisationInput;
  orgID: Scalars['Float'];
};

export type MutationCreateGroupOnEcoverseArgs = {
  groupName: Scalars['String'];
};

export type MutationUpdateEcoverseArgs = {
  ecoverseData: EcoverseInput;
};

export type MutationCreateUserArgs = {
  userData: UserInput;
};

export type MutationCreateTemplateArgs = {
  templateData: TemplateInput;
};

export type MutationCreateUserProfileArgs = {
  userData: UserInput;
};

export type MutationRemoveUserArgs = {
  userID: Scalars['Float'];
};

export type MutationCreateChallengeArgs = {
  challengeData: ChallengeInput;
};

export type MutationCreateOrganisationArgs = {
  organisationData: OrganisationInput;
};

export type MutationCreateUserAccountArgs = {
  password: Scalars['String'];
  userID: Scalars['Float'];
};

export type UserInput = {
  accountUpn: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  /** Email address is required for creating a new user */
  email: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  country: Maybe<Scalars['String']>;
  gender: Maybe<Scalars['String']>;
  aadPassword: Maybe<Scalars['String']>;
  profileData: Maybe<ProfileInput>;
};

export type ProfileInput = {
  avatar: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  tagsetsData: Maybe<Array<TagsetInput>>;
  referencesData: Maybe<Array<ReferenceInput>>;
};

export type TagsetInput = {
  name: Maybe<Scalars['String']>;
  tags: Maybe<Array<Scalars['String']>>;
};

export type ReferenceInput = {
  name: Maybe<Scalars['String']>;
  uri: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
};

export type OpportunityInput = {
  name: Maybe<Scalars['String']>;
  textID: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  context: Maybe<ContextInput>;
  tagset: Maybe<Array<Scalars['String']>>;
};

export type ContextInput = {
  background: Maybe<Scalars['String']>;
  vision: Maybe<Scalars['String']>;
  tagline: Maybe<Scalars['String']>;
  who: Maybe<Scalars['String']>;
  impact: Maybe<Scalars['String']>;
  /** Set of references to _replace_ the existing references */
  references: Maybe<Array<ReferenceInput>>;
};

export type ChallengeInput = {
  name: Maybe<Scalars['String']>;
  textID: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  context: Maybe<ContextInput>;
  tags: Maybe<Array<Scalars['String']>>;
};

export type ProjectInput = {
  name: Maybe<Scalars['String']>;
  textID: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
};

export type AspectInput = {
  title: Maybe<Scalars['String']>;
  framing: Maybe<Scalars['String']>;
  explanation: Maybe<Scalars['String']>;
};

export type ActorGroupInput = {
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
};

export type RelationInput = {
  type: Maybe<Scalars['String']>;
  actorName: Maybe<Scalars['String']>;
  actorType: Maybe<Scalars['String']>;
  actorRole: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
};

export type ActorInput = {
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
  impact: Maybe<Scalars['String']>;
};

export type OrganisationInput = {
  /** The name for this organisation */
  name: Maybe<Scalars['String']>;
};

export type EcoverseInput = {
  /** The new name for the ecoverse */
  name: Maybe<Scalars['String']>;
  /** Updated context for the ecoverse; will be merged with existing context */
  context: Maybe<ContextInput>;
  /** The set of tags to apply to this ecoverse */
  tags: Maybe<Array<Scalars['String']>>;
};

export type TemplateInput = {
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
};

export type AddChallengeLeadMutationVariables = Exact<{
  challengeID: Scalars['Float'];
  organisationID: Scalars['Float'];
}>;

export type AddChallengeLeadMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'addChallengeLead'
>;

export type AddTagToTagsetMutationVariables = Exact<{
  tag: Scalars['String'];
  tagsetID: Scalars['Float'];
}>;

export type AddTagToTagsetMutation = { __typename?: 'Mutation' } & {
  addTagToTagset: { __typename?: 'Tagset' } & Pick<Tagset, 'id'>;
};

export type AddUserToChallengeMutationVariables = Exact<{
  userID: Scalars['Float'];
  challengeID: Scalars['Float'];
}>;

export type AddUserToChallengeMutation = { __typename?: 'Mutation' } & {
  addUserToChallenge: { __typename?: 'UserGroup' } & Pick<
    UserGroup,
    'name' | 'id'
  > & {
      members: Maybe<
        Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>
      >;
    };
};

export type AddUserToGroupMutationVariables = Exact<{
  userID: Scalars['Float'];
  groupID: Scalars['Float'];
}>;

export type AddUserToGroupMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'addUserToGroup'
>;

export type CreateActorGroupMutationVariables = Exact<{
  actorGroupData: ActorGroupInput;
  opportunityID: Scalars['Float'];
}>;

export type CreateActorGroupMutation = { __typename?: 'Mutation' } & {
  createActorGroup: { __typename?: 'ActorGroup' } & Pick<
    ActorGroup,
    'name' | 'id'
  >;
};

export type CreateActorMutationVariables = Exact<{
  actorData: ActorInput;
  actorGroupID: Scalars['Float'];
}>;

export type CreateActorMutation = { __typename?: 'Mutation' } & {
  createActor: { __typename?: 'Actor' } & Pick<
    Actor,
    'id' | 'name' | 'description' | 'value' | 'impact'
  >;
};

export type CreateAspectMutationVariables = Exact<{
  aspectData: AspectInput;
  opportunityID: Scalars['Float'];
}>;

export type CreateAspectMutation = { __typename?: 'Mutation' } & {
  createAspect: { __typename?: 'Aspect' } & Pick<
    Aspect,
    'title' | 'framing' | 'explanation'
  >;
};

export type CreateChallengeMutationVariables = Exact<{
  challengeData: ChallengeInput;
}>;

export type CreateChallengeMutation = { __typename?: 'Mutation' } & {
  createChallenge: { __typename?: 'Challenge' } & Pick<
    Challenge,
    'name' | 'id'
  > & {
      tagset: Maybe<
        { __typename?: 'Tagset' } & Pick<Tagset, 'tags' | 'id' | 'name'>
      >;
      groups: Maybe<
        Array<{ __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'>>
      >;
    };
};

export type CreateGroupOnChallengeMutationVariables = Exact<{
  groupName: Scalars['String'];
  challengeID: Scalars['Float'];
}>;

export type CreateGroupOnChallengeMutation = { __typename?: 'Mutation' } & {
  createGroupOnChallenge: { __typename?: 'UserGroup' } & Pick<
    UserGroup,
    'name' | 'id'
  >;
};

export type CreateGroupOnEcoverseMutationVariables = Exact<{
  groupName: Scalars['String'];
}>;

export type CreateGroupOnEcoverseMutation = { __typename?: 'Mutation' } & {
  createGroupOnEcoverse: { __typename?: 'UserGroup' } & Pick<
    UserGroup,
    'id' | 'name'
  > & {
      profile: Maybe<
        { __typename?: 'Profile' } & {
          tagsets: Maybe<
            Array<{ __typename?: 'Tagset' } & Pick<Tagset, 'name' | 'id'>>
          >;
        }
      >;
    };
};

export type CreateGroupOnOrganisationMutationVariables = Exact<{
  groupName: Scalars['String'];
  organisationID: Scalars['Float'];
}>;

export type CreateGroupOnOrganisationMutation = { __typename?: 'Mutation' } & {
  createGroupOnOrganisation: { __typename?: 'UserGroup' } & Pick<
    UserGroup,
    'id' | 'name'
  >;
};

export type CreateOpportunityMutationMutationVariables = Exact<{
  opportunityData: OpportunityInput;
  challengeID: Scalars['Float'];
}>;

export type CreateOpportunityMutationMutation = { __typename?: 'Mutation' } & {
  createOpportunityOnChallenge: { __typename?: 'Opportunity' } & Pick<
    Opportunity,
    'name' | 'id'
  >;
};

export type CreateOrganisationMutationVariables = Exact<{
  organisationData: OrganisationInput;
}>;

export type CreateOrganisationMutation = { __typename?: 'Mutation' } & {
  createOrganisation: { __typename?: 'Organisation' } & Pick<
    Organisation,
    'name' | 'id'
  > & { profile: { __typename?: 'Profile' } & Pick<Profile, 'id'> };
};

export type CreateReferenceOnProfileMutationVariables = Exact<{
  referenceInput: ReferenceInput;
  profileID: Scalars['Float'];
}>;

export type CreateReferenceOnProfileMutation = { __typename?: 'Mutation' } & {
  createReferenceOnProfile: { __typename?: 'Reference' } & Pick<
    Reference,
    'name' | 'uri' | 'description'
  >;
};

export type CreateRelationMutationVariables = Exact<{
  relationData: RelationInput;
  opportunityID: Scalars['Float'];
}>;

export type CreateRelationMutation = { __typename?: 'Mutation' } & {
  createRelation: { __typename?: 'Relation' } & Pick<Relation, 'type'>;
};

export type CreateTagsetOnProfileMutationVariables = Exact<{
  tagsetName: Scalars['String'];
  profileID: Scalars['Float'];
}>;

export type CreateTagsetOnProfileMutation = { __typename?: 'Mutation' } & {
  createTagsetOnProfile: { __typename?: 'Tagset' } & Pick<
    Tagset,
    'id' | 'tags'
  >;
};

export type CreateUserMutationVariables = Exact<{
  userData: UserInput;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUserProfile: { __typename?: 'User' } & Pick<User, 'name' | 'id'> & {
      profile: Maybe<{ __typename?: 'Profile' } & Pick<Profile, 'id'>>;
    };
};

export type ReplaceTagsOnTagsetMutationVariables = Exact<{
  tags: Array<Scalars['String']>;
  tagsetID: Scalars['Float'];
}>;

export type ReplaceTagsOnTagsetMutation = { __typename?: 'Mutation' } & {
  replaceTagsOnTagset: { __typename?: 'Tagset' } & Pick<
    Tagset,
    'name' | 'tags'
  >;
};

export type UpdateActorMutationVariables = Exact<{
  actorData: ActorInput;
  ID: Scalars['Float'];
}>;

export type UpdateActorMutation = { __typename?: 'Mutation' } & {
  updateActor: { __typename?: 'Actor' } & Pick<Actor, 'name'>;
};

export type UpdateEcoverseMutationVariables = Exact<{
  ecoverseData: EcoverseInput;
}>;

export type UpdateEcoverseMutation = { __typename?: 'Mutation' } & {
  updateEcoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'name'> & {
      context: Maybe<{ __typename?: 'Context' } & Pick<Context, 'tagline'>>;
    };
};

export type UpdateOrganisationMutationVariables = Exact<{
  orgID: Scalars['Float'];
  organisationData: OrganisationInput;
}>;

export type UpdateOrganisationMutation = { __typename?: 'Mutation' } & {
  updateOrganisation: { __typename?: 'Organisation' } & Pick<
    Organisation,
    'name' | 'id'
  >;
};

export type UpdateProfileMutationVariables = Exact<{
  profileData: ProfileInput;
  ID: Scalars['Float'];
}>;

export type UpdateProfileMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'updateProfile'
>;

export type UserQueryVariables = Exact<{
  ID: Scalars['String'];
}>;

export type UserQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & Pick<User, 'name' | 'id'> & {
      profile: Maybe<
        { __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar'>
      >;
    };
};
