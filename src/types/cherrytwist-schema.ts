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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AadAuthProviderConfig = {
  /** Config for accessing the Cherrytwist API. */
  apiConfig: ApiConfig;
  /** Scopes required for the user login. For OpenID Connect login flows, these are openid and profile + optionally offline_access if refresh tokens are utilized. */
  loginRequest: Scope;
  /** Config for MSAL authentication library on Cherrytwist Web Client. */
  msalConfig: MsalConfig;
  /** Scopes for silent token acquisition. Cherrytwist API scope + OpenID mandatory scopes. */
  silentRequest: Scope;
  /** Scopes for requesting a token. This is the Cherrytwist API app registration URI + ./default. */
  tokenRequest: Scope;
};

export type Actor = {
  /** A description of this actor */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The change / effort required of this actor */
  impact?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** A value derived by this actor */
  value?: Maybe<Scalars['String']>;
};

export type ActorGroup = {
  /** The set of actors in this actor group */
  actors?: Maybe<Array<Actor>>;
  /** A description of this group of actors */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ApiConfig = {
  /** Configuration payload for the Cherrytwist API. */
  resourceScope: Scalars['String'];
};

export type Application = {
  id: Scalars['ID'];
  questions: Array<Question>;
  status: ApplicationStatus;
  user: User;
};

export enum ApplicationStatus {
  Approved = 'approved',
  New = 'new',
  Rejected = 'rejected',
}

export type ApplicationTemplate = {
  /** Application template name. */
  name: Scalars['String'];
  /** Template questions. */
  questions: Array<QuestionTemplate>;
};

export type Aspect = {
  explanation: Scalars['String'];
  framing: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type AuthenticationConfig = {
  /** Is authentication enabled? */
  enabled: Scalars['Boolean'];
  /** Cherrytwist Authentication Providers Config. */
  providers: Array<AuthenticationProviderConfig>;
};

export type AuthenticationProviderConfig = {
  /** Configuration of the authenticaiton provider */
  config: AuthenticationProviderConfigUnion;
  /** Is the authentication provider enabled? */
  enabled: Scalars['Boolean'];
  /** CDN location of an icon of the authentication provider login button. */
  icon: Scalars['String'];
  /** Label of the authentication provider. */
  label: Scalars['String'];
  /** Name of the authentication provider. */
  name: Scalars['String'];
};

export type AuthenticationProviderConfigUnion =
  | AadAuthProviderConfig
  | DemoAuthProviderConfig;

export type Challenge = {
  /** The community for the challenge */
  community?: Maybe<Community>;
  /** The shared understanding for the challenge */
  context?: Maybe<Context>;
  id: Scalars['ID'];
  /** The Organisations that are leading this Challenge. */
  leadOrganisations: Array<Organisation>;
  /** The name of the challenge */
  name: Scalars['String'];
  /** The set of opportunities within this challenge. */
  opportunities?: Maybe<Array<Opportunity>>;
  /** The maturity phase of the challenge i.e. new, being refined, ongoing etc */
  state?: Maybe<Scalars['String']>;
  /** The set of tags for the challenge */
  tagset?: Maybe<Tagset>;
  /** A short text identifier for this challenge */
  textID: Scalars['String'];
};

export type ChallengeTemplate = {
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Challenge template name. */
  name: Scalars['String'];
};

export type Community = {
  /** Application available for this community. */
  applications: Array<Application>;
  /** Groups of users related to a Community. */
  groups?: Maybe<Array<UserGroup>>;
  id: Scalars['ID'];
  /** All users that are contributing to this Community. */
  members?: Maybe<Array<User>>;
  /** The name of the Community */
  name: Scalars['String'];
  /** The type of the Community */
  type: Scalars['String'];
};

export type Config = {
  /** Cherrytwist authentication configuration. */
  authentication: AuthenticationConfig;
  /** Cherrytwist template configuration. */
  template: Template;
};

export type Context = {
  /** A detailed description of the current situation */
  background?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** What is the potential impact? */
  impact?: Maybe<Scalars['String']>;
  /** A list of URLs to relevant information. */
  references?: Maybe<Array<Reference>>;
  /** A one line description */
  tagline?: Maybe<Scalars['String']>;
  /** The goal that is being pursued */
  vision?: Maybe<Scalars['String']>;
  /** Who should get involved in this challenge */
  who?: Maybe<Scalars['String']>;
};

export type CreateActorGroupInput = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parentID: Scalars['Float'];
};

export type CreateActorInput = {
  description?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parentID: Scalars['Float'];
  value?: Maybe<Scalars['String']>;
};

export type CreateApplicationInput = {
  parentID: Scalars['Float'];
  questions: Array<CreateNvpInput>;
  userId: Scalars['Float'];
};

export type CreateAspectInput = {
  explanation?: Maybe<Scalars['String']>;
  framing?: Maybe<Scalars['String']>;
  parentID: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
};

export type CreateChallengeInput = {
  context?: Maybe<CreateContextInput>;
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  textID?: Maybe<Scalars['String']>;
};

export type CreateContextInput = {
  background?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  /** Set of references to _replace_ the existing references */
  references?: Maybe<Array<CreateReferenceInput>>;
  tagline?: Maybe<Scalars['String']>;
  vision?: Maybe<Scalars['String']>;
  who?: Maybe<Scalars['String']>;
};

export type CreateNvpInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type CreateOpportunityInput = {
  context?: Maybe<CreateContextInput>;
  name: Scalars['String'];
  parentID: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  textID: Scalars['String'];
};

export type CreateOrganisationInput = {
  /** The name for this organisation */
  name?: Maybe<Scalars['String']>;
  profileData?: Maybe<CreateProfileInput>;
  /** The unique text based ID for this organisation */
  textID?: Maybe<Scalars['String']>;
};

export type CreateProfileInput = {
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  referencesData?: Maybe<Array<CreateReferenceInput>>;
  tagsetsData?: Maybe<Array<CreateTagsetInput>>;
};

export type CreateProjectInput = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parentID: Scalars['Float'];
  state?: Maybe<Scalars['String']>;
  textID?: Maybe<Scalars['String']>;
};

export type CreateReferenceInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parentID?: Maybe<Scalars['Float']>;
  uri?: Maybe<Scalars['String']>;
};

export type CreateRelationInput = {
  actorName?: Maybe<Scalars['String']>;
  actorRole?: Maybe<Scalars['String']>;
  actorType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  parentID: Scalars['Float'];
  type?: Maybe<Scalars['String']>;
};

export type CreateTagsetInput = {
  name: Scalars['String'];
  parentID?: Maybe<Scalars['Float']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateUserGroupInput = {
  name?: Maybe<Scalars['String']>;
  parentID: Scalars['Float'];
  profileData?: Maybe<CreateProfileInput>;
};

export type CreateUserInput = {
  accountUpn?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** Email address is required for mutations! */
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileData?: Maybe<CreateProfileInput>;
};

export type DemoAuthProviderConfig = {
  /** Demo authentication provider issuer endpoint. */
  issuer: Scalars['String'];
  /** Demo authentication provider token endpoint. Use json payload in the form of username + password to login and obtain valid jwt token. */
  tokenEndpoint: Scalars['String'];
};

export type Ecoverse = {
  /** All applications to join */
  application: Application;
  /** A particular Challenge, either by its ID or textID */
  challenge: Challenge;
  /** The challenges for the ecoverse. */
  challenges?: Maybe<Array<Challenge>>;
  /** The community for the ecoverse. */
  community?: Maybe<Community>;
  /** The shared understanding for the Ecoverse */
  context?: Maybe<Context>;
  /** The user group with the specified id anywhere in the ecoverse */
  group: UserGroup;
  /** The user groups on this Ecoverse */
  groups: Array<UserGroup>;
  /** All groups on this Ecoverse that have the provided tag */
  groupsWithTag: Array<UserGroup>;
  /** The organisation that hosts this Ecoverse instance */
  host?: Maybe<Organisation>;
  id: Scalars['ID'];
  name: Scalars['String'];
  /** All opportunities within the ecoverse */
  opportunities: Array<Opportunity>;
  /** A particular opportunitiy, identified by the ID or textID */
  opportunity: Opportunity;
  /** A particular Project, identified by the ID */
  project: Project;
  /** All projects within this ecoverse */
  projects: Array<Project>;
  /** The set of tags for the ecoverse */
  tagset?: Maybe<Tagset>;
};

export type EcoverseApplicationArgs = {
  ID: Scalars['Float'];
};

export type EcoverseChallengeArgs = {
  ID: Scalars['String'];
};

export type EcoverseGroupArgs = {
  ID: Scalars['String'];
};

export type EcoverseGroupsWithTagArgs = {
  tag: Scalars['String'];
};

export type EcoverseOpportunityArgs = {
  ID: Scalars['String'];
};

export type EcoverseProjectArgs = {
  ID: Scalars['String'];
};

export type EcoverseTemplate = {
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Ecoverse template name. */
  name: Scalars['String'];
};

export type MemberOf = {
  /** References to the Communities the user is a member of */
  communities: Array<Community>;
  /** References to the orgnaisaitons the user is a member of */
  organisations: Array<Organisation>;
};

export type Metadata = {
  /** Collection of metadata about Cherrytwist services. */
  services: Array<ServiceMetadata>;
};

export type MsalAuth = {
  /** Azure Active Directory OpenID Connect Authority. */
  authority: Scalars['String'];
  /** Cherrytwist Web Client App Registration Client Id. */
  clientId: Scalars['String'];
  /** Cherrytwist Web Client Login Redirect Uri. */
  redirectUri: Scalars['String'];
};

export type MsalCache = {
  /** Cache location, e.g. localStorage.  */
  cacheLocation?: Maybe<Scalars['String']>;
  /** Is the authentication information stored in a cookie? */
  storeAuthStateInCookie?: Maybe<Scalars['Boolean']>;
};

export type MsalConfig = {
  /** Azure Active Directory OpenID Connect endpoint configuration. */
  auth: MsalAuth;
  /** Token cache configuration.  */
  cache: MsalCache;
};

export type Mutation = {
  /** Adds the specified organisation as a lead for the specified Community */
  addChallengeLead: Scalars['Boolean'];
  /** Adds the user with the given identifier as a member of the specified Community */
  addUserToCommunity: UserGroup;
  /** Adds the user with the given identifier to the specified user group */
  addUserToGroup: Scalars['Boolean'];
  /** Create application to join this ecoverse */
  approveApplication: Application;
  /** Assign the user with the given ID as focal point for the given group */
  assignGroupFocalPoint?: Maybe<UserGroup>;
  /** Create a new actor on the ActorGroup with the specified ID */
  createActor: Actor;
  /** Create a new actor group on the Opportunity */
  createActorGroup: ActorGroup;
  /** Create application to join this Community */
  createApplication: Application;
  /** Create a new aspect on the Opportunity */
  createAspect: Aspect;
  /** Create a new aspect on the Project */
  createAspectOnProject: Aspect;
  /** Creates a new challenge and registers it with the ecoverse */
  createChallenge: Challenge;
  /** Creates a new user group for the Community with the given id */
  createGroupOnCommunity: UserGroup;
  /** Creates a new user group for the organisation with the given id */
  createGroupOnOrganisation: UserGroup;
  /** Creates a new Opportunity for the challenge with the given id */
  createOpportunity: Opportunity;
  /** Creates a new organisation and registers it with the ecoverse */
  createOrganisation: Organisation;
  /** Create a new Project on the Opportunity */
  createProject: Project;
  /** Creates a new reference with the specified name for the context with given id */
  createReferenceOnContext: Reference;
  /** Creates a new reference with the specified name for the profile with given id */
  createReferenceOnProfile: Reference;
  /** Create a new relation on the Opportunity */
  createRelation: Relation;
  /** Creates a new tagset with the specified name for the profile with given id */
  createTagsetOnProfile: Tagset;
  /** Creates a new user profile on behalf of an admin or the user account owner. */
  createUser: User;
  /** Removes the actor  with the specified ID */
  removeActor: Actor;
  /** Removes the actor group with the specified ID */
  removeActorGroup: ActorGroup;
  /** Removes the aspect with the specified ID */
  removeAspect: Aspect;
  /** Removes the Challenge with the specified ID */
  removeChallenge: Challenge;
  /** Remove the specified organisation as a lead for the specified Challenge */
  removeChallengeLead: Scalars['Boolean'];
  /** Remove the focal point for the given group */
  removeGroupFocalPoint?: Maybe<UserGroup>;
  /** Removes the Opportunity with the specified ID */
  removeOpportunity: Opportunity;
  /** Removes the Organisaiton with the specified ID */
  removeOrganisation: Organisation;
  /** Removes the Project with the specified ID */
  removeProject: Project;
  /** Removes the reference  with the specified ID */
  removeReference: Reference;
  /** Removes the relation with the specified ID */
  removeRelation: Relation;
  /** Removes the specified user profile. */
  removeUser: User;
  /** Removes user application with the specified applicationID */
  removeUserApplication: Application;
  /** Removes the user with the given identifier as a member of the specified Community */
  removeUserFromCommunity: UserGroup;
  /** Remove the user with the given identifier to the specified user group */
  removeUserFromGroup: UserGroup;
  /** Removes the user group with the specified ID */
  removeUserGroup: UserGroup;
  /** Updates the actor with the specified ID with the supplied data */
  updateActor: Actor;
  /** Updates the aspect with the specified ID */
  updateAspect: Aspect;
  /** Updates the specified Challenge with the provided data (merge) */
  updateChallenge: Challenge;
  /** Updates the Ecoverse with the provided data */
  updateEcoverse: Ecoverse;
  /** Updates the specified Opportunity with the provided data (merge) */
  updateOpportunity: Opportunity;
  /** Updates the organisation with the given data */
  updateOrganisation: Organisation;
  /** Updates the fields on the Profile, such as avatar location or description */
  updateProfile: Profile;
  /** Updates the Project with the specified ID */
  updateProject: Project;
  /** Replace the set of tags in a tagset with the provided tags */
  updateTagset: Tagset;
  /** Update the base user information. Note: email address cannot be updated. */
  updateUser: User;
  /** Update the user group information. */
  updateUserGroup: UserGroup;
  uploadAvatar: Profile;
};

export type MutationAddChallengeLeadArgs = {
  challengeID: Scalars['String'];
  organisationID: Scalars['String'];
};

export type MutationAddUserToCommunityArgs = {
  membershipData: UpdateMembershipInput;
};

export type MutationAddUserToGroupArgs = {
  membershipData: UpdateMembershipInput;
};

export type MutationApproveApplicationArgs = {
  ID: Scalars['Float'];
};

export type MutationAssignGroupFocalPointArgs = {
  membershipData: UpdateMembershipInput;
};

export type MutationCreateActorArgs = {
  actorData: CreateActorInput;
};

export type MutationCreateActorGroupArgs = {
  actorGroupData: CreateActorGroupInput;
};

export type MutationCreateApplicationArgs = {
  applicationData: CreateApplicationInput;
};

export type MutationCreateAspectArgs = {
  aspectData: CreateAspectInput;
};

export type MutationCreateAspectOnProjectArgs = {
  aspectData: CreateAspectInput;
};

export type MutationCreateChallengeArgs = {
  challengeData: CreateChallengeInput;
};

export type MutationCreateGroupOnCommunityArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateGroupOnOrganisationArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateOpportunityArgs = {
  opportunityData: CreateOpportunityInput;
};

export type MutationCreateOrganisationArgs = {
  organisationData: CreateOrganisationInput;
};

export type MutationCreateProjectArgs = {
  projectData: CreateProjectInput;
};

export type MutationCreateReferenceOnContextArgs = {
  referenceInput: CreateReferenceInput;
};

export type MutationCreateReferenceOnProfileArgs = {
  referenceInput: CreateReferenceInput;
};

export type MutationCreateRelationArgs = {
  relationData: CreateRelationInput;
};

export type MutationCreateTagsetOnProfileArgs = {
  tagsetData: CreateTagsetInput;
};

export type MutationCreateUserArgs = {
  userData: CreateUserInput;
};

export type MutationRemoveActorArgs = {
  removeData: RemoveEntityInput;
};

export type MutationRemoveActorGroupArgs = {
  removeData: RemoveEntityInput;
};

export type MutationRemoveAspectArgs = {
  removeData: RemoveEntityInput;
};

export type MutationRemoveChallengeArgs = {
  removeData: RemoveEntityInput;
};

export type MutationRemoveChallengeLeadArgs = {
  challengeID: Scalars['String'];
  organisationID: Scalars['String'];
};

export type MutationRemoveGroupFocalPointArgs = {
  groupID: Scalars['Float'];
};

export type MutationRemoveOpportunityArgs = {
  removeData: RemoveEntityInput;
};

export type MutationRemoveOrganisationArgs = {
  removeData: RemoveEntityInput;
};

export type MutationRemoveProjectArgs = {
  removeData: RemoveEntityInput;
};

export type MutationRemoveReferenceArgs = {
  removeData: RemoveEntityInput;
};

export type MutationRemoveRelationArgs = {
  removeData: RemoveEntityInput;
};

export type MutationRemoveUserArgs = {
  removeData: RemoveEntityInput;
};

export type MutationRemoveUserApplicationArgs = {
  removeData: RemoveEntityInput;
};

export type MutationRemoveUserFromCommunityArgs = {
  membershipData: UpdateMembershipInput;
};

export type MutationRemoveUserFromGroupArgs = {
  membershipData: UpdateMembershipInput;
};

export type MutationRemoveUserGroupArgs = {
  removeData: RemoveEntityInput;
};

export type MutationUpdateActorArgs = {
  actorData: UpdateActorInput;
};

export type MutationUpdateAspectArgs = {
  aspectData: UpdateAspectInput;
};

export type MutationUpdateChallengeArgs = {
  challengeData: UpdateChallengeInput;
};

export type MutationUpdateEcoverseArgs = {
  ecoverseData: UpdateEcoverseInput;
};

export type MutationUpdateOpportunityArgs = {
  opportunityData: UpdateOpportunityInput;
};

export type MutationUpdateOrganisationArgs = {
  organisationData: UpdateOrganisationInput;
};

export type MutationUpdateProfileArgs = {
  profileData: UpdateProfileInput;
};

export type MutationUpdateProjectArgs = {
  projectData: UpdateProjectInput;
};

export type MutationUpdateTagsetArgs = {
  tagsetData: UpdateTagsetInput;
};

export type MutationUpdateUserArgs = {
  userData: UpdateUserInput;
};

export type MutationUpdateUserGroupArgs = {
  userGroupData: UpdateUserGroupInput;
};

export type MutationUploadAvatarArgs = {
  file: Scalars['Upload'];
  profileID: Scalars['Float'];
};

export type Opportunity = {
  /** The set of actor groups within the context of this Opportunity. */
  actorGroups?: Maybe<Array<ActorGroup>>;
  /** The set of aspects within the context of this Opportunity. */
  aspects?: Maybe<Array<Aspect>>;
  /** The community for the opportunity */
  community?: Maybe<Community>;
  /** The shared understanding for the opportunity */
  context?: Maybe<Context>;
  id: Scalars['ID'];
  /** The name of the Opportunity */
  name: Scalars['String'];
  /** The set of projects within the context of this Opportunity */
  projects?: Maybe<Array<Project>>;
  /** The set of relations within the context of this Opportunity. */
  relations?: Maybe<Array<Relation>>;
  /** The maturity phase of the Opportunity i.e. new, being refined, ongoing etc */
  state?: Maybe<Scalars['String']>;
  /** The set of tags for the Opportunity */
  tagset?: Maybe<Tagset>;
  /** A short text identifier for this Opportunity */
  textID: Scalars['String'];
};

export type OpportunityTemplate = {
  /** Template actor groups. */
  actorGroups?: Maybe<Array<Scalars['String']>>;
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Template aspects. */
  aspects?: Maybe<Array<Scalars['String']>>;
  /** Template opportunity name. */
  name: Scalars['String'];
  /** Template relations. */
  relations?: Maybe<Array<Scalars['String']>>;
};

export type Organisation = {
  /** Groups defined on this organisation. */
  groups?: Maybe<Array<UserGroup>>;
  id: Scalars['ID'];
  /** Users that are contributing to this organisation. */
  members?: Maybe<Array<User>>;
  name: Scalars['String'];
  /** The profile for this organisation. */
  profile: Profile;
  /** A short text identifier for this Organisation */
  textID: Scalars['String'];
};

export type Profile = {
  /** A URI that points to the location of an avatar, either on a shared location or a gravatar */
  avatar?: Maybe<Scalars['String']>;
  /** A short description of the entity associated with this profile. */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** A list of URLs to relevant information. */
  references?: Maybe<Array<Reference>>;
  /** A list of named tagsets, each of which has a list of tags. */
  tagsets?: Maybe<Array<Tagset>>;
};

export type Project = {
  /** The set of aspects for this Project. Note: likley to change. */
  aspects?: Maybe<Array<Aspect>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  /** The maturity phase of the project i.e. new, being refined, committed, in-progress, closed etc */
  state?: Maybe<Scalars['String']>;
  /** The set of tags for the project */
  tagset?: Maybe<Tagset>;
  /** A short text identifier for this Opportunity */
  textID: Scalars['String'];
};

export type Query = {
  /** Cherrytwist configuration. Provides configuration to external services in the Cherrytwist ecosystem. */
  configuration: Config;
  /** The ecoverse. */
  ecoverse: Ecoverse;
  /** The currently logged in user */
  me: User;
  /** Cherrytwist Services Metadata */
  metadata: Metadata;
  /** A particular Organisation */
  organisation: Organisation;
  /** The Organisations on this platform */
  organisations: Array<Organisation>;
  /** Search the ecoverse for terms supplied */
  search: Array<SearchResultEntry>;
  /** A particular user, identified by the ID or by email */
  user: User;
  /** The users who have profiles on this platform */
  users: Array<User>;
  /** The users filtered by list of IDs. */
  usersById: Array<User>;
};

export type QueryOrganisationArgs = {
  ID: Scalars['String'];
};

export type QuerySearchArgs = {
  searchData: SearchInput;
};

export type QueryUserArgs = {
  ID: Scalars['String'];
};

export type QueryUsersByIdArgs = {
  IDs: Array<Scalars['String']>;
};

export type Question = {
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type QuestionTemplate = {
  /** Question template. */
  question: Scalars['String'];
  /** Is question required? */
  required: Scalars['Boolean'];
};

export type Reference = {
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  uri: Scalars['String'];
};

export type Relation = {
  actorName: Scalars['String'];
  actorRole: Scalars['String'];
  actorType: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  type: Scalars['String'];
};

export type RemoveEntityInput = {
  ID: Scalars['Float'];
};

export type Scope = {
  /** OpenID Scopes. */
  scopes: Array<Scalars['String']>;
};

export type SearchInput = {
  /** Restrict the search to only the specified challenges. Default is all Challenges. */
  challengesFilter?: Maybe<Array<Scalars['Float']>>;
  /** Expand the search to includes Tagsets with the provided names. Max 2. */
  tagsetNames?: Maybe<Array<Scalars['String']>>;
  /** The terms to be searched for within this Ecoverse. Max 5. */
  terms: Array<Scalars['String']>;
  /** Restrict the search to only the specified entity types. Values allowed: user, group, organisation, Default is all. */
  typesFilter?: Maybe<Array<Scalars['String']>>;
};

export type SearchResult = Organisation | User | UserGroup;

export type SearchResultEntry = {
  /** Each search result contains either a User, UserGroup or Organisation */
  result?: Maybe<SearchResult>;
  /** The score for this search result; more matches means a higher score. */
  score?: Maybe<Scalars['Float']>;
  /** The terms that were matched for this result */
  terms?: Maybe<Array<Scalars['String']>>;
};

export type ServiceMetadata = {
  /** Service name e.g. CT Server */
  name?: Maybe<Scalars['String']>;
  /** Version in the format {major.minor.patch} - using SemVer. */
  version?: Maybe<Scalars['String']>;
};

export type Tagset = {
  id: Scalars['ID'];
  name: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type TagsetTemplate = {
  /** Tagset template name. */
  name: Scalars['String'];
  /** Tagset placeholder */
  placeholder?: Maybe<Scalars['String']>;
};

export type Template = {
  /** Challenge templates. */
  challenges: Array<ChallengeTemplate>;
  /** Template description. */
  description: Scalars['String'];
  /** Ecoverse templates. */
  ecoverses: Array<EcoverseTemplate>;
  /** Template name. */
  name: Scalars['String'];
  /** Opportunity templates. */
  opportunities: Array<OpportunityTemplate>;
  /** User templates. */
  users: Array<UserTemplate>;
};

export type UpdateActorInput = {
  ID: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type UpdateAspectInput = {
  ID: Scalars['String'];
  explanation?: Maybe<Scalars['String']>;
  framing?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateChallengeInput = {
  ID: Scalars['String'];
  context?: Maybe<UpdateContextInput>;
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateContextInput = {
  background?: Maybe<Scalars['String']>;
  /** Create additional references */
  createReferences?: Maybe<Array<CreateReferenceInput>>;
  impact?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  /** Update the existing references */
  updateReferences?: Maybe<Array<UpdateReferenceInput>>;
  vision?: Maybe<Scalars['String']>;
  who?: Maybe<Scalars['String']>;
};

export type UpdateEcoverseInput = {
  ID: Scalars['String'];
  /** Updated context for the ecoverse; will be merged with existing context */
  context?: Maybe<UpdateContextInput>;
  /** The host Organisation for the ecoverse */
  hostID?: Maybe<Scalars['Float']>;
  /** The new name for the ecoverse */
  name?: Maybe<Scalars['String']>;
  /** The set of tags to apply to this ecoverse */
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateMembershipInput = {
  childID: Scalars['Float'];
  parentID: Scalars['Float'];
};

export type UpdateOpportunityInput = {
  ID: Scalars['String'];
  context?: Maybe<UpdateContextInput>;
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateOrganisationInput = {
  ID: Scalars['String'];
  /** The name for this organisation */
  name?: Maybe<Scalars['String']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type UpdateProfileInput = {
  ID: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  createReferencesData?: Maybe<Array<CreateReferenceInput>>;
  createTagsetsData?: Maybe<Array<CreateTagsetInput>>;
  description?: Maybe<Scalars['String']>;
  updateReferencesData?: Maybe<Array<UpdateReferenceInput>>;
  updateTagsetsData?: Maybe<Array<UpdateTagsetInput>>;
};

export type UpdateProjectInput = {
  ID: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  textID?: Maybe<Scalars['String']>;
};

export type UpdateReferenceInput = {
  ID: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type UpdateTagsetInput = {
  ID: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateUserGroupInput = {
  ID: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type UpdateUserInput = {
  ID: Scalars['String'];
  accountUpn?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** Email address is required for mutations! */
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type User = {
  /** The unique personal identifier (upn) for the account associated with this user profile */
  accountUpn: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  /** An overview of the groups this user is a memberof. Note: all groups are returned without members to avoid recursion. */
  memberof?: Maybe<MemberOf>;
  name: Scalars['String'];
  phone: Scalars['String'];
  /** The profile for this user */
  profile?: Maybe<Profile>;
};

export type UserGroup = {
  /** The User that is the focal point of this User Group. */
  focalPoint?: Maybe<User>;
  id: Scalars['ID'];
  /** The Users that are members of this User Group. */
  members?: Maybe<Array<User>>;
  name: Scalars['String'];
  /** Containing entity for this UserGroup. */
  parent?: Maybe<UserGroupParent>;
  /** The profile for the user group */
  profile?: Maybe<Profile>;
};

export type UserGroupParent = Community | Organisation;

export type UserTemplate = {
  /** User template name. */
  name: Scalars['String'];
  /** Tagset templates. */
  tagsets?: Maybe<Array<TagsetTemplate>>;
};
