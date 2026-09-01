/* eslint-disable @typescript-eslint/no-explicit-any */
import * as SchemaTypes from '../types/alkemio-schema';

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  Emoji: any;
  LifecycleDefinition: any;
  Markdown: any;
  MessageID: any;
  NameID: string;
  SearchCursor: any;
  UUID: string;
  Upload: import('graphql-upload').FileUpload;
};

export type Apm = {
  /** Endpoint where events are sent. */
  endpoint: Scalars['String'];
  /** Flag indicating if real user monitoring is enabled. */
  rumEnabled: Scalars['Boolean'];
};

export type Account = ActorFull & {
  /** The type of Account (user or organization hosted). */
  accountType?: Maybe<AccountType>;
  /** The Actor representing this Account. */
  actor: Actor;
  /** The authorization rules for the Actor */
  authorization?: Maybe<Authorization>;
  /** The base license plan assigned to this Account. Additional entitlements may be added via other means. */
  baselineLicensePlan: AccountLicensePlan;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The credentials held by this Actor */
  credentials?: Maybe<Array<Credential>>;
  /** The external subscription ID for this Account. */
  externalSubscriptionID?: Maybe<Scalars['String']>;
  /** The Account host. */
  host?: Maybe<Actor>;
  /** The ID of the Actor */
  id: Scalars['UUID'];
  /** The InnovationHubs for this Account. */
  innovationHubs: Array<InnovationHub>;
  /** The InnovationPacks for this Account. */
  innovationPacks: Array<InnovationPack>;
  /** The License operating on this Account. */
  license: License;
  /** A name identifier of the Account, unique within the platform. */
  nameID: Scalars['NameID'];
  /** The profile for this Actor. */
  profile?: Maybe<Profile>;
  /** The Spaces within this Account. */
  spaces: Array<Space>;
  /** The StorageAggregator in use by this Account */
  storageAggregator: StorageAggregator;
  /** The subscriptions active for this Account. */
  subscriptions: Array<AccountSubscription>;
  /** The type of Actor */
  type: ActorType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The virtual contributors for this Account. */
  virtualContributors: Array<VirtualContributor>;
};

export type AccountInnovationHubsArgs = {
  searchVisibility?: InputMaybe<Array<SearchVisibility>>;
};

export type AccountInnovationPacksArgs = {
  searchVisibility?: InputMaybe<Array<SearchVisibility>>;
};

export type AccountAuthorizationResetInput = {
  /** The identifier of the Account whose Authorization Policy should be reset. */
  accountID: Scalars['UUID'];
};

export type AccountLicensePlan = {
  /** The number of Innovation Packs allowed. */
  innovationPacks: Scalars['Int'];
  /** The number of Free Spaces allowed. */
  spaceFree: Scalars['Int'];
  /** The number of Plus Spaces allowed. */
  spacePlus: Scalars['Int'];
  /** The number of Premium Spaces allowed. */
  spacePremium: Scalars['Int'];
  /** The number of Starting Pages allowed. */
  startingPages: Scalars['Int'];
  /** The number of Virtual Contributors allowed. */
  virtualContributor: Scalars['Int'];
};

export type AccountLicenseResetInput = {
  /** The identifier of the Account whose License and Entitlements should be reset. */
  accountID: Scalars['UUID'];
};

export type AccountSubscription = {
  /** The expiry date of this subscription, null if it does never expire. */
  expires?: Maybe<Scalars['DateTime']>;
  /** The name of the Subscription. */
  name: LicensingCredentialBasedCredentialType;
};

export enum AccountType {
  Organization = 'ORGANIZATION',
  User = 'USER',
}

export type ActivityCreatedSubscriptionInput = {
  /** The collaboration on which to subscribe for new activity */
  collaborationID: Scalars['UUID'];
  /** Include activities happened on child Collaborations. */
  includeChild?: InputMaybe<Scalars['Boolean']>;
  /** Which activity types to include in the results. Returns all by default. */
  types?: InputMaybe<Array<ActivityEventType>>;
};

export type ActivityCreatedSubscriptionResult = {
  /** The newly created activity */
  activity: ActivityLogEntry;
};

export enum ActivityEventType {
  CalendarEventCreated = 'CALENDAR_EVENT_CREATED',
  CalloutLinkCreated = 'CALLOUT_LINK_CREATED',
  CalloutMemoCreated = 'CALLOUT_MEMO_CREATED',
  CalloutPostComment = 'CALLOUT_POST_COMMENT',
  CalloutPostCreated = 'CALLOUT_POST_CREATED',
  CalloutPublished = 'CALLOUT_PUBLISHED',
  CalloutWhiteboardContentModified = 'CALLOUT_WHITEBOARD_CONTENT_MODIFIED',
  CalloutWhiteboardCreated = 'CALLOUT_WHITEBOARD_CREATED',
  DiscussionComment = 'DISCUSSION_COMMENT',
  MemberJoined = 'MEMBER_JOINED',
  SubspaceCreated = 'SUBSPACE_CREATED',
  UpdateSent = 'UPDATE_SENT',
}

export type ActivityFeed = {
  activityFeed: Array<ActivityLogEntry>;
  pageInfo: PageInfo;
  total: Scalars['Float'];
};

export type ActivityFeedGroupedQueryArgs = {
  /** What events to exclude. */
  excludeTypes?: InputMaybe<Array<ActivityEventType>>;
  /** Number of activities to return. */
  limit?: InputMaybe<Scalars['Float']>;
  /** Returns only events that the current user triggered; Includes all by default. */
  myActivity?: InputMaybe<Scalars['Boolean']>;
  /** Activity from which Spaces to include; Includes all by default. */
  roles?: InputMaybe<Array<ActivityFeedRoles>>;
  /** Activity from which Spaces to include; Includes all by default. */
  spaceIds?: InputMaybe<Array<Scalars['UUID']>>;
  /** What events to include; Includes all by default. */
  types?: InputMaybe<Array<ActivityEventType>>;
};

export type ActivityFeedQueryArgs = {
  /** What events to exclude. */
  excludeTypes?: InputMaybe<Array<ActivityEventType>>;
  /** Returns only events that the current user triggered; Includes all by default. */
  myActivity?: InputMaybe<Scalars['Boolean']>;
  /** Activity from which Spaces to include; Includes all by default. */
  roles?: InputMaybe<Array<ActivityFeedRoles>>;
  /** Activity from which Spaces to include; Includes all by default. */
  spaceIds?: InputMaybe<Array<Scalars['UUID']>>;
  /** What events to include; Includes all by default. */
  types?: InputMaybe<Array<ActivityEventType>>;
};

export enum ActivityFeedRoles {
  Admin = 'ADMIN',
  Lead = 'LEAD',
  Member = 'MEMBER',
}

export type ActivityLogEntry = {
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalendarEventCreated = ActivityLogEntry & {
  /** The Calendar in which the CalendarEvent was created. */
  calendar: Calendar;
  /** The CalendarEvent that was created. */
  calendarEvent: CalendarEvent;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutDiscussionComment = ActivityLogEntry & {
  /** The Callout in which the comment was added. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutLinkCreated = ActivityLogEntry & {
  /** The Callout in which the Link was created. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The Link that was created. */
  link: Link;
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutMemoCreated = ActivityLogEntry & {
  /** The Callout in which the Memo was created. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The Memo that was created. */
  memo: Memo;
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutPostComment = ActivityLogEntry & {
  /** The Callout in which the Post was commented. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Post that was commented on. */
  post: Post;
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutPostCreated = ActivityLogEntry & {
  /** The Callout in which the Post was created. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Post that was created. */
  post: Post;
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutPublished = ActivityLogEntry & {
  /** The Callout that was published. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutWhiteboardContentModified =
  ActivityLogEntry & {
    /** The Callout in which the Whiteboard was updated. */
    callout: Callout;
    /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
    child: Scalars['Boolean'];
    /** The id of the Collaboration entity within which the Activity was generated. */
    collaborationID: Scalars['UUID'];
    /** The timestamp for the Activity. */
    createdDate: Scalars['DateTime'];
    /** The text details for this Activity. */
    description: Scalars['String'];
    id: Scalars['UUID'];
    /** The display name of the parent */
    parentDisplayName: Scalars['String'];
    /** The Space where the activity happened */
    space?: Maybe<Space>;
    /** The user that triggered this Activity. */
    triggeredBy: User;
    /** The event type for this Activity. */
    type: ActivityEventType;
    /** The Whiteboard that was updated. */
    whiteboard: Whiteboard;
  };

export type ActivityLogEntryCalloutWhiteboardCreated = ActivityLogEntry & {
  /** The Callout in which the Whiteboard was created. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
  /** The Whiteboard that was created. */
  whiteboard: Whiteboard;
};

export type ActivityLogEntryMemberJoined = ActivityLogEntry & {
  /** The Actor that joined the Community. */
  actor: Actor;
  /** The type of the Actor that joined the Community. */
  actorType: ActorType;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The community that was joined. */
  community: Community;
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntrySubspaceCreated = ActivityLogEntry & {
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The Subspace that was created. */
  subspace: Space;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryUpdateSent = ActivityLogEntry & {
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The url to the Journey. */
  journeyUrl: Scalars['String'];
  /** The Message that been sent to this Community. */
  message: Scalars['String'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
  /** The Updates for this Community. */
  updates: Room;
};

export type ActivityLogInput = {
  /** Display the activityLog results for the specified Collaboration. */
  collaborationID: Scalars['UUID'];
  /** Include entries happened on child Collaborations. */
  includeChild?: InputMaybe<Scalars['Boolean']>;
  /** The number of ActivityLog entries to return; if omitted return all. */
  limit?: InputMaybe<Scalars['Float']>;
  /** Which activity types to include in the results. Returns all by default. */
  types?: InputMaybe<Array<ActivityEventType>>;
};

/** Lightweight actor data containing only base fields. Use for displays where nameID and child-specific fields are not needed. */
export type Actor = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The credentials held by this Actor. */
  credentials?: Maybe<Array<Credential>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The profile for this Actor. */
  profile?: Maybe<Profile>;
  /** The type of Actor */
  type: ActorType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type ActorFilterInput = {
  /** Return actors with credentials in the provided list */
  credentials?: InputMaybe<Array<AuthorizationCredential>>;
};

export type ActorFull = {
  /** The authorization rules for the Actor */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The credentials held by this Actor */
  credentials?: Maybe<Array<Credential>>;
  /** The ID of the Actor */
  id: Scalars['UUID'];
  /** A name identifier of the Actor, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The profile for this Actor. */
  profile?: Maybe<Profile>;
  /** The type of Actor */
  type: ActorType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type ActorRolePolicy = {
  /** Maximum number of Actors in this role */
  maximum: Scalars['Float'];
  /** Minimum number of Actors in this role */
  minimum: Scalars['Float'];
};

export type ActorRoles = {
  /** The applications for the specified user; only accessible for platform admins */
  applications: Array<CommunityApplicationForRoleResult>;
  id: Scalars['UUID'];
  /** The invitations for the specified user; only accessible for platform admins */
  invitations: Array<CommunityInvitationForRoleResult>;
  /** Details of the roles the actor has in Organizations */
  organizations: Array<RolesResultOrganization>;
  /** Details of Spaces the User or Organization is a member of, with child memberships - if Space is accessible for the current user. */
  spaces: Array<RolesResultSpace>;
};

export type ActorRolesApplicationsArgs = {
  states?: InputMaybe<Array<Scalars['String']>>;
};

export type ActorRolesInvitationsArgs = {
  states?: InputMaybe<Array<Scalars['String']>>;
};

/** The type of Actor - determines which entity table the actor belongs to. */
export enum ActorType {
  Account = 'ACCOUNT',
  Organization = 'ORGANIZATION',
  Space = 'SPACE',
  User = 'USER',
  VirtualAssistant = 'VIRTUAL_ASSISTANT',
  VirtualContributor = 'VIRTUAL_CONTRIBUTOR',
}

export type AddClassificationEntryFromTemplateInput = {
  /** Override for the entry's display label. Defaults to the source template's display name. */
  displayLabel?: InputMaybe<Scalars['String']>;
  /** The Space to add the Classification to. */
  spaceID: Scalars['UUID'];
  /** The Classification Template to copy the vocabulary from. */
  templateID: Scalars['UUID'];
};

export type AddPollOptionInput = {
  pollID: Scalars['UUID'];
  text: Scalars['String'];
};

export type AddReactionToCalloutInput = {
  /** The ID of the Callout to react to. */
  calloutID: Scalars['UUID'];
  /** Must be one of the platform allowed emoji slugs; validated server-side (ValidationException on miss). */
  emoji: Scalars['String'];
};

export type AddVisualToMediaGalleryInput = {
  /** The ID of the media gallery. */
  mediaGalleryID: Scalars['String'];
  /** The sort order of the visual within the media gallery. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** The type of visual to add (e.g. MEDIA_GALLERY_IMAGE, MEDIA_GALLERY_VIDEO). */
  visualType: VisualType;
};

export type AdminRevokeMcpApiKeyInput = {
  keyID: Scalars['UUID'];
  /** Owner of the key. Required — it scopes the revoke and the audit subject. */
  userID: Scalars['UUID'];
};

export type AdminUserEmailChangeDriftResolveInput = {
  /** The admin-chosen canonical email. MUST equal either the old or new email recorded on the drift_detected audit entry. Both sides are force-aligned to this value. */
  canonicalEmail: Scalars['String'];
  /** The subject user whose latest audit entry is drift_detected. */
  userID: Scalars['UUID'];
};

export type AdminUserEmailChangeInput = {
  /** Who authorized the change within the subject user's organization. Distinct from the acting platform admin. */
  approver: EmailChangeApproverInput;
  /** The proposed new email address. */
  newEmail: Scalars['String'];
  /** Admin justification for the change (e.g. support-ticket reference). Recorded on every audit entry for this operation. */
  reason: Scalars['String'];
  /** The subject user whose login email is being changed. */
  userID: Scalars['UUID'];
};

export type AiPersona = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date when the body of knowledge was last ingested. */
  bodyOfKnowledgeLastUpdated?: Maybe<Scalars['DateTime']>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The AI Persona Engine being used by this AI Persona. */
  engine: AiPersonaEngine;
  /** The external configuration for this AI Persona. */
  externalConfig?: Maybe<ExternalConfig>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The prompt used by this AI Persona */
  prompt: Array<Scalars['String']>;
  /** The prompt graph for this AI Persona. */
  promptGraph?: Maybe<PromptGraph>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export enum AiPersonaEngine {
  CommunityManager = 'COMMUNITY_MANAGER',
  Expert = 'EXPERT',
  GenericOpenai = 'GENERIC_OPENAI',
  Guidance = 'GUIDANCE',
  LibraFlow = 'LIBRA_FLOW',
  OpenaiAssistant = 'OPENAI_ASSISTANT',
}

export type AiServer = {
  /** A particular AiPersona */
  aiPersona: AiPersona;
  /** The AI Personas hosted by this AI Server. */
  aiPersonas: Array<AiPersona>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The default AiPersona in use on the aiServer. */
  defaultAiPersona: AiPersona;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type AiServerAiPersonaArgs = {
  ID: Scalars['UUID'];
};

export type Application = {
  /** The Actor for this Application. */
  actor: Actor;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Is this lifecycle in a final state (done). */
  isFinalized: Scalars['Boolean'];
  lifecycle: Lifecycle;
  /** The next events of this Lifecycle. */
  nextEvents: Array<Scalars['String']>;
  /** The Questions for this application. */
  questions: Array<Question>;
  /** The current state of this Lifecycle. */
  state: Scalars['String'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The User who submitted this Application. */
  user?: Maybe<User>;
};

export type ApplicationEventInput = {
  applicationID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export type ApplyForEntryRoleOnRoleSetInput = {
  questions: Array<CreateNvpInput>;
  roleSetID: Scalars['UUID'];
};

export type AssignConversationMemberInput = {
  /** The ID of the conversation to add a member to. */
  conversationID: Scalars['UUID'];
  /** The ID of the member (user or VC) to add. */
  memberID: Scalars['UUID'];
};

export type AssignLicensePlanToAccount = {
  /** The ID of the Account to assign the LicensePlan to. */
  accountID: Scalars['UUID'];
  /** The ID of the LicensePlan to assign. */
  licensePlanID: Scalars['UUID'];
  /** The ID of the Licensing to use. */
  licensingID?: InputMaybe<Scalars['UUID']>;
};

export type AssignLicensePlanToSpace = {
  /** The ID of the LicensePlan to assign. */
  licensePlanID: Scalars['UUID'];
  /** The ID of the Licensing to use. */
  licensingID?: InputMaybe<Scalars['UUID']>;
  /** The ID of the Space to assign the LicensePlan to. */
  spaceID: Scalars['UUID'];
};

export type AssignPlatformRoleInput = {
  actorID: Scalars['UUID'];
  role: RoleName;
};

export type AssignRoleOnRoleSetInput = {
  actorID: Scalars['UUID'];
  role: RoleName;
  roleSetID: Scalars['UUID'];
};

export type AssignUserGroupMemberInput = {
  groupID: Scalars['UUID'];
  userID: Scalars['UUID'];
};

export type AssistantCapability = {
  /** What the capability does (for the settings UI). */
  description: Scalars['String'];
  /** Human-readable label for the capability toggle. */
  displayName: Scalars['String'];
  /** READ | WRITE_ADDITIVE | WRITE_DESTRUCTIVE — drives the default (READ enabled, WRITE_* disabled) and confirmation behaviour. */
  kind: AssistantCapabilityKind;
  /** The MCP tool name, e.g. "search_content". */
  name: Scalars['String'];
};

/** The kind of an assistant capability — READ is enabled by default; WRITE_* are disabled by default and confirmation-gated. */
export enum AssistantCapabilityKind {
  Read = 'READ',
  WriteAdditive = 'WRITE_ADDITIVE',
  WriteDestructive = 'WRITE_DESTRUCTIVE',
}

export type AssistantCapabilityToggle = {
  /** The capability (MCP tool name) this toggle controls. */
  capability: Scalars['String'];
  /** Whether the capability is enabled. */
  enabled: Scalars['Boolean'];
};

export type AssistantCapabilityToggleInput = {
  /** The capability (MCP tool name) this toggle controls. */
  capability: Scalars['String'];
  /** Whether the capability is enabled. */
  enabled: Scalars['Boolean'];
};

export type AuthenticationConfig = {
  /** Alkemio Authentication Providers Config. */
  providers: Array<AuthenticationProviderConfig>;
};

export type AuthenticationProviderConfig = {
  /** Configuration of the authentication provider */
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

export type AuthenticationProviderConfigUnion = OryConfig;

export enum AuthenticationType {
  Cleverbase = 'CLEVERBASE',
  Email = 'EMAIL',
  Github = 'GITHUB',
  Linkedin = 'LINKEDIN',
  Microsoft = 'MICROSOFT',
  Passkey = 'PASSKEY',
  Unknown = 'UNKNOWN',
}

export type Authorization = {
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The set of credential rules that are contained by this Authorization Policy. */
  credentialRules?: Maybe<Array<AuthorizationPolicyRuleCredential>>;
  /** Does the current User have the specified privilege based on this Authorization Policy. */
  hasPrivilege: Scalars['Boolean'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The privileges granted to the current user based on this Authorization Policy. */
  myPrivileges?: Maybe<Array<AuthorizationPrivilege>>;
  /** The set of privilege rules that are contained by this Authorization Policy. */
  privilegeRules?: Maybe<Array<AuthorizationPolicyRulePrivilege>>;
  /** A type of entity that this Authorization Policy is being used with. */
  type?: Maybe<AuthorizationPolicyType>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type AuthorizationHasPrivilegeArgs = {
  privilege: AuthorizationPrivilege;
};

export enum AuthorizationCredential {
  AccountAdmin = 'ACCOUNT_ADMIN',
  AssistantAccess = 'ASSISTANT_ACCESS',
  BetaTester = 'BETA_TESTER',
  GlobalAdmin = 'GLOBAL_ADMIN',
  GlobalAnonymous = 'GLOBAL_ANONYMOUS',
  GlobalCommunityRead = 'GLOBAL_COMMUNITY_READ',
  GlobalGuest = 'GLOBAL_GUEST',
  GlobalLicenseManager = 'GLOBAL_LICENSE_MANAGER',
  GlobalPlatformManager = 'GLOBAL_PLATFORM_MANAGER',
  GlobalRegistered = 'GLOBAL_REGISTERED',
  GlobalSpacesReader = 'GLOBAL_SPACES_READER',
  GlobalSupport = 'GLOBAL_SUPPORT',
  GlobalSupportManager = 'GLOBAL_SUPPORT_MANAGER',
  OrganizationAdmin = 'ORGANIZATION_ADMIN',
  OrganizationAssociate = 'ORGANIZATION_ASSOCIATE',
  OrganizationOwner = 'ORGANIZATION_OWNER',
  PlatformOperationsAdmin = 'PLATFORM_OPERATIONS_ADMIN',
  SpaceAdmin = 'SPACE_ADMIN',
  SpaceLead = 'SPACE_LEAD',
  SpaceMember = 'SPACE_MEMBER',
  SpaceMemberInvitee = 'SPACE_MEMBER_INVITEE',
  SpaceSubspaceAdmin = 'SPACE_SUBSPACE_ADMIN',
  UserGroupMember = 'USER_GROUP_MEMBER',
  UserSelfManagement = 'USER_SELF_MANAGEMENT',
  VcCampaign = 'VC_CAMPAIGN',
}

export type AuthorizationPolicyRuleCredential = {
  cascade: Scalars['Boolean'];
  criterias: Array<CredentialDefinition>;
  grantedPrivileges: Array<AuthorizationPrivilege>;
  name?: Maybe<Scalars['String']>;
};

export type AuthorizationPolicyRulePrivilege = {
  grantedPrivileges: Array<AuthorizationPrivilege>;
  name?: Maybe<Scalars['String']>;
  sourcePrivilege: AuthorizationPrivilege;
};

export enum AuthorizationPolicyType {
  Account = 'ACCOUNT',
  Agent = 'AGENT',
  AiPersona = 'AI_PERSONA',
  AiServer = 'AI_SERVER',
  Application = 'APPLICATION',
  Calendar = 'CALENDAR',
  CalendarEvent = 'CALENDAR_EVENT',
  Callout = 'CALLOUT',
  CalloutsSet = 'CALLOUTS_SET',
  CalloutContribution = 'CALLOUT_CONTRIBUTION',
  CalloutFraming = 'CALLOUT_FRAMING',
  Classification = 'CLASSIFICATION',
  Collaboration = 'COLLABORATION',
  CollaboraDocument = 'COLLABORA_DOCUMENT',
  Communication = 'COMMUNICATION',
  CommunicationConversation = 'COMMUNICATION_CONVERSATION',
  CommunicationMessaging = 'COMMUNICATION_MESSAGING',
  Community = 'COMMUNITY',
  CommunityGuidelines = 'COMMUNITY_GUIDELINES',
  Discussion = 'DISCUSSION',
  Document = 'DOCUMENT',
  Forum = 'FORUM',
  InnovationFlow = 'INNOVATION_FLOW',
  InnovationFlowState = 'INNOVATION_FLOW_STATE',
  InnovationHub = 'INNOVATION_HUB',
  InnovationPack = 'INNOVATION_PACK',
  Invitation = 'INVITATION',
  InMemory = 'IN_MEMORY',
  KnowledgeBase = 'KNOWLEDGE_BASE',
  Library = 'LIBRARY',
  License = 'LICENSE',
  LicensePolicy = 'LICENSE_POLICY',
  Licensing = 'LICENSING',
  Link = 'LINK',
  MediaGallery = 'MEDIA_GALLERY',
  Memo = 'MEMO',
  Organization = 'ORGANIZATION',
  OrganizationVerification = 'ORGANIZATION_VERIFICATION',
  Platform = 'PLATFORM',
  Poll = 'POLL',
  Post = 'POST',
  Profile = 'PROFILE',
  Reference = 'REFERENCE',
  RoleSet = 'ROLE_SET',
  Room = 'ROOM',
  Space = 'SPACE',
  SpaceAbout = 'SPACE_ABOUT',
  StorageAggregator = 'STORAGE_AGGREGATOR',
  StorageBucket = 'STORAGE_BUCKET',
  Tagset = 'TAGSET',
  Template = 'TEMPLATE',
  TemplatesManager = 'TEMPLATES_MANAGER',
  TemplatesSet = 'TEMPLATES_SET',
  TemplateContentSpace = 'TEMPLATE_CONTENT_SPACE',
  TemplateDefault = 'TEMPLATE_DEFAULT',
  Timeline = 'TIMELINE',
  Unknown = 'UNKNOWN',
  User = 'USER',
  UserGroup = 'USER_GROUP',
  UserSettings = 'USER_SETTINGS',
  VirtualAssistant = 'VIRTUAL_ASSISTANT',
  VirtualContributor = 'VIRTUAL_CONTRIBUTOR',
  Visual = 'VISUAL',
  Whiteboard = 'WHITEBOARD',
}

export enum AuthorizationPrivilege {
  AccessInteractiveGuidance = 'ACCESS_INTERACTIVE_GUIDANCE',
  AccessVirtualAssistant = 'ACCESS_VIRTUAL_ASSISTANT',
  AccountLicenseManage = 'ACCOUNT_LICENSE_MANAGE',
  AuthorizationReset = 'AUTHORIZATION_RESET',
  CommunityAssignVcFromAccount = 'COMMUNITY_ASSIGN_VC_FROM_ACCOUNT',
  Contribute = 'CONTRIBUTE',
  Create = 'CREATE',
  CreateCallout = 'CREATE_CALLOUT',
  CreateDiscussion = 'CREATE_DISCUSSION',
  CreateInnovationHub = 'CREATE_INNOVATION_HUB',
  CreateInnovationPack = 'CREATE_INNOVATION_PACK',
  CreateMessage = 'CREATE_MESSAGE',
  CreateMessageReaction = 'CREATE_MESSAGE_REACTION',
  CreateMessageReply = 'CREATE_MESSAGE_REPLY',
  CreateOrganization = 'CREATE_ORGANIZATION',
  CreatePost = 'CREATE_POST',
  CreateSpace = 'CREATE_SPACE',
  CreateSubspace = 'CREATE_SUBSPACE',
  CreateVirtual = 'CREATE_VIRTUAL',
  CreateWhiteboard = 'CREATE_WHITEBOARD',
  Delete = 'DELETE',
  FileDelete = 'FILE_DELETE',
  FileUpload = 'FILE_UPLOAD',
  Grant = 'GRANT',
  GrantGlobalAdmins = 'GRANT_GLOBAL_ADMINS',
  LicenseReset = 'LICENSE_RESET',
  MoveContribution = 'MOVE_CONTRIBUTION',
  MovePost = 'MOVE_POST',
  MoveTask = 'MOVE_TASK',
  PlatformAdmin = 'PLATFORM_ADMIN',
  PlatformOperationsAdmin = 'PLATFORM_OPERATIONS_ADMIN',
  PlatformSettingsAdmin = 'PLATFORM_SETTINGS_ADMIN',
  PublicShare = 'PUBLIC_SHARE',
  Read = 'READ',
  ReadAbout = 'READ_ABOUT',
  ReadLicense = 'READ_LICENSE',
  ReadUsers = 'READ_USERS',
  ReadUserPii = 'READ_USER_PII',
  ReadUserSettings = 'READ_USER_SETTINGS',
  ReceiveNotifications = 'RECEIVE_NOTIFICATIONS',
  ReceiveNotificationsAdmin = 'RECEIVE_NOTIFICATIONS_ADMIN',
  ReceiveNotificationsOrganizationAdmin = 'RECEIVE_NOTIFICATIONS_ORGANIZATION_ADMIN',
  ReceiveNotificationsSpaceAdmin = 'RECEIVE_NOTIFICATIONS_SPACE_ADMIN',
  ReceiveNotificationsSpaceLead = 'RECEIVE_NOTIFICATIONS_SPACE_LEAD',
  RolesetEntryRoleApply = 'ROLESET_ENTRY_ROLE_APPLY',
  RolesetEntryRoleAssign = 'ROLESET_ENTRY_ROLE_ASSIGN',
  RolesetEntryRoleAssignOrganization = 'ROLESET_ENTRY_ROLE_ASSIGN_ORGANIZATION',
  RolesetEntryRoleInvite = 'ROLESET_ENTRY_ROLE_INVITE',
  RolesetEntryRoleInviteAccept = 'ROLESET_ENTRY_ROLE_INVITE_ACCEPT',
  RolesetEntryRoleJoin = 'ROLESET_ENTRY_ROLE_JOIN',
  TransferResourceAccept = 'TRANSFER_RESOURCE_ACCEPT',
  TransferResourceOffer = 'TRANSFER_RESOURCE_OFFER',
  Update = 'UPDATE',
  UpdateCalloutPublisher = 'UPDATE_CALLOUT_PUBLISHER',
  UpdateContent = 'UPDATE_CONTENT',
  UpdateInnovationFlow = 'UPDATE_INNOVATION_FLOW',
}

export type Calendar = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** A single CalendarEvent */
  event?: Maybe<CalendarEvent>;
  /** The list of CalendarEvents for this Calendar. */
  events: Array<CalendarEvent>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type CalendarEventArgs = {
  ID: Scalars['UUID'];
};

export type CalendarEvent = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The comments for this CalendarEvent */
  comments: Room;
  /** The user that created this CalendarEvent */
  createdBy?: Maybe<User>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The length of the event in days. */
  durationDays?: Maybe<Scalars['Float']>;
  /** The length of the event in minutes. */
  durationMinutes: Scalars['Float'];
  /** Google Calendar add-event URL for this CalendarEvent. */
  googleCalendarUrl?: Maybe<Scalars['String']>;
  /** ICS download URL for this CalendarEvent. */
  icsDownloadUrl?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Flag to indicate if this event is for multiple days. */
  multipleDays: Scalars['Boolean'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** Outlook Calendar add-event URL for this CalendarEvent. */
  outlookCalendarUrl?: Maybe<Scalars['String']>;
  /** The Profile for this Post. */
  profile: Profile;
  /** The start time for this CalendarEvent. */
  startDate?: Maybe<Scalars['DateTime']>;
  /** Which Subspace is this event part of. Only applicable if the Space has this option enabled. */
  subspace?: Maybe<Space>;
  /** The event type, e.g. webinar, meetup etc. */
  type: CalendarEventType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** Is the event visible on the parent calendar. */
  visibleOnParentCalendar: Scalars['Boolean'];
  /** Flag to indicate if this event is for a whole day. */
  wholeDay: Scalars['Boolean'];
};

export enum CalendarEventType {
  Deadline = 'DEADLINE',
  Event = 'EVENT',
  Meeting = 'MEETING',
  Milestone = 'MILESTONE',
  Other = 'OTHER',
  Training = 'TRAINING',
}

export type Callout = {
  /** The activity for this Callout. The number of Contributions if the callout allows contributions, or the number of comments if it does not. */
  activity: Scalars['Float'];
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The comments for this Callout. */
  classification?: Maybe<Classification>;
  /** The comments for this Callout. */
  comments?: Maybe<Room>;
  /** The Contribution Defaults for this Callout. */
  contributionDefaults: CalloutContributionDefaults;
  /** The Contributions that have been made to this Callout. */
  contributions: Array<CalloutContribution>;
  /** The Contributions that have been made to this Callout. */
  contributionsCount: CalloutContributionsCountOutput;
  /** The user that created this Callout */
  createdBy?: Maybe<User>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The Callout Framing associated with this Callout. */
  framing: CalloutFraming;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Whether this callout is a Template or not. */
  isTemplate: Scalars['Boolean'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Posts associated with this Callout. */
  posts?: Maybe<Array<Post>>;
  /** The user that published this Callout */
  publishedBy?: Maybe<User>;
  /** The Date of the publishing of this Callout. */
  publishedDate?: Maybe<Scalars['DateTime']>;
  /** Who reacted (tier-2). Bounded: 100 most recent by last change, descending. Fetch only on demand. */
  reactions: Array<CalloutReaction>;
  /** Cheap always-shown summary (tier-1). Dataloader-batched; safe to select on feeds. */
  reactionsSummary: CalloutReactionsSummary;
  /** The Callout Settings associated with this Callout. */
  settings: CalloutSettings;
  /** The sorting order for this Callout. */
  sortOrder: Scalars['Float'];
  /** Per-column task counts for a Tasks board callout, in the board-defined column order and zero-filled; null when the callout is not a Tasks board. */
  taskColumnCounts?: Maybe<Array<TaskColumnCount>>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type CalloutContributionsArgs = {
  filter?: InputMaybe<ContributionsFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export enum CalloutAllowedActors {
  Admins = 'ADMINS',
  Members = 'MEMBERS',
  None = 'NONE',
}

export type CalloutContribution = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Classification of this Contribution, present only for a task on a Tasks board (carries the task column). */
  classification?: Maybe<Classification>;
  /** The CollaboraDocument that was contributed. */
  collaboraDocument?: Maybe<CollaboraDocument>;
  /** The user that created this Document */
  createdBy?: Maybe<User>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Link that was contributed. */
  link?: Maybe<Link>;
  /** The Memo that was contributed. */
  memo?: Maybe<Memo>;
  /** The Post that was contributed. */
  post?: Maybe<Post>;
  /** The sorting order for this Contribution. */
  sortOrder: Scalars['Float'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The Whiteboard that was contributed. */
  whiteboard?: Maybe<Whiteboard>;
};

export type CalloutContributionDefaults = {
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The default title to use for new contributions. */
  defaultDisplayName?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The default description to use for new contributions. */
  postDescription?: Maybe<Scalars['Markdown']>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** Whether this Callout has a non-empty default for Whiteboard contributions. */
  whiteboardContentAvailable: Scalars['Boolean'];
};

export enum CalloutContributionType {
  CollaboraDocument = 'COLLABORA_DOCUMENT',
  Link = 'LINK',
  Memo = 'MEMO',
  Post = 'POST',
  Whiteboard = 'WHITEBOARD',
}

export type CalloutContributionsCountOutput = {
  /** The number of contributions of type CollaboraDocument in this callout */
  collaboraDocument: Scalars['Float'];
  /** The number of contributions of type Link in this callout */
  link: Scalars['Float'];
  /** The number of contributions of type Memo in this callout */
  memo: Scalars['Float'];
  /** The number of contributions of type Post in this callout */
  post: Scalars['Float'];
  /** The number of contributions of type Whiteboard in this callout */
  whiteboard: Scalars['Float'];
};

export type CalloutContributorsMapView = {
  /** Map center latitude. Finite, within [-90, 90]. */
  latitude: Scalars['Float'];
  /** Map center longitude. Finite, within [-180, 180]. */
  longitude: Scalars['Float'];
  /** Map zoom level. Finite, within [0, 22]. */
  zoom: Scalars['Float'];
};

export type CalloutContributorsSettings = {
  /** The contributor types included in this contributor-collection callout. At least one. */
  contributorTypes: Array<ActorType>;
  /** The contributor type shown first (the segmented switch opens on it). One of contributorTypes. */
  defaultContributorType: ActorType;
  /** The default display mode (list or map). */
  defaultView: ContributorCollectionView;
  /** Admin-fixed initial map view. Absent/null ⇒ automatic framing (fit to plotted contributors; Europe fallback). */
  mapView?: Maybe<CalloutContributorsMapView>;
};

export enum CalloutDescriptionDisplayMode {
  Collapsed = 'COLLAPSED',
  Expanded = 'EXPANDED',
}

export type CalloutFraming = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Collabora document attached to this Callout Framing, if any. Present when framing.type = COLLABORA_DOCUMENT. */
  collaboraDocument?: Maybe<CollaboraDocument>;
  /** Per-type counts (users, organizations, virtual contributors) of the total eligible set for a CONTRIBUTORS framing, after type-selection and user-information visibility filtering. Zeroed for non-CONTRIBUTORS framings. */
  contributorCounts: ContributorCollectionCounts;
  /** The full authorized set of contributors of the given type for a CONTRIBUTORS framing, ordered leads/admins first then alphabetically. No server-side pagination or search: the client paginates (list) and name-searches client-side over this set. Empty for non-CONTRIBUTORS framings or deselected types. */
  contributors: Array<ContributorCollectionItem>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Link for framing the associated Callout. */
  link?: Maybe<Link>;
  /** The media gallery associated with the callout framing */
  mediaGallery?: Maybe<MediaGallery>;
  /** The Memo for framing the associated Callout. */
  memo?: Maybe<Memo>;
  /** The Poll attached to this Callout Framing, if any. Present when framing.type = POLL. */
  poll?: Maybe<Poll>;
  /** The Profile for framing the associated Callout. */
  profile: Profile;
  /** The host space's subspaces for a SPACES framing, ordered pinned-first then the space's sortOrder/displayName. Returns the existing Space type (no new item type). No server-side pagination/search: the client name-searches and paginates client-side over this set. Empty for non-SPACES framings, for a callout not attached to a space, or for a host with no subspaces. */
  subspaces: Array<Space>;
  /** The type of the Callout Framing, the additional content attached to this callout */
  type: CalloutFramingType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The Whiteboard for framing the associated Callout. */
  whiteboard?: Maybe<Whiteboard>;
};

export type CalloutFramingContributorsArgs = {
  type: ActorType;
};

export enum CalloutFramingType {
  CollaboraDocument = 'COLLABORA_DOCUMENT',
  Contributors = 'CONTRIBUTORS',
  Link = 'LINK',
  MediaGallery = 'MEDIA_GALLERY',
  Memo = 'MEMO',
  None = 'NONE',
  Poll = 'POLL',
  Spaces = 'SPACES',
  Whiteboard = 'WHITEBOARD',
}

export type CalloutPostCreated = {
  /** The identifier of the Callout on which the post was created. */
  calloutID: Scalars['String'];
  /** The identifier of the Contribution. */
  contributionID: Scalars['String'];
  /** The Post that has been created. */
  post: Post;
  /** The sorting order for this Contribution. */
  sortOrder: Scalars['Float'];
};

export type CalloutReaction = {
  /** Allow-list slug (e.g. "heart"). */
  emoji: Scalars['String'];
  /** The unique identifier. */
  id: Scalars['UUID'];
  /** When this person's reaction was made or last changed (a swap updates this). */
  updatedDate: Scalars['DateTime'];
  /** The reactor. Null only in the deletion race window; clients skip null users. */
  user?: Maybe<User>;
};

export type CalloutReactionsSummary = {
  /** The emoji slugs a user may react with on this Callout. */
  allowedEmojis: Array<Scalars['String']>;
  /** Distinct emoji slugs currently in use, in allow-list order. Never carries counts. */
  emojis: Array<Scalars['String']>;
  /** The requesting user's current reaction slug; null when none or unauthenticated. */
  myReactionEmoji?: Maybe<Scalars['String']>;
  /** Number of distinct people currently holding a reaction on this Callout. */
  total: Scalars['Int'];
};

/** The selection mode for a collection callout (Contributors or Subspaces). AUTO (default) returns the full computed set; CUSTOM restricts to the admin-curated selectedIds list. */
export enum CalloutSelectionMode {
  Auto = 'AUTO',
  Custom = 'CUSTOM',
}

export type CalloutSelectionSettings = {
  /** The selection mode: AUTO (full computed set) or CUSTOM (admin-curated subset). */
  mode: CalloutSelectionMode;
  /** The selected actor/space IDs in CUSTOM mode (0–500 entries). Ignored when mode is AUTO. */
  selectedIds: Array<Scalars['ID']>;
};

export type CalloutSettings = {
  /** Callout Contribution Settings. */
  contribution: CalloutSettingsContribution;
  /** Callout Framing Settings. */
  framing: CalloutSettingsFraming;
  /** Callout Visibility. */
  visibility: CalloutVisibility;
};

export type CalloutSettingsContribution = {
  /** The allowed contribution types for this callout. */
  allowedTypes: Array<CalloutContributionType>;
  /** Indicate who can add more contributions to the callout. */
  canAddContributions: CalloutAllowedActors;
  /** Can comment to contributions callout. */
  commentsEnabled: Scalars['Boolean'];
  /** Can add contributions to the Callout. Allowed Contribution types is going to be readOnly, so this field can be used to enable or disable the contribution temporarily instead of setting allowedTypes to None. */
  enabled: Scalars['Boolean'];
};

export type CalloutSettingsFraming = {
  /** Can comment to callout framing. */
  commentsEnabled: Scalars['Boolean'];
  /** Configuration for a contributor-collection callout. Present only when framing.type = CONTRIBUTORS. */
  contributors?: Maybe<CalloutContributorsSettings>;
  /** Manual-selection settings for collection callouts (CONTRIBUTORS or SPACES). Absent / null ⇒ AUTO (full computed set). */
  selection?: Maybe<CalloutSelectionSettings>;
};

export enum CalloutVisibility {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type CalloutsSet = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The list of Callouts for this CalloutsSet object. */
  callouts: Array<Callout>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** All the tags of the Callouts and its contributions in this CalloutsSet. Sorted by frequency, then alphabetically. */
  tags: Array<Scalars['String']>;
  /** The tagset templates on this CalloutsSet. */
  tagsetTemplates?: Maybe<Array<TagsetTemplate>>;
  /** The set of CalloutGroups in use in this CalloutsSet. */
  type: CalloutsSetType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type CalloutsSetCalloutsArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  classificationTagsets?: InputMaybe<Array<TagsetArgs>>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
  sortByActivity?: InputMaybe<Scalars['Boolean']>;
  withContributionTypes?: InputMaybe<Array<CalloutContributionType>>;
  withTags?: InputMaybe<Array<Scalars['String']>>;
};

export type CalloutsSetTagsArgs = {
  classificationTagsets?: InputMaybe<Array<TagsetArgs>>;
};

export enum CalloutsSetType {
  Collaboration = 'COLLABORATION',
  KnowledgeBase = 'KNOWLEDGE_BASE',
}

export type CastPollVoteInput = {
  /** The ID of the Poll to vote on. */
  pollID: Scalars['UUID'];
  /** The complete set of selected PollOption IDs. When updating an existing vote, the entire selection set must be provided. Count must be ≥ poll.minResponses and ≤ poll.maxResponses. All IDs must belong to the specified poll. */
  selectedOptionIDs: Array<Scalars['UUID']>;
};

export type Classification = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The default or named tagset. */
  tagset?: Maybe<Tagset>;
  /** The classification tagsets. */
  tagsets?: Maybe<Array<Tagset>>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type ClassificationTagsetArgs = {
  tagsetName: TagsetReservedName;
};

export enum ClassificationCardinality {
  MultiSelect = 'MULTI_SELECT',
  SingleSelect = 'SINGLE_SELECT',
}

/** One vocabulary group on a host entity — the spec's 'a Classification'. */
export type ClassificationEntry = {
  /** Whether one or several values may be selected. */
  cardinality: ClassificationCardinality;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** Render-only: false means 'not shown on the Space page'. NOT an access control. */
  display: Scalars['Boolean'];
  /** Per-instance display label; defaults to the source template's, overridable to resolve a conflict. */
  displayLabel: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Ids of the currently selected values. */
  selectedValueIDs: Array<Scalars['String']>;
  /** The selected values resolved against `values`, in authored order. */
  selectedValues: Array<ClassificationValue>;
  /** Render order on the host entity — order of addition, oldest first. */
  sortOrder: Scalars['Float'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The snapshot vocabulary, in authored order. Never re-sorted. */
  values: Array<ClassificationValue>;
};

/** Cardinality + value set of a Classification Template. Null unless type == CLASSIFICATION. */
export type ClassificationTemplateContent = {
  cardinality: ClassificationCardinality;
  values: Array<ClassificationValue>;
};

/** One selectable option in a classification's vocabulary. */
export type ClassificationValue = {
  /** Stable identifier — aggregation key. Copied verbatim into every snapshot; never re-derived on rename. */
  id: Scalars['String'];
  /** Human-readable, single-language label. */
  label: Scalars['String'];
};

export type CollaboraDocument = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The user that created this CollaboraDocument. */
  createdBy?: Maybe<User>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The type of the collaborative document. */
  documentType: CollaboraDocumentType;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for this CollaboraDocument. */
  profile: Profile;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export enum CollaboraDocumentType {
  Drawing = 'DRAWING',
  Pdf = 'PDF',
  Presentation = 'PRESENTATION',
  Spreadsheet = 'SPREADSHEET',
  Wordprocessing = 'WORDPROCESSING',
}

export type CollaboraEditorUrlResult = {
  /** When the access token expires, as an absolute Unix timestamp in milliseconds (the WOPI access_token_ttl passed through from the WOPI host); 0 means it does not expire. */
  accessTokenTTL: Scalars['Float'];
  /** The URL to open the document in the Collabora editor. */
  editorUrl: Scalars['String'];
};

export type Collaboration = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The calloutsSet with Callouts in use by this Space */
  calloutsSet: CalloutsSet;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The InnovationFlow for the Collaboration. */
  innovationFlow: InnovationFlow;
  /** Whether this Collaboration is a Template or not. */
  isTemplate: Scalars['Boolean'];
  /** The License operating on this Collaboration. */
  license: License;
  /** The timeline with events in use by this Space */
  timeline: Timeline;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type CollaborationMigrationIssue = {
  id: Scalars['String'];
  reason: Scalars['String'];
};

export type CollaborationMigrationResult = {
  failed: Scalars['Int'];
  failedDocuments: Array<CollaborationMigrationIssue>;
  flagged: Scalars['Int'];
  flaggedDocuments: Array<CollaborationMigrationIssue>;
  migrated: Scalars['Int'];
  total: Scalars['Int'];
  /** Legacy Whiteboard contribution defaults without a complete owning Callout path. */
  unattached: Scalars['Int'];
};

export type Communication = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The updates on this Communication. */
  updates: Room;
};

export type CommunicationAdminEnsureAccessInput = {
  communityID: Scalars['UUID'];
};

export type CommunicationAdminMembershipInput = {
  communityID: Scalars['UUID'];
};

export type CommunicationAdminMembershipResult = {
  /** Display name of the result */
  displayName: Scalars['String'];
  /** A unique identifier for this comunication room membership result. */
  id: Scalars['String'];
  /** Rooms in this Communication */
  rooms: Array<CommunicationAdminRoomMembershipResult>;
};

export type CommunicationAdminMigrateRoomsResult = {
  /** Errors encountered during migration */
  errors: Array<Scalars['String']>;
  /** Number of conversations that failed to have rooms created */
  failed: Scalars['Int'];
  /** Number of conversations that had rooms created */
  migrated: Scalars['Int'];
};

export type CommunicationAdminOrphanedUsageResult = {
  /** Rooms in the Communication platform that are not used */
  rooms: Array<CommunicationAdminRoomResult>;
};

export type CommunicationAdminRemoveOrphanedRoomInput = {
  roomID: Scalars['String'];
};

export type CommunicationAdminRoomMembershipResult = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** Members of the room that are not members of the Community. */
  extraMembers: Array<Scalars['String']>;
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** The access mode for the room. */
  joinRule: Scalars['String'];
  /** Name of the room */
  members: Array<Scalars['String']>;
  /** Members of the community that are missing from the room */
  missingMembers: Array<Scalars['String']>;
  /** The matrix room ID */
  roomID: Scalars['String'];
};

export type CommunicationAdminRoomResult = {
  /** Display name of the result */
  displayName: Scalars['String'];
  /** The identifier for the orphaned room. */
  id: Scalars['String'];
  /** The members of the orphaned room */
  members: Array<Scalars['String']>;
};

export type CommunicationAdminUpdateRoomStateInput = {
  isPublic: Scalars['Boolean'];
  isWorldVisible: Scalars['Boolean'];
  roomID: Scalars['String'];
};

export type CommunicationSendMessageToCommunityLeadsInput = {
  /** The Community the message is being sent to */
  communityId: Scalars['UUID'];
  /** The message being sent */
  message: Scalars['String'];
};

export type CommunicationSendMessageToOrganizationInput = {
  /** The message being sent */
  message: Scalars['String'];
  /** The Organization the message is being sent to */
  organizationId: Scalars['UUID'];
};

export type CommunicationSendMessageToUsersInput = {
  /** The message being sent */
  message: Scalars['String'];
  /** All Users the message is being sent to */
  receiverIds: Array<Scalars['UUID']>;
};

export type Community = Groupable & {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Communications for this Community. */
  communication: Communication;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The user group with the specified id anywhere in the space */
  group: UserGroup;
  /** Groups of users related to a Community. */
  groups: Array<UserGroup>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The RoleSet for this Community. */
  roleSet: RoleSet;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type CommunityGroupArgs = {
  ID: Scalars['UUID'];
};

export type CommunityApplicationForRoleResult = {
  /** ID for the community */
  communityID: Scalars['UUID'];
  /** Date of creation */
  createdDate: Scalars['DateTime'];
  /** Display name of the community */
  displayName: Scalars['String'];
  /** ID for the application */
  id: Scalars['UUID'];
  /** ID for the ultimate containing Space */
  spaceID: Scalars['UUID'];
  /** Nesting level of the Space */
  spaceLevel: Scalars['Float'];
  /** The current state of the application. */
  state: Scalars['String'];
  /** Date of last update */
  updatedDate: Scalars['DateTime'];
};

export type CommunityApplicationResult = {
  /** The application itself */
  application: Application;
  /** ID for the pending membership */
  id: Scalars['UUID'];
  /** The key information for the Space that the application/invitation is for */
  spacePendingMembershipInfo: SpacePendingMembershipInfo;
};

export type CommunityGuidelines = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The details of the guidelines */
  profile: Profile;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type CommunityInvitationForRoleResult = {
  /** ID for Actor that is being invited to a community */
  actorID: Scalars['UUID'];
  /** ID for the community */
  communityID: Scalars['UUID'];
  /** ID for the user that created the invitation. */
  createdBy: Scalars['UUID'];
  /** Date of creation */
  createdDate: Scalars['DateTime'];
  /** Display name of the community */
  displayName: Scalars['String'];
  /** ID for the Invitation */
  id: Scalars['UUID'];
  /** ID for the ultimate containing Space */
  spaceID: Scalars['UUID'];
  /** Nesting level of the Space */
  spaceLevel: Scalars['Float'];
  /** The current state of the invitation. */
  state: Scalars['String'];
  /** Date of last update */
  updatedDate: Scalars['DateTime'];
  /** The welcome message of the invitation */
  welcomeMessage?: Maybe<Scalars['UUID']>;
};

export type CommunityInvitationResult = {
  /** ID for the pending membership */
  id: Scalars['UUID'];
  /** The invitation itself */
  invitation: Invitation;
  /** The key information for the Space that the application/invitation is for */
  spacePendingMembershipInfo: SpacePendingMembershipInfo;
};

export enum CommunityMembershipPolicy {
  Applications = 'APPLICATIONS',
  Invitations = 'INVITATIONS',
  Open = 'OPEN',
}

export type CommunityMembershipResult = {
  /** The child community memberships */
  childMemberships: Array<CommunityMembershipResult>;
  /** ID for the membership */
  id: Scalars['UUID'];
  /** The space for the membership is for */
  space: Space;
};

export enum CommunityMembershipStatus {
  ApplicationPending = 'APPLICATION_PENDING',
  InvitationPending = 'INVITATION_PENDING',
  Member = 'MEMBER',
  NotMember = 'NOT_MEMBER',
}

export type Config = {
  /** Elastic APM (RUM & performance monitoring) related configuration. */
  apm: Apm;
  /** Authentication configuration. */
  authentication: AuthenticationConfig;
  /** Visual constraints for the given type */
  defaultVisualTypeConstraints: VisualConstraints;
  /** The feature flags for the platform */
  featureFlags: Array<PlatformFeatureFlag>;
  /** Integration with a 3rd party Geo information service */
  geo: Geo;
  /** Language configuration: eligible set for proactive offers and the platform default. */
  language: LanguageConfig;
  /** Platform related locations. */
  locations: PlatformLocations;
  /** Sentry (client monitoring) related configuration. */
  sentry: Sentry;
  /** Configuration for storage providers, e.g. file */
  storage: StorageConfig;
};

export type ConfigDefaultVisualTypeConstraintsArgs = {
  type: VisualType;
};

export enum ContentUpdatePolicy {
  Admins = 'ADMINS',
  Contributors = 'CONTRIBUTORS',
  Owner = 'OWNER',
}

export type ContributionsFilterInput = {
  /** The IDs of the Contributions to return. If omitted return all. */
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  /** The contributions types to return. If omitted return all. */
  types?: InputMaybe<Array<CalloutContributionType>>;
};

export type ContributorCollectionCounts = {
  organizations: Scalars['Int'];
  users: Scalars['Int'];
  virtualContributors: Scalars['Int'];
};

export type ContributorCollectionItem = {
  avatarUrl?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  id: Scalars['UUID'];
  /** Location of the contributor; null for Virtual Contributors or when not readable. */
  location?: Maybe<ContributorLocation>;
  /** The role label for this contributor (lead/admin/member). */
  roleLabel?: Maybe<Scalars['String']>;
  type: ActorType;
  url?: Maybe<Scalars['String']>;
};

/** The default display mode for a contributor-collection callout framing. */
export enum ContributorCollectionView {
  List = 'LIST',
  Map = 'MAP',
}

export type ContributorFilterInput = {
  displayName?: InputMaybe<Scalars['String']>;
  nameID?: InputMaybe<Scalars['String']>;
};

export type ContributorLocation = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** Whether the location has valid stored coordinates (geoLocation.isValid). City/country alone is false. */
  hasValidCoordinates: Scalars['Boolean'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type Conversation = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** All members of this Conversation, returned as actors with their types. */
  members: Array<Actor>;
  messaging: Messaging;
  /** The room for this Conversation. */
  room: Room;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

/** Event fired when a new conversation is created. All members receive the event with the full conversation and its members list. */
export type ConversationCreatedEvent = {
  /** The conversation that was created. */
  conversation: Conversation;
  /** The first message in the conversation. Null when conversation is created without an initial message. */
  message?: Maybe<Message>;
};

/** The type of conversation to create. Maps to room type: DIRECT → DM room, GROUP → group room. */
export enum ConversationCreationType {
  Direct = 'DIRECT',
  Group = 'GROUP',
}

/** Event fired when a conversation is deleted. All members are notified. */
export type ConversationDeletedEvent = {
  /** The ID of the deleted conversation. UUID only — conversation no longer exists. */
  conversationID: Scalars['UUID'];
};

/** Payload for conversation subscription events. */
export type ConversationEventSubscriptionResult = {
  /** Present when eventType is CONVERSATION_CREATED. */
  conversationCreated?: Maybe<ConversationCreatedEvent>;
  /** Present when eventType is CONVERSATION_DELETED. */
  conversationDeleted?: Maybe<ConversationDeletedEvent>;
  /** Present when eventType is CONVERSATION_UPDATED. */
  conversationUpdated?: Maybe<ConversationUpdatedEvent>;
  /** The type of event. Use this to determine which payload field is populated. */
  eventType: ConversationEventType;
  /** Present when eventType is MEMBER_ADDED. */
  memberAdded?: Maybe<ConversationMemberAddedEvent>;
  /** Present when eventType is MEMBER_REMOVED. */
  memberRemoved?: Maybe<ConversationMemberRemovedEvent>;
  /** Present when eventType is MESSAGE_RECEIVED. */
  messageReceived?: Maybe<ConversationMessageReceivedEvent>;
  /** Present when eventType is MESSAGE_REMOVED. */
  messageRemoved?: Maybe<ConversationMessageRemovedEvent>;
  /** Present when eventType is READ_RECEIPT_UPDATED. */
  readReceiptUpdated?: Maybe<ConversationReadReceiptUpdatedEvent>;
};

/** The type of conversation event. */
export enum ConversationEventType {
  ConversationCreated = 'CONVERSATION_CREATED',
  ConversationDeleted = 'CONVERSATION_DELETED',
  ConversationUpdated = 'CONVERSATION_UPDATED',
  MemberAdded = 'MEMBER_ADDED',
  MemberRemoved = 'MEMBER_REMOVED',
  MessageReceived = 'MESSAGE_RECEIVED',
  MessageRemoved = 'MESSAGE_REMOVED',
  ReadReceiptUpdated = 'READ_RECEIPT_UPDATED',
}

/** Event fired when a member is added to a group conversation. */
export type ConversationMemberAddedEvent = {
  /** The actor that was added as a member. */
  addedMember: Actor;
  /** The conversation the member was added to. */
  conversation: Conversation;
};

/** Event fired when a member is removed from or leaves a group conversation. */
export type ConversationMemberRemovedEvent = {
  /** The conversation the member was removed from. */
  conversation: Conversation;
  /** The ID of the removed member. UUID only — removed member may not be resolvable after removal. */
  removedMemberID: Scalars['UUID'];
};

/** Event fired when a new message is received in a conversation. */
export type ConversationMessageReceivedEvent = {
  /** The message that was received. */
  message: Message;
  /** The room ID where the message was received. */
  roomId: Scalars['UUID'];
};

/** Event fired when a message is removed from a conversation. */
export type ConversationMessageRemovedEvent = {
  /** The ID of the message that was removed. */
  messageId: Scalars['MessageID'];
  /** The room ID where the message was removed. */
  roomId: Scalars['UUID'];
};

/** Event fired when a read receipt is updated in a conversation. */
export type ConversationReadReceiptUpdatedEvent = {
  /** The ID of the last read event (message). */
  lastReadEventId: Scalars['MessageID'];
  /** The room ID where the read receipt was updated. */
  roomId: Scalars['UUID'];
};

/** Event fired when a conversation is updated (displayName, avatarUrl). */
export type ConversationUpdatedEvent = {
  /** The conversation that was updated. */
  conversation: Conversation;
};

export type ConversationVcResetInput = {
  /** The ID of the Conversation to reset. */
  conversationID: Scalars['UUID'];
};

export type ConversionVcSpaceToVcKnowledgeBaseInput = {
  /** The Virtual Contributor to be converted. */
  virtualContributorID: Scalars['UUID'];
};

export type ConvertSpaceL1ToSpaceL0Input = {
  /** The Space L1 to be promoted to be a new Space L0.  */
  spaceL1ID: Scalars['UUID'];
};

export type ConvertSpaceL1ToSpaceL2Input = {
  /** The Space L1 to be the parent of the Space L1 when it is moved to be L2. */
  parentSpaceL1ID: Scalars['UUID'];
  /** The Space L1 to be moved to be a child of another Space L. Both the L1 Space and the parent Space must be in the same L0 Space. */
  spaceL1ID: Scalars['UUID'];
};

export type ConvertSpaceL2ToSpaceL1Input = {
  /** The Space L2 to be promoted.  */
  spaceL2ID: Scalars['UUID'];
};

export type CreateAiPersonaInput = {
  engine?: InputMaybe<AiPersonaEngine>;
  externalConfig?: InputMaybe<ExternalConfigInput>;
  prompt?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateCalendarEventOnCalendarInput = {
  calendarID: Scalars['UUID'];
  /** The length of the event in days. */
  durationDays?: InputMaybe<Scalars['Float']>;
  /** The length of the event in minutes. */
  durationMinutes: Scalars['Float'];
  /** Flag to indicate if this event is for multiple days. */
  multipleDays: Scalars['Boolean'];
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  /** The start date for the event. */
  startDate: Scalars['DateTime'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  type: CalendarEventType;
  /** Is the event visible on the parent calendar. */
  visibleOnParentCalendar: Scalars['Boolean'];
  /** Flag to indicate if this event is for a whole day. */
  wholeDay: Scalars['Boolean'];
};

export type CreateCalloutContributionData = {
  collaboraDocument?: Maybe<CreateCollaboraDocumentData>;
  link?: Maybe<CreateLinkData>;
  memo?: Maybe<CreateMemoData>;
  post?: Maybe<CreatePostData>;
  /** The sort order to assign to this Contribution. */
  sortOrder?: Maybe<Scalars['Float']>;
  /** The Tasks board column this task starts in. Only valid when the parent Callout is a Tasks board; defaults to the first column. */
  taskColumn?: Maybe<Scalars['String']>;
  type: CalloutContributionType;
  whiteboard?: Maybe<CreateWhiteboardData>;
};

export type CreateCalloutContributionDefaultsData = {
  /** The default title to use for new contributions. */
  defaultDisplayName?: Maybe<Scalars['String']>;
  /** Use a server-owned live Whiteboard contribution-default draft. Mutually exclusive with either source field. */
  draftWhiteboardID?: Maybe<Scalars['UUID']>;
  /** The default description to use for new Post contributions. */
  postDescription?: Maybe<Scalars['Markdown']>;
  /** Copy the internal Whiteboard contribution default from this source Callout. Mutually exclusive with sourceWhiteboardID. */
  sourceCalloutID?: Maybe<Scalars['UUID']>;
  /** Seed the default from an existing Whiteboard. The server copies its content and media into the owning Callout bucket; the source id is not persisted. */
  sourceWhiteboardID?: Maybe<Scalars['UUID']>;
};

export type CreateCalloutContributionDefaultsInput = {
  /** The default title to use for new contributions. */
  defaultDisplayName?: InputMaybe<Scalars['String']>;
  /** Use a server-owned live Whiteboard contribution-default draft. Mutually exclusive with either source field. */
  draftWhiteboardID?: InputMaybe<Scalars['UUID']>;
  /** The default description to use for new Post contributions. */
  postDescription?: InputMaybe<Scalars['Markdown']>;
  /** Copy the internal Whiteboard contribution default from this source Callout. Mutually exclusive with sourceWhiteboardID. */
  sourceCalloutID?: InputMaybe<Scalars['UUID']>;
  /** Seed the default from an existing Whiteboard. The server copies its content and media into the owning Callout bucket; the source id is not persisted. */
  sourceWhiteboardID?: InputMaybe<Scalars['UUID']>;
};

export type CreateCalloutContributionInput = {
  collaboraDocument?: InputMaybe<CreateCollaboraDocumentInput>;
  link?: InputMaybe<CreateLinkInput>;
  memo?: InputMaybe<CreateMemoInput>;
  post?: InputMaybe<CreatePostInput>;
  /** The sort order to assign to this Contribution. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** The Tasks board column this task starts in. Only valid when the parent Callout is a Tasks board; defaults to the first column. */
  taskColumn?: InputMaybe<Scalars['String']>;
  type: CalloutContributionType;
  whiteboard?: InputMaybe<CreateWhiteboardInput>;
};

export type CreateCalloutContributorsMapViewData = {
  /** Map center latitude. Finite, within [-90, 90]. MapLibre throws on values outside this range. */
  latitude: Scalars['Float'];
  /** Map center longitude. Finite, within [-180, 180]. */
  longitude: Scalars['Float'];
  /** Map zoom level. Finite, within [0, 22]. */
  zoom: Scalars['Float'];
};

export type CreateCalloutContributorsMapViewInput = {
  /** Map center latitude. Finite, within [-90, 90]. MapLibre throws on values outside this range. */
  latitude: Scalars['Float'];
  /** Map center longitude. Finite, within [-180, 180]. */
  longitude: Scalars['Float'];
  /** Map zoom level. Finite, within [0, 22]. */
  zoom: Scalars['Float'];
};

export type CreateCalloutContributorsSettingsData = {
  /** The contributor types to include. At least one type is required. */
  contributorTypes: Array<ActorType>;
  /** The default contributor type (one of contributorTypes). Defaults to the first selected type. */
  defaultContributorType?: Maybe<ActorType>;
  /** The default display mode. Defaults to LIST; MAP requires a locatable contributor type. */
  defaultView?: Maybe<ContributorCollectionView>;
  /** Admin-fixed initial map view. When omitted, the callout opens on automatic framing. */
  mapView?: Maybe<CreateCalloutContributorsMapViewData>;
};

export type CreateCalloutContributorsSettingsInput = {
  /** The contributor types to include. At least one type is required. */
  contributorTypes: Array<ActorType>;
  /** The default contributor type (one of contributorTypes). Defaults to the first selected type. */
  defaultContributorType?: InputMaybe<ActorType>;
  /** The default display mode. Defaults to LIST; MAP requires a locatable contributor type. */
  defaultView?: InputMaybe<ContributorCollectionView>;
  /** Admin-fixed initial map view. When omitted, the callout opens on automatic framing. */
  mapView?: InputMaybe<CreateCalloutContributorsMapViewInput>;
};

export type CreateCalloutData = {
  classification?: Maybe<CreateClassificationData>;
  contributionDefaults?: Maybe<CreateCalloutContributionDefaultsData>;
  /** Contributions to be created with this Callout. */
  contributions?: Maybe<Array<CreateCalloutContributionData>>;
  framing: CreateCalloutFramingData;
  /** A readable identifier, unique within the containing scope. */
  nameID?: Maybe<Scalars['NameID']>;
  /** Send notification if this flag is true and visibility is PUBLISHED. Defaults to false. */
  sendNotification?: Maybe<Scalars['Boolean']>;
  settings?: Maybe<CreateCalloutSettingsData>;
  /** The sort order to assign to this Callout. */
  sortOrder?: Maybe<Scalars['Float']>;
  /** When present, creates this Callout as a Tasks board. Requires a POST-only contribution type. */
  taskBoard?: Maybe<CreateCalloutTaskBoardData>;
};

export type CreateCalloutFramingData = {
  /** Collabora document input. Required when type = COLLABORA_DOCUMENT. */
  collaboraDocument?: Maybe<CreateCollaboraDocumentData>;
  link?: Maybe<CreateLinkData>;
  memo?: Maybe<CreateMemoData>;
  /** Poll definition to attach to this Callout Framing. Required when type = POLL. Ignored for all other framing types. */
  poll?: Maybe<CreatePollData>;
  profile: CreateProfileData;
  tags?: Maybe<Array<Scalars['String']>>;
  /** The type of additional content attached to the framing of the callout. Defaults to None. */
  type?: Maybe<CalloutFramingType>;
  whiteboard?: Maybe<CreateWhiteboardData>;
};

export type CreateCalloutFramingInput = {
  /** Collabora document input. Required when type = COLLABORA_DOCUMENT. */
  collaboraDocument?: InputMaybe<CreateCollaboraDocumentInput>;
  link?: InputMaybe<CreateLinkInput>;
  memo?: InputMaybe<CreateMemoInput>;
  /** Poll definition to attach to this Callout Framing. Required when type = POLL. Ignored for all other framing types. */
  poll?: InputMaybe<CreatePollInput>;
  profile: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
  /** The type of additional content attached to the framing of the callout. Defaults to None. */
  type?: InputMaybe<CalloutFramingType>;
  whiteboard?: InputMaybe<CreateWhiteboardInput>;
};

export type CreateCalloutInput = {
  classification?: InputMaybe<CreateClassificationInput>;
  contributionDefaults?: InputMaybe<CreateCalloutContributionDefaultsInput>;
  /** Contributions to be created with this Callout. */
  contributions?: InputMaybe<Array<CreateCalloutContributionInput>>;
  framing: CreateCalloutFramingInput;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** Send notification if this flag is true and visibility is PUBLISHED. Defaults to false. */
  sendNotification?: InputMaybe<Scalars['Boolean']>;
  settings?: InputMaybe<CreateCalloutSettingsInput>;
  /** The sort order to assign to this Callout. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** When present, creates this Callout as a Tasks board. Requires a POST-only contribution type. */
  taskBoard?: InputMaybe<CreateCalloutTaskBoardInput>;
};

export type CreateCalloutOnCalloutsSetInput = {
  calloutsSetID: Scalars['UUID'];
  classification?: InputMaybe<CreateClassificationInput>;
  contributionDefaults?: InputMaybe<CreateCalloutContributionDefaultsInput>;
  /** Contributions to be created with this Callout. */
  contributions?: InputMaybe<Array<CreateCalloutContributionInput>>;
  framing: CreateCalloutFramingInput;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** Send notification if this flag is true and visibility is PUBLISHED. Defaults to false. */
  sendNotification?: InputMaybe<Scalars['Boolean']>;
  settings?: InputMaybe<CreateCalloutSettingsInput>;
  /** The sort order to assign to this Callout. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** When present, creates this Callout as a Tasks board. Requires a POST-only contribution type. */
  taskBoard?: InputMaybe<CreateCalloutTaskBoardInput>;
};

export type CreateCalloutSelectionSettingsData = {
  /** The selection mode (AUTO or CUSTOM). Defaults to AUTO when omitted. */
  mode?: Maybe<CalloutSelectionMode>;
  /** The curated selection of actor/space IDs (CUSTOM mode). At most 500. Deduplicated by the server. */
  selectedIds?: Maybe<Array<Scalars['ID']>>;
};

export type CreateCalloutSelectionSettingsInput = {
  /** The selection mode (AUTO or CUSTOM). Defaults to AUTO when omitted. */
  mode?: InputMaybe<CalloutSelectionMode>;
  /** The curated selection of actor/space IDs (CUSTOM mode). At most 500. Deduplicated by the server. */
  selectedIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type CreateCalloutSettingsContributionData = {
  /** Allowed Contribution types. */
  allowedTypes?: Maybe<Array<CalloutContributionType>>;
  /** Indicate who can add more contributions to the callout. */
  canAddContributions?: Maybe<CalloutAllowedActors>;
  /** Can comment to contributions callout. */
  commentsEnabled?: Maybe<Scalars['Boolean']>;
  /** Can add contributions to the Callout. Allowed Contribution types is going to be readOnly, so this field can be used to enable or disable the contribution temporarily instead of setting allowedTypes to None. */
  enabled?: Maybe<Scalars['Boolean']>;
};

export type CreateCalloutSettingsContributionInput = {
  /** Allowed Contribution types. */
  allowedTypes?: InputMaybe<Array<CalloutContributionType>>;
  /** Indicate who can add more contributions to the callout. */
  canAddContributions?: InputMaybe<CalloutAllowedActors>;
  /** Can comment to contributions callout. */
  commentsEnabled?: InputMaybe<Scalars['Boolean']>;
  /** Can add contributions to the Callout. Allowed Contribution types is going to be readOnly, so this field can be used to enable or disable the contribution temporarily instead of setting allowedTypes to None. */
  enabled?: InputMaybe<Scalars['Boolean']>;
};

export type CreateCalloutSettingsData = {
  contribution?: Maybe<CreateCalloutSettingsContributionData>;
  framing?: Maybe<CreateCalloutSettingsFramingData>;
  /** Visibility of the Callout. Defaults to PUBLISHED. */
  visibility?: Maybe<CalloutVisibility>;
};

export type CreateCalloutSettingsFramingData = {
  /** Can comment to callout framing. */
  commentsEnabled?: Maybe<Scalars['Boolean']>;
  /** Configuration for a contributor-collection callout. Provide only when framing.type = CONTRIBUTORS. */
  contributors?: Maybe<CreateCalloutContributorsSettingsData>;
  /** Manual-selection settings for collection callouts (CONTRIBUTORS or SPACES). Provide only when framing.type ∈ {CONTRIBUTORS, SPACES}. */
  selection?: Maybe<CreateCalloutSelectionSettingsData>;
};

export type CreateCalloutSettingsFramingInput = {
  /** Can comment to callout framing. */
  commentsEnabled?: InputMaybe<Scalars['Boolean']>;
  /** Configuration for a contributor-collection callout. Provide only when framing.type = CONTRIBUTORS. */
  contributors?: InputMaybe<CreateCalloutContributorsSettingsInput>;
  /** Manual-selection settings for collection callouts (CONTRIBUTORS or SPACES). Provide only when framing.type ∈ {CONTRIBUTORS, SPACES}. */
  selection?: InputMaybe<CreateCalloutSelectionSettingsInput>;
};

export type CreateCalloutSettingsInput = {
  contribution?: InputMaybe<CreateCalloutSettingsContributionInput>;
  framing?: InputMaybe<CreateCalloutSettingsFramingInput>;
  /** Visibility of the Callout. Defaults to PUBLISHED. */
  visibility?: InputMaybe<CalloutVisibility>;
};

export type CreateCalloutTaskBoardData = {
  /** The ordered columns of the Tasks board. The first is the default column. Omit to seed the default set. */
  columns?: Maybe<Array<Scalars['String']>>;
};

export type CreateCalloutTaskBoardInput = {
  /** The ordered columns of the Tasks board. The first is the default column. Omit to seed the default set. */
  columns?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateCalloutsSetData = {
  /** The Callouts to add to this Collaboration. */
  calloutsData?: Maybe<Array<CreateCalloutData>>;
};

export type CreateCalloutsSetInput = {
  /** The Callouts to add to this Collaboration. */
  calloutsData?: InputMaybe<Array<CreateCalloutInput>>;
};

export type CreateClassificationData = {
  tagsets: Array<CreateTagsetData>;
};

export type CreateClassificationEntryInput = {
  cardinality: ClassificationCardinality;
  displayLabel: Scalars['String'];
  /** Optional selection to apply in the same write. Omitted -> selectedValueIDs: []. */
  selectedValueIDs?: InputMaybe<Array<Scalars['String']>>;
  /** The Space to add the Classification to. */
  spaceID: Scalars['UUID'];
  values: Array<CreateClassificationValueInput>;
};

export type CreateClassificationInput = {
  tagsets: Array<CreateTagsetInput>;
};

export type CreateClassificationTemplateContentInput = {
  cardinality: ClassificationCardinality;
  values: Array<CreateClassificationValueInput>;
};

export type CreateClassificationValueInput = {
  /** Optional explicit stable id. Omitted -> slugified from `label` once, at authoring time. */
  id?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
};

export type CreateCollaboraDocumentData = {
  /** Title for the new collaborative document. Required for blank-create. On the upload path, defaulted from the uploaded filename (extension stripped) when absent or empty. */
  displayName?: Maybe<Scalars['String']>;
  /** Type of document to create. Required for blank-create. On the upload path, ignored — the type is derived from the uploaded file's sniffed MIME by file-service-go. */
  documentType?: Maybe<CollaboraDocumentType>;
};

export type CreateCollaboraDocumentInput = {
  /** Title for the new collaborative document. Required for blank-create. On the upload path, defaulted from the uploaded filename (extension stripped) when absent or empty. */
  displayName?: InputMaybe<Scalars['String']>;
  /** Type of document to create. Required for blank-create. On the upload path, ignored — the type is derived from the uploaded file's sniffed MIME by file-service-go. */
  documentType?: InputMaybe<CollaboraDocumentType>;
};

export type CreateCollaborationData = {
  /** The CalloutsSet to use for this Collaboration. */
  calloutsSetData: CreateCalloutsSetData;
  /** The InnovationFlow Template to use for this Collaboration. */
  innovationFlowData?: Maybe<CreateInnovationFlowData>;
};

export type CreateCollaborationInput = {
  /** The CalloutsSet to use for this Collaboration. */
  calloutsSetData: CreateCalloutsSetInput;
  /** The InnovationFlow Template to use for this Collaboration. */
  innovationFlowData?: InputMaybe<CreateInnovationFlowInput>;
};

export type CreateCollaborationOnSpaceInput = {
  /** Add callouts from the template to the Collaboration; defaults to true. */
  addCallouts?: InputMaybe<Scalars['Boolean']>;
  /** Add tutorial callouts to the Collaboration; defaults to false. */
  addTutorialCallouts?: InputMaybe<Scalars['Boolean']>;
  /** The CalloutsSet to use for this Collaboration. */
  calloutsSetData: CreateCalloutsSetInput;
  /** The InnovationFlow Template to use for this Collaboration. */
  innovationFlowData?: InputMaybe<CreateInnovationFlowInput>;
};

export type CreateCommunityGuidelinesData = {
  profile: CreateProfileData;
};

export type CreateCommunityGuidelinesInput = {
  profile: CreateProfileInput;
};

export type CreateContributionOnCalloutInput = {
  calloutID: Scalars['UUID'];
  collaboraDocument?: InputMaybe<CreateCollaboraDocumentInput>;
  link?: InputMaybe<CreateLinkInput>;
  memo?: InputMaybe<CreateMemoInput>;
  post?: InputMaybe<CreatePostInput>;
  /** The sort order to assign to this Contribution. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** The Tasks board column this task starts in. Only valid when the parent Callout is a Tasks board; defaults to the first column. */
  taskColumn?: InputMaybe<Scalars['String']>;
  type: CalloutContributionType;
  whiteboard?: InputMaybe<CreateWhiteboardInput>;
};

export type CreateConversationInput = {
  /** Optional avatar URL for GROUP conversations. Ignored for DIRECT conversations. Accepts mxc:// or https:// URLs. */
  avatarUrl?: InputMaybe<Scalars['String']>;
  /** Optional display name for GROUP conversations. Ignored for DIRECT conversations (Synapse uses the other member name automatically). */
  displayName?: InputMaybe<Scalars['String']>;
  /** IDs of members to add. For DIRECT: exactly 1 ID. For GROUP: 1+ IDs, up to 100. Creator is auto-included. */
  memberIDs: Array<Scalars['UUID']>;
  /** The type of conversation to create: DIRECT for 1-on-1, GROUP for multi-party. */
  type: ConversationCreationType;
};

export type CreateInnovationFlowData = {
  profile: CreateProfileData;
  states: Array<CreateInnovationFlowStateData>;
};

export type CreateInnovationFlowInput = {
  profile: CreateProfileInput;
  states: Array<CreateInnovationFlowStateInput>;
};

export type CreateInnovationFlowStateData = {
  /** The explanation text to clarify the State. */
  description?: Maybe<Scalars['Markdown']>;
  /** The display name for the State */
  displayName: Scalars['String'];
  settings?: Maybe<CreateInnovationFlowStateSettingsData>;
  /** The sort order for the State; if not specified, it will be set to the next highest order. */
  sortOrder?: Maybe<Scalars['Float']>;
};

export type CreateInnovationFlowStateInput = {
  /** The explanation text to clarify the State. */
  description?: InputMaybe<Scalars['Markdown']>;
  /** The display name for the State */
  displayName: Scalars['String'];
  settings?: InputMaybe<CreateInnovationFlowStateSettingsInput>;
  /** The sort order for the State; if not specified, it will be set to the next highest order. */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

export type CreateInnovationFlowStateSettingsData = {
  /** The flag to set. */
  allowNewCallouts: Scalars['Boolean'];
  /** Optional. How Post descriptions in this State are displayed in the feed: expanded or collapsed. Defaults to EXPANDED when omitted. */
  descriptionDisplayMode?: Maybe<CalloutDescriptionDisplayMode>;
  /** Optional. Whether Posts in this State show publish details in the feed. Defaults to true when omitted. */
  showPublishDetails?: Maybe<Scalars['Boolean']>;
  /** Optional. Ordered sidebar widgets; defaults to [INTENT, CREATE_POST, APPLICATION_BUTTON, INDEX] when omitted. */
  sidebar?: Maybe<Array<SidebarWidget>>;
  /** Optional. Whether the phase is shown in member-facing navigation. Defaults to true when omitted. */
  visible?: Maybe<Scalars['Boolean']>;
};

export type CreateInnovationFlowStateSettingsInput = {
  /** The flag to set. */
  allowNewCallouts: Scalars['Boolean'];
  /** Optional. How Post descriptions in this State are displayed in the feed: expanded or collapsed. Defaults to EXPANDED when omitted. */
  descriptionDisplayMode?: InputMaybe<CalloutDescriptionDisplayMode>;
  /** Optional. Whether Posts in this State show publish details in the feed. Defaults to true when omitted. */
  showPublishDetails?: InputMaybe<Scalars['Boolean']>;
  /** Optional. Ordered sidebar widgets; defaults to [INTENT, CREATE_POST, APPLICATION_BUTTON, INDEX] when omitted. */
  sidebar?: InputMaybe<Array<SidebarWidget>>;
  /** Optional. Whether the phase is shown in member-facing navigation. Defaults to true when omitted. */
  visible?: InputMaybe<Scalars['Boolean']>;
};

export type CreateInnovationHubOnAccountInput = {
  /** The Account where the InnovationHub is to be created. */
  accountID: Scalars['UUID'];
  /** The Innovation Packs curated for this Innovation Hub. When omitted, the Innovation Hub is created with no Innovation Packs. */
  innovationPackListFilter?: InputMaybe<Array<Scalars['UUID']>>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  /** A list of Spaces to include in this Innovation Hub. Only valid when type 'list' is used. */
  spaceListFilter?: InputMaybe<Array<Scalars['UUID']>>;
  /** Spaces with which visibility this Innovation Hub will display. Only valid when type 'visibility' is used. */
  spaceVisibilityFilter?: InputMaybe<SpaceVisibility>;
  /** The subdomain to associate the Innovation Hub with. */
  subdomain: Scalars['String'];
  /** The type of Innovation Hub. */
  type: InnovationHubType;
  /** The Virtual Contributors curated for this Innovation Hub. When omitted, the Innovation Hub is created with no Virtual Contributors. */
  virtualContributorListFilter?: InputMaybe<Array<Scalars['UUID']>>;
};

export type CreateInnovationPackOnAccountInput = {
  /** The Account where the InnovationPack is to be created. */
  accountID: Scalars['UUID'];
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateKnowledgeBaseInput = {
  /** The CalloutsSet to use for this KnowledgeBase. */
  calloutsSetData?: InputMaybe<CreateCalloutsSetInput>;
  /** The Profile to use for this KnowledgeBase. */
  profile: CreateProfileInput;
};

export type CreateLicensePlanOnLicensingFrameworkInput = {
  /** Assign this plan to all new Organization accounts */
  assignToNewOrganizationAccounts: Scalars['Boolean'];
  /** Assign this plan to all new User accounts */
  assignToNewUserAccounts: Scalars['Boolean'];
  /** Is this plan enabled? */
  enabled: Scalars['Boolean'];
  /** Is this plan free? */
  isFree: Scalars['Boolean'];
  /** The credential to represent this plan */
  licenseCredential: LicensingCredentialBasedCredentialType;
  licensingFrameworkID: Scalars['UUID'];
  /** The name of the License Plan */
  name: Scalars['String'];
  /** The price per month of this plan. */
  pricePerMonth?: InputMaybe<Scalars['Float']>;
  /** Does this plan require contact support */
  requiresContactSupport: Scalars['Boolean'];
  /** Does this plan require a payment method? */
  requiresPaymentMethod: Scalars['Boolean'];
  /** The sorting order for this Plan. */
  sortOrder: Scalars['Float'];
  /** Is there a trial period enabled */
  trialEnabled: Scalars['Boolean'];
  /** The type of this License Plan. */
  type: LicensingCredentialBasedPlanType;
};

export type CreateLicensePolicyCredentialRuleInput = {
  credentialType: LicensingCredentialBasedCredentialType;
  grantedEntitlements: Array<LicensingGrantedEntitlementInput>;
  name: Scalars['String'];
};

export type CreateLinkData = {
  profile: CreateProfileData;
  uri?: Maybe<Scalars['String']>;
};

export type CreateLinkInput = {
  profile: CreateProfileInput;
  uri?: InputMaybe<Scalars['String']>;
};

export type CreateLocationData = {
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  stateOrProvince?: Maybe<Scalars['String']>;
};

export type CreateLocationInput = {
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  stateOrProvince?: InputMaybe<Scalars['String']>;
};

export type CreateMemoData = {
  markdown?: Maybe<Scalars['Markdown']>;
  profile?: Maybe<CreateProfileData>;
};

export type CreateMemoInput = {
  markdown?: InputMaybe<Scalars['Markdown']>;
  profile?: InputMaybe<CreateProfileInput>;
};

export type CreateNvpInput = {
  name: Scalars['String'];
  sortOrder: Scalars['Float'];
  value: Scalars['String'];
};

export type CreateOrganizationInput = {
  contactEmail?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  legalEntityName?: InputMaybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  website?: InputMaybe<Scalars['String']>;
};

export type CreatePollData = {
  /** Initial options for the poll. Minimum 2 options required. Options appear in the order provided. */
  options: Array<Scalars['String']>;
  /** Poll configuration settings (all immutable after creation). Optional; uses defaults for any unspecified settings. */
  settings?: Maybe<PollSettingsData>;
  /** Poll title. Optional. Maximum length 512 characters. Becomes an empty string if not provided. */
  title?: Maybe<Scalars['String']>;
};

export type CreatePollInput = {
  /** Initial options for the poll. Minimum 2 options required. Options appear in the order provided. */
  options: Array<Scalars['String']>;
  /** Poll configuration settings (all immutable after creation). Optional; uses defaults for any unspecified settings. */
  settings?: InputMaybe<PollSettingsInput>;
  /** Poll title. Optional. Maximum length 512 characters. Becomes an empty string if not provided. */
  title?: InputMaybe<Scalars['String']>;
};

export type CreatePostData = {
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreatePostInput = {
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateProfileData = {
  description?: Maybe<Scalars['Markdown']>;
  /** The display name for the entity. */
  displayName: Scalars['String'];
  location?: Maybe<CreateLocationData>;
  referencesData?: Maybe<Array<CreateReferenceData>>;
  /** A memorable short description for this entity. */
  tagline?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  tagsets?: Maybe<Array<CreateTagsetData>>;
  /** The visuals URLs */
  visuals?: Maybe<Array<CreateVisualOnProfileData>>;
};

export type CreateProfileInput = {
  description?: InputMaybe<Scalars['Markdown']>;
  /** The display name for the entity. */
  displayName: Scalars['String'];
  location?: InputMaybe<CreateLocationInput>;
  referencesData?: InputMaybe<Array<CreateReferenceInput>>;
  /** A memorable short description for this entity. */
  tagline?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  tagsets?: InputMaybe<Array<CreateTagsetInput>>;
  /** The visuals URLs */
  visuals?: InputMaybe<Array<CreateVisualOnProfileInput>>;
};

export type CreateReferenceData = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  uri?: Maybe<Scalars['String']>;
};

export type CreateReferenceInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  uri?: InputMaybe<Scalars['String']>;
};

export type CreateReferenceOnProfileInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  profileID: Scalars['UUID'];
  uri?: InputMaybe<Scalars['String']>;
};

export type CreateSpaceAboutInput = {
  /** The CommunityGuidelines for the Space */
  guidelines?: InputMaybe<CreateCommunityGuidelinesInput>;
  profileData: CreateProfileInput;
  who?: InputMaybe<Scalars['Markdown']>;
  why?: InputMaybe<Scalars['Markdown']>;
};

export type CreateSpaceOnAccountInput = {
  about: CreateSpaceAboutInput;
  /** The Account where the Space is to be created. */
  accountID: Scalars['UUID'];
  collaborationData: CreateCollaborationOnSpaceInput;
  /** The license plan the user wishes to use when creating the space. */
  licensePlanID?: InputMaybe<Scalars['UUID']>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  settings?: InputMaybe<CreateSpaceSettingsInput>;
  /** The Template to use for instantiating the Collaboration. */
  spaceTemplateID?: InputMaybe<Scalars['UUID']>;
};

export type CreateSpaceSettingsCollaborationInput = {
  /** Flag to control if events from Subspaces are visible on this Space calendar as well. */
  allowEventsFromSubspaces: Scalars['Boolean'];
  /** Flag to control if guest users can contribute to this Space. */
  allowGuestContributions: Scalars['Boolean'];
  /** Flag to control if members can create callouts. */
  allowMembersToCreateCallouts: Scalars['Boolean'];
  /** Flag to control if members can create subspaces. */
  allowMembersToCreateSubspaces: Scalars['Boolean'];
  /** Flag to control if members can create video calls in this Space. */
  allowMembersToVideoCall: Scalars['Boolean'];
  /** Flag to control if ability to contribute is inherited from parent Space. */
  inheritMembershipRights: Scalars['Boolean'];
};

export type CreateSpaceSettingsInput = {
  collaboration?: InputMaybe<CreateSpaceSettingsCollaborationInput>;
  /** The layout settings for this Space. */
  layout?: InputMaybe<CreateSpaceSettingsLayoutInput>;
  membership?: InputMaybe<CreateSpaceSettingsMembershipInput>;
  privacy?: InputMaybe<CreateSpaceSettingsPrivacyInput>;
  /** The sort mode for subspaces: Alphabetical or Custom. */
  sortMode?: InputMaybe<SpaceSortMode>;
};

export type CreateSpaceSettingsLayoutInput = {
  /** The default display mode for callout descriptions. */
  calloutDescriptionDisplayMode: CalloutDescriptionDisplayMode;
};

export type CreateSpaceSettingsMembershipInput = {
  /** Flag to control if Subspace admins can invite for this Space. */
  allowSubspaceAdminsToInviteMembers: Scalars['Boolean'];
  /** The membership policy in usage for this Space */
  policy: CommunityMembershipPolicy;
  /** The organizations that are trusted to Join as members for this Space */
  trustedOrganizations: Array<Scalars['UUID']>;
};

export type CreateSpaceSettingsPrivacyInput = {
  /** Flag to control if Platform Support has admin rights. */
  allowPlatformSupportAsAdmin?: InputMaybe<Scalars['Boolean']>;
  mode?: InputMaybe<SpacePrivacyMode>;
  /** Controls who may read member-user information. Follows space visibility by default, or restricts it to members only. */
  userInformationVisibility?: InputMaybe<UserInformationVisibility>;
};

export type CreateStateOnInnovationFlowInput = {
  /** The explanation text to clarify the State. */
  description?: InputMaybe<Scalars['Markdown']>;
  /** The display name for the State */
  displayName: Scalars['String'];
  innovationFlowID: Scalars['UUID'];
  settings?: InputMaybe<CreateInnovationFlowStateSettingsInput>;
  /** The sort order for the State; if not specified, it will be set to the next highest order. */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

export type CreateSubspaceInput = {
  about: CreateSpaceAboutInput;
  collaborationData: CreateCollaborationOnSpaceInput;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  settings?: InputMaybe<CreateSpaceSettingsInput>;
  spaceID: Scalars['UUID'];
  /** The Template to use for instantiating the Collaboration. */
  spaceTemplateID?: InputMaybe<Scalars['UUID']>;
};

export type CreateTagsetData = {
  name: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  type?: Maybe<TagsetType>;
};

export type CreateTagsetInput = {
  name: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<TagsetType>;
};

export type CreateTagsetOnProfileInput = {
  name: Scalars['String'];
  profileID?: InputMaybe<Scalars['UUID']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<TagsetType>;
};

export type CreateTaskColumnOnCalloutInput = {
  /** The Tasks board Callout to add a column to. */
  calloutID: Scalars['UUID'];
  /** The name of the new column. Appended after the last column. */
  name: Scalars['String'];
};

export type CreateTemplateContentSpaceInput = {
  about: CreateSpaceAboutInput;
  collaborationData: CreateCollaborationInput;
  level: SpaceLevel;
  /** Create the settings for the Space. */
  settings: CreateSpaceSettingsInput;
  subspaces?: InputMaybe<Array<CreateTemplateContentSpaceInput>>;
};

export type CreateTemplateFromContentSpaceOnTemplatesSetInput = {
  /** The ID of the ContentSpace to use as for the Template. */
  contentSpaceID: Scalars['UUID'];
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
  templatesSetID: Scalars['UUID'];
};

export type CreateTemplateFromSpaceOnTemplatesSetInput = {
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  /** Whether to reproduce the hierarchy or just the space. */
  recursive?: InputMaybe<Scalars['Boolean']>;
  /** The ID of the Space to use as the content for the Template. */
  spaceID: Scalars['UUID'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  templatesSetID: Scalars['UUID'];
};

export type CreateTemplateOnTemplatesSetInput = {
  /** The Callout to associate with this template. */
  calloutData?: InputMaybe<CreateCalloutInput>;
  /** The cardinality and value set for a Classification Template. */
  classificationData?: InputMaybe<CreateClassificationTemplateContentInput>;
  /** The Community guidelines to associate with this template. */
  communityGuidelinesData?: InputMaybe<CreateCommunityGuidelinesInput>;
  /** The Template Content for a Space to associate with this template. */
  contentSpaceData?: InputMaybe<CreateTemplateContentSpaceInput>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** Post Template: The default description to be pre-filled. */
  postDefaultDescription?: InputMaybe<Scalars['Markdown']>;
  profileData: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
  templatesSetID: Scalars['UUID'];
  /** The type of the Template to be created. */
  type: TemplateType;
  /** The Whiteboard to associate with this template. */
  whiteboard?: InputMaybe<CreateWhiteboardInput>;
};

export type CreateUserGroupInput = {
  parentID: Scalars['UUID'];
  profile: CreateProfileInput;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  phone?: InputMaybe<Scalars['String']>;
  profileData: CreateProfileInput;
};

export type CreateVirtualContributorOnAccountInput = {
  /** The Account where the VirtualContributor is to be created. */
  accountID: Scalars['UUID'];
  /** The AI Persona to use for this Virtual Contributor. */
  aiPersona: CreateAiPersonaInput;
  /** Description of the body of knowledge for this VC. */
  bodyOfKnowledgeDescription?: InputMaybe<Scalars['String']>;
  /** The ID of the body of knowledge (if any) to use. */
  bodyOfKnowledgeID?: InputMaybe<Scalars['String']>;
  bodyOfKnowledgeType?: InputMaybe<VirtualContributorBodyOfKnowledgeType>;
  dataAccessMode?: InputMaybe<VirtualContributorDataAccessMode>;
  interactionModes?: InputMaybe<Array<VirtualContributorInteractionMode>>;
  /** The KnowledgeBase to use for this Collaboration. */
  knowledgeBaseData?: InputMaybe<CreateKnowledgeBaseInput>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
};

export type CreateVisualOnProfileData = {
  /** The type of visual. */
  name: VisualType;
  /** The URI of the image. Needs to be a url inside Alkemio already uploaded to a StorageBucket. It will be then copied to the Profile holding this Visual. */
  uri: Scalars['String'];
};

export type CreateVisualOnProfileInput = {
  /** The type of visual. */
  name: VisualType;
  /** The URI of the image. Needs to be a url inside Alkemio already uploaded to a StorageBucket. It will be then copied to the Profile holding this Visual. */
  uri: Scalars['String'];
};

export type CreateWhiteboardData = {
  /** Use a server-owned live Whiteboard draft as the trusted source for final materialization. Mutually exclusive with sourceWhiteboardID. */
  draftWhiteboardID?: Maybe<Scalars['UUID']>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: Maybe<Scalars['NameID']>;
  /** The preview settings for the whiteboard. */
  previewSettings?: Maybe<CreateWhiteboardPreviewSettingsData>;
  profile?: Maybe<CreateProfileData>;
  /** Seed the new Whiteboard from the stored content of an existing Whiteboard through a server-side authorized copy. Omission creates an empty Whiteboard. */
  sourceWhiteboardID?: Maybe<Scalars['UUID']>;
};

export type CreateWhiteboardDraftOnCalloutsSetInput = {
  calloutsSetID: Scalars['UUID'];
  sourceCalloutID?: InputMaybe<Scalars['UUID']>;
  sourceWhiteboardID?: InputMaybe<Scalars['UUID']>;
};

export type CreateWhiteboardDraftOnTemplatesSetInput = {
  sourceCalloutID?: InputMaybe<Scalars['UUID']>;
  sourceWhiteboardID?: InputMaybe<Scalars['UUID']>;
  templatesSetID: Scalars['UUID'];
};

export type CreateWhiteboardInput = {
  /** Use a server-owned live Whiteboard draft as the trusted source for final materialization. Mutually exclusive with sourceWhiteboardID. */
  draftWhiteboardID?: InputMaybe<Scalars['UUID']>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The preview settings for the whiteboard. */
  previewSettings?: InputMaybe<CreateWhiteboardPreviewSettingsInput>;
  profile?: InputMaybe<CreateProfileInput>;
  /** Seed the new Whiteboard from the stored content of an existing Whiteboard through a server-side authorized copy. Omission creates an empty Whiteboard. */
  sourceWhiteboardID?: InputMaybe<Scalars['UUID']>;
};

export type CreateWhiteboardPreviewSettingsData = {
  /** The coordinates for the preview. */
  coordinates?: Maybe<WhiteboardPreviewCoordinatesData>;
  /**
   * The preview mode.
   *       AUTO: Generate Whiteboard preview automatically when closing the dialog
   *       CUSTOM: Generate Whiteboard preview based on user-defined coordinates when closing the dialog
   *       FIXED: Use a fixed Whiteboard preview that does not change when closing the dialog
   *
   */
  mode?: Maybe<WhiteboardPreviewMode>;
};

export type CreateWhiteboardPreviewSettingsInput = {
  /** The coordinates for the preview. */
  coordinates?: InputMaybe<WhiteboardPreviewCoordinatesInput>;
  /**
   * The preview mode.
   *       AUTO: Generate Whiteboard preview automatically when closing the dialog
   *       CUSTOM: Generate Whiteboard preview based on user-defined coordinates when closing the dialog
   *       FIXED: Use a fixed Whiteboard preview that does not change when closing the dialog
   *
   */
  mode?: InputMaybe<WhiteboardPreviewMode>;
};

export type Credential = {
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The timestamp for the expiry of this credential. */
  expires?: Maybe<Scalars['Float']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The User issuing the credential */
  issuer?: Maybe<Scalars['UUID']>;
  resourceID: Scalars['String'];
  type: CredentialType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type CredentialDefinition = {
  /** The resourceID for this CredentialDefinition */
  resourceID: Scalars['String'];
  /** The type for this CredentialDefinition */
  type: Scalars['String'];
};

export enum CredentialType {
  AccountAdmin = 'ACCOUNT_ADMIN',
  AccountLicensePlus = 'ACCOUNT_LICENSE_PLUS',
  AssistantAccess = 'ASSISTANT_ACCESS',
  BetaTester = 'BETA_TESTER',
  GlobalAdmin = 'GLOBAL_ADMIN',
  GlobalAnonymous = 'GLOBAL_ANONYMOUS',
  GlobalCommunityRead = 'GLOBAL_COMMUNITY_READ',
  GlobalGuest = 'GLOBAL_GUEST',
  GlobalLicenseManager = 'GLOBAL_LICENSE_MANAGER',
  GlobalPlatformManager = 'GLOBAL_PLATFORM_MANAGER',
  GlobalRegistered = 'GLOBAL_REGISTERED',
  GlobalSpacesReader = 'GLOBAL_SPACES_READER',
  GlobalSupport = 'GLOBAL_SUPPORT',
  GlobalSupportManager = 'GLOBAL_SUPPORT_MANAGER',
  OrganizationAdmin = 'ORGANIZATION_ADMIN',
  OrganizationAssociate = 'ORGANIZATION_ASSOCIATE',
  OrganizationOwner = 'ORGANIZATION_OWNER',
  PlatformOperationsAdmin = 'PLATFORM_OPERATIONS_ADMIN',
  SpaceAdmin = 'SPACE_ADMIN',
  SpaceFeatureMemoMultiUser = 'SPACE_FEATURE_MEMO_MULTI_USER',
  SpaceFeatureOfficeDocuments = 'SPACE_FEATURE_OFFICE_DOCUMENTS',
  SpaceFeatureSaveAsTemplate = 'SPACE_FEATURE_SAVE_AS_TEMPLATE',
  SpaceFeatureVirtualContributors = 'SPACE_FEATURE_VIRTUAL_CONTRIBUTORS',
  SpaceFeatureWhiteboardMultiUser = 'SPACE_FEATURE_WHITEBOARD_MULTI_USER',
  SpaceLead = 'SPACE_LEAD',
  SpaceLicenseEnterprise = 'SPACE_LICENSE_ENTERPRISE',
  SpaceLicenseFree = 'SPACE_LICENSE_FREE',
  SpaceLicensePlus = 'SPACE_LICENSE_PLUS',
  SpaceLicensePremium = 'SPACE_LICENSE_PREMIUM',
  SpaceMember = 'SPACE_MEMBER',
  SpaceMemberInvitee = 'SPACE_MEMBER_INVITEE',
  SpaceSubspaceAdmin = 'SPACE_SUBSPACE_ADMIN',
  UserGroupMember = 'USER_GROUP_MEMBER',
  UserSelfManagement = 'USER_SELF_MANAGEMENT',
  VcCampaign = 'VC_CAMPAIGN',
}

export type DeleteAiPersonaInput = {
  ID: Scalars['UUID'];
};

export type DeleteApplicationInput = {
  ID: Scalars['UUID'];
};

export type DeleteCalendarEventInput = {
  ID: Scalars['UUID'];
};

export type DeleteCalloutInput = {
  ID: Scalars['UUID'];
};

export type DeleteClassificationEntryInput = {
  ID: Scalars['UUID'];
};

export type DeleteCollaboraDocumentInput = {
  /** The ID of the CollaboraDocument to delete. */
  ID: Scalars['UUID'];
};

export type DeleteContributionInput = {
  ID: Scalars['UUID'];
};

export type DeleteConversationInput = {
  ID: Scalars['UUID'];
};

export type DeleteDiscussionInput = {
  ID: Scalars['UUID'];
};

export type DeleteDocumentInput = {
  ID: Scalars['UUID'];
};

export type DeleteInnovationHubInput = {
  ID: Scalars['UUID'];
};

export type DeleteInnovationPackInput = {
  ID: Scalars['UUID'];
};

export type DeleteInvitationInput = {
  ID: Scalars['UUID'];
};

export type DeleteLicensePlanInput = {
  ID: Scalars['UUID'];
};

export type DeleteLicensePolicyCredentialRuleInput = {
  ID: Scalars['UUID'];
};

export type DeleteLinkInput = {
  ID: Scalars['UUID'];
};

export type DeleteMemoInput = {
  ID: Scalars['UUID'];
};

export type DeleteOrganizationInput = {
  ID: Scalars['UUID'];
};

export type DeletePlatformInvitationInput = {
  ID: Scalars['UUID'];
};

export type DeletePostInput = {
  ID: Scalars['UUID'];
};

export type DeleteReferenceInput = {
  ID: Scalars['UUID'];
};

export type DeleteSpaceInput = {
  ID: Scalars['UUID'];
};

export type DeleteStateOnInnovationFlowInput = {
  ID: Scalars['UUID'];
  innovationFlowID: Scalars['UUID'];
};

export type DeleteStorageBuckeetInput = {
  ID: Scalars['UUID'];
};

export type DeleteTaskColumnOnCalloutInput = {
  /** The Tasks board Callout to remove a column from. */
  calloutID: Scalars['UUID'];
  /** The column to remove. Matched case-insensitively. The first (default) column cannot be removed; removing any other column reflows its tasks onto the first column. */
  name: Scalars['String'];
};

export type DeleteTemplateInput = {
  ID: Scalars['UUID'];
};

export type DeleteUserGroupInput = {
  ID: Scalars['UUID'];
};

export type DeleteUserInput = {
  ID: Scalars['UUID'];
  deleteIdentity?: InputMaybe<Scalars['Boolean']>;
};

export type DeleteVirtualContributorInput = {
  ID: Scalars['UUID'];
};

export type DeleteVisualFromMediaGalleryInput = {
  /** The ID of the media gallery. */
  mediaGalleryID: Scalars['String'];
  /** The ID of the visual to delete. */
  visualID: Scalars['String'];
};

export type DeleteWhiteboardInput = {
  ID: Scalars['UUID'];
};

export type DirectMessageDeliveryResult = {
  /** Set when status = SENT — the (existing or newly created) 1:1 conversation the message was delivered to. */
  conversationID?: Maybe<Scalars['UUID']>;
  /** The intended recipient. */
  receiverID: Scalars['UUID'];
  /** The per-recipient delivery outcome. */
  status: DirectMessageDeliveryStatus;
};

/** Per-recipient outcome of sendDirectMessageToUsers. SENT: delivered (a conversation id is returned). BLOCKED_NO_CONSENT: the recipient disabled direct messages. FAILED: an unexpected per-recipient error (other recipients are still processed). */
export enum DirectMessageDeliveryStatus {
  BlockedNoConsent = 'BLOCKED_NO_CONSENT',
  Failed = 'FAILED',
  Sent = 'SENT',
}

export type Discussion = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The category assigned to this Discussion. */
  category: ForumDiscussionCategory;
  /** The comments for this Discussion. */
  comments: Room;
  /** The id of the user that created this discussion */
  createdBy?: Maybe<Scalars['UUID']>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** Privacy mode for the Discussion. Note: this is not yet implemented in the authorization policy. */
  privacy: ForumDiscussionPrivacy;
  /** The Profile for this Discussion. */
  profile: Profile;
  /** The timestamp for the creation of this Discussion. */
  timestamp?: Maybe<Scalars['Float']>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type DiscussionDetails = {
  /** The discussion category. */
  category?: Maybe<Scalars['String']>;
  /** The discussion content. */
  description?: Maybe<Scalars['String']>;
  /** The discussion display name. */
  displayName: Scalars['String'];
  /** The discussion ID. */
  id: Scalars['String'];
  /** The discussion URL. */
  url: Scalars['String'];
};

export type DiscussionsInput = {
  /** The number of Discussion entries to return; if omitted return all Discussions. */
  limit?: InputMaybe<Scalars['Float']>;
  /** The sort order of the Discussions to return. */
  orderBy?: InputMaybe<DiscussionsOrderBy>;
};

export enum DiscussionsOrderBy {
  DiscussionsCreatedateAsc = 'DISCUSSIONS_CREATEDATE_ASC',
  DiscussionsCreatedateDesc = 'DISCUSSIONS_CREATEDATE_DESC',
}

export type Document = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The user that created this Document */
  createdBy?: Maybe<User>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Mime type for this Document. */
  mimeType: MimeType;
  /** Size of the Document. */
  size: Scalars['Float'];
  /** The tagset in use on this Document. */
  tagset: Tagset;
  /** Whether this Document is in its end location or not. */
  temporaryLocation: Scalars['Boolean'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The uploaded date of this Document */
  uploadedDate: Scalars['DateTime'];
  /** The URL to be used to retrieve the Document */
  url: Scalars['String'];
};

/** Who authorized an email change within the subject user’s organization. */
export type EmailChangeApprover = {
  /** Name of the person who authorized the change. */
  name: Scalars['String'];
  /** The organization within which the change was authorized. */
  organization?: Maybe<Scalars['String']>;
  /** The approver's role or title within the organization. */
  role: Scalars['String'];
};

export type EmailChangeApproverInput = {
  /** Name of the person who authorized the change. */
  name: Scalars['String'];
  /** The organization within which the change was authorized, if applicable. */
  organization?: InputMaybe<Scalars['String']>;
  /** The approver's role or title within the organization (e.g. 'Organization Administrator'). */
  role: Scalars['String'];
};

export type ExploreSpacesInput = {
  /** Take into account only the activity in the past X days. */
  daysOld?: InputMaybe<Scalars['Float']>;
  /** Amount of Spaces returned. */
  limit?: InputMaybe<Scalars['Float']>;
};

export type ExternalConfig = {
  /** The API key for the external LLM provider. */
  apiKey?: Maybe<Scalars['String']>;
  /** The assistant ID backing the service in OpenAI`s assistant API */
  assistantId?: Maybe<Scalars['String']>;
  /** The OpenAI model to use for the service */
  model: OpenAiModel;
};

export type ExternalConfigInput = {
  /** The API key for the external LLM provider. */
  apiKey?: InputMaybe<Scalars['String']>;
  /** The assistant ID backing the service in OpenAI`s assistant API */
  assistantId?: InputMaybe<Scalars['String']>;
  /** The OpenAI model to use for the service */
  model?: OpenAiModel;
};

export type FileStorageConfig = {
  /** Max file size, in bytes. */
  maxFileSize: Scalars['Float'];
};

export type Form = {
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** A description of the purpose of this Form. */
  description?: Maybe<Scalars['Markdown']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The set of Questions in this Form. */
  questions: Array<FormQuestion>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type FormQuestion = {
  /** The explation text to clarify the question. */
  explanation: Scalars['String'];
  /** The maxiumum length of the answer, in characters, up to a limit of 512. */
  maxLength: Scalars['Float'];
  /** The question to be answered */
  question: Scalars['String'];
  /** Whether this Question requires an answer or not. */
  required: Scalars['Boolean'];
  /** The sort order of this question in a wider set of questions. */
  sortOrder: Scalars['Float'];
};

export type Forum = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** A particular Discussions active in this Forum. */
  discussion?: Maybe<Discussion>;
  discussionCategories: Array<ForumDiscussionCategory>;
  /** The Discussions active in this Forum. */
  discussions?: Maybe<Array<Discussion>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Capped list of Contributors (Users, Virtual Contributors, …) that may be @mentioned in the platform Forum. The Forum is platform-wide, so all platform Contributors of the requested types are returned. Use `filter` for typeahead search and `types` to restrict which Contributor kinds are returned. */
  mentionableContributors: Array<ActorFull>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type ForumDiscussionArgs = {
  ID: Scalars['UUID'];
};

export type ForumDiscussionsArgs = {
  queryData?: InputMaybe<DiscussionsInput>;
};

export type ForumMentionableContributorsArgs = {
  filter?: InputMaybe<ContributorFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  types?: InputMaybe<Array<ActorType>>;
};

export type ForumCreateDiscussionInput = {
  /** The category for the Discussion */
  category: ForumDiscussionCategory;
  /** The identifier for the Forum entity the Discussion is being created on. */
  forumID: Scalars['UUID'];
  profile: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export enum ForumDiscussionCategory {
  ChallengeCentric = 'CHALLENGE_CENTRIC',
  CommunityBuilding = 'COMMUNITY_BUILDING',
  Help = 'HELP',
  Other = 'OTHER',
  PlatformFunctionalities = 'PLATFORM_FUNCTIONALITIES',
  Releases = 'RELEASES',
}

export enum ForumDiscussionPrivacy {
  Authenticated = 'AUTHENTICATED',
  Author = 'AUTHOR',
  Public = 'PUBLIC',
}

export type Geo = {
  /** Is the geo functionality enabled. */
  enabled: Scalars['Boolean'];
  /** Endpoint where geo information is consumed from. */
  endpoint: Scalars['String'];
};

export type GeoLocation = {
  /** The Latitude for this Location, derived from (City, Country) if those are set. */
  latitude?: Maybe<Scalars['Float']>;
  /** The Longitude for this Location, derived from (City, Country) if those are set. */
  longitude?: Maybe<Scalars['Float']>;
};

export type GrantAssistantActorCapabilitiesInput = {
  /** Per-capability enable/disable toggles governing what the assistant may do system-invoked (default read-only). */
  enabledCapabilities: Array<AssistantCapabilityToggleInput>;
  /** The VirtualAssistant actor whose admin grant is being set. */
  virtualAssistantID: Scalars['UUID'];
};

export type GrantAuthorizationCredentialInput = {
  /** The resource to which this credential is tied. */
  resourceID?: InputMaybe<Scalars['UUID']>;
  type: AuthorizationCredential;
  /** The user to whom the credential is being granted. */
  userID: Scalars['UUID'];
};

export type GrantOrganizationAuthorizationCredentialInput = {
  /** The Organization to whom the credential is being granted. */
  organizationID: Scalars['UUID'];
  /** The resource to which this credential is tied. */
  resourceID?: InputMaybe<Scalars['UUID']>;
  type: AuthorizationCredential;
};

export type Groupable = {
  /** The groups contained by this entity. */
  groups?: Maybe<Array<UserGroup>>;
};

export type ISearchCategoryResult = {
  /** Provide this with your next search query to fetch the next set of results. */
  cursor?: Maybe<Scalars['SearchCursor']>;
  /** The ranked search results for this category, sorted by relevance */
  results: Array<SearchResult>;
  /** The total number of search results. Not implemented yet. */
  total: Scalars['Float'];
};

export type ISearchResults = {
  /** The search results for actors (Users, Organizations). */
  actorResults: ISearchCategoryResult;
  /** The search results for Callouts. */
  calloutResults: ISearchCategoryResult;
  /** The search results for contributions (Posts, Whiteboards, Memos). */
  contributionResults: ISearchCategoryResult;
  /** The search results callout framings (Whiteboards, Memos as additional content). */
  framingResults: ISearchCategoryResult;
  /** The search results for Spaces / Subspaces. */
  spaceResults: ISearchCategoryResult;
};

/** Filter for identity verification status */
export enum IdentityVerificationStatusFilter {
  All = 'ALL',
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED',
}

export type ImportCollaboraDocumentInput = {
  /** The ID of the Callout to attach the imported document to as a new contribution. */
  calloutID: Scalars['UUID'];
  /** Optional title override. If absent, derived from the uploaded filename (extension stripped). */
  displayName?: InputMaybe<Scalars['String']>;
  /** Optional sortOrder for the new contribution. Defaults to one less than the current minimum (new contribution appears first). */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

export type InAppNotification = {
  /** The category of the notification event. */
  category: NotificationEventCategory;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The payload of the notification. */
  payload: InAppNotificationPayload;
  /** The receiver of the notification. */
  receiver: Actor;
  /** The state of the notification event. */
  state: NotificationEventInAppState;
  /** The triggered date of the notification event. */
  triggeredAt: Scalars['DateTime'];
  /** The Actor who triggered the notification. */
  triggeredBy?: Maybe<Actor>;
  /** The type of the notification event. */
  type: NotificationEvent;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

/** An in-app notification payload. To not be queried directly */
export type InAppNotificationPayload = {
  /** The payload type. */
  type: NotificationEventPayload;
};

export type InAppNotificationPayloadOrganizationMessageDirect =
  InAppNotificationPayload & {
    /** The message content. */
    message: Scalars['String'];
    /** The organization. */
    organization?: Maybe<Organization>;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadOrganizationMessageRoom =
  InAppNotificationPayload & {
    /** The comment that mentioned the organization. */
    comment?: Maybe<Scalars['String']>;
    /** The organization. */
    organization: Organization;
    /** The Room ID with of the comment. */
    roomID?: Maybe<Scalars['String']>;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadPlatformForumDiscussion =
  InAppNotificationPayload & {
    /** The comment message. */
    comment?: Maybe<Scalars['String']>;
    /** The discussion details. */
    discussion: DiscussionDetails;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadPlatformGlobalRoleChange =
  InAppNotificationPayload & {
    /** The new role. */
    role: Scalars['String'];
    /** The payload type. */
    type: NotificationEventPayload;
    /** The User whose role was changed. */
    user?: Maybe<User>;
  };

export type InAppNotificationPayloadPlatformUser = InAppNotificationPayload & {
  /** The payload type. */
  type: NotificationEventPayload;
};

export type InAppNotificationPayloadPlatformUserMessageRoom =
  InAppNotificationPayload & {
    /** The details of the message. */
    messageDetails?: Maybe<MessageDetails>;
    /** The payload type. */
    type: NotificationEventPayload;
    /** The User receiver of the message. */
    user: User;
  };

export type InAppNotificationPayloadPlatformUserProfileRemoved =
  InAppNotificationPayload & {
    /** The payload type. */
    type: NotificationEventPayload;
    /** The display name of the User that was removed. */
    userDisplayName: Scalars['String'];
    /** The email of the User that was removed. */
    userEmail: Scalars['String'];
  };

export type InAppNotificationPayloadSpace = InAppNotificationPayload & {
  /** The space details. */
  space: Space;
  /** The payload type. */
  type: NotificationEventPayload;
};

export type InAppNotificationPayloadSpaceCollaborationCallout =
  InAppNotificationPayload & {
    /** The Callout that was published. */
    callout: Callout;
    /** Where the callout is located. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadSpaceCollaborationCalloutComment =
  InAppNotificationPayload & {
    /** The Callout that was published. */
    callout: Callout;
    /** The details of the message. */
    messageDetails?: Maybe<MessageDetails>;
    /** The Space where the comment was made. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadSpaceCollaborationCalloutPostComment =
  InAppNotificationPayload & {
    /** The Callout that was published. */
    callout: Callout;
    /** The details of the message. */
    messageDetails?: Maybe<MessageDetails>;
    /** The Space where the comment was made. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadSpaceCollaborationCalloutReaction =
  InAppNotificationPayload & {
    /** The Callout that was reacted to. */
    callout: Callout;
    /** The emoji slug from the platform allow-list. Clients own slug-to-glyph rendering. */
    emoji: Scalars['String'];
    /** The Space where the reaction was made. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadSpaceCollaborationPoll =
  InAppNotificationPayload & {
    /** The Callout that contains the poll. */
    callout: Callout;
    /** The Poll this notification relates to. */
    poll: Poll;
    /** The ID of the Poll this notification relates to. */
    pollID: Scalars['UUID'];
    /** Where the callout is located. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadSpaceCommunicationMessageDirect =
  InAppNotificationPayload & {
    /** The message content. */
    message: Scalars['String'];
    /** The Space where the message was sent. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadSpaceCommunicationUpdate =
  InAppNotificationPayload & {
    /** The Space where the update was sent. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
    /** The update content. */
    update: Scalars['String'];
  };

export type InAppNotificationPayloadSpaceCommunityActor =
  InAppNotificationPayload & {
    /** The Actor that joined. */
    actor: Actor;
    /** The Space that was joined. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadSpaceCommunityApplication =
  InAppNotificationPayload & {
    /** The Application that the notification is related to. */
    application: Application;
    /** The Space that the application was made to. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadSpaceCommunityCalendarEvent =
  InAppNotificationPayload & {
    /** The CalendarEvent that was created. */
    calendarEvent: CalendarEvent;
    /** The Space where the calendar event was created. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadSpaceCommunityCalendarEventComment =
  InAppNotificationPayload & {
    /** The calendar event that was commented on. */
    calendarEvent: CalendarEvent;
    /** Preview text of the comment */
    commentText: Scalars['String'];
    /** The space details. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadSpaceCommunityInvitation =
  InAppNotificationPayload & {
    /** The Space that the invitation is for. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadSpaceCommunityInvitationPlatform =
  InAppNotificationPayload & {
    /** The Space that the invitation is for. */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InAppNotificationPayloadUserMessageDirect =
  InAppNotificationPayload & {
    /** The message content. */
    message: Scalars['String'];
    /** The payload type. */
    type: NotificationEventPayload;
    /** The User that was sent the message. */
    user?: Maybe<User>;
  };

export type InAppNotificationPayloadVirtualContributor =
  InAppNotificationPayload & {
    actor: VirtualContributor;
    /** The Space related to the notification */
    space: Space;
    /** The payload type. */
    type: NotificationEventPayload;
  };

export type InnovationFlow = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The currently selected State in this Flow. */
  currentState?: Maybe<InnovationFlowState>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for this InnovationFlow. */
  profile: Profile;
  /** The settings for this InnovationFlow. */
  settings: InnovationFlowSettings;
  /** The States for this InnovationFlow. */
  states: Array<InnovationFlowState>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type InnovationFlowSettings = {
  /** The maximum number of allowed states. */
  maximumNumberOfStates: Scalars['Float'];
  /** The minimum number of allowed states */
  minimumNumberOfStates: Scalars['Float'];
};

export type InnovationFlowState = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** Default callout template applied to this flow state (nullable, optional). */
  defaultCalloutTemplate?: Maybe<Template>;
  /** The explanation text to clarify the state. */
  description?: Maybe<Scalars['Markdown']>;
  /** The display name for the State */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Settings associated with this InnovationFlowState. */
  settings: InnovationFlowStateSettings;
  /** The sorting order for this State. */
  sortOrder: Scalars['Float'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type InnovationFlowStateSettings = {
  /** Whether new callouts can be added to this State. */
  allowNewCallouts: Scalars['Boolean'];
  /** How Post descriptions in this State are displayed in the feed: expanded or collapsed. Default expanded. */
  descriptionDisplayMode: CalloutDescriptionDisplayMode;
  /** Whether Posts in this State show publish details (publisher, publish date, avatar) in the feed. Presentation only — does not restrict access to publisher data. Default true. */
  showPublishDetails: Scalars['Boolean'];
  /** Ordered widgets shown in the Space sidepanel for this State. May be empty. */
  sidebar: Array<SidebarWidget>;
  /** Whether this State/phase is shown in the member-facing navigation. Default true. UI-affordance only: it does NOT gate access to the phase content. */
  visible: Scalars['Boolean'];
};

export type InnovationHub = {
  /** The Innovation Hub account. */
  account: Account;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Innovation Packs curated for this Innovation Hub, in stored (curated) order, filtered to those the requesting agent may read. */
  innovationPackListFilter?: Maybe<Array<InnovationPack>>;
  /** Flag to control if this InnovationHub is listed in the platform store. */
  listedInStore: Scalars['Boolean'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Innovation Hub profile. */
  profile: Profile;
  /** The InnovationHub provider. */
  provider: Actor;
  /** Visibility of the InnovationHub in searches. */
  searchVisibility: SearchVisibility;
  spaceListFilter?: Maybe<Array<Space>>;
  /** If defined, what type of visibility to filter the Spaces on. You can have only one type of filter active at any given time. */
  spaceVisibilityFilter?: Maybe<SpaceVisibility>;
  /** The subdomain associated with this Innovation Hub. */
  subdomain: Scalars['String'];
  /** Type of Innovation Hub */
  type: InnovationHubType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The Virtual Contributors curated for this Innovation Hub, in stored (curated) order, filtered to those the requesting agent may read. */
  virtualContributorListFilter?: Maybe<Array<VirtualContributor>>;
};

export enum InnovationHubType {
  List = 'LIST',
  Visibility = 'VISIBILITY',
}

export type InnovationPack = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Flag to control if this InnovationPack is listed in the platform store. */
  listedInStore: Scalars['Boolean'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Profile for this InnovationPack. */
  profile: Profile;
  /** The InnovationPack provider. */
  provider: Actor;
  /** Visibility of the InnovationPack in searches. */
  searchVisibility: SearchVisibility;
  /** The templatesSet in use by this InnovationPack */
  templatesSet?: Maybe<TemplatesSet>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type InnovationPacksInput = {
  /** The number of Discussion entries to return; if omitted return all InnovationPacks. */
  limit?: InputMaybe<Scalars['Float']>;
  /** The sort order of the InnovationPacks to return. Defaults to number of templates Descending. */
  orderBy?: InputMaybe<InnovationPacksOrderBy>;
};

export enum InnovationPacksOrderBy {
  NumberOfTemplatesAsc = 'NUMBER_OF_TEMPLATES_ASC',
  NumberOfTemplatesDesc = 'NUMBER_OF_TEMPLATES_DESC',
  Random = 'RANDOM',
}

export type InputCreatorQueryResults = {
  /** Create an input based on the provided Callout */
  callout?: Maybe<CreateCalloutData>;
  /** Create an input based on the provided Collaboration */
  collaboration?: Maybe<CreateCollaborationData>;
  /** Create an input based on the provided Community Guidelines */
  communityGuidelines?: Maybe<CreateCommunityGuidelinesData>;
  /** Create an input based on the provided InnovationFlow */
  innovationFlow?: Maybe<CreateInnovationFlowData>;
  /** Create an input based on the provided Whiteboard */
  whiteboard?: Maybe<CreateWhiteboardData>;
};

export type InputCreatorQueryResultsCalloutArgs = {
  ID: Scalars['UUID'];
};

export type InputCreatorQueryResultsCollaborationArgs = {
  ID: Scalars['UUID'];
};

export type InputCreatorQueryResultsCommunityGuidelinesArgs = {
  ID: Scalars['UUID'];
};

export type InputCreatorQueryResultsInnovationFlowArgs = {
  ID: Scalars['UUID'];
};

export type InputCreatorQueryResultsWhiteboardArgs = {
  ID: Scalars['UUID'];
};

export type Invitation = {
  /** The Actor who is invited. */
  actor: Actor;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The User who triggered the invitation. */
  createdBy?: Maybe<User>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** Additional roles to assign to the Actor, in addition to the entry Role. */
  extraRoles: Array<RoleName>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Whether to also add the invited actor to the parent community. */
  invitedToParent: Scalars['Boolean'];
  /** Is this lifecycle in a final state (done). */
  isFinalized: Scalars['Boolean'];
  lifecycle: Lifecycle;
  /** The next events of this Lifecycle. */
  nextEvents: Array<Scalars['String']>;
  /** The current state of this Lifecycle. */
  state: Scalars['String'];
  /** Optional language the inviter expects the invitee to prefer; recorded per invitation. */
  suggestedLanguage?: Maybe<Scalars['String']>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  welcomeMessage?: Maybe<Scalars['String']>;
};

export type InvitationEventInput = {
  eventName: Scalars['String'];
  invitationID: Scalars['UUID'];
};

export type InviteForEntryRoleOnRoleSetInput = {
  /** Additional roles to assign in addition to the entry Role. */
  extraRoles: Array<RoleName>;
  /** The identifiers for the actors being invited. */
  invitedActorIDs: Array<Scalars['UUID']>;
  invitedUserEmails: Array<Scalars['String']>;
  roleSetID: Scalars['UUID'];
  /** Optional language the inviter expects the invitees to prefer (single value for the whole batch). Must be in the eligible set at compose time. Recorded per-invitation so per-invitee granularity later is a UI change, not a migration. */
  suggestedLanguage?: InputMaybe<Scalars['String']>;
  /** The welcome message to send */
  welcomeMessage?: InputMaybe<Scalars['String']>;
};

export type JoinAsEntryRoleOnRoleSetInput = {
  roleSetID: Scalars['UUID'];
};

export type KnowledgeBase = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The calloutsSet with Callouts in use by this KnowledgeBase */
  calloutsSet: CalloutsSet;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for describing this KnowledgeBase. */
  profile: Profile;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type KratosIdentity = {
  /** The creation date of the identity. */
  createdAt: Scalars['DateTime'];
  /** The email address of the identity. */
  email: Scalars['String'];
  /** The first name of the user. */
  firstName?: Maybe<Scalars['String']>;
  /** The unique identifier of the identity. */
  id: Scalars['String'];
  /** Indicates whether the email address is verified. */
  isVerified: Scalars['Boolean'];
  /** The last name of the user. */
  lastName?: Maybe<Scalars['String']>;
  /** The current verification status of the email address. */
  verificationStatus: Scalars['String'];
};

export type LanguageConfig = {
  /** The platform-wide default interface language. */
  default: Scalars['String'];
  /** Languages the platform proactively detects, offers, and allows as invitation suggestions — subset of the supported set; empty = all proactive offers disabled. */
  eligible: Array<Scalars['String']>;
};

export type LatestReleaseDiscussion = {
  /** Id of the latest release discussion. */
  id: Scalars['String'];
  /** NameID of the latest release discussion. */
  nameID: Scalars['String'];
};

export type LeaveConversationInput = {
  /** The ID of the conversation to leave. */
  conversationID: Scalars['UUID'];
};

export type Library = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The InnovationHub listed on this platform */
  innovationHubs: Array<InnovationHub>;
  /** The Innovation Packs in the platform Innovation Library. */
  innovationPacks: Array<InnovationPack>;
  /** Paginated Innovation Packs in the platform Innovation Library (newest first). */
  innovationPacksPaginated: PaginatedInnovationPacks;
  /** The Templates in the Innovation Library, together with information about the InnovationPack. */
  templates: Array<TemplateResult>;
  /** Paginated Templates in the Innovation Library, each with the InnovationPack that contributes it (newest first). */
  templatesPaginated: PaginatedLibraryTemplateResults;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The VirtualContributors listed on this platform */
  virtualContributors: Array<VirtualContributor>;
};

export type LibraryInnovationPacksArgs = {
  queryData?: InputMaybe<InnovationPacksInput>;
};

export type LibraryInnovationPacksPaginatedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<LibraryInnovationPacksFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type LibraryTemplatesArgs = {
  filter?: InputMaybe<LibraryTemplatesFilterInput>;
};

export type LibraryTemplatesPaginatedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<LibraryTemplatesFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type LibraryInnovationPacksFilterInput = {
  /** Return Innovation Packs whose title, description or tags contain this term (case-insensitive). */
  searchTerm?: InputMaybe<Scalars['String']>;
};

export type LibraryTemplatesFilterInput = {
  /** Return Templates whose title, description or tags contain this term (case-insensitive). */
  searchTerm?: InputMaybe<Scalars['String']>;
  /** Return Templates within the Library matching the specified Template Types. */
  types?: InputMaybe<Array<TemplateType>>;
};

export type License = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The set of License Entitlement Types on that entity. */
  availableEntitlements?: Maybe<Array<LicenseEntitlementType>>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The set of Entitlements associated with the License applicable to this entity. */
  entitlements: Array<LicenseEntitlement>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The type of entity that this License is being used with. */
  type?: Maybe<LicenseType>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type LicenseEntitlement = {
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** Data type of the entitlement, e.g. Limit, Feature flag etc. */
  dataType: LicenseEntitlementDataType;
  /** If the Entitlement is enabled */
  enabled: Scalars['Boolean'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Whether the specified entitlement is available. */
  isAvailable: Scalars['Boolean'];
  /** Limit of the entitlement */
  limit: Scalars['Float'];
  /** Type of the entitlement, e.g. Space, Whiteboard contributors etc. */
  type: LicenseEntitlementType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The amount of the spcified entitlement used. */
  usage: Scalars['Float'];
};

export enum LicenseEntitlementDataType {
  Flag = 'FLAG',
  Limit = 'LIMIT',
}

export enum LicenseEntitlementType {
  AccountAiAssistantTokensMonth = 'ACCOUNT_AI_ASSISTANT_TOKENS_MONTH',
  AccountInnovationHub = 'ACCOUNT_INNOVATION_HUB',
  AccountInnovationPack = 'ACCOUNT_INNOVATION_PACK',
  AccountSpaceFree = 'ACCOUNT_SPACE_FREE',
  AccountSpacePlus = 'ACCOUNT_SPACE_PLUS',
  AccountSpacePremium = 'ACCOUNT_SPACE_PREMIUM',
  AccountVirtualContributor = 'ACCOUNT_VIRTUAL_CONTRIBUTOR',
  SpaceFlagMemoMultiUser = 'SPACE_FLAG_MEMO_MULTI_USER',
  SpaceFlagOfficeDocuments = 'SPACE_FLAG_OFFICE_DOCUMENTS',
  SpaceFlagSaveAsTemplate = 'SPACE_FLAG_SAVE_AS_TEMPLATE',
  SpaceFlagVirtualContributorAccess = 'SPACE_FLAG_VIRTUAL_CONTRIBUTOR_ACCESS',
  SpaceFlagWhiteboardMultiUser = 'SPACE_FLAG_WHITEBOARD_MULTI_USER',
  SpaceFree = 'SPACE_FREE',
  SpacePlus = 'SPACE_PLUS',
  SpacePremium = 'SPACE_PREMIUM',
}

export type LicensePlan = {
  /** Assign this plan to all new Organization accounts */
  assignToNewOrganizationAccounts: Scalars['Boolean'];
  /** Assign this plan to all new User accounts */
  assignToNewUserAccounts: Scalars['Boolean'];
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** Is this plan enabled? */
  enabled: Scalars['Boolean'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Is this plan free? */
  isFree: Scalars['Boolean'];
  /** The credential to represent this plan */
  licenseCredential: LicensingCredentialBasedCredentialType;
  /** The name of the License Plan */
  name: Scalars['String'];
  /** The price per month of this plan. */
  pricePerMonth?: Maybe<Scalars['Float']>;
  /** Does this plan require contact support */
  requiresContactSupport: Scalars['Boolean'];
  /** Does this plan require a payment method? */
  requiresPaymentMethod: Scalars['Boolean'];
  /** The sorting order for this Plan. */
  sortOrder: Scalars['Float'];
  /** Is there a trial period enabled */
  trialEnabled: Scalars['Boolean'];
  /** The type of this License Plan. */
  type: LicensingCredentialBasedPlanType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type LicensePolicy = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The set of credential rules that are contained by this License Policy. */
  credentialRules: Array<LicensingCredentialBasedPolicyCredentialRule>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export enum LicenseType {
  Account = 'ACCOUNT',
  Collaboration = 'COLLABORATION',
  Roleset = 'ROLESET',
  Space = 'SPACE',
  TemplateContentSpace = 'TEMPLATE_CONTENT_SPACE',
  Whiteboard = 'WHITEBOARD',
}

export type Licensing = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The License Plans in use on the platform. */
  plans: Array<LicensePlan>;
  /** The LicensePolicy in use by the Licensing setup. */
  policy: LicensePolicy;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export enum LicensingCredentialBasedCredentialType {
  AccountLicensePlus = 'ACCOUNT_LICENSE_PLUS',
  SpaceFeatureMemoMultiUser = 'SPACE_FEATURE_MEMO_MULTI_USER',
  SpaceFeatureOfficeDocuments = 'SPACE_FEATURE_OFFICE_DOCUMENTS',
  SpaceFeatureSaveAsTemplate = 'SPACE_FEATURE_SAVE_AS_TEMPLATE',
  SpaceFeatureVirtualContributors = 'SPACE_FEATURE_VIRTUAL_CONTRIBUTORS',
  SpaceFeatureWhiteboardMultiUser = 'SPACE_FEATURE_WHITEBOARD_MULTI_USER',
  SpaceLicenseEnterprise = 'SPACE_LICENSE_ENTERPRISE',
  SpaceLicenseFree = 'SPACE_LICENSE_FREE',
  SpaceLicensePlus = 'SPACE_LICENSE_PLUS',
  SpaceLicensePremium = 'SPACE_LICENSE_PREMIUM',
}

export enum LicensingCredentialBasedPlanType {
  AccountFeatureFlag = 'ACCOUNT_FEATURE_FLAG',
  AccountPlan = 'ACCOUNT_PLAN',
  SpaceFeatureFlag = 'SPACE_FEATURE_FLAG',
  SpacePlan = 'SPACE_PLAN',
}

export type LicensingCredentialBasedPolicyCredentialRule = {
  credentialType: LicensingCredentialBasedCredentialType;
  grantedEntitlements: Array<LicensingGrantedEntitlement>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type LicensingGrantedEntitlement = {
  limit: Scalars['Float'];
  /** The entitlement that is granted. */
  type: LicenseEntitlementType;
};

export type LicensingGrantedEntitlementInput = {
  limit: Scalars['Float'];
  /** The entitlement that is granted. */
  type: LicenseEntitlementType;
};

export type Lifecycle = {
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type Link = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for framing the associated Link Contribution. */
  profile: Profile;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** URI of the Link */
  uri: Scalars['String'];
};

export type Location = {
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  /** City of the location. */
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The GeoLocation for this Location, derived from (City, Country) if those are set. */
  geoLocation: GeoLocation;
  /** The ID of the entity */
  id: Scalars['UUID'];
  postalCode?: Maybe<Scalars['String']>;
  stateOrProvince?: Maybe<Scalars['String']>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type LookupByNameQueryResults = {
  /** Lookup the ID of the specified InnovationHub using a NameID */
  innovationHub?: Maybe<Scalars['String']>;
  /** Lookup the ID of the specified InnovationPack using a NameID */
  innovationPack?: Maybe<Scalars['String']>;
  /** Lookup the ID of the specified Organization using a NameID */
  organization?: Maybe<Scalars['String']>;
  /** Lookup a Space using a NameID */
  space?: Maybe<Space>;
  /** Lookup the ID of the specified Template using a templatesSetId and the template NameID */
  template?: Maybe<Scalars['String']>;
  /** Lookup the ID of the specified User using a NameID */
  user?: Maybe<Scalars['String']>;
  /** Lookup the ID of the specified Virtual Contributor using a NameID */
  virtualContributor?: Maybe<Scalars['String']>;
};

export type LookupByNameQueryResultsInnovationHubArgs = {
  NAMEID: Scalars['NameID'];
};

export type LookupByNameQueryResultsInnovationPackArgs = {
  NAMEID: Scalars['NameID'];
};

export type LookupByNameQueryResultsOrganizationArgs = {
  NAMEID: Scalars['NameID'];
};

export type LookupByNameQueryResultsSpaceArgs = {
  NAMEID: Scalars['NameID'];
};

export type LookupByNameQueryResultsTemplateArgs = {
  NAMEID: Scalars['NameID'];
  templatesSetID: Scalars['UUID'];
};

export type LookupByNameQueryResultsUserArgs = {
  NAMEID: Scalars['NameID'];
};

export type LookupByNameQueryResultsVirtualContributorArgs = {
  NAMEID: Scalars['NameID'];
};

export type LookupMyPrivilegesQueryResults = {
  /** Lookup myPrivileges on the specified Account */
  account?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Application */
  application?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Calendar */
  calendar?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified CalendarEvent */
  calendarEvent?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Callout */
  callout?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Collaboration */
  collaboration?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Community */
  community?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Community guidelines */
  communityGuidelines?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Document */
  document?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified InnovationFlow */
  innovationFlow?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified InnovationHub */
  innovationHub?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified InnovationPack */
  innovationPack?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Invitation */
  invitation?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified License */
  license?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Post */
  post?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Profile */
  profile?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified RoleSet */
  roleSet?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Room */
  room?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Space */
  space?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified SpaceAbout */
  spaceAbout?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified StorageAggregator */
  storageAggregator?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified StorageBucket */
  storageBucket?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Template */
  template?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified TemplatesManager */
  templatesManager?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified TemplatesSet */
  templatesSet?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified User */
  user?: Maybe<Array<AuthorizationPrivilege>>;
  /** A particular VirtualContributor */
  virtualContributor?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup myPrivileges on the specified Whiteboard */
  whiteboard?: Maybe<Array<AuthorizationPrivilege>>;
};

export type LookupMyPrivilegesQueryResultsAccountArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsApplicationArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsCalendarArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsCalendarEventArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsCalloutArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsCollaborationArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsCommunityArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsCommunityGuidelinesArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsDocumentArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsInnovationFlowArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsInnovationHubArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsInnovationPackArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsInvitationArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsLicenseArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsPostArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsProfileArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsRoleSetArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsRoomArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsSpaceArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsSpaceAboutArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsStorageAggregatorArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsStorageBucketArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsTemplateArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsTemplatesManagerArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsTemplatesSetArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsUserArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsVirtualContributorArgs = {
  ID: Scalars['UUID'];
};

export type LookupMyPrivilegesQueryResultsWhiteboardArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResults = {
  /** Lookup the specified SpaceAbout */
  about?: Maybe<SpaceAbout>;
  /** Lookup the specified Account */
  account?: Maybe<Account>;
  /** Lookup the specified Application */
  application?: Maybe<Application>;
  /** Lookup the specified Authorization Policy */
  authorizationPolicy?: Maybe<Authorization>;
  /** The privileges granted to the specified user based on this Authorization Policy. */
  authorizationPrivilegesForUser?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup the specified Calendar */
  calendar?: Maybe<Calendar>;
  /** Lookup the specified CalendarEvent */
  calendarEvent?: Maybe<CalendarEvent>;
  /** Lookup the specified Callout */
  callout?: Maybe<Callout>;
  /** Lookup the specified CalloutsSet */
  calloutsSet?: Maybe<CalloutsSet>;
  /** Lookup the specified Collaboration */
  collaboration?: Maybe<Collaboration>;
  /** Lookup the specified Community */
  community?: Maybe<Community>;
  /** Lookup the specified Community guidelines */
  communityGuidelines?: Maybe<CommunityGuidelines>;
  /** Lookup the specified CalloutContribution */
  contribution?: Maybe<CalloutContribution>;
  /** Lookup the specified Conversation */
  conversation?: Maybe<Conversation>;
  /** Lookup the specified Document */
  document?: Maybe<Document>;
  /** Lookup the specified InnovationFlow */
  innovationFlow?: Maybe<InnovationFlow>;
  /** Lookup the specified InnovationHub */
  innovationHub?: Maybe<InnovationHub>;
  /** Lookup the specified InnovationPack */
  innovationPack?: Maybe<InnovationPack>;
  /** Lookup the specified Invitation */
  invitation?: Maybe<Invitation>;
  /** Lookup as specific KnowledgeBase */
  knowledgeBase: KnowledgeBase;
  /** Lookup the specified License */
  license?: Maybe<License>;
  /** Lookup the specified Memo */
  memo?: Maybe<Memo>;
  /** Lookup myPrivileges on the specified entity. */
  myPrivileges?: Maybe<LookupMyPrivilegesQueryResults>;
  /** Lookup the specified Organization using a ID */
  organization?: Maybe<Organization>;
  /** Lookup the specified PlatformInvitation */
  platformInvitation?: Maybe<PlatformInvitation>;
  /** Lookup the specified Post */
  post?: Maybe<Post>;
  /** Lookup the specified Profile */
  profile?: Maybe<Profile>;
  /** Lookup the specified RoleSet */
  roleSet?: Maybe<RoleSet>;
  /** Lookup the specified Room */
  room?: Maybe<Room>;
  /** Lookup the specified Space */
  space?: Maybe<Space>;
  /** Lookup the specified StorageAggregator */
  storageAggregator?: Maybe<StorageAggregator>;
  /** Lookup the specified StorageBucket */
  storageBucket?: Maybe<StorageBucket>;
  /** Lookup the specified Template */
  template?: Maybe<Template>;
  /** Lookup the specified Space Content Template */
  templateContentSpace?: Maybe<TemplateContentSpace>;
  /** Lookup the specified TemplatesManager */
  templatesManager?: Maybe<TemplatesManager>;
  /** Lookup the specified TemplatesSet */
  templatesSet?: Maybe<TemplatesSet>;
  /** A particular User */
  user?: Maybe<User>;
  /** A particular VirtualContributor */
  virtualContributor?: Maybe<VirtualContributor>;
  /** Lookup the specified Whiteboard */
  whiteboard?: Maybe<Whiteboard>;
};

export type LookupQueryResultsAboutArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsAccountArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsApplicationArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsAuthorizationPolicyArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsAuthorizationPrivilegesForUserArgs = {
  authorizationPolicyID: Scalars['UUID'];
  userID: Scalars['UUID'];
};

export type LookupQueryResultsCalendarArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCalendarEventArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCalloutArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCalloutsSetArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCollaborationArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCommunityArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCommunityGuidelinesArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsContributionArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsConversationArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsDocumentArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsInnovationFlowArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsInnovationHubArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsInnovationPackArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsInvitationArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsKnowledgeBaseArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsLicenseArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsMemoArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsOrganizationArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsPlatformInvitationArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsPostArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsProfileArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsRoleSetArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsRoomArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsSpaceArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsStorageAggregatorArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsStorageBucketArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsTemplateArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsTemplateContentSpaceArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsTemplatesManagerArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsTemplatesSetArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsUserArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsVirtualContributorArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsWhiteboardArgs = {
  ID: Scalars['UUID'];
};

/** Metadata for one MCP API key. The key value itself is never exposed here. */
export type McpApiKey = {
  createdDate: Scalars['DateTime'];
  /** Optional expiry chosen at mint. */
  expiresAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  /** When this key last authenticated a request. */
  lastUsedAt?: Maybe<Scalars['DateTime']>;
  /** Source address of the last request this key authenticated. */
  lastUsedFromIp?: Maybe<Scalars['String']>;
  /** User-supplied label. Not unique. */
  name: Scalars['String'];
  /** Granted operations, flattened from the stored scope. */
  operations: Array<McpApiKeyOperation>;
  status: McpApiKeyStatus;
};

/** Result of minting a key. The only place the plaintext is ever returned. */
export type McpApiKeyMintResult = {
  /** The plaintext key. Returned EXACTLY ONCE — it is not stored and cannot be re-derived. */
  apiKey: Scalars['String'];
  /** Metadata for the key just created. */
  key: McpApiKey;
};

/** Operations an MCP API key may perform. */
export enum McpApiKeyOperation {
  Read = 'READ',
  Tools = 'TOOLS',
}

/** Lifecycle status of an MCP API key. REVOKED takes precedence over EXPIRED. */
export enum McpApiKeyStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Revoked = 'REVOKED',
}

export type MeConversationsResult = {
  /** All conversations (direct and group) for the current authenticated user. Client handles categorization by room type and member actor types. */
  conversations: Array<Conversation>;
};

export type MeQueryResults = {
  /** The community applications current authenticated user can act on. */
  communityApplications: Array<CommunityApplicationResult>;
  /** The invitations the current authenticated user can act on. */
  communityInvitations: Array<CommunityInvitationResult>;
  /** The number of invitations the current authenticated user can act on. */
  communityInvitationsCount: Scalars['Float'];
  /** The conversations the current authenticated user is part of. */
  conversations: MeConversationsResult;
  /** The query id */
  id: Scalars['String'];
  /** The current user's MCP API keys, newest first. Includes revoked and expired keys so last-used evidence survives revocation. */
  mcpApiKeys: Array<McpApiKey>;
  /** The Spaces I am contributing to */
  mySpaces: Array<MySpaceResults>;
  /** Get all notifications for the logged in user. */
  notifications: PaginatedInAppNotifications;
  /** The total number of unread notifications for the current authenticated user across all notification types. */
  notificationsUnreadCount: Scalars['Float'];
  /** The Spaces the current user is a member of as a flat list. */
  spaceMembershipsFlat: Array<CommunityMembershipResult>;
  /** The hierarchy of the Spaces the current user is a member. */
  spaceMembershipsHierarchical: Array<CommunityMembershipResult>;
  /** The current authenticated User;  null if not yet registered on the platform */
  user?: Maybe<User>;
};

export type MeQueryResultsCommunityApplicationsArgs = {
  states?: InputMaybe<Array<Scalars['String']>>;
};

export type MeQueryResultsCommunityInvitationsArgs = {
  states?: InputMaybe<Array<Scalars['String']>>;
};

export type MeQueryResultsCommunityInvitationsCountArgs = {
  states?: InputMaybe<Array<Scalars['String']>>;
};

export type MeQueryResultsMySpacesArgs = {
  limit?: InputMaybe<Scalars['Float']>;
};

export type MeQueryResultsNotificationsArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<NotificationEventsFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type MeQueryResultsSpaceMembershipsHierarchicalArgs = {
  limit?: InputMaybe<Scalars['Float']>;
};

export type MediaGallery = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  createdBy?: Maybe<Scalars['String']>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The storage bucket associated with this media gallery. */
  storageBucket?: Maybe<StorageBucket>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The visuals contained in this media gallery. */
  visuals: Array<Visual>;
};

export type Memo = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The policy governing who can update the Memo content. */
  contentUpdatePolicy: ContentUpdatePolicy;
  /** The user that created this Memo */
  createdBy?: Maybe<User>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Whether the Memo is multi-user enabled on Space level. */
  isMultiUser: Scalars['Boolean'];
  /** The last saved content of the Memo, represented in Markdown. */
  markdown?: Maybe<Scalars['Markdown']>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Profile for this Memo. */
  profile: Profile;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

/** A message that was sent in a chat room */
export type Message = {
  /** The id for the message event. */
  id: Scalars['MessageID'];
  /** The message being sent */
  message: Scalars['Markdown'];
  /** Reactions on this message */
  reactions: Array<Reaction>;
  /** The User or Virtual Contributor that created this Message */
  sender?: Maybe<Actor>;
  /** The message being replied to */
  threadID?: Maybe<Scalars['MessageID']>;
  /** The server timestamp in UTC */
  timestamp: Scalars['Float'];
};

/** Details about a message, including the room it was sent in and the parent entity that is using the room. */
export type MessageDetails = {
  /** The message that was sent. */
  message: Scalars['String'];
  /** The parent entity that is using the room the message was sent in. */
  parent: MessageParent;
  /** The Room in which the message that was sent. */
  room: Room;
};

/** Details about the parent entity that is using the room the message was sent in. */
export type MessageParent = {
  /** The display name of the parent entity. */
  displayName: Scalars['String'];
  /** The ID of the parent entity. */
  id: Scalars['String'];
  /** The URL of the parent entity. */
  url: Scalars['String'];
};

export type Messaging = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type Metadata = {
  /** Collection of metadata about Alkemio services. */
  services: Array<ServiceMetadata>;
};

export type MigrateEmbeddings = {
  /** Result from the mutation execution. */
  success: Scalars['Boolean'];
};

export enum MimeType {
  Avif = 'AVIF',
  Bmp = 'BMP',
  Csv = 'CSV',
  Doc = 'DOC',
  Docx = 'DOCX',
  Gif = 'GIF',
  Heic = 'HEIC',
  Heif = 'HEIF',
  Ics = 'ICS',
  Jpeg = 'JPEG',
  Jpg = 'JPG',
  Odg = 'ODG',
  Odp = 'ODP',
  Ods = 'ODS',
  Odt = 'ODT',
  Pdf = 'PDF',
  Png = 'PNG',
  Potm = 'POTM',
  Potx = 'POTX',
  Ppsm = 'PPSM',
  Ppsx = 'PPSX',
  Ppt = 'PPT',
  Pptm = 'PPTM',
  Pptx = 'PPTX',
  Rtf = 'RTF',
  Svg = 'SVG',
  Webp = 'WEBP',
  Xls = 'XLS',
  Xlsx = 'XLSX',
  Xpng = 'XPNG',
}

export type MintMcpApiKeyInput = {
  /** Optional expiry. MUST be in the future when supplied. */
  expiresAt?: InputMaybe<Scalars['DateTime']>;
  /** Label for the key. 1..128 characters after trimming. */
  name: Scalars['String'];
  /** At least one operation. Duplicates are removed; order is not significant. */
  operations: Array<McpApiKeyOperation>;
};

export type ModelCardAiEngineResult = {
  /** Access to detailed information on the underlying models specifications */
  additionalTechnicalDetails: Scalars['String'];
  /** Is the VC prompted to limit the responses to a specific body of knowledge? */
  areAnswersRestrictedToBodyOfKnowledge: Scalars['String'];
  /** Can the VC access or search the web? */
  canAccessWebWhenAnswering: Scalars['Boolean'];
  /** Where is the AI service hosted? */
  hostingLocation: Scalars['String'];
  /** Is the AI Persona using an AI Engine not provided by Alkemio? */
  isExternal: Scalars['Boolean'];
  /** Is interaction data used in any way for model training? Null means Unknown. */
  isInteractionDataUsedForTraining?: Maybe<Scalars['Boolean']>;
  /** Does the VC use an open-weight model? */
  isUsingOpenWeightsModel: Scalars['Boolean'];
};

export type ModelCardMonitoringResult = {
  /** Since Alkemio facilitates the interaction with the external provider, it holds an operational responsibility to monitor the service. As with all data and interactions on the platform, these are governed by our <a href="https://welcome.alkem.io/legal/#tc" target="_blank" ref="noreferer">Terms & Conditions</a>. */
  isUsageMonitoredByAlkemio: Scalars['Boolean'];
};

export type ModelCardSpaceUsageResult = {
  /** The Flags for this Model Card Entry. */
  flags: Array<VirtualContributorModelCardFlag>;
  /** The Model Card Entry type. */
  modelCardEntry: VirtualContributorModelCardEntry;
};

export type MoveCalloutContributionInput = {
  /** ID of the Callout to move the Contribution to. */
  calloutID: Scalars['UUID'];
  /** ID of the Contribution to move. */
  contributionID: Scalars['UUID'];
};

export type MoveSpaceL1ToSpaceL0Input = {
  /** Send invitations to former community members who are also in the target L0 community. */
  autoInvite?: InputMaybe<Scalars['Boolean']>;
  /** Custom invitation message. Used only when autoInvite is true. */
  invitationMessage?: InputMaybe<Scalars['String']>;
  /** The L1 subspace to move to a different L0 space. */
  spaceL1ID: Scalars['UUID'];
  /** The target L0 space (must be different from the current parent L0). */
  targetSpaceL0ID: Scalars['UUID'];
};

export type MoveSpaceL1ToSpaceL2Input = {
  /** Send invitations to former community members who are also in the target L0 community. */
  autoInvite?: InputMaybe<Scalars['Boolean']>;
  /** Custom invitation message. Used only when autoInvite is true. */
  invitationMessage?: InputMaybe<Scalars['String']>;
  /** The L1 subspace to move and demote to L2. */
  spaceL1ID: Scalars['UUID'];
  /** The target L1 subspace in a different L0 (new parent for the demoted space). */
  targetSpaceL1ID: Scalars['UUID'];
};

export type MoveSpaceL2ToSpaceL1Input = {
  /** Send invitations to former community members who are also in the target L0 community. */
  autoInvite?: InputMaybe<Scalars['Boolean']>;
  /** Custom invitation message. Used only when autoInvite is true. */
  invitationMessage?: InputMaybe<Scalars['String']>;
  /** The L2 subspace to move (stays L2). */
  spaceL2ID: Scalars['UUID'];
  /** The target L1 subspace in a different L0 (new parent for the moved L2). */
  targetSpaceL1ID: Scalars['UUID'];
};

export type MoveTaskToColumnInput = {
  /** The destination column on the Tasks board. Matched case-insensitively to an existing column. */
  column: Scalars['String'];
  /** The task (Callout Contribution) to move. */
  contributionID: Scalars['UUID'];
};

export type Mutation = {
  /** Adds a Classification to a Space by copying a Classification Template (Step A). */
  addClassificationEntryFromTemplate: ClassificationEntry;
  /** Adds an Iframe Allowed URL to the Platform Settings */
  addIframeAllowedURL: Array<Scalars['String']>;
  /** Adds a full email address to the platform notification blacklist */
  addNotificationEmailToBlacklist: Array<Scalars['String']>;
  /** Add a new option to a Poll. Requires UPDATE privilege, or CONTRIBUTE privilege when the poll setting allowContributorsAddOptions is enabled. The new option is appended with the next available sort order. */
  addPollOption: Poll;
  /** Adds or swaps the requesting user's single reaction on a Callout. Requires CONTRIBUTE on the Callout. The Callout must be published and not a template. The emoji must be on the platform allow-list. */
  addReactionToCallout: Callout;
  /** Add a reaction to a message from the specified Room. */
  addReactionToMessageInRoom: Reaction;
  /** Adds a new visual to the specified media gallery. */
  addVisualToMediaGallery: Visual;
  /** Ensure all community members are registered for communications. */
  adminCommunicationEnsureAccessToCommunications: Scalars['Boolean'];
  /** Create rooms for legacy conversations that were created without one (from lazy room creation era). */
  adminCommunicationMigrateOrphanedConversations: CommunicationAdminMigrateRoomsResult;
  /** Remove an orphaned room from messaging platform. */
  adminCommunicationRemoveOrphanedRoom: Scalars['Boolean'];
  /** Synchronize all Alkemio spaces into the Matrix space hierarchy. Idempotent — safe to call multiple times. */
  adminCommunicationSyncSpaceHierarchy: Scalars['Boolean'];
  /** Allow updating the state flags of a particular rule. */
  adminCommunicationUpdateRoomState: Scalars['Boolean'];
  /** Delete a Kratos identity by ID. */
  adminIdentityDeleteKratosIdentity: Scalars['Boolean'];
  /** Prunes InAppNotifications according to the platform defined criteria. The effects of the pruning are returned. */
  adminInAppNotificationsPrune: PruneInAppNotificationAdminResult;
  /** Creates a CredentialRule on the LicensePolicy. */
  adminLicensePolicyCreateCredentialRule: LicensingCredentialBasedPolicyCredentialRule;
  /** Deletes the specified LicensePolicy. */
  adminLicensePolicyDeleteCredentialRule: LicensingCredentialBasedPolicyCredentialRule;
  /** Updates a CredentialRule on the LicensePolicy. */
  adminLicensePolicyUpdateCredentialRule: LicensingCredentialBasedPolicyCredentialRule;
  /** Platform admin: revoke a named user's MCP API key. Idempotent. */
  adminRevokeMcpApiKey: McpApiKey;
  /** Ingests new data into Elasticsearch from scratch. This will delete all existing data and ingest new data from the source. This is an admin only operation. */
  adminSearchIngestFromScratch: Scalars['String'];
  /** Update the Avatar on the Profile with the spedified profileID to be stored as a Document. */
  adminUpdateContributorAvatars: Profile;
  /** Updates the GeoLocation data where required on the platform. */
  adminUpdateGeoLocationData: Scalars['Boolean'];
  /** Remove the Kratos account associated with the specified User. Note: the Users profile on the platform is not deleted. */
  adminUserAccountDelete: User;
  /** Change a user's login email synchronously, acting as a platform administrator. The admin is responsible for verifying the subject user's identity out-of-band — the platform does NOT send a confirmation message to the new mailbox and does NOT require the new mailbox to prove ownership. Validates uniqueness, commits Kratos → Alkemio with bounded retry, invalidates the subject's existing sessions, and sends a security-signal notification to the old address. Requires PLATFORM_ADMIN. */
  adminUserEmailChange: UserEmailChangeResult;
  /** Reconcile an outstanding drift-detected state for a subject user by force-aligning Alkemio and Kratos to a canonical email chosen by the admin. Requires PLATFORM_ADMIN. */
  adminUserEmailChangeDriftResolve: UserEmailChangeResult;
  /** Create a test customer on wingback. */
  adminWingbackCreateTestCustomer: Scalars['String'];
  /** Get wingback customer entitlements. */
  adminWingbackGetCustomerEntitlements: Array<LicensingGrantedEntitlement>;
  /** Reset the Authorization Policy on the specified AiServer. */
  aiServerAuthorizationPolicyReset: AiServer;
  /** Creates a new AiPersona on the aiServer. */
  aiServerCreateAiPersona: AiPersona;
  /** Deletes the specified AiPersona. */
  aiServerDeleteAiPersona: AiPersona;
  /** Updates the specified AI Persona. */
  aiServerUpdateAiPersona: AiPersona;
  /** Apply to join the specified RoleSet in the entry Role. */
  applyForEntryRoleOnRoleSet: Application;
  /** Assign a member to a group conversation. Returns true when the RPC is sent. Actual membership change arrives via MEMBER_ADDED subscription event. */
  assignConversationMember: Scalars['Boolean'];
  /** Assign the specified LicensePlan to an Account. */
  assignLicensePlanToAccount: Account;
  /** Assign the specified LicensePlan to a Space. */
  assignLicensePlanToSpace: Space;
  /** Assigns a User to a role on the Platform. */
  assignPlatformRoleToUser: User;
  /** Assigns an Actor (User, Organization, or Virtual Contributor) to a role in the specified RoleSet. */
  assignRole: Actor;
  /** Assigns an Organization a Role in the specified Community. */
  assignRoleToOrganization: Organization;
  /** Assigns a User to a role in the specified Community. */
  assignRoleToUser: User;
  /** Assigns a Virtual Contributor to a role in the specified Community. */
  assignRoleToVirtualContributor: VirtualContributor;
  /** Assigns a User as a member of the specified User Group. */
  assignUserToGroup: UserGroup;
  /** Ensure all access privileges for the platform roles are re-calculated */
  authorizationPlatformRolesAccessReset: Scalars['Boolean'];
  /** Reset the Authorization Policy on all entities */
  authorizationPolicyResetAll: Scalars['String'];
  /** Reset the Authorization Policy on the specified Account. */
  authorizationPolicyResetOnAccount: Account;
  /** Reset the Authorization Policy on the specified Organization. */
  authorizationPolicyResetOnOrganization: Organization;
  /** Reset the Authorization Policy on the specified Platform. */
  authorizationPolicyResetOnPlatform: Platform;
  /** Reset the Authorization policy on the specified User. */
  authorizationPolicyResetOnUser: User;
  /** Reset the specified Authorization Policy to global admin privileges */
  authorizationPolicyResetToGlobalAdminsAccess: Authorization;
  /** Cast or update a vote on a Poll. Requires CONTRIBUTE privilege on the Poll (space member). If the calling user has already voted, their vote is REPLACED ENTIRELY with the new selection set. */
  castPollVote: Poll;
  /** Deletes collections nameID-... */
  cleanupCollections: MigrateEmbeddings;
  /** Move an L1 Space up in the hierarchy, to be a L0 Space. */
  convertSpaceL1ToSpaceL0: Space;
  /** Move an L1 Space down in the hierarchy within the same L0 Space, to be a L2 Space.       Restrictions: the Space L1 must remain within the same L0 Space.       Roles: all user, organization and virtual contributor role assignments are removed, with       the exception of Admin role assignments for Users. */
  convertSpaceL1ToSpaceL2: Space;
  /** Move an L2 Space up in the hierarchy, to be a L1 Space. */
  convertSpaceL2ToSpaceL1: Space;
  /** Convert a VC of type ALKEMIO_SPACE to be of type KNOWLEDGE_BASE. All Callouts from the Space currently being used are moved to the Knowledge Base. Note: only allowed for VCs using a Space within the same Account. */
  convertVirtualContributorToUseKnowledgeBase: VirtualContributor;
  /** Create a new Callout on the CalloutsSet. When `file` is supplied alongside a COLLABORA_DOCUMENT framing, the new callout is framed with a Collabora document populated from the uploaded bytes (file-service-go sniffs MIME, validates format and size, and derives the document type; any documentType in the input is ignored on the upload path; displayName defaults from the filename when absent). When `file` is omitted, the existing blank-create behaviour applies and framing.collaboraDocument must specify both displayName and documentType. */
  createCalloutOnCalloutsSet: Callout;
  /** Creates a Classification on a Space ad hoc, without a Template (API-only). */
  createClassificationEntry: ClassificationEntry;
  /** Create a new Contribution on the Callout. */
  createContributionOnCallout: CalloutContribution;
  /** Create a new Conversation. Use type DIRECT for 1-on-1, GROUP for multi-party. */
  createConversation: Conversation;
  /** Creates a new Discussion as part of this Forum. */
  createDiscussion: Discussion;
  /** Create a new CalendarEvent on the Calendar. */
  createEventOnCalendar: CalendarEvent;
  /** Creates a new User Group in the specified Community. */
  createGroupOnCommunity: UserGroup;
  /** Creates a new User Group for the specified Organization. */
  createGroupOnOrganization: UserGroup;
  /** Create an Innovation Hub on the specified account */
  createInnovationHub: InnovationHub;
  /** Creates a new InnovationPack on an Account. */
  createInnovationPack: InnovationPack;
  /** Create a new LicensePlan on the Licensing. */
  createLicensePlan: LicensePlan;
  /** Creates a new Organization on the platform. */
  createOrganization: Organization;
  /** Creates a new Reference on the specified Profile. */
  createReferenceOnProfile: Reference;
  /** Creates a new Level Zero Space within the specified Account. */
  createSpace: Space;
  /** Create a new State on the InnovationFlow. */
  createStateOnInnovationFlow: InnovationFlowState;
  /** Creates a new Subspace within the specified Space. */
  createSubspace: Space;
  /** Creates a new Tagset on the specified Profile */
  createTagsetOnProfile: Tagset;
  /** Add a column to a Tasks board Callout. */
  createTaskColumnOnCallout: Callout;
  /** Creates a new Template on the specified TemplatesSet. */
  createTemplate: Template;
  /** Creates a new Template on the specified TemplatesSet using the provided ContentSpace as content. */
  createTemplateFromContentSpace: Template;
  /** Creates a new Template on the specified TemplatesSet using the provided Space as content. */
  createTemplateFromSpace: Template;
  /** Creates a new User on the platform. */
  createUser: User;
  /** Creates a new VirtualContributor on an Account. */
  createVirtualContributor: VirtualContributor;
  /** Materializes a server-owned live Whiteboard draft for a Callout form. Content remains on the collaboration transport; GraphQL returns identifiers only. */
  createWhiteboardDraftOnCalloutsSet: Scalars['UUID'];
  /** Materializes a server-owned live Whiteboard draft for a Template form. GraphQL returns identifiers only. */
  createWhiteboardDraftOnTemplatesSet: Scalars['UUID'];
  /** Creates an account in Wingback */
  createWingbackAccount: Scalars['String'];
  /** Removes the specified Application. */
  deleteApplication: Application;
  /** Deletes the specified CalendarEvent. */
  deleteCalendarEvent: CalendarEvent;
  /** Delete a Callout. */
  deleteCallout: Callout;
  /** Permanently removes a Classification from a Space. No template and no other Space is affected. */
  deleteClassificationEntry: ClassificationEntry;
  /** Deletes the specified CollaboraDocument. */
  deleteCollaboraDocument: CollaboraDocument;
  /** Deletes a contribution. */
  deleteContribution: CalloutContribution;
  /** Deletes a Conversation. All members are notified via CONVERSATION_DELETED event. */
  deleteConversation: Conversation;
  /** Deletes the specified Discussion. */
  deleteDiscussion: Discussion;
  /** Deletes the specified Document. */
  deleteDocument: Document;
  /** Delete Innovation Hub. */
  deleteInnovationHub: InnovationHub;
  /** Deletes the specified InnovationPack. */
  deleteInnovationPack: InnovationPack;
  /** Removes the specified User invitation. */
  deleteInvitation: Invitation;
  /** Deletes the specified LicensePlan. */
  deleteLicensePlan: LicensePlan;
  /** Deletes the specified Link. */
  deleteLink: Link;
  /** Deletes the specified Memo. */
  deleteMemo: Memo;
  /** Deletes the specified Organization. */
  deleteOrganization: Organization;
  /** Removes the specified User platformInvitation. */
  deletePlatformInvitation: PlatformInvitation;
  /** Deletes the specified Post. */
  deletePost: Post;
  /** Deletes the specified Reference. */
  deleteReference: Reference;
  /** Deletes the specified Space. */
  deleteSpace: Space;
  /** Delete a  State on the InnovationFlow. */
  deleteStateOnInnovationFlow: InnovationFlowState;
  /** Deletes a Storage Bucket */
  deleteStorageBucket: StorageBucket;
  /** Remove a column from a Tasks board Callout. */
  deleteTaskColumnOnCallout: Callout;
  /** Deletes the specified Template. */
  deleteTemplate: Template;
  /** Deletes the specified User. */
  deleteUser: User;
  /** Deletes the specified User Group. */
  deleteUserGroup: UserGroup;
  /** Deletes the specified VirtualContributor. */
  deleteVirtualContributor: VirtualContributor;
  /** Deletes a visual from the specified media gallery. */
  deleteVisualFromMediaGallery: Visual;
  /** Deletes the specified Whiteboard. */
  deleteWhiteboard: Whiteboard;
  /** Idempotently discards a server-owned live Whiteboard draft through the canonical Whiteboard deletion path. */
  deleteWhiteboardDraft: Scalars['UUID'];
  /** Re-enable a previously disabled push notification subscription for the current user. */
  enablePushSubscription: PushSubscription;
  /** Trigger an event on the Application. */
  eventOnApplication: Application;
  /** Trigger an event on the Invitation. */
  eventOnInvitation: Invitation;
  /** Trigger an event on the Organization Verification. */
  eventOnOrganizationVerification: OrganizationVerification;
  /** Grant a credential to an Actor. */
  grantCredentialToActor: Credential;
  /** Grants an authorization credential to an Organization. */
  grantCredentialToOrganization: Organization;
  /** Grants an authorization credential to a User. */
  grantCredentialToUser: User;
  /** Import an existing file as a CollaboraDocument contribution on the callout. file-service-go sniffs the MIME from content and rejects formats Collabora cannot edit. */
  importCollaboraDocument: CalloutContribution;
  /** Invite new Contributors or users by email to join the specified RoleSet in the Entry Role. */
  inviteForEntryRoleOnRoleSet: Array<RoleSetInvitationResult>;
  /** Join the specified RoleSet using the entry Role, without going through an approval process. */
  joinRoleSet: RoleSet;
  /** Leave a group conversation. Awaits the Matrix kick rather than reporting success merely because the RPC was sent: true means the kick was accepted, and the membership is then removed asynchronously — observe MEMBER_REMOVED for completion. If Matrix rejects the kick this still returns true, because Alkemio is authoritative for its own membership and applies the removal locally instead; on that path the Matrix-side room membership may diverge until an operator reconciles it. If the last member leaves, the conversation is auto-deleted and a CONVERSATION_DELETED event follows. */
  leaveConversation: Scalars['Boolean'];
  /** Reset the License with Entitlements on the specified Account. */
  licenseResetOnAccount: Account;
  /** Marks a message as read for the current user. */
  markMessageAsReadInRoom: Scalars['Boolean'];
  /** Mark notifications as read. If no filter is provided, marks all user notifications as read. If filter with types is provided, marks only those notification types as read. */
  markNotificationsAsRead: Scalars['Boolean'];
  /** Mark notifications as unread. If no filter is provided, marks all user notifications as unread. If filter with types is provided, marks only those notification types as unread. */
  markNotificationsAsUnread: Scalars['Boolean'];
  /** Migrates all pending legacy memo content. Idempotent: repeated calls process only rows whose migrated marker is false. */
  migrateLegacyMemoContent: CollaborationMigrationResult;
  /** Migrates pending legacy Whiteboard documents and independently normalizes every legacy Whiteboard contribution default, including defaults stored by Callout templates. Idempotent: repeated calls process only unmigrated documents and non-canonical defaults. */
  migrateLegacyWhiteboardContent: CollaborationMigrationResult;
  /** Mint a new MCP API key for the current user. Returns the plaintext exactly once. */
  mintMcpApiKey: McpApiKeyMintResult;
  /** Moves the specified Contribution to another Callout. */
  moveContributionToCallout: CalloutContribution;
  /** Move an L1 subspace to a different L0 space. The subspace remains at level 1       but changes parent. All content moves with it. All community memberships are cleared.       Requires platform admin privileges. */
  moveSpaceL1ToSpaceL0: Space;
  /** Move an L1 subspace to become an L2 sub-subspace under a target L1 in a different L0 space.       The space is demoted from level 1 to level 2. All community roles are cleared.       Requires platform admin privileges. */
  moveSpaceL1ToSpaceL2: Space;
  /** Move an L2 sub-subspace to become an L2 subspace under a target L1 in a different L0 space.       The subspace stays at level 2 but changes both its parent L1 and its top-level L0.       All community roles (including admins) are cleared and pending invitations dropped.       Platform access rules are recomputed from the new parent hierarchy.       Requires platform admin privileges. */
  moveSpaceL2ToSpaceL1: Space;
  /** Moves a task to another column on its Tasks board. Authorized as MOVE_TASK on the parent Callout, so a board member can move any task. */
  moveTaskToColumn: CalloutContribution;
  /** Refresh the Bodies of Knowledge on All VCs */
  refreshAllBodiesOfKnowledge: Scalars['Boolean'];
  /** Triggers a request to the backing AI Service to refresh the knowledge that is available to it. */
  refreshVirtualContributorBodyOfKnowledge: Scalars['Boolean'];
  /** Empties the CommunityGuidelines. */
  removeCommunityGuidelinesContent: CommunityGuidelines;
  /** Remove a member from a group conversation. Awaits the Matrix kick rather than reporting success merely because the RPC was sent: true means the kick was accepted, and the membership is then removed asynchronously — observe MEMBER_REMOVED for completion. If Matrix rejects the kick (e.g. insufficient permissions) this still returns true, because Alkemio is authoritative for its own membership and applies the removal locally instead; on that path the Matrix-side room membership may diverge until an operator reconciles it. */
  removeConversationMember: Scalars['Boolean'];
  /** Remove the default callout template from an InnovationFlowState. */
  removeDefaultCalloutTemplateOnInnovationFlowState: InnovationFlowState;
  /** Removes an Iframe Allowed URL from the Platform Settings */
  removeIframeAllowedURL: Array<Scalars['String']>;
  /** Removes a message. */
  removeMessageOnRoom: Scalars['MessageID'];
  /** Removes an email address from the platform notification blacklist */
  removeNotificationEmailFromBlacklist: Array<Scalars['String']>;
  /** Removes a User from a Role on the Platform. */
  removePlatformRoleFromUser: User;
  /** Remove an option from a Poll. Requires UPDATE privilege. Poll must retain at least 2 options. Votes that selected this option are deleted and affected voters are notified. */
  removePollOption: Poll;
  /** Remove the current user vote from a Poll. Requires CONTRIBUTE privilege on the Poll. If the user has not voted, returns a validation error. */
  removePollVote: Poll;
  /** Removes the requesting user's reaction from a Callout. Idempotent — no error when no reaction exists. Self-scoped; requires only authentication (not CONTRIBUTE). Returns the Callout only when the caller retains READ access on it. */
  removeReactionFromCallout: Callout;
  /** Remove a reaction on a message from the specified Room. */
  removeReactionToMessageInRoom: Scalars['Boolean'];
  /** Removes an Actor (User, Organization, or Virtual Contributor) from a role in the specified RoleSet. */
  removeRole: Actor;
  /** Removes an Organization from a Role in the specified Community. */
  removeRoleFromOrganization: Organization;
  /** Removes a User from a Role in the specified Community. */
  removeRoleFromUser: User;
  /** Removes a Virtual from a Role in the specified Community. */
  removeRoleFromVirtualContributor: VirtualContributor;
  /** Removes the specified User from specified user group */
  removeUserFromGroup: UserGroup;
  /** Reorder Poll options. Requires UPDATE privilege. The provided list must contain exactly the same option IDs as the current poll options. */
  reorderPollOptions: Poll;
  /** Replace the backing file of an existing CollaboraDocument in place, preserving its identity. Requires UPDATE on the document. The replacement must be an allowed OfficeDocs format, within the size cap, and the SAME document type as the current file. Refused while the document is being edited. */
  replaceCollaboraDocument: CollaboraDocument;
  /** Replace a Whiteboard from another Whiteboard through the live collaboration room. Content and media are copied server-side; snapshot bytes never pass through GraphQL. */
  replaceWhiteboardContentFromSource: Whiteboard;
  /** Resets the interaction with the VC by recreating the room. */
  resetConversationVc: Conversation;
  /** Reset all license plans on Accounts */
  resetLicenseOnAccounts: Scalars['Boolean'];
  /** Revoke a credential from an Actor. */
  revokeCredentialFromActor: Scalars['Boolean'];
  /** Removes an authorization credential from an Organization. */
  revokeCredentialFromOrganization: Organization;
  /** Removes an authorization credential from a User. */
  revokeCredentialFromUser: User;
  /** Revokes the specified LicensePlan on an Account. */
  revokeLicensePlanFromAccount: Account;
  /** Revokes the specified LicensePlan on a Space. */
  revokeLicensePlanFromSpace: Space;
  /** Revoke one of the current user's own MCP API keys. Idempotent. */
  revokeMcpApiKey: McpApiKey;
  /** Send a private (1:1) chat message to each of the given Users individually. Does NOT create a group conversation. Each recipient is processed independently and reported on; partial success is possible. */
  sendDirectMessageToUsers: Array<DirectMessageDeliveryResult>;
  /** Sends a reply to a message from the specified Room. */
  sendMessageReplyToRoom: Message;
  /** Send message to Community Leads. */
  sendMessageToCommunityLeads: Scalars['Boolean'];
  /** Send message to an Organization. */
  sendMessageToOrganization: Scalars['Boolean'];
  /** Sends an comment message. Returns the id of the new Update message. */
  sendMessageToRoom: Message;
  /** Send message to multiple Users. */
  sendMessageToUsers: Scalars['Boolean'];
  /** Set the default callout template for an InnovationFlowState. */
  setDefaultCalloutTemplateOnInnovationFlowState: InnovationFlowState;
  /** Set the mapping of a well-known Virtual Contributor to a specific Virtual Contributor UUID. */
  setPlatformWellKnownVirtualContributor: PlatformWellKnownVirtualContributors;
  /** Subscribe the current user's device to push notifications. If the subscription endpoint already exists, it is updated. If the user has reached the maximum number of subscriptions (10), the oldest subscription is automatically replaced. */
  subscribeToPushNotifications: PushSubscription;
  /** Transfer the specified Callout from its current CalloutsSet to the target CalloutsSet. Note: this is experimental, and only for GlobalAdmins. The user that executes the transfer becomes the creator of the Callout. */
  transferCallout: Callout;
  /** Transfer the specified InnovationHub to another Account. */
  transferInnovationHubToAccount: InnovationHub;
  /** Transfer the specified Innovation Pack to another Account. */
  transferInnovationPackToAccount: InnovationPack;
  /** Transfer the specified Space to another Account. */
  transferSpaceToAccount: Space;
  /** Transfer the specified Virtual Contributor to another Account. */
  transferVirtualContributorToAccount: InnovationPack;
  /** Disable a push notification subscription for the current user. The subscription is retained but will not receive notifications until re-enabled. */
  unsubscribeFromPushNotifications: PushSubscription;
  /** Update the Application Form used by this RoleSet. */
  updateApplicationFormOnRoleSet: RoleSet;
  /** Set the admin per-capability grant on the virtual-assistant actor, governing what it may do system-invoked (default read-only). Requires the platform-operations-admin privilege. */
  updateAssistantActorCapabilities: VirtualAssistant;
  /** Update the baseline License Plan on the specified Account. */
  updateBaselineLicensePlanOnAccount: Account;
  /** Updates the specified CalendarEvent. */
  updateCalendarEvent: CalendarEvent;
  /** Update a Callout. */
  updateCallout: Callout;
  /** Update the information describing the publishing of the specified Callout. */
  updateCalloutPublishInfo: Callout;
  /** Update the visibility of the specified Callout. */
  updateCalloutVisibility: Callout;
  /** Update the sortOrder field of the supplied Callouts to increase as per the order that they are provided in. */
  updateCalloutsSortOrder: Array<Callout>;
  /** Updates a Classification's definition — label, cardinality and/or value set (API-only). */
  updateClassificationEntry: ClassificationEntry;
  /** Toggles a Classification's shown/hidden state on the Space's About page. */
  updateClassificationEntryDisplay: ClassificationEntry;
  /** Replaces the selected values of a Classification (Step B). */
  updateClassificationEntrySelection: ClassificationEntry;
  /** Updates a Tagset on a Classification. */
  updateClassificationTagset: Tagset;
  /** Updates the specified CollaboraDocument. */
  updateCollaboraDocument: CollaboraDocument;
  /** Updates a Collaboration using the Space content from the specified Template. Behavior depends on parameter combinations: (1) Flow Only: deleteExistingCallouts=false, addCallouts=false - updates only InnovationFlow states; (2) Add Posts: deleteExistingCallouts=false, addCallouts=true - keeps existing and adds template callouts; (3) Replace All: deleteExistingCallouts=true, addCallouts=true - deletes existing then adds template callouts; (4) Delete Only: deleteExistingCallouts=true, addCallouts=false - deletes existing callouts and updates InnovationFlow states. Execution order: delete (if requested) → update flow states (always) → add (if requested). */
  updateCollaborationFromSpaceTemplate: Collaboration;
  /** Updates the CommunityGuidelines. */
  updateCommunityGuidelines: CommunityGuidelines;
  /** Update the sortOrder field of the Contributions of s Callout. */
  updateContributionsSortOrder: Array<CalloutContribution>;
  /** Update a group conversation (display name, avatar). Returns true when the RPC is sent. Actual changes arrive via CONVERSATION_UPDATED subscription events. When both fields are provided, clients may receive separate update events for each. */
  updateConversation: Scalars['Boolean'];
  /** Updates the specified Discussion. */
  updateDiscussion: Discussion;
  /** Updates the specified Document. */
  updateDocument: Document;
  /** Updates the InnovationFlow. */
  updateInnovationFlow: InnovationFlow;
  /** Updates the InnovationFlow. */
  updateInnovationFlowCurrentState: InnovationFlow;
  /** Updates the specified InnovationFlowState. */
  updateInnovationFlowState: InnovationFlowState;
  /** Update the sortOrder field of the supplied InnovationFlowStates to increase as per the order that they are provided in. */
  updateInnovationFlowStatesSortOrder: Array<InnovationFlowState>;
  /** Update Innovation Hub. */
  updateInnovationHub: InnovationHub;
  /** Updates the InnovationPack. */
  updateInnovationPack: InnovationPack;
  /** Updates the LicensePlan. */
  updateLicensePlan: LicensePlan;
  /** Updates the specified Link. */
  updateLink: Link;
  /** Updates the specified Memo. */
  updateMemo: Memo;
  /** Update notification state and return the notification. */
  updateNotificationState: NotificationEventInAppState;
  /** Updates the specified Organization. */
  updateOrganization: Organization;
  /** Updates the specified Organization platform settings. */
  updateOrganizationPlatformSettings: Organization;
  /** Updates one of the Setting on an Organization */
  updateOrganizationSettings: Organization;
  /** Updates one of the Setting on the Platform */
  updatePlatformSettings: PlatformSettings;
  /** Update the text of an existing Poll option. Requires UPDATE privilege. Votes that selected this option are deleted and affected voters are notified. */
  updatePollOption: Poll;
  /** Change the status of a Poll (OPEN ↔ CLOSED). Requires UPDATE privilege on the parent Callout. When a poll is CLOSED, all state-mutating operations are rejected. Idempotent: setting to current status succeeds without error. */
  updatePollStatus: Poll;
  /** Updates the specified Post. */
  updatePost: Post;
  /** Updates the specified Profile. */
  updateProfile: Profile;
  /** Updates the specified Reference. */
  updateReference: Reference;
  /** Updates the Space. */
  updateSpace: Space;
  /** Update the platform settings, such as nameID, of the specified Space. */
  updateSpacePlatformSettings: Space;
  /** Updates one of the Setting on a Space */
  updateSpaceSettings: Space;
  /** Updates the pinned state of a Subspace within the specified Space. Returns the updated Subspace. */
  updateSubspacePinned: Space;
  /** Update the sortOrder field of the supplied Subspaces to increase as per the order that they are provided in. */
  updateSubspacesSortOrder: Array<Space>;
  /** Updates the specified Tagset. */
  updateTagset: Tagset;
  /** Rename a column on a Tasks board Callout. */
  updateTaskColumnOnCallout: Callout;
  /** Reorder the columns of a Tasks board Callout. */
  updateTaskColumnsSortOrderOnCallout: Callout;
  /** Updates the specified Template. */
  updateTemplate: Template;
  /** Updates the TemplateContentSpace. */
  updateTemplateContentSpace: TemplateContentSpace;
  /** Updates the specified Template Defaults. */
  updateTemplateDefault: TemplateDefault;
  /** Updates the specified Space Content Template using the provided Space. */
  updateTemplateFromSpace: Template;
  /** Updates the User. */
  updateUser: User;
  /** Updates the specified User Group. */
  updateUserGroup: UserGroup;
  /** Update the platform settings, such as nameID, email, for the specified User. */
  updateUserPlatformSettings: User;
  /** Updates one of the Setting on a User */
  updateUserSettings: User;
  /** Updates the specified VirtualContributor. */
  updateVirtualContributor: VirtualContributor;
  /** Updates platform-level settings of a VirtualContributor (platform admins only). */
  updateVirtualContributorPlatformSettings: VirtualContributor;
  /** Updates one of the Setting on an Virtual Contributor */
  updateVirtualContributorSettings: VirtualContributor;
  /** Updates the image URI, alternative text and/or display aspect ratio for the specified Visual. */
  updateVisual: Visual;
  /** Updates the specified Whiteboard. */
  updateWhiteboard: Whiteboard;
  /** Grants or revokes GLOBAL_GUEST permissions for a whiteboard using a single toggle. */
  updateWhiteboardGuestAccess: UpdateWhiteboardGuestAccessResult;
  /** Create a new Document on the Storage and return the value as part of the returned Link. */
  uploadFileOnLink: Link;
  /** Create a new Document on the Storage and return the value as part of the returned Reference. */
  uploadFileOnReference: Reference;
  /** Create a new Document on the Storage and return the ID and public URL. */
  uploadFileOnStorageBucket: StorageBucketUploadFileResult;
  /** Uploads and sets an image for the specified Visual. */
  uploadImageOnVisual: Visual;
};

export type MutationAddClassificationEntryFromTemplateArgs = {
  classificationData: AddClassificationEntryFromTemplateInput;
};

export type MutationAddIframeAllowedUrlArgs = {
  whitelistedURL: Scalars['String'];
};

export type MutationAddNotificationEmailToBlacklistArgs = {
  input: NotificationEmailAddressInput;
};

export type MutationAddPollOptionArgs = {
  optionData: AddPollOptionInput;
};

export type MutationAddReactionToCalloutArgs = {
  reactionData: AddReactionToCalloutInput;
};

export type MutationAddReactionToMessageInRoomArgs = {
  reactionData: RoomAddReactionToMessageInput;
};

export type MutationAddVisualToMediaGalleryArgs = {
  addData: AddVisualToMediaGalleryInput;
};

export type MutationAdminCommunicationEnsureAccessToCommunicationsArgs = {
  communicationData: CommunicationAdminEnsureAccessInput;
};

export type MutationAdminCommunicationRemoveOrphanedRoomArgs = {
  orphanedRoomData: CommunicationAdminRemoveOrphanedRoomInput;
};

export type MutationAdminCommunicationUpdateRoomStateArgs = {
  roomStateData: CommunicationAdminUpdateRoomStateInput;
};

export type MutationAdminIdentityDeleteKratosIdentityArgs = {
  kratosIdentityId: Scalars['UUID'];
};

export type MutationAdminLicensePolicyCreateCredentialRuleArgs = {
  createData: CreateLicensePolicyCredentialRuleInput;
};

export type MutationAdminLicensePolicyDeleteCredentialRuleArgs = {
  deleteData: DeleteLicensePolicyCredentialRuleInput;
};

export type MutationAdminLicensePolicyUpdateCredentialRuleArgs = {
  updateData: UpdateLicensePolicyCredentialRuleInput;
};

export type MutationAdminRevokeMcpApiKeyArgs = {
  revokeData: AdminRevokeMcpApiKeyInput;
};

export type MutationAdminUpdateContributorAvatarsArgs = {
  profileID: Scalars['UUID'];
};

export type MutationAdminUserAccountDeleteArgs = {
  userID: Scalars['UUID'];
};

export type MutationAdminUserEmailChangeArgs = {
  adminUserEmailChangeData: AdminUserEmailChangeInput;
};

export type MutationAdminUserEmailChangeDriftResolveArgs = {
  adminUserEmailChangeDriftResolveData: AdminUserEmailChangeDriftResolveInput;
};

export type MutationAdminWingbackGetCustomerEntitlementsArgs = {
  customerID: Scalars['String'];
};

export type MutationAiServerCreateAiPersonaArgs = {
  aiPersonaData: CreateAiPersonaInput;
};

export type MutationAiServerDeleteAiPersonaArgs = {
  deleteData: DeleteAiPersonaInput;
};

export type MutationAiServerUpdateAiPersonaArgs = {
  aiPersonaData: UpdateAiPersonaInput;
};

export type MutationApplyForEntryRoleOnRoleSetArgs = {
  applicationData: ApplyForEntryRoleOnRoleSetInput;
};

export type MutationAssignConversationMemberArgs = {
  memberData: AssignConversationMemberInput;
};

export type MutationAssignLicensePlanToAccountArgs = {
  planData: AssignLicensePlanToAccount;
};

export type MutationAssignLicensePlanToSpaceArgs = {
  planData: AssignLicensePlanToSpace;
};

export type MutationAssignPlatformRoleToUserArgs = {
  roleData: AssignPlatformRoleInput;
};

export type MutationAssignRoleArgs = {
  roleData: AssignRoleOnRoleSetInput;
};

export type MutationAssignRoleToOrganizationArgs = {
  roleData: AssignRoleOnRoleSetInput;
};

export type MutationAssignRoleToUserArgs = {
  roleData: AssignRoleOnRoleSetInput;
};

export type MutationAssignRoleToVirtualContributorArgs = {
  roleData: AssignRoleOnRoleSetInput;
};

export type MutationAssignUserToGroupArgs = {
  membershipData: AssignUserGroupMemberInput;
};

export type MutationAuthorizationPolicyResetOnAccountArgs = {
  authorizationResetData: AccountAuthorizationResetInput;
};

export type MutationAuthorizationPolicyResetOnOrganizationArgs = {
  authorizationResetData: OrganizationAuthorizationResetInput;
};

export type MutationAuthorizationPolicyResetOnUserArgs = {
  authorizationResetData: UserAuthorizationResetInput;
};

export type MutationAuthorizationPolicyResetToGlobalAdminsAccessArgs = {
  authorizationID: Scalars['String'];
};

export type MutationCastPollVoteArgs = {
  voteData: CastPollVoteInput;
};

export type MutationConvertSpaceL1ToSpaceL0Args = {
  convertData: ConvertSpaceL1ToSpaceL0Input;
};

export type MutationConvertSpaceL1ToSpaceL2Args = {
  convertData: ConvertSpaceL1ToSpaceL2Input;
};

export type MutationConvertSpaceL2ToSpaceL1Args = {
  convertData: ConvertSpaceL2ToSpaceL1Input;
};

export type MutationConvertVirtualContributorToUseKnowledgeBaseArgs = {
  conversionData: ConversionVcSpaceToVcKnowledgeBaseInput;
};

export type MutationCreateCalloutOnCalloutsSetArgs = {
  calloutData: CreateCalloutOnCalloutsSetInput;
  file?: InputMaybe<Scalars['Upload']>;
};

export type MutationCreateClassificationEntryArgs = {
  classificationData: CreateClassificationEntryInput;
};

export type MutationCreateContributionOnCalloutArgs = {
  contributionData: CreateContributionOnCalloutInput;
};

export type MutationCreateConversationArgs = {
  conversationData: CreateConversationInput;
};

export type MutationCreateDiscussionArgs = {
  createData: ForumCreateDiscussionInput;
};

export type MutationCreateEventOnCalendarArgs = {
  eventData: CreateCalendarEventOnCalendarInput;
};

export type MutationCreateGroupOnCommunityArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateGroupOnOrganizationArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateInnovationHubArgs = {
  createData: CreateInnovationHubOnAccountInput;
};

export type MutationCreateInnovationPackArgs = {
  innovationPackData: CreateInnovationPackOnAccountInput;
};

export type MutationCreateLicensePlanArgs = {
  planData: CreateLicensePlanOnLicensingFrameworkInput;
};

export type MutationCreateOrganizationArgs = {
  organizationData: CreateOrganizationInput;
};

export type MutationCreateReferenceOnProfileArgs = {
  referenceInput: CreateReferenceOnProfileInput;
};

export type MutationCreateSpaceArgs = {
  spaceData: CreateSpaceOnAccountInput;
};

export type MutationCreateStateOnInnovationFlowArgs = {
  stateData: CreateStateOnInnovationFlowInput;
};

export type MutationCreateSubspaceArgs = {
  subspaceData: CreateSubspaceInput;
};

export type MutationCreateTagsetOnProfileArgs = {
  tagsetData: CreateTagsetOnProfileInput;
};

export type MutationCreateTaskColumnOnCalloutArgs = {
  columnData: CreateTaskColumnOnCalloutInput;
};

export type MutationCreateTemplateArgs = {
  templateData: CreateTemplateOnTemplatesSetInput;
};

export type MutationCreateTemplateFromContentSpaceArgs = {
  templateData: CreateTemplateFromContentSpaceOnTemplatesSetInput;
};

export type MutationCreateTemplateFromSpaceArgs = {
  templateData: CreateTemplateFromSpaceOnTemplatesSetInput;
};

export type MutationCreateUserArgs = {
  userData: CreateUserInput;
};

export type MutationCreateVirtualContributorArgs = {
  virtualContributorData: CreateVirtualContributorOnAccountInput;
};

export type MutationCreateWhiteboardDraftOnCalloutsSetArgs = {
  draftData: CreateWhiteboardDraftOnCalloutsSetInput;
};

export type MutationCreateWhiteboardDraftOnTemplatesSetArgs = {
  draftData: CreateWhiteboardDraftOnTemplatesSetInput;
};

export type MutationCreateWingbackAccountArgs = {
  accountID: Scalars['UUID'];
};

export type MutationDeleteApplicationArgs = {
  deleteData: DeleteApplicationInput;
};

export type MutationDeleteCalendarEventArgs = {
  deleteData: DeleteCalendarEventInput;
};

export type MutationDeleteCalloutArgs = {
  deleteData: DeleteCalloutInput;
};

export type MutationDeleteClassificationEntryArgs = {
  classificationData: DeleteClassificationEntryInput;
};

export type MutationDeleteCollaboraDocumentArgs = {
  deleteData: DeleteCollaboraDocumentInput;
};

export type MutationDeleteContributionArgs = {
  deleteData: DeleteContributionInput;
};

export type MutationDeleteConversationArgs = {
  deleteData: DeleteConversationInput;
};

export type MutationDeleteDiscussionArgs = {
  deleteData: DeleteDiscussionInput;
};

export type MutationDeleteDocumentArgs = {
  deleteData: DeleteDocumentInput;
};

export type MutationDeleteInnovationHubArgs = {
  deleteData: DeleteInnovationHubInput;
};

export type MutationDeleteInnovationPackArgs = {
  deleteData: DeleteInnovationPackInput;
};

export type MutationDeleteInvitationArgs = {
  deleteData: DeleteInvitationInput;
};

export type MutationDeleteLicensePlanArgs = {
  deleteData: DeleteLicensePlanInput;
};

export type MutationDeleteLinkArgs = {
  deleteData: DeleteLinkInput;
};

export type MutationDeleteMemoArgs = {
  memoData: DeleteMemoInput;
};

export type MutationDeleteOrganizationArgs = {
  deleteData: DeleteOrganizationInput;
};

export type MutationDeletePlatformInvitationArgs = {
  deleteData: DeletePlatformInvitationInput;
};

export type MutationDeletePostArgs = {
  deleteData: DeletePostInput;
};

export type MutationDeleteReferenceArgs = {
  deleteData: DeleteReferenceInput;
};

export type MutationDeleteSpaceArgs = {
  deleteData: DeleteSpaceInput;
};

export type MutationDeleteStateOnInnovationFlowArgs = {
  stateData: DeleteStateOnInnovationFlowInput;
};

export type MutationDeleteStorageBucketArgs = {
  deleteData: DeleteStorageBuckeetInput;
};

export type MutationDeleteTaskColumnOnCalloutArgs = {
  columnData: DeleteTaskColumnOnCalloutInput;
};

export type MutationDeleteTemplateArgs = {
  deleteData: DeleteTemplateInput;
};

export type MutationDeleteUserArgs = {
  deleteData: DeleteUserInput;
};

export type MutationDeleteUserGroupArgs = {
  deleteData: DeleteUserGroupInput;
};

export type MutationDeleteVirtualContributorArgs = {
  deleteData: DeleteVirtualContributorInput;
};

export type MutationDeleteVisualFromMediaGalleryArgs = {
  deleteData: DeleteVisualFromMediaGalleryInput;
};

export type MutationDeleteWhiteboardArgs = {
  whiteboardData: DeleteWhiteboardInput;
};

export type MutationDeleteWhiteboardDraftArgs = {
  whiteboardID: Scalars['UUID'];
};

export type MutationEnablePushSubscriptionArgs = {
  subscriptionData: UnsubscribeFromPushNotificationsInput;
};

export type MutationEventOnApplicationArgs = {
  eventData: ApplicationEventInput;
};

export type MutationEventOnInvitationArgs = {
  eventData: InvitationEventInput;
};

export type MutationEventOnOrganizationVerificationArgs = {
  eventData: OrganizationVerificationEventInput;
};

export type MutationGrantCredentialToActorArgs = {
  actorID: Scalars['UUID'];
  credentialType: CredentialType;
  resourceID?: InputMaybe<Scalars['UUID']>;
};

export type MutationGrantCredentialToOrganizationArgs = {
  grantCredentialData: GrantOrganizationAuthorizationCredentialInput;
};

export type MutationGrantCredentialToUserArgs = {
  grantCredentialData: GrantAuthorizationCredentialInput;
};

export type MutationImportCollaboraDocumentArgs = {
  file: Scalars['Upload'];
  uploadData: ImportCollaboraDocumentInput;
};

export type MutationInviteForEntryRoleOnRoleSetArgs = {
  invitationData: InviteForEntryRoleOnRoleSetInput;
};

export type MutationJoinRoleSetArgs = {
  joinData: JoinAsEntryRoleOnRoleSetInput;
};

export type MutationLeaveConversationArgs = {
  leaveData: LeaveConversationInput;
};

export type MutationLicenseResetOnAccountArgs = {
  resetData: AccountLicenseResetInput;
};

export type MutationMarkMessageAsReadInRoomArgs = {
  messageData: RoomMarkMessageReadInput;
};

export type MutationMarkNotificationsAsReadArgs = {
  filter?: InputMaybe<NotificationEventsFilterInput>;
};

export type MutationMarkNotificationsAsUnreadArgs = {
  filter?: InputMaybe<NotificationEventsFilterInput>;
};

export type MutationMintMcpApiKeyArgs = {
  mintData: MintMcpApiKeyInput;
};

export type MutationMoveContributionToCalloutArgs = {
  moveContributionData: MoveCalloutContributionInput;
};

export type MutationMoveSpaceL1ToSpaceL0Args = {
  moveData: MoveSpaceL1ToSpaceL0Input;
};

export type MutationMoveSpaceL1ToSpaceL2Args = {
  moveData: MoveSpaceL1ToSpaceL2Input;
};

export type MutationMoveSpaceL2ToSpaceL1Args = {
  moveData: MoveSpaceL2ToSpaceL1Input;
};

export type MutationMoveTaskToColumnArgs = {
  moveData: MoveTaskToColumnInput;
};

export type MutationRefreshVirtualContributorBodyOfKnowledgeArgs = {
  refreshData: RefreshVirtualContributorBodyOfKnowledgeInput;
};

export type MutationRemoveCommunityGuidelinesContentArgs = {
  communityGuidelinesData: RemoveCommunityGuidelinesContentInput;
};

export type MutationRemoveConversationMemberArgs = {
  memberData: RemoveConversationMemberInput;
};

export type MutationRemoveDefaultCalloutTemplateOnInnovationFlowStateArgs = {
  removeData: RemoveDefaultCalloutTemplateOnInnovationFlowStateInput;
};

export type MutationRemoveIframeAllowedUrlArgs = {
  whitelistedURL: Scalars['String'];
};

export type MutationRemoveMessageOnRoomArgs = {
  messageData: RoomRemoveMessageInput;
};

export type MutationRemoveNotificationEmailFromBlacklistArgs = {
  input: NotificationEmailAddressInput;
};

export type MutationRemovePlatformRoleFromUserArgs = {
  roleData: RemovePlatformRoleInput;
};

export type MutationRemovePollOptionArgs = {
  optionData: RemovePollOptionInput;
};

export type MutationRemovePollVoteArgs = {
  voteData: RemovePollVoteInput;
};

export type MutationRemoveReactionFromCalloutArgs = {
  reactionData: RemoveReactionFromCalloutInput;
};

export type MutationRemoveReactionToMessageInRoomArgs = {
  reactionData: RoomRemoveReactionToMessageInput;
};

export type MutationRemoveRoleArgs = {
  roleData: RemoveRoleOnRoleSetInput;
};

export type MutationRemoveRoleFromOrganizationArgs = {
  roleData: RemoveRoleOnRoleSetInput;
};

export type MutationRemoveRoleFromUserArgs = {
  roleData: RemoveRoleOnRoleSetInput;
};

export type MutationRemoveRoleFromVirtualContributorArgs = {
  roleData: RemoveRoleOnRoleSetInput;
};

export type MutationRemoveUserFromGroupArgs = {
  membershipData: RemoveUserGroupMemberInput;
};

export type MutationReorderPollOptionsArgs = {
  optionData: ReorderPollOptionsInput;
};

export type MutationReplaceCollaboraDocumentArgs = {
  file: Scalars['Upload'];
  replaceData: ReplaceCollaboraDocumentInput;
};

export type MutationReplaceWhiteboardContentFromSourceArgs = {
  input: ReplaceWhiteboardContentFromSourceInput;
};

export type MutationResetConversationVcArgs = {
  input: ConversationVcResetInput;
};

export type MutationRevokeCredentialFromActorArgs = {
  actorID: Scalars['UUID'];
  credentialType: CredentialType;
  resourceID?: InputMaybe<Scalars['UUID']>;
};

export type MutationRevokeCredentialFromOrganizationArgs = {
  revokeCredentialData: RevokeOrganizationAuthorizationCredentialInput;
};

export type MutationRevokeCredentialFromUserArgs = {
  revokeCredentialData: RevokeAuthorizationCredentialInput;
};

export type MutationRevokeLicensePlanFromAccountArgs = {
  planData: RevokeLicensePlanFromAccount;
};

export type MutationRevokeLicensePlanFromSpaceArgs = {
  planData: RevokeLicensePlanFromSpace;
};

export type MutationRevokeMcpApiKeyArgs = {
  revokeData: RevokeMcpApiKeyInput;
};

export type MutationSendDirectMessageToUsersArgs = {
  messageData: SendDirectMessageToUsersInput;
};

export type MutationSendMessageReplyToRoomArgs = {
  messageData: RoomSendMessageReplyInput;
};

export type MutationSendMessageToCommunityLeadsArgs = {
  messageData: CommunicationSendMessageToCommunityLeadsInput;
};

export type MutationSendMessageToOrganizationArgs = {
  messageData: CommunicationSendMessageToOrganizationInput;
};

export type MutationSendMessageToRoomArgs = {
  messageData: RoomSendMessageInput;
};

export type MutationSendMessageToUsersArgs = {
  messageData: CommunicationSendMessageToUsersInput;
};

export type MutationSetDefaultCalloutTemplateOnInnovationFlowStateArgs = {
  setData: SetDefaultCalloutTemplateOnInnovationFlowStateInput;
};

export type MutationSetPlatformWellKnownVirtualContributorArgs = {
  mappingData: SetPlatformWellKnownVirtualContributorInput;
};

export type MutationSubscribeToPushNotificationsArgs = {
  subscriptionData: SubscribeToPushNotificationsInput;
};

export type MutationTransferCalloutArgs = {
  transferData: TransferCalloutInput;
};

export type MutationTransferInnovationHubToAccountArgs = {
  transferData: TransferAccountInnovationHubInput;
};

export type MutationTransferInnovationPackToAccountArgs = {
  transferData: TransferAccountInnovationPackInput;
};

export type MutationTransferSpaceToAccountArgs = {
  transferData: TransferAccountSpaceInput;
};

export type MutationTransferVirtualContributorToAccountArgs = {
  transferData: TransferAccountVirtualContributorInput;
};

export type MutationUnsubscribeFromPushNotificationsArgs = {
  subscriptionData: UnsubscribeFromPushNotificationsInput;
};

export type MutationUpdateApplicationFormOnRoleSetArgs = {
  applicationFormData: UpdateApplicationFormOnRoleSetInput;
};

export type MutationUpdateAssistantActorCapabilitiesArgs = {
  grantData: GrantAssistantActorCapabilitiesInput;
};

export type MutationUpdateBaselineLicensePlanOnAccountArgs = {
  updateData: UpdateBaselineLicensePlanOnAccount;
};

export type MutationUpdateCalendarEventArgs = {
  eventData: UpdateCalendarEventInput;
};

export type MutationUpdateCalloutArgs = {
  calloutData: UpdateCalloutEntityInput;
};

export type MutationUpdateCalloutPublishInfoArgs = {
  calloutData: UpdateCalloutPublishInfoInput;
};

export type MutationUpdateCalloutVisibilityArgs = {
  calloutData: UpdateCalloutVisibilityInput;
};

export type MutationUpdateCalloutsSortOrderArgs = {
  sortOrderData: UpdateCalloutsSortOrderInput;
};

export type MutationUpdateClassificationEntryArgs = {
  classificationData: UpdateClassificationEntryInput;
};

export type MutationUpdateClassificationEntryDisplayArgs = {
  classificationData: UpdateClassificationEntryDisplayInput;
};

export type MutationUpdateClassificationEntrySelectionArgs = {
  classificationData: UpdateClassificationEntrySelectionInput;
};

export type MutationUpdateClassificationTagsetArgs = {
  updateData: UpdateClassificationSelectTagsetValueInput;
};

export type MutationUpdateCollaboraDocumentArgs = {
  updateData: UpdateCollaboraDocumentInput;
};

export type MutationUpdateCollaborationFromSpaceTemplateArgs = {
  updateData: UpdateCollaborationFromSpaceTemplateInput;
};

export type MutationUpdateCommunityGuidelinesArgs = {
  communityGuidelinesData: UpdateCommunityGuidelinesEntityInput;
};

export type MutationUpdateContributionsSortOrderArgs = {
  sortOrderData: UpdateContributionCalloutsSortOrderInput;
};

export type MutationUpdateConversationArgs = {
  updateData: UpdateConversationInput;
};

export type MutationUpdateDiscussionArgs = {
  updateData: UpdateDiscussionInput;
};

export type MutationUpdateDocumentArgs = {
  documentData: UpdateDocumentInput;
};

export type MutationUpdateInnovationFlowArgs = {
  innovationFlowData: UpdateInnovationFlowInput;
};

export type MutationUpdateInnovationFlowCurrentStateArgs = {
  innovationFlowStateData: UpdateInnovationFlowCurrentStateInput;
};

export type MutationUpdateInnovationFlowStateArgs = {
  stateData: UpdateInnovationFlowStateInput;
};

export type MutationUpdateInnovationFlowStatesSortOrderArgs = {
  sortOrderData: UpdateInnovationFlowStatesSortOrderInput;
};

export type MutationUpdateInnovationHubArgs = {
  updateData: UpdateInnovationHubInput;
};

export type MutationUpdateInnovationPackArgs = {
  innovationPackData: UpdateInnovationPackInput;
};

export type MutationUpdateLicensePlanArgs = {
  updateData: UpdateLicensePlanInput;
};

export type MutationUpdateLinkArgs = {
  linkData: UpdateLinkInput;
};

export type MutationUpdateMemoArgs = {
  memoData: UpdateMemoEntityInput;
};

export type MutationUpdateNotificationStateArgs = {
  notificationData: UpdateNotificationStateInput;
};

export type MutationUpdateOrganizationArgs = {
  organizationData: UpdateOrganizationInput;
};

export type MutationUpdateOrganizationPlatformSettingsArgs = {
  organizationData: UpdateOrganizationPlatformSettingsInput;
};

export type MutationUpdateOrganizationSettingsArgs = {
  settingsData: UpdateOrganizationSettingsInput;
};

export type MutationUpdatePlatformSettingsArgs = {
  settingsData: UpdatePlatformSettingsInput;
};

export type MutationUpdatePollOptionArgs = {
  optionData: UpdatePollOptionInput;
};

export type MutationUpdatePollStatusArgs = {
  statusData: UpdatePollStatusInput;
};

export type MutationUpdatePostArgs = {
  postData: UpdatePostInput;
};

export type MutationUpdateProfileArgs = {
  profileData: UpdateProfileDirectInput;
};

export type MutationUpdateReferenceArgs = {
  referenceData: UpdateReferenceInput;
};

export type MutationUpdateSpaceArgs = {
  spaceData: UpdateSpaceInput;
};

export type MutationUpdateSpacePlatformSettingsArgs = {
  updateData: UpdateSpacePlatformSettingsInput;
};

export type MutationUpdateSpaceSettingsArgs = {
  settingsData: UpdateSpaceSettingsInput;
};

export type MutationUpdateSubspacePinnedArgs = {
  pinnedData: UpdateSubspacePinnedInput;
};

export type MutationUpdateSubspacesSortOrderArgs = {
  sortOrderData: UpdateSubspacesSortOrderInput;
};

export type MutationUpdateTagsetArgs = {
  updateData: UpdateTagsetInput;
};

export type MutationUpdateTaskColumnOnCalloutArgs = {
  columnData: UpdateTaskColumnOnCalloutInput;
};

export type MutationUpdateTaskColumnsSortOrderOnCalloutArgs = {
  sortOrderData: UpdateTaskColumnsSortOrderOnCalloutInput;
};

export type MutationUpdateTemplateArgs = {
  updateData: UpdateTemplateInput;
};

export type MutationUpdateTemplateContentSpaceArgs = {
  templateContentSpaceData: UpdateTemplateContentSpaceInput;
};

export type MutationUpdateTemplateDefaultArgs = {
  templateDefaultData: UpdateTemplateDefaultTemplateInput;
};

export type MutationUpdateTemplateFromSpaceArgs = {
  updateData: UpdateTemplateFromSpaceInput;
};

export type MutationUpdateUserArgs = {
  userData: UpdateUserInput;
};

export type MutationUpdateUserGroupArgs = {
  userGroupData: UpdateUserGroupInput;
};

export type MutationUpdateUserPlatformSettingsArgs = {
  updateData: UpdateUserPlatformSettingsInput;
};

export type MutationUpdateUserSettingsArgs = {
  settingsData: UpdateUserSettingsInput;
};

export type MutationUpdateVirtualContributorArgs = {
  virtualContributorData: UpdateVirtualContributorInput;
};

export type MutationUpdateVirtualContributorPlatformSettingsArgs = {
  settingsData: UpdateVirtualContributorPlatformSettingsInput;
};

export type MutationUpdateVirtualContributorSettingsArgs = {
  settingsData: UpdateVirtualContributorSettingsInput;
};

export type MutationUpdateVisualArgs = {
  updateData: UpdateVisualInput;
};

export type MutationUpdateWhiteboardArgs = {
  whiteboardData: UpdateWhiteboardEntityInput;
};

export type MutationUpdateWhiteboardGuestAccessArgs = {
  input: UpdateWhiteboardGuestAccessInput;
};

export type MutationUploadFileOnLinkArgs = {
  file: Scalars['Upload'];
  uploadData: StorageBucketUploadFileOnLinkInput;
};

export type MutationUploadFileOnReferenceArgs = {
  file: Scalars['Upload'];
  uploadData: StorageBucketUploadFileOnReferenceInput;
};

export type MutationUploadFileOnStorageBucketArgs = {
  file: Scalars['Upload'];
  uploadData: StorageBucketUploadFileInput;
};

export type MutationUploadImageOnVisualArgs = {
  file: Scalars['Upload'];
  uploadData: VisualUploadImageInput;
};

export enum MutationType {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

export type MySpaceResults = {
  latestActivity?: Maybe<ActivityLogEntry>;
  space: Space;
};

export type Nvp = {
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  value: Scalars['String'];
};

export type NotificationEmailAddressInput = {
  /** Full email address to add/remove; lowercase enforced by server */
  email: Scalars['String'];
};

export enum NotificationEvent {
  OrganizationAdminMentioned = 'ORGANIZATION_ADMIN_MENTIONED',
  OrganizationAdminMessage = 'ORGANIZATION_ADMIN_MESSAGE',
  OrganizationMessageSender = 'ORGANIZATION_MESSAGE_SENDER',
  PlatformAdminGlobalRoleChanged = 'PLATFORM_ADMIN_GLOBAL_ROLE_CHANGED',
  PlatformAdminSpaceCreated = 'PLATFORM_ADMIN_SPACE_CREATED',
  PlatformAdminUserProfileCreated = 'PLATFORM_ADMIN_USER_PROFILE_CREATED',
  PlatformAdminUserProfileRemoved = 'PLATFORM_ADMIN_USER_PROFILE_REMOVED',
  PlatformForumDiscussionComment = 'PLATFORM_FORUM_DISCUSSION_COMMENT',
  PlatformForumDiscussionCreated = 'PLATFORM_FORUM_DISCUSSION_CREATED',
  SpaceAdminCollaborationCalloutContribution = 'SPACE_ADMIN_COLLABORATION_CALLOUT_CONTRIBUTION',
  SpaceAdminCommunityApplication = 'SPACE_ADMIN_COMMUNITY_APPLICATION',
  SpaceAdminCommunityNewMember = 'SPACE_ADMIN_COMMUNITY_NEW_MEMBER',
  SpaceAdminVirtualCommunityInvitationDeclined = 'SPACE_ADMIN_VIRTUAL_COMMUNITY_INVITATION_DECLINED',
  SpaceCollaborationCalloutComment = 'SPACE_COLLABORATION_CALLOUT_COMMENT',
  SpaceCollaborationCalloutContribution = 'SPACE_COLLABORATION_CALLOUT_CONTRIBUTION',
  SpaceCollaborationCalloutPostContributionComment = 'SPACE_COLLABORATION_CALLOUT_POST_CONTRIBUTION_COMMENT',
  SpaceCollaborationCalloutPublished = 'SPACE_COLLABORATION_CALLOUT_PUBLISHED',
  SpaceCollaborationCalloutReaction = 'SPACE_COLLABORATION_CALLOUT_REACTION',
  SpaceCollaborationPollModifiedOnPollIVotedOn = 'SPACE_COLLABORATION_POLL_MODIFIED_ON_POLL_I_VOTED_ON',
  SpaceCollaborationPollVoteAffectedByOptionChange = 'SPACE_COLLABORATION_POLL_VOTE_AFFECTED_BY_OPTION_CHANGE',
  SpaceCollaborationPollVoteCastOnOwnPoll = 'SPACE_COLLABORATION_POLL_VOTE_CAST_ON_OWN_POLL',
  SpaceCollaborationPollVoteCastOnPollIVotedOn = 'SPACE_COLLABORATION_POLL_VOTE_CAST_ON_POLL_I_VOTED_ON',
  SpaceCommunicationUpdate = 'SPACE_COMMUNICATION_UPDATE',
  SpaceCommunityCalendarEventComment = 'SPACE_COMMUNITY_CALENDAR_EVENT_COMMENT',
  SpaceCommunityCalendarEventCreated = 'SPACE_COMMUNITY_CALENDAR_EVENT_CREATED',
  SpaceCommunityInvitationUserPlatform = 'SPACE_COMMUNITY_INVITATION_USER_PLATFORM',
  SpaceLeadCommunicationMessage = 'SPACE_LEAD_COMMUNICATION_MESSAGE',
  UserCommentReply = 'USER_COMMENT_REPLY',
  UserConversationMessageDirect = 'USER_CONVERSATION_MESSAGE_DIRECT',
  UserConversationMessageGroup = 'USER_CONVERSATION_MESSAGE_GROUP',
  UserEmailChangeGlobalAdminNotification = 'USER_EMAIL_CHANGE_GLOBAL_ADMIN_NOTIFICATION',
  UserEmailChangeNewAddressNotification = 'USER_EMAIL_CHANGE_NEW_ADDRESS_NOTIFICATION',
  UserEmailChangeSecuritySignal = 'USER_EMAIL_CHANGE_SECURITY_SIGNAL',
  UserEmailChangeSpaceAdminNotification = 'USER_EMAIL_CHANGE_SPACE_ADMIN_NOTIFICATION',
  UserMentioned = 'USER_MENTIONED',
  UserMessage = 'USER_MESSAGE',
  UserPasswordChangeSecuritySignal = 'USER_PASSWORD_CHANGE_SECURITY_SIGNAL',
  UserSignUpWelcome = 'USER_SIGN_UP_WELCOME',
  UserSpaceCommunityApplicationDeclined = 'USER_SPACE_COMMUNITY_APPLICATION_DECLINED',
  UserSpaceCommunityInvitation = 'USER_SPACE_COMMUNITY_INVITATION',
  UserSpaceCommunityJoined = 'USER_SPACE_COMMUNITY_JOINED',
  VirtualAdminSpaceCommunityInvitation = 'VIRTUAL_ADMIN_SPACE_COMMUNITY_INVITATION',
}

/** A categorization of notification type. */
export enum NotificationEventCategory {
  Organization = 'ORGANIZATION',
  Platform = 'PLATFORM',
  SpaceAdmin = 'SPACE_ADMIN',
  SpaceMember = 'SPACE_MEMBER',
  User = 'USER',
  VirtualContributor = 'VIRTUAL_CONTRIBUTOR',
}

export enum NotificationEventInAppState {
  Archived = 'ARCHIVED',
  Read = 'READ',
  Unread = 'UNREAD',
}

export enum NotificationEventPayload {
  OrganizationMessageDirect = 'ORGANIZATION_MESSAGE_DIRECT',
  OrganizationMessageRoom = 'ORGANIZATION_MESSAGE_ROOM',
  PlatformForumDiscussion = 'PLATFORM_FORUM_DISCUSSION',
  PlatformGlobalRoleChange = 'PLATFORM_GLOBAL_ROLE_CHANGE',
  PlatformUserProfileRemoved = 'PLATFORM_USER_PROFILE_REMOVED',
  Space = 'SPACE',
  SpaceCollaborationCallout = 'SPACE_COLLABORATION_CALLOUT',
  SpaceCollaborationCalloutComment = 'SPACE_COLLABORATION_CALLOUT_COMMENT',
  SpaceCollaborationCalloutPostComment = 'SPACE_COLLABORATION_CALLOUT_POST_COMMENT',
  SpaceCollaborationCalloutReaction = 'SPACE_COLLABORATION_CALLOUT_REACTION',
  SpaceCollaborationPoll = 'SPACE_COLLABORATION_POLL',
  SpaceCommunicationMessageDirect = 'SPACE_COMMUNICATION_MESSAGE_DIRECT',
  SpaceCommunicationUpdate = 'SPACE_COMMUNICATION_UPDATE',
  SpaceCommunityActor = 'SPACE_COMMUNITY_ACTOR',
  SpaceCommunityApplication = 'SPACE_COMMUNITY_APPLICATION',
  SpaceCommunityCalendarEvent = 'SPACE_COMMUNITY_CALENDAR_EVENT',
  SpaceCommunityCalendarEventComment = 'SPACE_COMMUNITY_CALENDAR_EVENT_COMMENT',
  SpaceCommunityInvitation = 'SPACE_COMMUNITY_INVITATION',
  SpaceCommunityInvitationUserPlatform = 'SPACE_COMMUNITY_INVITATION_USER_PLATFORM',
  User = 'USER',
  UserEmailChangeGlobalAdminNotification = 'USER_EMAIL_CHANGE_GLOBAL_ADMIN_NOTIFICATION',
  UserEmailChangeNewAddressNotification = 'USER_EMAIL_CHANGE_NEW_ADDRESS_NOTIFICATION',
  UserEmailChangeSecuritySignal = 'USER_EMAIL_CHANGE_SECURITY_SIGNAL',
  UserMessageDirect = 'USER_MESSAGE_DIRECT',
  UserMessageRoom = 'USER_MESSAGE_ROOM',
  VirtualContributor = 'VIRTUAL_CONTRIBUTOR',
}

export type NotificationEventsFilterInput = {
  /** Return Notifications with a type matching one of the provided types. */
  types?: InputMaybe<Array<NotificationEvent>>;
};

export type NotificationRecipientResult = {
  /** The email recipients for the notification. */
  emailRecipients: Array<User>;
  /** The in-app recipients for the notification. */
  inAppRecipients: Array<User>;
  /** The push recipients for the notification. */
  pushRecipients: Array<User>;
  /** The user that triggered the event. */
  triggeredBy?: Maybe<User>;
};

export type NotificationRecipientsInput = {
  /** The type of notification setting to look up recipients for. */
  eventType: NotificationEvent;
  /** The ID of the Organization to use to determine recipients. */
  organizationID?: InputMaybe<Scalars['UUID']>;
  /** The ID of the space to retrieve the recipients for. */
  spaceID?: InputMaybe<Scalars['UUID']>;
  /** The ID of the User that triggered the event. */
  triggeredBy?: InputMaybe<Scalars['UUID']>;
  /** The ID of the specific user recipient for user-related notifications (e.g., invitations, mentions). */
  userID?: InputMaybe<Scalars['UUID']>;
  /** Plural recipient user IDs (e.g. conversation-message events) — resolved via a single OR-combined credentials query. Bounded to at most 100 entries; larger conversations must be fanned out by the caller in bounded batches. */
  userIDs?: InputMaybe<Array<Scalars['UUID']>>;
  /** The ID of the Virtual Contributor to use to determine recipients. */
  virtualContributorID?: InputMaybe<Scalars['UUID']>;
};

export type NotificationSettingInput = {
  /** Enable email notifications for this setting */
  email?: InputMaybe<Scalars['Boolean']>;
  /** Enable in-app notifications for this setting */
  inApp?: InputMaybe<Scalars['Boolean']>;
  /** Enable push notifications for this setting */
  push?: InputMaybe<Scalars['Boolean']>;
};

export enum OpenAiModel {
  Gpt_5 = 'GPT_5',
  Gpt_5_1 = 'GPT_5_1',
  Gpt_5_1Mini = 'GPT_5_1_MINI',
  Gpt_5_2 = 'GPT_5_2',
  Gpt_5_2Pro = 'GPT_5_2_PRO',
  Gpt_5_4 = 'GPT_5_4',
  Gpt_5_4Mini = 'GPT_5_4_MINI',
  Gpt_5_4Nano = 'GPT_5_4_NANO',
  Gpt_5_4Pro = 'GPT_5_4_PRO',
  Gpt_5_5 = 'GPT_5_5',
  Gpt_5_5Pro = 'GPT_5_5_PRO',
  Gpt_5Mini = 'GPT_5_MINI',
  Gpt_5Nano = 'GPT_5_NANO',
  Gpt_5Pro = 'GPT_5_PRO',
  O3 = 'O3',
  O3Mini = 'O3_MINI',
  O3Pro = 'O3_PRO',
  O4Mini = 'O4_MINI',
}

export type Organization = ActorFull &
  Groupable & {
    /** The account hosted by this Organization. */
    account?: Maybe<Account>;
    /** The Actor representing this User. */
    actor: Actor;
    /** The authorization rules for the Actor */
    authorization?: Maybe<Authorization>;
    /** Organization contact email */
    contactEmail?: Maybe<Scalars['String']>;
    /** The date at which the entity was created. */
    createdDate: Scalars['DateTime'];
    /** The credentials held by this Actor */
    credentials?: Maybe<Array<Credential>>;
    /** Domain name; what is verified, eg. alkem.io */
    domain?: Maybe<Scalars['String']>;
    /** Group defined on this organization. */
    group?: Maybe<UserGroup>;
    /** Groups defined on this organization. */
    groups?: Maybe<Array<UserGroup>>;
    /** The ID of the Actor */
    id: Scalars['UUID'];
    /** Legal name - required if hosting an Space */
    legalEntityName?: Maybe<Scalars['String']>;
    /** Metrics about the activity within this Organization. */
    metrics?: Maybe<Array<Nvp>>;
    /** A name identifier of the entity, unique within a given scope. */
    nameID: Scalars['NameID'];
    /** The profile for this Actor. */
    profile?: Maybe<Profile>;
    /** The RoleSet for this Organization. */
    roleSet: RoleSet;
    /** The settings for this Organization. */
    settings: OrganizationSettings;
    /** The StorageAggregator for managing storage buckets in use by this Organization */
    storageAggregator?: Maybe<StorageAggregator>;
    /** The type of Actor */
    type: ActorType;
    /** The date at which the entity was last updated. */
    updatedDate: Scalars['DateTime'];
    verification: OrganizationVerification;
    /** Organization website */
    website?: Maybe<Scalars['String']>;
  };

export type OrganizationGroupArgs = {
  ID: Scalars['UUID'];
};

export type OrganizationAuthorizationResetInput = {
  /** The identifier of the Organization whose Authorization Policy should be reset. */
  organizationID: Scalars['UUID'];
};

export type OrganizationFilterInput = {
  contactEmail?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  nameID?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type OrganizationSettings = {
  /** The membership settings for this Organization. */
  membership: OrganizationSettingsMembership;
  /** The privacy settings for this Organization */
  privacy: OrganizationSettingsPrivacy;
};

export type OrganizationSettingsMembership = {
  /** Allow Users with email addresses matching the domain of this Organization to join. */
  allowUsersMatchingDomainToJoin: Scalars['Boolean'];
};

export type OrganizationSettingsPrivacy = {
  /** Allow contribution roles (membership, lead etc) in Spaces to be visible. */
  contributionRolesPubliclyVisible: Scalars['Boolean'];
};

export type OrganizationVerification = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Is this lifecycle in a final state (done). */
  isFinalized: Scalars['Boolean'];
  lifecycle: Lifecycle;
  /** The next events of this Lifecycle. */
  nextEvents: Array<Scalars['String']>;
  /** The current state of this Lifecycle. */
  state: Scalars['String'];
  /** Organization verification type */
  status: OrganizationVerificationEnum;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export enum OrganizationVerificationEnum {
  NotVerified = 'NOT_VERIFIED',
  VerifiedManualAttestation = 'VERIFIED_MANUAL_ATTESTATION',
}

export type OrganizationVerificationEventInput = {
  eventName: Scalars['String'];
  organizationVerificationID: Scalars['UUID'];
};

export type OrganizationsInRolesResponse = {
  organizations: Array<Organization>;
  role: RoleName;
};

export type OryConfig = {
  /** Ory Issuer. */
  issuer: Scalars['String'];
  /** Ory Kratos Public Base URL. Used by all Kratos Public Clients. */
  kratosPublicBaseURL: Scalars['String'];
};

export type PageInfo = {
  /** The last cursor of the page result */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicate whether more items exist after the returned ones */
  hasNextPage: Scalars['Boolean'];
  /** Indicate whether more items exist before the returned ones */
  hasPreviousPage: Scalars['Boolean'];
  /** The first cursor of the page result */
  startCursor?: Maybe<Scalars['String']>;
};

export type PaginatedInAppNotifications = {
  inAppNotifications: Array<InAppNotification>;
  pageInfo: PageInfo;
  total: Scalars['Float'];
};

export type PaginatedInnovationPacks = {
  innovationPacks: Array<InnovationPack>;
  pageInfo: PageInfo;
  total: Scalars['Float'];
};

export type PaginatedLibraryTemplateResults = {
  pageInfo: PageInfo;
  templateResults: Array<TemplateResult>;
  total: Scalars['Float'];
};

export type PaginatedOrganization = {
  organization: Array<Organization>;
  pageInfo: PageInfo;
  total: Scalars['Float'];
};

export type PaginatedSpaces = {
  pageInfo: PageInfo;
  spaces: Array<Space>;
  total: Scalars['Float'];
};

export type PaginatedUsers = {
  pageInfo: PageInfo;
  total: Scalars['Float'];
  users: Array<User>;
};

export type PaginatedVirtualContributor = {
  pageInfo: PageInfo;
  total: Scalars['Float'];
  virtualContributors: Array<VirtualContributor>;
};

export type Platform = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** Alkemio configuration. Provides configuration to external services in the Alkemio ecosystem. */
  configuration: Config;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The Forum for the platform */
  forum: Forum;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Details about the current Innovation Hub you are in. */
  innovationHub?: Maybe<InnovationHub>;
  /** The latest release discussion. */
  latestReleaseDiscussion?: Maybe<LatestReleaseDiscussion>;
  /** The Innovation Library for the platform */
  library: Library;
  /** The Licensing in use by the platform. */
  licensingFramework: Licensing;
  messaging?: Maybe<Messaging>;
  /** Alkemio Services Metadata. */
  metadata: Metadata;
  /** The RoleSet for this Platform. */
  roleSet: RoleSet;
  /** The settings of the Platform. */
  settings: PlatformSettings;
  /** The StorageAggregator with documents in use by Users + Organizations on the Platform. */
  storageAggregator: StorageAggregator;
  /** The TemplatesManager in use by the Platform */
  templatesManager?: Maybe<TemplatesManager>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** Whether the current user may use the web AI assistant (the ACCESS_VIRTUAL_ASSISTANT privilege, 004-web-ai-assistant). client-web reads this to gate every assistant UI cue. */
  virtualAssistantAccess: Scalars['Boolean'];
  /** The mappings of well-known Virtual Contributors to their UUIDs. */
  wellKnownVirtualContributors: PlatformWellKnownVirtualContributors;
};

export type PlatformInnovationHubArgs = {
  id?: InputMaybe<Scalars['UUID']>;
  subdomain?: InputMaybe<Scalars['String']>;
};

export type PlatformAccessRole = {
  /** The privileges to be granted for this Platform Access Role. */
  grantedPrivileges: Array<AuthorizationPrivilege>;
  /** The role name for this Platform Access Role. */
  roleName: RoleName;
};

export type PlatformAdminCommunicationQueryResults = {
  /** All Users that are members of a given room */
  adminCommunicationMembership: CommunicationAdminMembershipResult;
  /** Usage of the messaging platform that are not tied to the domain model. */
  adminCommunicationOrphanedUsage: CommunicationAdminOrphanedUsageResult;
};

export type PlatformAdminCommunicationQueryResultsAdminCommunicationMembershipArgs =
  {
    communicationData: CommunicationAdminMembershipInput;
  };

export type PlatformAdminIdentityQueryResults = {
  /** Get identities from Kratos with optional filtering. */
  identities: Array<KratosIdentity>;
};

export type PlatformAdminIdentityQueryResultsIdentitiesArgs = {
  filter?: InputMaybe<IdentityVerificationStatusFilter>;
};

export type PlatformAdminQueryResults = {
  /** Retrieve all Accounts on the Platform. This is only available to Platform Admins. */
  accounts: Array<Account>;
  /** Lookup Communication related information. */
  communication: PlatformAdminCommunicationQueryResults;
  /** Lookup Identity related information. */
  identity: PlatformAdminIdentityQueryResults;
  /** Retrieve all Innovation Hubs on the Platform. This is only available to Platform Admins. */
  innovationHubs: Array<InnovationHub>;
  /** Retrieve all Innovation Packs on the Platform. This is only available to Platform Admins. */
  innovationPacks: Array<InnovationPack>;
  /** The most recent email-change audit entry for the named subject user. Returns null if no audit entry exists. */
  latestUserEmailChangeAuditEntry?: Maybe<UserEmailChangeAuditEntry>;
  /** MCP API keys belonging to the named user. Platform admins only. Keys bound to a system actor are never returned. */
  mcpApiKeys: Array<McpApiKey>;
  /** Retrieve all Organizations on the Platform. This is only available to Platform Admins. */
  organizations: PaginatedOrganization;
  /** Retrieve all Spaces on the Platform. This is only available to Platform Admins. */
  spaces: Array<Space>;
  /** Paginated email-change audit-entry history for the named subject user, ordered by timestamp descending. Cursor pagination per docs/Pagination.md. */
  userEmailChangeAuditEntries: UserEmailChangeAuditEntries;
  /** Retrieve all Users on the Platform. This is only available to Platform Admins. */
  users: PaginatedUsers;
  /** The singleton virtual-assistant actor, including its current admin capability grant and ID. This is only available to Platform Admins, and is the discovery path for updateAssistantActorCapabilities. */
  virtualAssistant: VirtualAssistant;
  /** Retrieve all Virtual Contributors on the Platform. This is only available to Platform Admins. */
  virtualContributors: Array<VirtualContributor>;
};

export type PlatformAdminQueryResultsInnovationPacksArgs = {
  queryData?: InputMaybe<InnovationPacksInput>;
};

export type PlatformAdminQueryResultsLatestUserEmailChangeAuditEntryArgs = {
  userID: Scalars['UUID'];
};

export type PlatformAdminQueryResultsMcpApiKeysArgs = {
  userID: Scalars['UUID'];
};

export type PlatformAdminQueryResultsOrganizationsArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<OrganizationFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<OrganizationVerificationEnum>;
};

export type PlatformAdminQueryResultsSpacesArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  filter?: InputMaybe<SpaceFilterInput>;
};

export type PlatformAdminQueryResultsUserEmailChangeAuditEntriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  userID: Scalars['UUID'];
};

export type PlatformAdminQueryResultsUsersArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<UserFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  withTags?: InputMaybe<Scalars['Boolean']>;
};

export type PlatformAdminQueryResultsVirtualContributorsArgs = {
  filter?: InputMaybe<ActorFilterInput>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type PlatformFeatureFlag = {
  /** Is this feature flag enabled? */
  enabled: Scalars['Boolean'];
  /** The name of the feature flag */
  name: PlatformFeatureFlagName;
};

export enum PlatformFeatureFlagName {
  Communications = 'COMMUNICATIONS',
  CommunicationsDiscussions = 'COMMUNICATIONS_DISCUSSIONS',
  GuidenceEngine = 'GUIDENCE_ENGINE',
  LandingPage = 'LANDING_PAGE',
  Memo = 'MEMO',
  Notifications = 'NOTIFICATIONS',
  Subscriptions = 'SUBSCRIPTIONS',
  Whiteboards = 'WHITEBOARDS',
}

export type PlatformIntegrationSettings = {
  /** The list of allowed URLs for iFrames within Markdown content. */
  iframeAllowedUrls: Array<Scalars['String']>;
  /** List of fully-qualified email addresses blocked from receiving notifications */
  notificationEmailBlacklist: Array<Scalars['String']>;
};

export type PlatformInvitation = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The User who created the platformInvitation. */
  createdBy: User;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The email address of the external user being invited */
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  lastName?: Maybe<Scalars['String']>;
  /** The platform role the user will receive when they sign up */
  platformRole?: Maybe<RoleName>;
  /** Whether a new user profile has been created. */
  profileCreated: Scalars['Boolean'];
  /** Additional roles to assign to the Actor, in addition to the entry Role. */
  roleSetExtraRoles: Array<RoleName>;
  /** Whether to also add the invited user to the parent community. */
  roleSetInvitedToParent: Scalars['Boolean'];
  /** Optional language the inviter expects the invitee to prefer; recorded per invitation. */
  suggestedLanguage?: Maybe<Scalars['String']>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  welcomeMessage?: Maybe<Scalars['String']>;
};

export type PlatformLocations = {
  /** URL to a page about the platform */
  about: Scalars['String'];
  /** URL where users can get tips and tricks */
  aup: Scalars['String'];
  /** URL to the blog of the platform */
  blog: Scalars['String'];
  /** URL where users can see the community forum */
  community: Scalars['String'];
  /** URL for the link Contact in the HomePage and to create a new space with Enterprise plan */
  contactsupport: Scalars['String'];
  /** URL for the documentation site */
  documentation: Scalars['String'];
  /** Main domain of the environment */
  domain: Scalars['String'];
  /** Name of the environment */
  environment: Scalars['String'];
  /** URL to a form for providing feedback */
  feedback: Scalars['String'];
  /** URL to latest forum release discussion where users can get information about the latest release */
  forumreleases: Scalars['String'];
  /** URL for the link Foundation in the HomePage of the application */
  foundation: Scalars['String'];
  /** URL where users can get help */
  help: Scalars['String'];
  /** URL for the link Impact in the HomePage of the application */
  impact: Scalars['String'];
  /** URL to a page about the innovation library */
  innovationLibrary: Scalars['String'];
  /** URL to a page about the collaboration tools */
  inspiration: Scalars['String'];
  /** URL to the landing page of the platform */
  landing: Scalars['String'];
  /** URL where new users can get onboarding help */
  newuser: Scalars['String'];
  /** URL for the link Opensource in the HomePage of the application */
  opensource: Scalars['String'];
  /** URL to the privacy policy for the platform */
  privacy: Scalars['String'];
  /** URL where users can get information about previous releases */
  releases: Scalars['String'];
  /** URL to the security policy for the platform */
  security: Scalars['String'];
  /** URL where users can get support for the platform */
  support: Scalars['String'];
  /** URL for the link Contact in the HomePage to switch between plans */
  switchplan: Scalars['String'];
  /** URL to the terms of usage for the platform */
  terms: Scalars['String'];
  /** URL where users can get tips and tricks */
  tips: Scalars['String'];
};

export type PlatformRolesAccess = {
  /** The platform roles with their associated privileges. */
  roles: Array<PlatformAccessRole>;
};

export type PlatformSettings = {
  /** The integration settings for this Platform */
  integration: PlatformIntegrationSettings;
};

export type PlatformWellKnownVirtualContributorMapping = {
  /** The UUID of the Virtual Contributor. */
  virtualContributorID: Scalars['UUID'];
  /** The well-known identifier for the Virtual Contributor. */
  wellKnown: VirtualContributorWellKnown;
};

export type PlatformWellKnownVirtualContributors = {
  /** The mappings of well-known Virtual Contributors to their UUIDs. */
  mappings: Array<PlatformWellKnownVirtualContributorMapping>;
};

export type Poll = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** Whether the current user can see detailed results (visibility gate passed). */
  canSeeDetailedResults: Scalars['Boolean'];
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** [Future] Date/time after which the poll automatically closes. Always null in this iteration. */
  deadline?: Maybe<Scalars['DateTime']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The current user's vote on this poll, or null if the current user has not voted. */
  myVote?: Maybe<PollVote>;
  /** The selectable options for this poll, always ordered by sortOrder ascending. */
  options: Array<PollOption>;
  /** Configuration settings for this poll (immutable after creation). */
  settings: PollSettings;
  /** Current lifecycle status of this poll. Always OPEN in this iteration; CLOSED reserved for future use. */
  status: PollStatus;
  /** Poll title. */
  title: Scalars['String'];
  /** Total number of votes cast on this poll. Null when resultsVisibility = HIDDEN and the current user has not voted. */
  totalVotes?: Maybe<Scalars['Int']>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

/** The type of event that occurred on a poll. */
export enum PollEventType {
  PollOptionsChanged = 'POLL_OPTIONS_CHANGED',
  PollStatusChanged = 'POLL_STATUS_CHANGED',
  PollVoteUpdated = 'POLL_VOTE_UPDATED',
}

export type PollOption = {
  createdDate: Scalars['DateTime'];
  id: Scalars['UUID'];
  /** Position of this option in the creation order (used for tie-breaking in results). */
  sortOrder: Scalars['Int'];
  text: Scalars['String'];
  updatedDate: Scalars['DateTime'];
  /** Number of votes this option has received. Null when results are hidden or resultsDetail = PERCENTAGE. */
  voteCount?: Maybe<Scalars['Int']>;
  /** Percentage of total votes this option has received (0–100). Null when results are hidden or resultsDetail = COUNT. Null when totalVotes = 0. */
  votePercentage?: Maybe<Scalars['Float']>;
  /** List of space members who voted for this option. Null when results are hidden or resultsDetail is not FULL. */
  voters?: Maybe<Array<User>>;
};

export type PollOptionsChangedSubscriptionResult = {
  /** The updated Poll. Fields are filtered per subscriber's visibility context. */
  poll: Poll;
  /** The type of poll event. */
  pollEventType: PollEventType;
};

/** Controls the level of detail shown in poll results. */
export enum PollResultsDetail {
  /** Vote count per option; no voter identities. */
  Count = 'COUNT',
  /** Counts and voter list per option — fully transparent (default). */
  Full = 'FULL',
  /** Only percentage per option; no vote counts or voter identities. */
  Percentage = 'PERCENTAGE',
}

/** Controls when poll results become visible to voters. */
export enum PollResultsVisibility {
  /** Results hidden until the viewer has cast their own vote. */
  Hidden = 'HIDDEN',
  /** Only the total vote count is shown before voting; details (depending on PollResultsDetail) become available after voting. */
  TotalOnly = 'TOTAL_ONLY',
  /** Full results always visible regardless of whether the viewer has voted (default). */
  Visible = 'VISIBLE',
}

export type PollSettings = {
  /** Whether users with CONTRIBUTE privilege can add new options to the poll. Immutable after poll creation. Default: false. */
  allowContributorsAddOptions: Scalars['Boolean'];
  /** Maximum number of options a voter may select (0 = unlimited). Immutable after poll creation. */
  maxResponses: Scalars['Int'];
  /** Minimum number of options a voter must select (≥ 1). Immutable after poll creation. */
  minResponses: Scalars['Int'];
  /** Controls how much detail is shown in results. Immutable after poll creation. */
  resultsDetail: PollResultsDetail;
  /** Controls when results become visible to voters. Immutable after poll creation. */
  resultsVisibility: PollResultsVisibility;
};

export type PollSettingsData = {
  /** Whether voters can add new options to the poll. Defaults to false. */
  allowContributorsAddOptions?: Maybe<Scalars['Boolean']>;
  /** Maximum selections allowed. Defaults to 1. Set to 0 for unlimited. */
  maxResponses?: Maybe<Scalars['Int']>;
  /** Minimum selections required. Defaults to 1. */
  minResponses?: Maybe<Scalars['Int']>;
  /** How much detail is shown. Defaults to FULL. */
  resultsDetail?: Maybe<PollResultsDetail>;
  /** When results become visible. Defaults to VISIBLE. */
  resultsVisibility?: Maybe<PollResultsVisibility>;
};

export type PollSettingsInput = {
  /** Whether voters can add new options to the poll. Defaults to false. */
  allowContributorsAddOptions?: InputMaybe<Scalars['Boolean']>;
  /** Maximum selections allowed. Defaults to 1. Set to 0 for unlimited. */
  maxResponses?: InputMaybe<Scalars['Int']>;
  /** Minimum selections required. Defaults to 1. */
  minResponses?: InputMaybe<Scalars['Int']>;
  /** How much detail is shown. Defaults to FULL. */
  resultsDetail?: InputMaybe<PollResultsDetail>;
  /** When results become visible. Defaults to VISIBLE. */
  resultsVisibility?: InputMaybe<PollResultsVisibility>;
};

/** Lifecycle status of a Poll. OPEN allows voting and option management; CLOSED prevents all state-mutating operations. */
export enum PollStatus {
  Closed = 'CLOSED',
  Open = 'OPEN',
}

export type PollVote = {
  /** ID of the user who cast this vote. */
  createdBy: Scalars['UUID'];
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The options selected in this vote. */
  selectedOptions: Array<PollOption>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type PollVoteUpdatedSubscriptionResult = {
  /** The updated Poll. Fields are filtered per subscriber's visibility context. */
  poll: Poll;
  /** The type of poll event. */
  pollEventType: PollEventType;
};

export type Post = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The comments on this Post. */
  comments: Room;
  /** The user that created this Post */
  createdBy?: Maybe<User>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Profile for this Post. */
  profile: Profile;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type Profile = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** A description of the entity associated with this profile. */
  description?: Maybe<Scalars['Markdown']>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The location for this Profile. */
  location?: Maybe<Location>;
  /** A list of URLs to relevant information. */
  references?: Maybe<Array<Reference>>;
  /** The storage bucket for this Profile. */
  storageBucket: StorageBucket;
  /** The tagline for this entity. */
  tagline?: Maybe<Scalars['String']>;
  /** The default or named tagset. */
  tagset?: Maybe<Tagset>;
  /** A list of named tagsets, each of which has a list of tags. */
  tagsets?: Maybe<Array<Tagset>>;
  /** A type of entity that this Profile is being used with. */
  type?: Maybe<ProfileType>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The URL at which this profile can be viewed. */
  url: Scalars['String'];
  /** A particular type of visual for this Profile. */
  visual?: Maybe<Visual>;
  /** A list of visuals for this Profile. */
  visuals: Array<Visual>;
};

export type ProfileTagsetArgs = {
  tagsetName?: InputMaybe<TagsetReservedName>;
};

export type ProfileVisualArgs = {
  type: VisualType;
};

export enum ProfileType {
  Account = 'ACCOUNT',
  CalendarEvent = 'CALENDAR_EVENT',
  CalloutFraming = 'CALLOUT_FRAMING',
  CollaboraDocument = 'COLLABORA_DOCUMENT',
  CommunityGuidelines = 'COMMUNITY_GUIDELINES',
  ContributionLink = 'CONTRIBUTION_LINK',
  Discussion = 'DISCUSSION',
  InnovationFlow = 'INNOVATION_FLOW',
  InnovationHub = 'INNOVATION_HUB',
  InnovationPack = 'INNOVATION_PACK',
  KnowledgeBase = 'KNOWLEDGE_BASE',
  Memo = 'MEMO',
  Organization = 'ORGANIZATION',
  Post = 'POST',
  Space = 'SPACE',
  SpaceAbout = 'SPACE_ABOUT',
  Template = 'TEMPLATE',
  User = 'USER',
  UserGroup = 'USER_GROUP',
  VirtualContributor = 'VIRTUAL_CONTRIBUTOR',
  VirtualPersona = 'VIRTUAL_PERSONA',
  Whiteboard = 'WHITEBOARD',
}

export type PromptGraph = {
  edges?: Maybe<Array<PromptGraphEdge>>;
  end?: Maybe<Scalars['String']>;
  nodes?: Maybe<Array<PromptGraphNode>>;
  start?: Maybe<Scalars['String']>;
  state?: Maybe<PromptGraphDataStruct>;
};

export type PromptGraphDataPoint = {
  description?: Maybe<Scalars['String']>;
  items?: Maybe<PromptGraphDataStruct>;
  name: Scalars['String'];
  optional?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type PromptGraphDataPointInput = {
  description?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<PromptGraphDataStructInput>;
  name: Scalars['String'];
  optional?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
};

export type PromptGraphDataStruct = {
  properties?: Maybe<Array<PromptGraphDataPoint>>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type PromptGraphDataStructInput = {
  properties?: InputMaybe<Array<PromptGraphDataPointInput>>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type PromptGraphDefinition = {
  edges?: Maybe<Array<PromptGraphDefinitionEdge>>;
  end?: Maybe<Scalars['String']>;
  nodes?: Maybe<Array<PromptGraphDefinitionNode>>;
  start?: Maybe<Scalars['String']>;
  state?: Maybe<PromptGraphDefinitionDataStruct>;
};

export type PromptGraphDefinitionDataPoint = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  optional?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type PromptGraphDefinitionDataStruct = {
  properties?: Maybe<Array<PromptGraphDefinitionDataPoint>>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type PromptGraphDefinitionEdge = {
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};

export type PromptGraphDefinitionNode = {
  input_variables?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  output?: Maybe<PromptGraphDefinitionDataStruct>;
  prompt?: Maybe<Scalars['String']>;
  system: Scalars['Boolean'];
};

export type PromptGraphEdge = {
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};

export type PromptGraphEdgeInput = {
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
};

export type PromptGraphInput = {
  edges?: InputMaybe<Array<PromptGraphEdgeInput>>;
  end?: InputMaybe<Scalars['String']>;
  nodes?: InputMaybe<Array<PromptGraphNodeInput>>;
  start?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<PromptGraphDataStructInput>;
};

export type PromptGraphNode = {
  input_variables?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  output?: Maybe<PromptGraphDataStruct>;
  prompt?: Maybe<Scalars['String']>;
  system: Scalars['Boolean'];
};

export type PromptGraphNodeInput = {
  input_variables?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  output?: InputMaybe<PromptGraphDataStructInput>;
  prompt?: InputMaybe<Scalars['String']>;
  system: Scalars['Boolean'];
};

export type PruneInAppNotificationAdminResult = {
  /** The number of InAppNotifications that were removed due to exceeding the maximum allowed per user. */
  removedCountExceedingUserLimit: Scalars['Int'];
  /** The number of InAppNotifications that were removed due to being outside the retention period. */
  removedCountOutsideRetentionPeriod: Scalars['Int'];
};

/** Represents a user's push notification subscription for a specific device/browser. */
export type PushSubscription = {
  /** When this subscription was created. */
  createdDate: Scalars['DateTime'];
  /** Unique identifier for this subscription. */
  id: Scalars['UUID'];
  /** Last time a notification was successfully delivered to this subscription. */
  lastActiveDate?: Maybe<Scalars['DateTime']>;
  /** Current status of the subscription. */
  status: PushSubscriptionStatus;
  /** Browser/device user agent string for display purposes. */
  userAgent?: Maybe<Scalars['String']>;
};

/** Status of a push notification subscription. */
export enum PushSubscriptionStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  Expired = 'EXPIRED',
}

export type Query = {
  /** Activity events related to the current user. */
  activityFeed: ActivityFeed;
  /** Activity events related to the current user grouped by Activity type and resource. */
  activityFeedGrouped: Array<ActivityLogEntry>;
  /** Retrieve the ActivityLog for the specified Collaboration */
  activityLogOnCollaboration: Array<ActivityLogEntry>;
  /** Get an Actor by ID. Returns null if not found. */
  actor?: Maybe<ActorFull>;
  /** All Actors that hold credentials matching the supplied criteria. */
  actorsWithCredential: Array<ActorFull>;
  /** Get all unverified identities from Kratos. */
  adminIdentitiesUnverified: Array<KratosIdentity>;
  /** Alkemio AiServer */
  aiServer: AiServer;
  /** Retrieves the editor URL for the specified CollaboraDocument. */
  collaboraEditorUrl: CollaboraEditorUrlResult;
  /** Whether the WOPI save service backing this CollaboraDocument is currently reachable. A side-effect-free health check — unlike collaboraEditorUrl it issues no access token and records no analytics — used to surface a save-path outage in the editor. */
  collaboraServiceAvailable: Scalars['Boolean'];
  /** Active Spaces only, order by most active in the past X days. */
  exploreSpaces: Array<Space>;
  /** Allow creation of inputs based on existing entities in the domain model */
  inputCreator: InputCreatorQueryResults;
  /** Allow direct lookup of entities from the domain model */
  lookup: LookupQueryResults;
  /** Allow direct lookup of entities using their NameIDs */
  lookupByName: LookupByNameQueryResults;
  /** Information about the current authenticated user */
  me: MeQueryResults;
  /** Returns the current user's push notification subscriptions (active and disabled). Requires authentication. */
  myPushSubscriptions: Array<PushSubscription>;
  /** The notificationRecipients for the provided event on the given entity. */
  notificationRecipients: NotificationRecipientResult;
  /** A particular Organization */
  organization: Organization;
  /** The Organizations on this platform */
  organizations: Array<Organization>;
  /** The Organizations on this platform in paginated format */
  organizationsPaginated: PaginatedOrganization;
  /** Alkemio Platform */
  platform: Platform;
  /** Allow looking up of information for Platform administration. */
  platformAdmin: PlatformAdminQueryResults;
  /** The enumerable assistant capability surface (one per MCP tool), with each tool classified READ / WRITE_ADDITIVE / WRITE_DESTRUCTIVE. */
  platformCapabilities: Array<AssistantCapability>;
  /** Get the list of restricted space names. */
  restrictedSpaceNames: Array<Scalars['String']>;
  /** The roles that the specified Organization has. */
  rolesOrganization: ActorRoles;
  /** The roles that that the specified User has. */
  rolesUser: ActorRoles;
  /** The roles that the specified VirtualContributor has. */
  rolesVirtualContributor: ActorRoles;
  /** Search the platform for terms supplied */
  search: ISearchResults;
  /** The Spaces on this platform; If accessed through an Innovation Hub will return ONLY the Spaces defined in it. */
  spaces: Array<Space>;
  /** The Spaces on this platform */
  spacesPaginated: PaginatedSpaces;
  /** Information about a specific task */
  task: Task;
  /** All tasks with filtering applied */
  tasks: Array<Task>;
  /** Allow resolving of a URL into a set of IDs. */
  urlResolver: UrlResolverQueryResults;
  /** A particular user, identified by the ID or by email */
  user: User;
  /** The users who have profiles on this platform */
  users: Array<User>;
  /** The users who have profiles on this platform */
  usersPaginated: PaginatedUsers;
  /** All Users that hold credentials matching the supplied criteria. */
  usersWithAuthorizationCredential: Array<User>;
  /** Returns the VAPID public key needed by clients to subscribe to push notifications. Returns null if push notifications are not enabled on this server. */
  vapidPublicKey?: Maybe<Scalars['String']>;
  /** A particular VirtualContributor */
  virtualContributor: VirtualContributor;
  /** The VirtualContributors on this platform; only accessible to platform admins */
  virtualContributors: Array<VirtualContributor>;
};

export type QueryActivityFeedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  args?: InputMaybe<ActivityFeedQueryArgs>;
  before?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryActivityFeedGroupedArgs = {
  args?: InputMaybe<ActivityFeedGroupedQueryArgs>;
};

export type QueryActivityLogOnCollaborationArgs = {
  queryData: ActivityLogInput;
};

export type QueryActorArgs = {
  id: Scalars['UUID'];
};

export type QueryActorsWithCredentialArgs = {
  credentialType: CredentialType;
  resourceID?: InputMaybe<Scalars['UUID']>;
};

export type QueryCollaboraEditorUrlArgs = {
  collaboraDocumentID: Scalars['UUID'];
};

export type QueryCollaboraServiceAvailableArgs = {
  collaboraDocumentID: Scalars['UUID'];
};

export type QueryExploreSpacesArgs = {
  options?: InputMaybe<ExploreSpacesInput>;
};

export type QueryNotificationRecipientsArgs = {
  eventData: NotificationRecipientsInput;
};

export type QueryOrganizationArgs = {
  ID: Scalars['UUID'];
};

export type QueryOrganizationsArgs = {
  filter?: InputMaybe<ActorFilterInput>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type QueryOrganizationsPaginatedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<OrganizationFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<OrganizationVerificationEnum>;
};

export type QueryRolesOrganizationArgs = {
  rolesData: RolesActorInput;
};

export type QueryRolesUserArgs = {
  rolesData: RolesActorInput;
};

export type QueryRolesVirtualContributorArgs = {
  rolesData: RolesActorInput;
};

export type QuerySearchArgs = {
  searchData: SearchInput;
};

export type QuerySpacesArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  filter?: InputMaybe<SpaceFilterInput>;
};

export type QuerySpacesPaginatedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<SpaceFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryTaskArgs = {
  id: Scalars['UUID'];
};

export type QueryTasksArgs = {
  status?: InputMaybe<TaskStatus>;
};

export type QueryUrlResolverArgs = {
  url: Scalars['String'];
};

export type QueryUserArgs = {
  ID: Scalars['UUID'];
};

export type QueryUsersArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  filter?: InputMaybe<ActorFilterInput>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type QueryUsersPaginatedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<UserFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  withTags?: InputMaybe<Scalars['Boolean']>;
};

export type QueryUsersWithAuthorizationCredentialArgs = {
  credentialsCriteriaData: UsersWithAuthorizationCredentialInput;
};

export type QueryVirtualContributorArgs = {
  ID: Scalars['UUID'];
};

export type QueryVirtualContributorsArgs = {
  filter?: InputMaybe<ActorFilterInput>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type Question = {
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  value: Scalars['String'];
};

/** A reaction to a message. */
export type Reaction = {
  /** The reaction Emoji */
  emoji: Scalars['Emoji'];
  /** The id for the reaction. */
  id: Scalars['MessageID'];
  /** The user that reacted */
  sender?: Maybe<User>;
  /** The server timestamp in UTC */
  timestamp: Scalars['Float'];
};

export type Reference = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** Description of this reference */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Name of the reference, e.g. Linkedin, Twitter etc. */
  name: Scalars['String'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** URI of the reference */
  uri: Scalars['String'];
};

export type RefreshVirtualContributorBodyOfKnowledgeInput = {
  /** The ID of the Virtual Contributor to update. */
  virtualContributorID: Scalars['UUID'];
};

export type RelayPaginatedSpace = ActorFull & {
  /** About this space. */
  about: SpaceAbout;
  /** The Account that this Space is part of. */
  account: Account;
  /** The "highest" subscription active for this Space. */
  activeSubscription?: Maybe<SpaceSubscription>;
  /** Count of visible activity events on this Space over the last 7 days, across all actors (excludes whiteboard-content-modified). Used to rank Spaces on the dashboard. */
  activityScore: Scalars['Int'];
  /** The Actor representing this Space. */
  actor: Actor;
  /** The authorization rules for the Actor */
  authorization?: Maybe<Authorization>;
  /** The collaboration for the Space. */
  collaboration: Collaboration;
  /** Get the Community for the Space.  */
  community: Community;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The credentials held by this Actor */
  credentials?: Maybe<Array<Credential>>;
  /** The ID of the Actor */
  id: Scalars['UUID'];
  /** The layout settings for this Space. Accessible without READ privilege. */
  layout: SpaceSettingsLayout;
  /** The level of this Space, representing the number of Spaces above this one. */
  level: SpaceLevel;
  /** The ID of the level zero space for this tree. */
  levelZeroSpaceID: Scalars['String'];
  /** The License operating on this Space. */
  license: License;
  /** Capped list of Contributors (Users, Virtual Contributors, …) that may be @mentioned in this Space. Scope adapts to the Space's privacy and the privacy of its ancestors: a private Space yields only its own Members; a public Space includes its Members plus the Members of each ancestor, walking up until the first private ancestor (inclusive) or until the public L0 root is reached, in which case all platform Contributors of the requested types are returned. Use `filter` for typeahead search and `types` to restrict which Contributor kinds are returned. */
  mentionableContributors: Array<ActorFull>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** Whether this Space is pinned in its parent Space. */
  pinned: Scalars['Boolean'];
  /** The calculated platform access for this Space. */
  platformAccess: PlatformRolesAccess;
  /** The profile for this Actor. */
  profile?: Maybe<Profile>;
  /** The settings for this Space. */
  settings: SpaceSettings;
  /** The sort mode for subspaces of this Space: Alphabetical or Custom. Accessible without READ privilege. */
  sortMode: SpaceSortMode;
  /** The sorting order for this Space within its parent. */
  sortOrder: Scalars['Int'];
  /** The StorageAggregator in use by this Space */
  storageAggregator: StorageAggregator;
  /** The subscriptions active for this Space. */
  subscriptions: Array<SpaceSubscription>;
  /** A particular subspace by its nameID */
  subspaceByNameID: Space;
  /** The subspaces for the space. */
  subspaces: Array<Space>;
  /** The TemplatesManager in use by this Space */
  templatesManager?: Maybe<TemplatesManager>;
  /** The type of Actor */
  type: ActorType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** Visibility of the Space. */
  visibility: SpaceVisibility;
};

export type RelayPaginatedSpaceMentionableContributorsArgs = {
  filter?: InputMaybe<ContributorFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  types?: InputMaybe<Array<ActorType>>;
};

export type RelayPaginatedSpaceSubspaceByNameIdArgs = {
  NAMEID: Scalars['NameID'];
};

export type RelayPaginatedSpaceSubspacesArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type RelayPaginatedSpaceEdge = {
  node: RelayPaginatedSpace;
};

export type RelayPaginatedSpacePageInfo = {
  /** The last cursor of the page result */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicate whether more items exist after the returned ones */
  hasNextPage: Scalars['Boolean'];
  /** Indicate whether more items exist before the returned ones */
  hasPreviousPage: Scalars['Boolean'];
  /** The first cursor of the page result */
  startCursor?: Maybe<Scalars['String']>;
};

export type RemoveCommunityGuidelinesContentInput = {
  /** ID of the CommunityGuidelines that will be emptied */
  communityGuidelinesID: Scalars['UUID'];
};

export type RemoveConversationMemberInput = {
  /** The ID of the conversation to remove a member from. */
  conversationID: Scalars['UUID'];
  /** The ID of the member (user or VC) to remove. */
  memberID: Scalars['UUID'];
};

export type RemoveDefaultCalloutTemplateOnInnovationFlowStateInput = {
  flowStateID: Scalars['UUID'];
};

export type RemovePlatformRoleInput = {
  actorID: Scalars['UUID'];
  role: RoleName;
};

export type RemovePollOptionInput = {
  optionID: Scalars['UUID'];
  pollID: Scalars['UUID'];
};

export type RemovePollVoteInput = {
  /** The ID of the Poll from which to remove the current user vote. */
  pollID: Scalars['UUID'];
};

export type RemoveReactionFromCalloutInput = {
  /** The ID of the Callout to remove the reaction from. */
  calloutID: Scalars['UUID'];
};

export type RemoveRoleOnRoleSetInput = {
  actorID: Scalars['UUID'];
  role: RoleName;
  roleSetID: Scalars['UUID'];
};

export type RemoveUserGroupMemberInput = {
  groupID: Scalars['UUID'];
  userID: Scalars['UUID'];
};

export type ReorderPollOptionsInput = {
  optionIDs: Array<Scalars['UUID']>;
  pollID: Scalars['UUID'];
};

export type ReplaceCollaboraDocumentInput = {
  /** The ID of the CollaboraDocument whose backing file is being replaced. */
  ID: Scalars['UUID'];
  /** Optional title chosen in the replace dialog (defaults to the incoming file title). When supplied it is persisted as the CollaboraDocument display name (the same entity), propagating to the editor title and the download filename. Omit to leave the current name unchanged. */
  displayName?: InputMaybe<Scalars['String']>;
};

export type ReplaceWhiteboardContentFromSourceInput = {
  /** The Whiteboard whose content and media are copied into the target. */
  sourceWhiteboardID: Scalars['UUID'];
  /** The Whiteboard whose content is replaced. */
  targetWhiteboardID: Scalars['UUID'];
};

export type RevokeAuthorizationCredentialInput = {
  /** The resource to which access is being removed. */
  resourceID: Scalars['String'];
  type: AuthorizationCredential;
  /** The user from whom the credential is being removed. */
  userID: Scalars['UUID'];
};

export type RevokeLicensePlanFromAccount = {
  /** The ID of the Account to assign the LicensePlan to. */
  accountID: Scalars['UUID'];
  /** The ID of the LicensePlan to assign. */
  licensePlanID: Scalars['UUID'];
  /** The ID of the Licensing to use. */
  licensingID?: InputMaybe<Scalars['UUID']>;
};

export type RevokeLicensePlanFromSpace = {
  /** The ID of the LicensePlan to assign. */
  licensePlanID: Scalars['UUID'];
  /** The ID of the Licensing to use. */
  licensingID?: InputMaybe<Scalars['UUID']>;
  /** The ID of the Space to assign the LicensePlan to. */
  spaceID: Scalars['UUID'];
};

export type RevokeMcpApiKeyInput = {
  keyID: Scalars['UUID'];
};

export type RevokeOrganizationAuthorizationCredentialInput = {
  /** The Organization from whom the credential is being removed. */
  organizationID: Scalars['UUID'];
  /** The resource to which access is being removed. */
  resourceID?: InputMaybe<Scalars['UUID']>;
  type: AuthorizationCredential;
};

export type Role = {
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The Credential associated with this Role. */
  credential: CredentialDefinition;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The CommunityRole that this role definition is for. */
  name: RoleName;
  /** The role policy that applies for Organizations in this Role. */
  organizationPolicy: ActorRolePolicy;
  /** The Credential associated with this Role. */
  parentCredentials: Array<CredentialDefinition>;
  /** Flag to indicate if this Role requires the entry level role to be held. */
  requiresEntryRole: Scalars['Boolean'];
  /** Flag to indicate if this Role requires having the same role in the Parent RoleSet. */
  requiresSameRoleInParentRoleSet: Scalars['Boolean'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The role policy that applies for Users in this Role. */
  userPolicy: ActorRolePolicy;
  /** The role policy that applies for VirtualContributors in this Role. */
  virtualContributorPolicy: ActorRolePolicy;
};

export enum RoleName {
  Admin = 'ADMIN',
  Anonymous = 'ANONYMOUS',
  Associate = 'ASSOCIATE',
  GlobalAdmin = 'GLOBAL_ADMIN',
  GlobalCommunityReader = 'GLOBAL_COMMUNITY_READER',
  GlobalLicenseManager = 'GLOBAL_LICENSE_MANAGER',
  GlobalPlatformManager = 'GLOBAL_PLATFORM_MANAGER',
  GlobalSpacesReader = 'GLOBAL_SPACES_READER',
  GlobalSupport = 'GLOBAL_SUPPORT',
  GlobalSupportManager = 'GLOBAL_SUPPORT_MANAGER',
  Guest = 'GUEST',
  Lead = 'LEAD',
  Member = 'MEMBER',
  Owner = 'OWNER',
  PlatformAssistantAccess = 'PLATFORM_ASSISTANT_ACCESS',
  PlatformBetaTester = 'PLATFORM_BETA_TESTER',
  PlatformOperationsAdmin = 'PLATFORM_OPERATIONS_ADMIN',
  PlatformVcCampaign = 'PLATFORM_VC_CAMPAIGN',
  Registered = 'REGISTERED',
}

export type RoleSet = {
  /** The Form used for Applications to this roleSet. */
  applicationForm: Form;
  /** Applications available for this RoleSet. */
  applications: Array<Application>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** All users that have the entryRole in the RoleSet, minus those already in the specified role. */
  availableUsersForElevatedRole: PaginatedUsers;
  /** All available users that are could join this RoleSet in the entry role. */
  availableUsersForEntryRole: PaginatedUsers;
  /** All available VirtualContributors that are eligible to invite to this RoleSet in the entry role. */
  availableVirtualContributorsForEntryRole: PaginatedVirtualContributor;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The Role that acts as the entry Role for the RoleSet, so other roles potentially require it. */
  entryRoleName: RoleName;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Invitations for this roleSet. */
  invitations: Array<Invitation>;
  /** The License operating on this RoleSet. */
  license: License;
  /** The membership status of the currently logged in user. */
  myMembershipStatus?: Maybe<CommunityMembershipStatus>;
  /** The roles on this community for the currently logged in user. */
  myRoles: Array<RoleName>;
  /** The implicit roles on this community for the currently logged in user. */
  myRolesImplicit: Array<RoleSetRoleImplicit>;
  /** All Organizations that have the specified Role in this Community. */
  organizationsInRole: Array<Organization>;
  /** All organizations that have a role in this RoleSet in the specified Roles. */
  organizationsInRoles: Array<OrganizationsInRolesResponse>;
  /** Invitations to join this RoleSet in an entry role for users not yet on the Alkemio platform. */
  platformInvitations: Array<PlatformInvitation>;
  /** The Role Definitions from this RoleSet to return. */
  roleDefinition: Role;
  /** The Role Definitions included in this roleSet. */
  roleDefinitions: Array<Role>;
  /** The Roles available in this roleSet. */
  roleNames: Array<RoleName>;
  /** A type of entity that this RoleSet is being used with. */
  type?: Maybe<RoleSetType>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** All users that are contributing to this Community in the specified Role. */
  usersInRole: Array<User>;
  /** All users that have a Role in this RoleSet in the specified Roles. */
  usersInRoles: Array<UsersInRolesResponse>;
  /** All Virtual Contributors that have the specified Role in this Community. */
  virtualContributorsInRole: Array<VirtualContributor>;
  /** All Virtual Contributors that are available from the current or parent RoleSets. */
  virtualContributorsInRoleInHierarchy: Array<VirtualContributor>;
  /** All VirtualContributors that have a role in this RoleSet in the specified Roles. */
  virtualContributorsInRoles: Array<VirtualContributorsInRolesResponse>;
};

export type RoleSetAvailableUsersForElevatedRoleArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<UserFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  role: RoleName;
};

export type RoleSetAvailableUsersForEntryRoleArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<UserFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type RoleSetAvailableVirtualContributorsForEntryRoleArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type RoleSetOrganizationsInRoleArgs = {
  role: RoleName;
};

export type RoleSetOrganizationsInRolesArgs = {
  roles: Array<RoleName>;
};

export type RoleSetRoleDefinitionArgs = {
  role: RoleName;
};

export type RoleSetRoleDefinitionsArgs = {
  roles?: InputMaybe<Array<RoleName>>;
};

export type RoleSetUsersInRoleArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  role: RoleName;
};

export type RoleSetUsersInRolesArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  roles: Array<RoleName>;
};

export type RoleSetVirtualContributorsInRoleArgs = {
  role: RoleName;
};

export type RoleSetVirtualContributorsInRoleInHierarchyArgs = {
  role: RoleName;
};

export type RoleSetVirtualContributorsInRolesArgs = {
  roles: Array<RoleName>;
};

export type RoleSetInvitationResult = {
  /** The existing open application that blocks this invitation, when the result type is ALREADY_HAS_OPEN_APPLICATION. */
  application?: Maybe<Application>;
  invitation?: Maybe<Invitation>;
  platformInvitation?: Maybe<PlatformInvitation>;
  type: RoleSetInvitationResultType;
};

export enum RoleSetInvitationResultType {
  AlreadyHasOpenApplication = 'ALREADY_HAS_OPEN_APPLICATION',
  AlreadyInvitedToPlatformAndRoleSet = 'ALREADY_INVITED_TO_PLATFORM_AND_ROLE_SET',
  AlreadyInvitedToRoleSet = 'ALREADY_INVITED_TO_ROLE_SET',
  AlreadyMemberOfRoleSet = 'ALREADY_MEMBER_OF_ROLE_SET',
  InvitationToParentNotAuthorized = 'INVITATION_TO_PARENT_NOT_AUTHORIZED',
  InvitedToPlatformAndRoleSet = 'INVITED_TO_PLATFORM_AND_ROLE_SET',
  InvitedToRoleSet = 'INVITED_TO_ROLE_SET',
}

export enum RoleSetRoleImplicit {
  AccountAdmin = 'ACCOUNT_ADMIN',
  SubspaceAdmin = 'SUBSPACE_ADMIN',
}

export enum RoleSetType {
  Organization = 'ORGANIZATION',
  Platform = 'PLATFORM',
  Space = 'SPACE',
}

export type RolesActorInput = {
  /** The ID of the actor to retrieve the roles of. */
  actorID: Scalars['UUID'];
  /** Return membership in Spaces matching the provided filter. */
  filter?: InputMaybe<SpaceFilterInput>;
};

export type RolesResult = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** The roles held by the actor */
  roles: Array<Scalars['String']>;
};

export type RolesResultCommunity = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** The level of the Space e.g. L0/L1/L2. */
  level: SpaceLevel;
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** The roles held by the actor */
  roles: Array<Scalars['String']>;
};

export type RolesResultOrganization = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** The Organization ID. */
  organizationID: Scalars['String'];
  /** The roles held by the actor */
  roles: Array<Scalars['String']>;
  /** Details of the Groups in the Organizations the user is a member of */
  userGroups: Array<RolesResult>;
};

export type RolesResultSpace = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** The level of the Space e.g. L0/L1/L2. */
  level: SpaceLevel;
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** The roles held by the actor */
  roles: Array<Scalars['String']>;
  /** The Space ID */
  spaceID: Scalars['String'];
  /** Details of the Subspace the user is a member of */
  subspaces: Array<RolesResultCommunity>;
  /** Visibility of the Space. */
  visibility: SpaceVisibility;
};

export type Room = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The avatar URL of the Room (mxc:// or https://). Fetched from Matrix. */
  avatarUrl?: Maybe<Scalars['String']>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The display name of the Room. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The last message sent to the Room. Useful for conversation previews. */
  lastMessage?: Maybe<Message>;
  /** Messages in this Room. */
  messages: Array<Message>;
  /** The number of messages in the Room. */
  messagesCount: Scalars['Int'];
  /** The type of room (e.g., post, callout, conversation_direct, conversation_group). */
  type: RoomType;
  /** Simple unread message count for the current user. Use unreadCounts for per-thread breakdown. */
  unreadCount: Scalars['Int'];
  /** Unread message counts for the current user in this Room. */
  unreadCounts: RoomUnreadCounts;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** Virtual Contributor Interactions in this Room. */
  vcInteractions: Array<VcInteraction>;
};

export type RoomUnreadCountsArgs = {
  threadIds?: InputMaybe<Array<Scalars['MessageID']>>;
};

export type RoomAddReactionToMessageInput = {
  /** The reaction to the message. */
  emoji: Scalars['Emoji'];
  /** The message id that is being reacted to */
  messageID: Scalars['MessageID'];
  /** The Room to remove a message from. */
  roomID: Scalars['UUID'];
};

/** The event happened in the subscribed room */
export type RoomEventSubscriptionResult = {
  /** A message related event. */
  message?: Maybe<RoomMessageEventSubscriptionResult>;
  /** A message reaction related event. */
  reaction?: Maybe<RoomMessageReactionEventSubscriptionResult>;
  /** The Room on which the event happened. */
  room: Room;
  /** The identifier for the Room on which the event happened. */
  roomID: Scalars['String'];
};

export type RoomMarkMessageReadInput = {
  /** The message id that should be marked as read. */
  messageID: Scalars['MessageID'];
  /** The Room to mark message as read in. */
  roomID: Scalars['UUID'];
  /** The thread id if the message is in a thread. */
  threadID?: InputMaybe<Scalars['MessageID']>;
};

/** A message event happened in the subscribed room */
export type RoomMessageEventSubscriptionResult = {
  /** A message related event. */
  data: Message;
  /** The type of event. */
  type: MutationType;
};

/** A message reaction event happened in the subscribed room */
export type RoomMessageReactionEventSubscriptionResult = {
  /** A message related event. */
  data: Reaction;
  /** The message on which the reaction event happened. */
  messageID?: Maybe<Scalars['String']>;
  /** The type of event. */
  type: MutationType;
};

export type RoomRemoveMessageInput = {
  /** The message id that should be removed */
  messageID: Scalars['MessageID'];
  /** The Room to remove a message from. */
  roomID: Scalars['UUID'];
};

export type RoomRemoveReactionToMessageInput = {
  /** The reaction that is being removed */
  reactionID: Scalars['MessageID'];
  /** The Room to remove a message from. */
  roomID: Scalars['UUID'];
};

export type RoomSendMessageInput = {
  /** The message being sent */
  message: Scalars['String'];
  /** The Room the message is being sent to */
  roomID: Scalars['UUID'];
};

export type RoomSendMessageReplyInput = {
  /** The message being sent */
  message: Scalars['String'];
  /** The Room the message is being sent to */
  roomID: Scalars['UUID'];
  /** The message starting the thread being replied to */
  threadID: Scalars['MessageID'];
};

/** Unread message count for a specific thread in a Room. */
export type RoomThreadUnreadCount = {
  /** The number of unread messages in the thread. */
  count: Scalars['Int'];
  /** The thread ID. */
  threadId: Scalars['MessageID'];
};

/** The type of room. */
export enum RoomType {
  CalendarEvent = 'CALENDAR_EVENT',
  Callout = 'CALLOUT',
  Conversation = 'CONVERSATION',
  ConversationDirect = 'CONVERSATION_DIRECT',
  ConversationGroup = 'CONVERSATION_GROUP',
  DiscussionForum = 'DISCUSSION_FORUM',
  Post = 'POST',
  Updates = 'UPDATES',
}

/** Unread message counts for a Room. */
export type RoomUnreadCounts = {
  /** The total number of unread messages in the Room. */
  roomUnreadCount: Scalars['Int'];
  /** Unread counts per thread, if thread IDs were requested. */
  threadUnreadCounts?: Maybe<Array<RoomThreadUnreadCount>>;
};

/** The category in which to search. A category may include a couple of entity types, e.g. "contributions" include posts, whiteboard, etc. */
export enum SearchCategory {
  CollaborationTools = 'COLLABORATION_TOOLS',
  Contributions = 'CONTRIBUTIONS',
  Contributors = 'CONTRIBUTORS',
  Framings = 'FRAMINGS',
  Spaces = 'SPACES',
}

export type SearchFilterInput = {
  /** Include this category in the search results. */
  category: SearchCategory;
  /** The cursor after which we want results (offset) - pass this from your previous search to request additional results. Useful for paginating results. */
  cursor?: InputMaybe<Scalars['SearchCursor']>;
  /** How many results per category to return. Useful for paginating results. */
  size?: InputMaybe<Scalars['Float']>;
  /** Which types to include. Defaults to all in the category. */
  types?: InputMaybe<Array<SearchResultType>>;
};

export type SearchInput = {
  /** Return results that satisfy these conditions. */
  filters?: InputMaybe<Array<SearchFilterInput>>;
  /** When searching Callouts (COLLABORATION_TOOLS / CALLOUT), also match in the Callout framing resources (whiteboard, memo) and its contributions (post, whiteboard, memo). Any match folds up to the containing Callout, deduped, in calloutResults. */
  foldCalloutResources?: InputMaybe<Scalars['Boolean']>;
  /** Restrict the search to a single flow state, identified by the InnovationFlowState UUID. The state UUID is globally unique and transitively identifies its Collaboration, so no separate CalloutsSet filter is needed. Default is all flow states. */
  searchInFlowStateFilter?: InputMaybe<Scalars['UUID']>;
  /** Restrict the search to only the specified Space. Default is all Spaces. */
  searchInSpaceFilter?: InputMaybe<Scalars['UUID']>;
  /** Expand the search to includes Tagsets with the provided names. Max 2. */
  tagsetNames?: InputMaybe<Array<Scalars['String']>>;
  /** The terms to be searched for within this Space. Max 5. */
  terms: Array<Scalars['String']>;
};

export type SearchResult = {
  /** The identifier of the search result. Does not represent the entity in Alkemio. */
  id: Scalars['UUID'];
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

export type SearchResultCallout = SearchResult & {
  /** The Callout that was found. */
  callout: Callout;
  /** The identifier of the search result. Does not represent the entity in Alkemio. */
  id: Scalars['UUID'];
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The parent Space of the Callout. */
  space: Space;
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

export type SearchResultCollaboraDocument = SearchResult & {
  /** The Callout of the Collabora document. */
  callout: Callout;
  /** The Collabora document that was found. */
  collaboraDocument: CollaboraDocument;
  /** The identifier of the search result. Does not represent the entity in Alkemio. */
  id: Scalars['UUID'];
  /** Whether the Collabora document is a contribution (response) or part of the framing. */
  isContribution: Scalars['Boolean'];
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The Space of the Collabora document. */
  space: Space;
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

export type SearchResultMemo = SearchResult & {
  /** The Callout of the Memo. */
  callout: Callout;
  /** The identifier of the search result. Does not represent the entity in Alkemio. */
  id: Scalars['UUID'];
  /** Whether the Memo is a contribution (response) or part of the framing. */
  isContribution: Scalars['Boolean'];
  /** The Memo that was found. */
  memo: Memo;
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The Space of the Memo. */
  space: Space;
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

export type SearchResultOrganization = SearchResult & {
  /** The identifier of the search result. Does not represent the entity in Alkemio. */
  id: Scalars['UUID'];
  /** The Organization that was found. */
  organization: Organization;
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

export type SearchResultPost = SearchResult & {
  /** The Callout of the Post. */
  callout: Callout;
  /** The identifier of the search result. Does not represent the entity in Alkemio. */
  id: Scalars['UUID'];
  /** The Post that was found. */
  post: Post;
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The Space of the Post. */
  space: Space;
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

export type SearchResultSpace = SearchResult & {
  /** The identifier of the search result. Does not represent the entity in Alkemio. */
  id: Scalars['UUID'];
  /** The parent of this Space, if any. */
  parentSpace?: Maybe<Space>;
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The Space that was found. */
  space: Space;
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

/** The different types of available search results. */
export enum SearchResultType {
  Callout = 'CALLOUT',
  CollaboraDocument = 'COLLABORA_DOCUMENT',
  Memo = 'MEMO',
  Organization = 'ORGANIZATION',
  Post = 'POST',
  Space = 'SPACE',
  Subspace = 'SUBSPACE',
  User = 'USER',
  Whiteboard = 'WHITEBOARD',
}

export type SearchResultUser = SearchResult & {
  /** The identifier of the search result. Does not represent the entity in Alkemio. */
  id: Scalars['UUID'];
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
  /** The User that was found. */
  user: User;
};

export type SearchResultWhiteboard = SearchResult & {
  /** The Callout of the Whiteboard. */
  callout: Callout;
  /** The identifier of the search result. Does not represent the entity in Alkemio. */
  id: Scalars['UUID'];
  /** Whether the Whiteboard is a contribution (response) or part of the framing. */
  isContribution: Scalars['Boolean'];
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The Space of the Whiteboard. */
  space: Space;
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
  /** The Whiteboard that was found. */
  whiteboard: Whiteboard;
};

export enum SearchVisibility {
  Account = 'ACCOUNT',
  Hidden = 'HIDDEN',
  Public = 'PUBLIC',
}

export type SendDirectMessageToUsersInput = {
  /** The message being sent to each recipient. */
  message: Scalars['String'];
  /** The Users (1..N) the message is sent to, each as an individual 1:1 chat. No group conversation is created. */
  receiverIDs: Array<Scalars['UUID']>;
};

export type Sentry = {
  /** Flag indicating if the client should use Sentry for monitoring. */
  enabled: Scalars['Boolean'];
  /** URL to the Sentry endpoint. */
  endpoint: Scalars['String'];
  /** The Sentry environment to report to. */
  environment: Scalars['String'];
  /** Flag indicating if PII should be submitted on Sentry events. */
  submitPII: Scalars['Boolean'];
};

export type ServiceMetadata = {
  /** Service name e.g. CT Server */
  name?: Maybe<Scalars['String']>;
  /** Version in the format {major.minor.patch} - using SemVer. */
  version?: Maybe<Scalars['String']>;
};

export type SetDefaultCalloutTemplateOnInnovationFlowStateInput = {
  flowStateID: Scalars['UUID'];
  templateID: Scalars['UUID'];
};

export type SetPlatformWellKnownVirtualContributorInput = {
  /** The UUID of the Virtual Contributor. */
  virtualContributorID: Scalars['UUID'];
  /** The well-known Virtual Contributor type. */
  wellKnown: VirtualContributorWellKnown;
};

/** The widgets available for the Space sidepanel, per InnovationFlow state (tab). */
export enum SidebarWidget {
  About = 'ABOUT',
  AddUser = 'ADD_USER',
  ApplicationButton = 'APPLICATION_BUTTON',
  ContactLeads = 'CONTACT_LEADS',
  CreatePost = 'CREATE_POST',
  CreateSubspace = 'CREATE_SUBSPACE',
  Events = 'EVENTS',
  Guidelines = 'GUIDELINES',
  Index = 'INDEX',
  Intent = 'INTENT',
  SubspaceLinks = 'SUBSPACE_LINKS',
  Updates = 'UPDATES',
  VirtualContributors = 'VIRTUAL_CONTRIBUTORS',
}

export type Space = ActorFull & {
  /** About this space. */
  about: SpaceAbout;
  /** The Account that this Space is part of. */
  account: Account;
  /** The "highest" subscription active for this Space. */
  activeSubscription?: Maybe<SpaceSubscription>;
  /** Count of visible activity events on this Space over the last 7 days, across all actors (excludes whiteboard-content-modified). Used to rank Spaces on the dashboard. */
  activityScore: Scalars['Int'];
  /** The Actor representing this Space. */
  actor: Actor;
  /** The authorization rules for the Actor */
  authorization?: Maybe<Authorization>;
  /** The collaboration for the Space. */
  collaboration: Collaboration;
  /** Get the Community for the Space.  */
  community: Community;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The credentials held by this Actor */
  credentials?: Maybe<Array<Credential>>;
  /** The ID of the Actor */
  id: Scalars['UUID'];
  /** The layout settings for this Space. Accessible without READ privilege. */
  layout: SpaceSettingsLayout;
  /** The level of this Space, representing the number of Spaces above this one. */
  level: SpaceLevel;
  /** The ID of the level zero space for this tree. */
  levelZeroSpaceID: Scalars['String'];
  /** The License operating on this Space. */
  license: License;
  /** Capped list of Contributors (Users, Virtual Contributors, …) that may be @mentioned in this Space. Scope adapts to the Space's privacy and the privacy of its ancestors: a private Space yields only its own Members; a public Space includes its Members plus the Members of each ancestor, walking up until the first private ancestor (inclusive) or until the public L0 root is reached, in which case all platform Contributors of the requested types are returned. Use `filter` for typeahead search and `types` to restrict which Contributor kinds are returned. */
  mentionableContributors: Array<ActorFull>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** Whether this Space is pinned in its parent Space. */
  pinned: Scalars['Boolean'];
  /** The calculated platform access for this Space. */
  platformAccess: PlatformRolesAccess;
  /** The profile for this Actor. */
  profile?: Maybe<Profile>;
  /** The settings for this Space. */
  settings: SpaceSettings;
  /** The sort mode for subspaces of this Space: Alphabetical or Custom. Accessible without READ privilege. */
  sortMode: SpaceSortMode;
  /** The sorting order for this Space within its parent. */
  sortOrder: Scalars['Int'];
  /** The StorageAggregator in use by this Space */
  storageAggregator: StorageAggregator;
  /** The subscriptions active for this Space. */
  subscriptions: Array<SpaceSubscription>;
  /** A particular subspace by its nameID */
  subspaceByNameID: Space;
  /** The subspaces for the space. */
  subspaces: Array<Space>;
  /** The TemplatesManager in use by this Space */
  templatesManager?: Maybe<TemplatesManager>;
  /** The type of Actor */
  type: ActorType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** Visibility of the Space. */
  visibility: SpaceVisibility;
};

export type SpaceMentionableContributorsArgs = {
  filter?: InputMaybe<ContributorFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  types?: InputMaybe<Array<ActorType>>;
};

export type SpaceSubspaceByNameIdArgs = {
  NAMEID: Scalars['NameID'];
};

export type SpaceSubspacesArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type SpaceAbout = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The classification entries on this About, in sortOrder. Empty array when none exist — never null, never an error. */
  classifications: Array<ClassificationEntry>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The guidelines for members of this Community. */
  guidelines: CommunityGuidelines;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Is the content of this Space visible to non-Members?. */
  isContentPublic: Scalars['Boolean'];
  /** The membership information for this Space. */
  membership: SpaceAboutMembership;
  /** Metrics about activity within this Space. */
  metrics?: Maybe<Array<Nvp>>;
  /** The Profile for the Space. */
  profile: Profile;
  /** The Space provider (host). */
  provider?: Maybe<Actor>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** Who should get involved in this challenge */
  who?: Maybe<Scalars['Markdown']>;
  /** The goal that is being pursued */
  why?: Maybe<Scalars['Markdown']>;
};

export type SpaceAboutMembership = {
  /** The Form used for Applications to this Space. */
  applicationForm: Form;
  /** The identifier of the Community within the Space. */
  communityID: Scalars['UUID'];
  /** The Lead Organizations that are associated with this Space. */
  leadOrganizations: Array<Organization>;
  /** The Lead Users that are associated with this Space. */
  leadUsers: Array<User>;
  /** The membership status of the currently logged in user. */
  myMembershipStatus?: Maybe<CommunityMembershipStatus>;
  /** The privileges granted to the current user based on the Space membership policy. */
  myPrivileges?: Maybe<Array<AuthorizationPrivilege>>;
  /** The identifier of the RoleSet within the Space. */
  roleSetID: Scalars['UUID'];
};

export type SpaceFilterInput = {
  /** Return Spaces with a Visibility matching one of the provided types. */
  visibilities?: InputMaybe<Array<SpaceVisibility>>;
};

export enum SpaceLevel {
  L0 = 'L0',
  L1 = 'L1',
  L2 = 'L2',
}

export type SpacePendingMembershipInfo = {
  /** About the Space */
  about: SpaceAbout;
  /** The CommunityGuidelines for the Space */
  communityGuidelines: CommunityGuidelines;
  /** The Space ID */
  id: Scalars['UUID'];
  /** The Level of the Space */
  level: SpaceLevel;
};

export enum SpacePrivacyMode {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type SpaceSettings = {
  /** The collaboration settings for this Space. */
  collaboration: SpaceSettingsCollaboration;
  /** The layout settings for this Space. */
  layout: SpaceSettingsLayout;
  /** The membership settings for this Space. */
  membership: SpaceSettingsMembership;
  /** The privacy settings for this Space */
  privacy: SpaceSettingsPrivacy;
  /** The sort mode for subspaces of this Space: Alphabetical or Custom. */
  sortMode: SpaceSortMode;
};

export type SpaceSettingsCollaboration = {
  /** Flag to control if events from Subspaces are visible on this Space calendar as well. */
  allowEventsFromSubspaces: Scalars['Boolean'];
  /** Flag to control if guest users can contribute to this Space. */
  allowGuestContributions: Scalars['Boolean'];
  /** Flag to control if members can create callouts. */
  allowMembersToCreateCallouts: Scalars['Boolean'];
  /** Flag to control if members can create subspaces. */
  allowMembersToCreateSubspaces: Scalars['Boolean'];
  /** Flag to control if members can create video calls in this Space. */
  allowMembersToVideoCall: Scalars['Boolean'];
  /** Flag to control if ability to contribute is inherited from parent Space. */
  inheritMembershipRights: Scalars['Boolean'];
};

export type SpaceSettingsLayout = {
  /**
   * The default display mode for callout descriptions in this Space.
   * @deprecated REMOVE_AFTER=2026-10-31 | superseded by InnovationFlowStateSettings.descriptionDisplayMode
   */
  calloutDescriptionDisplayMode: CalloutDescriptionDisplayMode;
};

export type SpaceSettingsMembership = {
  /** Allow subspace admins to invite to this Space. */
  allowSubspaceAdminsToInviteMembers: Scalars['Boolean'];
  /** The membership policy in usage for this Space */
  policy: CommunityMembershipPolicy;
  /** The organizations that are trusted to Join as members for this Space */
  trustedOrganizations: Array<Scalars['UUID']>;
};

export type SpaceSettingsPrivacy = {
  /** Flag to control if Platform Support has admin rights. */
  allowPlatformSupportAsAdmin: Scalars['Boolean'];
  /** The privacy mode for this Space */
  mode: SpacePrivacyMode;
  /** Controls who may read member-user information. Follows space visibility by default, or restricts it to members only. Absent is treated as follow-space-visibility. */
  userInformationVisibility?: Maybe<UserInformationVisibility>;
};

export enum SpaceSortMode {
  Alphabetical = 'ALPHABETICAL',
  Custom = 'CUSTOM',
}

export type SpaceSubscription = {
  /** The expiry date of this subscription, null if it does never expire. */
  expires?: Maybe<Scalars['DateTime']>;
  /** The name of the Subscription. */
  name: LicensingCredentialBasedCredentialType;
};

export enum SpaceVisibility {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Demo = 'DEMO',
  Inactive = 'INACTIVE',
}

export type StorageAggregator = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The Storage Bucket for files directly on this Storage Aggregator (legacy). */
  directStorageBucket: StorageBucket;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The key information about the entity using this StorageAggregator, if any. */
  parentEntity?: Maybe<StorageAggregatorParent>;
  /** The aggregate size of all StorageBuckets for this StorageAggregator. */
  size: Scalars['Float'];
  /** The list of child storageAggregators for this StorageAggregator. */
  storageAggregators: Array<StorageAggregator>;
  /** The Storage Buckets that are being managed via this StorageAggregators. */
  storageBuckets: Array<StorageBucket>;
  /** A type of entity that this StorageAggregator is being used with. */
  type?: Maybe<StorageAggregatorType>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

/** Valid parent is Account, Space, User, Organization, Platform */
export type StorageAggregatorParent = {
  /** The display name. */
  displayName: Scalars['String'];
  /** The UUID of the parent entity. */
  id: Scalars['UUID'];
  /** If the parent entity is a Space, then the level of the Space. */
  level?: Maybe<SpaceLevel>;
  /** The URL that can be used to access the parent entity. */
  url: Scalars['String'];
};

export enum StorageAggregatorType {
  Account = 'ACCOUNT',
  Organization = 'ORGANIZATION',
  Platform = 'PLATFORM',
  Space = 'SPACE',
  User = 'USER',
}

export type StorageBucket = {
  /** Mime types allowed to be stored on this StorageBucket. */
  allowedMimeTypes: Array<Scalars['String']>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** A single Document */
  document?: Maybe<Document>;
  /** The list of Documents for this StorageBucket. */
  documents: Array<Document>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Maximum allowed file size on this StorageBucket. */
  maxFileSize: Scalars['Float'];
  /** The key information about the entity using this StorageBucket, if any. */
  parentEntity?: Maybe<StorageBucketParent>;
  /** The aggregate size of all Documents for this StorageBucket. */
  size: Scalars['Float'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type StorageBucketDocumentArgs = {
  ID: Scalars['UUID'];
};

export type StorageBucketDocumentsArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  limit?: InputMaybe<Scalars['Float']>;
};

export type StorageBucketParent = {
  /** The display name. */
  displayName: Scalars['String'];
  /** The UUID of the parent entity. */
  id: Scalars['UUID'];
  /** The type of entity that this StorageBucket is being used with. */
  type: ProfileType;
  /** The URL that can be used to access the parent entity. */
  url: Scalars['String'];
};

export type StorageBucketUploadFileInput = {
  storageBucketId: Scalars['String'];
  /** Is this a temporary Document that will be moved later to another StorageBucket. */
  temporaryLocation?: InputMaybe<Scalars['Boolean']>;
};

export type StorageBucketUploadFileOnLinkInput = {
  linkID: Scalars['String'];
};

export type StorageBucketUploadFileOnReferenceInput = {
  referenceID: Scalars['String'];
};

export type StorageBucketUploadFileResult = {
  /** The ID of the uploaded Document. */
  id: Scalars['UUID'];
  /** The publicly accessible URL for the uploaded file. */
  url: Scalars['String'];
};

export type StorageConfig = {
  /** Config for uploading files to Alkemio. */
  file: FileStorageConfig;
};

export type SubscribeToPushNotificationsInput = {
  /** The auth key from PushSubscription.getKey('auth'), Base64URL-encoded */
  auth: Scalars['String'];
  /** The push service endpoint URL from PushSubscription.endpoint */
  endpoint: Scalars['String'];
  /** The p256dh key from PushSubscription.getKey('p256dh'), Base64URL-encoded */
  p256dh: Scalars['String'];
  /** Optional browser/device user agent for display in subscription management UI */
  userAgent?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  activityCreated: ActivityCreatedSubscriptionResult;
  /** Receive new Update messages on Communities the currently authenticated User is a member of. */
  calloutPostCreated: CalloutPostCreated;
  /** Receive conversation events for the authenticated user. Includes conversation lifecycle (created, updated, deleted), messages (received, removed), membership changes (member added, removed), and read receipts. */
  conversationEvents: ConversationEventSubscriptionResult;
  /** Receive updates on Discussions */
  forumDiscussionUpdated: Discussion;
  /** New in-app notification received for the currently authenticated user. */
  inAppNotificationReceived: InAppNotification;
  /** Counter of unread in-app notifications for the currently authenticated user. */
  notificationsUnreadCount: Scalars['Int'];
  /** Subscribe to option changes on a specific Poll. Fires when options are added, removed, updated, or reordered. Always delivered regardless of resultsVisibility. */
  pollOptionsChanged: PollOptionsChangedSubscriptionResult;
  /** Subscribe to vote updates on a specific Poll. Fires when votes are cast or updated. When resultsVisibility = HIDDEN and the subscriber has not voted, events are suppressed. */
  pollVoteUpdated: PollVoteUpdatedSubscriptionResult;
  /** Receive Room event */
  roomEvents: RoomEventSubscriptionResult;
  /** Receive new Subspaces created on the Space. */
  subspaceCreated: SubspaceCreated;
  /** Receive updates on virtual contributors */
  virtualContributorUpdated: VirtualContributorUpdatedSubscriptionResult;
};

export type SubscriptionActivityCreatedArgs = {
  input: ActivityCreatedSubscriptionInput;
};

export type SubscriptionCalloutPostCreatedArgs = {
  calloutID: Scalars['UUID'];
};

export type SubscriptionForumDiscussionUpdatedArgs = {
  forumID: Scalars['UUID'];
};

export type SubscriptionPollOptionsChangedArgs = {
  pollID: Scalars['UUID'];
};

export type SubscriptionPollVoteUpdatedArgs = {
  pollID: Scalars['UUID'];
};

export type SubscriptionRoomEventsArgs = {
  roomID: Scalars['UUID'];
};

export type SubscriptionSubspaceCreatedArgs = {
  spaceID: Scalars['UUID'];
};

export type SubscriptionVirtualContributorUpdatedArgs = {
  virtualContributorID: Scalars['UUID'];
};

export type SubspaceCreated = {
  /** The identifier for the Space on which the subspace was created. */
  spaceID: Scalars['UUID'];
  /** The subspace that has been created. */
  subspace: Space;
};

export type Tagset = {
  /** The allowed values for this Tagset. */
  allowedValues: Array<Scalars['String']>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  tags: Array<Scalars['String']>;
  type: TagsetType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type TagsetArgs = {
  /** Return only Callouts that match one of the tagsets and any of the tags in them. */
  name: TagsetReservedName;
  /** A list of tags to include. */
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export enum TagsetReservedName {
  Capabilities = 'CAPABILITIES',
  Default = 'DEFAULT',
  FlowState = 'FLOW_STATE',
  Keywords = 'KEYWORDS',
  Skills = 'SKILLS',
  Task = 'TASK',
}

export type TagsetTemplate = {
  allowedValues: Array<Scalars['String']>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** For Tagsets of type SELECT_ONE, the default selected value. */
  defaultSelectedValue?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  type: TagsetType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export enum TagsetType {
  Freeform = 'FREEFORM',
  SelectMany = 'SELECT_MANY',
  SelectOne = 'SELECT_ONE',
}

export type Task = {
  /** The timestamp when the task was created */
  created: Scalars['Float'];
  /** the timestamp when the task was completed */
  end?: Maybe<Scalars['Float']>;
  /** info about the errors of the task */
  errors?: Maybe<Array<Scalars['String']>>;
  /** The UUID of the task */
  id: Scalars['UUID'];
  /** Amount of items that need to be processed */
  itemsCount?: Maybe<Scalars['Float']>;
  /** Amount of items that are already processed */
  itemsDone?: Maybe<Scalars['Float']>;
  /** The progress  of the task if the total item count is defined */
  progress?: Maybe<Scalars['Float']>;
  /** info about the completed part of the task */
  results?: Maybe<Array<Scalars['String']>>;
  /** The timestamp when the task was started */
  start: Scalars['Float'];
  /** The current status of the task */
  status: TaskStatus;
  /** TBD */
  type?: Maybe<Scalars['String']>;
};

export type TaskColumnCount = {
  /** The Tasks board column, in the board-defined order. */
  column: Scalars['String'];
  /** The number of tasks currently in this column. */
  count: Scalars['Int'];
};

/** The current status of the task */
export enum TaskStatus {
  Completed = 'COMPLETED',
  Errored = 'ERRORED',
  InProgress = 'IN_PROGRESS',
}

export type Template = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Callout for this Template. */
  callout?: Maybe<Callout>;
  /** The classification vocabulary; null unless this Template is of type CLASSIFICATION — and never null when it is. */
  classification?: Maybe<ClassificationTemplateContent>;
  /** The Community Guidelines for this Template. */
  communityGuidelines?: Maybe<CommunityGuidelines>;
  /** The Space for this Template. */
  contentSpace?: Maybe<TemplateContentSpace>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The description for Post Templates to users filling out a new Post based on this Template. */
  postDefaultDescription?: Maybe<Scalars['Markdown']>;
  /** The Profile for this Template. */
  profile: Profile;
  /** The type for this Template. */
  type: TemplateType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The Whiteboard for this Template. */
  whiteboard?: Maybe<Whiteboard>;
};

export type TemplateContentSpace = {
  /** Template to be used to tell About a new Space. */
  about: SpaceAbout;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The collaboration for the TemplateContentSpace. */
  collaboration: Collaboration;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The level of this TemplateContentSpace */
  level: SpaceLevel;
  /** The settings for this TemplateContentSpace. */
  settings: SpaceSettings;
  /** The template subspaces for the Template Content Space. */
  subspaces: Array<TemplateContentSpace>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type TemplateDefault = {
  /** The type of any Template stored here. */
  allowedTemplateType: TemplateType;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The template accessible via this TemplateDefault, if any. */
  template?: Maybe<Template>;
  /** The type of this TemplateDefault. */
  type: TemplateDefaultType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export enum TemplateDefaultType {
  PlatformSpace = 'PLATFORM_SPACE',
  PlatformSpaceTutorials = 'PLATFORM_SPACE_TUTORIALS',
  PlatformSubspace = 'PLATFORM_SUBSPACE',
  PlatformSubspaceKnowledge = 'PLATFORM_SUBSPACE_KNOWLEDGE',
  SpaceSubspace = 'SPACE_SUBSPACE',
}

export type TemplateResult = {
  /** The InnovationPack where this Template is being returned from. */
  innovationPack: InnovationPack;
  /** The Template that is being returned. */
  template: Template;
};

export enum TemplateType {
  Callout = 'CALLOUT',
  Classification = 'CLASSIFICATION',
  CommunityGuidelines = 'COMMUNITY_GUIDELINES',
  Post = 'POST',
  Space = 'SPACE',
  Whiteboard = 'WHITEBOARD',
}

export type TemplatesManager = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The TemplateDefaults in this TemplatesManager. */
  templateDefaults: Array<TemplateDefault>;
  /** The templatesSet in use by this TemplatesManager. */
  templatesSet?: Maybe<TemplatesSet>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type TemplatesSet = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The CalloutTemplates in this TemplatesSet. */
  calloutTemplates: Array<Template>;
  /** The total number of CalloutTemplates in this TemplatesSet. */
  calloutTemplatesCount: Scalars['Float'];
  /** The Classification Templates in this TemplatesSet. */
  classificationTemplates: Array<Template>;
  /** The total number of Classification Templates in this TemplatesSet. */
  classificationTemplatesCount: Scalars['Float'];
  /** The CommunityGuidelines in this TemplatesSet. */
  communityGuidelinesTemplates: Array<Template>;
  /** The total number of CommunityGuidelinesTemplates in this TemplatesSet. */
  communityGuidelinesTemplatesCount: Scalars['Float'];
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Post Templates in this TemplatesSet. */
  postTemplates: Array<Template>;
  /** The total number of Post Templates in this TemplatesSet. */
  postTemplatesCount: Scalars['Float'];
  /** The Space Templates in this TemplatesSet. */
  spaceTemplates: Array<Template>;
  /** The total number of Space Templates in this TemplatesSet. */
  spaceTemplatesCount: Scalars['Float'];
  /** The Templates in this TemplatesSet. */
  templates: Array<Template>;
  /** The total number of Templates in this TemplatesSet. */
  templatesCount: Scalars['Float'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The WhiteboardTemplates in this TemplatesSet. */
  whiteboardTemplates: Array<Template>;
  /** The total number of WhiteboardTemplates in this TemplatesSet. */
  whiteboardTemplatesCount: Scalars['Float'];
};

export type Timeline = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Innovation Library for the timeline */
  calendar: Calendar;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type TransferAccountInnovationHubInput = {
  /** The Innovation Hub to be transferred. */
  innovationHubID: Scalars['UUID'];
  /** The Account to which the Innovation Hub will be transferred. */
  targetAccountID: Scalars['UUID'];
};

export type TransferAccountInnovationPackInput = {
  /** The InnovationPack to be transferred. */
  innovationPackID: Scalars['UUID'];
  /** The Account to which the Innovation Pack will be transferred. */
  targetAccountID: Scalars['UUID'];
};

export type TransferAccountSpaceInput = {
  /** The Space to be transferred. */
  spaceID: Scalars['UUID'];
  /** The Account to which the Space will be transferred. */
  targetAccountID: Scalars['UUID'];
};

export type TransferAccountVirtualContributorInput = {
  /** The Account to which the Virtual Contributor will be transferred. */
  targetAccountID: Scalars['UUID'];
  /** The Virtual Contributor to be transferred. */
  virtualContributorID: Scalars['UUID'];
};

export type TransferCalloutInput = {
  /** The Callout to be transferred. */
  calloutID: Scalars['UUID'];
  /** The target CalloutsSet to which the Callout will be transferred. */
  targetCalloutsSetID: Scalars['UUID'];
};

export type UnsubscribeFromPushNotificationsInput = {
  /** The ID of the push subscription to remove. */
  subscriptionID: Scalars['UUID'];
};

export type UpdateAiPersonaInput = {
  ID: Scalars['UUID'];
  engine?: InputMaybe<AiPersonaEngine>;
  externalConfig?: InputMaybe<ExternalConfigInput>;
  prompt?: InputMaybe<Array<Scalars['String']>>;
  promptGraph?: InputMaybe<PromptGraphInput>;
};

export type UpdateApplicationFormOnRoleSetInput = {
  formData: UpdateFormInput;
  roleSetID: Scalars['UUID'];
};

export type UpdateBaselineLicensePlanOnAccount = {
  /** The Account to update the Baseline License Plan. */
  accountID: Scalars['UUID'];
  /** The number of Innovation Packs allowed. */
  innovationPacks?: InputMaybe<Scalars['Int']>;
  /** The number of Free Spaces allowed. */
  spaceFree?: InputMaybe<Scalars['Int']>;
  /** The number of Plus Spaces allowed. */
  spacePlus?: InputMaybe<Scalars['Int']>;
  /** The number of Premium Spaces allowed. */
  spacePremium?: InputMaybe<Scalars['Int']>;
  /** The number of Starting Pages allowed. */
  startingPages?: InputMaybe<Scalars['Int']>;
  /** The number of Virtual Contributors allowed. */
  virtualContributor?: InputMaybe<Scalars['Int']>;
};

export type UpdateCalendarEventInput = {
  ID: Scalars['UUID'];
  /** The length of the event in days. */
  durationDays?: InputMaybe<Scalars['Float']>;
  /** The length of the event in minutes. */
  durationMinutes: Scalars['Float'];
  /** Flag to indicate if this event is for multiple days. */
  multipleDays: Scalars['Boolean'];
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  /** The state date for the event. */
  startDate: Scalars['DateTime'];
  type?: InputMaybe<CalendarEventType>;
  /** Is the event visible on the parent calendar. */
  visibleOnParentCalendar?: InputMaybe<Scalars['Boolean']>;
  /** Flag to indicate if this event is for a whole day. */
  wholeDay: Scalars['Boolean'];
};

export type UpdateCalloutContributionDefaultsInput = {
  /** Remove the stored Whiteboard contribution default. Mutually exclusive with sourceWhiteboardID and sourceCalloutID. */
  clearWhiteboardContent?: InputMaybe<Scalars['Boolean']>;
  /** The default title to use for new contributions. */
  defaultDisplayName?: InputMaybe<Scalars['String']>;
  /** Replace the default from a server-owned live Whiteboard contribution-default draft. Mutually exclusive with either source field and clearWhiteboardContent. */
  draftWhiteboardID?: InputMaybe<Scalars['UUID']>;
  /** The default description to use for new Post contributions. */
  postDescription?: InputMaybe<Scalars['Markdown']>;
  /** Copy the internal Whiteboard contribution default from this source Callout. Mutually exclusive with sourceWhiteboardID and clearWhiteboardContent. */
  sourceCalloutID?: InputMaybe<Scalars['UUID']>;
  /** Replace the default from an existing Whiteboard. The server copies its content and media into the owning Callout bucket; the source id is not persisted. */
  sourceWhiteboardID?: InputMaybe<Scalars['UUID']>;
};

export type UpdateCalloutContributorsSettingsInput = {
  /** When provided, replaces the selected contributor types (at least one). */
  contributorTypes?: InputMaybe<Array<ActorType>>;
  /** The default contributor type (one of contributorTypes). Defaults to the first selected type. */
  defaultContributorType?: InputMaybe<ActorType>;
  /** The default display mode. Defaults to LIST; MAP requires a locatable contributor type. */
  defaultView?: InputMaybe<ContributorCollectionView>;
  /** Admin-fixed initial map view. Omitted ⇒ stored view unchanged; explicit null ⇒ clear to automatic framing. */
  mapView?: InputMaybe<CreateCalloutContributorsMapViewInput>;
};

export type UpdateCalloutEntityInput = {
  ID: Scalars['UUID'];
  classification?: InputMaybe<UpdateClassificationInput>;
  contributionDefaults?: InputMaybe<UpdateCalloutContributionDefaultsInput>;
  framing?: InputMaybe<UpdateCalloutFramingInput>;
  /** Set Group for this Callout. */
  groupName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  settings?: InputMaybe<UpdateCalloutSettingsInput>;
  /** The sort order to assign to this Callout. */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

export type UpdateCalloutFramingInput = {
  /** Collabora document input. Used when switching framing type to COLLABORA_DOCUMENT. */
  collaboraDocument?: InputMaybe<CreateCollaboraDocumentInput>;
  link?: InputMaybe<UpdateLinkInput>;
  /** The new markdown content for the Memo. */
  memoContent?: InputMaybe<Scalars['Markdown']>;
  /** Updates for the Poll attached to this Framing. Only applies when type = POLL. */
  poll?: InputMaybe<UpdatePollInput>;
  /** The Profile of the Template. */
  profile?: InputMaybe<UpdateProfileInput>;
  /** Replace the framing Whiteboard from another Whiteboard through a server-side authorized copy. */
  sourceWhiteboardID?: InputMaybe<Scalars['UUID']>;
  /** The type of additional content attached to the framing of the callout. */
  type?: InputMaybe<CalloutFramingType>;
  /** The new preview settings for the Whiteboard. */
  whiteboardPreviewSettings?: InputMaybe<UpdateWhiteboardPreviewSettingsInput>;
};

export type UpdateCalloutPublishInfoInput = {
  /** The identifier for the Callout whose publisher is to be updated. */
  calloutID: Scalars['UUID'];
  /** The timestamp to set for the publishing of the Callout. */
  publishDate?: InputMaybe<Scalars['Float']>;
  /** The identifier of the publisher of the Callout. */
  publisherID?: InputMaybe<Scalars['UUID']>;
};

export type UpdateCalloutSelectionSettingsInput = {
  /** The selection mode (AUTO or CUSTOM). When omitted, the stored mode is unchanged. */
  mode?: InputMaybe<CalloutSelectionMode>;
  /** Replaces the curated selection in full (CUSTOM mode). At most 500 entries. Deduplicated by the server. When omitted, the stored list is unchanged. */
  selectedIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type UpdateCalloutSettingsContributionInput = {
  /** Indicate who can add more contributions to the callout. */
  canAddContributions?: InputMaybe<CalloutAllowedActors>;
  /** Can comment to contributions callout. */
  commentsEnabled?: InputMaybe<Scalars['Boolean']>;
  /** Can add contributions to the Callout. Allowed Contribution types is going to be readOnly, so this field can be used to enable or disable the contribution temporarily instead of setting allowedTypes to None. */
  enabled?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateCalloutSettingsFramingInput = {
  /** Can comment to callout framing. */
  commentsEnabled?: InputMaybe<Scalars['Boolean']>;
  /** Configuration for a contributor-collection callout. Provide only when framing.type = CONTRIBUTORS. */
  contributors?: InputMaybe<UpdateCalloutContributorsSettingsInput>;
  /** Manual-selection settings for collection callouts (CONTRIBUTORS or SPACES). Provide only when framing.type ∈ {CONTRIBUTORS, SPACES}. */
  selection?: InputMaybe<UpdateCalloutSelectionSettingsInput>;
};

export type UpdateCalloutSettingsInput = {
  contribution?: InputMaybe<UpdateCalloutSettingsContributionInput>;
  framing?: InputMaybe<UpdateCalloutSettingsFramingInput>;
  /** Visibility of the Callout. */
  visibility?: InputMaybe<CalloutVisibility>;
};

export type UpdateCalloutVisibilityInput = {
  /** The identifier for the Callout whose visibility is to be updated. */
  calloutID: Scalars['String'];
  /** Send a notification on publishing. */
  sendNotification?: InputMaybe<Scalars['Boolean']>;
  /** Visibility of the Callout. */
  visibility: CalloutVisibility;
};

export type UpdateCalloutsSortOrderInput = {
  /** The IDs of the callouts to update the sort order on */
  calloutIDs: Array<Scalars['UUID']>;
  calloutsSetID: Scalars['UUID'];
};

export type UpdateClassificationEntryDisplayInput = {
  classificationEntryID: Scalars['UUID'];
  display: Scalars['Boolean'];
};

export type UpdateClassificationEntryInput = {
  cardinality?: InputMaybe<ClassificationCardinality>;
  classificationEntryID: Scalars['UUID'];
  displayLabel?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Array<CreateClassificationValueInput>>;
};

export type UpdateClassificationEntrySelectionInput = {
  classificationEntryID: Scalars['UUID'];
  /** The complete set of selected value ids. An empty list clears the selection. */
  selectedValueIDs: Array<Scalars['String']>;
};

export type UpdateClassificationInput = {
  tagsets?: InputMaybe<Array<UpdateTagsetInput>>;
};

export type UpdateClassificationSelectTagsetValueInput = {
  classificationID: Scalars['UUID'];
  selectedValue: Scalars['String'];
  tagsetName: Scalars['String'];
};

export type UpdateCollaboraDocumentInput = {
  /** The ID of the CollaboraDocument to update. */
  ID: Scalars['UUID'];
  /** Updated display name for the document. */
  displayName?: InputMaybe<Scalars['String']>;
};

export type UpdateCollaborationFromSpaceTemplateInput = {
  /** Add the Callouts from the Collaboration Template */
  addCallouts?: InputMaybe<Scalars['Boolean']>;
  /** ID of the Collaboration to be updated */
  collaborationID: Scalars['UUID'];
  /** Delete existing Callouts before applying template. When combined with addCallouts=true, enables Replace All behavior. */
  deleteExistingCallouts?: InputMaybe<Scalars['Boolean']>;
  /** The Space Template whose Collaboration that will be used for updates to the target Collaboration */
  spaceTemplateID: Scalars['UUID'];
};

export type UpdateCommunityGuidelinesEntityInput = {
  /** ID of the CommunityGuidelines */
  communityGuidelinesID: Scalars['UUID'];
  /** The Profile for this community guidelines. */
  profile: UpdateProfileInput;
};

export type UpdateContributionCalloutsSortOrderInput = {
  calloutID: Scalars['UUID'];
  /** The IDs of the contributions to update the sort order on */
  contributionIDs: Array<Scalars['UUID']>;
};

export type UpdateConversationInput = {
  /** Avatar URL for the conversation. Accepts mxc:// or https:// URLs. Pass empty string to remove. */
  avatarUrl?: InputMaybe<Scalars['String']>;
  /** The ID of the conversation to update. */
  conversationID: Scalars['UUID'];
  /** New display name for the conversation. Only GROUP conversations support custom names. */
  displayName?: InputMaybe<Scalars['String']>;
};

export type UpdateDiscussionInput = {
  ID: Scalars['UUID'];
  /** The category for the Discussion */
  category?: InputMaybe<ForumDiscussionCategory>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
};

export type UpdateDocumentInput = {
  ID: Scalars['UUID'];
  /** Display name. Currently rejected with a ValidationException — for documents owned by a parent entity (e.g., CollaboraDocument, Profile), use the parent's update mutation, which carries the context (file extension, MIME, profile coupling) needed to keep editor titles, download names, and the file-service row in sync. Direct rename via updateDocument will be wired when documents become a directly-managed resource (e.g., a per-space documents collection). */
  displayName?: InputMaybe<Scalars['String']>;
  tagset?: InputMaybe<UpdateTagsetInput>;
};

export type UpdateFormInput = {
  description: Scalars['Markdown'];
  questions: Array<UpdateFormQuestionInput>;
};

export type UpdateFormQuestionInput = {
  /** The explation text to clarify the question. */
  explanation: Scalars['String'];
  /** The maxiumum length of the answer, in characters, up to a limit of 512. */
  maxLength: Scalars['Float'];
  /** The question to be answered */
  question: Scalars['String'];
  /** Whether an answer is required for this Question. */
  required: Scalars['Boolean'];
  /** The sort order of this question in a wider set of questions. */
  sortOrder: Scalars['Float'];
};

export type UpdateInnovationFlowCurrentStateInput = {
  /** ID of the Innovation Flow State to be selected as the current one. */
  currentStateID: Scalars['UUID'];
  /** ID of the Innovation Flow */
  innovationFlowID: Scalars['UUID'];
};

export type UpdateInnovationFlowInput = {
  /** ID of the Innovation Flow */
  innovationFlowID: Scalars['UUID'];
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
};

export type UpdateInnovationFlowStateInput = {
  /** Optional. The explanation text to clarify the State; omission leaves the stored value unchanged. */
  description?: InputMaybe<Scalars['Markdown']>;
  /** Optional. The display name for the State; omission leaves the stored value unchanged. */
  displayName?: InputMaybe<Scalars['String']>;
  /** ID of the Innovation Flow */
  innovationFlowStateID: Scalars['UUID'];
  settings?: InputMaybe<UpdateInnovationFlowStateSettingsInput>;
};

export type UpdateInnovationFlowStateSettingsInput = {
  /** Optional. Sets whether new callouts can be added to this State; omission leaves the stored value unchanged. */
  allowNewCallouts?: InputMaybe<Scalars['Boolean']>;
  /** Optional. Sets how Post descriptions in this State are displayed in the feed; omission leaves the stored value unchanged. */
  descriptionDisplayMode?: InputMaybe<CalloutDescriptionDisplayMode>;
  /** Optional. Sets whether Posts in this State show publish details (publisher, publish date, avatar) in the feed; omission leaves the stored value unchanged. */
  showPublishDetails?: InputMaybe<Scalars['Boolean']>;
  /** Optional. Ordered sidebar widgets for this State; omission leaves the stored value unchanged. Duplicates rejected; max 20 entries. */
  sidebar?: InputMaybe<Array<SidebarWidget>>;
  /** Optional. Sets whether the phase is shown in member-facing navigation; omission leaves the stored value unchanged. */
  visible?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateInnovationFlowStatesSortOrderInput = {
  innovationFlowID: Scalars['UUID'];
  /** The IDs of the states to update the sort order on */
  stateIDs: Array<Scalars['UUID']>;
};

export type UpdateInnovationHubInput = {
  ID: Scalars['UUID'];
  /** The Innovation Packs curated for this Innovation Hub; full replace. An empty list is allowed and hides the section. Omit to leave unchanged. */
  innovationPackListFilter?: InputMaybe<Array<Scalars['UUID']>>;
  /** Flag to control the visibility of the InnovationHub in the platform store. */
  listedInStore?: InputMaybe<Scalars['Boolean']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  /** Visibility of the InnovationHub in searches. */
  searchVisibility?: InputMaybe<SearchVisibility>;
  /** A list of Spaces to include in this Innovation Hub; full replace. An empty list is allowed and hides the Spaces listing. Only valid when type 'list' is used. */
  spaceListFilter?: InputMaybe<Array<Scalars['UUID']>>;
  /** Spaces with which visibility this Innovation Hub will display. Only valid when type 'visibility' is used. */
  spaceVisibilityFilter?: InputMaybe<SpaceVisibility>;
  /** The Virtual Contributors curated for this Innovation Hub; full replace. An empty list is allowed and hides the section. Omit to leave unchanged. */
  virtualContributorListFilter?: InputMaybe<Array<Scalars['UUID']>>;
};

export type UpdateInnovationPackInput = {
  ID: Scalars['UUID'];
  /** Flag to control the visibility of the InnovationPack in the platform Library. */
  listedInStore?: InputMaybe<Scalars['Boolean']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  /** Visibility of the InnovationPack in searches. */
  searchVisibility?: InputMaybe<SearchVisibility>;
};

export type UpdateKnowledgeBaseInput = {
  /** The Profile of the Template. */
  profile?: InputMaybe<UpdateProfileInput>;
};

export type UpdateLicensePlanInput = {
  ID: Scalars['UUID'];
  /** Assign this plan to all new Organization accounts */
  assignToNewOrganizationAccounts?: InputMaybe<Scalars['Boolean']>;
  /** Assign this plan to all new User accounts */
  assignToNewUserAccounts?: InputMaybe<Scalars['Boolean']>;
  /** Is this plan enabled? */
  enabled?: InputMaybe<Scalars['Boolean']>;
  /** Is this plan free? */
  isFree?: InputMaybe<Scalars['Boolean']>;
  /** The credential to represent this plan */
  licenseCredential?: InputMaybe<LicensingCredentialBasedCredentialType>;
  /** The price per month of this plan. */
  pricePerMonth?: InputMaybe<Scalars['Float']>;
  /** Does this plan require contact support */
  requiresContactSupport?: InputMaybe<Scalars['Boolean']>;
  /** Does this plan require a payment method? */
  requiresPaymentMethod?: InputMaybe<Scalars['Boolean']>;
  /** The sorting order for this Plan. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** Is there a trial period enabled */
  trialEnabled?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateLicensePolicyCredentialRuleInput = {
  ID: Scalars['UUID'];
  credentialType: LicensingCredentialBasedCredentialType;
  grantedEntitlements: Array<LicensingGrantedEntitlementInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateLinkInput = {
  ID: Scalars['UUID'];
  /** The Profile of the Link. */
  profile?: InputMaybe<UpdateProfileInput>;
  uri?: InputMaybe<Scalars['String']>;
};

export type UpdateLocationInput = {
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  stateOrProvince?: InputMaybe<Scalars['String']>;
};

export type UpdateMemoEntityInput = {
  ID: Scalars['UUID'];
  contentUpdatePolicy?: InputMaybe<ContentUpdatePolicy>;
  /** The Profile of this entity. */
  profile?: InputMaybe<UpdateProfileInput>;
};

export type UpdateNotificationStateInput = {
  /** The ID of the notification to update. */
  ID: Scalars['UUID'];
  /** The new state of the notification. */
  state: NotificationEventInAppState;
};

export type UpdateOrganizationInput = {
  ID: Scalars['UUID'];
  contactEmail?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  legalEntityName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UpdateOrganizationPlatformSettingsInput = {
  /** Upate the URL path for the Organization. */
  nameID: Scalars['NameID'];
  /** The ID of the Organization to update. */
  organizationID: Scalars['UUID'];
};

export type UpdateOrganizationSettingsEntityInput = {
  membership?: InputMaybe<UpdateOrganizationSettingsMembershipInput>;
  privacy?: InputMaybe<UpdateOrganizationSettingsPrivacyInput>;
};

export type UpdateOrganizationSettingsInput = {
  /** The identifier for the Organization whose settings are to be updated. */
  organizationID: Scalars['UUID'];
  /** Update the settings for the Organization. */
  settings: UpdateOrganizationSettingsEntityInput;
};

export type UpdateOrganizationSettingsMembershipInput = {
  /** Allow Users with email addresses matching the domain of this Organization to join. */
  allowUsersMatchingDomainToJoin: Scalars['Boolean'];
};

export type UpdateOrganizationSettingsPrivacyInput = {
  /** Allow contribution roles (membership, lead etc) in Spaces to be visible. */
  contributionRolesPubliclyVisible: Scalars['Boolean'];
};

export type UpdatePlatformSettingsInput = {
  integration?: InputMaybe<UpdatePlatformSettingsIntegrationInput>;
};

export type UpdatePlatformSettingsIntegrationInput = {
  /** Update the list of allowed URLs for iFrames within Markdown content. */
  iframeAllowedUrls: Array<Scalars['String']>;
  /** Update the list of email addresses blocked from receiving notifications. */
  notificationEmailBlacklist?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdatePollInput = {
  /** Updated title for the Poll (max 512 chars). This is the only mutable property once a poll is created; options are managed via separate mutations. */
  title?: InputMaybe<Scalars['String']>;
};

export type UpdatePollOptionInput = {
  optionID: Scalars['UUID'];
  pollID: Scalars['UUID'];
  text: Scalars['String'];
};

export type UpdatePollStatusInput = {
  /** The ID of the Poll to update. */
  pollID: Scalars['UUID'];
  /** The new status for the poll. */
  status: PollStatus;
};

export type UpdatePostInput = {
  ID: Scalars['UUID'];
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
};

export type UpdateProfileDirectInput = {
  description?: InputMaybe<Scalars['Markdown']>;
  /** The display name for the entity. */
  displayName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<UpdateLocationInput>;
  profileID: Scalars['UUID'];
  references?: InputMaybe<Array<UpdateReferenceInput>>;
  /** A memorable short description for this entity. */
  tagline?: InputMaybe<Scalars['String']>;
  tagsets?: InputMaybe<Array<UpdateTagsetInput>>;
};

export type UpdateProfileInput = {
  description?: InputMaybe<Scalars['Markdown']>;
  /** The display name for the entity. */
  displayName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<UpdateLocationInput>;
  references?: InputMaybe<Array<UpdateReferenceInput>>;
  /** A memorable short description for this entity. */
  tagline?: InputMaybe<Scalars['String']>;
  tagsets?: InputMaybe<Array<UpdateTagsetInput>>;
};

export type UpdateReferenceInput = {
  ID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
};

export type UpdateSpaceAboutInput = {
  /** The Profile of this Space. */
  profile?: InputMaybe<UpdateProfileInput>;
  who?: InputMaybe<Scalars['Markdown']>;
  why?: InputMaybe<Scalars['Markdown']>;
};

export type UpdateSpaceInput = {
  ID: Scalars['UUID'];
  /** Update the Space About information. */
  about?: InputMaybe<UpdateSpaceAboutInput>;
};

export type UpdateSpacePlatformSettingsInput = {
  /** Upate the URL path for the Space. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The identifier for the Space whose license etc is to be updated. */
  spaceID: Scalars['UUID'];
  /** Visibility of the Space, only on L0 spaces. */
  visibility?: InputMaybe<SpaceVisibility>;
};

export type UpdateSpaceSettingsCollaborationInput = {
  /** Flag to control if events from Subspaces are visible on this Space calendar as well. */
  allowEventsFromSubspaces?: InputMaybe<Scalars['Boolean']>;
  /** Flag to control if guest users can contribute to this Space. */
  allowGuestContributions?: InputMaybe<Scalars['Boolean']>;
  /** Flag to control if members can create callouts. */
  allowMembersToCreateCallouts?: InputMaybe<Scalars['Boolean']>;
  /** Flag to control if members can create subspaces. */
  allowMembersToCreateSubspaces?: InputMaybe<Scalars['Boolean']>;
  /** Flag to control if members can create video calls in this Space. */
  allowMembersToVideoCall?: InputMaybe<Scalars['Boolean']>;
  /** Flag to control if ability to contribute is inherited from parent Space. */
  inheritMembershipRights?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateSpaceSettingsEntityInput = {
  collaboration?: InputMaybe<UpdateSpaceSettingsCollaborationInput>;
  /** The layout settings for this Space. */
  layout?: InputMaybe<UpdateSpaceSettingsLayoutInput>;
  membership?: InputMaybe<UpdateSpaceSettingsMembershipInput>;
  privacy?: InputMaybe<UpdateSpaceSettingsPrivacyInput>;
  /** The sort mode for subspaces: Alphabetical or Custom. */
  sortMode?: InputMaybe<SpaceSortMode>;
};

export type UpdateSpaceSettingsInput = {
  /** Update the settings for the Space. */
  settings: UpdateSpaceSettingsEntityInput;
  /** The identifier for the Space whose settings are to be updated. */
  spaceID: Scalars['String'];
};

export type UpdateSpaceSettingsLayoutInput = {
  /** The default display mode for callout descriptions. */
  calloutDescriptionDisplayMode: CalloutDescriptionDisplayMode;
};

export type UpdateSpaceSettingsMembershipInput = {
  /** Flag to control if Subspace admins can invite for this Space. */
  allowSubspaceAdminsToInviteMembers: Scalars['Boolean'];
  /** The membership policy in usage for this Space */
  policy: CommunityMembershipPolicy;
  /** The organizations that are trusted to Join as members for this Space */
  trustedOrganizations: Array<Scalars['UUID']>;
};

export type UpdateSpaceSettingsPrivacyInput = {
  /** Flag to control if Platform Support has admin rights. */
  allowPlatformSupportAsAdmin?: InputMaybe<Scalars['Boolean']>;
  mode?: InputMaybe<SpacePrivacyMode>;
  /** Controls who may read member-user information. Follows space visibility by default, or restricts it to members only. */
  userInformationVisibility?: InputMaybe<UserInformationVisibility>;
};

export type UpdateSubspacePinnedInput = {
  /** Whether the subspace should be pinned (true) or unpinned (false). */
  pinned: Scalars['Boolean'];
  /** The ID of the parent Space containing the subspace. */
  spaceID: Scalars['UUID'];
  /** The ID of the subspace to pin or unpin. */
  subspaceID: Scalars['UUID'];
};

export type UpdateSubspacesSortOrderInput = {
  spaceID: Scalars['UUID'];
  /** The IDs of the subspaces to update the sort order on */
  subspaceIDs: Array<Scalars['UUID']>;
};

export type UpdateTagsetInput = {
  ID: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
};

export type UpdateTaskColumnOnCalloutInput = {
  /** The Tasks board Callout whose column is being renamed. */
  calloutID: Scalars['UUID'];
  /** The current column name. Matched case-insensitively to an existing column. */
  currentName: Scalars['String'];
  /** The new column name. Tasks in the column follow the rename. */
  newName: Scalars['String'];
};

export type UpdateTaskColumnsSortOrderOnCalloutInput = {
  /** The Tasks board Callout whose columns are being reordered. */
  calloutID: Scalars['UUID'];
  /** Every existing column exactly once, in the new left-to-right order. Matched case-insensitively. */
  columnNames: Array<Scalars['String']>;
};

export type UpdateTemplateContentSpaceInput = {
  ID: Scalars['UUID'];
  /** Update the TemplateContentSpace About information. */
  about?: InputMaybe<UpdateSpaceAboutInput>;
  /** Update the settings for the Space. */
  settings: UpdateSpaceSettingsEntityInput;
};

export type UpdateTemplateDefaultTemplateInput = {
  /** The identifier for the TemplateDefault to be updated. */
  templateDefaultID: Scalars['UUID'];
  /** The ID for the Template to use. */
  templateID: Scalars['UUID'];
};

export type UpdateTemplateFromSpaceInput = {
  /** Whether to reproduce the hierarchy or just the space. */
  recursive?: InputMaybe<Scalars['Boolean']>;
  /** The Space whose content should be copied to this Template. */
  spaceID: Scalars['UUID'];
  /** The ID of the Template. */
  templateID: Scalars['UUID'];
};

export type UpdateTemplateInput = {
  ID: Scalars['UUID'];
  /** The cardinality and value set for a Classification Template. */
  classificationData?: InputMaybe<CreateClassificationTemplateContentInput>;
  /** The default description to be pre-filled when users create Posts based on this template. */
  postDefaultDescription?: InputMaybe<Scalars['Markdown']>;
  /** The Profile of the Template. */
  profile?: InputMaybe<UpdateProfileInput>;
  /** Replace this Whiteboard Template from an existing Whiteboard through a server-side authorized copy. */
  sourceWhiteboardID?: InputMaybe<Scalars['UUID']>;
};

export type UpdateUserGroupInput = {
  ID: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
  profileData?: InputMaybe<UpdateProfileInput>;
};

export type UpdateUserInput = {
  ID: Scalars['UUID'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  phone?: InputMaybe<Scalars['String']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  /** Set this user profile as being used as a service account or not. */
  serviceProfile?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserPlatformSettingsInput = {
  email?: InputMaybe<Scalars['String']>;
  /** Upate the URL path for the User. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The identifier for the User whose platform managed information is to be updated. */
  userID: Scalars['String'];
};

export type UpdateUserSettingsAssistantInput = {
  /** Per-capability enable/disable toggles bounding what the assistant may do on behalf of this user. */
  enabledCapabilities?: InputMaybe<Array<AssistantCapabilityToggleInput>>;
};

export type UpdateUserSettingsCommunicationInput = {
  /** Allow other Users to be offered an email contact route to this User (using the account email; the address is never exposed). */
  allowOtherUsersToContactViaEmail?: InputMaybe<Scalars['Boolean']>;
  /** Allow Users to send messages to this User. */
  allowOtherUsersToSendMessages?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserSettingsDashboardInput = {
  /** Whether the activity-feed view is shown on the home dashboard (true) or the non-activity Spaces view (false). */
  activityView?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserSettingsEntityInput = {
  /** Settings related to the AI assistant authority for this User. */
  assistant?: InputMaybe<UpdateUserSettingsAssistantInput>;
  /** Settings related to this users Communication preferences. */
  communication?: InputMaybe<UpdateUserSettingsCommunicationInput>;
  /** Settings related to the home dashboard view. */
  dashboard?: InputMaybe<UpdateUserSettingsDashboardInput>;
  /** Update the user's design version. Any integer accepted (1 = legacy design generation, deprecated and scheduled for removal; 2 = current default design generation; 3+ reserved for future generations). */
  designVersion?: InputMaybe<Scalars['Int']>;
  /** Settings related to Home Space. */
  homeSpace?: InputMaybe<UpdateUserSettingsHomeSpaceInput>;
  /** Set the user's interface language preference. Must be a value from the supported languages set. Any language write also latches languageOfferAnswered=true. */
  language?: InputMaybe<Scalars['String']>;
  /** Mark that this User has answered the one-time language offer. One-way latch: setting false is rejected. */
  languageOfferAnswered?: InputMaybe<Scalars['Boolean']>;
  /** Settings related to this users Notifications preferences. */
  notification?: InputMaybe<UpdateUserSettingsNotificationInput>;
  /** Settings related to Privacy. */
  privacy?: InputMaybe<UpdateUserSettingsPrivacyInput>;
};

export type UpdateUserSettingsHomeSpaceInput = {
  /** Automatically redirect to home space instead of the dashboard. */
  autoRedirect?: InputMaybe<Scalars['Boolean']>;
  /** The ID of the Space to use as home. Set to null to clear. */
  spaceID?: InputMaybe<Scalars['UUID']>;
};

export type UpdateUserSettingsInput = {
  /** Update the settings for the User. */
  settings: UpdateUserSettingsEntityInput;
  /** The identifier for the User whose settings are to be updated. */
  userID: Scalars['UUID'];
};

export type UpdateUserSettingsNotificationInput = {
  /** Settings related to Organization Notifications. */
  organization?: InputMaybe<UpdateUserSettingsNotificationOrganizationInput>;
  /** Settings related to Platform Notifications. */
  platform?: InputMaybe<UpdateUserSettingsNotificationPlatformInput>;
  /** Settings related to notification sound playback. */
  sound?: InputMaybe<UpdateUserSettingsNotificationSoundInput>;
  /** Settings related to Space Notifications. */
  space?: InputMaybe<UpdateUserSettingsNotificationSpaceInput>;
  /** Settings related to User Notifications. */
  user?: InputMaybe<UpdateUserSettingsNotificationUserInput>;
  /** Settings related to Virtual Contributor Notifications. */
  virtualContributor?: InputMaybe<UpdateUserSettingsNotificationVirtualContributorInput>;
};

export type UpdateUserSettingsNotificationOrganizationInput = {
  /** Receive a notification when the organization you are admin of is mentioned */
  adminMentioned?: InputMaybe<NotificationSettingInput>;
  /** Receive notification when the organization you are admin of is messaged */
  adminMessageReceived?: InputMaybe<NotificationSettingInput>;
};

export type UpdateUserSettingsNotificationPlatformAdminInput = {
  /** [Admin] Receive a notification when a new L0 Space is created */
  spaceCreated?: InputMaybe<NotificationSettingInput>;
  /** [Admin] Receive a notification when a user changes their login email address */
  userEmailChanged?: InputMaybe<NotificationSettingInput>;
  /** [Admin] Receive a notification when a user is assigned to or removed from a global role */
  userGlobalRoleChanged?: InputMaybe<NotificationSettingInput>;
  /** [Admin] Receive notification when a new user signs up */
  userProfileCreated?: InputMaybe<NotificationSettingInput>;
  /** [Admin] Receive a notification when a user profile is removed */
  userProfileRemoved?: InputMaybe<NotificationSettingInput>;
};

export type UpdateUserSettingsNotificationPlatformInput = {
  /** Settings related to Platform Admin Notifications. */
  admin?: InputMaybe<UpdateUserSettingsNotificationPlatformAdminInput>;
  /** Receive a notification when a new comment is added to a Discussion I created in the Forum */
  forumDiscussionComment?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when a new Discussion is created in the Forum */
  forumDiscussionCreated?: InputMaybe<NotificationSettingInput>;
};

export type UpdateUserSettingsNotificationSoundInput = {
  /** Play a sound when a chat message is received. Default true. */
  chatMessage?: InputMaybe<Scalars['Boolean']>;
  /** Play a sound when a non-chat in-app notification is received. Default true. */
  inAppNotification?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserSettingsNotificationSpaceAdminInput = {
  /** Receive a notification when a contribution is added (admin) */
  collaborationCalloutContributionCreated?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when a message is sent to a Space I lead */
  communicationMessageReceived?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when an application is received */
  communityApplicationReceived?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when a new member joins the community (admin) */
  communityNewMember?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when the login email of an admin or lead of a Space I administer is changed (admin) */
  userEmailChanged?: InputMaybe<NotificationSettingInput>;
};

export type UpdateUserSettingsNotificationSpaceInput = {
  /** Settings related to Space Admin Notifications. */
  admin?: InputMaybe<UpdateUserSettingsNotificationSpaceAdminInput>;
  /** Receive a notification when a comment is added to a Callout */
  collaborationCalloutComment?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when a contribution is added */
  collaborationCalloutContributionCreated?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when a comment is created on a contribution */
  collaborationCalloutPostContributionComment?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when a callout is published */
  collaborationCalloutPublished?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when someone reacts to a callout you published */
  collaborationCalloutReaction?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when a poll you voted on is modified */
  collaborationPollModifiedOnPollIVotedOn?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when a poll option you voted for is changed or removed */
  collaborationPollVoteAffectedByOptionChange?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when a vote is cast on a poll you created */
  collaborationPollVoteCastOnOwnPoll?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when another user votes on a poll you already voted on */
  collaborationPollVoteCastOnPollIVotedOn?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification for community updates */
  communicationUpdates?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when a calendar event is created */
  communityCalendarEvents?: InputMaybe<NotificationSettingInput>;
};

export type UpdateUserSettingsNotificationUserInput = {
  /** Receive a notification when someone replies to a comment I made. */
  commentReply?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when someone sends me a direct (1:1) chat message. Note: the inApp channel is permanently OFF regardless of the stored value. */
  conversationMessageDirect?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when someone posts in a group chat I am a member of. Note: the inApp channel is permanently OFF regardless of the stored value. */
  conversationMessageGroup?: InputMaybe<NotificationSettingInput>;
  /** Settings related to User Membership Notifications. */
  membership?: InputMaybe<UpdateUserSettingsNotificationUserMembershipInput>;
  /** Receive a notification you are mentioned */
  mentioned?: InputMaybe<NotificationSettingInput>;
  /** Receive notification when I receive a message. */
  messageReceived?: InputMaybe<NotificationSettingInput>;
};

export type UpdateUserSettingsNotificationUserMembershipInput = {
  /** Receive a notification for community invitation */
  spaceCommunityInvitationReceived?: InputMaybe<NotificationSettingInput>;
  /** Receive a notification when I join a new community or when my application is declined */
  spaceCommunityJoined?: InputMaybe<NotificationSettingInput>;
};

export type UpdateUserSettingsNotificationVirtualContributorInput = {
  /** Receive notification when a Virtual Contributor receives an invitation to join a Space. */
  adminSpaceCommunityInvitation?: InputMaybe<NotificationSettingInput>;
};

export type UpdateUserSettingsPrivacyInput = {
  /** Allow contribution roles (communication, lead etc) in Spaces to be visible. */
  contributionRolesPubliclyVisible?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateVirtualContributorInput = {
  ID: Scalars['UUID'];
  bodyOfKnowledgeDescription?: InputMaybe<Scalars['String']>;
  bodyOfKnowledgeType?: InputMaybe<VirtualContributorBodyOfKnowledgeType>;
  dataAccessMode?: InputMaybe<VirtualContributorDataAccessMode>;
  interactionModes?: InputMaybe<Array<VirtualContributorInteractionMode>>;
  /** The KnowledgeBase to use for this Collaboration. */
  knowledgeBaseData?: InputMaybe<UpdateKnowledgeBaseInput>;
  /** Flag to control the visibility of the VC in the platform store. */
  listedInStore?: InputMaybe<Scalars['Boolean']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  /** Visibility of the VC in searches. */
  searchVisibility?: InputMaybe<SearchVisibility>;
};

export type UpdateVirtualContributorPlatformSettingsEntityInput = {
  /** Enable or disable the editing of the prompt graph for this Virtual Contributor. */
  promptGraphEditingEnabled: Scalars['Boolean'];
};

export type UpdateVirtualContributorPlatformSettingsInput = {
  /** Platform-level settings to apply to this Virtual Contributor. */
  settings: UpdateVirtualContributorPlatformSettingsEntityInput;
  /** ID of the Virtual Contributor to update. */
  virtualContributorID: Scalars['UUID'];
};

export type UpdateVirtualContributorSettingsEntityInput = {
  privacy?: InputMaybe<UpdateVirtualContributorSettingsPrivacyInput>;
};

export type UpdateVirtualContributorSettingsInput = {
  /** Update the settings for the VirtualContributor. */
  settings: UpdateVirtualContributorSettingsEntityInput;
  /** The identifier for the VirtualCOntributor whose settings are to be updated. */
  virtualContributorID: Scalars['UUID'];
};

export type UpdateVirtualContributorSettingsPrivacyInput = {
  /** Enable the content of knowledge bases to be accessed or not. */
  knowledgeBaseContentVisible: Scalars['Boolean'];
};

export type UpdateVisualInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  /** The width / height ratio to display this visual at. Must fall within the visual type’s minAspectRatio - maxAspectRatio range; types with a fixed shape accept only their single allowed value. */
  aspectRatio?: InputMaybe<Scalars['Float']>;
  uri: Scalars['String'];
  visualID: Scalars['String'];
};

export type UpdateWhiteboardEntityInput = {
  ID: Scalars['UUID'];
  contentUpdatePolicy?: InputMaybe<ContentUpdatePolicy>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The preview settings for the Whiteboard. */
  previewSettings?: InputMaybe<UpdateWhiteboardPreviewSettingsInput>;
  /** The Profile of this entity. */
  profile?: InputMaybe<UpdateProfileInput>;
};

export type UpdateWhiteboardGuestAccessInput = {
  /** Target state for guest collaboration. True enables GLOBAL_GUEST privileges. */
  guestAccessEnabled: Scalars['Boolean'];
  /** The identifier of the whiteboard whose guest access should be toggled. */
  whiteboardId: Scalars['UUID'];
};

export type UpdateWhiteboardGuestAccessResult = {
  /** Indicates whether the mutation completed successfully. */
  success: Scalars['Boolean'];
  /** Whiteboard snapshot reflecting the latest guest access state. */
  whiteboard?: Maybe<Whiteboard>;
};

export type UpdateWhiteboardPreviewSettingsInput = {
  /** The coordinates for the preview. */
  coordinates?: InputMaybe<WhiteboardPreviewCoordinatesInput>;
  /**
   * The preview mode.
   *       AUTO: Generate Whiteboard preview automatically when closing the dialog
   *       CUSTOM: Generate Whiteboard preview based on user-defined coordinates when closing the dialog
   *       FIXED: Use a fixed Whiteboard preview that does not change when closing the dialog
   *
   */
  mode?: InputMaybe<WhiteboardPreviewMode>;
};

export type UrlResolverQueryClosestAncestor = {
  discussionId?: Maybe<Scalars['UUID']>;
  innovationHubId?: Maybe<Scalars['UUID']>;
  innovationPack?: Maybe<UrlResolverQueryResultInnovationPack>;
  organizationId?: Maybe<Scalars['UUID']>;
  space?: Maybe<UrlResolverQueryResultSpace>;
  type: UrlType;
  url: Scalars['String'];
  userId?: Maybe<Scalars['UUID']>;
  virtualContributor?: Maybe<UrlResolverQueryResultVirtualContributor>;
};

export type UrlResolverQueryResultCalendar = {
  calendarEventId?: Maybe<Scalars['UUID']>;
  id: Scalars['UUID'];
};

export type UrlResolverQueryResultCalloutsSet = {
  calloutId?: Maybe<Scalars['UUID']>;
  contributionId?: Maybe<Scalars['UUID']>;
  id: Scalars['UUID'];
  memoId?: Maybe<Scalars['UUID']>;
  postId?: Maybe<Scalars['UUID']>;
  type: UrlType;
  whiteboardId?: Maybe<Scalars['UUID']>;
};

export type UrlResolverQueryResultCollaboration = {
  calloutsSet: UrlResolverQueryResultCalloutsSet;
  id: Scalars['UUID'];
};

export type UrlResolverQueryResultInnovationPack = {
  id: Scalars['UUID'];
  templatesSet: UrlResolverQueryResultTemplatesSet;
};

export type UrlResolverQueryResultSpace = {
  calendar?: Maybe<UrlResolverQueryResultCalendar>;
  collaboration: UrlResolverQueryResultCollaboration;
  id: Scalars['UUID'];
  level: SpaceLevel;
  levelZeroSpaceID: Scalars['UUID'];
  parentSpaces: Array<Scalars['UUID']>;
  templatesSet?: Maybe<UrlResolverQueryResultTemplatesSet>;
};

export type UrlResolverQueryResultTemplatesSet = {
  id: Scalars['UUID'];
  templateId?: Maybe<Scalars['UUID']>;
};

export type UrlResolverQueryResultVirtualContributor = {
  calloutsSet: UrlResolverQueryResultCalloutsSet;
  id: Scalars['UUID'];
};

export type UrlResolverQueryResults = {
  closestAncestor?: Maybe<UrlResolverQueryClosestAncestor>;
  discussionId?: Maybe<Scalars['UUID']>;
  innovationHubId?: Maybe<Scalars['UUID']>;
  innovationPack?: Maybe<UrlResolverQueryResultInnovationPack>;
  organizationId?: Maybe<Scalars['UUID']>;
  space?: Maybe<UrlResolverQueryResultSpace>;
  state: UrlResolverResultState;
  type: UrlType;
  userId?: Maybe<Scalars['UUID']>;
  virtualContributor?: Maybe<UrlResolverQueryResultVirtualContributor>;
};

export enum UrlResolverResultState {
  Forbidden = 'Forbidden',
  NotFound = 'NotFound',
  Resolved = 'Resolved',
}

export enum UrlType {
  Admin = 'ADMIN',
  Callout = 'CALLOUT',
  CalloutsSet = 'CALLOUTS_SET',
  ContributionMemo = 'CONTRIBUTION_MEMO',
  ContributionPost = 'CONTRIBUTION_POST',
  ContributionWhiteboard = 'CONTRIBUTION_WHITEBOARD',
  ContributorsExplorer = 'CONTRIBUTORS_EXPLORER',
  Discussion = 'DISCUSSION',
  Documentation = 'DOCUMENTATION',
  Error = 'ERROR',
  Flow = 'FLOW',
  Forum = 'FORUM',
  Home = 'HOME',
  InnovationHub = 'INNOVATION_HUB',
  InnovationLibrary = 'INNOVATION_LIBRARY',
  InnovationPacks = 'INNOVATION_PACKS',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  NotAuthorized = 'NOT_AUTHORIZED',
  Organization = 'ORGANIZATION',
  Recovery = 'RECOVERY',
  Registration = 'REGISTRATION',
  Required = 'REQUIRED',
  Restricted = 'RESTRICTED',
  SignUp = 'SIGN_UP',
  Space = 'SPACE',
  SpaceExplorer = 'SPACE_EXPLORER',
  Unknown = 'UNKNOWN',
  User = 'USER',
  Verify = 'VERIFY',
  VirtualContributor = 'VIRTUAL_CONTRIBUTOR',
}

export type User = ActorFull & {
  /** The account hosted by this User. */
  account?: Maybe<Account>;
  /** The Actor representing this User. */
  actor: Actor;
  /** Details about the authentication used for this User. */
  authentication?: Maybe<UserAuthenticationResult>;
  /** The authorization rules for the Actor */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The credentials held by this Actor */
  credentials?: Maybe<Array<Credential>>;
  /** The email address for this User. */
  email: Scalars['String'];
  firstName: Scalars['String'];
  /** The ID of the Actor */
  id: Scalars['UUID'];
  /** Can a message be sent to this User. */
  isContactable: Scalars['Boolean'];
  /** Whether this User can be offered an email contact route (they enabled email contact). Exposes only the consent flag, never the email address. */
  isContactableViaEmail: Scalars['Boolean'];
  lastName: Scalars['String'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The phone number for this User. */
  phone?: Maybe<Scalars['String']>;
  /** The profile for this Actor. */
  profile?: Maybe<Profile>;
  /** The settings for this User. */
  settings: UserSettings;
  /** The StorageAggregator for managing storage buckets in use by this User */
  storageAggregator?: Maybe<StorageAggregator>;
  /** The type of Actor */
  type: ActorType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type UserAuthenticationResult = {
  /** When the Kratos Account for the user last logged in */
  authenticatedAt?: Maybe<Scalars['DateTime']>;
  /** When the Kratos Account for the user was created */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The Authentication Methods used for this User. One of email, linkedin, microsoft, github or unknown */
  methods: Array<AuthenticationType>;
};

export type UserAuthorizationResetInput = {
  /** The identifier of the User whose Authorization Policy should be reset. */
  userID: Scalars['UUID'];
};

/** Cursor-paginated list of email-change audit entries (per docs/Pagination.md). */
export type UserEmailChangeAuditEntries = {
  auditEntries: Array<UserEmailChangeAuditEntry>;
  pageInfo: UserEmailChangeAuditEntriesPageInfo;
  total: Scalars['Float'];
};

export type UserEmailChangeAuditEntriesPageInfo = {
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

/** A single email-change audit-trail entry. Append-only and retained indefinitely (FR-014a). */
export type UserEmailChangeAuditEntry = {
  /** Who authorized the change within the subject user’s organization. Set for platform-admin-initiated changes; null for self-service entries. */
  approver?: Maybe<EmailChangeApprover>;
  /** Short non-leaky failure reason. Set on failure outcomes only. */
  failureReason?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** The user who initiated the change. Null for entries whose initiator could not be resolved (early validation rejects); initiatorRole is still present. */
  initiator?: Maybe<UserProfileSummary>;
  initiatorRole: UserEmailChangeInitiatorRole;
  /** For commit/rollback entries: the proposed/applied new address. For drift_detected entries: the value observed on the Kratos side at the moment of drift. */
  newEmail?: Maybe<Scalars['String']>;
  /** Old email at the time of this audit entry. Null only for entries with no old-email context. */
  oldEmail?: Maybe<Scalars['String']>;
  outcome: UserEmailChangeAuditOutcome;
  /** Admin-supplied justification for the change. Set for platform-admin-initiated changes; null for self-service entries. */
  reason?: Maybe<Scalars['String']>;
  /** The user whose email is being changed. */
  subject: UserProfileSummary;
  timestamp: Scalars['DateTime'];
};

/** Outcome recorded for a single user-email-change audit entry. Spec 098 extends this enum additively with verification-flow outcomes. */
export enum UserEmailChangeAuditOutcome {
  Committed = 'COMMITTED',
  DriftDetected = 'DRIFT_DETECTED',
  DriftResolutionFailed = 'DRIFT_RESOLUTION_FAILED',
  DriftResolved = 'DRIFT_RESOLVED',
  GlobalAdminNotificationFailed = 'GLOBAL_ADMIN_NOTIFICATION_FAILED',
  NewAddressNotificationFailed = 'NEW_ADDRESS_NOTIFICATION_FAILED',
  RejectedConflict = 'REJECTED_CONFLICT',
  RejectedValidation = 'REJECTED_VALIDATION',
  RolledBack = 'ROLLED_BACK',
  SecuritySignalFailed = 'SECURITY_SIGNAL_FAILED',
  SessionInvalidationFailed = 'SESSION_INVALIDATION_FAILED',
  SpaceAdminNotificationFailed = 'SPACE_ADMIN_NOTIFICATION_FAILED',
}

/** Role of the actor who initiated a user-email-change audit event. */
export enum UserEmailChangeInitiatorRole {
  PlatformAdmin = 'PLATFORM_ADMIN',
  Self = 'SELF',
}

/** Result returned to the admin caller. Deliberately minimal — failures surface as typed GraphQL errors instead of returning false. Returned by both adminUserEmailChange and adminUserEmailChangeDriftResolve. */
export type UserEmailChangeResult = {
  /** The committed (canonical) email. Present on success. */
  email?: Maybe<Scalars['String']>;
  /** Always true on success. Failures throw typed GraphQL errors instead of returning false. */
  success: Scalars['Boolean'];
};

export type UserFilterInput = {
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UserGroup = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Users that are members of this User Group. */
  members?: Maybe<Array<User>>;
  /** Containing entity for this UserGroup. */
  parent?: Maybe<Groupable>;
  /** The profile for the user group */
  profile?: Maybe<Profile>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

/** Controls who may read member-user information in a Space. Follows space visibility by default, or restricts user info to members only. */
export enum UserInformationVisibility {
  FollowSpaceVisibility = 'FOLLOW_SPACE_VISIBILITY',
  MembersOnly = 'MEMBERS_ONLY',
}

/** Minimal user-profile summary identifying a user without exposing PII beyond id + displayName. */
export type UserProfileSummary = {
  displayName: Scalars['String'];
  id: Scalars['UUID'];
};

export type UserSettings = {
  /** The AI assistant authority settings for this User (per-capability toggles). */
  assistant: UserSettingsAssistant;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The communication settings for this User. */
  communication: UserSettingsCommunication;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The home-dashboard view settings for this User. */
  dashboard: UserSettingsDashboard;
  /** The design version this User has selected (1 = legacy design generation, deprecated and scheduled for removal; 2 = current default design generation; 3+ reserved for future generations). */
  designVersion: Scalars['Int'];
  /** The home space settings for this User. */
  homeSpace: UserSettingsHomeSpace;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The interface language chosen by this User. Null = the User has never chosen a language (distinct from having chosen the platform default). */
  language?: Maybe<Scalars['String']>;
  /** Whether this User has answered the one-time language offer (global across all languages). Latched true by any language write. */
  languageOfferAnswered: Scalars['Boolean'];
  /** The notification settings for this User. */
  notification: UserSettingsNotification;
  /** The privacy settings for this User */
  privacy: UserSettingsPrivacy;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type UserSettingsAssistant = {
  /** Per-capability enable/disable toggles bounding what the assistant may do on behalf of this user (read-only by default). */
  enabledCapabilities: Array<AssistantCapabilityToggle>;
};

export type UserSettingsCommunication = {
  /** Allow other Users to be offered an email contact route to this User (using the account email; the address is never exposed). Default false. */
  allowOtherUsersToContactViaEmail: Scalars['Boolean'];
  /** Allow Users to send messages to this User. */
  allowOtherUsersToSendMessages: Scalars['Boolean'];
};

export type UserSettingsDashboard = {
  /** Whether the activity-feed view is shown on the home dashboard (true) or the non-activity Spaces view (false). Default true preserves the historical behaviour. */
  activityView: Scalars['Boolean'];
};

export type UserSettingsHomeSpace = {
  /** Automatically redirect to home space instead of the dashboard. */
  autoRedirect: Scalars['Boolean'];
  /** The ID of the Space to use as home. Null if not set. */
  spaceID?: Maybe<Scalars['String']>;
};

export type UserSettingsNotification = {
  /** The notifications settings for Organization events for this User */
  organization: UserSettingsNotificationOrganization;
  /** The notifications settings for Platform events for this User */
  platform: UserSettingsNotificationPlatform;
  /** The sound playback settings for this User. */
  sound: UserSettingsNotificationSound;
  /** The notifications settings for Space events for this User */
  space: UserSettingsNotificationSpace;
  /** The notifications settings for User events for this User */
  user: UserSettingsNotificationUser;
  /** The notifications settings for Virtual Contributor events for this User */
  virtualContributor: UserSettingsNotificationVirtualContributor;
};

export type UserSettingsNotificationChannels = {
  /** Receive notifications by email. */
  email: Scalars['Boolean'];
  /** Receive notifications by inApp. */
  inApp: Scalars['Boolean'];
  /** Receive push notifications. */
  push: Scalars['Boolean'];
};

export type UserSettingsNotificationOrganization = {
  /** Receive a notification when the organization you are admin of is mentioned */
  adminMentioned: UserSettingsNotificationChannels;
  /** Receive notification when the organization you are admin of is messaged */
  adminMessageReceived: UserSettingsNotificationChannels;
};

export type UserSettingsNotificationPlatform = {
  /** The notifications settings for Platform Admin events for this User */
  admin: UserSettingsNotificationPlatformAdmin;
  /** Receive a notification when a new comment is added to a Discussion I created in the Forum */
  forumDiscussionComment: UserSettingsNotificationChannels;
  /** Receive a notification when a new Discussion is created in the Forum */
  forumDiscussionCreated: UserSettingsNotificationChannels;
};

export type UserSettingsNotificationPlatformAdmin = {
  /** Receive a notification when a new L0 Space is created */
  spaceCreated: UserSettingsNotificationChannels;
  /** Receive a notification when a user changes their login email address. */
  userEmailChanged: UserSettingsNotificationChannels;
  /** Receive a notification when a user global role is assigned or removed. */
  userGlobalRoleChanged: UserSettingsNotificationChannels;
  /** Receive notification when a new user signs up */
  userProfileCreated: UserSettingsNotificationChannels;
  /** Receive a notification when a user profile is removed */
  userProfileRemoved: UserSettingsNotificationChannels;
};

export type UserSettingsNotificationSound = {
  /** Play a sound when a chat message is received. Default true. */
  chatMessage: Scalars['Boolean'];
  /** Play a sound when a non-chat in-app notification is received. Default true. */
  inAppNotification: Scalars['Boolean'];
};

export type UserSettingsNotificationSpace = {
  /** The notifications settings for Space Admin events for this User */
  admin: UserSettingsNotificationSpaceAdmin;
  /** Receive a notification when a comment is made on a Callout */
  collaborationCalloutComment: UserSettingsNotificationChannels;
  /** Receive a notification when a contribution is created */
  collaborationCalloutContributionCreated: UserSettingsNotificationChannels;
  /** Receive a notification when a comment is created on a Post contribution */
  collaborationCalloutPostContributionComment: UserSettingsNotificationChannels;
  /** Receive a notification when a callout is published */
  collaborationCalloutPublished: UserSettingsNotificationChannels;
  /** Receive a notification when someone reacts to a callout you published */
  collaborationCalloutReaction: UserSettingsNotificationChannels;
  /** Receive a notification when a poll you voted on is modified */
  collaborationPollModifiedOnPollIVotedOn: UserSettingsNotificationChannels;
  /** Receive a notification when a poll option you voted for is changed or removed */
  collaborationPollVoteAffectedByOptionChange: UserSettingsNotificationChannels;
  /** Receive a notification when a vote is cast on a poll you created */
  collaborationPollVoteCastOnOwnPoll: UserSettingsNotificationChannels;
  /** Receive a notification when another user votes on a poll you already voted on */
  collaborationPollVoteCastOnPollIVotedOn: UserSettingsNotificationChannels;
  /** Receive a notification for community updates */
  communicationUpdates: UserSettingsNotificationChannels;
  /** Receive a notification when a calendar event is created */
  communityCalendarEvents: UserSettingsNotificationChannels;
};

export type UserSettingsNotificationSpaceAdmin = {
  /** Receive a notification when a contribution is created (admin) */
  collaborationCalloutContributionCreated: UserSettingsNotificationChannels;
  /** Receive a notification when a message is sent to a Space I lead */
  communicationMessageReceived: UserSettingsNotificationChannels;
  /** Receive a notification when an application is received */
  communityApplicationReceived: UserSettingsNotificationChannels;
  /** Receive a notification when a new member joins the community (admin) */
  communityNewMember: UserSettingsNotificationChannels;
  /** Receive a notification when the login email of an admin or lead of a Space I administer is changed (admin) */
  userEmailChanged: UserSettingsNotificationChannels;
};

export type UserSettingsNotificationUser = {
  /** Receive a notification when someone replies to a comment I made. */
  commentReply: UserSettingsNotificationChannels;
  /** Receive a notification when someone sends me a direct (1:1) chat message. The inApp channel is permanently OFF (enforced platform-wide) — the stored value is retained for row-shape symmetry only. */
  conversationMessageDirect: UserSettingsNotificationChannels;
  /** Receive a notification when someone posts in a group chat I am a member of. The inApp channel is permanently OFF (enforced platform-wide) — the stored value is retained for row-shape symmetry only. */
  conversationMessageGroup: UserSettingsNotificationChannels;
  /** The notifications settings for membership events for this User */
  membership: UserSettingsNotificationUserMembership;
  /** Receive a notification you are mentioned */
  mentioned: UserSettingsNotificationChannels;
  /** Receive notification when I receive a direct message. */
  messageReceived: UserSettingsNotificationChannels;
};

export type UserSettingsNotificationUserMembership = {
  /** Receive a notification when I am invited to join a Space community */
  spaceCommunityInvitationReceived: UserSettingsNotificationChannels;
  /** Receive a notification when I join a Space or when my application is declined */
  spaceCommunityJoined: UserSettingsNotificationChannels;
};

export type UserSettingsNotificationVirtualContributor = {
  /** Receive notification when a Virtual Contributor receives an invitation to join a Space. */
  adminSpaceCommunityInvitation: UserSettingsNotificationChannels;
};

export type UserSettingsPrivacy = {
  /** Allow contribution roles (communication, lead etc) in Spaces to be visible. */
  contributionRolesPubliclyVisible: Scalars['Boolean'];
};

export type UsersInRolesResponse = {
  role: RoleName;
  users: Array<User>;
};

export type UsersWithAuthorizationCredentialInput = {
  /** The resource to which a credential needs to be bound. */
  resourceID?: InputMaybe<Scalars['UUID']>;
  /** The type of credential. */
  type: AuthorizationCredential;
};

export type VcInteraction = {
  /** The thread ID (Matrix message ID) where VC is engaged */
  threadID: Scalars['MessageID'];
  /** The actor ID (agent.id) of the Virtual Contributor */
  virtualContributorID: Scalars['String'];
};

export type VirtualAssistant = ActorFull & {
  /** The authorization rules for the Actor */
  authorization?: Maybe<Authorization>;
  /** The admin per-capability grant governing system-invoked authority for this Virtual Assistant (default read-only). */
  capabilityGrant: Array<AssistantCapabilityToggle>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The credentials held by this Actor */
  credentials?: Maybe<Array<Credential>>;
  /** The ID of the Actor */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The profile for this Actor. */
  profile?: Maybe<Profile>;
  /** The type of Actor */
  type: ActorType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type VirtualContributor = ActorFull & {
  /** The Account of the Virtual Contributor. */
  account?: Maybe<Account>;
  /** The Actor representing this User. */
  actor: Actor;
  /** The AI persona associated with this Virtual Contributor. */
  aiPersona?: Maybe<AiPersona>;
  /** The authorization rules for the Actor */
  authorization?: Maybe<Authorization>;
  /** Description of the body of knowledge for this VC. */
  bodyOfKnowledgeDescription?: Maybe<Scalars['Markdown']>;
  /** The ID of the body of knowledge used by this Virtual Contributor. */
  bodyOfKnowledgeID?: Maybe<Scalars['UUID']>;
  /** The date when the body of knowledge was last successfully ingested. */
  bodyOfKnowledgeLastUpdated?: Maybe<Scalars['DateTime']>;
  /** The type of body of knowledge used by this Virtual Contributor. */
  bodyOfKnowledgeType: VirtualContributorBodyOfKnowledgeType;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The credentials held by this Actor */
  credentials?: Maybe<Array<Credential>>;
  /** The data access mode defining what data this Virtual Contributor can access. */
  dataAccessMode: VirtualContributorDataAccessMode;
  /** The engine powering this Virtual Contributor */
  engine: AiPersonaEngine;
  /** The ID of the Actor */
  id: Scalars['UUID'];
  /** Interaction modes supported by this Virtual Contributor. */
  interactionModes: VirtualContributorInteractionMode;
  /** The Knowledge Base linked to this Virtual Contributor as body of knowledge. */
  knowledgeBase: KnowledgeBase;
  /** The Space linked to this Virtual Contributor as body of knowledge. */
  knowledgeSpace?: Maybe<Space>;
  /** Flag to control if this VC is listed in the platform store. */
  listedInStore: Scalars['Boolean'];
  /** The model card information about this Virtual Contributor */
  modelCard: VirtualContributorModelCard;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** Platform-level settings of this Virtual Contributor, modifiable only by platform admins. */
  platformSettings: VirtualContributorPlatformSettings;
  /** The profile for this Actor. */
  profile?: Maybe<Profile>;
  /** Prompt graph definition for this Virtual Contributor. */
  promptGraphDefinition?: Maybe<PromptGraphDefinition>;
  /** The Virtual Contributor provider. */
  provider: Actor;
  /** Visibility of the VC in searches. */
  searchVisibility: SearchVisibility;
  /** The settings of this Virtual Contributor. */
  settings: VirtualContributorSettings;
  /** The status of the virtual contributor */
  status: VirtualContributorStatus;
  /** The type of Actor */
  type: ActorType;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  /** The well-known identifier of this Virtual Contributor, if configured at platform level. */
  wellKnownVirtualContributor?: Maybe<VirtualContributorWellKnown>;
};

export enum VirtualContributorBodyOfKnowledgeType {
  AlkemioKnowledgeBase = 'ALKEMIO_KNOWLEDGE_BASE',
  AlkemioSpace = 'ALKEMIO_SPACE',
  None = 'NONE',
  Other = 'OTHER',
  Website = 'WEBSITE',
}

export enum VirtualContributorDataAccessMode {
  None = 'NONE',
  SpaceProfile = 'SPACE_PROFILE',
  SpaceProfileAndContents = 'SPACE_PROFILE_AND_CONTENTS',
}

export enum VirtualContributorInteractionMode {
  DiscussionTagging = 'DISCUSSION_TAGGING',
}

export type VirtualContributorModelCard = {
  /** The model card information about the AI Engine behind the AI Persona. */
  aiEngine?: Maybe<ModelCardAiEngineResult>;
  /** The model card information about the monitoring that is done on usage. */
  monitoring?: Maybe<ModelCardMonitoringResult>;
  /** The Model Card details related to usage of the Ai Persona within a Space. */
  spaceUsage?: Maybe<Array<ModelCardSpaceUsageResult>>;
};

export enum VirtualContributorModelCardEntry {
  SpaceCapabilities = 'SPACE_CAPABILITIES',
  SpaceDataAccess = 'SPACE_DATA_ACCESS',
  SpaceRoleRequired = 'SPACE_ROLE_REQUIRED',
}

export enum VirtualContributorModelCardEntryFlagName {
  SpaceCapabilityCommunityManagement = 'SPACE_CAPABILITY_COMMUNITY_MANAGEMENT',
  SpaceCapabilityCreateContent = 'SPACE_CAPABILITY_CREATE_CONTENT',
  SpaceCapabilityTagging = 'SPACE_CAPABILITY_TAGGING',
  SpaceDataAccessAbout = 'SPACE_DATA_ACCESS_ABOUT',
  SpaceDataAccessContent = 'SPACE_DATA_ACCESS_CONTENT',
  SpaceDataAccessSubspaces = 'SPACE_DATA_ACCESS_SUBSPACES',
  SpaceRoleAdmin = 'SPACE_ROLE_ADMIN',
  SpaceRoleMember = 'SPACE_ROLE_MEMBER',
}

export type VirtualContributorModelCardFlag = {
  /** Is this model card entry flag enabled? */
  enabled: Scalars['Boolean'];
  /** The name of the Model Card Entry flag */
  name: VirtualContributorModelCardEntryFlagName;
};

export type VirtualContributorPlatformSettings = {
  /** Enable or disable the editing of the prompt graph for this Virtual Contributor. */
  promptGraphEditingEnabled: Scalars['Boolean'];
};

export type VirtualContributorSettings = {
  /** The privacy settings for this VirtualContributor */
  privacy: VirtualContributorSettingsPrivacy;
};

export type VirtualContributorSettingsPrivacy = {
  /** Are the contents of the knowledge base publicly visible. */
  knowledgeBaseContentVisible: Scalars['Boolean'];
};

export enum VirtualContributorStatus {
  Initializing = 'INITIALIZING',
  Ready = 'READY',
}

/** The result from a Virtual Contributor update */
export type VirtualContributorUpdatedSubscriptionResult = {
  /** The Virtual Contributor that was updated */
  virtualContributor: VirtualContributor;
};

export enum VirtualContributorWellKnown {
  ChatGuidance = 'CHAT_GUIDANCE',
  StewardOwnershipExpert = 'STEWARD_OWNERSHIP_EXPERT',
}

export type VirtualContributorsInRolesResponse = {
  role: RoleName;
  virtualContributors: Array<VirtualContributor>;
};

export type Visual = {
  allowedTypes: Array<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  /** Post ratio width / height. */
  aspectRatio: Scalars['Float'];
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Maximum height resolution. */
  maxHeight: Scalars['Float'];
  /** Maximum width resolution. */
  maxWidth: Scalars['Float'];
  /** Minimum height resolution. */
  minHeight: Scalars['Float'];
  /** Minimum width resolution. */
  minWidth: Scalars['Float'];
  name: VisualType;
  sortOrder?: Maybe<Scalars['Float']>;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
  uri: Scalars['String'];
};

export type VisualConstraints = {
  /** Allowed file types. */
  allowedTypes: Array<Scalars['String']>;
  /** Dimensions ratio width / height. */
  aspectRatio: Scalars['Float'];
  /** Maximum dimensions ratio width / height that this visual may be set to. Equal to minAspectRatio when the shape is fixed. */
  maxAspectRatio: Scalars['Float'];
  /** Maximum height resolution. */
  maxHeight: Scalars['Float'];
  /** Maximum width resolution. */
  maxWidth: Scalars['Float'];
  /** Minimum dimensions ratio width / height that this visual may be set to. Equal to maxAspectRatio when the shape is fixed. */
  minAspectRatio: Scalars['Float'];
  /** Minimum height resolution. */
  minHeight: Scalars['Float'];
  /** Minimum width resolution. */
  minWidth: Scalars['Float'];
};

export enum VisualType {
  Avatar = 'AVATAR',
  Banner = 'BANNER',
  BannerWide = 'BANNER_WIDE',
  Card = 'CARD',
  MediaGalleryImage = 'MEDIA_GALLERY_IMAGE',
  MediaGalleryVideo = 'MEDIA_GALLERY_VIDEO',
  WhiteboardPreview = 'WHITEBOARD_PREVIEW',
}

export type VisualUploadImageInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  visualID: Scalars['String'];
};

export type Whiteboard = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The policy governing who can update the Whiteboard content. */
  contentUpdatePolicy: ContentUpdatePolicy;
  /** The user that created this Whiteboard */
  createdBy?: Maybe<User>;
  /** The date at which the entity was created. */
  createdDate: Scalars['DateTime'];
  /** Indicates whether guest collaborators are currently allowed via GLOBAL_GUEST permissions. */
  guestContributionsAllowed: Scalars['Boolean'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Whether the Whiteboard is multi-user enabled on Space level. */
  isMultiUser: Scalars['Boolean'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The preview settings for the Whiteboard. */
  previewSettings: WhiteboardPreviewSettings;
  /** The Profile for this Whiteboard. */
  profile: Profile;
  /** The date at which the entity was last updated. */
  updatedDate: Scalars['DateTime'];
};

export type WhiteboardPreviewCoordinates = {
  /** The height. */
  height: Scalars['Float'];
  /** The width. */
  width: Scalars['Float'];
  /** The x coordinate. */
  x: Scalars['Float'];
  /** The y coordinate. */
  y: Scalars['Float'];
};

export type WhiteboardPreviewCoordinatesData = {
  /** The height. */
  height: Scalars['Float'];
  /** The width. */
  width: Scalars['Float'];
  /** The x coordinate. */
  x: Scalars['Float'];
  /** The y coordinate. */
  y: Scalars['Float'];
};

export type WhiteboardPreviewCoordinatesInput = {
  /** The height. */
  height: Scalars['Float'];
  /** The width. */
  width: Scalars['Float'];
  /** The x coordinate. */
  x: Scalars['Float'];
  /** The y coordinate. */
  y: Scalars['Float'];
};

export enum WhiteboardPreviewMode {
  Auto = 'AUTO',
  Custom = 'CUSTOM',
  Fixed = 'FIXED',
}

export type WhiteboardPreviewSettings = {
  /** The coordinates for the preview. */
  coordinates?: Maybe<WhiteboardPreviewCoordinates>;
  /**
   * The preview mode.
   *       AUTO: Generate Whiteboard preview automatically when closing the dialog
   *       CUSTOM: Generate Whiteboard preview based on user-defined coordinates when closing the dialog
   *       FIXED: Use a fixed Whiteboard preview that does not change when closing the dialog
   *
   */
  mode: WhiteboardPreviewMode;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => SchemaTypes.Maybe<TTypes> | Promise<SchemaTypes.Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  APM: ResolverTypeWrapper<SchemaTypes.Apm>;
  Account: ResolverTypeWrapper<SchemaTypes.Account>;
  AccountAuthorizationResetInput: SchemaTypes.AccountAuthorizationResetInput;
  AccountLicensePlan: ResolverTypeWrapper<SchemaTypes.AccountLicensePlan>;
  AccountLicenseResetInput: SchemaTypes.AccountLicenseResetInput;
  AccountSubscription: ResolverTypeWrapper<SchemaTypes.AccountSubscription>;
  AccountType: SchemaTypes.AccountType;
  ActivityCreatedSubscriptionInput: SchemaTypes.ActivityCreatedSubscriptionInput;
  ActivityCreatedSubscriptionResult: ResolverTypeWrapper<SchemaTypes.ActivityCreatedSubscriptionResult>;
  ActivityEventType: SchemaTypes.ActivityEventType;
  ActivityFeed: ResolverTypeWrapper<SchemaTypes.ActivityFeed>;
  ActivityFeedGroupedQueryArgs: SchemaTypes.ActivityFeedGroupedQueryArgs;
  ActivityFeedQueryArgs: SchemaTypes.ActivityFeedQueryArgs;
  ActivityFeedRoles: SchemaTypes.ActivityFeedRoles;
  ActivityLogEntry:
    | ResolversTypes['ActivityLogEntryCalendarEventCreated']
    | ResolversTypes['ActivityLogEntryCalloutDiscussionComment']
    | ResolversTypes['ActivityLogEntryCalloutLinkCreated']
    | ResolversTypes['ActivityLogEntryCalloutMemoCreated']
    | ResolversTypes['ActivityLogEntryCalloutPostComment']
    | ResolversTypes['ActivityLogEntryCalloutPostCreated']
    | ResolversTypes['ActivityLogEntryCalloutPublished']
    | ResolversTypes['ActivityLogEntryCalloutWhiteboardContentModified']
    | ResolversTypes['ActivityLogEntryCalloutWhiteboardCreated']
    | ResolversTypes['ActivityLogEntryMemberJoined']
    | ResolversTypes['ActivityLogEntrySubspaceCreated']
    | ResolversTypes['ActivityLogEntryUpdateSent'];
  ActivityLogEntryCalendarEventCreated: ResolverTypeWrapper<SchemaTypes.ActivityLogEntryCalendarEventCreated>;
  ActivityLogEntryCalloutDiscussionComment: ResolverTypeWrapper<SchemaTypes.ActivityLogEntryCalloutDiscussionComment>;
  ActivityLogEntryCalloutLinkCreated: ResolverTypeWrapper<SchemaTypes.ActivityLogEntryCalloutLinkCreated>;
  ActivityLogEntryCalloutMemoCreated: ResolverTypeWrapper<SchemaTypes.ActivityLogEntryCalloutMemoCreated>;
  ActivityLogEntryCalloutPostComment: ResolverTypeWrapper<SchemaTypes.ActivityLogEntryCalloutPostComment>;
  ActivityLogEntryCalloutPostCreated: ResolverTypeWrapper<SchemaTypes.ActivityLogEntryCalloutPostCreated>;
  ActivityLogEntryCalloutPublished: ResolverTypeWrapper<SchemaTypes.ActivityLogEntryCalloutPublished>;
  ActivityLogEntryCalloutWhiteboardContentModified: ResolverTypeWrapper<SchemaTypes.ActivityLogEntryCalloutWhiteboardContentModified>;
  ActivityLogEntryCalloutWhiteboardCreated: ResolverTypeWrapper<SchemaTypes.ActivityLogEntryCalloutWhiteboardCreated>;
  ActivityLogEntryMemberJoined: ResolverTypeWrapper<SchemaTypes.ActivityLogEntryMemberJoined>;
  ActivityLogEntrySubspaceCreated: ResolverTypeWrapper<SchemaTypes.ActivityLogEntrySubspaceCreated>;
  ActivityLogEntryUpdateSent: ResolverTypeWrapper<SchemaTypes.ActivityLogEntryUpdateSent>;
  ActivityLogInput: SchemaTypes.ActivityLogInput;
  Actor: ResolverTypeWrapper<SchemaTypes.Actor>;
  ActorFilterInput: SchemaTypes.ActorFilterInput;
  ActorFull:
    | ResolversTypes['Account']
    | ResolversTypes['Organization']
    | ResolversTypes['RelayPaginatedSpace']
    | ResolversTypes['Space']
    | ResolversTypes['User']
    | ResolversTypes['VirtualAssistant']
    | ResolversTypes['VirtualContributor'];
  ActorRolePolicy: ResolverTypeWrapper<SchemaTypes.ActorRolePolicy>;
  ActorRoles: ResolverTypeWrapper<SchemaTypes.ActorRoles>;
  ActorType: SchemaTypes.ActorType;
  AddClassificationEntryFromTemplateInput: SchemaTypes.AddClassificationEntryFromTemplateInput;
  AddPollOptionInput: SchemaTypes.AddPollOptionInput;
  AddReactionToCalloutInput: SchemaTypes.AddReactionToCalloutInput;
  AddVisualToMediaGalleryInput: SchemaTypes.AddVisualToMediaGalleryInput;
  AdminRevokeMcpApiKeyInput: SchemaTypes.AdminRevokeMcpApiKeyInput;
  AdminUserEmailChangeDriftResolveInput: SchemaTypes.AdminUserEmailChangeDriftResolveInput;
  AdminUserEmailChangeInput: SchemaTypes.AdminUserEmailChangeInput;
  AiPersona: ResolverTypeWrapper<SchemaTypes.AiPersona>;
  AiPersonaEngine: SchemaTypes.AiPersonaEngine;
  AiServer: ResolverTypeWrapper<SchemaTypes.AiServer>;
  Application: ResolverTypeWrapper<SchemaTypes.Application>;
  ApplicationEventInput: SchemaTypes.ApplicationEventInput;
  ApplyForEntryRoleOnRoleSetInput: SchemaTypes.ApplyForEntryRoleOnRoleSetInput;
  AssignConversationMemberInput: SchemaTypes.AssignConversationMemberInput;
  AssignLicensePlanToAccount: SchemaTypes.AssignLicensePlanToAccount;
  AssignLicensePlanToSpace: SchemaTypes.AssignLicensePlanToSpace;
  AssignPlatformRoleInput: SchemaTypes.AssignPlatformRoleInput;
  AssignRoleOnRoleSetInput: SchemaTypes.AssignRoleOnRoleSetInput;
  AssignUserGroupMemberInput: SchemaTypes.AssignUserGroupMemberInput;
  AssistantCapability: ResolverTypeWrapper<SchemaTypes.AssistantCapability>;
  AssistantCapabilityKind: SchemaTypes.AssistantCapabilityKind;
  AssistantCapabilityToggle: ResolverTypeWrapper<SchemaTypes.AssistantCapabilityToggle>;
  AssistantCapabilityToggleInput: SchemaTypes.AssistantCapabilityToggleInput;
  AuthenticationConfig: ResolverTypeWrapper<SchemaTypes.AuthenticationConfig>;
  AuthenticationProviderConfig: ResolverTypeWrapper<
    Omit<SchemaTypes.AuthenticationProviderConfig, 'config'> & {
      config: ResolversTypes['AuthenticationProviderConfigUnion'];
    }
  >;
  AuthenticationProviderConfigUnion: ResolversTypes['OryConfig'];
  AuthenticationType: SchemaTypes.AuthenticationType;
  Authorization: ResolverTypeWrapper<SchemaTypes.Authorization>;
  AuthorizationCredential: SchemaTypes.AuthorizationCredential;
  AuthorizationPolicyRuleCredential: ResolverTypeWrapper<SchemaTypes.AuthorizationPolicyRuleCredential>;
  AuthorizationPolicyRulePrivilege: ResolverTypeWrapper<SchemaTypes.AuthorizationPolicyRulePrivilege>;
  AuthorizationPolicyType: SchemaTypes.AuthorizationPolicyType;
  AuthorizationPrivilege: SchemaTypes.AuthorizationPrivilege;
  Boolean: ResolverTypeWrapper<SchemaTypes.Scalars['Boolean']>;
  Calendar: ResolverTypeWrapper<SchemaTypes.Calendar>;
  CalendarEvent: ResolverTypeWrapper<SchemaTypes.CalendarEvent>;
  CalendarEventType: SchemaTypes.CalendarEventType;
  Callout: ResolverTypeWrapper<SchemaTypes.Callout>;
  CalloutAllowedActors: SchemaTypes.CalloutAllowedActors;
  CalloutContribution: ResolverTypeWrapper<SchemaTypes.CalloutContribution>;
  CalloutContributionDefaults: ResolverTypeWrapper<SchemaTypes.CalloutContributionDefaults>;
  CalloutContributionType: SchemaTypes.CalloutContributionType;
  CalloutContributionsCountOutput: ResolverTypeWrapper<SchemaTypes.CalloutContributionsCountOutput>;
  CalloutContributorsMapView: ResolverTypeWrapper<SchemaTypes.CalloutContributorsMapView>;
  CalloutContributorsSettings: ResolverTypeWrapper<SchemaTypes.CalloutContributorsSettings>;
  CalloutDescriptionDisplayMode: SchemaTypes.CalloutDescriptionDisplayMode;
  CalloutFraming: ResolverTypeWrapper<SchemaTypes.CalloutFraming>;
  CalloutFramingType: SchemaTypes.CalloutFramingType;
  CalloutPostCreated: ResolverTypeWrapper<SchemaTypes.CalloutPostCreated>;
  CalloutReaction: ResolverTypeWrapper<SchemaTypes.CalloutReaction>;
  CalloutReactionsSummary: ResolverTypeWrapper<SchemaTypes.CalloutReactionsSummary>;
  CalloutSelectionMode: SchemaTypes.CalloutSelectionMode;
  CalloutSelectionSettings: ResolverTypeWrapper<SchemaTypes.CalloutSelectionSettings>;
  CalloutSettings: ResolverTypeWrapper<SchemaTypes.CalloutSettings>;
  CalloutSettingsContribution: ResolverTypeWrapper<SchemaTypes.CalloutSettingsContribution>;
  CalloutSettingsFraming: ResolverTypeWrapper<SchemaTypes.CalloutSettingsFraming>;
  CalloutVisibility: SchemaTypes.CalloutVisibility;
  CalloutsSet: ResolverTypeWrapper<SchemaTypes.CalloutsSet>;
  CalloutsSetType: SchemaTypes.CalloutsSetType;
  CastPollVoteInput: SchemaTypes.CastPollVoteInput;
  Classification: ResolverTypeWrapper<SchemaTypes.Classification>;
  ClassificationCardinality: SchemaTypes.ClassificationCardinality;
  ClassificationEntry: ResolverTypeWrapper<SchemaTypes.ClassificationEntry>;
  ClassificationTemplateContent: ResolverTypeWrapper<SchemaTypes.ClassificationTemplateContent>;
  ClassificationValue: ResolverTypeWrapper<SchemaTypes.ClassificationValue>;
  CollaboraDocument: ResolverTypeWrapper<SchemaTypes.CollaboraDocument>;
  CollaboraDocumentType: SchemaTypes.CollaboraDocumentType;
  CollaboraEditorUrlResult: ResolverTypeWrapper<SchemaTypes.CollaboraEditorUrlResult>;
  Collaboration: ResolverTypeWrapper<SchemaTypes.Collaboration>;
  CollaborationMigrationIssue: ResolverTypeWrapper<SchemaTypes.CollaborationMigrationIssue>;
  CollaborationMigrationResult: ResolverTypeWrapper<SchemaTypes.CollaborationMigrationResult>;
  Communication: ResolverTypeWrapper<SchemaTypes.Communication>;
  CommunicationAdminEnsureAccessInput: SchemaTypes.CommunicationAdminEnsureAccessInput;
  CommunicationAdminMembershipInput: SchemaTypes.CommunicationAdminMembershipInput;
  CommunicationAdminMembershipResult: ResolverTypeWrapper<SchemaTypes.CommunicationAdminMembershipResult>;
  CommunicationAdminMigrateRoomsResult: ResolverTypeWrapper<SchemaTypes.CommunicationAdminMigrateRoomsResult>;
  CommunicationAdminOrphanedUsageResult: ResolverTypeWrapper<SchemaTypes.CommunicationAdminOrphanedUsageResult>;
  CommunicationAdminRemoveOrphanedRoomInput: SchemaTypes.CommunicationAdminRemoveOrphanedRoomInput;
  CommunicationAdminRoomMembershipResult: ResolverTypeWrapper<SchemaTypes.CommunicationAdminRoomMembershipResult>;
  CommunicationAdminRoomResult: ResolverTypeWrapper<SchemaTypes.CommunicationAdminRoomResult>;
  CommunicationAdminUpdateRoomStateInput: SchemaTypes.CommunicationAdminUpdateRoomStateInput;
  CommunicationSendMessageToCommunityLeadsInput: SchemaTypes.CommunicationSendMessageToCommunityLeadsInput;
  CommunicationSendMessageToOrganizationInput: SchemaTypes.CommunicationSendMessageToOrganizationInput;
  CommunicationSendMessageToUsersInput: SchemaTypes.CommunicationSendMessageToUsersInput;
  Community: ResolverTypeWrapper<SchemaTypes.Community>;
  CommunityApplicationForRoleResult: ResolverTypeWrapper<SchemaTypes.CommunityApplicationForRoleResult>;
  CommunityApplicationResult: ResolverTypeWrapper<SchemaTypes.CommunityApplicationResult>;
  CommunityGuidelines: ResolverTypeWrapper<SchemaTypes.CommunityGuidelines>;
  CommunityInvitationForRoleResult: ResolverTypeWrapper<SchemaTypes.CommunityInvitationForRoleResult>;
  CommunityInvitationResult: ResolverTypeWrapper<SchemaTypes.CommunityInvitationResult>;
  CommunityMembershipPolicy: SchemaTypes.CommunityMembershipPolicy;
  CommunityMembershipResult: ResolverTypeWrapper<SchemaTypes.CommunityMembershipResult>;
  CommunityMembershipStatus: SchemaTypes.CommunityMembershipStatus;
  Config: ResolverTypeWrapper<SchemaTypes.Config>;
  ContentUpdatePolicy: SchemaTypes.ContentUpdatePolicy;
  ContributionsFilterInput: SchemaTypes.ContributionsFilterInput;
  ContributorCollectionCounts: ResolverTypeWrapper<SchemaTypes.ContributorCollectionCounts>;
  ContributorCollectionItem: ResolverTypeWrapper<SchemaTypes.ContributorCollectionItem>;
  ContributorCollectionView: SchemaTypes.ContributorCollectionView;
  ContributorFilterInput: SchemaTypes.ContributorFilterInput;
  ContributorLocation: ResolverTypeWrapper<SchemaTypes.ContributorLocation>;
  Conversation: ResolverTypeWrapper<SchemaTypes.Conversation>;
  ConversationCreatedEvent: ResolverTypeWrapper<SchemaTypes.ConversationCreatedEvent>;
  ConversationCreationType: SchemaTypes.ConversationCreationType;
  ConversationDeletedEvent: ResolverTypeWrapper<SchemaTypes.ConversationDeletedEvent>;
  ConversationEventSubscriptionResult: ResolverTypeWrapper<SchemaTypes.ConversationEventSubscriptionResult>;
  ConversationEventType: SchemaTypes.ConversationEventType;
  ConversationMemberAddedEvent: ResolverTypeWrapper<SchemaTypes.ConversationMemberAddedEvent>;
  ConversationMemberRemovedEvent: ResolverTypeWrapper<SchemaTypes.ConversationMemberRemovedEvent>;
  ConversationMessageReceivedEvent: ResolverTypeWrapper<SchemaTypes.ConversationMessageReceivedEvent>;
  ConversationMessageRemovedEvent: ResolverTypeWrapper<SchemaTypes.ConversationMessageRemovedEvent>;
  ConversationReadReceiptUpdatedEvent: ResolverTypeWrapper<SchemaTypes.ConversationReadReceiptUpdatedEvent>;
  ConversationUpdatedEvent: ResolverTypeWrapper<SchemaTypes.ConversationUpdatedEvent>;
  ConversationVcResetInput: SchemaTypes.ConversationVcResetInput;
  ConversionVcSpaceToVcKnowledgeBaseInput: SchemaTypes.ConversionVcSpaceToVcKnowledgeBaseInput;
  ConvertSpaceL1ToSpaceL0Input: SchemaTypes.ConvertSpaceL1ToSpaceL0Input;
  ConvertSpaceL1ToSpaceL2Input: SchemaTypes.ConvertSpaceL1ToSpaceL2Input;
  ConvertSpaceL2ToSpaceL1Input: SchemaTypes.ConvertSpaceL2ToSpaceL1Input;
  CreateAiPersonaInput: SchemaTypes.CreateAiPersonaInput;
  CreateCalendarEventOnCalendarInput: SchemaTypes.CreateCalendarEventOnCalendarInput;
  CreateCalloutContributionData: ResolverTypeWrapper<SchemaTypes.CreateCalloutContributionData>;
  CreateCalloutContributionDefaultsData: ResolverTypeWrapper<SchemaTypes.CreateCalloutContributionDefaultsData>;
  CreateCalloutContributionDefaultsInput: SchemaTypes.CreateCalloutContributionDefaultsInput;
  CreateCalloutContributionInput: SchemaTypes.CreateCalloutContributionInput;
  CreateCalloutContributorsMapViewData: ResolverTypeWrapper<SchemaTypes.CreateCalloutContributorsMapViewData>;
  CreateCalloutContributorsMapViewInput: SchemaTypes.CreateCalloutContributorsMapViewInput;
  CreateCalloutContributorsSettingsData: ResolverTypeWrapper<SchemaTypes.CreateCalloutContributorsSettingsData>;
  CreateCalloutContributorsSettingsInput: SchemaTypes.CreateCalloutContributorsSettingsInput;
  CreateCalloutData: ResolverTypeWrapper<SchemaTypes.CreateCalloutData>;
  CreateCalloutFramingData: ResolverTypeWrapper<SchemaTypes.CreateCalloutFramingData>;
  CreateCalloutFramingInput: SchemaTypes.CreateCalloutFramingInput;
  CreateCalloutInput: SchemaTypes.CreateCalloutInput;
  CreateCalloutOnCalloutsSetInput: SchemaTypes.CreateCalloutOnCalloutsSetInput;
  CreateCalloutSelectionSettingsData: ResolverTypeWrapper<SchemaTypes.CreateCalloutSelectionSettingsData>;
  CreateCalloutSelectionSettingsInput: SchemaTypes.CreateCalloutSelectionSettingsInput;
  CreateCalloutSettingsContributionData: ResolverTypeWrapper<SchemaTypes.CreateCalloutSettingsContributionData>;
  CreateCalloutSettingsContributionInput: SchemaTypes.CreateCalloutSettingsContributionInput;
  CreateCalloutSettingsData: ResolverTypeWrapper<SchemaTypes.CreateCalloutSettingsData>;
  CreateCalloutSettingsFramingData: ResolverTypeWrapper<SchemaTypes.CreateCalloutSettingsFramingData>;
  CreateCalloutSettingsFramingInput: SchemaTypes.CreateCalloutSettingsFramingInput;
  CreateCalloutSettingsInput: SchemaTypes.CreateCalloutSettingsInput;
  CreateCalloutTaskBoardData: ResolverTypeWrapper<SchemaTypes.CreateCalloutTaskBoardData>;
  CreateCalloutTaskBoardInput: SchemaTypes.CreateCalloutTaskBoardInput;
  CreateCalloutsSetData: ResolverTypeWrapper<SchemaTypes.CreateCalloutsSetData>;
  CreateCalloutsSetInput: SchemaTypes.CreateCalloutsSetInput;
  CreateClassificationData: ResolverTypeWrapper<SchemaTypes.CreateClassificationData>;
  CreateClassificationEntryInput: SchemaTypes.CreateClassificationEntryInput;
  CreateClassificationInput: SchemaTypes.CreateClassificationInput;
  CreateClassificationTemplateContentInput: SchemaTypes.CreateClassificationTemplateContentInput;
  CreateClassificationValueInput: SchemaTypes.CreateClassificationValueInput;
  CreateCollaboraDocumentData: ResolverTypeWrapper<SchemaTypes.CreateCollaboraDocumentData>;
  CreateCollaboraDocumentInput: SchemaTypes.CreateCollaboraDocumentInput;
  CreateCollaborationData: ResolverTypeWrapper<SchemaTypes.CreateCollaborationData>;
  CreateCollaborationInput: SchemaTypes.CreateCollaborationInput;
  CreateCollaborationOnSpaceInput: SchemaTypes.CreateCollaborationOnSpaceInput;
  CreateCommunityGuidelinesData: ResolverTypeWrapper<SchemaTypes.CreateCommunityGuidelinesData>;
  CreateCommunityGuidelinesInput: SchemaTypes.CreateCommunityGuidelinesInput;
  CreateContributionOnCalloutInput: SchemaTypes.CreateContributionOnCalloutInput;
  CreateConversationInput: SchemaTypes.CreateConversationInput;
  CreateInnovationFlowData: ResolverTypeWrapper<SchemaTypes.CreateInnovationFlowData>;
  CreateInnovationFlowInput: SchemaTypes.CreateInnovationFlowInput;
  CreateInnovationFlowStateData: ResolverTypeWrapper<SchemaTypes.CreateInnovationFlowStateData>;
  CreateInnovationFlowStateInput: SchemaTypes.CreateInnovationFlowStateInput;
  CreateInnovationFlowStateSettingsData: ResolverTypeWrapper<SchemaTypes.CreateInnovationFlowStateSettingsData>;
  CreateInnovationFlowStateSettingsInput: SchemaTypes.CreateInnovationFlowStateSettingsInput;
  CreateInnovationHubOnAccountInput: SchemaTypes.CreateInnovationHubOnAccountInput;
  CreateInnovationPackOnAccountInput: SchemaTypes.CreateInnovationPackOnAccountInput;
  CreateKnowledgeBaseInput: SchemaTypes.CreateKnowledgeBaseInput;
  CreateLicensePlanOnLicensingFrameworkInput: SchemaTypes.CreateLicensePlanOnLicensingFrameworkInput;
  CreateLicensePolicyCredentialRuleInput: SchemaTypes.CreateLicensePolicyCredentialRuleInput;
  CreateLinkData: ResolverTypeWrapper<SchemaTypes.CreateLinkData>;
  CreateLinkInput: SchemaTypes.CreateLinkInput;
  CreateLocationData: ResolverTypeWrapper<SchemaTypes.CreateLocationData>;
  CreateLocationInput: SchemaTypes.CreateLocationInput;
  CreateMemoData: ResolverTypeWrapper<SchemaTypes.CreateMemoData>;
  CreateMemoInput: SchemaTypes.CreateMemoInput;
  CreateNVPInput: SchemaTypes.CreateNvpInput;
  CreateOrganizationInput: SchemaTypes.CreateOrganizationInput;
  CreatePollData: ResolverTypeWrapper<SchemaTypes.CreatePollData>;
  CreatePollInput: SchemaTypes.CreatePollInput;
  CreatePostData: ResolverTypeWrapper<SchemaTypes.CreatePostData>;
  CreatePostInput: SchemaTypes.CreatePostInput;
  CreateProfileData: ResolverTypeWrapper<SchemaTypes.CreateProfileData>;
  CreateProfileInput: SchemaTypes.CreateProfileInput;
  CreateReferenceData: ResolverTypeWrapper<SchemaTypes.CreateReferenceData>;
  CreateReferenceInput: SchemaTypes.CreateReferenceInput;
  CreateReferenceOnProfileInput: SchemaTypes.CreateReferenceOnProfileInput;
  CreateSpaceAboutInput: SchemaTypes.CreateSpaceAboutInput;
  CreateSpaceOnAccountInput: SchemaTypes.CreateSpaceOnAccountInput;
  CreateSpaceSettingsCollaborationInput: SchemaTypes.CreateSpaceSettingsCollaborationInput;
  CreateSpaceSettingsInput: SchemaTypes.CreateSpaceSettingsInput;
  CreateSpaceSettingsLayoutInput: SchemaTypes.CreateSpaceSettingsLayoutInput;
  CreateSpaceSettingsMembershipInput: SchemaTypes.CreateSpaceSettingsMembershipInput;
  CreateSpaceSettingsPrivacyInput: SchemaTypes.CreateSpaceSettingsPrivacyInput;
  CreateStateOnInnovationFlowInput: SchemaTypes.CreateStateOnInnovationFlowInput;
  CreateSubspaceInput: SchemaTypes.CreateSubspaceInput;
  CreateTagsetData: ResolverTypeWrapper<SchemaTypes.CreateTagsetData>;
  CreateTagsetInput: SchemaTypes.CreateTagsetInput;
  CreateTagsetOnProfileInput: SchemaTypes.CreateTagsetOnProfileInput;
  CreateTaskColumnOnCalloutInput: SchemaTypes.CreateTaskColumnOnCalloutInput;
  CreateTemplateContentSpaceInput: SchemaTypes.CreateTemplateContentSpaceInput;
  CreateTemplateFromContentSpaceOnTemplatesSetInput: SchemaTypes.CreateTemplateFromContentSpaceOnTemplatesSetInput;
  CreateTemplateFromSpaceOnTemplatesSetInput: SchemaTypes.CreateTemplateFromSpaceOnTemplatesSetInput;
  CreateTemplateOnTemplatesSetInput: SchemaTypes.CreateTemplateOnTemplatesSetInput;
  CreateUserGroupInput: SchemaTypes.CreateUserGroupInput;
  CreateUserInput: SchemaTypes.CreateUserInput;
  CreateVirtualContributorOnAccountInput: SchemaTypes.CreateVirtualContributorOnAccountInput;
  CreateVisualOnProfileData: ResolverTypeWrapper<SchemaTypes.CreateVisualOnProfileData>;
  CreateVisualOnProfileInput: SchemaTypes.CreateVisualOnProfileInput;
  CreateWhiteboardData: ResolverTypeWrapper<SchemaTypes.CreateWhiteboardData>;
  CreateWhiteboardDraftOnCalloutsSetInput: SchemaTypes.CreateWhiteboardDraftOnCalloutsSetInput;
  CreateWhiteboardDraftOnTemplatesSetInput: SchemaTypes.CreateWhiteboardDraftOnTemplatesSetInput;
  CreateWhiteboardInput: SchemaTypes.CreateWhiteboardInput;
  CreateWhiteboardPreviewSettingsData: ResolverTypeWrapper<SchemaTypes.CreateWhiteboardPreviewSettingsData>;
  CreateWhiteboardPreviewSettingsInput: SchemaTypes.CreateWhiteboardPreviewSettingsInput;
  Credential: ResolverTypeWrapper<SchemaTypes.Credential>;
  CredentialDefinition: ResolverTypeWrapper<SchemaTypes.CredentialDefinition>;
  CredentialType: SchemaTypes.CredentialType;
  DateTime: ResolverTypeWrapper<SchemaTypes.Scalars['DateTime']>;
  DeleteAiPersonaInput: SchemaTypes.DeleteAiPersonaInput;
  DeleteApplicationInput: SchemaTypes.DeleteApplicationInput;
  DeleteCalendarEventInput: SchemaTypes.DeleteCalendarEventInput;
  DeleteCalloutInput: SchemaTypes.DeleteCalloutInput;
  DeleteClassificationEntryInput: SchemaTypes.DeleteClassificationEntryInput;
  DeleteCollaboraDocumentInput: SchemaTypes.DeleteCollaboraDocumentInput;
  DeleteContributionInput: SchemaTypes.DeleteContributionInput;
  DeleteConversationInput: SchemaTypes.DeleteConversationInput;
  DeleteDiscussionInput: SchemaTypes.DeleteDiscussionInput;
  DeleteDocumentInput: SchemaTypes.DeleteDocumentInput;
  DeleteInnovationHubInput: SchemaTypes.DeleteInnovationHubInput;
  DeleteInnovationPackInput: SchemaTypes.DeleteInnovationPackInput;
  DeleteInvitationInput: SchemaTypes.DeleteInvitationInput;
  DeleteLicensePlanInput: SchemaTypes.DeleteLicensePlanInput;
  DeleteLicensePolicyCredentialRuleInput: SchemaTypes.DeleteLicensePolicyCredentialRuleInput;
  DeleteLinkInput: SchemaTypes.DeleteLinkInput;
  DeleteMemoInput: SchemaTypes.DeleteMemoInput;
  DeleteOrganizationInput: SchemaTypes.DeleteOrganizationInput;
  DeletePlatformInvitationInput: SchemaTypes.DeletePlatformInvitationInput;
  DeletePostInput: SchemaTypes.DeletePostInput;
  DeleteReferenceInput: SchemaTypes.DeleteReferenceInput;
  DeleteSpaceInput: SchemaTypes.DeleteSpaceInput;
  DeleteStateOnInnovationFlowInput: SchemaTypes.DeleteStateOnInnovationFlowInput;
  DeleteStorageBuckeetInput: SchemaTypes.DeleteStorageBuckeetInput;
  DeleteTaskColumnOnCalloutInput: SchemaTypes.DeleteTaskColumnOnCalloutInput;
  DeleteTemplateInput: SchemaTypes.DeleteTemplateInput;
  DeleteUserGroupInput: SchemaTypes.DeleteUserGroupInput;
  DeleteUserInput: SchemaTypes.DeleteUserInput;
  DeleteVirtualContributorInput: SchemaTypes.DeleteVirtualContributorInput;
  DeleteVisualFromMediaGalleryInput: SchemaTypes.DeleteVisualFromMediaGalleryInput;
  DeleteWhiteboardInput: SchemaTypes.DeleteWhiteboardInput;
  DirectMessageDeliveryResult: ResolverTypeWrapper<SchemaTypes.DirectMessageDeliveryResult>;
  DirectMessageDeliveryStatus: SchemaTypes.DirectMessageDeliveryStatus;
  Discussion: ResolverTypeWrapper<SchemaTypes.Discussion>;
  DiscussionDetails: ResolverTypeWrapper<SchemaTypes.DiscussionDetails>;
  DiscussionsInput: SchemaTypes.DiscussionsInput;
  DiscussionsOrderBy: SchemaTypes.DiscussionsOrderBy;
  Document: ResolverTypeWrapper<SchemaTypes.Document>;
  EmailChangeApprover: ResolverTypeWrapper<SchemaTypes.EmailChangeApprover>;
  EmailChangeApproverInput: SchemaTypes.EmailChangeApproverInput;
  Emoji: ResolverTypeWrapper<SchemaTypes.Scalars['Emoji']>;
  ExploreSpacesInput: SchemaTypes.ExploreSpacesInput;
  ExternalConfig: ResolverTypeWrapper<SchemaTypes.ExternalConfig>;
  ExternalConfigInput: SchemaTypes.ExternalConfigInput;
  FileStorageConfig: ResolverTypeWrapper<SchemaTypes.FileStorageConfig>;
  Float: ResolverTypeWrapper<SchemaTypes.Scalars['Float']>;
  Form: ResolverTypeWrapper<SchemaTypes.Form>;
  FormQuestion: ResolverTypeWrapper<SchemaTypes.FormQuestion>;
  Forum: ResolverTypeWrapper<SchemaTypes.Forum>;
  ForumCreateDiscussionInput: SchemaTypes.ForumCreateDiscussionInput;
  ForumDiscussionCategory: SchemaTypes.ForumDiscussionCategory;
  ForumDiscussionPrivacy: SchemaTypes.ForumDiscussionPrivacy;
  Geo: ResolverTypeWrapper<SchemaTypes.Geo>;
  GeoLocation: ResolverTypeWrapper<SchemaTypes.GeoLocation>;
  GrantAssistantActorCapabilitiesInput: SchemaTypes.GrantAssistantActorCapabilitiesInput;
  GrantAuthorizationCredentialInput: SchemaTypes.GrantAuthorizationCredentialInput;
  GrantOrganizationAuthorizationCredentialInput: SchemaTypes.GrantOrganizationAuthorizationCredentialInput;
  Groupable: ResolversTypes['Community'] | ResolversTypes['Organization'];
  ID: ResolverTypeWrapper<SchemaTypes.Scalars['ID']>;
  ISearchCategoryResult: ResolverTypeWrapper<SchemaTypes.ISearchCategoryResult>;
  ISearchResults: ResolverTypeWrapper<SchemaTypes.ISearchResults>;
  IdentityVerificationStatusFilter: SchemaTypes.IdentityVerificationStatusFilter;
  ImportCollaboraDocumentInput: SchemaTypes.ImportCollaboraDocumentInput;
  InAppNotification: ResolverTypeWrapper<SchemaTypes.InAppNotification>;
  InAppNotificationPayload:
    | ResolversTypes['InAppNotificationPayloadOrganizationMessageDirect']
    | ResolversTypes['InAppNotificationPayloadOrganizationMessageRoom']
    | ResolversTypes['InAppNotificationPayloadPlatformForumDiscussion']
    | ResolversTypes['InAppNotificationPayloadPlatformGlobalRoleChange']
    | ResolversTypes['InAppNotificationPayloadPlatformUser']
    | ResolversTypes['InAppNotificationPayloadPlatformUserMessageRoom']
    | ResolversTypes['InAppNotificationPayloadPlatformUserProfileRemoved']
    | ResolversTypes['InAppNotificationPayloadSpace']
    | ResolversTypes['InAppNotificationPayloadSpaceCollaborationCallout']
    | ResolversTypes['InAppNotificationPayloadSpaceCollaborationCalloutComment']
    | ResolversTypes['InAppNotificationPayloadSpaceCollaborationCalloutPostComment']
    | ResolversTypes['InAppNotificationPayloadSpaceCollaborationCalloutReaction']
    | ResolversTypes['InAppNotificationPayloadSpaceCollaborationPoll']
    | ResolversTypes['InAppNotificationPayloadSpaceCommunicationMessageDirect']
    | ResolversTypes['InAppNotificationPayloadSpaceCommunicationUpdate']
    | ResolversTypes['InAppNotificationPayloadSpaceCommunityActor']
    | ResolversTypes['InAppNotificationPayloadSpaceCommunityApplication']
    | ResolversTypes['InAppNotificationPayloadSpaceCommunityCalendarEvent']
    | ResolversTypes['InAppNotificationPayloadSpaceCommunityCalendarEventComment']
    | ResolversTypes['InAppNotificationPayloadSpaceCommunityInvitation']
    | ResolversTypes['InAppNotificationPayloadSpaceCommunityInvitationPlatform']
    | ResolversTypes['InAppNotificationPayloadUserMessageDirect']
    | ResolversTypes['InAppNotificationPayloadVirtualContributor'];
  InAppNotificationPayloadOrganizationMessageDirect: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadOrganizationMessageDirect>;
  InAppNotificationPayloadOrganizationMessageRoom: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadOrganizationMessageRoom>;
  InAppNotificationPayloadPlatformForumDiscussion: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadPlatformForumDiscussion>;
  InAppNotificationPayloadPlatformGlobalRoleChange: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadPlatformGlobalRoleChange>;
  InAppNotificationPayloadPlatformUser: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadPlatformUser>;
  InAppNotificationPayloadPlatformUserMessageRoom: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadPlatformUserMessageRoom>;
  InAppNotificationPayloadPlatformUserProfileRemoved: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadPlatformUserProfileRemoved>;
  InAppNotificationPayloadSpace: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpace>;
  InAppNotificationPayloadSpaceCollaborationCallout: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCollaborationCallout>;
  InAppNotificationPayloadSpaceCollaborationCalloutComment: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCollaborationCalloutComment>;
  InAppNotificationPayloadSpaceCollaborationCalloutPostComment: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCollaborationCalloutPostComment>;
  InAppNotificationPayloadSpaceCollaborationCalloutReaction: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCollaborationCalloutReaction>;
  InAppNotificationPayloadSpaceCollaborationPoll: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCollaborationPoll>;
  InAppNotificationPayloadSpaceCommunicationMessageDirect: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCommunicationMessageDirect>;
  InAppNotificationPayloadSpaceCommunicationUpdate: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCommunicationUpdate>;
  InAppNotificationPayloadSpaceCommunityActor: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCommunityActor>;
  InAppNotificationPayloadSpaceCommunityApplication: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCommunityApplication>;
  InAppNotificationPayloadSpaceCommunityCalendarEvent: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCommunityCalendarEvent>;
  InAppNotificationPayloadSpaceCommunityCalendarEventComment: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCommunityCalendarEventComment>;
  InAppNotificationPayloadSpaceCommunityInvitation: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCommunityInvitation>;
  InAppNotificationPayloadSpaceCommunityInvitationPlatform: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadSpaceCommunityInvitationPlatform>;
  InAppNotificationPayloadUserMessageDirect: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadUserMessageDirect>;
  InAppNotificationPayloadVirtualContributor: ResolverTypeWrapper<SchemaTypes.InAppNotificationPayloadVirtualContributor>;
  InnovationFlow: ResolverTypeWrapper<SchemaTypes.InnovationFlow>;
  InnovationFlowSettings: ResolverTypeWrapper<SchemaTypes.InnovationFlowSettings>;
  InnovationFlowState: ResolverTypeWrapper<SchemaTypes.InnovationFlowState>;
  InnovationFlowStateSettings: ResolverTypeWrapper<SchemaTypes.InnovationFlowStateSettings>;
  InnovationHub: ResolverTypeWrapper<SchemaTypes.InnovationHub>;
  InnovationHubType: SchemaTypes.InnovationHubType;
  InnovationPack: ResolverTypeWrapper<SchemaTypes.InnovationPack>;
  InnovationPacksInput: SchemaTypes.InnovationPacksInput;
  InnovationPacksOrderBy: SchemaTypes.InnovationPacksOrderBy;
  InputCreatorQueryResults: ResolverTypeWrapper<SchemaTypes.InputCreatorQueryResults>;
  Int: ResolverTypeWrapper<SchemaTypes.Scalars['Int']>;
  Invitation: ResolverTypeWrapper<SchemaTypes.Invitation>;
  InvitationEventInput: SchemaTypes.InvitationEventInput;
  InviteForEntryRoleOnRoleSetInput: SchemaTypes.InviteForEntryRoleOnRoleSetInput;
  JoinAsEntryRoleOnRoleSetInput: SchemaTypes.JoinAsEntryRoleOnRoleSetInput;
  KnowledgeBase: ResolverTypeWrapper<SchemaTypes.KnowledgeBase>;
  KratosIdentity: ResolverTypeWrapper<SchemaTypes.KratosIdentity>;
  LanguageConfig: ResolverTypeWrapper<SchemaTypes.LanguageConfig>;
  LatestReleaseDiscussion: ResolverTypeWrapper<SchemaTypes.LatestReleaseDiscussion>;
  LeaveConversationInput: SchemaTypes.LeaveConversationInput;
  Library: ResolverTypeWrapper<SchemaTypes.Library>;
  LibraryInnovationPacksFilterInput: SchemaTypes.LibraryInnovationPacksFilterInput;
  LibraryTemplatesFilterInput: SchemaTypes.LibraryTemplatesFilterInput;
  License: ResolverTypeWrapper<SchemaTypes.License>;
  LicenseEntitlement: ResolverTypeWrapper<SchemaTypes.LicenseEntitlement>;
  LicenseEntitlementDataType: SchemaTypes.LicenseEntitlementDataType;
  LicenseEntitlementType: SchemaTypes.LicenseEntitlementType;
  LicensePlan: ResolverTypeWrapper<SchemaTypes.LicensePlan>;
  LicensePolicy: ResolverTypeWrapper<SchemaTypes.LicensePolicy>;
  LicenseType: SchemaTypes.LicenseType;
  Licensing: ResolverTypeWrapper<SchemaTypes.Licensing>;
  LicensingCredentialBasedCredentialType: SchemaTypes.LicensingCredentialBasedCredentialType;
  LicensingCredentialBasedPlanType: SchemaTypes.LicensingCredentialBasedPlanType;
  LicensingCredentialBasedPolicyCredentialRule: ResolverTypeWrapper<SchemaTypes.LicensingCredentialBasedPolicyCredentialRule>;
  LicensingGrantedEntitlement: ResolverTypeWrapper<SchemaTypes.LicensingGrantedEntitlement>;
  LicensingGrantedEntitlementInput: SchemaTypes.LicensingGrantedEntitlementInput;
  Lifecycle: ResolverTypeWrapper<SchemaTypes.Lifecycle>;
  LifecycleDefinition: ResolverTypeWrapper<
    SchemaTypes.Scalars['LifecycleDefinition']
  >;
  Link: ResolverTypeWrapper<SchemaTypes.Link>;
  Location: ResolverTypeWrapper<SchemaTypes.Location>;
  LookupByNameQueryResults: ResolverTypeWrapper<SchemaTypes.LookupByNameQueryResults>;
  LookupMyPrivilegesQueryResults: ResolverTypeWrapper<SchemaTypes.LookupMyPrivilegesQueryResults>;
  LookupQueryResults: ResolverTypeWrapper<SchemaTypes.LookupQueryResults>;
  Markdown: ResolverTypeWrapper<SchemaTypes.Scalars['Markdown']>;
  McpApiKey: ResolverTypeWrapper<SchemaTypes.McpApiKey>;
  McpApiKeyMintResult: ResolverTypeWrapper<SchemaTypes.McpApiKeyMintResult>;
  McpApiKeyOperation: SchemaTypes.McpApiKeyOperation;
  McpApiKeyStatus: SchemaTypes.McpApiKeyStatus;
  MeConversationsResult: ResolverTypeWrapper<SchemaTypes.MeConversationsResult>;
  MeQueryResults: ResolverTypeWrapper<SchemaTypes.MeQueryResults>;
  MediaGallery: ResolverTypeWrapper<SchemaTypes.MediaGallery>;
  Memo: ResolverTypeWrapper<SchemaTypes.Memo>;
  Message: ResolverTypeWrapper<SchemaTypes.Message>;
  MessageDetails: ResolverTypeWrapper<SchemaTypes.MessageDetails>;
  MessageID: ResolverTypeWrapper<SchemaTypes.Scalars['MessageID']>;
  MessageParent: ResolverTypeWrapper<SchemaTypes.MessageParent>;
  Messaging: ResolverTypeWrapper<SchemaTypes.Messaging>;
  Metadata: ResolverTypeWrapper<SchemaTypes.Metadata>;
  MigrateEmbeddings: ResolverTypeWrapper<SchemaTypes.MigrateEmbeddings>;
  MimeType: SchemaTypes.MimeType;
  MintMcpApiKeyInput: SchemaTypes.MintMcpApiKeyInput;
  ModelCardAiEngineResult: ResolverTypeWrapper<SchemaTypes.ModelCardAiEngineResult>;
  ModelCardMonitoringResult: ResolverTypeWrapper<SchemaTypes.ModelCardMonitoringResult>;
  ModelCardSpaceUsageResult: ResolverTypeWrapper<SchemaTypes.ModelCardSpaceUsageResult>;
  MoveCalloutContributionInput: SchemaTypes.MoveCalloutContributionInput;
  MoveSpaceL1ToSpaceL0Input: SchemaTypes.MoveSpaceL1ToSpaceL0Input;
  MoveSpaceL1ToSpaceL2Input: SchemaTypes.MoveSpaceL1ToSpaceL2Input;
  MoveSpaceL2ToSpaceL1Input: SchemaTypes.MoveSpaceL2ToSpaceL1Input;
  MoveTaskToColumnInput: SchemaTypes.MoveTaskToColumnInput;
  Mutation: ResolverTypeWrapper<{}>;
  MutationType: SchemaTypes.MutationType;
  MySpaceResults: ResolverTypeWrapper<SchemaTypes.MySpaceResults>;
  NVP: ResolverTypeWrapper<SchemaTypes.Nvp>;
  NameID: ResolverTypeWrapper<SchemaTypes.Scalars['NameID']>;
  NotificationEmailAddressInput: SchemaTypes.NotificationEmailAddressInput;
  NotificationEvent: SchemaTypes.NotificationEvent;
  NotificationEventCategory: SchemaTypes.NotificationEventCategory;
  NotificationEventInAppState: SchemaTypes.NotificationEventInAppState;
  NotificationEventPayload: SchemaTypes.NotificationEventPayload;
  NotificationEventsFilterInput: SchemaTypes.NotificationEventsFilterInput;
  NotificationRecipientResult: ResolverTypeWrapper<SchemaTypes.NotificationRecipientResult>;
  NotificationRecipientsInput: SchemaTypes.NotificationRecipientsInput;
  NotificationSettingInput: SchemaTypes.NotificationSettingInput;
  OpenAIModel: SchemaTypes.OpenAiModel;
  Organization: ResolverTypeWrapper<SchemaTypes.Organization>;
  OrganizationAuthorizationResetInput: SchemaTypes.OrganizationAuthorizationResetInput;
  OrganizationFilterInput: SchemaTypes.OrganizationFilterInput;
  OrganizationSettings: ResolverTypeWrapper<SchemaTypes.OrganizationSettings>;
  OrganizationSettingsMembership: ResolverTypeWrapper<SchemaTypes.OrganizationSettingsMembership>;
  OrganizationSettingsPrivacy: ResolverTypeWrapper<SchemaTypes.OrganizationSettingsPrivacy>;
  OrganizationVerification: ResolverTypeWrapper<SchemaTypes.OrganizationVerification>;
  OrganizationVerificationEnum: SchemaTypes.OrganizationVerificationEnum;
  OrganizationVerificationEventInput: SchemaTypes.OrganizationVerificationEventInput;
  OrganizationsInRolesResponse: ResolverTypeWrapper<SchemaTypes.OrganizationsInRolesResponse>;
  OryConfig: ResolverTypeWrapper<SchemaTypes.OryConfig>;
  PageInfo: ResolverTypeWrapper<SchemaTypes.PageInfo>;
  PaginatedInAppNotifications: ResolverTypeWrapper<SchemaTypes.PaginatedInAppNotifications>;
  PaginatedInnovationPacks: ResolverTypeWrapper<SchemaTypes.PaginatedInnovationPacks>;
  PaginatedLibraryTemplateResults: ResolverTypeWrapper<SchemaTypes.PaginatedLibraryTemplateResults>;
  PaginatedOrganization: ResolverTypeWrapper<SchemaTypes.PaginatedOrganization>;
  PaginatedSpaces: ResolverTypeWrapper<SchemaTypes.PaginatedSpaces>;
  PaginatedUsers: ResolverTypeWrapper<SchemaTypes.PaginatedUsers>;
  PaginatedVirtualContributor: ResolverTypeWrapper<SchemaTypes.PaginatedVirtualContributor>;
  Platform: ResolverTypeWrapper<SchemaTypes.Platform>;
  PlatformAccessRole: ResolverTypeWrapper<SchemaTypes.PlatformAccessRole>;
  PlatformAdminCommunicationQueryResults: ResolverTypeWrapper<SchemaTypes.PlatformAdminCommunicationQueryResults>;
  PlatformAdminIdentityQueryResults: ResolverTypeWrapper<SchemaTypes.PlatformAdminIdentityQueryResults>;
  PlatformAdminQueryResults: ResolverTypeWrapper<SchemaTypes.PlatformAdminQueryResults>;
  PlatformFeatureFlag: ResolverTypeWrapper<SchemaTypes.PlatformFeatureFlag>;
  PlatformFeatureFlagName: SchemaTypes.PlatformFeatureFlagName;
  PlatformIntegrationSettings: ResolverTypeWrapper<SchemaTypes.PlatformIntegrationSettings>;
  PlatformInvitation: ResolverTypeWrapper<SchemaTypes.PlatformInvitation>;
  PlatformLocations: ResolverTypeWrapper<SchemaTypes.PlatformLocations>;
  PlatformRolesAccess: ResolverTypeWrapper<SchemaTypes.PlatformRolesAccess>;
  PlatformSettings: ResolverTypeWrapper<SchemaTypes.PlatformSettings>;
  PlatformWellKnownVirtualContributorMapping: ResolverTypeWrapper<SchemaTypes.PlatformWellKnownVirtualContributorMapping>;
  PlatformWellKnownVirtualContributors: ResolverTypeWrapper<SchemaTypes.PlatformWellKnownVirtualContributors>;
  Poll: ResolverTypeWrapper<SchemaTypes.Poll>;
  PollEventType: SchemaTypes.PollEventType;
  PollOption: ResolverTypeWrapper<SchemaTypes.PollOption>;
  PollOptionsChangedSubscriptionResult: ResolverTypeWrapper<SchemaTypes.PollOptionsChangedSubscriptionResult>;
  PollResultsDetail: SchemaTypes.PollResultsDetail;
  PollResultsVisibility: SchemaTypes.PollResultsVisibility;
  PollSettings: ResolverTypeWrapper<SchemaTypes.PollSettings>;
  PollSettingsData: ResolverTypeWrapper<SchemaTypes.PollSettingsData>;
  PollSettingsInput: SchemaTypes.PollSettingsInput;
  PollStatus: SchemaTypes.PollStatus;
  PollVote: ResolverTypeWrapper<SchemaTypes.PollVote>;
  PollVoteUpdatedSubscriptionResult: ResolverTypeWrapper<SchemaTypes.PollVoteUpdatedSubscriptionResult>;
  Post: ResolverTypeWrapper<SchemaTypes.Post>;
  Profile: ResolverTypeWrapper<SchemaTypes.Profile>;
  ProfileType: SchemaTypes.ProfileType;
  PromptGraph: ResolverTypeWrapper<SchemaTypes.PromptGraph>;
  PromptGraphDataPoint: ResolverTypeWrapper<SchemaTypes.PromptGraphDataPoint>;
  PromptGraphDataPointInput: SchemaTypes.PromptGraphDataPointInput;
  PromptGraphDataStruct: ResolverTypeWrapper<SchemaTypes.PromptGraphDataStruct>;
  PromptGraphDataStructInput: SchemaTypes.PromptGraphDataStructInput;
  PromptGraphDefinition: ResolverTypeWrapper<SchemaTypes.PromptGraphDefinition>;
  PromptGraphDefinitionDataPoint: ResolverTypeWrapper<SchemaTypes.PromptGraphDefinitionDataPoint>;
  PromptGraphDefinitionDataStruct: ResolverTypeWrapper<SchemaTypes.PromptGraphDefinitionDataStruct>;
  PromptGraphDefinitionEdge: ResolverTypeWrapper<SchemaTypes.PromptGraphDefinitionEdge>;
  PromptGraphDefinitionNode: ResolverTypeWrapper<SchemaTypes.PromptGraphDefinitionNode>;
  PromptGraphEdge: ResolverTypeWrapper<SchemaTypes.PromptGraphEdge>;
  PromptGraphEdgeInput: SchemaTypes.PromptGraphEdgeInput;
  PromptGraphInput: SchemaTypes.PromptGraphInput;
  PromptGraphNode: ResolverTypeWrapper<SchemaTypes.PromptGraphNode>;
  PromptGraphNodeInput: SchemaTypes.PromptGraphNodeInput;
  PruneInAppNotificationAdminResult: ResolverTypeWrapper<SchemaTypes.PruneInAppNotificationAdminResult>;
  PushSubscription: ResolverTypeWrapper<SchemaTypes.PushSubscription>;
  PushSubscriptionStatus: SchemaTypes.PushSubscriptionStatus;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<SchemaTypes.Question>;
  Reaction: ResolverTypeWrapper<SchemaTypes.Reaction>;
  Reference: ResolverTypeWrapper<SchemaTypes.Reference>;
  RefreshVirtualContributorBodyOfKnowledgeInput: SchemaTypes.RefreshVirtualContributorBodyOfKnowledgeInput;
  RelayPaginatedSpace: ResolverTypeWrapper<SchemaTypes.RelayPaginatedSpace>;
  RelayPaginatedSpaceEdge: ResolverTypeWrapper<SchemaTypes.RelayPaginatedSpaceEdge>;
  RelayPaginatedSpacePageInfo: ResolverTypeWrapper<SchemaTypes.RelayPaginatedSpacePageInfo>;
  RemoveCommunityGuidelinesContentInput: SchemaTypes.RemoveCommunityGuidelinesContentInput;
  RemoveConversationMemberInput: SchemaTypes.RemoveConversationMemberInput;
  RemoveDefaultCalloutTemplateOnInnovationFlowStateInput: SchemaTypes.RemoveDefaultCalloutTemplateOnInnovationFlowStateInput;
  RemovePlatformRoleInput: SchemaTypes.RemovePlatformRoleInput;
  RemovePollOptionInput: SchemaTypes.RemovePollOptionInput;
  RemovePollVoteInput: SchemaTypes.RemovePollVoteInput;
  RemoveReactionFromCalloutInput: SchemaTypes.RemoveReactionFromCalloutInput;
  RemoveRoleOnRoleSetInput: SchemaTypes.RemoveRoleOnRoleSetInput;
  RemoveUserGroupMemberInput: SchemaTypes.RemoveUserGroupMemberInput;
  ReorderPollOptionsInput: SchemaTypes.ReorderPollOptionsInput;
  ReplaceCollaboraDocumentInput: SchemaTypes.ReplaceCollaboraDocumentInput;
  ReplaceWhiteboardContentFromSourceInput: SchemaTypes.ReplaceWhiteboardContentFromSourceInput;
  RevokeAuthorizationCredentialInput: SchemaTypes.RevokeAuthorizationCredentialInput;
  RevokeLicensePlanFromAccount: SchemaTypes.RevokeLicensePlanFromAccount;
  RevokeLicensePlanFromSpace: SchemaTypes.RevokeLicensePlanFromSpace;
  RevokeMcpApiKeyInput: SchemaTypes.RevokeMcpApiKeyInput;
  RevokeOrganizationAuthorizationCredentialInput: SchemaTypes.RevokeOrganizationAuthorizationCredentialInput;
  Role: ResolverTypeWrapper<SchemaTypes.Role>;
  RoleName: SchemaTypes.RoleName;
  RoleSet: ResolverTypeWrapper<SchemaTypes.RoleSet>;
  RoleSetInvitationResult: ResolverTypeWrapper<SchemaTypes.RoleSetInvitationResult>;
  RoleSetInvitationResultType: SchemaTypes.RoleSetInvitationResultType;
  RoleSetRoleImplicit: SchemaTypes.RoleSetRoleImplicit;
  RoleSetType: SchemaTypes.RoleSetType;
  RolesActorInput: SchemaTypes.RolesActorInput;
  RolesResult: ResolverTypeWrapper<SchemaTypes.RolesResult>;
  RolesResultCommunity: ResolverTypeWrapper<SchemaTypes.RolesResultCommunity>;
  RolesResultOrganization: ResolverTypeWrapper<SchemaTypes.RolesResultOrganization>;
  RolesResultSpace: ResolverTypeWrapper<SchemaTypes.RolesResultSpace>;
  Room: ResolverTypeWrapper<SchemaTypes.Room>;
  RoomAddReactionToMessageInput: SchemaTypes.RoomAddReactionToMessageInput;
  RoomEventSubscriptionResult: ResolverTypeWrapper<SchemaTypes.RoomEventSubscriptionResult>;
  RoomMarkMessageReadInput: SchemaTypes.RoomMarkMessageReadInput;
  RoomMessageEventSubscriptionResult: ResolverTypeWrapper<SchemaTypes.RoomMessageEventSubscriptionResult>;
  RoomMessageReactionEventSubscriptionResult: ResolverTypeWrapper<SchemaTypes.RoomMessageReactionEventSubscriptionResult>;
  RoomRemoveMessageInput: SchemaTypes.RoomRemoveMessageInput;
  RoomRemoveReactionToMessageInput: SchemaTypes.RoomRemoveReactionToMessageInput;
  RoomSendMessageInput: SchemaTypes.RoomSendMessageInput;
  RoomSendMessageReplyInput: SchemaTypes.RoomSendMessageReplyInput;
  RoomThreadUnreadCount: ResolverTypeWrapper<SchemaTypes.RoomThreadUnreadCount>;
  RoomType: SchemaTypes.RoomType;
  RoomUnreadCounts: ResolverTypeWrapper<SchemaTypes.RoomUnreadCounts>;
  SearchCategory: SchemaTypes.SearchCategory;
  SearchCursor: ResolverTypeWrapper<SchemaTypes.Scalars['SearchCursor']>;
  SearchFilterInput: SchemaTypes.SearchFilterInput;
  SearchInput: SchemaTypes.SearchInput;
  SearchResult:
    | ResolversTypes['SearchResultCallout']
    | ResolversTypes['SearchResultCollaboraDocument']
    | ResolversTypes['SearchResultMemo']
    | ResolversTypes['SearchResultOrganization']
    | ResolversTypes['SearchResultPost']
    | ResolversTypes['SearchResultSpace']
    | ResolversTypes['SearchResultUser']
    | ResolversTypes['SearchResultWhiteboard'];
  SearchResultCallout: ResolverTypeWrapper<SchemaTypes.SearchResultCallout>;
  SearchResultCollaboraDocument: ResolverTypeWrapper<SchemaTypes.SearchResultCollaboraDocument>;
  SearchResultMemo: ResolverTypeWrapper<SchemaTypes.SearchResultMemo>;
  SearchResultOrganization: ResolverTypeWrapper<SchemaTypes.SearchResultOrganization>;
  SearchResultPost: ResolverTypeWrapper<SchemaTypes.SearchResultPost>;
  SearchResultSpace: ResolverTypeWrapper<SchemaTypes.SearchResultSpace>;
  SearchResultType: SchemaTypes.SearchResultType;
  SearchResultUser: ResolverTypeWrapper<SchemaTypes.SearchResultUser>;
  SearchResultWhiteboard: ResolverTypeWrapper<SchemaTypes.SearchResultWhiteboard>;
  SearchVisibility: SchemaTypes.SearchVisibility;
  SendDirectMessageToUsersInput: SchemaTypes.SendDirectMessageToUsersInput;
  Sentry: ResolverTypeWrapper<SchemaTypes.Sentry>;
  ServiceMetadata: ResolverTypeWrapper<SchemaTypes.ServiceMetadata>;
  SetDefaultCalloutTemplateOnInnovationFlowStateInput: SchemaTypes.SetDefaultCalloutTemplateOnInnovationFlowStateInput;
  SetPlatformWellKnownVirtualContributorInput: SchemaTypes.SetPlatformWellKnownVirtualContributorInput;
  SidebarWidget: SchemaTypes.SidebarWidget;
  Space: ResolverTypeWrapper<SchemaTypes.Space>;
  SpaceAbout: ResolverTypeWrapper<SchemaTypes.SpaceAbout>;
  SpaceAboutMembership: ResolverTypeWrapper<SchemaTypes.SpaceAboutMembership>;
  SpaceFilterInput: SchemaTypes.SpaceFilterInput;
  SpaceLevel: SchemaTypes.SpaceLevel;
  SpacePendingMembershipInfo: ResolverTypeWrapper<SchemaTypes.SpacePendingMembershipInfo>;
  SpacePrivacyMode: SchemaTypes.SpacePrivacyMode;
  SpaceSettings: ResolverTypeWrapper<SchemaTypes.SpaceSettings>;
  SpaceSettingsCollaboration: ResolverTypeWrapper<SchemaTypes.SpaceSettingsCollaboration>;
  SpaceSettingsLayout: ResolverTypeWrapper<SchemaTypes.SpaceSettingsLayout>;
  SpaceSettingsMembership: ResolverTypeWrapper<SchemaTypes.SpaceSettingsMembership>;
  SpaceSettingsPrivacy: ResolverTypeWrapper<SchemaTypes.SpaceSettingsPrivacy>;
  SpaceSortMode: SchemaTypes.SpaceSortMode;
  SpaceSubscription: ResolverTypeWrapper<SchemaTypes.SpaceSubscription>;
  SpaceVisibility: SchemaTypes.SpaceVisibility;
  StorageAggregator: ResolverTypeWrapper<SchemaTypes.StorageAggregator>;
  StorageAggregatorParent: ResolverTypeWrapper<SchemaTypes.StorageAggregatorParent>;
  StorageAggregatorType: SchemaTypes.StorageAggregatorType;
  StorageBucket: ResolverTypeWrapper<SchemaTypes.StorageBucket>;
  StorageBucketParent: ResolverTypeWrapper<SchemaTypes.StorageBucketParent>;
  StorageBucketUploadFileInput: SchemaTypes.StorageBucketUploadFileInput;
  StorageBucketUploadFileOnLinkInput: SchemaTypes.StorageBucketUploadFileOnLinkInput;
  StorageBucketUploadFileOnReferenceInput: SchemaTypes.StorageBucketUploadFileOnReferenceInput;
  StorageBucketUploadFileResult: ResolverTypeWrapper<SchemaTypes.StorageBucketUploadFileResult>;
  StorageConfig: ResolverTypeWrapper<SchemaTypes.StorageConfig>;
  String: ResolverTypeWrapper<SchemaTypes.Scalars['String']>;
  SubscribeToPushNotificationsInput: SchemaTypes.SubscribeToPushNotificationsInput;
  Subscription: ResolverTypeWrapper<{}>;
  SubspaceCreated: ResolverTypeWrapper<SchemaTypes.SubspaceCreated>;
  Tagset: ResolverTypeWrapper<SchemaTypes.Tagset>;
  TagsetArgs: SchemaTypes.TagsetArgs;
  TagsetReservedName: SchemaTypes.TagsetReservedName;
  TagsetTemplate: ResolverTypeWrapper<SchemaTypes.TagsetTemplate>;
  TagsetType: SchemaTypes.TagsetType;
  Task: ResolverTypeWrapper<SchemaTypes.Task>;
  TaskColumnCount: ResolverTypeWrapper<SchemaTypes.TaskColumnCount>;
  TaskStatus: SchemaTypes.TaskStatus;
  Template: ResolverTypeWrapper<SchemaTypes.Template>;
  TemplateContentSpace: ResolverTypeWrapper<SchemaTypes.TemplateContentSpace>;
  TemplateDefault: ResolverTypeWrapper<SchemaTypes.TemplateDefault>;
  TemplateDefaultType: SchemaTypes.TemplateDefaultType;
  TemplateResult: ResolverTypeWrapper<SchemaTypes.TemplateResult>;
  TemplateType: SchemaTypes.TemplateType;
  TemplatesManager: ResolverTypeWrapper<SchemaTypes.TemplatesManager>;
  TemplatesSet: ResolverTypeWrapper<SchemaTypes.TemplatesSet>;
  Timeline: ResolverTypeWrapper<SchemaTypes.Timeline>;
  TransferAccountInnovationHubInput: SchemaTypes.TransferAccountInnovationHubInput;
  TransferAccountInnovationPackInput: SchemaTypes.TransferAccountInnovationPackInput;
  TransferAccountSpaceInput: SchemaTypes.TransferAccountSpaceInput;
  TransferAccountVirtualContributorInput: SchemaTypes.TransferAccountVirtualContributorInput;
  TransferCalloutInput: SchemaTypes.TransferCalloutInput;
  UUID: ResolverTypeWrapper<SchemaTypes.Scalars['UUID']>;
  UnsubscribeFromPushNotificationsInput: SchemaTypes.UnsubscribeFromPushNotificationsInput;
  UpdateAiPersonaInput: SchemaTypes.UpdateAiPersonaInput;
  UpdateApplicationFormOnRoleSetInput: SchemaTypes.UpdateApplicationFormOnRoleSetInput;
  UpdateBaselineLicensePlanOnAccount: SchemaTypes.UpdateBaselineLicensePlanOnAccount;
  UpdateCalendarEventInput: SchemaTypes.UpdateCalendarEventInput;
  UpdateCalloutContributionDefaultsInput: SchemaTypes.UpdateCalloutContributionDefaultsInput;
  UpdateCalloutContributorsSettingsInput: SchemaTypes.UpdateCalloutContributorsSettingsInput;
  UpdateCalloutEntityInput: SchemaTypes.UpdateCalloutEntityInput;
  UpdateCalloutFramingInput: SchemaTypes.UpdateCalloutFramingInput;
  UpdateCalloutPublishInfoInput: SchemaTypes.UpdateCalloutPublishInfoInput;
  UpdateCalloutSelectionSettingsInput: SchemaTypes.UpdateCalloutSelectionSettingsInput;
  UpdateCalloutSettingsContributionInput: SchemaTypes.UpdateCalloutSettingsContributionInput;
  UpdateCalloutSettingsFramingInput: SchemaTypes.UpdateCalloutSettingsFramingInput;
  UpdateCalloutSettingsInput: SchemaTypes.UpdateCalloutSettingsInput;
  UpdateCalloutVisibilityInput: SchemaTypes.UpdateCalloutVisibilityInput;
  UpdateCalloutsSortOrderInput: SchemaTypes.UpdateCalloutsSortOrderInput;
  UpdateClassificationEntryDisplayInput: SchemaTypes.UpdateClassificationEntryDisplayInput;
  UpdateClassificationEntryInput: SchemaTypes.UpdateClassificationEntryInput;
  UpdateClassificationEntrySelectionInput: SchemaTypes.UpdateClassificationEntrySelectionInput;
  UpdateClassificationInput: SchemaTypes.UpdateClassificationInput;
  UpdateClassificationSelectTagsetValueInput: SchemaTypes.UpdateClassificationSelectTagsetValueInput;
  UpdateCollaboraDocumentInput: SchemaTypes.UpdateCollaboraDocumentInput;
  UpdateCollaborationFromSpaceTemplateInput: SchemaTypes.UpdateCollaborationFromSpaceTemplateInput;
  UpdateCommunityGuidelinesEntityInput: SchemaTypes.UpdateCommunityGuidelinesEntityInput;
  UpdateContributionCalloutsSortOrderInput: SchemaTypes.UpdateContributionCalloutsSortOrderInput;
  UpdateConversationInput: SchemaTypes.UpdateConversationInput;
  UpdateDiscussionInput: SchemaTypes.UpdateDiscussionInput;
  UpdateDocumentInput: SchemaTypes.UpdateDocumentInput;
  UpdateFormInput: SchemaTypes.UpdateFormInput;
  UpdateFormQuestionInput: SchemaTypes.UpdateFormQuestionInput;
  UpdateInnovationFlowCurrentStateInput: SchemaTypes.UpdateInnovationFlowCurrentStateInput;
  UpdateInnovationFlowInput: SchemaTypes.UpdateInnovationFlowInput;
  UpdateInnovationFlowStateInput: SchemaTypes.UpdateInnovationFlowStateInput;
  UpdateInnovationFlowStateSettingsInput: SchemaTypes.UpdateInnovationFlowStateSettingsInput;
  UpdateInnovationFlowStatesSortOrderInput: SchemaTypes.UpdateInnovationFlowStatesSortOrderInput;
  UpdateInnovationHubInput: SchemaTypes.UpdateInnovationHubInput;
  UpdateInnovationPackInput: SchemaTypes.UpdateInnovationPackInput;
  UpdateKnowledgeBaseInput: SchemaTypes.UpdateKnowledgeBaseInput;
  UpdateLicensePlanInput: SchemaTypes.UpdateLicensePlanInput;
  UpdateLicensePolicyCredentialRuleInput: SchemaTypes.UpdateLicensePolicyCredentialRuleInput;
  UpdateLinkInput: SchemaTypes.UpdateLinkInput;
  UpdateLocationInput: SchemaTypes.UpdateLocationInput;
  UpdateMemoEntityInput: SchemaTypes.UpdateMemoEntityInput;
  UpdateNotificationStateInput: SchemaTypes.UpdateNotificationStateInput;
  UpdateOrganizationInput: SchemaTypes.UpdateOrganizationInput;
  UpdateOrganizationPlatformSettingsInput: SchemaTypes.UpdateOrganizationPlatformSettingsInput;
  UpdateOrganizationSettingsEntityInput: SchemaTypes.UpdateOrganizationSettingsEntityInput;
  UpdateOrganizationSettingsInput: SchemaTypes.UpdateOrganizationSettingsInput;
  UpdateOrganizationSettingsMembershipInput: SchemaTypes.UpdateOrganizationSettingsMembershipInput;
  UpdateOrganizationSettingsPrivacyInput: SchemaTypes.UpdateOrganizationSettingsPrivacyInput;
  UpdatePlatformSettingsInput: SchemaTypes.UpdatePlatformSettingsInput;
  UpdatePlatformSettingsIntegrationInput: SchemaTypes.UpdatePlatformSettingsIntegrationInput;
  UpdatePollInput: SchemaTypes.UpdatePollInput;
  UpdatePollOptionInput: SchemaTypes.UpdatePollOptionInput;
  UpdatePollStatusInput: SchemaTypes.UpdatePollStatusInput;
  UpdatePostInput: SchemaTypes.UpdatePostInput;
  UpdateProfileDirectInput: SchemaTypes.UpdateProfileDirectInput;
  UpdateProfileInput: SchemaTypes.UpdateProfileInput;
  UpdateReferenceInput: SchemaTypes.UpdateReferenceInput;
  UpdateSpaceAboutInput: SchemaTypes.UpdateSpaceAboutInput;
  UpdateSpaceInput: SchemaTypes.UpdateSpaceInput;
  UpdateSpacePlatformSettingsInput: SchemaTypes.UpdateSpacePlatformSettingsInput;
  UpdateSpaceSettingsCollaborationInput: SchemaTypes.UpdateSpaceSettingsCollaborationInput;
  UpdateSpaceSettingsEntityInput: SchemaTypes.UpdateSpaceSettingsEntityInput;
  UpdateSpaceSettingsInput: SchemaTypes.UpdateSpaceSettingsInput;
  UpdateSpaceSettingsLayoutInput: SchemaTypes.UpdateSpaceSettingsLayoutInput;
  UpdateSpaceSettingsMembershipInput: SchemaTypes.UpdateSpaceSettingsMembershipInput;
  UpdateSpaceSettingsPrivacyInput: SchemaTypes.UpdateSpaceSettingsPrivacyInput;
  UpdateSubspacePinnedInput: SchemaTypes.UpdateSubspacePinnedInput;
  UpdateSubspacesSortOrderInput: SchemaTypes.UpdateSubspacesSortOrderInput;
  UpdateTagsetInput: SchemaTypes.UpdateTagsetInput;
  UpdateTaskColumnOnCalloutInput: SchemaTypes.UpdateTaskColumnOnCalloutInput;
  UpdateTaskColumnsSortOrderOnCalloutInput: SchemaTypes.UpdateTaskColumnsSortOrderOnCalloutInput;
  UpdateTemplateContentSpaceInput: SchemaTypes.UpdateTemplateContentSpaceInput;
  UpdateTemplateDefaultTemplateInput: SchemaTypes.UpdateTemplateDefaultTemplateInput;
  UpdateTemplateFromSpaceInput: SchemaTypes.UpdateTemplateFromSpaceInput;
  UpdateTemplateInput: SchemaTypes.UpdateTemplateInput;
  UpdateUserGroupInput: SchemaTypes.UpdateUserGroupInput;
  UpdateUserInput: SchemaTypes.UpdateUserInput;
  UpdateUserPlatformSettingsInput: SchemaTypes.UpdateUserPlatformSettingsInput;
  UpdateUserSettingsAssistantInput: SchemaTypes.UpdateUserSettingsAssistantInput;
  UpdateUserSettingsCommunicationInput: SchemaTypes.UpdateUserSettingsCommunicationInput;
  UpdateUserSettingsDashboardInput: SchemaTypes.UpdateUserSettingsDashboardInput;
  UpdateUserSettingsEntityInput: SchemaTypes.UpdateUserSettingsEntityInput;
  UpdateUserSettingsHomeSpaceInput: SchemaTypes.UpdateUserSettingsHomeSpaceInput;
  UpdateUserSettingsInput: SchemaTypes.UpdateUserSettingsInput;
  UpdateUserSettingsNotificationInput: SchemaTypes.UpdateUserSettingsNotificationInput;
  UpdateUserSettingsNotificationOrganizationInput: SchemaTypes.UpdateUserSettingsNotificationOrganizationInput;
  UpdateUserSettingsNotificationPlatformAdminInput: SchemaTypes.UpdateUserSettingsNotificationPlatformAdminInput;
  UpdateUserSettingsNotificationPlatformInput: SchemaTypes.UpdateUserSettingsNotificationPlatformInput;
  UpdateUserSettingsNotificationSoundInput: SchemaTypes.UpdateUserSettingsNotificationSoundInput;
  UpdateUserSettingsNotificationSpaceAdminInput: SchemaTypes.UpdateUserSettingsNotificationSpaceAdminInput;
  UpdateUserSettingsNotificationSpaceInput: SchemaTypes.UpdateUserSettingsNotificationSpaceInput;
  UpdateUserSettingsNotificationUserInput: SchemaTypes.UpdateUserSettingsNotificationUserInput;
  UpdateUserSettingsNotificationUserMembershipInput: SchemaTypes.UpdateUserSettingsNotificationUserMembershipInput;
  UpdateUserSettingsNotificationVirtualContributorInput: SchemaTypes.UpdateUserSettingsNotificationVirtualContributorInput;
  UpdateUserSettingsPrivacyInput: SchemaTypes.UpdateUserSettingsPrivacyInput;
  UpdateVirtualContributorInput: SchemaTypes.UpdateVirtualContributorInput;
  UpdateVirtualContributorPlatformSettingsEntityInput: SchemaTypes.UpdateVirtualContributorPlatformSettingsEntityInput;
  UpdateVirtualContributorPlatformSettingsInput: SchemaTypes.UpdateVirtualContributorPlatformSettingsInput;
  UpdateVirtualContributorSettingsEntityInput: SchemaTypes.UpdateVirtualContributorSettingsEntityInput;
  UpdateVirtualContributorSettingsInput: SchemaTypes.UpdateVirtualContributorSettingsInput;
  UpdateVirtualContributorSettingsPrivacyInput: SchemaTypes.UpdateVirtualContributorSettingsPrivacyInput;
  UpdateVisualInput: SchemaTypes.UpdateVisualInput;
  UpdateWhiteboardEntityInput: SchemaTypes.UpdateWhiteboardEntityInput;
  UpdateWhiteboardGuestAccessInput: SchemaTypes.UpdateWhiteboardGuestAccessInput;
  UpdateWhiteboardGuestAccessResult: ResolverTypeWrapper<SchemaTypes.UpdateWhiteboardGuestAccessResult>;
  UpdateWhiteboardPreviewSettingsInput: SchemaTypes.UpdateWhiteboardPreviewSettingsInput;
  Upload: ResolverTypeWrapper<SchemaTypes.Scalars['Upload']>;
  UrlResolverQueryClosestAncestor: ResolverTypeWrapper<SchemaTypes.UrlResolverQueryClosestAncestor>;
  UrlResolverQueryResultCalendar: ResolverTypeWrapper<SchemaTypes.UrlResolverQueryResultCalendar>;
  UrlResolverQueryResultCalloutsSet: ResolverTypeWrapper<SchemaTypes.UrlResolverQueryResultCalloutsSet>;
  UrlResolverQueryResultCollaboration: ResolverTypeWrapper<SchemaTypes.UrlResolverQueryResultCollaboration>;
  UrlResolverQueryResultInnovationPack: ResolverTypeWrapper<SchemaTypes.UrlResolverQueryResultInnovationPack>;
  UrlResolverQueryResultSpace: ResolverTypeWrapper<SchemaTypes.UrlResolverQueryResultSpace>;
  UrlResolverQueryResultTemplatesSet: ResolverTypeWrapper<SchemaTypes.UrlResolverQueryResultTemplatesSet>;
  UrlResolverQueryResultVirtualContributor: ResolverTypeWrapper<SchemaTypes.UrlResolverQueryResultVirtualContributor>;
  UrlResolverQueryResults: ResolverTypeWrapper<SchemaTypes.UrlResolverQueryResults>;
  UrlResolverResultState: SchemaTypes.UrlResolverResultState;
  UrlType: SchemaTypes.UrlType;
  User: ResolverTypeWrapper<SchemaTypes.User>;
  UserAuthenticationResult: ResolverTypeWrapper<SchemaTypes.UserAuthenticationResult>;
  UserAuthorizationResetInput: SchemaTypes.UserAuthorizationResetInput;
  UserEmailChangeAuditEntries: ResolverTypeWrapper<SchemaTypes.UserEmailChangeAuditEntries>;
  UserEmailChangeAuditEntriesPageInfo: ResolverTypeWrapper<SchemaTypes.UserEmailChangeAuditEntriesPageInfo>;
  UserEmailChangeAuditEntry: ResolverTypeWrapper<SchemaTypes.UserEmailChangeAuditEntry>;
  UserEmailChangeAuditOutcome: SchemaTypes.UserEmailChangeAuditOutcome;
  UserEmailChangeInitiatorRole: SchemaTypes.UserEmailChangeInitiatorRole;
  UserEmailChangeResult: ResolverTypeWrapper<SchemaTypes.UserEmailChangeResult>;
  UserFilterInput: SchemaTypes.UserFilterInput;
  UserGroup: ResolverTypeWrapper<SchemaTypes.UserGroup>;
  UserInformationVisibility: SchemaTypes.UserInformationVisibility;
  UserProfileSummary: ResolverTypeWrapper<SchemaTypes.UserProfileSummary>;
  UserSettings: ResolverTypeWrapper<SchemaTypes.UserSettings>;
  UserSettingsAssistant: ResolverTypeWrapper<SchemaTypes.UserSettingsAssistant>;
  UserSettingsCommunication: ResolverTypeWrapper<SchemaTypes.UserSettingsCommunication>;
  UserSettingsDashboard: ResolverTypeWrapper<SchemaTypes.UserSettingsDashboard>;
  UserSettingsHomeSpace: ResolverTypeWrapper<SchemaTypes.UserSettingsHomeSpace>;
  UserSettingsNotification: ResolverTypeWrapper<SchemaTypes.UserSettingsNotification>;
  UserSettingsNotificationChannels: ResolverTypeWrapper<SchemaTypes.UserSettingsNotificationChannels>;
  UserSettingsNotificationOrganization: ResolverTypeWrapper<SchemaTypes.UserSettingsNotificationOrganization>;
  UserSettingsNotificationPlatform: ResolverTypeWrapper<SchemaTypes.UserSettingsNotificationPlatform>;
  UserSettingsNotificationPlatformAdmin: ResolverTypeWrapper<SchemaTypes.UserSettingsNotificationPlatformAdmin>;
  UserSettingsNotificationSound: ResolverTypeWrapper<SchemaTypes.UserSettingsNotificationSound>;
  UserSettingsNotificationSpace: ResolverTypeWrapper<SchemaTypes.UserSettingsNotificationSpace>;
  UserSettingsNotificationSpaceAdmin: ResolverTypeWrapper<SchemaTypes.UserSettingsNotificationSpaceAdmin>;
  UserSettingsNotificationUser: ResolverTypeWrapper<SchemaTypes.UserSettingsNotificationUser>;
  UserSettingsNotificationUserMembership: ResolverTypeWrapper<SchemaTypes.UserSettingsNotificationUserMembership>;
  UserSettingsNotificationVirtualContributor: ResolverTypeWrapper<SchemaTypes.UserSettingsNotificationVirtualContributor>;
  UserSettingsPrivacy: ResolverTypeWrapper<SchemaTypes.UserSettingsPrivacy>;
  UsersInRolesResponse: ResolverTypeWrapper<SchemaTypes.UsersInRolesResponse>;
  UsersWithAuthorizationCredentialInput: SchemaTypes.UsersWithAuthorizationCredentialInput;
  VcInteraction: ResolverTypeWrapper<SchemaTypes.VcInteraction>;
  VirtualAssistant: ResolverTypeWrapper<SchemaTypes.VirtualAssistant>;
  VirtualContributor: ResolverTypeWrapper<SchemaTypes.VirtualContributor>;
  VirtualContributorBodyOfKnowledgeType: SchemaTypes.VirtualContributorBodyOfKnowledgeType;
  VirtualContributorDataAccessMode: SchemaTypes.VirtualContributorDataAccessMode;
  VirtualContributorInteractionMode: SchemaTypes.VirtualContributorInteractionMode;
  VirtualContributorModelCard: ResolverTypeWrapper<SchemaTypes.VirtualContributorModelCard>;
  VirtualContributorModelCardEntry: SchemaTypes.VirtualContributorModelCardEntry;
  VirtualContributorModelCardEntryFlagName: SchemaTypes.VirtualContributorModelCardEntryFlagName;
  VirtualContributorModelCardFlag: ResolverTypeWrapper<SchemaTypes.VirtualContributorModelCardFlag>;
  VirtualContributorPlatformSettings: ResolverTypeWrapper<SchemaTypes.VirtualContributorPlatformSettings>;
  VirtualContributorSettings: ResolverTypeWrapper<SchemaTypes.VirtualContributorSettings>;
  VirtualContributorSettingsPrivacy: ResolverTypeWrapper<SchemaTypes.VirtualContributorSettingsPrivacy>;
  VirtualContributorStatus: SchemaTypes.VirtualContributorStatus;
  VirtualContributorUpdatedSubscriptionResult: ResolverTypeWrapper<SchemaTypes.VirtualContributorUpdatedSubscriptionResult>;
  VirtualContributorWellKnown: SchemaTypes.VirtualContributorWellKnown;
  VirtualContributorsInRolesResponse: ResolverTypeWrapper<SchemaTypes.VirtualContributorsInRolesResponse>;
  Visual: ResolverTypeWrapper<SchemaTypes.Visual>;
  VisualConstraints: ResolverTypeWrapper<SchemaTypes.VisualConstraints>;
  VisualType: SchemaTypes.VisualType;
  VisualUploadImageInput: SchemaTypes.VisualUploadImageInput;
  Whiteboard: ResolverTypeWrapper<SchemaTypes.Whiteboard>;
  WhiteboardPreviewCoordinates: ResolverTypeWrapper<SchemaTypes.WhiteboardPreviewCoordinates>;
  WhiteboardPreviewCoordinatesData: ResolverTypeWrapper<SchemaTypes.WhiteboardPreviewCoordinatesData>;
  WhiteboardPreviewCoordinatesInput: SchemaTypes.WhiteboardPreviewCoordinatesInput;
  WhiteboardPreviewMode: SchemaTypes.WhiteboardPreviewMode;
  WhiteboardPreviewSettings: ResolverTypeWrapper<SchemaTypes.WhiteboardPreviewSettings>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  APM: SchemaTypes.Apm;
  Account: SchemaTypes.Account;
  AccountAuthorizationResetInput: SchemaTypes.AccountAuthorizationResetInput;
  AccountLicensePlan: SchemaTypes.AccountLicensePlan;
  AccountLicenseResetInput: SchemaTypes.AccountLicenseResetInput;
  AccountSubscription: SchemaTypes.AccountSubscription;
  ActivityCreatedSubscriptionInput: SchemaTypes.ActivityCreatedSubscriptionInput;
  ActivityCreatedSubscriptionResult: SchemaTypes.ActivityCreatedSubscriptionResult;
  ActivityFeed: SchemaTypes.ActivityFeed;
  ActivityFeedGroupedQueryArgs: SchemaTypes.ActivityFeedGroupedQueryArgs;
  ActivityFeedQueryArgs: SchemaTypes.ActivityFeedQueryArgs;
  ActivityLogEntry:
    | ResolversParentTypes['ActivityLogEntryCalendarEventCreated']
    | ResolversParentTypes['ActivityLogEntryCalloutDiscussionComment']
    | ResolversParentTypes['ActivityLogEntryCalloutLinkCreated']
    | ResolversParentTypes['ActivityLogEntryCalloutMemoCreated']
    | ResolversParentTypes['ActivityLogEntryCalloutPostComment']
    | ResolversParentTypes['ActivityLogEntryCalloutPostCreated']
    | ResolversParentTypes['ActivityLogEntryCalloutPublished']
    | ResolversParentTypes['ActivityLogEntryCalloutWhiteboardContentModified']
    | ResolversParentTypes['ActivityLogEntryCalloutWhiteboardCreated']
    | ResolversParentTypes['ActivityLogEntryMemberJoined']
    | ResolversParentTypes['ActivityLogEntrySubspaceCreated']
    | ResolversParentTypes['ActivityLogEntryUpdateSent'];
  ActivityLogEntryCalendarEventCreated: SchemaTypes.ActivityLogEntryCalendarEventCreated;
  ActivityLogEntryCalloutDiscussionComment: SchemaTypes.ActivityLogEntryCalloutDiscussionComment;
  ActivityLogEntryCalloutLinkCreated: SchemaTypes.ActivityLogEntryCalloutLinkCreated;
  ActivityLogEntryCalloutMemoCreated: SchemaTypes.ActivityLogEntryCalloutMemoCreated;
  ActivityLogEntryCalloutPostComment: SchemaTypes.ActivityLogEntryCalloutPostComment;
  ActivityLogEntryCalloutPostCreated: SchemaTypes.ActivityLogEntryCalloutPostCreated;
  ActivityLogEntryCalloutPublished: SchemaTypes.ActivityLogEntryCalloutPublished;
  ActivityLogEntryCalloutWhiteboardContentModified: SchemaTypes.ActivityLogEntryCalloutWhiteboardContentModified;
  ActivityLogEntryCalloutWhiteboardCreated: SchemaTypes.ActivityLogEntryCalloutWhiteboardCreated;
  ActivityLogEntryMemberJoined: SchemaTypes.ActivityLogEntryMemberJoined;
  ActivityLogEntrySubspaceCreated: SchemaTypes.ActivityLogEntrySubspaceCreated;
  ActivityLogEntryUpdateSent: SchemaTypes.ActivityLogEntryUpdateSent;
  ActivityLogInput: SchemaTypes.ActivityLogInput;
  Actor: SchemaTypes.Actor;
  ActorFilterInput: SchemaTypes.ActorFilterInput;
  ActorFull:
    | ResolversParentTypes['Account']
    | ResolversParentTypes['Organization']
    | ResolversParentTypes['RelayPaginatedSpace']
    | ResolversParentTypes['Space']
    | ResolversParentTypes['User']
    | ResolversParentTypes['VirtualAssistant']
    | ResolversParentTypes['VirtualContributor'];
  ActorRolePolicy: SchemaTypes.ActorRolePolicy;
  ActorRoles: SchemaTypes.ActorRoles;
  AddClassificationEntryFromTemplateInput: SchemaTypes.AddClassificationEntryFromTemplateInput;
  AddPollOptionInput: SchemaTypes.AddPollOptionInput;
  AddReactionToCalloutInput: SchemaTypes.AddReactionToCalloutInput;
  AddVisualToMediaGalleryInput: SchemaTypes.AddVisualToMediaGalleryInput;
  AdminRevokeMcpApiKeyInput: SchemaTypes.AdminRevokeMcpApiKeyInput;
  AdminUserEmailChangeDriftResolveInput: SchemaTypes.AdminUserEmailChangeDriftResolveInput;
  AdminUserEmailChangeInput: SchemaTypes.AdminUserEmailChangeInput;
  AiPersona: SchemaTypes.AiPersona;
  AiServer: SchemaTypes.AiServer;
  Application: SchemaTypes.Application;
  ApplicationEventInput: SchemaTypes.ApplicationEventInput;
  ApplyForEntryRoleOnRoleSetInput: SchemaTypes.ApplyForEntryRoleOnRoleSetInput;
  AssignConversationMemberInput: SchemaTypes.AssignConversationMemberInput;
  AssignLicensePlanToAccount: SchemaTypes.AssignLicensePlanToAccount;
  AssignLicensePlanToSpace: SchemaTypes.AssignLicensePlanToSpace;
  AssignPlatformRoleInput: SchemaTypes.AssignPlatformRoleInput;
  AssignRoleOnRoleSetInput: SchemaTypes.AssignRoleOnRoleSetInput;
  AssignUserGroupMemberInput: SchemaTypes.AssignUserGroupMemberInput;
  AssistantCapability: SchemaTypes.AssistantCapability;
  AssistantCapabilityToggle: SchemaTypes.AssistantCapabilityToggle;
  AssistantCapabilityToggleInput: SchemaTypes.AssistantCapabilityToggleInput;
  AuthenticationConfig: SchemaTypes.AuthenticationConfig;
  AuthenticationProviderConfig: Omit<
    SchemaTypes.AuthenticationProviderConfig,
    'config'
  > & { config: ResolversParentTypes['AuthenticationProviderConfigUnion'] };
  AuthenticationProviderConfigUnion: ResolversParentTypes['OryConfig'];
  Authorization: SchemaTypes.Authorization;
  AuthorizationPolicyRuleCredential: SchemaTypes.AuthorizationPolicyRuleCredential;
  AuthorizationPolicyRulePrivilege: SchemaTypes.AuthorizationPolicyRulePrivilege;
  Boolean: SchemaTypes.Scalars['Boolean'];
  Calendar: SchemaTypes.Calendar;
  CalendarEvent: SchemaTypes.CalendarEvent;
  Callout: SchemaTypes.Callout;
  CalloutContribution: SchemaTypes.CalloutContribution;
  CalloutContributionDefaults: SchemaTypes.CalloutContributionDefaults;
  CalloutContributionsCountOutput: SchemaTypes.CalloutContributionsCountOutput;
  CalloutContributorsMapView: SchemaTypes.CalloutContributorsMapView;
  CalloutContributorsSettings: SchemaTypes.CalloutContributorsSettings;
  CalloutFraming: SchemaTypes.CalloutFraming;
  CalloutPostCreated: SchemaTypes.CalloutPostCreated;
  CalloutReaction: SchemaTypes.CalloutReaction;
  CalloutReactionsSummary: SchemaTypes.CalloutReactionsSummary;
  CalloutSelectionSettings: SchemaTypes.CalloutSelectionSettings;
  CalloutSettings: SchemaTypes.CalloutSettings;
  CalloutSettingsContribution: SchemaTypes.CalloutSettingsContribution;
  CalloutSettingsFraming: SchemaTypes.CalloutSettingsFraming;
  CalloutsSet: SchemaTypes.CalloutsSet;
  CastPollVoteInput: SchemaTypes.CastPollVoteInput;
  Classification: SchemaTypes.Classification;
  ClassificationEntry: SchemaTypes.ClassificationEntry;
  ClassificationTemplateContent: SchemaTypes.ClassificationTemplateContent;
  ClassificationValue: SchemaTypes.ClassificationValue;
  CollaboraDocument: SchemaTypes.CollaboraDocument;
  CollaboraEditorUrlResult: SchemaTypes.CollaboraEditorUrlResult;
  Collaboration: SchemaTypes.Collaboration;
  CollaborationMigrationIssue: SchemaTypes.CollaborationMigrationIssue;
  CollaborationMigrationResult: SchemaTypes.CollaborationMigrationResult;
  Communication: SchemaTypes.Communication;
  CommunicationAdminEnsureAccessInput: SchemaTypes.CommunicationAdminEnsureAccessInput;
  CommunicationAdminMembershipInput: SchemaTypes.CommunicationAdminMembershipInput;
  CommunicationAdminMembershipResult: SchemaTypes.CommunicationAdminMembershipResult;
  CommunicationAdminMigrateRoomsResult: SchemaTypes.CommunicationAdminMigrateRoomsResult;
  CommunicationAdminOrphanedUsageResult: SchemaTypes.CommunicationAdminOrphanedUsageResult;
  CommunicationAdminRemoveOrphanedRoomInput: SchemaTypes.CommunicationAdminRemoveOrphanedRoomInput;
  CommunicationAdminRoomMembershipResult: SchemaTypes.CommunicationAdminRoomMembershipResult;
  CommunicationAdminRoomResult: SchemaTypes.CommunicationAdminRoomResult;
  CommunicationAdminUpdateRoomStateInput: SchemaTypes.CommunicationAdminUpdateRoomStateInput;
  CommunicationSendMessageToCommunityLeadsInput: SchemaTypes.CommunicationSendMessageToCommunityLeadsInput;
  CommunicationSendMessageToOrganizationInput: SchemaTypes.CommunicationSendMessageToOrganizationInput;
  CommunicationSendMessageToUsersInput: SchemaTypes.CommunicationSendMessageToUsersInput;
  Community: SchemaTypes.Community;
  CommunityApplicationForRoleResult: SchemaTypes.CommunityApplicationForRoleResult;
  CommunityApplicationResult: SchemaTypes.CommunityApplicationResult;
  CommunityGuidelines: SchemaTypes.CommunityGuidelines;
  CommunityInvitationForRoleResult: SchemaTypes.CommunityInvitationForRoleResult;
  CommunityInvitationResult: SchemaTypes.CommunityInvitationResult;
  CommunityMembershipResult: SchemaTypes.CommunityMembershipResult;
  Config: SchemaTypes.Config;
  ContributionsFilterInput: SchemaTypes.ContributionsFilterInput;
  ContributorCollectionCounts: SchemaTypes.ContributorCollectionCounts;
  ContributorCollectionItem: SchemaTypes.ContributorCollectionItem;
  ContributorFilterInput: SchemaTypes.ContributorFilterInput;
  ContributorLocation: SchemaTypes.ContributorLocation;
  Conversation: SchemaTypes.Conversation;
  ConversationCreatedEvent: SchemaTypes.ConversationCreatedEvent;
  ConversationDeletedEvent: SchemaTypes.ConversationDeletedEvent;
  ConversationEventSubscriptionResult: SchemaTypes.ConversationEventSubscriptionResult;
  ConversationMemberAddedEvent: SchemaTypes.ConversationMemberAddedEvent;
  ConversationMemberRemovedEvent: SchemaTypes.ConversationMemberRemovedEvent;
  ConversationMessageReceivedEvent: SchemaTypes.ConversationMessageReceivedEvent;
  ConversationMessageRemovedEvent: SchemaTypes.ConversationMessageRemovedEvent;
  ConversationReadReceiptUpdatedEvent: SchemaTypes.ConversationReadReceiptUpdatedEvent;
  ConversationUpdatedEvent: SchemaTypes.ConversationUpdatedEvent;
  ConversationVcResetInput: SchemaTypes.ConversationVcResetInput;
  ConversionVcSpaceToVcKnowledgeBaseInput: SchemaTypes.ConversionVcSpaceToVcKnowledgeBaseInput;
  ConvertSpaceL1ToSpaceL0Input: SchemaTypes.ConvertSpaceL1ToSpaceL0Input;
  ConvertSpaceL1ToSpaceL2Input: SchemaTypes.ConvertSpaceL1ToSpaceL2Input;
  ConvertSpaceL2ToSpaceL1Input: SchemaTypes.ConvertSpaceL2ToSpaceL1Input;
  CreateAiPersonaInput: SchemaTypes.CreateAiPersonaInput;
  CreateCalendarEventOnCalendarInput: SchemaTypes.CreateCalendarEventOnCalendarInput;
  CreateCalloutContributionData: SchemaTypes.CreateCalloutContributionData;
  CreateCalloutContributionDefaultsData: SchemaTypes.CreateCalloutContributionDefaultsData;
  CreateCalloutContributionDefaultsInput: SchemaTypes.CreateCalloutContributionDefaultsInput;
  CreateCalloutContributionInput: SchemaTypes.CreateCalloutContributionInput;
  CreateCalloutContributorsMapViewData: SchemaTypes.CreateCalloutContributorsMapViewData;
  CreateCalloutContributorsMapViewInput: SchemaTypes.CreateCalloutContributorsMapViewInput;
  CreateCalloutContributorsSettingsData: SchemaTypes.CreateCalloutContributorsSettingsData;
  CreateCalloutContributorsSettingsInput: SchemaTypes.CreateCalloutContributorsSettingsInput;
  CreateCalloutData: SchemaTypes.CreateCalloutData;
  CreateCalloutFramingData: SchemaTypes.CreateCalloutFramingData;
  CreateCalloutFramingInput: SchemaTypes.CreateCalloutFramingInput;
  CreateCalloutInput: SchemaTypes.CreateCalloutInput;
  CreateCalloutOnCalloutsSetInput: SchemaTypes.CreateCalloutOnCalloutsSetInput;
  CreateCalloutSelectionSettingsData: SchemaTypes.CreateCalloutSelectionSettingsData;
  CreateCalloutSelectionSettingsInput: SchemaTypes.CreateCalloutSelectionSettingsInput;
  CreateCalloutSettingsContributionData: SchemaTypes.CreateCalloutSettingsContributionData;
  CreateCalloutSettingsContributionInput: SchemaTypes.CreateCalloutSettingsContributionInput;
  CreateCalloutSettingsData: SchemaTypes.CreateCalloutSettingsData;
  CreateCalloutSettingsFramingData: SchemaTypes.CreateCalloutSettingsFramingData;
  CreateCalloutSettingsFramingInput: SchemaTypes.CreateCalloutSettingsFramingInput;
  CreateCalloutSettingsInput: SchemaTypes.CreateCalloutSettingsInput;
  CreateCalloutTaskBoardData: SchemaTypes.CreateCalloutTaskBoardData;
  CreateCalloutTaskBoardInput: SchemaTypes.CreateCalloutTaskBoardInput;
  CreateCalloutsSetData: SchemaTypes.CreateCalloutsSetData;
  CreateCalloutsSetInput: SchemaTypes.CreateCalloutsSetInput;
  CreateClassificationData: SchemaTypes.CreateClassificationData;
  CreateClassificationEntryInput: SchemaTypes.CreateClassificationEntryInput;
  CreateClassificationInput: SchemaTypes.CreateClassificationInput;
  CreateClassificationTemplateContentInput: SchemaTypes.CreateClassificationTemplateContentInput;
  CreateClassificationValueInput: SchemaTypes.CreateClassificationValueInput;
  CreateCollaboraDocumentData: SchemaTypes.CreateCollaboraDocumentData;
  CreateCollaboraDocumentInput: SchemaTypes.CreateCollaboraDocumentInput;
  CreateCollaborationData: SchemaTypes.CreateCollaborationData;
  CreateCollaborationInput: SchemaTypes.CreateCollaborationInput;
  CreateCollaborationOnSpaceInput: SchemaTypes.CreateCollaborationOnSpaceInput;
  CreateCommunityGuidelinesData: SchemaTypes.CreateCommunityGuidelinesData;
  CreateCommunityGuidelinesInput: SchemaTypes.CreateCommunityGuidelinesInput;
  CreateContributionOnCalloutInput: SchemaTypes.CreateContributionOnCalloutInput;
  CreateConversationInput: SchemaTypes.CreateConversationInput;
  CreateInnovationFlowData: SchemaTypes.CreateInnovationFlowData;
  CreateInnovationFlowInput: SchemaTypes.CreateInnovationFlowInput;
  CreateInnovationFlowStateData: SchemaTypes.CreateInnovationFlowStateData;
  CreateInnovationFlowStateInput: SchemaTypes.CreateInnovationFlowStateInput;
  CreateInnovationFlowStateSettingsData: SchemaTypes.CreateInnovationFlowStateSettingsData;
  CreateInnovationFlowStateSettingsInput: SchemaTypes.CreateInnovationFlowStateSettingsInput;
  CreateInnovationHubOnAccountInput: SchemaTypes.CreateInnovationHubOnAccountInput;
  CreateInnovationPackOnAccountInput: SchemaTypes.CreateInnovationPackOnAccountInput;
  CreateKnowledgeBaseInput: SchemaTypes.CreateKnowledgeBaseInput;
  CreateLicensePlanOnLicensingFrameworkInput: SchemaTypes.CreateLicensePlanOnLicensingFrameworkInput;
  CreateLicensePolicyCredentialRuleInput: SchemaTypes.CreateLicensePolicyCredentialRuleInput;
  CreateLinkData: SchemaTypes.CreateLinkData;
  CreateLinkInput: SchemaTypes.CreateLinkInput;
  CreateLocationData: SchemaTypes.CreateLocationData;
  CreateLocationInput: SchemaTypes.CreateLocationInput;
  CreateMemoData: SchemaTypes.CreateMemoData;
  CreateMemoInput: SchemaTypes.CreateMemoInput;
  CreateNVPInput: SchemaTypes.CreateNvpInput;
  CreateOrganizationInput: SchemaTypes.CreateOrganizationInput;
  CreatePollData: SchemaTypes.CreatePollData;
  CreatePollInput: SchemaTypes.CreatePollInput;
  CreatePostData: SchemaTypes.CreatePostData;
  CreatePostInput: SchemaTypes.CreatePostInput;
  CreateProfileData: SchemaTypes.CreateProfileData;
  CreateProfileInput: SchemaTypes.CreateProfileInput;
  CreateReferenceData: SchemaTypes.CreateReferenceData;
  CreateReferenceInput: SchemaTypes.CreateReferenceInput;
  CreateReferenceOnProfileInput: SchemaTypes.CreateReferenceOnProfileInput;
  CreateSpaceAboutInput: SchemaTypes.CreateSpaceAboutInput;
  CreateSpaceOnAccountInput: SchemaTypes.CreateSpaceOnAccountInput;
  CreateSpaceSettingsCollaborationInput: SchemaTypes.CreateSpaceSettingsCollaborationInput;
  CreateSpaceSettingsInput: SchemaTypes.CreateSpaceSettingsInput;
  CreateSpaceSettingsLayoutInput: SchemaTypes.CreateSpaceSettingsLayoutInput;
  CreateSpaceSettingsMembershipInput: SchemaTypes.CreateSpaceSettingsMembershipInput;
  CreateSpaceSettingsPrivacyInput: SchemaTypes.CreateSpaceSettingsPrivacyInput;
  CreateStateOnInnovationFlowInput: SchemaTypes.CreateStateOnInnovationFlowInput;
  CreateSubspaceInput: SchemaTypes.CreateSubspaceInput;
  CreateTagsetData: SchemaTypes.CreateTagsetData;
  CreateTagsetInput: SchemaTypes.CreateTagsetInput;
  CreateTagsetOnProfileInput: SchemaTypes.CreateTagsetOnProfileInput;
  CreateTaskColumnOnCalloutInput: SchemaTypes.CreateTaskColumnOnCalloutInput;
  CreateTemplateContentSpaceInput: SchemaTypes.CreateTemplateContentSpaceInput;
  CreateTemplateFromContentSpaceOnTemplatesSetInput: SchemaTypes.CreateTemplateFromContentSpaceOnTemplatesSetInput;
  CreateTemplateFromSpaceOnTemplatesSetInput: SchemaTypes.CreateTemplateFromSpaceOnTemplatesSetInput;
  CreateTemplateOnTemplatesSetInput: SchemaTypes.CreateTemplateOnTemplatesSetInput;
  CreateUserGroupInput: SchemaTypes.CreateUserGroupInput;
  CreateUserInput: SchemaTypes.CreateUserInput;
  CreateVirtualContributorOnAccountInput: SchemaTypes.CreateVirtualContributorOnAccountInput;
  CreateVisualOnProfileData: SchemaTypes.CreateVisualOnProfileData;
  CreateVisualOnProfileInput: SchemaTypes.CreateVisualOnProfileInput;
  CreateWhiteboardData: SchemaTypes.CreateWhiteboardData;
  CreateWhiteboardDraftOnCalloutsSetInput: SchemaTypes.CreateWhiteboardDraftOnCalloutsSetInput;
  CreateWhiteboardDraftOnTemplatesSetInput: SchemaTypes.CreateWhiteboardDraftOnTemplatesSetInput;
  CreateWhiteboardInput: SchemaTypes.CreateWhiteboardInput;
  CreateWhiteboardPreviewSettingsData: SchemaTypes.CreateWhiteboardPreviewSettingsData;
  CreateWhiteboardPreviewSettingsInput: SchemaTypes.CreateWhiteboardPreviewSettingsInput;
  Credential: SchemaTypes.Credential;
  CredentialDefinition: SchemaTypes.CredentialDefinition;
  DateTime: SchemaTypes.Scalars['DateTime'];
  DeleteAiPersonaInput: SchemaTypes.DeleteAiPersonaInput;
  DeleteApplicationInput: SchemaTypes.DeleteApplicationInput;
  DeleteCalendarEventInput: SchemaTypes.DeleteCalendarEventInput;
  DeleteCalloutInput: SchemaTypes.DeleteCalloutInput;
  DeleteClassificationEntryInput: SchemaTypes.DeleteClassificationEntryInput;
  DeleteCollaboraDocumentInput: SchemaTypes.DeleteCollaboraDocumentInput;
  DeleteContributionInput: SchemaTypes.DeleteContributionInput;
  DeleteConversationInput: SchemaTypes.DeleteConversationInput;
  DeleteDiscussionInput: SchemaTypes.DeleteDiscussionInput;
  DeleteDocumentInput: SchemaTypes.DeleteDocumentInput;
  DeleteInnovationHubInput: SchemaTypes.DeleteInnovationHubInput;
  DeleteInnovationPackInput: SchemaTypes.DeleteInnovationPackInput;
  DeleteInvitationInput: SchemaTypes.DeleteInvitationInput;
  DeleteLicensePlanInput: SchemaTypes.DeleteLicensePlanInput;
  DeleteLicensePolicyCredentialRuleInput: SchemaTypes.DeleteLicensePolicyCredentialRuleInput;
  DeleteLinkInput: SchemaTypes.DeleteLinkInput;
  DeleteMemoInput: SchemaTypes.DeleteMemoInput;
  DeleteOrganizationInput: SchemaTypes.DeleteOrganizationInput;
  DeletePlatformInvitationInput: SchemaTypes.DeletePlatformInvitationInput;
  DeletePostInput: SchemaTypes.DeletePostInput;
  DeleteReferenceInput: SchemaTypes.DeleteReferenceInput;
  DeleteSpaceInput: SchemaTypes.DeleteSpaceInput;
  DeleteStateOnInnovationFlowInput: SchemaTypes.DeleteStateOnInnovationFlowInput;
  DeleteStorageBuckeetInput: SchemaTypes.DeleteStorageBuckeetInput;
  DeleteTaskColumnOnCalloutInput: SchemaTypes.DeleteTaskColumnOnCalloutInput;
  DeleteTemplateInput: SchemaTypes.DeleteTemplateInput;
  DeleteUserGroupInput: SchemaTypes.DeleteUserGroupInput;
  DeleteUserInput: SchemaTypes.DeleteUserInput;
  DeleteVirtualContributorInput: SchemaTypes.DeleteVirtualContributorInput;
  DeleteVisualFromMediaGalleryInput: SchemaTypes.DeleteVisualFromMediaGalleryInput;
  DeleteWhiteboardInput: SchemaTypes.DeleteWhiteboardInput;
  DirectMessageDeliveryResult: SchemaTypes.DirectMessageDeliveryResult;
  Discussion: SchemaTypes.Discussion;
  DiscussionDetails: SchemaTypes.DiscussionDetails;
  DiscussionsInput: SchemaTypes.DiscussionsInput;
  Document: SchemaTypes.Document;
  EmailChangeApprover: SchemaTypes.EmailChangeApprover;
  EmailChangeApproverInput: SchemaTypes.EmailChangeApproverInput;
  Emoji: SchemaTypes.Scalars['Emoji'];
  ExploreSpacesInput: SchemaTypes.ExploreSpacesInput;
  ExternalConfig: SchemaTypes.ExternalConfig;
  ExternalConfigInput: SchemaTypes.ExternalConfigInput;
  FileStorageConfig: SchemaTypes.FileStorageConfig;
  Float: SchemaTypes.Scalars['Float'];
  Form: SchemaTypes.Form;
  FormQuestion: SchemaTypes.FormQuestion;
  Forum: SchemaTypes.Forum;
  ForumCreateDiscussionInput: SchemaTypes.ForumCreateDiscussionInput;
  Geo: SchemaTypes.Geo;
  GeoLocation: SchemaTypes.GeoLocation;
  GrantAssistantActorCapabilitiesInput: SchemaTypes.GrantAssistantActorCapabilitiesInput;
  GrantAuthorizationCredentialInput: SchemaTypes.GrantAuthorizationCredentialInput;
  GrantOrganizationAuthorizationCredentialInput: SchemaTypes.GrantOrganizationAuthorizationCredentialInput;
  Groupable:
    | ResolversParentTypes['Community']
    | ResolversParentTypes['Organization'];
  ID: SchemaTypes.Scalars['ID'];
  ISearchCategoryResult: SchemaTypes.ISearchCategoryResult;
  ISearchResults: SchemaTypes.ISearchResults;
  ImportCollaboraDocumentInput: SchemaTypes.ImportCollaboraDocumentInput;
  InAppNotification: SchemaTypes.InAppNotification;
  InAppNotificationPayload:
    | ResolversParentTypes['InAppNotificationPayloadOrganizationMessageDirect']
    | ResolversParentTypes['InAppNotificationPayloadOrganizationMessageRoom']
    | ResolversParentTypes['InAppNotificationPayloadPlatformForumDiscussion']
    | ResolversParentTypes['InAppNotificationPayloadPlatformGlobalRoleChange']
    | ResolversParentTypes['InAppNotificationPayloadPlatformUser']
    | ResolversParentTypes['InAppNotificationPayloadPlatformUserMessageRoom']
    | ResolversParentTypes['InAppNotificationPayloadPlatformUserProfileRemoved']
    | ResolversParentTypes['InAppNotificationPayloadSpace']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCallout']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCalloutComment']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCalloutPostComment']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCalloutReaction']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationPoll']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCommunicationMessageDirect']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCommunicationUpdate']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCommunityActor']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCommunityApplication']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCommunityCalendarEvent']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCommunityCalendarEventComment']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCommunityInvitation']
    | ResolversParentTypes['InAppNotificationPayloadSpaceCommunityInvitationPlatform']
    | ResolversParentTypes['InAppNotificationPayloadUserMessageDirect']
    | ResolversParentTypes['InAppNotificationPayloadVirtualContributor'];
  InAppNotificationPayloadOrganizationMessageDirect: SchemaTypes.InAppNotificationPayloadOrganizationMessageDirect;
  InAppNotificationPayloadOrganizationMessageRoom: SchemaTypes.InAppNotificationPayloadOrganizationMessageRoom;
  InAppNotificationPayloadPlatformForumDiscussion: SchemaTypes.InAppNotificationPayloadPlatformForumDiscussion;
  InAppNotificationPayloadPlatformGlobalRoleChange: SchemaTypes.InAppNotificationPayloadPlatformGlobalRoleChange;
  InAppNotificationPayloadPlatformUser: SchemaTypes.InAppNotificationPayloadPlatformUser;
  InAppNotificationPayloadPlatformUserMessageRoom: SchemaTypes.InAppNotificationPayloadPlatformUserMessageRoom;
  InAppNotificationPayloadPlatformUserProfileRemoved: SchemaTypes.InAppNotificationPayloadPlatformUserProfileRemoved;
  InAppNotificationPayloadSpace: SchemaTypes.InAppNotificationPayloadSpace;
  InAppNotificationPayloadSpaceCollaborationCallout: SchemaTypes.InAppNotificationPayloadSpaceCollaborationCallout;
  InAppNotificationPayloadSpaceCollaborationCalloutComment: SchemaTypes.InAppNotificationPayloadSpaceCollaborationCalloutComment;
  InAppNotificationPayloadSpaceCollaborationCalloutPostComment: SchemaTypes.InAppNotificationPayloadSpaceCollaborationCalloutPostComment;
  InAppNotificationPayloadSpaceCollaborationCalloutReaction: SchemaTypes.InAppNotificationPayloadSpaceCollaborationCalloutReaction;
  InAppNotificationPayloadSpaceCollaborationPoll: SchemaTypes.InAppNotificationPayloadSpaceCollaborationPoll;
  InAppNotificationPayloadSpaceCommunicationMessageDirect: SchemaTypes.InAppNotificationPayloadSpaceCommunicationMessageDirect;
  InAppNotificationPayloadSpaceCommunicationUpdate: SchemaTypes.InAppNotificationPayloadSpaceCommunicationUpdate;
  InAppNotificationPayloadSpaceCommunityActor: SchemaTypes.InAppNotificationPayloadSpaceCommunityActor;
  InAppNotificationPayloadSpaceCommunityApplication: SchemaTypes.InAppNotificationPayloadSpaceCommunityApplication;
  InAppNotificationPayloadSpaceCommunityCalendarEvent: SchemaTypes.InAppNotificationPayloadSpaceCommunityCalendarEvent;
  InAppNotificationPayloadSpaceCommunityCalendarEventComment: SchemaTypes.InAppNotificationPayloadSpaceCommunityCalendarEventComment;
  InAppNotificationPayloadSpaceCommunityInvitation: SchemaTypes.InAppNotificationPayloadSpaceCommunityInvitation;
  InAppNotificationPayloadSpaceCommunityInvitationPlatform: SchemaTypes.InAppNotificationPayloadSpaceCommunityInvitationPlatform;
  InAppNotificationPayloadUserMessageDirect: SchemaTypes.InAppNotificationPayloadUserMessageDirect;
  InAppNotificationPayloadVirtualContributor: SchemaTypes.InAppNotificationPayloadVirtualContributor;
  InnovationFlow: SchemaTypes.InnovationFlow;
  InnovationFlowSettings: SchemaTypes.InnovationFlowSettings;
  InnovationFlowState: SchemaTypes.InnovationFlowState;
  InnovationFlowStateSettings: SchemaTypes.InnovationFlowStateSettings;
  InnovationHub: SchemaTypes.InnovationHub;
  InnovationPack: SchemaTypes.InnovationPack;
  InnovationPacksInput: SchemaTypes.InnovationPacksInput;
  InputCreatorQueryResults: SchemaTypes.InputCreatorQueryResults;
  Int: SchemaTypes.Scalars['Int'];
  Invitation: SchemaTypes.Invitation;
  InvitationEventInput: SchemaTypes.InvitationEventInput;
  InviteForEntryRoleOnRoleSetInput: SchemaTypes.InviteForEntryRoleOnRoleSetInput;
  JoinAsEntryRoleOnRoleSetInput: SchemaTypes.JoinAsEntryRoleOnRoleSetInput;
  KnowledgeBase: SchemaTypes.KnowledgeBase;
  KratosIdentity: SchemaTypes.KratosIdentity;
  LanguageConfig: SchemaTypes.LanguageConfig;
  LatestReleaseDiscussion: SchemaTypes.LatestReleaseDiscussion;
  LeaveConversationInput: SchemaTypes.LeaveConversationInput;
  Library: SchemaTypes.Library;
  LibraryInnovationPacksFilterInput: SchemaTypes.LibraryInnovationPacksFilterInput;
  LibraryTemplatesFilterInput: SchemaTypes.LibraryTemplatesFilterInput;
  License: SchemaTypes.License;
  LicenseEntitlement: SchemaTypes.LicenseEntitlement;
  LicensePlan: SchemaTypes.LicensePlan;
  LicensePolicy: SchemaTypes.LicensePolicy;
  Licensing: SchemaTypes.Licensing;
  LicensingCredentialBasedPolicyCredentialRule: SchemaTypes.LicensingCredentialBasedPolicyCredentialRule;
  LicensingGrantedEntitlement: SchemaTypes.LicensingGrantedEntitlement;
  LicensingGrantedEntitlementInput: SchemaTypes.LicensingGrantedEntitlementInput;
  Lifecycle: SchemaTypes.Lifecycle;
  LifecycleDefinition: SchemaTypes.Scalars['LifecycleDefinition'];
  Link: SchemaTypes.Link;
  Location: SchemaTypes.Location;
  LookupByNameQueryResults: SchemaTypes.LookupByNameQueryResults;
  LookupMyPrivilegesQueryResults: SchemaTypes.LookupMyPrivilegesQueryResults;
  LookupQueryResults: SchemaTypes.LookupQueryResults;
  Markdown: SchemaTypes.Scalars['Markdown'];
  McpApiKey: SchemaTypes.McpApiKey;
  McpApiKeyMintResult: SchemaTypes.McpApiKeyMintResult;
  MeConversationsResult: SchemaTypes.MeConversationsResult;
  MeQueryResults: SchemaTypes.MeQueryResults;
  MediaGallery: SchemaTypes.MediaGallery;
  Memo: SchemaTypes.Memo;
  Message: SchemaTypes.Message;
  MessageDetails: SchemaTypes.MessageDetails;
  MessageID: SchemaTypes.Scalars['MessageID'];
  MessageParent: SchemaTypes.MessageParent;
  Messaging: SchemaTypes.Messaging;
  Metadata: SchemaTypes.Metadata;
  MigrateEmbeddings: SchemaTypes.MigrateEmbeddings;
  MintMcpApiKeyInput: SchemaTypes.MintMcpApiKeyInput;
  ModelCardAiEngineResult: SchemaTypes.ModelCardAiEngineResult;
  ModelCardMonitoringResult: SchemaTypes.ModelCardMonitoringResult;
  ModelCardSpaceUsageResult: SchemaTypes.ModelCardSpaceUsageResult;
  MoveCalloutContributionInput: SchemaTypes.MoveCalloutContributionInput;
  MoveSpaceL1ToSpaceL0Input: SchemaTypes.MoveSpaceL1ToSpaceL0Input;
  MoveSpaceL1ToSpaceL2Input: SchemaTypes.MoveSpaceL1ToSpaceL2Input;
  MoveSpaceL2ToSpaceL1Input: SchemaTypes.MoveSpaceL2ToSpaceL1Input;
  MoveTaskToColumnInput: SchemaTypes.MoveTaskToColumnInput;
  Mutation: {};
  MySpaceResults: SchemaTypes.MySpaceResults;
  NVP: SchemaTypes.Nvp;
  NameID: SchemaTypes.Scalars['NameID'];
  NotificationEmailAddressInput: SchemaTypes.NotificationEmailAddressInput;
  NotificationEventsFilterInput: SchemaTypes.NotificationEventsFilterInput;
  NotificationRecipientResult: SchemaTypes.NotificationRecipientResult;
  NotificationRecipientsInput: SchemaTypes.NotificationRecipientsInput;
  NotificationSettingInput: SchemaTypes.NotificationSettingInput;
  Organization: SchemaTypes.Organization;
  OrganizationAuthorizationResetInput: SchemaTypes.OrganizationAuthorizationResetInput;
  OrganizationFilterInput: SchemaTypes.OrganizationFilterInput;
  OrganizationSettings: SchemaTypes.OrganizationSettings;
  OrganizationSettingsMembership: SchemaTypes.OrganizationSettingsMembership;
  OrganizationSettingsPrivacy: SchemaTypes.OrganizationSettingsPrivacy;
  OrganizationVerification: SchemaTypes.OrganizationVerification;
  OrganizationVerificationEventInput: SchemaTypes.OrganizationVerificationEventInput;
  OrganizationsInRolesResponse: SchemaTypes.OrganizationsInRolesResponse;
  OryConfig: SchemaTypes.OryConfig;
  PageInfo: SchemaTypes.PageInfo;
  PaginatedInAppNotifications: SchemaTypes.PaginatedInAppNotifications;
  PaginatedInnovationPacks: SchemaTypes.PaginatedInnovationPacks;
  PaginatedLibraryTemplateResults: SchemaTypes.PaginatedLibraryTemplateResults;
  PaginatedOrganization: SchemaTypes.PaginatedOrganization;
  PaginatedSpaces: SchemaTypes.PaginatedSpaces;
  PaginatedUsers: SchemaTypes.PaginatedUsers;
  PaginatedVirtualContributor: SchemaTypes.PaginatedVirtualContributor;
  Platform: SchemaTypes.Platform;
  PlatformAccessRole: SchemaTypes.PlatformAccessRole;
  PlatformAdminCommunicationQueryResults: SchemaTypes.PlatformAdminCommunicationQueryResults;
  PlatformAdminIdentityQueryResults: SchemaTypes.PlatformAdminIdentityQueryResults;
  PlatformAdminQueryResults: SchemaTypes.PlatformAdminQueryResults;
  PlatformFeatureFlag: SchemaTypes.PlatformFeatureFlag;
  PlatformIntegrationSettings: SchemaTypes.PlatformIntegrationSettings;
  PlatformInvitation: SchemaTypes.PlatformInvitation;
  PlatformLocations: SchemaTypes.PlatformLocations;
  PlatformRolesAccess: SchemaTypes.PlatformRolesAccess;
  PlatformSettings: SchemaTypes.PlatformSettings;
  PlatformWellKnownVirtualContributorMapping: SchemaTypes.PlatformWellKnownVirtualContributorMapping;
  PlatformWellKnownVirtualContributors: SchemaTypes.PlatformWellKnownVirtualContributors;
  Poll: SchemaTypes.Poll;
  PollOption: SchemaTypes.PollOption;
  PollOptionsChangedSubscriptionResult: SchemaTypes.PollOptionsChangedSubscriptionResult;
  PollSettings: SchemaTypes.PollSettings;
  PollSettingsData: SchemaTypes.PollSettingsData;
  PollSettingsInput: SchemaTypes.PollSettingsInput;
  PollVote: SchemaTypes.PollVote;
  PollVoteUpdatedSubscriptionResult: SchemaTypes.PollVoteUpdatedSubscriptionResult;
  Post: SchemaTypes.Post;
  Profile: SchemaTypes.Profile;
  PromptGraph: SchemaTypes.PromptGraph;
  PromptGraphDataPoint: SchemaTypes.PromptGraphDataPoint;
  PromptGraphDataPointInput: SchemaTypes.PromptGraphDataPointInput;
  PromptGraphDataStruct: SchemaTypes.PromptGraphDataStruct;
  PromptGraphDataStructInput: SchemaTypes.PromptGraphDataStructInput;
  PromptGraphDefinition: SchemaTypes.PromptGraphDefinition;
  PromptGraphDefinitionDataPoint: SchemaTypes.PromptGraphDefinitionDataPoint;
  PromptGraphDefinitionDataStruct: SchemaTypes.PromptGraphDefinitionDataStruct;
  PromptGraphDefinitionEdge: SchemaTypes.PromptGraphDefinitionEdge;
  PromptGraphDefinitionNode: SchemaTypes.PromptGraphDefinitionNode;
  PromptGraphEdge: SchemaTypes.PromptGraphEdge;
  PromptGraphEdgeInput: SchemaTypes.PromptGraphEdgeInput;
  PromptGraphInput: SchemaTypes.PromptGraphInput;
  PromptGraphNode: SchemaTypes.PromptGraphNode;
  PromptGraphNodeInput: SchemaTypes.PromptGraphNodeInput;
  PruneInAppNotificationAdminResult: SchemaTypes.PruneInAppNotificationAdminResult;
  PushSubscription: SchemaTypes.PushSubscription;
  Query: {};
  Question: SchemaTypes.Question;
  Reaction: SchemaTypes.Reaction;
  Reference: SchemaTypes.Reference;
  RefreshVirtualContributorBodyOfKnowledgeInput: SchemaTypes.RefreshVirtualContributorBodyOfKnowledgeInput;
  RelayPaginatedSpace: SchemaTypes.RelayPaginatedSpace;
  RelayPaginatedSpaceEdge: SchemaTypes.RelayPaginatedSpaceEdge;
  RelayPaginatedSpacePageInfo: SchemaTypes.RelayPaginatedSpacePageInfo;
  RemoveCommunityGuidelinesContentInput: SchemaTypes.RemoveCommunityGuidelinesContentInput;
  RemoveConversationMemberInput: SchemaTypes.RemoveConversationMemberInput;
  RemoveDefaultCalloutTemplateOnInnovationFlowStateInput: SchemaTypes.RemoveDefaultCalloutTemplateOnInnovationFlowStateInput;
  RemovePlatformRoleInput: SchemaTypes.RemovePlatformRoleInput;
  RemovePollOptionInput: SchemaTypes.RemovePollOptionInput;
  RemovePollVoteInput: SchemaTypes.RemovePollVoteInput;
  RemoveReactionFromCalloutInput: SchemaTypes.RemoveReactionFromCalloutInput;
  RemoveRoleOnRoleSetInput: SchemaTypes.RemoveRoleOnRoleSetInput;
  RemoveUserGroupMemberInput: SchemaTypes.RemoveUserGroupMemberInput;
  ReorderPollOptionsInput: SchemaTypes.ReorderPollOptionsInput;
  ReplaceCollaboraDocumentInput: SchemaTypes.ReplaceCollaboraDocumentInput;
  ReplaceWhiteboardContentFromSourceInput: SchemaTypes.ReplaceWhiteboardContentFromSourceInput;
  RevokeAuthorizationCredentialInput: SchemaTypes.RevokeAuthorizationCredentialInput;
  RevokeLicensePlanFromAccount: SchemaTypes.RevokeLicensePlanFromAccount;
  RevokeLicensePlanFromSpace: SchemaTypes.RevokeLicensePlanFromSpace;
  RevokeMcpApiKeyInput: SchemaTypes.RevokeMcpApiKeyInput;
  RevokeOrganizationAuthorizationCredentialInput: SchemaTypes.RevokeOrganizationAuthorizationCredentialInput;
  Role: SchemaTypes.Role;
  RoleSet: SchemaTypes.RoleSet;
  RoleSetInvitationResult: SchemaTypes.RoleSetInvitationResult;
  RolesActorInput: SchemaTypes.RolesActorInput;
  RolesResult: SchemaTypes.RolesResult;
  RolesResultCommunity: SchemaTypes.RolesResultCommunity;
  RolesResultOrganization: SchemaTypes.RolesResultOrganization;
  RolesResultSpace: SchemaTypes.RolesResultSpace;
  Room: SchemaTypes.Room;
  RoomAddReactionToMessageInput: SchemaTypes.RoomAddReactionToMessageInput;
  RoomEventSubscriptionResult: SchemaTypes.RoomEventSubscriptionResult;
  RoomMarkMessageReadInput: SchemaTypes.RoomMarkMessageReadInput;
  RoomMessageEventSubscriptionResult: SchemaTypes.RoomMessageEventSubscriptionResult;
  RoomMessageReactionEventSubscriptionResult: SchemaTypes.RoomMessageReactionEventSubscriptionResult;
  RoomRemoveMessageInput: SchemaTypes.RoomRemoveMessageInput;
  RoomRemoveReactionToMessageInput: SchemaTypes.RoomRemoveReactionToMessageInput;
  RoomSendMessageInput: SchemaTypes.RoomSendMessageInput;
  RoomSendMessageReplyInput: SchemaTypes.RoomSendMessageReplyInput;
  RoomThreadUnreadCount: SchemaTypes.RoomThreadUnreadCount;
  RoomUnreadCounts: SchemaTypes.RoomUnreadCounts;
  SearchCursor: SchemaTypes.Scalars['SearchCursor'];
  SearchFilterInput: SchemaTypes.SearchFilterInput;
  SearchInput: SchemaTypes.SearchInput;
  SearchResult:
    | ResolversParentTypes['SearchResultCallout']
    | ResolversParentTypes['SearchResultCollaboraDocument']
    | ResolversParentTypes['SearchResultMemo']
    | ResolversParentTypes['SearchResultOrganization']
    | ResolversParentTypes['SearchResultPost']
    | ResolversParentTypes['SearchResultSpace']
    | ResolversParentTypes['SearchResultUser']
    | ResolversParentTypes['SearchResultWhiteboard'];
  SearchResultCallout: SchemaTypes.SearchResultCallout;
  SearchResultCollaboraDocument: SchemaTypes.SearchResultCollaboraDocument;
  SearchResultMemo: SchemaTypes.SearchResultMemo;
  SearchResultOrganization: SchemaTypes.SearchResultOrganization;
  SearchResultPost: SchemaTypes.SearchResultPost;
  SearchResultSpace: SchemaTypes.SearchResultSpace;
  SearchResultUser: SchemaTypes.SearchResultUser;
  SearchResultWhiteboard: SchemaTypes.SearchResultWhiteboard;
  SendDirectMessageToUsersInput: SchemaTypes.SendDirectMessageToUsersInput;
  Sentry: SchemaTypes.Sentry;
  ServiceMetadata: SchemaTypes.ServiceMetadata;
  SetDefaultCalloutTemplateOnInnovationFlowStateInput: SchemaTypes.SetDefaultCalloutTemplateOnInnovationFlowStateInput;
  SetPlatformWellKnownVirtualContributorInput: SchemaTypes.SetPlatformWellKnownVirtualContributorInput;
  Space: SchemaTypes.Space;
  SpaceAbout: SchemaTypes.SpaceAbout;
  SpaceAboutMembership: SchemaTypes.SpaceAboutMembership;
  SpaceFilterInput: SchemaTypes.SpaceFilterInput;
  SpacePendingMembershipInfo: SchemaTypes.SpacePendingMembershipInfo;
  SpaceSettings: SchemaTypes.SpaceSettings;
  SpaceSettingsCollaboration: SchemaTypes.SpaceSettingsCollaboration;
  SpaceSettingsLayout: SchemaTypes.SpaceSettingsLayout;
  SpaceSettingsMembership: SchemaTypes.SpaceSettingsMembership;
  SpaceSettingsPrivacy: SchemaTypes.SpaceSettingsPrivacy;
  SpaceSubscription: SchemaTypes.SpaceSubscription;
  StorageAggregator: SchemaTypes.StorageAggregator;
  StorageAggregatorParent: SchemaTypes.StorageAggregatorParent;
  StorageBucket: SchemaTypes.StorageBucket;
  StorageBucketParent: SchemaTypes.StorageBucketParent;
  StorageBucketUploadFileInput: SchemaTypes.StorageBucketUploadFileInput;
  StorageBucketUploadFileOnLinkInput: SchemaTypes.StorageBucketUploadFileOnLinkInput;
  StorageBucketUploadFileOnReferenceInput: SchemaTypes.StorageBucketUploadFileOnReferenceInput;
  StorageBucketUploadFileResult: SchemaTypes.StorageBucketUploadFileResult;
  StorageConfig: SchemaTypes.StorageConfig;
  String: SchemaTypes.Scalars['String'];
  SubscribeToPushNotificationsInput: SchemaTypes.SubscribeToPushNotificationsInput;
  Subscription: {};
  SubspaceCreated: SchemaTypes.SubspaceCreated;
  Tagset: SchemaTypes.Tagset;
  TagsetArgs: SchemaTypes.TagsetArgs;
  TagsetTemplate: SchemaTypes.TagsetTemplate;
  Task: SchemaTypes.Task;
  TaskColumnCount: SchemaTypes.TaskColumnCount;
  Template: SchemaTypes.Template;
  TemplateContentSpace: SchemaTypes.TemplateContentSpace;
  TemplateDefault: SchemaTypes.TemplateDefault;
  TemplateResult: SchemaTypes.TemplateResult;
  TemplatesManager: SchemaTypes.TemplatesManager;
  TemplatesSet: SchemaTypes.TemplatesSet;
  Timeline: SchemaTypes.Timeline;
  TransferAccountInnovationHubInput: SchemaTypes.TransferAccountInnovationHubInput;
  TransferAccountInnovationPackInput: SchemaTypes.TransferAccountInnovationPackInput;
  TransferAccountSpaceInput: SchemaTypes.TransferAccountSpaceInput;
  TransferAccountVirtualContributorInput: SchemaTypes.TransferAccountVirtualContributorInput;
  TransferCalloutInput: SchemaTypes.TransferCalloutInput;
  UUID: SchemaTypes.Scalars['UUID'];
  UnsubscribeFromPushNotificationsInput: SchemaTypes.UnsubscribeFromPushNotificationsInput;
  UpdateAiPersonaInput: SchemaTypes.UpdateAiPersonaInput;
  UpdateApplicationFormOnRoleSetInput: SchemaTypes.UpdateApplicationFormOnRoleSetInput;
  UpdateBaselineLicensePlanOnAccount: SchemaTypes.UpdateBaselineLicensePlanOnAccount;
  UpdateCalendarEventInput: SchemaTypes.UpdateCalendarEventInput;
  UpdateCalloutContributionDefaultsInput: SchemaTypes.UpdateCalloutContributionDefaultsInput;
  UpdateCalloutContributorsSettingsInput: SchemaTypes.UpdateCalloutContributorsSettingsInput;
  UpdateCalloutEntityInput: SchemaTypes.UpdateCalloutEntityInput;
  UpdateCalloutFramingInput: SchemaTypes.UpdateCalloutFramingInput;
  UpdateCalloutPublishInfoInput: SchemaTypes.UpdateCalloutPublishInfoInput;
  UpdateCalloutSelectionSettingsInput: SchemaTypes.UpdateCalloutSelectionSettingsInput;
  UpdateCalloutSettingsContributionInput: SchemaTypes.UpdateCalloutSettingsContributionInput;
  UpdateCalloutSettingsFramingInput: SchemaTypes.UpdateCalloutSettingsFramingInput;
  UpdateCalloutSettingsInput: SchemaTypes.UpdateCalloutSettingsInput;
  UpdateCalloutVisibilityInput: SchemaTypes.UpdateCalloutVisibilityInput;
  UpdateCalloutsSortOrderInput: SchemaTypes.UpdateCalloutsSortOrderInput;
  UpdateClassificationEntryDisplayInput: SchemaTypes.UpdateClassificationEntryDisplayInput;
  UpdateClassificationEntryInput: SchemaTypes.UpdateClassificationEntryInput;
  UpdateClassificationEntrySelectionInput: SchemaTypes.UpdateClassificationEntrySelectionInput;
  UpdateClassificationInput: SchemaTypes.UpdateClassificationInput;
  UpdateClassificationSelectTagsetValueInput: SchemaTypes.UpdateClassificationSelectTagsetValueInput;
  UpdateCollaboraDocumentInput: SchemaTypes.UpdateCollaboraDocumentInput;
  UpdateCollaborationFromSpaceTemplateInput: SchemaTypes.UpdateCollaborationFromSpaceTemplateInput;
  UpdateCommunityGuidelinesEntityInput: SchemaTypes.UpdateCommunityGuidelinesEntityInput;
  UpdateContributionCalloutsSortOrderInput: SchemaTypes.UpdateContributionCalloutsSortOrderInput;
  UpdateConversationInput: SchemaTypes.UpdateConversationInput;
  UpdateDiscussionInput: SchemaTypes.UpdateDiscussionInput;
  UpdateDocumentInput: SchemaTypes.UpdateDocumentInput;
  UpdateFormInput: SchemaTypes.UpdateFormInput;
  UpdateFormQuestionInput: SchemaTypes.UpdateFormQuestionInput;
  UpdateInnovationFlowCurrentStateInput: SchemaTypes.UpdateInnovationFlowCurrentStateInput;
  UpdateInnovationFlowInput: SchemaTypes.UpdateInnovationFlowInput;
  UpdateInnovationFlowStateInput: SchemaTypes.UpdateInnovationFlowStateInput;
  UpdateInnovationFlowStateSettingsInput: SchemaTypes.UpdateInnovationFlowStateSettingsInput;
  UpdateInnovationFlowStatesSortOrderInput: SchemaTypes.UpdateInnovationFlowStatesSortOrderInput;
  UpdateInnovationHubInput: SchemaTypes.UpdateInnovationHubInput;
  UpdateInnovationPackInput: SchemaTypes.UpdateInnovationPackInput;
  UpdateKnowledgeBaseInput: SchemaTypes.UpdateKnowledgeBaseInput;
  UpdateLicensePlanInput: SchemaTypes.UpdateLicensePlanInput;
  UpdateLicensePolicyCredentialRuleInput: SchemaTypes.UpdateLicensePolicyCredentialRuleInput;
  UpdateLinkInput: SchemaTypes.UpdateLinkInput;
  UpdateLocationInput: SchemaTypes.UpdateLocationInput;
  UpdateMemoEntityInput: SchemaTypes.UpdateMemoEntityInput;
  UpdateNotificationStateInput: SchemaTypes.UpdateNotificationStateInput;
  UpdateOrganizationInput: SchemaTypes.UpdateOrganizationInput;
  UpdateOrganizationPlatformSettingsInput: SchemaTypes.UpdateOrganizationPlatformSettingsInput;
  UpdateOrganizationSettingsEntityInput: SchemaTypes.UpdateOrganizationSettingsEntityInput;
  UpdateOrganizationSettingsInput: SchemaTypes.UpdateOrganizationSettingsInput;
  UpdateOrganizationSettingsMembershipInput: SchemaTypes.UpdateOrganizationSettingsMembershipInput;
  UpdateOrganizationSettingsPrivacyInput: SchemaTypes.UpdateOrganizationSettingsPrivacyInput;
  UpdatePlatformSettingsInput: SchemaTypes.UpdatePlatformSettingsInput;
  UpdatePlatformSettingsIntegrationInput: SchemaTypes.UpdatePlatformSettingsIntegrationInput;
  UpdatePollInput: SchemaTypes.UpdatePollInput;
  UpdatePollOptionInput: SchemaTypes.UpdatePollOptionInput;
  UpdatePollStatusInput: SchemaTypes.UpdatePollStatusInput;
  UpdatePostInput: SchemaTypes.UpdatePostInput;
  UpdateProfileDirectInput: SchemaTypes.UpdateProfileDirectInput;
  UpdateProfileInput: SchemaTypes.UpdateProfileInput;
  UpdateReferenceInput: SchemaTypes.UpdateReferenceInput;
  UpdateSpaceAboutInput: SchemaTypes.UpdateSpaceAboutInput;
  UpdateSpaceInput: SchemaTypes.UpdateSpaceInput;
  UpdateSpacePlatformSettingsInput: SchemaTypes.UpdateSpacePlatformSettingsInput;
  UpdateSpaceSettingsCollaborationInput: SchemaTypes.UpdateSpaceSettingsCollaborationInput;
  UpdateSpaceSettingsEntityInput: SchemaTypes.UpdateSpaceSettingsEntityInput;
  UpdateSpaceSettingsInput: SchemaTypes.UpdateSpaceSettingsInput;
  UpdateSpaceSettingsLayoutInput: SchemaTypes.UpdateSpaceSettingsLayoutInput;
  UpdateSpaceSettingsMembershipInput: SchemaTypes.UpdateSpaceSettingsMembershipInput;
  UpdateSpaceSettingsPrivacyInput: SchemaTypes.UpdateSpaceSettingsPrivacyInput;
  UpdateSubspacePinnedInput: SchemaTypes.UpdateSubspacePinnedInput;
  UpdateSubspacesSortOrderInput: SchemaTypes.UpdateSubspacesSortOrderInput;
  UpdateTagsetInput: SchemaTypes.UpdateTagsetInput;
  UpdateTaskColumnOnCalloutInput: SchemaTypes.UpdateTaskColumnOnCalloutInput;
  UpdateTaskColumnsSortOrderOnCalloutInput: SchemaTypes.UpdateTaskColumnsSortOrderOnCalloutInput;
  UpdateTemplateContentSpaceInput: SchemaTypes.UpdateTemplateContentSpaceInput;
  UpdateTemplateDefaultTemplateInput: SchemaTypes.UpdateTemplateDefaultTemplateInput;
  UpdateTemplateFromSpaceInput: SchemaTypes.UpdateTemplateFromSpaceInput;
  UpdateTemplateInput: SchemaTypes.UpdateTemplateInput;
  UpdateUserGroupInput: SchemaTypes.UpdateUserGroupInput;
  UpdateUserInput: SchemaTypes.UpdateUserInput;
  UpdateUserPlatformSettingsInput: SchemaTypes.UpdateUserPlatformSettingsInput;
  UpdateUserSettingsAssistantInput: SchemaTypes.UpdateUserSettingsAssistantInput;
  UpdateUserSettingsCommunicationInput: SchemaTypes.UpdateUserSettingsCommunicationInput;
  UpdateUserSettingsDashboardInput: SchemaTypes.UpdateUserSettingsDashboardInput;
  UpdateUserSettingsEntityInput: SchemaTypes.UpdateUserSettingsEntityInput;
  UpdateUserSettingsHomeSpaceInput: SchemaTypes.UpdateUserSettingsHomeSpaceInput;
  UpdateUserSettingsInput: SchemaTypes.UpdateUserSettingsInput;
  UpdateUserSettingsNotificationInput: SchemaTypes.UpdateUserSettingsNotificationInput;
  UpdateUserSettingsNotificationOrganizationInput: SchemaTypes.UpdateUserSettingsNotificationOrganizationInput;
  UpdateUserSettingsNotificationPlatformAdminInput: SchemaTypes.UpdateUserSettingsNotificationPlatformAdminInput;
  UpdateUserSettingsNotificationPlatformInput: SchemaTypes.UpdateUserSettingsNotificationPlatformInput;
  UpdateUserSettingsNotificationSoundInput: SchemaTypes.UpdateUserSettingsNotificationSoundInput;
  UpdateUserSettingsNotificationSpaceAdminInput: SchemaTypes.UpdateUserSettingsNotificationSpaceAdminInput;
  UpdateUserSettingsNotificationSpaceInput: SchemaTypes.UpdateUserSettingsNotificationSpaceInput;
  UpdateUserSettingsNotificationUserInput: SchemaTypes.UpdateUserSettingsNotificationUserInput;
  UpdateUserSettingsNotificationUserMembershipInput: SchemaTypes.UpdateUserSettingsNotificationUserMembershipInput;
  UpdateUserSettingsNotificationVirtualContributorInput: SchemaTypes.UpdateUserSettingsNotificationVirtualContributorInput;
  UpdateUserSettingsPrivacyInput: SchemaTypes.UpdateUserSettingsPrivacyInput;
  UpdateVirtualContributorInput: SchemaTypes.UpdateVirtualContributorInput;
  UpdateVirtualContributorPlatformSettingsEntityInput: SchemaTypes.UpdateVirtualContributorPlatformSettingsEntityInput;
  UpdateVirtualContributorPlatformSettingsInput: SchemaTypes.UpdateVirtualContributorPlatformSettingsInput;
  UpdateVirtualContributorSettingsEntityInput: SchemaTypes.UpdateVirtualContributorSettingsEntityInput;
  UpdateVirtualContributorSettingsInput: SchemaTypes.UpdateVirtualContributorSettingsInput;
  UpdateVirtualContributorSettingsPrivacyInput: SchemaTypes.UpdateVirtualContributorSettingsPrivacyInput;
  UpdateVisualInput: SchemaTypes.UpdateVisualInput;
  UpdateWhiteboardEntityInput: SchemaTypes.UpdateWhiteboardEntityInput;
  UpdateWhiteboardGuestAccessInput: SchemaTypes.UpdateWhiteboardGuestAccessInput;
  UpdateWhiteboardGuestAccessResult: SchemaTypes.UpdateWhiteboardGuestAccessResult;
  UpdateWhiteboardPreviewSettingsInput: SchemaTypes.UpdateWhiteboardPreviewSettingsInput;
  Upload: SchemaTypes.Scalars['Upload'];
  UrlResolverQueryClosestAncestor: SchemaTypes.UrlResolverQueryClosestAncestor;
  UrlResolverQueryResultCalendar: SchemaTypes.UrlResolverQueryResultCalendar;
  UrlResolverQueryResultCalloutsSet: SchemaTypes.UrlResolverQueryResultCalloutsSet;
  UrlResolverQueryResultCollaboration: SchemaTypes.UrlResolverQueryResultCollaboration;
  UrlResolverQueryResultInnovationPack: SchemaTypes.UrlResolverQueryResultInnovationPack;
  UrlResolverQueryResultSpace: SchemaTypes.UrlResolverQueryResultSpace;
  UrlResolverQueryResultTemplatesSet: SchemaTypes.UrlResolverQueryResultTemplatesSet;
  UrlResolverQueryResultVirtualContributor: SchemaTypes.UrlResolverQueryResultVirtualContributor;
  UrlResolverQueryResults: SchemaTypes.UrlResolverQueryResults;
  User: SchemaTypes.User;
  UserAuthenticationResult: SchemaTypes.UserAuthenticationResult;
  UserAuthorizationResetInput: SchemaTypes.UserAuthorizationResetInput;
  UserEmailChangeAuditEntries: SchemaTypes.UserEmailChangeAuditEntries;
  UserEmailChangeAuditEntriesPageInfo: SchemaTypes.UserEmailChangeAuditEntriesPageInfo;
  UserEmailChangeAuditEntry: SchemaTypes.UserEmailChangeAuditEntry;
  UserEmailChangeResult: SchemaTypes.UserEmailChangeResult;
  UserFilterInput: SchemaTypes.UserFilterInput;
  UserGroup: SchemaTypes.UserGroup;
  UserProfileSummary: SchemaTypes.UserProfileSummary;
  UserSettings: SchemaTypes.UserSettings;
  UserSettingsAssistant: SchemaTypes.UserSettingsAssistant;
  UserSettingsCommunication: SchemaTypes.UserSettingsCommunication;
  UserSettingsDashboard: SchemaTypes.UserSettingsDashboard;
  UserSettingsHomeSpace: SchemaTypes.UserSettingsHomeSpace;
  UserSettingsNotification: SchemaTypes.UserSettingsNotification;
  UserSettingsNotificationChannels: SchemaTypes.UserSettingsNotificationChannels;
  UserSettingsNotificationOrganization: SchemaTypes.UserSettingsNotificationOrganization;
  UserSettingsNotificationPlatform: SchemaTypes.UserSettingsNotificationPlatform;
  UserSettingsNotificationPlatformAdmin: SchemaTypes.UserSettingsNotificationPlatformAdmin;
  UserSettingsNotificationSound: SchemaTypes.UserSettingsNotificationSound;
  UserSettingsNotificationSpace: SchemaTypes.UserSettingsNotificationSpace;
  UserSettingsNotificationSpaceAdmin: SchemaTypes.UserSettingsNotificationSpaceAdmin;
  UserSettingsNotificationUser: SchemaTypes.UserSettingsNotificationUser;
  UserSettingsNotificationUserMembership: SchemaTypes.UserSettingsNotificationUserMembership;
  UserSettingsNotificationVirtualContributor: SchemaTypes.UserSettingsNotificationVirtualContributor;
  UserSettingsPrivacy: SchemaTypes.UserSettingsPrivacy;
  UsersInRolesResponse: SchemaTypes.UsersInRolesResponse;
  UsersWithAuthorizationCredentialInput: SchemaTypes.UsersWithAuthorizationCredentialInput;
  VcInteraction: SchemaTypes.VcInteraction;
  VirtualAssistant: SchemaTypes.VirtualAssistant;
  VirtualContributor: SchemaTypes.VirtualContributor;
  VirtualContributorModelCard: SchemaTypes.VirtualContributorModelCard;
  VirtualContributorModelCardFlag: SchemaTypes.VirtualContributorModelCardFlag;
  VirtualContributorPlatformSettings: SchemaTypes.VirtualContributorPlatformSettings;
  VirtualContributorSettings: SchemaTypes.VirtualContributorSettings;
  VirtualContributorSettingsPrivacy: SchemaTypes.VirtualContributorSettingsPrivacy;
  VirtualContributorUpdatedSubscriptionResult: SchemaTypes.VirtualContributorUpdatedSubscriptionResult;
  VirtualContributorsInRolesResponse: SchemaTypes.VirtualContributorsInRolesResponse;
  Visual: SchemaTypes.Visual;
  VisualConstraints: SchemaTypes.VisualConstraints;
  VisualUploadImageInput: SchemaTypes.VisualUploadImageInput;
  Whiteboard: SchemaTypes.Whiteboard;
  WhiteboardPreviewCoordinates: SchemaTypes.WhiteboardPreviewCoordinates;
  WhiteboardPreviewCoordinatesData: SchemaTypes.WhiteboardPreviewCoordinatesData;
  WhiteboardPreviewCoordinatesInput: SchemaTypes.WhiteboardPreviewCoordinatesInput;
  WhiteboardPreviewSettings: SchemaTypes.WhiteboardPreviewSettings;
};

export type ApmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['APM'] = ResolversParentTypes['APM']
> = {
  endpoint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rumEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']
> = {
  accountType?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['AccountType']>,
    ParentType,
    ContextType
  >;
  actor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  baselineLicensePlan?: Resolver<
    ResolversTypes['AccountLicensePlan'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credentials?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Credential']>>,
    ParentType,
    ContextType
  >;
  externalSubscriptionID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  host?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Actor']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  innovationHubs?: Resolver<
    Array<ResolversTypes['InnovationHub']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.AccountInnovationHubsArgs>
  >;
  innovationPacks?: Resolver<
    Array<ResolversTypes['InnovationPack']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.AccountInnovationPacksArgs>
  >;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  spaces?: Resolver<Array<ResolversTypes['Space']>, ParentType, ContextType>;
  storageAggregator?: Resolver<
    ResolversTypes['StorageAggregator'],
    ParentType,
    ContextType
  >;
  subscriptions?: Resolver<
    Array<ResolversTypes['AccountSubscription']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['ActorType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  virtualContributors?: Resolver<
    Array<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountLicensePlanResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AccountLicensePlan'] = ResolversParentTypes['AccountLicensePlan']
> = {
  innovationPacks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  spaceFree?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  spacePlus?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  spacePremium?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startingPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  virtualContributor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountSubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AccountSubscription'] = ResolversParentTypes['AccountSubscription']
> = {
  expires?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<
    ResolversTypes['LicensingCredentialBasedCredentialType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityCreatedSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityCreatedSubscriptionResult'] = ResolversParentTypes['ActivityCreatedSubscriptionResult']
> = {
  activity?: Resolver<
    ResolversTypes['ActivityLogEntry'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityFeedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityFeed'] = ResolversParentTypes['ActivityFeed']
> = {
  activityFeed?: Resolver<
    Array<ResolversTypes['ActivityLogEntry']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntry'] = ResolversParentTypes['ActivityLogEntry']
> = {
  __resolveType: TypeResolveFn<
    | 'ActivityLogEntryCalendarEventCreated'
    | 'ActivityLogEntryCalloutDiscussionComment'
    | 'ActivityLogEntryCalloutLinkCreated'
    | 'ActivityLogEntryCalloutMemoCreated'
    | 'ActivityLogEntryCalloutPostComment'
    | 'ActivityLogEntryCalloutPostCreated'
    | 'ActivityLogEntryCalloutPublished'
    | 'ActivityLogEntryCalloutWhiteboardContentModified'
    | 'ActivityLogEntryCalloutWhiteboardCreated'
    | 'ActivityLogEntryMemberJoined'
    | 'ActivityLogEntrySubspaceCreated'
    | 'ActivityLogEntryUpdateSent',
    ParentType,
    ContextType
  >;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
};

export type ActivityLogEntryCalendarEventCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalendarEventCreated'] = ResolversParentTypes['ActivityLogEntryCalendarEventCreated']
> = {
  calendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType>;
  calendarEvent?: Resolver<
    ResolversTypes['CalendarEvent'],
    ParentType,
    ContextType
  >;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutDiscussionCommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutDiscussionComment'] = ResolversParentTypes['ActivityLogEntryCalloutDiscussionComment']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutLinkCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutLinkCreated'] = ResolversParentTypes['ActivityLogEntryCalloutLinkCreated']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  link?: Resolver<ResolversTypes['Link'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutMemoCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutMemoCreated'] = ResolversParentTypes['ActivityLogEntryCalloutMemoCreated']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  memo?: Resolver<ResolversTypes['Memo'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutPostCommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutPostComment'] = ResolversParentTypes['ActivityLogEntryCalloutPostComment']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutPostCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutPostCreated'] = ResolversParentTypes['ActivityLogEntryCalloutPostCreated']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutPublishedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutPublished'] = ResolversParentTypes['ActivityLogEntryCalloutPublished']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutWhiteboardContentModifiedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutWhiteboardContentModified'] = ResolversParentTypes['ActivityLogEntryCalloutWhiteboardContentModified']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  whiteboard?: Resolver<ResolversTypes['Whiteboard'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutWhiteboardCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutWhiteboardCreated'] = ResolversParentTypes['ActivityLogEntryCalloutWhiteboardCreated']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  whiteboard?: Resolver<ResolversTypes['Whiteboard'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryMemberJoinedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryMemberJoined'] = ResolversParentTypes['ActivityLogEntryMemberJoined']
> = {
  actor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  actorType?: Resolver<ResolversTypes['ActorType'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  community?: Resolver<ResolversTypes['Community'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntrySubspaceCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntrySubspaceCreated'] = ResolversParentTypes['ActivityLogEntrySubspaceCreated']
> = {
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  subspace?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryUpdateSentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryUpdateSent'] = ResolversParentTypes['ActivityLogEntryUpdateSent']
> = {
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  journeyUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  updates?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Actor'] = ResolversParentTypes['Actor']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credentials?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Credential']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['ActorType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorFullResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActorFull'] = ResolversParentTypes['ActorFull']
> = {
  __resolveType: TypeResolveFn<
    | 'Account'
    | 'Organization'
    | 'RelayPaginatedSpace'
    | 'Space'
    | 'User'
    | 'VirtualAssistant'
    | 'VirtualContributor',
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credentials?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Credential']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['ActorType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type ActorRolePolicyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActorRolePolicy'] = ResolversParentTypes['ActorRolePolicy']
> = {
  maximum?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minimum?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorRolesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActorRoles'] = ResolversParentTypes['ActorRoles']
> = {
  applications?: Resolver<
    Array<ResolversTypes['CommunityApplicationForRoleResult']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.ActorRolesApplicationsArgs>
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  invitations?: Resolver<
    Array<ResolversTypes['CommunityInvitationForRoleResult']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.ActorRolesInvitationsArgs>
  >;
  organizations?: Resolver<
    Array<ResolversTypes['RolesResultOrganization']>,
    ParentType,
    ContextType
  >;
  spaces?: Resolver<
    Array<ResolversTypes['RolesResultSpace']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AiPersonaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AiPersona'] = ResolversParentTypes['AiPersona']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  bodyOfKnowledgeLastUpdated?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  engine?: Resolver<ResolversTypes['AiPersonaEngine'], ParentType, ContextType>;
  externalConfig?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ExternalConfig']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  prompt?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  promptGraph?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PromptGraph']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AiServerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AiServer'] = ResolversParentTypes['AiServer']
> = {
  aiPersona?: Resolver<
    ResolversTypes['AiPersona'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.AiServerAiPersonaArgs, 'ID'>
  >;
  aiPersonas?: Resolver<
    Array<ResolversTypes['AiPersona']>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  defaultAiPersona?: Resolver<
    ResolversTypes['AiPersona'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Application'] = ResolversParentTypes['Application']
> = {
  actor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isFinalized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lifecycle?: Resolver<ResolversTypes['Lifecycle'], ParentType, ContextType>;
  nextEvents?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  questions?: Resolver<
    Array<ResolversTypes['Question']>,
    ParentType,
    ContextType
  >;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssistantCapabilityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AssistantCapability'] = ResolversParentTypes['AssistantCapability']
> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kind?: Resolver<
    ResolversTypes['AssistantCapabilityKind'],
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssistantCapabilityToggleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AssistantCapabilityToggle'] = ResolversParentTypes['AssistantCapabilityToggle']
> = {
  capability?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthenticationConfig'] = ResolversParentTypes['AuthenticationConfig']
> = {
  providers?: Resolver<
    Array<ResolversTypes['AuthenticationProviderConfig']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationProviderConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthenticationProviderConfig'] = ResolversParentTypes['AuthenticationProviderConfig']
> = {
  config?: Resolver<
    ResolversTypes['AuthenticationProviderConfigUnion'],
    ParentType,
    ContextType
  >;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationProviderConfigUnionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthenticationProviderConfigUnion'] = ResolversParentTypes['AuthenticationProviderConfigUnion']
> = {
  __resolveType: TypeResolveFn<'OryConfig', ParentType, ContextType>;
};

export type AuthorizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Authorization'] = ResolversParentTypes['Authorization']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credentialRules?: Resolver<
    SchemaTypes.Maybe<
      Array<ResolversTypes['AuthorizationPolicyRuleCredential']>
    >,
    ParentType,
    ContextType
  >;
  hasPrivilege?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.AuthorizationHasPrivilegeArgs, 'privilege'>
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  myPrivileges?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType
  >;
  privilegeRules?: Resolver<
    SchemaTypes.Maybe<
      Array<ResolversTypes['AuthorizationPolicyRulePrivilege']>
    >,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['AuthorizationPolicyType']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorizationPolicyRuleCredentialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthorizationPolicyRuleCredential'] = ResolversParentTypes['AuthorizationPolicyRuleCredential']
> = {
  cascade?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  criterias?: Resolver<
    Array<ResolversTypes['CredentialDefinition']>,
    ParentType,
    ContextType
  >;
  grantedPrivileges?: Resolver<
    Array<ResolversTypes['AuthorizationPrivilege']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorizationPolicyRulePrivilegeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthorizationPolicyRulePrivilege'] = ResolversParentTypes['AuthorizationPolicyRulePrivilege']
> = {
  grantedPrivileges?: Resolver<
    Array<ResolversTypes['AuthorizationPrivilege']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  sourcePrivilege?: Resolver<
    ResolversTypes['AuthorizationPrivilege'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalendarResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Calendar'] = ResolversParentTypes['Calendar']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  event?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalendarEvent']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.CalendarEventArgs, 'ID'>
  >;
  events?: Resolver<
    Array<ResolversTypes['CalendarEvent']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalendarEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalendarEvent'] = ResolversParentTypes['CalendarEvent']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  createdBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  durationDays?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  durationMinutes?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  googleCalendarUrl?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  icsDownloadUrl?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  multipleDays?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  outlookCalendarUrl?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  startDate?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  subspace?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['CalendarEventType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  visibleOnParentCalendar?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  wholeDay?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Callout'] = ResolversParentTypes['Callout']
> = {
  activity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  classification?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Classification']>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Room']>,
    ParentType,
    ContextType
  >;
  contributionDefaults?: Resolver<
    ResolversTypes['CalloutContributionDefaults'],
    ParentType,
    ContextType
  >;
  contributions?: Resolver<
    Array<ResolversTypes['CalloutContribution']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.CalloutContributionsArgs>
  >;
  contributionsCount?: Resolver<
    ResolversTypes['CalloutContributionsCountOutput'],
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  framing?: Resolver<ResolversTypes['CalloutFraming'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isTemplate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  posts?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Post']>>,
    ParentType,
    ContextType
  >;
  publishedBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  publishedDate?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  reactions?: Resolver<
    Array<ResolversTypes['CalloutReaction']>,
    ParentType,
    ContextType
  >;
  reactionsSummary?: Resolver<
    ResolversTypes['CalloutReactionsSummary'],
    ParentType,
    ContextType
  >;
  settings?: Resolver<
    ResolversTypes['CalloutSettings'],
    ParentType,
    ContextType
  >;
  sortOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  taskColumnCounts?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['TaskColumnCount']>>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutContributionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutContribution'] = ResolversParentTypes['CalloutContribution']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  classification?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Classification']>,
    ParentType,
    ContextType
  >;
  collaboraDocument?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CollaboraDocument']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  link?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Link']>,
    ParentType,
    ContextType
  >;
  memo?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Memo']>,
    ParentType,
    ContextType
  >;
  post?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType
  >;
  sortOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  whiteboard?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Whiteboard']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutContributionDefaultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutContributionDefaults'] = ResolversParentTypes['CalloutContributionDefaults']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  defaultDisplayName?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  postDescription?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  whiteboardContentAvailable?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutContributionsCountOutputResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutContributionsCountOutput'] = ResolversParentTypes['CalloutContributionsCountOutput']
> = {
  collaboraDocument?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  link?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  memo?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  whiteboard?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutContributorsMapViewResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutContributorsMapView'] = ResolversParentTypes['CalloutContributorsMapView']
> = {
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  zoom?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutContributorsSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutContributorsSettings'] = ResolversParentTypes['CalloutContributorsSettings']
> = {
  contributorTypes?: Resolver<
    Array<ResolversTypes['ActorType']>,
    ParentType,
    ContextType
  >;
  defaultContributorType?: Resolver<
    ResolversTypes['ActorType'],
    ParentType,
    ContextType
  >;
  defaultView?: Resolver<
    ResolversTypes['ContributorCollectionView'],
    ParentType,
    ContextType
  >;
  mapView?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalloutContributorsMapView']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutFramingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutFraming'] = ResolversParentTypes['CalloutFraming']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  collaboraDocument?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CollaboraDocument']>,
    ParentType,
    ContextType
  >;
  contributorCounts?: Resolver<
    ResolversTypes['ContributorCollectionCounts'],
    ParentType,
    ContextType
  >;
  contributors?: Resolver<
    Array<ResolversTypes['ContributorCollectionItem']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.CalloutFramingContributorsArgs, 'type'>
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  link?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Link']>,
    ParentType,
    ContextType
  >;
  mediaGallery?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['MediaGallery']>,
    ParentType,
    ContextType
  >;
  memo?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Memo']>,
    ParentType,
    ContextType
  >;
  poll?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Poll']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  subspaces?: Resolver<Array<ResolversTypes['Space']>, ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['CalloutFramingType'],
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  whiteboard?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Whiteboard']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutPostCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutPostCreated'] = ResolversParentTypes['CalloutPostCreated']
> = {
  calloutID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contributionID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  sortOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutReactionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutReaction'] = ResolversParentTypes['CalloutReaction']
> = {
  emoji?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutReactionsSummaryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutReactionsSummary'] = ResolversParentTypes['CalloutReactionsSummary']
> = {
  allowedEmojis?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  emojis?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  myReactionEmoji?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutSelectionSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutSelectionSettings'] = ResolversParentTypes['CalloutSelectionSettings']
> = {
  mode?: Resolver<
    ResolversTypes['CalloutSelectionMode'],
    ParentType,
    ContextType
  >;
  selectedIds?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutSettings'] = ResolversParentTypes['CalloutSettings']
> = {
  contribution?: Resolver<
    ResolversTypes['CalloutSettingsContribution'],
    ParentType,
    ContextType
  >;
  framing?: Resolver<
    ResolversTypes['CalloutSettingsFraming'],
    ParentType,
    ContextType
  >;
  visibility?: Resolver<
    ResolversTypes['CalloutVisibility'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutSettingsContributionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutSettingsContribution'] = ResolversParentTypes['CalloutSettingsContribution']
> = {
  allowedTypes?: Resolver<
    Array<ResolversTypes['CalloutContributionType']>,
    ParentType,
    ContextType
  >;
  canAddContributions?: Resolver<
    ResolversTypes['CalloutAllowedActors'],
    ParentType,
    ContextType
  >;
  commentsEnabled?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutSettingsFramingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutSettingsFraming'] = ResolversParentTypes['CalloutSettingsFraming']
> = {
  commentsEnabled?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  contributors?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalloutContributorsSettings']>,
    ParentType,
    ContextType
  >;
  selection?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalloutSelectionSettings']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutsSetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutsSet'] = ResolversParentTypes['CalloutsSet']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  callouts?: Resolver<
    Array<ResolversTypes['Callout']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.CalloutsSetCalloutsArgs>
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  tags?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.CalloutsSetTagsArgs>
  >;
  tagsetTemplates?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['TagsetTemplate']>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['CalloutsSetType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassificationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Classification'] = ResolversParentTypes['Classification']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  tagset?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Tagset']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.ClassificationTagsetArgs, 'tagsetName'>
  >;
  tagsets?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Tagset']>>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassificationEntryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ClassificationEntry'] = ResolversParentTypes['ClassificationEntry']
> = {
  cardinality?: Resolver<
    ResolversTypes['ClassificationCardinality'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  display?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  displayLabel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  selectedValueIDs?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  selectedValues?: Resolver<
    Array<ResolversTypes['ClassificationValue']>,
    ParentType,
    ContextType
  >;
  sortOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  values?: Resolver<
    Array<ResolversTypes['ClassificationValue']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassificationTemplateContentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ClassificationTemplateContent'] = ResolversParentTypes['ClassificationTemplateContent']
> = {
  cardinality?: Resolver<
    ResolversTypes['ClassificationCardinality'],
    ParentType,
    ContextType
  >;
  values?: Resolver<
    Array<ResolversTypes['ClassificationValue']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassificationValueResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ClassificationValue'] = ResolversParentTypes['ClassificationValue']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollaboraDocumentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CollaboraDocument'] = ResolversParentTypes['CollaboraDocument']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  documentType?: Resolver<
    ResolversTypes['CollaboraDocumentType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollaboraEditorUrlResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CollaboraEditorUrlResult'] = ResolversParentTypes['CollaboraEditorUrlResult']
> = {
  accessTokenTTL?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  editorUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollaborationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Collaboration'] = ResolversParentTypes['Collaboration']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  calloutsSet?: Resolver<
    ResolversTypes['CalloutsSet'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  innovationFlow?: Resolver<
    ResolversTypes['InnovationFlow'],
    ParentType,
    ContextType
  >;
  isTemplate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  timeline?: Resolver<ResolversTypes['Timeline'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollaborationMigrationIssueResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CollaborationMigrationIssue'] = ResolversParentTypes['CollaborationMigrationIssue']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollaborationMigrationResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CollaborationMigrationResult'] = ResolversParentTypes['CollaborationMigrationResult']
> = {
  failed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  failedDocuments?: Resolver<
    Array<ResolversTypes['CollaborationMigrationIssue']>,
    ParentType,
    ContextType
  >;
  flagged?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  flaggedDocuments?: Resolver<
    Array<ResolversTypes['CollaborationMigrationIssue']>,
    ParentType,
    ContextType
  >;
  migrated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unattached?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Communication'] = ResolversParentTypes['Communication']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updates?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminMembershipResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminMembershipResult'] = ResolversParentTypes['CommunicationAdminMembershipResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rooms?: Resolver<
    Array<ResolversTypes['CommunicationAdminRoomMembershipResult']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminMigrateRoomsResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminMigrateRoomsResult'] = ResolversParentTypes['CommunicationAdminMigrateRoomsResult']
> = {
  errors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  failed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  migrated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminOrphanedUsageResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminOrphanedUsageResult'] = ResolversParentTypes['CommunicationAdminOrphanedUsageResult']
> = {
  rooms?: Resolver<
    Array<ResolversTypes['CommunicationAdminRoomResult']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminRoomMembershipResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminRoomMembershipResult'] = ResolversParentTypes['CommunicationAdminRoomMembershipResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extraMembers?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  joinRule?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  missingMembers?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  roomID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminRoomResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminRoomResult'] = ResolversParentTypes['CommunicationAdminRoomResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  communication?: Resolver<
    ResolversTypes['Communication'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  group?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.CommunityGroupArgs, 'ID'>
  >;
  groups?: Resolver<
    Array<ResolversTypes['UserGroup']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  roleSet?: Resolver<ResolversTypes['RoleSet'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityApplicationForRoleResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityApplicationForRoleResult'] = ResolversParentTypes['CommunityApplicationForRoleResult']
> = {
  communityID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  spaceID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  spaceLevel?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityApplicationResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityApplicationResult'] = ResolversParentTypes['CommunityApplicationResult']
> = {
  application?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  spacePendingMembershipInfo?: Resolver<
    ResolversTypes['SpacePendingMembershipInfo'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityGuidelinesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityGuidelines'] = ResolversParentTypes['CommunityGuidelines']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityInvitationForRoleResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityInvitationForRoleResult'] = ResolversParentTypes['CommunityInvitationForRoleResult']
> = {
  actorID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  communityID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  spaceID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  spaceLevel?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  welcomeMessage?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityInvitationResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityInvitationResult'] = ResolversParentTypes['CommunityInvitationResult']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  invitation?: Resolver<ResolversTypes['Invitation'], ParentType, ContextType>;
  spacePendingMembershipInfo?: Resolver<
    ResolversTypes['SpacePendingMembershipInfo'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityMembershipResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityMembershipResult'] = ResolversParentTypes['CommunityMembershipResult']
> = {
  childMemberships?: Resolver<
    Array<ResolversTypes['CommunityMembershipResult']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Config'] = ResolversParentTypes['Config']
> = {
  apm?: Resolver<ResolversTypes['APM'], ParentType, ContextType>;
  authentication?: Resolver<
    ResolversTypes['AuthenticationConfig'],
    ParentType,
    ContextType
  >;
  defaultVisualTypeConstraints?: Resolver<
    ResolversTypes['VisualConstraints'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.ConfigDefaultVisualTypeConstraintsArgs, 'type'>
  >;
  featureFlags?: Resolver<
    Array<ResolversTypes['PlatformFeatureFlag']>,
    ParentType,
    ContextType
  >;
  geo?: Resolver<ResolversTypes['Geo'], ParentType, ContextType>;
  language?: Resolver<
    ResolversTypes['LanguageConfig'],
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    ResolversTypes['PlatformLocations'],
    ParentType,
    ContextType
  >;
  sentry?: Resolver<ResolversTypes['Sentry'], ParentType, ContextType>;
  storage?: Resolver<ResolversTypes['StorageConfig'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributorCollectionCountsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ContributorCollectionCounts'] = ResolversParentTypes['ContributorCollectionCounts']
> = {
  organizations?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  virtualContributors?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributorCollectionItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ContributorCollectionItem'] = ResolversParentTypes['ContributorCollectionItem']
> = {
  avatarUrl?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  location?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ContributorLocation']>,
    ParentType,
    ContextType
  >;
  roleLabel?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['ActorType'], ParentType, ContextType>;
  url?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributorLocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ContributorLocation'] = ResolversParentTypes['ContributorLocation']
> = {
  city?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  country?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasValidCoordinates?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  latitude?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  longitude?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  messaging?: Resolver<ResolversTypes['Messaging'], ParentType, ContextType>;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationCreatedEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConversationCreatedEvent'] = ResolversParentTypes['ConversationCreatedEvent']
> = {
  conversation?: Resolver<
    ResolversTypes['Conversation'],
    ParentType,
    ContextType
  >;
  message?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Message']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationDeletedEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConversationDeletedEvent'] = ResolversParentTypes['ConversationDeletedEvent']
> = {
  conversationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationEventSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConversationEventSubscriptionResult'] = ResolversParentTypes['ConversationEventSubscriptionResult']
> = {
  conversationCreated?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ConversationCreatedEvent']>,
    ParentType,
    ContextType
  >;
  conversationDeleted?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ConversationDeletedEvent']>,
    ParentType,
    ContextType
  >;
  conversationUpdated?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ConversationUpdatedEvent']>,
    ParentType,
    ContextType
  >;
  eventType?: Resolver<
    ResolversTypes['ConversationEventType'],
    ParentType,
    ContextType
  >;
  memberAdded?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ConversationMemberAddedEvent']>,
    ParentType,
    ContextType
  >;
  memberRemoved?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ConversationMemberRemovedEvent']>,
    ParentType,
    ContextType
  >;
  messageReceived?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ConversationMessageReceivedEvent']>,
    ParentType,
    ContextType
  >;
  messageRemoved?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ConversationMessageRemovedEvent']>,
    ParentType,
    ContextType
  >;
  readReceiptUpdated?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ConversationReadReceiptUpdatedEvent']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationMemberAddedEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConversationMemberAddedEvent'] = ResolversParentTypes['ConversationMemberAddedEvent']
> = {
  addedMember?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  conversation?: Resolver<
    ResolversTypes['Conversation'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationMemberRemovedEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConversationMemberRemovedEvent'] = ResolversParentTypes['ConversationMemberRemovedEvent']
> = {
  conversation?: Resolver<
    ResolversTypes['Conversation'],
    ParentType,
    ContextType
  >;
  removedMemberID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationMessageReceivedEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConversationMessageReceivedEvent'] = ResolversParentTypes['ConversationMessageReceivedEvent']
> = {
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  roomId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationMessageRemovedEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConversationMessageRemovedEvent'] = ResolversParentTypes['ConversationMessageRemovedEvent']
> = {
  messageId?: Resolver<ResolversTypes['MessageID'], ParentType, ContextType>;
  roomId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationReadReceiptUpdatedEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConversationReadReceiptUpdatedEvent'] = ResolversParentTypes['ConversationReadReceiptUpdatedEvent']
> = {
  lastReadEventId?: Resolver<
    ResolversTypes['MessageID'],
    ParentType,
    ContextType
  >;
  roomId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationUpdatedEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConversationUpdatedEvent'] = ResolversParentTypes['ConversationUpdatedEvent']
> = {
  conversation?: Resolver<
    ResolversTypes['Conversation'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutContributionDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutContributionData'] = ResolversParentTypes['CreateCalloutContributionData']
> = {
  collaboraDocument?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCollaboraDocumentData']>,
    ParentType,
    ContextType
  >;
  link?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateLinkData']>,
    ParentType,
    ContextType
  >;
  memo?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateMemoData']>,
    ParentType,
    ContextType
  >;
  post?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreatePostData']>,
    ParentType,
    ContextType
  >;
  sortOrder?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  taskColumn?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    ResolversTypes['CalloutContributionType'],
    ParentType,
    ContextType
  >;
  whiteboard?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateWhiteboardData']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutContributionDefaultsDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutContributionDefaultsData'] = ResolversParentTypes['CreateCalloutContributionDefaultsData']
> = {
  defaultDisplayName?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  draftWhiteboardID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  postDescription?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  sourceCalloutID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  sourceWhiteboardID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutContributorsMapViewDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutContributorsMapViewData'] = ResolversParentTypes['CreateCalloutContributorsMapViewData']
> = {
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  zoom?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutContributorsSettingsDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutContributorsSettingsData'] = ResolversParentTypes['CreateCalloutContributorsSettingsData']
> = {
  contributorTypes?: Resolver<
    Array<ResolversTypes['ActorType']>,
    ParentType,
    ContextType
  >;
  defaultContributorType?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ActorType']>,
    ParentType,
    ContextType
  >;
  defaultView?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ContributorCollectionView']>,
    ParentType,
    ContextType
  >;
  mapView?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCalloutContributorsMapViewData']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutData'] = ResolversParentTypes['CreateCalloutData']
> = {
  classification?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateClassificationData']>,
    ParentType,
    ContextType
  >;
  contributionDefaults?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCalloutContributionDefaultsData']>,
    ParentType,
    ContextType
  >;
  contributions?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['CreateCalloutContributionData']>>,
    ParentType,
    ContextType
  >;
  framing?: Resolver<
    ResolversTypes['CreateCalloutFramingData'],
    ParentType,
    ContextType
  >;
  nameID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['NameID']>,
    ParentType,
    ContextType
  >;
  sendNotification?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  settings?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCalloutSettingsData']>,
    ParentType,
    ContextType
  >;
  sortOrder?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  taskBoard?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCalloutTaskBoardData']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutFramingDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutFramingData'] = ResolversParentTypes['CreateCalloutFramingData']
> = {
  collaboraDocument?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCollaboraDocumentData']>,
    ParentType,
    ContextType
  >;
  link?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateLinkData']>,
    ParentType,
    ContextType
  >;
  memo?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateMemoData']>,
    ParentType,
    ContextType
  >;
  poll?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreatePollData']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<
    ResolversTypes['CreateProfileData'],
    ParentType,
    ContextType
  >;
  tags?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalloutFramingType']>,
    ParentType,
    ContextType
  >;
  whiteboard?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateWhiteboardData']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutSelectionSettingsDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutSelectionSettingsData'] = ResolversParentTypes['CreateCalloutSelectionSettingsData']
> = {
  mode?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalloutSelectionMode']>,
    ParentType,
    ContextType
  >;
  selectedIds?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['ID']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutSettingsContributionDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutSettingsContributionData'] = ResolversParentTypes['CreateCalloutSettingsContributionData']
> = {
  allowedTypes?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['CalloutContributionType']>>,
    ParentType,
    ContextType
  >;
  canAddContributions?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalloutAllowedActors']>,
    ParentType,
    ContextType
  >;
  commentsEnabled?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  enabled?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutSettingsDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutSettingsData'] = ResolversParentTypes['CreateCalloutSettingsData']
> = {
  contribution?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCalloutSettingsContributionData']>,
    ParentType,
    ContextType
  >;
  framing?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCalloutSettingsFramingData']>,
    ParentType,
    ContextType
  >;
  visibility?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalloutVisibility']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutSettingsFramingDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutSettingsFramingData'] = ResolversParentTypes['CreateCalloutSettingsFramingData']
> = {
  commentsEnabled?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  contributors?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCalloutContributorsSettingsData']>,
    ParentType,
    ContextType
  >;
  selection?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCalloutSelectionSettingsData']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutTaskBoardDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutTaskBoardData'] = ResolversParentTypes['CreateCalloutTaskBoardData']
> = {
  columns?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalloutsSetDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCalloutsSetData'] = ResolversParentTypes['CreateCalloutsSetData']
> = {
  calloutsData?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['CreateCalloutData']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateClassificationDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateClassificationData'] = ResolversParentTypes['CreateClassificationData']
> = {
  tagsets?: Resolver<
    Array<ResolversTypes['CreateTagsetData']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCollaboraDocumentDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCollaboraDocumentData'] = ResolversParentTypes['CreateCollaboraDocumentData']
> = {
  displayName?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  documentType?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CollaboraDocumentType']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCollaborationDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCollaborationData'] = ResolversParentTypes['CreateCollaborationData']
> = {
  calloutsSetData?: Resolver<
    ResolversTypes['CreateCalloutsSetData'],
    ParentType,
    ContextType
  >;
  innovationFlowData?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateInnovationFlowData']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCommunityGuidelinesDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateCommunityGuidelinesData'] = ResolversParentTypes['CreateCommunityGuidelinesData']
> = {
  profile?: Resolver<
    ResolversTypes['CreateProfileData'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateInnovationFlowDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateInnovationFlowData'] = ResolversParentTypes['CreateInnovationFlowData']
> = {
  profile?: Resolver<
    ResolversTypes['CreateProfileData'],
    ParentType,
    ContextType
  >;
  states?: Resolver<
    Array<ResolversTypes['CreateInnovationFlowStateData']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateInnovationFlowStateDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateInnovationFlowStateData'] = ResolversParentTypes['CreateInnovationFlowStateData']
> = {
  description?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settings?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateInnovationFlowStateSettingsData']>,
    ParentType,
    ContextType
  >;
  sortOrder?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateInnovationFlowStateSettingsDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateInnovationFlowStateSettingsData'] = ResolversParentTypes['CreateInnovationFlowStateSettingsData']
> = {
  allowNewCallouts?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  descriptionDisplayMode?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalloutDescriptionDisplayMode']>,
    ParentType,
    ContextType
  >;
  showPublishDetails?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  sidebar?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['SidebarWidget']>>,
    ParentType,
    ContextType
  >;
  visible?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLinkDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateLinkData'] = ResolversParentTypes['CreateLinkData']
> = {
  profile?: Resolver<
    ResolversTypes['CreateProfileData'],
    ParentType,
    ContextType
  >;
  uri?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLocationDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateLocationData'] = ResolversParentTypes['CreateLocationData']
> = {
  addressLine1?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  addressLine2?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  city?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  country?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  postalCode?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  stateOrProvince?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMemoDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateMemoData'] = ResolversParentTypes['CreateMemoData']
> = {
  markdown?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateProfileData']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePollDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreatePollData'] = ResolversParentTypes['CreatePollData']
> = {
  options?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  settings?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PollSettingsData']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePostDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreatePostData'] = ResolversParentTypes['CreatePostData']
> = {
  tags?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateProfileDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateProfileData'] = ResolversParentTypes['CreateProfileData']
> = {
  description?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateLocationData']>,
    ParentType,
    ContextType
  >;
  referencesData?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['CreateReferenceData']>>,
    ParentType,
    ContextType
  >;
  tagline?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  tags?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  tagsets?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['CreateTagsetData']>>,
    ParentType,
    ContextType
  >;
  visuals?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['CreateVisualOnProfileData']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateReferenceDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateReferenceData'] = ResolversParentTypes['CreateReferenceData']
> = {
  description?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTagsetDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateTagsetData'] = ResolversParentTypes['CreateTagsetData']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['TagsetType']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateVisualOnProfileDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateVisualOnProfileData'] = ResolversParentTypes['CreateVisualOnProfileData']
> = {
  name?: Resolver<ResolversTypes['VisualType'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateWhiteboardDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateWhiteboardData'] = ResolversParentTypes['CreateWhiteboardData']
> = {
  draftWhiteboardID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  nameID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['NameID']>,
    ParentType,
    ContextType
  >;
  previewSettings?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateWhiteboardPreviewSettingsData']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateProfileData']>,
    ParentType,
    ContextType
  >;
  sourceWhiteboardID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateWhiteboardPreviewSettingsDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateWhiteboardPreviewSettingsData'] = ResolversParentTypes['CreateWhiteboardPreviewSettingsData']
> = {
  coordinates?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['WhiteboardPreviewCoordinatesData']>,
    ParentType,
    ContextType
  >;
  mode?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['WhiteboardPreviewMode']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CredentialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Credential'] = ResolversParentTypes['Credential']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expires?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  issuer?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  resourceID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CredentialType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CredentialDefinitionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CredentialDefinition'] = ResolversParentTypes['CredentialDefinition']
> = {
  resourceID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DirectMessageDeliveryResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DirectMessageDeliveryResult'] = ResolversParentTypes['DirectMessageDeliveryResult']
> = {
  conversationID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  receiverID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  status?: Resolver<
    ResolversTypes['DirectMessageDeliveryStatus'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscussionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Discussion'] = ResolversParentTypes['Discussion']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  category?: Resolver<
    ResolversTypes['ForumDiscussionCategory'],
    ParentType,
    ContextType
  >;
  comments?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  createdBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  privacy?: Resolver<
    ResolversTypes['ForumDiscussionPrivacy'],
    ParentType,
    ContextType
  >;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  timestamp?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscussionDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DiscussionDetails'] = ResolversParentTypes['DiscussionDetails']
> = {
  category?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  mimeType?: Resolver<ResolversTypes['MimeType'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  tagset?: Resolver<ResolversTypes['Tagset'], ParentType, ContextType>;
  temporaryLocation?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uploadedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmailChangeApproverResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EmailChangeApprover'] = ResolversParentTypes['EmailChangeApprover']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface EmojiScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Emoji'], any> {
  name: 'Emoji';
}

export type ExternalConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ExternalConfig'] = ResolversParentTypes['ExternalConfig']
> = {
  apiKey?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  assistantId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  model?: Resolver<ResolversTypes['OpenAIModel'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileStorageConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FileStorageConfig'] = ResolversParentTypes['FileStorageConfig']
> = {
  maxFileSize?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Form'] = ResolversParentTypes['Form']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  questions?: Resolver<
    Array<ResolversTypes['FormQuestion']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FormQuestion'] = ResolversParentTypes['FormQuestion']
> = {
  explanation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  required?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  sortOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForumResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Forum'] = ResolversParentTypes['Forum']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  discussion?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Discussion']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.ForumDiscussionArgs, 'ID'>
  >;
  discussionCategories?: Resolver<
    Array<ResolversTypes['ForumDiscussionCategory']>,
    ParentType,
    ContextType
  >;
  discussions?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Discussion']>>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.ForumDiscussionsArgs>
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  mentionableContributors?: Resolver<
    Array<ResolversTypes['ActorFull']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.ForumMentionableContributorsArgs>
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Geo'] = ResolversParentTypes['Geo']
> = {
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  endpoint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoLocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeoLocation'] = ResolversParentTypes['GeoLocation']
> = {
  latitude?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  longitude?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Groupable'] = ResolversParentTypes['Groupable']
> = {
  __resolveType: TypeResolveFn<
    'Community' | 'Organization',
    ParentType,
    ContextType
  >;
  groups?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['UserGroup']>>,
    ParentType,
    ContextType
  >;
};

export type ISearchCategoryResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ISearchCategoryResult'] = ResolversParentTypes['ISearchCategoryResult']
> = {
  cursor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['SearchCursor']>,
    ParentType,
    ContextType
  >;
  results?: Resolver<
    Array<ResolversTypes['SearchResult']>,
    ParentType,
    ContextType
  >;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ISearchResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ISearchResults'] = ResolversParentTypes['ISearchResults']
> = {
  actorResults?: Resolver<
    ResolversTypes['ISearchCategoryResult'],
    ParentType,
    ContextType
  >;
  calloutResults?: Resolver<
    ResolversTypes['ISearchCategoryResult'],
    ParentType,
    ContextType
  >;
  contributionResults?: Resolver<
    ResolversTypes['ISearchCategoryResult'],
    ParentType,
    ContextType
  >;
  framingResults?: Resolver<
    ResolversTypes['ISearchCategoryResult'],
    ParentType,
    ContextType
  >;
  spaceResults?: Resolver<
    ResolversTypes['ISearchCategoryResult'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotification'] = ResolversParentTypes['InAppNotification']
> = {
  category?: Resolver<
    ResolversTypes['NotificationEventCategory'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  payload?: Resolver<
    ResolversTypes['InAppNotificationPayload'],
    ParentType,
    ContextType
  >;
  receiver?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  state?: Resolver<
    ResolversTypes['NotificationEventInAppState'],
    ParentType,
    ContextType
  >;
  triggeredAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  triggeredBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Actor']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['NotificationEvent'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayload'] = ResolversParentTypes['InAppNotificationPayload']
> = {
  __resolveType: TypeResolveFn<
    | 'InAppNotificationPayloadOrganizationMessageDirect'
    | 'InAppNotificationPayloadOrganizationMessageRoom'
    | 'InAppNotificationPayloadPlatformForumDiscussion'
    | 'InAppNotificationPayloadPlatformGlobalRoleChange'
    | 'InAppNotificationPayloadPlatformUser'
    | 'InAppNotificationPayloadPlatformUserMessageRoom'
    | 'InAppNotificationPayloadPlatformUserProfileRemoved'
    | 'InAppNotificationPayloadSpace'
    | 'InAppNotificationPayloadSpaceCollaborationCallout'
    | 'InAppNotificationPayloadSpaceCollaborationCalloutComment'
    | 'InAppNotificationPayloadSpaceCollaborationCalloutPostComment'
    | 'InAppNotificationPayloadSpaceCollaborationCalloutReaction'
    | 'InAppNotificationPayloadSpaceCollaborationPoll'
    | 'InAppNotificationPayloadSpaceCommunicationMessageDirect'
    | 'InAppNotificationPayloadSpaceCommunicationUpdate'
    | 'InAppNotificationPayloadSpaceCommunityActor'
    | 'InAppNotificationPayloadSpaceCommunityApplication'
    | 'InAppNotificationPayloadSpaceCommunityCalendarEvent'
    | 'InAppNotificationPayloadSpaceCommunityCalendarEventComment'
    | 'InAppNotificationPayloadSpaceCommunityInvitation'
    | 'InAppNotificationPayloadSpaceCommunityInvitationPlatform'
    | 'InAppNotificationPayloadUserMessageDirect'
    | 'InAppNotificationPayloadVirtualContributor',
    ParentType,
    ContextType
  >;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
};

export type InAppNotificationPayloadOrganizationMessageDirectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadOrganizationMessageDirect'] = ResolversParentTypes['InAppNotificationPayloadOrganizationMessageDirect']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadOrganizationMessageRoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadOrganizationMessageRoom'] = ResolversParentTypes['InAppNotificationPayloadOrganizationMessageRoom']
> = {
  comment?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  organization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType
  >;
  roomID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadPlatformForumDiscussionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadPlatformForumDiscussion'] = ResolversParentTypes['InAppNotificationPayloadPlatformForumDiscussion']
> = {
  comment?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  discussion?: Resolver<
    ResolversTypes['DiscussionDetails'],
    ParentType,
    ContextType
  >;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadPlatformGlobalRoleChangeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadPlatformGlobalRoleChange'] = ResolversParentTypes['InAppNotificationPayloadPlatformGlobalRoleChange']
> = {
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  user?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadPlatformUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadPlatformUser'] = ResolversParentTypes['InAppNotificationPayloadPlatformUser']
> = {
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadPlatformUserMessageRoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadPlatformUserMessageRoom'] = ResolversParentTypes['InAppNotificationPayloadPlatformUserMessageRoom']
> = {
  messageDetails?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['MessageDetails']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadPlatformUserProfileRemovedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadPlatformUserProfileRemoved'] = ResolversParentTypes['InAppNotificationPayloadPlatformUserProfileRemoved']
> = {
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  userDisplayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpace'] = ResolversParentTypes['InAppNotificationPayloadSpace']
> = {
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCollaborationCalloutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCallout'] = ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCallout']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCollaborationCalloutCommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCalloutComment'] = ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCalloutComment']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  messageDetails?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['MessageDetails']>,
    ParentType,
    ContextType
  >;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCollaborationCalloutPostCommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCalloutPostComment'] = ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCalloutPostComment']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  messageDetails?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['MessageDetails']>,
    ParentType,
    ContextType
  >;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCollaborationCalloutReactionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCalloutReaction'] = ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationCalloutReaction']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  emoji?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCollaborationPollResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationPoll'] = ResolversParentTypes['InAppNotificationPayloadSpaceCollaborationPoll']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  poll?: Resolver<ResolversTypes['Poll'], ParentType, ContextType>;
  pollID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCommunicationMessageDirectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCommunicationMessageDirect'] = ResolversParentTypes['InAppNotificationPayloadSpaceCommunicationMessageDirect']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCommunicationUpdateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCommunicationUpdate'] = ResolversParentTypes['InAppNotificationPayloadSpaceCommunicationUpdate']
> = {
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  update?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCommunityActorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCommunityActor'] = ResolversParentTypes['InAppNotificationPayloadSpaceCommunityActor']
> = {
  actor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCommunityApplicationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCommunityApplication'] = ResolversParentTypes['InAppNotificationPayloadSpaceCommunityApplication']
> = {
  application?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType
  >;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCommunityCalendarEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCommunityCalendarEvent'] = ResolversParentTypes['InAppNotificationPayloadSpaceCommunityCalendarEvent']
> = {
  calendarEvent?: Resolver<
    ResolversTypes['CalendarEvent'],
    ParentType,
    ContextType
  >;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCommunityCalendarEventCommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCommunityCalendarEventComment'] = ResolversParentTypes['InAppNotificationPayloadSpaceCommunityCalendarEventComment']
> = {
  calendarEvent?: Resolver<
    ResolversTypes['CalendarEvent'],
    ParentType,
    ContextType
  >;
  commentText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCommunityInvitationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCommunityInvitation'] = ResolversParentTypes['InAppNotificationPayloadSpaceCommunityInvitation']
> = {
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadSpaceCommunityInvitationPlatformResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadSpaceCommunityInvitationPlatform'] = ResolversParentTypes['InAppNotificationPayloadSpaceCommunityInvitationPlatform']
> = {
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadUserMessageDirectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadUserMessageDirect'] = ResolversParentTypes['InAppNotificationPayloadUserMessageDirect']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  user?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InAppNotificationPayloadVirtualContributorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InAppNotificationPayloadVirtualContributor'] = ResolversParentTypes['InAppNotificationPayloadVirtualContributor']
> = {
  actor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType
  >;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['NotificationEventPayload'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InnovationFlowResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InnovationFlow'] = ResolversParentTypes['InnovationFlow']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currentState?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['InnovationFlowState']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  settings?: Resolver<
    ResolversTypes['InnovationFlowSettings'],
    ParentType,
    ContextType
  >;
  states?: Resolver<
    Array<ResolversTypes['InnovationFlowState']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InnovationFlowSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InnovationFlowSettings'] = ResolversParentTypes['InnovationFlowSettings']
> = {
  maximumNumberOfStates?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  minimumNumberOfStates?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InnovationFlowStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InnovationFlowState'] = ResolversParentTypes['InnovationFlowState']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  defaultCalloutTemplate?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Template']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  settings?: Resolver<
    ResolversTypes['InnovationFlowStateSettings'],
    ParentType,
    ContextType
  >;
  sortOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InnovationFlowStateSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InnovationFlowStateSettings'] = ResolversParentTypes['InnovationFlowStateSettings']
> = {
  allowNewCallouts?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  descriptionDisplayMode?: Resolver<
    ResolversTypes['CalloutDescriptionDisplayMode'],
    ParentType,
    ContextType
  >;
  showPublishDetails?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  sidebar?: Resolver<
    Array<ResolversTypes['SidebarWidget']>,
    ParentType,
    ContextType
  >;
  visible?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InnovationHubResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InnovationHub'] = ResolversParentTypes['InnovationHub']
> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  innovationPackListFilter?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['InnovationPack']>>,
    ParentType,
    ContextType
  >;
  listedInStore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  searchVisibility?: Resolver<
    ResolversTypes['SearchVisibility'],
    ParentType,
    ContextType
  >;
  spaceListFilter?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Space']>>,
    ParentType,
    ContextType
  >;
  spaceVisibilityFilter?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['SpaceVisibility']>,
    ParentType,
    ContextType
  >;
  subdomain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['InnovationHubType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  virtualContributorListFilter?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['VirtualContributor']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InnovationPackResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InnovationPack'] = ResolversParentTypes['InnovationPack']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  listedInStore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  searchVisibility?: Resolver<
    ResolversTypes['SearchVisibility'],
    ParentType,
    ContextType
  >;
  templatesSet?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['TemplatesSet']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InputCreatorQueryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InputCreatorQueryResults'] = ResolversParentTypes['InputCreatorQueryResults']
> = {
  callout?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCalloutData']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.InputCreatorQueryResultsCalloutArgs, 'ID'>
  >;
  collaboration?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCollaborationData']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.InputCreatorQueryResultsCollaborationArgs, 'ID'>
  >;
  communityGuidelines?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateCommunityGuidelinesData']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.InputCreatorQueryResultsCommunityGuidelinesArgs,
      'ID'
    >
  >;
  innovationFlow?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateInnovationFlowData']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.InputCreatorQueryResultsInnovationFlowArgs, 'ID'>
  >;
  whiteboard?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CreateWhiteboardData']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.InputCreatorQueryResultsWhiteboardArgs, 'ID'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvitationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Invitation'] = ResolversParentTypes['Invitation']
> = {
  actor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  extraRoles?: Resolver<
    Array<ResolversTypes['RoleName']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  invitedToParent?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  isFinalized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lifecycle?: Resolver<ResolversTypes['Lifecycle'], ParentType, ContextType>;
  nextEvents?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggestedLanguage?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  welcomeMessage?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KnowledgeBaseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KnowledgeBase'] = ResolversParentTypes['KnowledgeBase']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  calloutsSet?: Resolver<
    ResolversTypes['CalloutsSet'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KratosIdentityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KratosIdentity'] = ResolversParentTypes['KratosIdentity']
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  verificationStatus?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LanguageConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LanguageConfig'] = ResolversParentTypes['LanguageConfig']
> = {
  default?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eligible?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LatestReleaseDiscussionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LatestReleaseDiscussion'] = ResolversParentTypes['LatestReleaseDiscussion']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LibraryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Library'] = ResolversParentTypes['Library']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  innovationHubs?: Resolver<
    Array<ResolversTypes['InnovationHub']>,
    ParentType,
    ContextType
  >;
  innovationPacks?: Resolver<
    Array<ResolversTypes['InnovationPack']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.LibraryInnovationPacksArgs>
  >;
  innovationPacksPaginated?: Resolver<
    ResolversTypes['PaginatedInnovationPacks'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.LibraryInnovationPacksPaginatedArgs>
  >;
  templates?: Resolver<
    Array<ResolversTypes['TemplateResult']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.LibraryTemplatesArgs>
  >;
  templatesPaginated?: Resolver<
    ResolversTypes['PaginatedLibraryTemplateResults'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.LibraryTemplatesPaginatedArgs>
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  virtualContributors?: Resolver<
    Array<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicenseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['License'] = ResolversParentTypes['License']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  availableEntitlements?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['LicenseEntitlementType']>>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  entitlements?: Resolver<
    Array<ResolversTypes['LicenseEntitlement']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['LicenseType']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicenseEntitlementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LicenseEntitlement'] = ResolversParentTypes['LicenseEntitlement']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dataType?: Resolver<
    ResolversTypes['LicenseEntitlementDataType'],
    ParentType,
    ContextType
  >;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['LicenseEntitlementType'],
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  usage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicensePlanResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LicensePlan'] = ResolversParentTypes['LicensePlan']
> = {
  assignToNewOrganizationAccounts?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  assignToNewUserAccounts?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isFree?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  licenseCredential?: Resolver<
    ResolversTypes['LicensingCredentialBasedCredentialType'],
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pricePerMonth?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  requiresContactSupport?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  requiresPaymentMethod?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  sortOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  trialEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['LicensingCredentialBasedPlanType'],
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicensePolicyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LicensePolicy'] = ResolversParentTypes['LicensePolicy']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credentialRules?: Resolver<
    Array<ResolversTypes['LicensingCredentialBasedPolicyCredentialRule']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicensingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Licensing'] = ResolversParentTypes['Licensing']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  plans?: Resolver<
    Array<ResolversTypes['LicensePlan']>,
    ParentType,
    ContextType
  >;
  policy?: Resolver<ResolversTypes['LicensePolicy'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicensingCredentialBasedPolicyCredentialRuleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LicensingCredentialBasedPolicyCredentialRule'] = ResolversParentTypes['LicensingCredentialBasedPolicyCredentialRule']
> = {
  credentialType?: Resolver<
    ResolversTypes['LicensingCredentialBasedCredentialType'],
    ParentType,
    ContextType
  >;
  grantedEntitlements?: Resolver<
    Array<ResolversTypes['LicensingGrantedEntitlement']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicensingGrantedEntitlementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LicensingGrantedEntitlement'] = ResolversParentTypes['LicensingGrantedEntitlement']
> = {
  limit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['LicenseEntitlementType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LifecycleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Lifecycle'] = ResolversParentTypes['Lifecycle']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface LifecycleDefinitionScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['LifecycleDefinition'], any> {
  name: 'LifecycleDefinition';
}

export type LinkResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']
> = {
  addressLine1?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  addressLine2?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  city?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  country?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  geoLocation?: Resolver<
    ResolversTypes['GeoLocation'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  postalCode?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  stateOrProvince?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LookupByNameQueryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LookupByNameQueryResults'] = ResolversParentTypes['LookupByNameQueryResults']
> = {
  innovationHub?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupByNameQueryResultsInnovationHubArgs,
      'NAMEID'
    >
  >;
  innovationPack?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupByNameQueryResultsInnovationPackArgs,
      'NAMEID'
    >
  >;
  organization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupByNameQueryResultsOrganizationArgs,
      'NAMEID'
    >
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupByNameQueryResultsSpaceArgs, 'NAMEID'>
  >;
  template?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupByNameQueryResultsTemplateArgs,
      'NAMEID' | 'templatesSetID'
    >
  >;
  user?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupByNameQueryResultsUserArgs, 'NAMEID'>
  >;
  virtualContributor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupByNameQueryResultsVirtualContributorArgs,
      'NAMEID'
    >
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LookupMyPrivilegesQueryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LookupMyPrivilegesQueryResults'] = ResolversParentTypes['LookupMyPrivilegesQueryResults']
> = {
  account?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsAccountArgs, 'ID'>
  >;
  application?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsApplicationArgs,
      'ID'
    >
  >;
  calendar?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsCalendarArgs, 'ID'>
  >;
  calendarEvent?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsCalendarEventArgs,
      'ID'
    >
  >;
  callout?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsCalloutArgs, 'ID'>
  >;
  collaboration?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsCollaborationArgs,
      'ID'
    >
  >;
  community?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsCommunityArgs, 'ID'>
  >;
  communityGuidelines?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsCommunityGuidelinesArgs,
      'ID'
    >
  >;
  document?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsDocumentArgs, 'ID'>
  >;
  innovationFlow?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsInnovationFlowArgs,
      'ID'
    >
  >;
  innovationHub?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsInnovationHubArgs,
      'ID'
    >
  >;
  innovationPack?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsInnovationPackArgs,
      'ID'
    >
  >;
  invitation?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsInvitationArgs,
      'ID'
    >
  >;
  license?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsLicenseArgs, 'ID'>
  >;
  post?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsPostArgs, 'ID'>
  >;
  profile?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsProfileArgs, 'ID'>
  >;
  roleSet?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsRoleSetArgs, 'ID'>
  >;
  room?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsRoomArgs, 'ID'>
  >;
  space?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsSpaceArgs, 'ID'>
  >;
  spaceAbout?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsSpaceAboutArgs,
      'ID'
    >
  >;
  storageAggregator?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsStorageAggregatorArgs,
      'ID'
    >
  >;
  storageBucket?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsStorageBucketArgs,
      'ID'
    >
  >;
  template?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsTemplateArgs, 'ID'>
  >;
  templatesManager?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsTemplatesManagerArgs,
      'ID'
    >
  >;
  templatesSet?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsTemplatesSetArgs,
      'ID'
    >
  >;
  user?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupMyPrivilegesQueryResultsUserArgs, 'ID'>
  >;
  virtualContributor?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsVirtualContributorArgs,
      'ID'
    >
  >;
  whiteboard?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupMyPrivilegesQueryResultsWhiteboardArgs,
      'ID'
    >
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LookupQueryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LookupQueryResults'] = ResolversParentTypes['LookupQueryResults']
> = {
  about?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['SpaceAbout']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsAboutArgs, 'ID'>
  >;
  account?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsAccountArgs, 'ID'>
  >;
  application?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Application']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsApplicationArgs, 'ID'>
  >;
  authorizationPolicy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsAuthorizationPolicyArgs, 'ID'>
  >;
  authorizationPrivilegesForUser?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.LookupQueryResultsAuthorizationPrivilegesForUserArgs,
      'authorizationPolicyID' | 'userID'
    >
  >;
  calendar?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Calendar']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsCalendarArgs, 'ID'>
  >;
  calendarEvent?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalendarEvent']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsCalendarEventArgs, 'ID'>
  >;
  callout?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Callout']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsCalloutArgs, 'ID'>
  >;
  calloutsSet?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalloutsSet']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsCalloutsSetArgs, 'ID'>
  >;
  collaboration?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Collaboration']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsCollaborationArgs, 'ID'>
  >;
  community?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Community']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsCommunityArgs, 'ID'>
  >;
  communityGuidelines?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CommunityGuidelines']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsCommunityGuidelinesArgs, 'ID'>
  >;
  contribution?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CalloutContribution']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsContributionArgs, 'ID'>
  >;
  conversation?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Conversation']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsConversationArgs, 'ID'>
  >;
  document?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Document']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsDocumentArgs, 'ID'>
  >;
  innovationFlow?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['InnovationFlow']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsInnovationFlowArgs, 'ID'>
  >;
  innovationHub?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['InnovationHub']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsInnovationHubArgs, 'ID'>
  >;
  innovationPack?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['InnovationPack']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsInnovationPackArgs, 'ID'>
  >;
  invitation?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Invitation']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsInvitationArgs, 'ID'>
  >;
  knowledgeBase?: Resolver<
    ResolversTypes['KnowledgeBase'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsKnowledgeBaseArgs, 'ID'>
  >;
  license?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['License']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsLicenseArgs, 'ID'>
  >;
  memo?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Memo']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsMemoArgs, 'ID'>
  >;
  myPrivileges?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['LookupMyPrivilegesQueryResults']>,
    ParentType,
    ContextType
  >;
  organization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsOrganizationArgs, 'ID'>
  >;
  platformInvitation?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PlatformInvitation']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsPlatformInvitationArgs, 'ID'>
  >;
  post?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsPostArgs, 'ID'>
  >;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsProfileArgs, 'ID'>
  >;
  roleSet?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['RoleSet']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsRoleSetArgs, 'ID'>
  >;
  room?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Room']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsRoomArgs, 'ID'>
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsSpaceArgs, 'ID'>
  >;
  storageAggregator?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['StorageAggregator']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsStorageAggregatorArgs, 'ID'>
  >;
  storageBucket?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['StorageBucket']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsStorageBucketArgs, 'ID'>
  >;
  template?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Template']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsTemplateArgs, 'ID'>
  >;
  templateContentSpace?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['TemplateContentSpace']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsTemplateContentSpaceArgs, 'ID'>
  >;
  templatesManager?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['TemplatesManager']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsTemplatesManagerArgs, 'ID'>
  >;
  templatesSet?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['TemplatesSet']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsTemplatesSetArgs, 'ID'>
  >;
  user?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsUserArgs, 'ID'>
  >;
  virtualContributor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsVirtualContributorArgs, 'ID'>
  >;
  whiteboard?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Whiteboard']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.LookupQueryResultsWhiteboardArgs, 'ID'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MarkdownScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Markdown'], any> {
  name: 'Markdown';
}

export type McpApiKeyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['McpApiKey'] = ResolversParentTypes['McpApiKey']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expiresAt?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lastUsedAt?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  lastUsedFromIp?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operations?: Resolver<
    Array<ResolversTypes['McpApiKeyOperation']>,
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes['McpApiKeyStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type McpApiKeyMintResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['McpApiKeyMintResult'] = ResolversParentTypes['McpApiKeyMintResult']
> = {
  apiKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['McpApiKey'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeConversationsResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MeConversationsResult'] = ResolversParentTypes['MeConversationsResult']
> = {
  conversations?: Resolver<
    Array<ResolversTypes['Conversation']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeQueryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MeQueryResults'] = ResolversParentTypes['MeQueryResults']
> = {
  communityApplications?: Resolver<
    Array<ResolversTypes['CommunityApplicationResult']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.MeQueryResultsCommunityApplicationsArgs>
  >;
  communityInvitations?: Resolver<
    Array<ResolversTypes['CommunityInvitationResult']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.MeQueryResultsCommunityInvitationsArgs>
  >;
  communityInvitationsCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.MeQueryResultsCommunityInvitationsCountArgs>
  >;
  conversations?: Resolver<
    ResolversTypes['MeConversationsResult'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mcpApiKeys?: Resolver<
    Array<ResolversTypes['McpApiKey']>,
    ParentType,
    ContextType
  >;
  mySpaces?: Resolver<
    Array<ResolversTypes['MySpaceResults']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.MeQueryResultsMySpacesArgs>
  >;
  notifications?: Resolver<
    ResolversTypes['PaginatedInAppNotifications'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.MeQueryResultsNotificationsArgs>
  >;
  notificationsUnreadCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  spaceMembershipsFlat?: Resolver<
    Array<ResolversTypes['CommunityMembershipResult']>,
    ParentType,
    ContextType
  >;
  spaceMembershipsHierarchical?: Resolver<
    Array<ResolversTypes['CommunityMembershipResult']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.MeQueryResultsSpaceMembershipsHierarchicalArgs>
  >;
  user?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaGalleryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MediaGallery'] = ResolversParentTypes['MediaGallery']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  storageBucket?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['StorageBucket']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  visuals?: Resolver<Array<ResolversTypes['Visual']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Memo'] = ResolversParentTypes['Memo']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  contentUpdatePolicy?: Resolver<
    ResolversTypes['ContentUpdatePolicy'],
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isMultiUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  markdown?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']
> = {
  id?: Resolver<ResolversTypes['MessageID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['Markdown'], ParentType, ContextType>;
  reactions?: Resolver<
    Array<ResolversTypes['Reaction']>,
    ParentType,
    ContextType
  >;
  sender?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Actor']>,
    ParentType,
    ContextType
  >;
  threadID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['MessageID']>,
    ParentType,
    ContextType
  >;
  timestamp?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MessageDetails'] = ResolversParentTypes['MessageDetails']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['MessageParent'], ParentType, ContextType>;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MessageIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['MessageID'], any> {
  name: 'MessageID';
}

export type MessageParentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MessageParent'] = ResolversParentTypes['MessageParent']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessagingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Messaging'] = ResolversParentTypes['Messaging']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetadataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Metadata'] = ResolversParentTypes['Metadata']
> = {
  services?: Resolver<
    Array<ResolversTypes['ServiceMetadata']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MigrateEmbeddingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MigrateEmbeddings'] = ResolversParentTypes['MigrateEmbeddings']
> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelCardAiEngineResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModelCardAiEngineResult'] = ResolversParentTypes['ModelCardAiEngineResult']
> = {
  additionalTechnicalDetails?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  areAnswersRestrictedToBodyOfKnowledge?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  canAccessWebWhenAnswering?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  hostingLocation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isExternal?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isInteractionDataUsedForTraining?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  isUsingOpenWeightsModel?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelCardMonitoringResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModelCardMonitoringResult'] = ResolversParentTypes['ModelCardMonitoringResult']
> = {
  isUsageMonitoredByAlkemio?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelCardSpaceUsageResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModelCardSpaceUsageResult'] = ResolversParentTypes['ModelCardSpaceUsageResult']
> = {
  flags?: Resolver<
    Array<ResolversTypes['VirtualContributorModelCardFlag']>,
    ParentType,
    ContextType
  >;
  modelCardEntry?: Resolver<
    ResolversTypes['VirtualContributorModelCardEntry'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addClassificationEntryFromTemplate?: Resolver<
    ResolversTypes['ClassificationEntry'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAddClassificationEntryFromTemplateArgs,
      'classificationData'
    >
  >;
  addIframeAllowedURL?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAddIframeAllowedUrlArgs, 'whitelistedURL'>
  >;
  addNotificationEmailToBlacklist?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAddNotificationEmailToBlacklistArgs,
      'input'
    >
  >;
  addPollOption?: Resolver<
    ResolversTypes['Poll'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAddPollOptionArgs, 'optionData'>
  >;
  addReactionToCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAddReactionToCalloutArgs, 'reactionData'>
  >;
  addReactionToMessageInRoom?: Resolver<
    ResolversTypes['Reaction'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAddReactionToMessageInRoomArgs,
      'reactionData'
    >
  >;
  addVisualToMediaGallery?: Resolver<
    ResolversTypes['Visual'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAddVisualToMediaGalleryArgs, 'addData'>
  >;
  adminCommunicationEnsureAccessToCommunications?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAdminCommunicationEnsureAccessToCommunicationsArgs,
      'communicationData'
    >
  >;
  adminCommunicationMigrateOrphanedConversations?: Resolver<
    ResolversTypes['CommunicationAdminMigrateRoomsResult'],
    ParentType,
    ContextType
  >;
  adminCommunicationRemoveOrphanedRoom?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAdminCommunicationRemoveOrphanedRoomArgs,
      'orphanedRoomData'
    >
  >;
  adminCommunicationSyncSpaceHierarchy?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  adminCommunicationUpdateRoomState?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAdminCommunicationUpdateRoomStateArgs,
      'roomStateData'
    >
  >;
  adminIdentityDeleteKratosIdentity?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAdminIdentityDeleteKratosIdentityArgs,
      'kratosIdentityId'
    >
  >;
  adminInAppNotificationsPrune?: Resolver<
    ResolversTypes['PruneInAppNotificationAdminResult'],
    ParentType,
    ContextType
  >;
  adminLicensePolicyCreateCredentialRule?: Resolver<
    ResolversTypes['LicensingCredentialBasedPolicyCredentialRule'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAdminLicensePolicyCreateCredentialRuleArgs,
      'createData'
    >
  >;
  adminLicensePolicyDeleteCredentialRule?: Resolver<
    ResolversTypes['LicensingCredentialBasedPolicyCredentialRule'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAdminLicensePolicyDeleteCredentialRuleArgs,
      'deleteData'
    >
  >;
  adminLicensePolicyUpdateCredentialRule?: Resolver<
    ResolversTypes['LicensingCredentialBasedPolicyCredentialRule'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAdminLicensePolicyUpdateCredentialRuleArgs,
      'updateData'
    >
  >;
  adminRevokeMcpApiKey?: Resolver<
    ResolversTypes['McpApiKey'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAdminRevokeMcpApiKeyArgs, 'revokeData'>
  >;
  adminSearchIngestFromScratch?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  adminUpdateContributorAvatars?: Resolver<
    ResolversTypes['Profile'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAdminUpdateContributorAvatarsArgs,
      'profileID'
    >
  >;
  adminUpdateGeoLocationData?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  adminUserAccountDelete?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAdminUserAccountDeleteArgs, 'userID'>
  >;
  adminUserEmailChange?: Resolver<
    ResolversTypes['UserEmailChangeResult'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAdminUserEmailChangeArgs,
      'adminUserEmailChangeData'
    >
  >;
  adminUserEmailChangeDriftResolve?: Resolver<
    ResolversTypes['UserEmailChangeResult'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAdminUserEmailChangeDriftResolveArgs,
      'adminUserEmailChangeDriftResolveData'
    >
  >;
  adminWingbackCreateTestCustomer?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  adminWingbackGetCustomerEntitlements?: Resolver<
    Array<ResolversTypes['LicensingGrantedEntitlement']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAdminWingbackGetCustomerEntitlementsArgs,
      'customerID'
    >
  >;
  aiServerAuthorizationPolicyReset?: Resolver<
    ResolversTypes['AiServer'],
    ParentType,
    ContextType
  >;
  aiServerCreateAiPersona?: Resolver<
    ResolversTypes['AiPersona'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAiServerCreateAiPersonaArgs,
      'aiPersonaData'
    >
  >;
  aiServerDeleteAiPersona?: Resolver<
    ResolversTypes['AiPersona'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAiServerDeleteAiPersonaArgs, 'deleteData'>
  >;
  aiServerUpdateAiPersona?: Resolver<
    ResolversTypes['AiPersona'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAiServerUpdateAiPersonaArgs,
      'aiPersonaData'
    >
  >;
  applyForEntryRoleOnRoleSet?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationApplyForEntryRoleOnRoleSetArgs,
      'applicationData'
    >
  >;
  assignConversationMember?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAssignConversationMemberArgs,
      'memberData'
    >
  >;
  assignLicensePlanToAccount?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAssignLicensePlanToAccountArgs,
      'planData'
    >
  >;
  assignLicensePlanToSpace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAssignLicensePlanToSpaceArgs, 'planData'>
  >;
  assignPlatformRoleToUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAssignPlatformRoleToUserArgs, 'roleData'>
  >;
  assignRole?: Resolver<
    ResolversTypes['Actor'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAssignRoleArgs, 'roleData'>
  >;
  assignRoleToOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAssignRoleToOrganizationArgs, 'roleData'>
  >;
  assignRoleToUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAssignRoleToUserArgs, 'roleData'>
  >;
  assignRoleToVirtualContributor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAssignRoleToVirtualContributorArgs,
      'roleData'
    >
  >;
  assignUserToGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationAssignUserToGroupArgs, 'membershipData'>
  >;
  authorizationPlatformRolesAccessReset?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  authorizationPolicyResetAll?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  authorizationPolicyResetOnAccount?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAuthorizationPolicyResetOnAccountArgs,
      'authorizationResetData'
    >
  >;
  authorizationPolicyResetOnOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAuthorizationPolicyResetOnOrganizationArgs,
      'authorizationResetData'
    >
  >;
  authorizationPolicyResetOnPlatform?: Resolver<
    ResolversTypes['Platform'],
    ParentType,
    ContextType
  >;
  authorizationPolicyResetOnUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAuthorizationPolicyResetOnUserArgs,
      'authorizationResetData'
    >
  >;
  authorizationPolicyResetToGlobalAdminsAccess?: Resolver<
    ResolversTypes['Authorization'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationAuthorizationPolicyResetToGlobalAdminsAccessArgs,
      'authorizationID'
    >
  >;
  castPollVote?: Resolver<
    ResolversTypes['Poll'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCastPollVoteArgs, 'voteData'>
  >;
  cleanupCollections?: Resolver<
    ResolversTypes['MigrateEmbeddings'],
    ParentType,
    ContextType
  >;
  convertSpaceL1ToSpaceL0?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationConvertSpaceL1ToSpaceL0Args,
      'convertData'
    >
  >;
  convertSpaceL1ToSpaceL2?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationConvertSpaceL1ToSpaceL2Args,
      'convertData'
    >
  >;
  convertSpaceL2ToSpaceL1?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationConvertSpaceL2ToSpaceL1Args,
      'convertData'
    >
  >;
  convertVirtualContributorToUseKnowledgeBase?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationConvertVirtualContributorToUseKnowledgeBaseArgs,
      'conversionData'
    >
  >;
  createCalloutOnCalloutsSet?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateCalloutOnCalloutsSetArgs,
      'calloutData'
    >
  >;
  createClassificationEntry?: Resolver<
    ResolversTypes['ClassificationEntry'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateClassificationEntryArgs,
      'classificationData'
    >
  >;
  createContributionOnCallout?: Resolver<
    ResolversTypes['CalloutContribution'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateContributionOnCalloutArgs,
      'contributionData'
    >
  >;
  createConversation?: Resolver<
    ResolversTypes['Conversation'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateConversationArgs,
      'conversationData'
    >
  >;
  createDiscussion?: Resolver<
    ResolversTypes['Discussion'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCreateDiscussionArgs, 'createData'>
  >;
  createEventOnCalendar?: Resolver<
    ResolversTypes['CalendarEvent'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCreateEventOnCalendarArgs, 'eventData'>
  >;
  createGroupOnCommunity?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCreateGroupOnCommunityArgs, 'groupData'>
  >;
  createGroupOnOrganization?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateGroupOnOrganizationArgs,
      'groupData'
    >
  >;
  createInnovationHub?: Resolver<
    ResolversTypes['InnovationHub'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCreateInnovationHubArgs, 'createData'>
  >;
  createInnovationPack?: Resolver<
    ResolversTypes['InnovationPack'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateInnovationPackArgs,
      'innovationPackData'
    >
  >;
  createLicensePlan?: Resolver<
    ResolversTypes['LicensePlan'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCreateLicensePlanArgs, 'planData'>
  >;
  createOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateOrganizationArgs,
      'organizationData'
    >
  >;
  createReferenceOnProfile?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateReferenceOnProfileArgs,
      'referenceInput'
    >
  >;
  createSpace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCreateSpaceArgs, 'spaceData'>
  >;
  createStateOnInnovationFlow?: Resolver<
    ResolversTypes['InnovationFlowState'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateStateOnInnovationFlowArgs,
      'stateData'
    >
  >;
  createSubspace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCreateSubspaceArgs, 'subspaceData'>
  >;
  createTagsetOnProfile?: Resolver<
    ResolversTypes['Tagset'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCreateTagsetOnProfileArgs, 'tagsetData'>
  >;
  createTaskColumnOnCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateTaskColumnOnCalloutArgs,
      'columnData'
    >
  >;
  createTemplate?: Resolver<
    ResolversTypes['Template'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCreateTemplateArgs, 'templateData'>
  >;
  createTemplateFromContentSpace?: Resolver<
    ResolversTypes['Template'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateTemplateFromContentSpaceArgs,
      'templateData'
    >
  >;
  createTemplateFromSpace?: Resolver<
    ResolversTypes['Template'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateTemplateFromSpaceArgs,
      'templateData'
    >
  >;
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCreateUserArgs, 'userData'>
  >;
  createVirtualContributor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateVirtualContributorArgs,
      'virtualContributorData'
    >
  >;
  createWhiteboardDraftOnCalloutsSet?: Resolver<
    ResolversTypes['UUID'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateWhiteboardDraftOnCalloutsSetArgs,
      'draftData'
    >
  >;
  createWhiteboardDraftOnTemplatesSet?: Resolver<
    ResolversTypes['UUID'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationCreateWhiteboardDraftOnTemplatesSetArgs,
      'draftData'
    >
  >;
  createWingbackAccount?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationCreateWingbackAccountArgs, 'accountID'>
  >;
  deleteApplication?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteApplicationArgs, 'deleteData'>
  >;
  deleteCalendarEvent?: Resolver<
    ResolversTypes['CalendarEvent'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteCalendarEventArgs, 'deleteData'>
  >;
  deleteCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteCalloutArgs, 'deleteData'>
  >;
  deleteClassificationEntry?: Resolver<
    ResolversTypes['ClassificationEntry'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationDeleteClassificationEntryArgs,
      'classificationData'
    >
  >;
  deleteCollaboraDocument?: Resolver<
    ResolversTypes['CollaboraDocument'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteCollaboraDocumentArgs, 'deleteData'>
  >;
  deleteContribution?: Resolver<
    ResolversTypes['CalloutContribution'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteContributionArgs, 'deleteData'>
  >;
  deleteConversation?: Resolver<
    ResolversTypes['Conversation'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteConversationArgs, 'deleteData'>
  >;
  deleteDiscussion?: Resolver<
    ResolversTypes['Discussion'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteDiscussionArgs, 'deleteData'>
  >;
  deleteDocument?: Resolver<
    ResolversTypes['Document'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteDocumentArgs, 'deleteData'>
  >;
  deleteInnovationHub?: Resolver<
    ResolversTypes['InnovationHub'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteInnovationHubArgs, 'deleteData'>
  >;
  deleteInnovationPack?: Resolver<
    ResolversTypes['InnovationPack'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteInnovationPackArgs, 'deleteData'>
  >;
  deleteInvitation?: Resolver<
    ResolversTypes['Invitation'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteInvitationArgs, 'deleteData'>
  >;
  deleteLicensePlan?: Resolver<
    ResolversTypes['LicensePlan'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteLicensePlanArgs, 'deleteData'>
  >;
  deleteLink?: Resolver<
    ResolversTypes['Link'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteLinkArgs, 'deleteData'>
  >;
  deleteMemo?: Resolver<
    ResolversTypes['Memo'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteMemoArgs, 'memoData'>
  >;
  deleteOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteOrganizationArgs, 'deleteData'>
  >;
  deletePlatformInvitation?: Resolver<
    ResolversTypes['PlatformInvitation'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationDeletePlatformInvitationArgs,
      'deleteData'
    >
  >;
  deletePost?: Resolver<
    ResolversTypes['Post'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeletePostArgs, 'deleteData'>
  >;
  deleteReference?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteReferenceArgs, 'deleteData'>
  >;
  deleteSpace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteSpaceArgs, 'deleteData'>
  >;
  deleteStateOnInnovationFlow?: Resolver<
    ResolversTypes['InnovationFlowState'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationDeleteStateOnInnovationFlowArgs,
      'stateData'
    >
  >;
  deleteStorageBucket?: Resolver<
    ResolversTypes['StorageBucket'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteStorageBucketArgs, 'deleteData'>
  >;
  deleteTaskColumnOnCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationDeleteTaskColumnOnCalloutArgs,
      'columnData'
    >
  >;
  deleteTemplate?: Resolver<
    ResolversTypes['Template'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteTemplateArgs, 'deleteData'>
  >;
  deleteUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteUserArgs, 'deleteData'>
  >;
  deleteUserGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteUserGroupArgs, 'deleteData'>
  >;
  deleteVirtualContributor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationDeleteVirtualContributorArgs,
      'deleteData'
    >
  >;
  deleteVisualFromMediaGallery?: Resolver<
    ResolversTypes['Visual'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationDeleteVisualFromMediaGalleryArgs,
      'deleteData'
    >
  >;
  deleteWhiteboard?: Resolver<
    ResolversTypes['Whiteboard'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteWhiteboardArgs, 'whiteboardData'>
  >;
  deleteWhiteboardDraft?: Resolver<
    ResolversTypes['UUID'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationDeleteWhiteboardDraftArgs, 'whiteboardID'>
  >;
  enablePushSubscription?: Resolver<
    ResolversTypes['PushSubscription'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationEnablePushSubscriptionArgs,
      'subscriptionData'
    >
  >;
  eventOnApplication?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationEventOnApplicationArgs, 'eventData'>
  >;
  eventOnInvitation?: Resolver<
    ResolversTypes['Invitation'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationEventOnInvitationArgs, 'eventData'>
  >;
  eventOnOrganizationVerification?: Resolver<
    ResolversTypes['OrganizationVerification'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationEventOnOrganizationVerificationArgs,
      'eventData'
    >
  >;
  grantCredentialToActor?: Resolver<
    ResolversTypes['Credential'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationGrantCredentialToActorArgs,
      'actorID' | 'credentialType'
    >
  >;
  grantCredentialToOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationGrantCredentialToOrganizationArgs,
      'grantCredentialData'
    >
  >;
  grantCredentialToUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationGrantCredentialToUserArgs,
      'grantCredentialData'
    >
  >;
  importCollaboraDocument?: Resolver<
    ResolversTypes['CalloutContribution'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationImportCollaboraDocumentArgs,
      'file' | 'uploadData'
    >
  >;
  inviteForEntryRoleOnRoleSet?: Resolver<
    Array<ResolversTypes['RoleSetInvitationResult']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationInviteForEntryRoleOnRoleSetArgs,
      'invitationData'
    >
  >;
  joinRoleSet?: Resolver<
    ResolversTypes['RoleSet'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationJoinRoleSetArgs, 'joinData'>
  >;
  leaveConversation?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationLeaveConversationArgs, 'leaveData'>
  >;
  licenseResetOnAccount?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationLicenseResetOnAccountArgs, 'resetData'>
  >;
  markMessageAsReadInRoom?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationMarkMessageAsReadInRoomArgs,
      'messageData'
    >
  >;
  markNotificationsAsRead?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.MutationMarkNotificationsAsReadArgs>
  >;
  markNotificationsAsUnread?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.MutationMarkNotificationsAsUnreadArgs>
  >;
  migrateLegacyMemoContent?: Resolver<
    ResolversTypes['CollaborationMigrationResult'],
    ParentType,
    ContextType
  >;
  migrateLegacyWhiteboardContent?: Resolver<
    ResolversTypes['CollaborationMigrationResult'],
    ParentType,
    ContextType
  >;
  mintMcpApiKey?: Resolver<
    ResolversTypes['McpApiKeyMintResult'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationMintMcpApiKeyArgs, 'mintData'>
  >;
  moveContributionToCallout?: Resolver<
    ResolversTypes['CalloutContribution'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationMoveContributionToCalloutArgs,
      'moveContributionData'
    >
  >;
  moveSpaceL1ToSpaceL0?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationMoveSpaceL1ToSpaceL0Args, 'moveData'>
  >;
  moveSpaceL1ToSpaceL2?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationMoveSpaceL1ToSpaceL2Args, 'moveData'>
  >;
  moveSpaceL2ToSpaceL1?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationMoveSpaceL2ToSpaceL1Args, 'moveData'>
  >;
  moveTaskToColumn?: Resolver<
    ResolversTypes['CalloutContribution'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationMoveTaskToColumnArgs, 'moveData'>
  >;
  refreshAllBodiesOfKnowledge?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  refreshVirtualContributorBodyOfKnowledge?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRefreshVirtualContributorBodyOfKnowledgeArgs,
      'refreshData'
    >
  >;
  removeCommunityGuidelinesContent?: Resolver<
    ResolversTypes['CommunityGuidelines'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRemoveCommunityGuidelinesContentArgs,
      'communityGuidelinesData'
    >
  >;
  removeConversationMember?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRemoveConversationMemberArgs,
      'memberData'
    >
  >;
  removeDefaultCalloutTemplateOnInnovationFlowState?: Resolver<
    ResolversTypes['InnovationFlowState'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRemoveDefaultCalloutTemplateOnInnovationFlowStateArgs,
      'removeData'
    >
  >;
  removeIframeAllowedURL?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRemoveIframeAllowedUrlArgs,
      'whitelistedURL'
    >
  >;
  removeMessageOnRoom?: Resolver<
    ResolversTypes['MessageID'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationRemoveMessageOnRoomArgs, 'messageData'>
  >;
  removeNotificationEmailFromBlacklist?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRemoveNotificationEmailFromBlacklistArgs,
      'input'
    >
  >;
  removePlatformRoleFromUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRemovePlatformRoleFromUserArgs,
      'roleData'
    >
  >;
  removePollOption?: Resolver<
    ResolversTypes['Poll'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationRemovePollOptionArgs, 'optionData'>
  >;
  removePollVote?: Resolver<
    ResolversTypes['Poll'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationRemovePollVoteArgs, 'voteData'>
  >;
  removeReactionFromCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRemoveReactionFromCalloutArgs,
      'reactionData'
    >
  >;
  removeReactionToMessageInRoom?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRemoveReactionToMessageInRoomArgs,
      'reactionData'
    >
  >;
  removeRole?: Resolver<
    ResolversTypes['Actor'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationRemoveRoleArgs, 'roleData'>
  >;
  removeRoleFromOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRemoveRoleFromOrganizationArgs,
      'roleData'
    >
  >;
  removeRoleFromUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationRemoveRoleFromUserArgs, 'roleData'>
  >;
  removeRoleFromVirtualContributor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRemoveRoleFromVirtualContributorArgs,
      'roleData'
    >
  >;
  removeUserFromGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationRemoveUserFromGroupArgs, 'membershipData'>
  >;
  reorderPollOptions?: Resolver<
    ResolversTypes['Poll'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationReorderPollOptionsArgs, 'optionData'>
  >;
  replaceCollaboraDocument?: Resolver<
    ResolversTypes['CollaboraDocument'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationReplaceCollaboraDocumentArgs,
      'file' | 'replaceData'
    >
  >;
  replaceWhiteboardContentFromSource?: Resolver<
    ResolversTypes['Whiteboard'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationReplaceWhiteboardContentFromSourceArgs,
      'input'
    >
  >;
  resetConversationVc?: Resolver<
    ResolversTypes['Conversation'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationResetConversationVcArgs, 'input'>
  >;
  resetLicenseOnAccounts?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  revokeCredentialFromActor?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRevokeCredentialFromActorArgs,
      'actorID' | 'credentialType'
    >
  >;
  revokeCredentialFromOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRevokeCredentialFromOrganizationArgs,
      'revokeCredentialData'
    >
  >;
  revokeCredentialFromUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRevokeCredentialFromUserArgs,
      'revokeCredentialData'
    >
  >;
  revokeLicensePlanFromAccount?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRevokeLicensePlanFromAccountArgs,
      'planData'
    >
  >;
  revokeLicensePlanFromSpace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationRevokeLicensePlanFromSpaceArgs,
      'planData'
    >
  >;
  revokeMcpApiKey?: Resolver<
    ResolversTypes['McpApiKey'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationRevokeMcpApiKeyArgs, 'revokeData'>
  >;
  sendDirectMessageToUsers?: Resolver<
    Array<ResolversTypes['DirectMessageDeliveryResult']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationSendDirectMessageToUsersArgs,
      'messageData'
    >
  >;
  sendMessageReplyToRoom?: Resolver<
    ResolversTypes['Message'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationSendMessageReplyToRoomArgs, 'messageData'>
  >;
  sendMessageToCommunityLeads?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationSendMessageToCommunityLeadsArgs,
      'messageData'
    >
  >;
  sendMessageToOrganization?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationSendMessageToOrganizationArgs,
      'messageData'
    >
  >;
  sendMessageToRoom?: Resolver<
    ResolversTypes['Message'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationSendMessageToRoomArgs, 'messageData'>
  >;
  sendMessageToUsers?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationSendMessageToUsersArgs, 'messageData'>
  >;
  setDefaultCalloutTemplateOnInnovationFlowState?: Resolver<
    ResolversTypes['InnovationFlowState'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationSetDefaultCalloutTemplateOnInnovationFlowStateArgs,
      'setData'
    >
  >;
  setPlatformWellKnownVirtualContributor?: Resolver<
    ResolversTypes['PlatformWellKnownVirtualContributors'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationSetPlatformWellKnownVirtualContributorArgs,
      'mappingData'
    >
  >;
  subscribeToPushNotifications?: Resolver<
    ResolversTypes['PushSubscription'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationSubscribeToPushNotificationsArgs,
      'subscriptionData'
    >
  >;
  transferCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationTransferCalloutArgs, 'transferData'>
  >;
  transferInnovationHubToAccount?: Resolver<
    ResolversTypes['InnovationHub'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationTransferInnovationHubToAccountArgs,
      'transferData'
    >
  >;
  transferInnovationPackToAccount?: Resolver<
    ResolversTypes['InnovationPack'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationTransferInnovationPackToAccountArgs,
      'transferData'
    >
  >;
  transferSpaceToAccount?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationTransferSpaceToAccountArgs,
      'transferData'
    >
  >;
  transferVirtualContributorToAccount?: Resolver<
    ResolversTypes['InnovationPack'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationTransferVirtualContributorToAccountArgs,
      'transferData'
    >
  >;
  unsubscribeFromPushNotifications?: Resolver<
    ResolversTypes['PushSubscription'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUnsubscribeFromPushNotificationsArgs,
      'subscriptionData'
    >
  >;
  updateApplicationFormOnRoleSet?: Resolver<
    ResolversTypes['RoleSet'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateApplicationFormOnRoleSetArgs,
      'applicationFormData'
    >
  >;
  updateAssistantActorCapabilities?: Resolver<
    ResolversTypes['VirtualAssistant'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateAssistantActorCapabilitiesArgs,
      'grantData'
    >
  >;
  updateBaselineLicensePlanOnAccount?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateBaselineLicensePlanOnAccountArgs,
      'updateData'
    >
  >;
  updateCalendarEvent?: Resolver<
    ResolversTypes['CalendarEvent'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateCalendarEventArgs, 'eventData'>
  >;
  updateCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateCalloutArgs, 'calloutData'>
  >;
  updateCalloutPublishInfo?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateCalloutPublishInfoArgs,
      'calloutData'
    >
  >;
  updateCalloutVisibility?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateCalloutVisibilityArgs,
      'calloutData'
    >
  >;
  updateCalloutsSortOrder?: Resolver<
    Array<ResolversTypes['Callout']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateCalloutsSortOrderArgs,
      'sortOrderData'
    >
  >;
  updateClassificationEntry?: Resolver<
    ResolversTypes['ClassificationEntry'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateClassificationEntryArgs,
      'classificationData'
    >
  >;
  updateClassificationEntryDisplay?: Resolver<
    ResolversTypes['ClassificationEntry'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateClassificationEntryDisplayArgs,
      'classificationData'
    >
  >;
  updateClassificationEntrySelection?: Resolver<
    ResolversTypes['ClassificationEntry'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateClassificationEntrySelectionArgs,
      'classificationData'
    >
  >;
  updateClassificationTagset?: Resolver<
    ResolversTypes['Tagset'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateClassificationTagsetArgs,
      'updateData'
    >
  >;
  updateCollaboraDocument?: Resolver<
    ResolversTypes['CollaboraDocument'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateCollaboraDocumentArgs, 'updateData'>
  >;
  updateCollaborationFromSpaceTemplate?: Resolver<
    ResolversTypes['Collaboration'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateCollaborationFromSpaceTemplateArgs,
      'updateData'
    >
  >;
  updateCommunityGuidelines?: Resolver<
    ResolversTypes['CommunityGuidelines'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateCommunityGuidelinesArgs,
      'communityGuidelinesData'
    >
  >;
  updateContributionsSortOrder?: Resolver<
    Array<ResolversTypes['CalloutContribution']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateContributionsSortOrderArgs,
      'sortOrderData'
    >
  >;
  updateConversation?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateConversationArgs, 'updateData'>
  >;
  updateDiscussion?: Resolver<
    ResolversTypes['Discussion'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateDiscussionArgs, 'updateData'>
  >;
  updateDocument?: Resolver<
    ResolversTypes['Document'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateDocumentArgs, 'documentData'>
  >;
  updateInnovationFlow?: Resolver<
    ResolversTypes['InnovationFlow'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateInnovationFlowArgs,
      'innovationFlowData'
    >
  >;
  updateInnovationFlowCurrentState?: Resolver<
    ResolversTypes['InnovationFlow'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateInnovationFlowCurrentStateArgs,
      'innovationFlowStateData'
    >
  >;
  updateInnovationFlowState?: Resolver<
    ResolversTypes['InnovationFlowState'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateInnovationFlowStateArgs,
      'stateData'
    >
  >;
  updateInnovationFlowStatesSortOrder?: Resolver<
    Array<ResolversTypes['InnovationFlowState']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateInnovationFlowStatesSortOrderArgs,
      'sortOrderData'
    >
  >;
  updateInnovationHub?: Resolver<
    ResolversTypes['InnovationHub'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateInnovationHubArgs, 'updateData'>
  >;
  updateInnovationPack?: Resolver<
    ResolversTypes['InnovationPack'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateInnovationPackArgs,
      'innovationPackData'
    >
  >;
  updateLicensePlan?: Resolver<
    ResolversTypes['LicensePlan'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateLicensePlanArgs, 'updateData'>
  >;
  updateLink?: Resolver<
    ResolversTypes['Link'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateLinkArgs, 'linkData'>
  >;
  updateMemo?: Resolver<
    ResolversTypes['Memo'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateMemoArgs, 'memoData'>
  >;
  updateNotificationState?: Resolver<
    ResolversTypes['NotificationEventInAppState'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateNotificationStateArgs,
      'notificationData'
    >
  >;
  updateOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateOrganizationArgs,
      'organizationData'
    >
  >;
  updateOrganizationPlatformSettings?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateOrganizationPlatformSettingsArgs,
      'organizationData'
    >
  >;
  updateOrganizationSettings?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateOrganizationSettingsArgs,
      'settingsData'
    >
  >;
  updatePlatformSettings?: Resolver<
    ResolversTypes['PlatformSettings'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdatePlatformSettingsArgs,
      'settingsData'
    >
  >;
  updatePollOption?: Resolver<
    ResolversTypes['Poll'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdatePollOptionArgs, 'optionData'>
  >;
  updatePollStatus?: Resolver<
    ResolversTypes['Poll'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdatePollStatusArgs, 'statusData'>
  >;
  updatePost?: Resolver<
    ResolversTypes['Post'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdatePostArgs, 'postData'>
  >;
  updateProfile?: Resolver<
    ResolversTypes['Profile'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateProfileArgs, 'profileData'>
  >;
  updateReference?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateReferenceArgs, 'referenceData'>
  >;
  updateSpace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateSpaceArgs, 'spaceData'>
  >;
  updateSpacePlatformSettings?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateSpacePlatformSettingsArgs,
      'updateData'
    >
  >;
  updateSpaceSettings?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateSpaceSettingsArgs, 'settingsData'>
  >;
  updateSubspacePinned?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateSubspacePinnedArgs, 'pinnedData'>
  >;
  updateSubspacesSortOrder?: Resolver<
    Array<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateSubspacesSortOrderArgs,
      'sortOrderData'
    >
  >;
  updateTagset?: Resolver<
    ResolversTypes['Tagset'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateTagsetArgs, 'updateData'>
  >;
  updateTaskColumnOnCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateTaskColumnOnCalloutArgs,
      'columnData'
    >
  >;
  updateTaskColumnsSortOrderOnCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateTaskColumnsSortOrderOnCalloutArgs,
      'sortOrderData'
    >
  >;
  updateTemplate?: Resolver<
    ResolversTypes['Template'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateTemplateArgs, 'updateData'>
  >;
  updateTemplateContentSpace?: Resolver<
    ResolversTypes['TemplateContentSpace'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateTemplateContentSpaceArgs,
      'templateContentSpaceData'
    >
  >;
  updateTemplateDefault?: Resolver<
    ResolversTypes['TemplateDefault'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateTemplateDefaultArgs,
      'templateDefaultData'
    >
  >;
  updateTemplateFromSpace?: Resolver<
    ResolversTypes['Template'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateTemplateFromSpaceArgs, 'updateData'>
  >;
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateUserArgs, 'userData'>
  >;
  updateUserGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateUserGroupArgs, 'userGroupData'>
  >;
  updateUserPlatformSettings?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateUserPlatformSettingsArgs,
      'updateData'
    >
  >;
  updateUserSettings?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateUserSettingsArgs, 'settingsData'>
  >;
  updateVirtualContributor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateVirtualContributorArgs,
      'virtualContributorData'
    >
  >;
  updateVirtualContributorPlatformSettings?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateVirtualContributorPlatformSettingsArgs,
      'settingsData'
    >
  >;
  updateVirtualContributorSettings?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUpdateVirtualContributorSettingsArgs,
      'settingsData'
    >
  >;
  updateVisual?: Resolver<
    ResolversTypes['Visual'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateVisualArgs, 'updateData'>
  >;
  updateWhiteboard?: Resolver<
    ResolversTypes['Whiteboard'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateWhiteboardArgs, 'whiteboardData'>
  >;
  updateWhiteboardGuestAccess?: Resolver<
    ResolversTypes['UpdateWhiteboardGuestAccessResult'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.MutationUpdateWhiteboardGuestAccessArgs, 'input'>
  >;
  uploadFileOnLink?: Resolver<
    ResolversTypes['Link'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUploadFileOnLinkArgs,
      'file' | 'uploadData'
    >
  >;
  uploadFileOnReference?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUploadFileOnReferenceArgs,
      'file' | 'uploadData'
    >
  >;
  uploadFileOnStorageBucket?: Resolver<
    ResolversTypes['StorageBucketUploadFileResult'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUploadFileOnStorageBucketArgs,
      'file' | 'uploadData'
    >
  >;
  uploadImageOnVisual?: Resolver<
    ResolversTypes['Visual'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.MutationUploadImageOnVisualArgs,
      'file' | 'uploadData'
    >
  >;
};

export type MySpaceResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MySpaceResults'] = ResolversParentTypes['MySpaceResults']
> = {
  latestActivity?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ActivityLogEntry']>,
    ParentType,
    ContextType
  >;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NvpResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['NVP'] = ResolversParentTypes['NVP']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface NameIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['NameID'], any> {
  name: 'NameID';
}

export type NotificationRecipientResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['NotificationRecipientResult'] = ResolversParentTypes['NotificationRecipientResult']
> = {
  emailRecipients?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  inAppRecipients?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  pushRecipients?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  triggeredBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']
> = {
  account?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType
  >;
  actor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  contactEmail?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credentials?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Credential']>>,
    ParentType,
    ContextType
  >;
  domain?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  group?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UserGroup']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.OrganizationGroupArgs, 'ID'>
  >;
  groups?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['UserGroup']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  legalEntityName?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  metrics?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['NVP']>>,
    ParentType,
    ContextType
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  roleSet?: Resolver<ResolversTypes['RoleSet'], ParentType, ContextType>;
  settings?: Resolver<
    ResolversTypes['OrganizationSettings'],
    ParentType,
    ContextType
  >;
  storageAggregator?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['StorageAggregator']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['ActorType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  verification?: Resolver<
    ResolversTypes['OrganizationVerification'],
    ParentType,
    ContextType
  >;
  website?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OrganizationSettings'] = ResolversParentTypes['OrganizationSettings']
> = {
  membership?: Resolver<
    ResolversTypes['OrganizationSettingsMembership'],
    ParentType,
    ContextType
  >;
  privacy?: Resolver<
    ResolversTypes['OrganizationSettingsPrivacy'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationSettingsMembershipResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OrganizationSettingsMembership'] = ResolversParentTypes['OrganizationSettingsMembership']
> = {
  allowUsersMatchingDomainToJoin?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationSettingsPrivacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OrganizationSettingsPrivacy'] = ResolversParentTypes['OrganizationSettingsPrivacy']
> = {
  contributionRolesPubliclyVisible?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationVerificationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OrganizationVerification'] = ResolversParentTypes['OrganizationVerification']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isFinalized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lifecycle?: Resolver<ResolversTypes['Lifecycle'], ParentType, ContextType>;
  nextEvents?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<
    ResolversTypes['OrganizationVerificationEnum'],
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationsInRolesResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OrganizationsInRolesResponse'] = ResolversParentTypes['OrganizationsInRolesResponse']
> = {
  organizations?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >;
  role?: Resolver<ResolversTypes['RoleName'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OryConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OryConfig'] = ResolversParentTypes['OryConfig']
> = {
  issuer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kratosPublicBaseURL?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  endCursor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedInAppNotificationsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedInAppNotifications'] = ResolversParentTypes['PaginatedInAppNotifications']
> = {
  inAppNotifications?: Resolver<
    Array<ResolversTypes['InAppNotification']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedInnovationPacksResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedInnovationPacks'] = ResolversParentTypes['PaginatedInnovationPacks']
> = {
  innovationPacks?: Resolver<
    Array<ResolversTypes['InnovationPack']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedLibraryTemplateResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedLibraryTemplateResults'] = ResolversParentTypes['PaginatedLibraryTemplateResults']
> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  templateResults?: Resolver<
    Array<ResolversTypes['TemplateResult']>,
    ParentType,
    ContextType
  >;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedOrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedOrganization'] = ResolversParentTypes['PaginatedOrganization']
> = {
  organization?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedSpacesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedSpaces'] = ResolversParentTypes['PaginatedSpaces']
> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  spaces?: Resolver<Array<ResolversTypes['Space']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedUsersResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedUsers'] = ResolversParentTypes['PaginatedUsers']
> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedVirtualContributorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedVirtualContributor'] = ResolversParentTypes['PaginatedVirtualContributor']
> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  virtualContributors?: Resolver<
    Array<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Platform'] = ResolversParentTypes['Platform']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  configuration?: Resolver<ResolversTypes['Config'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  forum?: Resolver<ResolversTypes['Forum'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  innovationHub?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['InnovationHub']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.PlatformInnovationHubArgs>
  >;
  latestReleaseDiscussion?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['LatestReleaseDiscussion']>,
    ParentType,
    ContextType
  >;
  library?: Resolver<ResolversTypes['Library'], ParentType, ContextType>;
  licensingFramework?: Resolver<
    ResolversTypes['Licensing'],
    ParentType,
    ContextType
  >;
  messaging?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Messaging']>,
    ParentType,
    ContextType
  >;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  roleSet?: Resolver<ResolversTypes['RoleSet'], ParentType, ContextType>;
  settings?: Resolver<
    ResolversTypes['PlatformSettings'],
    ParentType,
    ContextType
  >;
  storageAggregator?: Resolver<
    ResolversTypes['StorageAggregator'],
    ParentType,
    ContextType
  >;
  templatesManager?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['TemplatesManager']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  virtualAssistantAccess?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  wellKnownVirtualContributors?: Resolver<
    ResolversTypes['PlatformWellKnownVirtualContributors'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformAccessRoleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformAccessRole'] = ResolversParentTypes['PlatformAccessRole']
> = {
  grantedPrivileges?: Resolver<
    Array<ResolversTypes['AuthorizationPrivilege']>,
    ParentType,
    ContextType
  >;
  roleName?: Resolver<ResolversTypes['RoleName'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformAdminCommunicationQueryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformAdminCommunicationQueryResults'] = ResolversParentTypes['PlatformAdminCommunicationQueryResults']
> = {
  adminCommunicationMembership?: Resolver<
    ResolversTypes['CommunicationAdminMembershipResult'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.PlatformAdminCommunicationQueryResultsAdminCommunicationMembershipArgs,
      'communicationData'
    >
  >;
  adminCommunicationOrphanedUsage?: Resolver<
    ResolversTypes['CommunicationAdminOrphanedUsageResult'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformAdminIdentityQueryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformAdminIdentityQueryResults'] = ResolversParentTypes['PlatformAdminIdentityQueryResults']
> = {
  identities?: Resolver<
    Array<ResolversTypes['KratosIdentity']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.PlatformAdminIdentityQueryResultsIdentitiesArgs,
      'filter'
    >
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformAdminQueryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformAdminQueryResults'] = ResolversParentTypes['PlatformAdminQueryResults']
> = {
  accounts?: Resolver<
    Array<ResolversTypes['Account']>,
    ParentType,
    ContextType
  >;
  communication?: Resolver<
    ResolversTypes['PlatformAdminCommunicationQueryResults'],
    ParentType,
    ContextType
  >;
  identity?: Resolver<
    ResolversTypes['PlatformAdminIdentityQueryResults'],
    ParentType,
    ContextType
  >;
  innovationHubs?: Resolver<
    Array<ResolversTypes['InnovationHub']>,
    ParentType,
    ContextType
  >;
  innovationPacks?: Resolver<
    Array<ResolversTypes['InnovationPack']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.PlatformAdminQueryResultsInnovationPacksArgs>
  >;
  latestUserEmailChangeAuditEntry?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UserEmailChangeAuditEntry']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.PlatformAdminQueryResultsLatestUserEmailChangeAuditEntryArgs,
      'userID'
    >
  >;
  mcpApiKeys?: Resolver<
    Array<ResolversTypes['McpApiKey']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.PlatformAdminQueryResultsMcpApiKeysArgs, 'userID'>
  >;
  organizations?: Resolver<
    ResolversTypes['PaginatedOrganization'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.PlatformAdminQueryResultsOrganizationsArgs>
  >;
  spaces?: Resolver<
    Array<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.PlatformAdminQueryResultsSpacesArgs>
  >;
  userEmailChangeAuditEntries?: Resolver<
    ResolversTypes['UserEmailChangeAuditEntries'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.PlatformAdminQueryResultsUserEmailChangeAuditEntriesArgs,
      'userID'
    >
  >;
  users?: Resolver<
    ResolversTypes['PaginatedUsers'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.PlatformAdminQueryResultsUsersArgs>
  >;
  virtualAssistant?: Resolver<
    ResolversTypes['VirtualAssistant'],
    ParentType,
    ContextType
  >;
  virtualContributors?: Resolver<
    Array<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.PlatformAdminQueryResultsVirtualContributorsArgs>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformFeatureFlagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformFeatureFlag'] = ResolversParentTypes['PlatformFeatureFlag']
> = {
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<
    ResolversTypes['PlatformFeatureFlagName'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformIntegrationSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformIntegrationSettings'] = ResolversParentTypes['PlatformIntegrationSettings']
> = {
  iframeAllowedUrls?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  notificationEmailBlacklist?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformInvitationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformInvitation'] = ResolversParentTypes['PlatformInvitation']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lastName?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  platformRole?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['RoleName']>,
    ParentType,
    ContextType
  >;
  profileCreated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  roleSetExtraRoles?: Resolver<
    Array<ResolversTypes['RoleName']>,
    ParentType,
    ContextType
  >;
  roleSetInvitedToParent?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  suggestedLanguage?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  welcomeMessage?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformLocationsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformLocations'] = ResolversParentTypes['PlatformLocations']
> = {
  about?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  aup?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blog?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  community?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contactsupport?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  documentation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  environment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feedback?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  forumreleases?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  foundation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  help?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  impact?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  innovationLibrary?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  inspiration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  landing?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  newuser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  opensource?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privacy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releases?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  security?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  support?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  switchplan?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  terms?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tips?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformRolesAccessResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformRolesAccess'] = ResolversParentTypes['PlatformRolesAccess']
> = {
  roles?: Resolver<
    Array<ResolversTypes['PlatformAccessRole']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformSettings'] = ResolversParentTypes['PlatformSettings']
> = {
  integration?: Resolver<
    ResolversTypes['PlatformIntegrationSettings'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformWellKnownVirtualContributorMappingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformWellKnownVirtualContributorMapping'] = ResolversParentTypes['PlatformWellKnownVirtualContributorMapping']
> = {
  virtualContributorID?: Resolver<
    ResolversTypes['UUID'],
    ParentType,
    ContextType
  >;
  wellKnown?: Resolver<
    ResolversTypes['VirtualContributorWellKnown'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformWellKnownVirtualContributorsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformWellKnownVirtualContributors'] = ResolversParentTypes['PlatformWellKnownVirtualContributors']
> = {
  mappings?: Resolver<
    Array<ResolversTypes['PlatformWellKnownVirtualContributorMapping']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Poll'] = ResolversParentTypes['Poll']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  canSeeDetailedResults?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deadline?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  myVote?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PollVote']>,
    ParentType,
    ContextType
  >;
  options?: Resolver<
    Array<ResolversTypes['PollOption']>,
    ParentType,
    ContextType
  >;
  settings?: Resolver<ResolversTypes['PollSettings'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['PollStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalVotes?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollOptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PollOption'] = ResolversParentTypes['PollOption']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  sortOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  voteCount?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  votePercentage?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  voters?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollOptionsChangedSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PollOptionsChangedSubscriptionResult'] = ResolversParentTypes['PollOptionsChangedSubscriptionResult']
> = {
  poll?: Resolver<ResolversTypes['Poll'], ParentType, ContextType>;
  pollEventType?: Resolver<
    ResolversTypes['PollEventType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PollSettings'] = ResolversParentTypes['PollSettings']
> = {
  allowContributorsAddOptions?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  maxResponses?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minResponses?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resultsDetail?: Resolver<
    ResolversTypes['PollResultsDetail'],
    ParentType,
    ContextType
  >;
  resultsVisibility?: Resolver<
    ResolversTypes['PollResultsVisibility'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollSettingsDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PollSettingsData'] = ResolversParentTypes['PollSettingsData']
> = {
  allowContributorsAddOptions?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  maxResponses?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  minResponses?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  resultsDetail?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PollResultsDetail']>,
    ParentType,
    ContextType
  >;
  resultsVisibility?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PollResultsVisibility']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollVoteResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PollVote'] = ResolversParentTypes['PollVote']
> = {
  createdBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  selectedOptions?: Resolver<
    Array<ResolversTypes['PollOption']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollVoteUpdatedSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PollVoteUpdatedSubscriptionResult'] = ResolversParentTypes['PollVoteUpdatedSubscriptionResult']
> = {
  poll?: Resolver<ResolversTypes['Poll'], ParentType, ContextType>;
  pollEventType?: Resolver<
    ResolversTypes['PollEventType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  createdBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  location?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Location']>,
    ParentType,
    ContextType
  >;
  references?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Reference']>>,
    ParentType,
    ContextType
  >;
  storageBucket?: Resolver<
    ResolversTypes['StorageBucket'],
    ParentType,
    ContextType
  >;
  tagline?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  tagset?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Tagset']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.ProfileTagsetArgs>
  >;
  tagsets?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Tagset']>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ProfileType']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  visual?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Visual']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.ProfileVisualArgs, 'type'>
  >;
  visuals?: Resolver<Array<ResolversTypes['Visual']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromptGraphResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PromptGraph'] = ResolversParentTypes['PromptGraph']
> = {
  edges?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['PromptGraphEdge']>>,
    ParentType,
    ContextType
  >;
  end?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['PromptGraphNode']>>,
    ParentType,
    ContextType
  >;
  start?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  state?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PromptGraphDataStruct']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromptGraphDataPointResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PromptGraphDataPoint'] = ResolversParentTypes['PromptGraphDataPoint']
> = {
  description?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PromptGraphDataStruct']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  optional?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromptGraphDataStructResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PromptGraphDataStruct'] = ResolversParentTypes['PromptGraphDataStruct']
> = {
  properties?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['PromptGraphDataPoint']>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromptGraphDefinitionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PromptGraphDefinition'] = ResolversParentTypes['PromptGraphDefinition']
> = {
  edges?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['PromptGraphDefinitionEdge']>>,
    ParentType,
    ContextType
  >;
  end?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['PromptGraphDefinitionNode']>>,
    ParentType,
    ContextType
  >;
  start?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  state?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PromptGraphDefinitionDataStruct']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromptGraphDefinitionDataPointResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PromptGraphDefinitionDataPoint'] = ResolversParentTypes['PromptGraphDefinitionDataPoint']
> = {
  description?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  optional?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromptGraphDefinitionDataStructResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PromptGraphDefinitionDataStruct'] = ResolversParentTypes['PromptGraphDefinitionDataStruct']
> = {
  properties?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['PromptGraphDefinitionDataPoint']>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromptGraphDefinitionEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PromptGraphDefinitionEdge'] = ResolversParentTypes['PromptGraphDefinitionEdge']
> = {
  from?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  to?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromptGraphDefinitionNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PromptGraphDefinitionNode'] = ResolversParentTypes['PromptGraphDefinitionNode']
> = {
  input_variables?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  output?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PromptGraphDefinitionDataStruct']>,
    ParentType,
    ContextType
  >;
  prompt?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  system?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromptGraphEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PromptGraphEdge'] = ResolversParentTypes['PromptGraphEdge']
> = {
  from?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  to?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromptGraphNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PromptGraphNode'] = ResolversParentTypes['PromptGraphNode']
> = {
  input_variables?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  output?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PromptGraphDataStruct']>,
    ParentType,
    ContextType
  >;
  prompt?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  system?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PruneInAppNotificationAdminResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PruneInAppNotificationAdminResult'] = ResolversParentTypes['PruneInAppNotificationAdminResult']
> = {
  removedCountExceedingUserLimit?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  removedCountOutsideRetentionPeriod?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PushSubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PushSubscription'] = ResolversParentTypes['PushSubscription']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lastActiveDate?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  status?: Resolver<
    ResolversTypes['PushSubscriptionStatus'],
    ParentType,
    ContextType
  >;
  userAgent?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  activityFeed?: Resolver<
    ResolversTypes['ActivityFeed'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.QueryActivityFeedArgs>
  >;
  activityFeedGrouped?: Resolver<
    Array<ResolversTypes['ActivityLogEntry']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.QueryActivityFeedGroupedArgs>
  >;
  activityLogOnCollaboration?: Resolver<
    Array<ResolversTypes['ActivityLogEntry']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryActivityLogOnCollaborationArgs, 'queryData'>
  >;
  actor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ActorFull']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryActorArgs, 'id'>
  >;
  actorsWithCredential?: Resolver<
    Array<ResolversTypes['ActorFull']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryActorsWithCredentialArgs, 'credentialType'>
  >;
  adminIdentitiesUnverified?: Resolver<
    Array<ResolversTypes['KratosIdentity']>,
    ParentType,
    ContextType
  >;
  aiServer?: Resolver<ResolversTypes['AiServer'], ParentType, ContextType>;
  collaboraEditorUrl?: Resolver<
    ResolversTypes['CollaboraEditorUrlResult'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.QueryCollaboraEditorUrlArgs,
      'collaboraDocumentID'
    >
  >;
  collaboraServiceAvailable?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.QueryCollaboraServiceAvailableArgs,
      'collaboraDocumentID'
    >
  >;
  exploreSpaces?: Resolver<
    Array<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.QueryExploreSpacesArgs>
  >;
  inputCreator?: Resolver<
    ResolversTypes['InputCreatorQueryResults'],
    ParentType,
    ContextType
  >;
  lookup?: Resolver<
    ResolversTypes['LookupQueryResults'],
    ParentType,
    ContextType
  >;
  lookupByName?: Resolver<
    ResolversTypes['LookupByNameQueryResults'],
    ParentType,
    ContextType
  >;
  me?: Resolver<ResolversTypes['MeQueryResults'], ParentType, ContextType>;
  myPushSubscriptions?: Resolver<
    Array<ResolversTypes['PushSubscription']>,
    ParentType,
    ContextType
  >;
  notificationRecipients?: Resolver<
    ResolversTypes['NotificationRecipientResult'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryNotificationRecipientsArgs, 'eventData'>
  >;
  organization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryOrganizationArgs, 'ID'>
  >;
  organizations?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.QueryOrganizationsArgs>
  >;
  organizationsPaginated?: Resolver<
    ResolversTypes['PaginatedOrganization'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.QueryOrganizationsPaginatedArgs>
  >;
  platform?: Resolver<ResolversTypes['Platform'], ParentType, ContextType>;
  platformAdmin?: Resolver<
    ResolversTypes['PlatformAdminQueryResults'],
    ParentType,
    ContextType
  >;
  platformCapabilities?: Resolver<
    Array<ResolversTypes['AssistantCapability']>,
    ParentType,
    ContextType
  >;
  restrictedSpaceNames?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  rolesOrganization?: Resolver<
    ResolversTypes['ActorRoles'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryRolesOrganizationArgs, 'rolesData'>
  >;
  rolesUser?: Resolver<
    ResolversTypes['ActorRoles'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryRolesUserArgs, 'rolesData'>
  >;
  rolesVirtualContributor?: Resolver<
    ResolversTypes['ActorRoles'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryRolesVirtualContributorArgs, 'rolesData'>
  >;
  search?: Resolver<
    ResolversTypes['ISearchResults'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QuerySearchArgs, 'searchData'>
  >;
  spaces?: Resolver<
    Array<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.QuerySpacesArgs>
  >;
  spacesPaginated?: Resolver<
    ResolversTypes['PaginatedSpaces'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.QuerySpacesPaginatedArgs>
  >;
  task?: Resolver<
    ResolversTypes['Task'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryTaskArgs, 'id'>
  >;
  tasks?: Resolver<
    Array<ResolversTypes['Task']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.QueryTasksArgs>
  >;
  urlResolver?: Resolver<
    ResolversTypes['UrlResolverQueryResults'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryUrlResolverArgs, 'url'>
  >;
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryUserArgs, 'ID'>
  >;
  users?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.QueryUsersArgs>
  >;
  usersPaginated?: Resolver<
    ResolversTypes['PaginatedUsers'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.QueryUsersPaginatedArgs>
  >;
  usersWithAuthorizationCredential?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.QueryUsersWithAuthorizationCredentialArgs,
      'credentialsCriteriaData'
    >
  >;
  vapidPublicKey?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  virtualContributor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.QueryVirtualContributorArgs, 'ID'>
  >;
  virtualContributors?: Resolver<
    Array<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.QueryVirtualContributorsArgs>
  >;
};

export type QuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']
> = {
  emoji?: Resolver<ResolversTypes['Emoji'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['MessageID'], ParentType, ContextType>;
  sender?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  timestamp?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReferenceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Reference'] = ResolversParentTypes['Reference']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RelayPaginatedSpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RelayPaginatedSpace'] = ResolversParentTypes['RelayPaginatedSpace']
> = {
  about?: Resolver<ResolversTypes['SpaceAbout'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  activeSubscription?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['SpaceSubscription']>,
    ParentType,
    ContextType
  >;
  activityScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  collaboration?: Resolver<
    ResolversTypes['Collaboration'],
    ParentType,
    ContextType
  >;
  community?: Resolver<ResolversTypes['Community'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credentials?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Credential']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  layout?: Resolver<
    ResolversTypes['SpaceSettingsLayout'],
    ParentType,
    ContextType
  >;
  level?: Resolver<ResolversTypes['SpaceLevel'], ParentType, ContextType>;
  levelZeroSpaceID?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  mentionableContributors?: Resolver<
    Array<ResolversTypes['ActorFull']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.RelayPaginatedSpaceMentionableContributorsArgs>
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  pinned?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  platformAccess?: Resolver<
    ResolversTypes['PlatformRolesAccess'],
    ParentType,
    ContextType
  >;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  settings?: Resolver<ResolversTypes['SpaceSettings'], ParentType, ContextType>;
  sortMode?: Resolver<ResolversTypes['SpaceSortMode'], ParentType, ContextType>;
  sortOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  storageAggregator?: Resolver<
    ResolversTypes['StorageAggregator'],
    ParentType,
    ContextType
  >;
  subscriptions?: Resolver<
    Array<ResolversTypes['SpaceSubscription']>,
    ParentType,
    ContextType
  >;
  subspaceByNameID?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.RelayPaginatedSpaceSubspaceByNameIdArgs, 'NAMEID'>
  >;
  subspaces?: Resolver<
    Array<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.RelayPaginatedSpaceSubspacesArgs>
  >;
  templatesManager?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['TemplatesManager']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['ActorType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  visibility?: Resolver<
    ResolversTypes['SpaceVisibility'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RelayPaginatedSpaceEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RelayPaginatedSpaceEdge'] = ResolversParentTypes['RelayPaginatedSpaceEdge']
> = {
  node?: Resolver<
    ResolversTypes['RelayPaginatedSpace'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RelayPaginatedSpacePageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RelayPaginatedSpacePageInfo'] = ResolversParentTypes['RelayPaginatedSpacePageInfo']
> = {
  endCursor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']
> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credential?: Resolver<
    ResolversTypes['CredentialDefinition'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['RoleName'], ParentType, ContextType>;
  organizationPolicy?: Resolver<
    ResolversTypes['ActorRolePolicy'],
    ParentType,
    ContextType
  >;
  parentCredentials?: Resolver<
    Array<ResolversTypes['CredentialDefinition']>,
    ParentType,
    ContextType
  >;
  requiresEntryRole?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  requiresSameRoleInParentRoleSet?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userPolicy?: Resolver<
    ResolversTypes['ActorRolePolicy'],
    ParentType,
    ContextType
  >;
  virtualContributorPolicy?: Resolver<
    ResolversTypes['ActorRolePolicy'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleSetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RoleSet'] = ResolversParentTypes['RoleSet']
> = {
  applicationForm?: Resolver<ResolversTypes['Form'], ParentType, ContextType>;
  applications?: Resolver<
    Array<ResolversTypes['Application']>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  availableUsersForElevatedRole?: Resolver<
    ResolversTypes['PaginatedUsers'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.RoleSetAvailableUsersForElevatedRoleArgs, 'role'>
  >;
  availableUsersForEntryRole?: Resolver<
    ResolversTypes['PaginatedUsers'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.RoleSetAvailableUsersForEntryRoleArgs>
  >;
  availableVirtualContributorsForEntryRole?: Resolver<
    ResolversTypes['PaginatedVirtualContributor'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.RoleSetAvailableVirtualContributorsForEntryRoleArgs>
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  entryRoleName?: Resolver<ResolversTypes['RoleName'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  invitations?: Resolver<
    Array<ResolversTypes['Invitation']>,
    ParentType,
    ContextType
  >;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  myMembershipStatus?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CommunityMembershipStatus']>,
    ParentType,
    ContextType
  >;
  myRoles?: Resolver<
    Array<ResolversTypes['RoleName']>,
    ParentType,
    ContextType
  >;
  myRolesImplicit?: Resolver<
    Array<ResolversTypes['RoleSetRoleImplicit']>,
    ParentType,
    ContextType
  >;
  organizationsInRole?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.RoleSetOrganizationsInRoleArgs, 'role'>
  >;
  organizationsInRoles?: Resolver<
    Array<ResolversTypes['OrganizationsInRolesResponse']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.RoleSetOrganizationsInRolesArgs, 'roles'>
  >;
  platformInvitations?: Resolver<
    Array<ResolversTypes['PlatformInvitation']>,
    ParentType,
    ContextType
  >;
  roleDefinition?: Resolver<
    ResolversTypes['Role'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.RoleSetRoleDefinitionArgs, 'role'>
  >;
  roleDefinitions?: Resolver<
    Array<ResolversTypes['Role']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.RoleSetRoleDefinitionsArgs>
  >;
  roleNames?: Resolver<
    Array<ResolversTypes['RoleName']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['RoleSetType']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  usersInRole?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.RoleSetUsersInRoleArgs, 'role'>
  >;
  usersInRoles?: Resolver<
    Array<ResolversTypes['UsersInRolesResponse']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.RoleSetUsersInRolesArgs, 'roles'>
  >;
  virtualContributorsInRole?: Resolver<
    Array<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.RoleSetVirtualContributorsInRoleArgs, 'role'>
  >;
  virtualContributorsInRoleInHierarchy?: Resolver<
    Array<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.RoleSetVirtualContributorsInRoleInHierarchyArgs,
      'role'
    >
  >;
  virtualContributorsInRoles?: Resolver<
    Array<ResolversTypes['VirtualContributorsInRolesResponse']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.RoleSetVirtualContributorsInRolesArgs, 'roles'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleSetInvitationResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RoleSetInvitationResult'] = ResolversParentTypes['RoleSetInvitationResult']
> = {
  application?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Application']>,
    ParentType,
    ContextType
  >;
  invitation?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Invitation']>,
    ParentType,
    ContextType
  >;
  platformInvitation?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PlatformInvitation']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    ResolversTypes['RoleSetInvitationResultType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResult'] = ResolversParentTypes['RolesResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultCommunityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResultCommunity'] = ResolversParentTypes['RolesResultCommunity']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['SpaceLevel'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultOrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResultOrganization'] = ResolversParentTypes['RolesResultOrganization']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  organizationID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  userGroups?: Resolver<
    Array<ResolversTypes['RolesResult']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultSpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResultSpace'] = ResolversParentTypes['RolesResultSpace']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['SpaceLevel'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  spaceID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subspaces?: Resolver<
    Array<ResolversTypes['RolesResultCommunity']>,
    ParentType,
    ContextType
  >;
  visibility?: Resolver<
    ResolversTypes['SpaceVisibility'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  avatarUrl?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lastMessage?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Message']>,
    ParentType,
    ContextType
  >;
  messages?: Resolver<
    Array<ResolversTypes['Message']>,
    ParentType,
    ContextType
  >;
  messagesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RoomType'], ParentType, ContextType>;
  unreadCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unreadCounts?: Resolver<
    ResolversTypes['RoomUnreadCounts'],
    ParentType,
    ContextType,
    Partial<SchemaTypes.RoomUnreadCountsArgs>
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  vcInteractions?: Resolver<
    Array<ResolversTypes['VcInteraction']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomEventSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RoomEventSubscriptionResult'] = ResolversParentTypes['RoomEventSubscriptionResult']
> = {
  message?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['RoomMessageEventSubscriptionResult']>,
    ParentType,
    ContextType
  >;
  reaction?: Resolver<
    SchemaTypes.Maybe<
      ResolversTypes['RoomMessageReactionEventSubscriptionResult']
    >,
    ParentType,
    ContextType
  >;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  roomID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomMessageEventSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RoomMessageEventSubscriptionResult'] = ResolversParentTypes['RoomMessageEventSubscriptionResult']
> = {
  data?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomMessageReactionEventSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RoomMessageReactionEventSubscriptionResult'] = ResolversParentTypes['RoomMessageReactionEventSubscriptionResult']
> = {
  data?: Resolver<ResolversTypes['Reaction'], ParentType, ContextType>;
  messageID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomThreadUnreadCountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RoomThreadUnreadCount'] = ResolversParentTypes['RoomThreadUnreadCount']
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  threadId?: Resolver<ResolversTypes['MessageID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomUnreadCountsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RoomUnreadCounts'] = ResolversParentTypes['RoomUnreadCounts']
> = {
  roomUnreadCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  threadUnreadCounts?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['RoomThreadUnreadCount']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface SearchCursorScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['SearchCursor'], any> {
  name: 'SearchCursor';
}

export type SearchResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']
> = {
  __resolveType: TypeResolveFn<
    | 'SearchResultCallout'
    | 'SearchResultCollaboraDocument'
    | 'SearchResultMemo'
    | 'SearchResultOrganization'
    | 'SearchResultPost'
    | 'SearchResultSpace'
    | 'SearchResultUser'
    | 'SearchResultWhiteboard',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
};

export type SearchResultCalloutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultCallout'] = ResolversParentTypes['SearchResultCallout']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultCollaboraDocumentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultCollaboraDocument'] = ResolversParentTypes['SearchResultCollaboraDocument']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  collaboraDocument?: Resolver<
    ResolversTypes['CollaboraDocument'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isContribution?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultMemoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultMemo'] = ResolversParentTypes['SearchResultMemo']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isContribution?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  memo?: Resolver<ResolversTypes['Memo'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultOrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultOrganization'] = ResolversParentTypes['SearchResultOrganization']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  organization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType
  >;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultPostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultPost'] = ResolversParentTypes['SearchResultPost']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultSpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultSpace'] = ResolversParentTypes['SearchResultSpace']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentSpace?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultUser'] = ResolversParentTypes['SearchResultUser']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultWhiteboardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultWhiteboard'] = ResolversParentTypes['SearchResultWhiteboard']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isContribution?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  whiteboard?: Resolver<ResolversTypes['Whiteboard'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SentryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Sentry'] = ResolversParentTypes['Sentry']
> = {
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  endpoint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  environment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submitPII?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceMetadataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ServiceMetadata'] = ResolversParentTypes['ServiceMetadata']
> = {
  name?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  version?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Space'] = ResolversParentTypes['Space']
> = {
  about?: Resolver<ResolversTypes['SpaceAbout'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  activeSubscription?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['SpaceSubscription']>,
    ParentType,
    ContextType
  >;
  activityScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  collaboration?: Resolver<
    ResolversTypes['Collaboration'],
    ParentType,
    ContextType
  >;
  community?: Resolver<ResolversTypes['Community'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credentials?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Credential']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  layout?: Resolver<
    ResolversTypes['SpaceSettingsLayout'],
    ParentType,
    ContextType
  >;
  level?: Resolver<ResolversTypes['SpaceLevel'], ParentType, ContextType>;
  levelZeroSpaceID?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  mentionableContributors?: Resolver<
    Array<ResolversTypes['ActorFull']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.SpaceMentionableContributorsArgs>
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  pinned?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  platformAccess?: Resolver<
    ResolversTypes['PlatformRolesAccess'],
    ParentType,
    ContextType
  >;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  settings?: Resolver<ResolversTypes['SpaceSettings'], ParentType, ContextType>;
  sortMode?: Resolver<ResolversTypes['SpaceSortMode'], ParentType, ContextType>;
  sortOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  storageAggregator?: Resolver<
    ResolversTypes['StorageAggregator'],
    ParentType,
    ContextType
  >;
  subscriptions?: Resolver<
    Array<ResolversTypes['SpaceSubscription']>,
    ParentType,
    ContextType
  >;
  subspaceByNameID?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.SpaceSubspaceByNameIdArgs, 'NAMEID'>
  >;
  subspaces?: Resolver<
    Array<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.SpaceSubspacesArgs>
  >;
  templatesManager?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['TemplatesManager']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['ActorType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  visibility?: Resolver<
    ResolversTypes['SpaceVisibility'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceAboutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceAbout'] = ResolversParentTypes['SpaceAbout']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  classifications?: Resolver<
    Array<ResolversTypes['ClassificationEntry']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  guidelines?: Resolver<
    ResolversTypes['CommunityGuidelines'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isContentPublic?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  membership?: Resolver<
    ResolversTypes['SpaceAboutMembership'],
    ParentType,
    ContextType
  >;
  metrics?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['NVP']>>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  provider?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Actor']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  who?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  why?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceAboutMembershipResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceAboutMembership'] = ResolversParentTypes['SpaceAboutMembership']
> = {
  applicationForm?: Resolver<ResolversTypes['Form'], ParentType, ContextType>;
  communityID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  leadOrganizations?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >;
  leadUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  myMembershipStatus?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CommunityMembershipStatus']>,
    ParentType,
    ContextType
  >;
  myPrivileges?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType
  >;
  roleSetID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpacePendingMembershipInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpacePendingMembershipInfo'] = ResolversParentTypes['SpacePendingMembershipInfo']
> = {
  about?: Resolver<ResolversTypes['SpaceAbout'], ParentType, ContextType>;
  communityGuidelines?: Resolver<
    ResolversTypes['CommunityGuidelines'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['SpaceLevel'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceSettings'] = ResolversParentTypes['SpaceSettings']
> = {
  collaboration?: Resolver<
    ResolversTypes['SpaceSettingsCollaboration'],
    ParentType,
    ContextType
  >;
  layout?: Resolver<
    ResolversTypes['SpaceSettingsLayout'],
    ParentType,
    ContextType
  >;
  membership?: Resolver<
    ResolversTypes['SpaceSettingsMembership'],
    ParentType,
    ContextType
  >;
  privacy?: Resolver<
    ResolversTypes['SpaceSettingsPrivacy'],
    ParentType,
    ContextType
  >;
  sortMode?: Resolver<ResolversTypes['SpaceSortMode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceSettingsCollaborationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceSettingsCollaboration'] = ResolversParentTypes['SpaceSettingsCollaboration']
> = {
  allowEventsFromSubspaces?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  allowGuestContributions?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  allowMembersToCreateCallouts?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  allowMembersToCreateSubspaces?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  allowMembersToVideoCall?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  inheritMembershipRights?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceSettingsLayoutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceSettingsLayout'] = ResolversParentTypes['SpaceSettingsLayout']
> = {
  calloutDescriptionDisplayMode?: Resolver<
    ResolversTypes['CalloutDescriptionDisplayMode'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceSettingsMembershipResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceSettingsMembership'] = ResolversParentTypes['SpaceSettingsMembership']
> = {
  allowSubspaceAdminsToInviteMembers?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  policy?: Resolver<
    ResolversTypes['CommunityMembershipPolicy'],
    ParentType,
    ContextType
  >;
  trustedOrganizations?: Resolver<
    Array<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceSettingsPrivacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceSettingsPrivacy'] = ResolversParentTypes['SpaceSettingsPrivacy']
> = {
  allowPlatformSupportAsAdmin?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  mode?: Resolver<ResolversTypes['SpacePrivacyMode'], ParentType, ContextType>;
  userInformationVisibility?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UserInformationVisibility']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceSubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceSubscription'] = ResolversParentTypes['SpaceSubscription']
> = {
  expires?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<
    ResolversTypes['LicensingCredentialBasedCredentialType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageAggregatorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StorageAggregator'] = ResolversParentTypes['StorageAggregator']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  directStorageBucket?: Resolver<
    ResolversTypes['StorageBucket'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentEntity?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['StorageAggregatorParent']>,
    ParentType,
    ContextType
  >;
  size?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  storageAggregators?: Resolver<
    Array<ResolversTypes['StorageAggregator']>,
    ParentType,
    ContextType
  >;
  storageBuckets?: Resolver<
    Array<ResolversTypes['StorageBucket']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['StorageAggregatorType']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageAggregatorParentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StorageAggregatorParent'] = ResolversParentTypes['StorageAggregatorParent']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  level?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['SpaceLevel']>,
    ParentType,
    ContextType
  >;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageBucketResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StorageBucket'] = ResolversParentTypes['StorageBucket']
> = {
  allowedMimeTypes?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  document?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Document']>,
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.StorageBucketDocumentArgs, 'ID'>
  >;
  documents?: Resolver<
    Array<ResolversTypes['Document']>,
    ParentType,
    ContextType,
    Partial<SchemaTypes.StorageBucketDocumentsArgs>
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  maxFileSize?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  parentEntity?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['StorageBucketParent']>,
    ParentType,
    ContextType
  >;
  size?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageBucketParentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StorageBucketParent'] = ResolversParentTypes['StorageBucketParent']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ProfileType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageBucketUploadFileResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StorageBucketUploadFileResult'] = ResolversParentTypes['StorageBucketUploadFileResult']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StorageConfig'] = ResolversParentTypes['StorageConfig']
> = {
  file?: Resolver<ResolversTypes['FileStorageConfig'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  activityCreated?: SubscriptionResolver<
    ResolversTypes['ActivityCreatedSubscriptionResult'],
    'activityCreated',
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.SubscriptionActivityCreatedArgs, 'input'>
  >;
  calloutPostCreated?: SubscriptionResolver<
    ResolversTypes['CalloutPostCreated'],
    'calloutPostCreated',
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.SubscriptionCalloutPostCreatedArgs, 'calloutID'>
  >;
  conversationEvents?: SubscriptionResolver<
    ResolversTypes['ConversationEventSubscriptionResult'],
    'conversationEvents',
    ParentType,
    ContextType
  >;
  forumDiscussionUpdated?: SubscriptionResolver<
    ResolversTypes['Discussion'],
    'forumDiscussionUpdated',
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.SubscriptionForumDiscussionUpdatedArgs, 'forumID'>
  >;
  inAppNotificationReceived?: SubscriptionResolver<
    ResolversTypes['InAppNotification'],
    'inAppNotificationReceived',
    ParentType,
    ContextType
  >;
  notificationsUnreadCount?: SubscriptionResolver<
    ResolversTypes['Int'],
    'notificationsUnreadCount',
    ParentType,
    ContextType
  >;
  pollOptionsChanged?: SubscriptionResolver<
    ResolversTypes['PollOptionsChangedSubscriptionResult'],
    'pollOptionsChanged',
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.SubscriptionPollOptionsChangedArgs, 'pollID'>
  >;
  pollVoteUpdated?: SubscriptionResolver<
    ResolversTypes['PollVoteUpdatedSubscriptionResult'],
    'pollVoteUpdated',
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.SubscriptionPollVoteUpdatedArgs, 'pollID'>
  >;
  roomEvents?: SubscriptionResolver<
    ResolversTypes['RoomEventSubscriptionResult'],
    'roomEvents',
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.SubscriptionRoomEventsArgs, 'roomID'>
  >;
  subspaceCreated?: SubscriptionResolver<
    ResolversTypes['SubspaceCreated'],
    'subspaceCreated',
    ParentType,
    ContextType,
    RequireFields<SchemaTypes.SubscriptionSubspaceCreatedArgs, 'spaceID'>
  >;
  virtualContributorUpdated?: SubscriptionResolver<
    ResolversTypes['VirtualContributorUpdatedSubscriptionResult'],
    'virtualContributorUpdated',
    ParentType,
    ContextType,
    RequireFields<
      SchemaTypes.SubscriptionVirtualContributorUpdatedArgs,
      'virtualContributorID'
    >
  >;
};

export type SubspaceCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SubspaceCreated'] = ResolversParentTypes['SubspaceCreated']
> = {
  spaceID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  subspace?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagsetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Tagset'] = ResolversParentTypes['Tagset']
> = {
  allowedValues?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TagsetType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagsetTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TagsetTemplate'] = ResolversParentTypes['TagsetTemplate']
> = {
  allowedValues?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  defaultSelectedValue?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TagsetType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']
> = {
  created?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  end?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  errors?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  itemsCount?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  itemsDone?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  progress?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  results?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  start?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TaskStatus'], ParentType, ContextType>;
  type?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskColumnCountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TaskColumnCount'] = ResolversParentTypes['TaskColumnCount']
> = {
  column?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Template'] = ResolversParentTypes['Template']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  callout?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Callout']>,
    ParentType,
    ContextType
  >;
  classification?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ClassificationTemplateContent']>,
    ParentType,
    ContextType
  >;
  communityGuidelines?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['CommunityGuidelines']>,
    ParentType,
    ContextType
  >;
  contentSpace?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['TemplateContentSpace']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  postDefaultDescription?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TemplateType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  whiteboard?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Whiteboard']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplateContentSpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TemplateContentSpace'] = ResolversParentTypes['TemplateContentSpace']
> = {
  about?: Resolver<ResolversTypes['SpaceAbout'], ParentType, ContextType>;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  collaboration?: Resolver<
    ResolversTypes['Collaboration'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['SpaceLevel'], ParentType, ContextType>;
  settings?: Resolver<ResolversTypes['SpaceSettings'], ParentType, ContextType>;
  subspaces?: Resolver<
    Array<ResolversTypes['TemplateContentSpace']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplateDefaultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TemplateDefault'] = ResolversParentTypes['TemplateDefault']
> = {
  allowedTemplateType?: Resolver<
    ResolversTypes['TemplateType'],
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  template?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Template']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    ResolversTypes['TemplateDefaultType'],
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplateResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TemplateResult'] = ResolversParentTypes['TemplateResult']
> = {
  innovationPack?: Resolver<
    ResolversTypes['InnovationPack'],
    ParentType,
    ContextType
  >;
  template?: Resolver<ResolversTypes['Template'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplatesManagerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TemplatesManager'] = ResolversParentTypes['TemplatesManager']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  templateDefaults?: Resolver<
    Array<ResolversTypes['TemplateDefault']>,
    ParentType,
    ContextType
  >;
  templatesSet?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['TemplatesSet']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplatesSetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TemplatesSet'] = ResolversParentTypes['TemplatesSet']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  calloutTemplates?: Resolver<
    Array<ResolversTypes['Template']>,
    ParentType,
    ContextType
  >;
  calloutTemplatesCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  classificationTemplates?: Resolver<
    Array<ResolversTypes['Template']>,
    ParentType,
    ContextType
  >;
  classificationTemplatesCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  communityGuidelinesTemplates?: Resolver<
    Array<ResolversTypes['Template']>,
    ParentType,
    ContextType
  >;
  communityGuidelinesTemplatesCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  postTemplates?: Resolver<
    Array<ResolversTypes['Template']>,
    ParentType,
    ContextType
  >;
  postTemplatesCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  spaceTemplates?: Resolver<
    Array<ResolversTypes['Template']>,
    ParentType,
    ContextType
  >;
  spaceTemplatesCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  templates?: Resolver<
    Array<ResolversTypes['Template']>,
    ParentType,
    ContextType
  >;
  templatesCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  whiteboardTemplates?: Resolver<
    Array<ResolversTypes['Template']>,
    ParentType,
    ContextType
  >;
  whiteboardTemplatesCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimelineResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Timeline'] = ResolversParentTypes['Timeline']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  calendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type UpdateWhiteboardGuestAccessResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateWhiteboardGuestAccessResult'] = ResolversParentTypes['UpdateWhiteboardGuestAccessResult']
> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  whiteboard?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Whiteboard']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UrlResolverQueryClosestAncestorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UrlResolverQueryClosestAncestor'] = ResolversParentTypes['UrlResolverQueryClosestAncestor']
> = {
  discussionId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  innovationHubId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  innovationPack?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UrlResolverQueryResultInnovationPack']>,
    ParentType,
    ContextType
  >;
  organizationId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UrlResolverQueryResultSpace']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['UrlType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  virtualContributor?: Resolver<
    SchemaTypes.Maybe<
      ResolversTypes['UrlResolverQueryResultVirtualContributor']
    >,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlResolverQueryResultCalendarResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UrlResolverQueryResultCalendar'] = ResolversParentTypes['UrlResolverQueryResultCalendar']
> = {
  calendarEventId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlResolverQueryResultCalloutsSetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UrlResolverQueryResultCalloutsSet'] = ResolversParentTypes['UrlResolverQueryResultCalloutsSet']
> = {
  calloutId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  contributionId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  memoId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  postId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['UrlType'], ParentType, ContextType>;
  whiteboardId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlResolverQueryResultCollaborationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UrlResolverQueryResultCollaboration'] = ResolversParentTypes['UrlResolverQueryResultCollaboration']
> = {
  calloutsSet?: Resolver<
    ResolversTypes['UrlResolverQueryResultCalloutsSet'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlResolverQueryResultInnovationPackResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UrlResolverQueryResultInnovationPack'] = ResolversParentTypes['UrlResolverQueryResultInnovationPack']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  templatesSet?: Resolver<
    ResolversTypes['UrlResolverQueryResultTemplatesSet'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlResolverQueryResultSpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UrlResolverQueryResultSpace'] = ResolversParentTypes['UrlResolverQueryResultSpace']
> = {
  calendar?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UrlResolverQueryResultCalendar']>,
    ParentType,
    ContextType
  >;
  collaboration?: Resolver<
    ResolversTypes['UrlResolverQueryResultCollaboration'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['SpaceLevel'], ParentType, ContextType>;
  levelZeroSpaceID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentSpaces?: Resolver<
    Array<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  templatesSet?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UrlResolverQueryResultTemplatesSet']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlResolverQueryResultTemplatesSetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UrlResolverQueryResultTemplatesSet'] = ResolversParentTypes['UrlResolverQueryResultTemplatesSet']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  templateId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlResolverQueryResultVirtualContributorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UrlResolverQueryResultVirtualContributor'] = ResolversParentTypes['UrlResolverQueryResultVirtualContributor']
> = {
  calloutsSet?: Resolver<
    ResolversTypes['UrlResolverQueryResultCalloutsSet'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlResolverQueryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UrlResolverQueryResults'] = ResolversParentTypes['UrlResolverQueryResults']
> = {
  closestAncestor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UrlResolverQueryClosestAncestor']>,
    ParentType,
    ContextType
  >;
  discussionId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  innovationHubId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  innovationPack?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UrlResolverQueryResultInnovationPack']>,
    ParentType,
    ContextType
  >;
  organizationId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  space?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UrlResolverQueryResultSpace']>,
    ParentType,
    ContextType
  >;
  state?: Resolver<
    ResolversTypes['UrlResolverResultState'],
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['UrlType'], ParentType, ContextType>;
  userId?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  virtualContributor?: Resolver<
    SchemaTypes.Maybe<
      ResolversTypes['UrlResolverQueryResultVirtualContributor']
    >,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  account?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType
  >;
  actor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  authentication?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UserAuthenticationResult']>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credentials?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Credential']>>,
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isContactable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isContactableViaEmail?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  phone?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  settings?: Resolver<ResolversTypes['UserSettings'], ParentType, ContextType>;
  storageAggregator?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['StorageAggregator']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['ActorType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAuthenticationResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserAuthenticationResult'] = ResolversParentTypes['UserAuthenticationResult']
> = {
  authenticatedAt?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  methods?: Resolver<
    Array<ResolversTypes['AuthenticationType']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEmailChangeAuditEntriesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserEmailChangeAuditEntries'] = ResolversParentTypes['UserEmailChangeAuditEntries']
> = {
  auditEntries?: Resolver<
    Array<ResolversTypes['UserEmailChangeAuditEntry']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    ResolversTypes['UserEmailChangeAuditEntriesPageInfo'],
    ParentType,
    ContextType
  >;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEmailChangeAuditEntriesPageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserEmailChangeAuditEntriesPageInfo'] = ResolversParentTypes['UserEmailChangeAuditEntriesPageInfo']
> = {
  endCursor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEmailChangeAuditEntryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserEmailChangeAuditEntry'] = ResolversParentTypes['UserEmailChangeAuditEntry']
> = {
  approver?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['EmailChangeApprover']>,
    ParentType,
    ContextType
  >;
  failureReason?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  initiator?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UserProfileSummary']>,
    ParentType,
    ContextType
  >;
  initiatorRole?: Resolver<
    ResolversTypes['UserEmailChangeInitiatorRole'],
    ParentType,
    ContextType
  >;
  newEmail?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  oldEmail?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  outcome?: Resolver<
    ResolversTypes['UserEmailChangeAuditOutcome'],
    ParentType,
    ContextType
  >;
  reason?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  subject?: Resolver<
    ResolversTypes['UserProfileSummary'],
    ParentType,
    ContextType
  >;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEmailChangeResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserEmailChangeResult'] = ResolversParentTypes['UserEmailChangeResult']
> = {
  email?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserGroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserGroup'] = ResolversParentTypes['UserGroup']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  members?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  parent?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Groupable']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileSummaryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserProfileSummary'] = ResolversParentTypes['UserProfileSummary']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']
> = {
  assistant?: Resolver<
    ResolversTypes['UserSettingsAssistant'],
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  communication?: Resolver<
    ResolversTypes['UserSettingsCommunication'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dashboard?: Resolver<
    ResolversTypes['UserSettingsDashboard'],
    ParentType,
    ContextType
  >;
  designVersion?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  homeSpace?: Resolver<
    ResolversTypes['UserSettingsHomeSpace'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  language?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  languageOfferAnswered?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  notification?: Resolver<
    ResolversTypes['UserSettingsNotification'],
    ParentType,
    ContextType
  >;
  privacy?: Resolver<
    ResolversTypes['UserSettingsPrivacy'],
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsAssistantResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsAssistant'] = ResolversParentTypes['UserSettingsAssistant']
> = {
  enabledCapabilities?: Resolver<
    Array<ResolversTypes['AssistantCapabilityToggle']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsCommunicationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsCommunication'] = ResolversParentTypes['UserSettingsCommunication']
> = {
  allowOtherUsersToContactViaEmail?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  allowOtherUsersToSendMessages?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsDashboardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsDashboard'] = ResolversParentTypes['UserSettingsDashboard']
> = {
  activityView?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsHomeSpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsHomeSpace'] = ResolversParentTypes['UserSettingsHomeSpace']
> = {
  autoRedirect?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  spaceID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsNotificationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsNotification'] = ResolversParentTypes['UserSettingsNotification']
> = {
  organization?: Resolver<
    ResolversTypes['UserSettingsNotificationOrganization'],
    ParentType,
    ContextType
  >;
  platform?: Resolver<
    ResolversTypes['UserSettingsNotificationPlatform'],
    ParentType,
    ContextType
  >;
  sound?: Resolver<
    ResolversTypes['UserSettingsNotificationSound'],
    ParentType,
    ContextType
  >;
  space?: Resolver<
    ResolversTypes['UserSettingsNotificationSpace'],
    ParentType,
    ContextType
  >;
  user?: Resolver<
    ResolversTypes['UserSettingsNotificationUser'],
    ParentType,
    ContextType
  >;
  virtualContributor?: Resolver<
    ResolversTypes['UserSettingsNotificationVirtualContributor'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsNotificationChannelsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsNotificationChannels'] = ResolversParentTypes['UserSettingsNotificationChannels']
> = {
  email?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  inApp?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  push?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsNotificationOrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsNotificationOrganization'] = ResolversParentTypes['UserSettingsNotificationOrganization']
> = {
  adminMentioned?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  adminMessageReceived?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsNotificationPlatformResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsNotificationPlatform'] = ResolversParentTypes['UserSettingsNotificationPlatform']
> = {
  admin?: Resolver<
    ResolversTypes['UserSettingsNotificationPlatformAdmin'],
    ParentType,
    ContextType
  >;
  forumDiscussionComment?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  forumDiscussionCreated?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsNotificationPlatformAdminResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsNotificationPlatformAdmin'] = ResolversParentTypes['UserSettingsNotificationPlatformAdmin']
> = {
  spaceCreated?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  userEmailChanged?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  userGlobalRoleChanged?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  userProfileCreated?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  userProfileRemoved?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsNotificationSoundResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsNotificationSound'] = ResolversParentTypes['UserSettingsNotificationSound']
> = {
  chatMessage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  inAppNotification?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsNotificationSpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsNotificationSpace'] = ResolversParentTypes['UserSettingsNotificationSpace']
> = {
  admin?: Resolver<
    ResolversTypes['UserSettingsNotificationSpaceAdmin'],
    ParentType,
    ContextType
  >;
  collaborationCalloutComment?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  collaborationCalloutContributionCreated?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  collaborationCalloutPostContributionComment?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  collaborationCalloutPublished?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  collaborationCalloutReaction?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  collaborationPollModifiedOnPollIVotedOn?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  collaborationPollVoteAffectedByOptionChange?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  collaborationPollVoteCastOnOwnPoll?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  collaborationPollVoteCastOnPollIVotedOn?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  communicationUpdates?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  communityCalendarEvents?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsNotificationSpaceAdminResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsNotificationSpaceAdmin'] = ResolversParentTypes['UserSettingsNotificationSpaceAdmin']
> = {
  collaborationCalloutContributionCreated?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  communicationMessageReceived?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  communityApplicationReceived?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  communityNewMember?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  userEmailChanged?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsNotificationUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsNotificationUser'] = ResolversParentTypes['UserSettingsNotificationUser']
> = {
  commentReply?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  conversationMessageDirect?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  conversationMessageGroup?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  membership?: Resolver<
    ResolversTypes['UserSettingsNotificationUserMembership'],
    ParentType,
    ContextType
  >;
  mentioned?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  messageReceived?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsNotificationUserMembershipResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsNotificationUserMembership'] = ResolversParentTypes['UserSettingsNotificationUserMembership']
> = {
  spaceCommunityInvitationReceived?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  spaceCommunityJoined?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsNotificationVirtualContributorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsNotificationVirtualContributor'] = ResolversParentTypes['UserSettingsNotificationVirtualContributor']
> = {
  adminSpaceCommunityInvitation?: Resolver<
    ResolversTypes['UserSettingsNotificationChannels'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsPrivacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserSettingsPrivacy'] = ResolversParentTypes['UserSettingsPrivacy']
> = {
  contributionRolesPubliclyVisible?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersInRolesResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UsersInRolesResponse'] = ResolversParentTypes['UsersInRolesResponse']
> = {
  role?: Resolver<ResolversTypes['RoleName'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VcInteractionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VcInteraction'] = ResolversParentTypes['VcInteraction']
> = {
  threadID?: Resolver<ResolversTypes['MessageID'], ParentType, ContextType>;
  virtualContributorID?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualAssistantResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualAssistant'] = ResolversParentTypes['VirtualAssistant']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  capabilityGrant?: Resolver<
    Array<ResolversTypes['AssistantCapabilityToggle']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credentials?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Credential']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['ActorType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualContributorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualContributor'] = ResolversParentTypes['VirtualContributor']
> = {
  account?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType
  >;
  actor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  aiPersona?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['AiPersona']>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  bodyOfKnowledgeDescription?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  bodyOfKnowledgeID?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  bodyOfKnowledgeLastUpdated?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  bodyOfKnowledgeType?: Resolver<
    ResolversTypes['VirtualContributorBodyOfKnowledgeType'],
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credentials?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['Credential']>>,
    ParentType,
    ContextType
  >;
  dataAccessMode?: Resolver<
    ResolversTypes['VirtualContributorDataAccessMode'],
    ParentType,
    ContextType
  >;
  engine?: Resolver<ResolversTypes['AiPersonaEngine'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  interactionModes?: Resolver<
    ResolversTypes['VirtualContributorInteractionMode'],
    ParentType,
    ContextType
  >;
  knowledgeBase?: Resolver<
    ResolversTypes['KnowledgeBase'],
    ParentType,
    ContextType
  >;
  knowledgeSpace?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  listedInStore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  modelCard?: Resolver<
    ResolversTypes['VirtualContributorModelCard'],
    ParentType,
    ContextType
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  platformSettings?: Resolver<
    ResolversTypes['VirtualContributorPlatformSettings'],
    ParentType,
    ContextType
  >;
  profile?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  promptGraphDefinition?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['PromptGraphDefinition']>,
    ParentType,
    ContextType
  >;
  provider?: Resolver<ResolversTypes['Actor'], ParentType, ContextType>;
  searchVisibility?: Resolver<
    ResolversTypes['SearchVisibility'],
    ParentType,
    ContextType
  >;
  settings?: Resolver<
    ResolversTypes['VirtualContributorSettings'],
    ParentType,
    ContextType
  >;
  status?: Resolver<
    ResolversTypes['VirtualContributorStatus'],
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['ActorType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  wellKnownVirtualContributor?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['VirtualContributorWellKnown']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualContributorModelCardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualContributorModelCard'] = ResolversParentTypes['VirtualContributorModelCard']
> = {
  aiEngine?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ModelCardAiEngineResult']>,
    ParentType,
    ContextType
  >;
  monitoring?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['ModelCardMonitoringResult']>,
    ParentType,
    ContextType
  >;
  spaceUsage?: Resolver<
    SchemaTypes.Maybe<Array<ResolversTypes['ModelCardSpaceUsageResult']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualContributorModelCardFlagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualContributorModelCardFlag'] = ResolversParentTypes['VirtualContributorModelCardFlag']
> = {
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<
    ResolversTypes['VirtualContributorModelCardEntryFlagName'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualContributorPlatformSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualContributorPlatformSettings'] = ResolversParentTypes['VirtualContributorPlatformSettings']
> = {
  promptGraphEditingEnabled?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualContributorSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualContributorSettings'] = ResolversParentTypes['VirtualContributorSettings']
> = {
  privacy?: Resolver<
    ResolversTypes['VirtualContributorSettingsPrivacy'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualContributorSettingsPrivacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualContributorSettingsPrivacy'] = ResolversParentTypes['VirtualContributorSettingsPrivacy']
> = {
  knowledgeBaseContentVisible?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualContributorUpdatedSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualContributorUpdatedSubscriptionResult'] = ResolversParentTypes['VirtualContributorUpdatedSubscriptionResult']
> = {
  virtualContributor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualContributorsInRolesResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualContributorsInRolesResponse'] = ResolversParentTypes['VirtualContributorsInRolesResponse']
> = {
  role?: Resolver<ResolversTypes['RoleName'], ParentType, ContextType>;
  virtualContributors?: Resolver<
    Array<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisualResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Visual'] = ResolversParentTypes['Visual']
> = {
  allowedTypes?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  alternativeText?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  aspectRatio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  maxHeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxWidth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minHeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minWidth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['VisualType'], ParentType, ContextType>;
  sortOrder?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisualConstraintsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VisualConstraints'] = ResolversParentTypes['VisualConstraints']
> = {
  allowedTypes?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  aspectRatio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxAspectRatio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxHeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxWidth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minAspectRatio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minHeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minWidth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WhiteboardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Whiteboard'] = ResolversParentTypes['Whiteboard']
> = {
  authorization?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  contentUpdatePolicy?: Resolver<
    ResolversTypes['ContentUpdatePolicy'],
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  guestContributionsAllowed?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isMultiUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  previewSettings?: Resolver<
    ResolversTypes['WhiteboardPreviewSettings'],
    ParentType,
    ContextType
  >;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WhiteboardPreviewCoordinatesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WhiteboardPreviewCoordinates'] = ResolversParentTypes['WhiteboardPreviewCoordinates']
> = {
  height?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WhiteboardPreviewCoordinatesDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WhiteboardPreviewCoordinatesData'] = ResolversParentTypes['WhiteboardPreviewCoordinatesData']
> = {
  height?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WhiteboardPreviewSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WhiteboardPreviewSettings'] = ResolversParentTypes['WhiteboardPreviewSettings']
> = {
  coordinates?: Resolver<
    SchemaTypes.Maybe<ResolversTypes['WhiteboardPreviewCoordinates']>,
    ParentType,
    ContextType
  >;
  mode?: Resolver<
    ResolversTypes['WhiteboardPreviewMode'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  APM?: ApmResolvers<ContextType>;
  Account?: AccountResolvers<ContextType>;
  AccountLicensePlan?: AccountLicensePlanResolvers<ContextType>;
  AccountSubscription?: AccountSubscriptionResolvers<ContextType>;
  ActivityCreatedSubscriptionResult?: ActivityCreatedSubscriptionResultResolvers<ContextType>;
  ActivityFeed?: ActivityFeedResolvers<ContextType>;
  ActivityLogEntry?: ActivityLogEntryResolvers<ContextType>;
  ActivityLogEntryCalendarEventCreated?: ActivityLogEntryCalendarEventCreatedResolvers<ContextType>;
  ActivityLogEntryCalloutDiscussionComment?: ActivityLogEntryCalloutDiscussionCommentResolvers<ContextType>;
  ActivityLogEntryCalloutLinkCreated?: ActivityLogEntryCalloutLinkCreatedResolvers<ContextType>;
  ActivityLogEntryCalloutMemoCreated?: ActivityLogEntryCalloutMemoCreatedResolvers<ContextType>;
  ActivityLogEntryCalloutPostComment?: ActivityLogEntryCalloutPostCommentResolvers<ContextType>;
  ActivityLogEntryCalloutPostCreated?: ActivityLogEntryCalloutPostCreatedResolvers<ContextType>;
  ActivityLogEntryCalloutPublished?: ActivityLogEntryCalloutPublishedResolvers<ContextType>;
  ActivityLogEntryCalloutWhiteboardContentModified?: ActivityLogEntryCalloutWhiteboardContentModifiedResolvers<ContextType>;
  ActivityLogEntryCalloutWhiteboardCreated?: ActivityLogEntryCalloutWhiteboardCreatedResolvers<ContextType>;
  ActivityLogEntryMemberJoined?: ActivityLogEntryMemberJoinedResolvers<ContextType>;
  ActivityLogEntrySubspaceCreated?: ActivityLogEntrySubspaceCreatedResolvers<ContextType>;
  ActivityLogEntryUpdateSent?: ActivityLogEntryUpdateSentResolvers<ContextType>;
  Actor?: ActorResolvers<ContextType>;
  ActorFull?: ActorFullResolvers<ContextType>;
  ActorRolePolicy?: ActorRolePolicyResolvers<ContextType>;
  ActorRoles?: ActorRolesResolvers<ContextType>;
  AiPersona?: AiPersonaResolvers<ContextType>;
  AiServer?: AiServerResolvers<ContextType>;
  Application?: ApplicationResolvers<ContextType>;
  AssistantCapability?: AssistantCapabilityResolvers<ContextType>;
  AssistantCapabilityToggle?: AssistantCapabilityToggleResolvers<ContextType>;
  AuthenticationConfig?: AuthenticationConfigResolvers<ContextType>;
  AuthenticationProviderConfig?: AuthenticationProviderConfigResolvers<ContextType>;
  AuthenticationProviderConfigUnion?: AuthenticationProviderConfigUnionResolvers<ContextType>;
  Authorization?: AuthorizationResolvers<ContextType>;
  AuthorizationPolicyRuleCredential?: AuthorizationPolicyRuleCredentialResolvers<ContextType>;
  AuthorizationPolicyRulePrivilege?: AuthorizationPolicyRulePrivilegeResolvers<ContextType>;
  Calendar?: CalendarResolvers<ContextType>;
  CalendarEvent?: CalendarEventResolvers<ContextType>;
  Callout?: CalloutResolvers<ContextType>;
  CalloutContribution?: CalloutContributionResolvers<ContextType>;
  CalloutContributionDefaults?: CalloutContributionDefaultsResolvers<ContextType>;
  CalloutContributionsCountOutput?: CalloutContributionsCountOutputResolvers<ContextType>;
  CalloutContributorsMapView?: CalloutContributorsMapViewResolvers<ContextType>;
  CalloutContributorsSettings?: CalloutContributorsSettingsResolvers<ContextType>;
  CalloutFraming?: CalloutFramingResolvers<ContextType>;
  CalloutPostCreated?: CalloutPostCreatedResolvers<ContextType>;
  CalloutReaction?: CalloutReactionResolvers<ContextType>;
  CalloutReactionsSummary?: CalloutReactionsSummaryResolvers<ContextType>;
  CalloutSelectionSettings?: CalloutSelectionSettingsResolvers<ContextType>;
  CalloutSettings?: CalloutSettingsResolvers<ContextType>;
  CalloutSettingsContribution?: CalloutSettingsContributionResolvers<ContextType>;
  CalloutSettingsFraming?: CalloutSettingsFramingResolvers<ContextType>;
  CalloutsSet?: CalloutsSetResolvers<ContextType>;
  Classification?: ClassificationResolvers<ContextType>;
  ClassificationEntry?: ClassificationEntryResolvers<ContextType>;
  ClassificationTemplateContent?: ClassificationTemplateContentResolvers<ContextType>;
  ClassificationValue?: ClassificationValueResolvers<ContextType>;
  CollaboraDocument?: CollaboraDocumentResolvers<ContextType>;
  CollaboraEditorUrlResult?: CollaboraEditorUrlResultResolvers<ContextType>;
  Collaboration?: CollaborationResolvers<ContextType>;
  CollaborationMigrationIssue?: CollaborationMigrationIssueResolvers<ContextType>;
  CollaborationMigrationResult?: CollaborationMigrationResultResolvers<ContextType>;
  Communication?: CommunicationResolvers<ContextType>;
  CommunicationAdminMembershipResult?: CommunicationAdminMembershipResultResolvers<ContextType>;
  CommunicationAdminMigrateRoomsResult?: CommunicationAdminMigrateRoomsResultResolvers<ContextType>;
  CommunicationAdminOrphanedUsageResult?: CommunicationAdminOrphanedUsageResultResolvers<ContextType>;
  CommunicationAdminRoomMembershipResult?: CommunicationAdminRoomMembershipResultResolvers<ContextType>;
  CommunicationAdminRoomResult?: CommunicationAdminRoomResultResolvers<ContextType>;
  Community?: CommunityResolvers<ContextType>;
  CommunityApplicationForRoleResult?: CommunityApplicationForRoleResultResolvers<ContextType>;
  CommunityApplicationResult?: CommunityApplicationResultResolvers<ContextType>;
  CommunityGuidelines?: CommunityGuidelinesResolvers<ContextType>;
  CommunityInvitationForRoleResult?: CommunityInvitationForRoleResultResolvers<ContextType>;
  CommunityInvitationResult?: CommunityInvitationResultResolvers<ContextType>;
  CommunityMembershipResult?: CommunityMembershipResultResolvers<ContextType>;
  Config?: ConfigResolvers<ContextType>;
  ContributorCollectionCounts?: ContributorCollectionCountsResolvers<ContextType>;
  ContributorCollectionItem?: ContributorCollectionItemResolvers<ContextType>;
  ContributorLocation?: ContributorLocationResolvers<ContextType>;
  Conversation?: ConversationResolvers<ContextType>;
  ConversationCreatedEvent?: ConversationCreatedEventResolvers<ContextType>;
  ConversationDeletedEvent?: ConversationDeletedEventResolvers<ContextType>;
  ConversationEventSubscriptionResult?: ConversationEventSubscriptionResultResolvers<ContextType>;
  ConversationMemberAddedEvent?: ConversationMemberAddedEventResolvers<ContextType>;
  ConversationMemberRemovedEvent?: ConversationMemberRemovedEventResolvers<ContextType>;
  ConversationMessageReceivedEvent?: ConversationMessageReceivedEventResolvers<ContextType>;
  ConversationMessageRemovedEvent?: ConversationMessageRemovedEventResolvers<ContextType>;
  ConversationReadReceiptUpdatedEvent?: ConversationReadReceiptUpdatedEventResolvers<ContextType>;
  ConversationUpdatedEvent?: ConversationUpdatedEventResolvers<ContextType>;
  CreateCalloutContributionData?: CreateCalloutContributionDataResolvers<ContextType>;
  CreateCalloutContributionDefaultsData?: CreateCalloutContributionDefaultsDataResolvers<ContextType>;
  CreateCalloutContributorsMapViewData?: CreateCalloutContributorsMapViewDataResolvers<ContextType>;
  CreateCalloutContributorsSettingsData?: CreateCalloutContributorsSettingsDataResolvers<ContextType>;
  CreateCalloutData?: CreateCalloutDataResolvers<ContextType>;
  CreateCalloutFramingData?: CreateCalloutFramingDataResolvers<ContextType>;
  CreateCalloutSelectionSettingsData?: CreateCalloutSelectionSettingsDataResolvers<ContextType>;
  CreateCalloutSettingsContributionData?: CreateCalloutSettingsContributionDataResolvers<ContextType>;
  CreateCalloutSettingsData?: CreateCalloutSettingsDataResolvers<ContextType>;
  CreateCalloutSettingsFramingData?: CreateCalloutSettingsFramingDataResolvers<ContextType>;
  CreateCalloutTaskBoardData?: CreateCalloutTaskBoardDataResolvers<ContextType>;
  CreateCalloutsSetData?: CreateCalloutsSetDataResolvers<ContextType>;
  CreateClassificationData?: CreateClassificationDataResolvers<ContextType>;
  CreateCollaboraDocumentData?: CreateCollaboraDocumentDataResolvers<ContextType>;
  CreateCollaborationData?: CreateCollaborationDataResolvers<ContextType>;
  CreateCommunityGuidelinesData?: CreateCommunityGuidelinesDataResolvers<ContextType>;
  CreateInnovationFlowData?: CreateInnovationFlowDataResolvers<ContextType>;
  CreateInnovationFlowStateData?: CreateInnovationFlowStateDataResolvers<ContextType>;
  CreateInnovationFlowStateSettingsData?: CreateInnovationFlowStateSettingsDataResolvers<ContextType>;
  CreateLinkData?: CreateLinkDataResolvers<ContextType>;
  CreateLocationData?: CreateLocationDataResolvers<ContextType>;
  CreateMemoData?: CreateMemoDataResolvers<ContextType>;
  CreatePollData?: CreatePollDataResolvers<ContextType>;
  CreatePostData?: CreatePostDataResolvers<ContextType>;
  CreateProfileData?: CreateProfileDataResolvers<ContextType>;
  CreateReferenceData?: CreateReferenceDataResolvers<ContextType>;
  CreateTagsetData?: CreateTagsetDataResolvers<ContextType>;
  CreateVisualOnProfileData?: CreateVisualOnProfileDataResolvers<ContextType>;
  CreateWhiteboardData?: CreateWhiteboardDataResolvers<ContextType>;
  CreateWhiteboardPreviewSettingsData?: CreateWhiteboardPreviewSettingsDataResolvers<ContextType>;
  Credential?: CredentialResolvers<ContextType>;
  CredentialDefinition?: CredentialDefinitionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DirectMessageDeliveryResult?: DirectMessageDeliveryResultResolvers<ContextType>;
  Discussion?: DiscussionResolvers<ContextType>;
  DiscussionDetails?: DiscussionDetailsResolvers<ContextType>;
  Document?: DocumentResolvers<ContextType>;
  EmailChangeApprover?: EmailChangeApproverResolvers<ContextType>;
  Emoji?: GraphQLScalarType;
  ExternalConfig?: ExternalConfigResolvers<ContextType>;
  FileStorageConfig?: FileStorageConfigResolvers<ContextType>;
  Form?: FormResolvers<ContextType>;
  FormQuestion?: FormQuestionResolvers<ContextType>;
  Forum?: ForumResolvers<ContextType>;
  Geo?: GeoResolvers<ContextType>;
  GeoLocation?: GeoLocationResolvers<ContextType>;
  Groupable?: GroupableResolvers<ContextType>;
  ISearchCategoryResult?: ISearchCategoryResultResolvers<ContextType>;
  ISearchResults?: ISearchResultsResolvers<ContextType>;
  InAppNotification?: InAppNotificationResolvers<ContextType>;
  InAppNotificationPayload?: InAppNotificationPayloadResolvers<ContextType>;
  InAppNotificationPayloadOrganizationMessageDirect?: InAppNotificationPayloadOrganizationMessageDirectResolvers<ContextType>;
  InAppNotificationPayloadOrganizationMessageRoom?: InAppNotificationPayloadOrganizationMessageRoomResolvers<ContextType>;
  InAppNotificationPayloadPlatformForumDiscussion?: InAppNotificationPayloadPlatformForumDiscussionResolvers<ContextType>;
  InAppNotificationPayloadPlatformGlobalRoleChange?: InAppNotificationPayloadPlatformGlobalRoleChangeResolvers<ContextType>;
  InAppNotificationPayloadPlatformUser?: InAppNotificationPayloadPlatformUserResolvers<ContextType>;
  InAppNotificationPayloadPlatformUserMessageRoom?: InAppNotificationPayloadPlatformUserMessageRoomResolvers<ContextType>;
  InAppNotificationPayloadPlatformUserProfileRemoved?: InAppNotificationPayloadPlatformUserProfileRemovedResolvers<ContextType>;
  InAppNotificationPayloadSpace?: InAppNotificationPayloadSpaceResolvers<ContextType>;
  InAppNotificationPayloadSpaceCollaborationCallout?: InAppNotificationPayloadSpaceCollaborationCalloutResolvers<ContextType>;
  InAppNotificationPayloadSpaceCollaborationCalloutComment?: InAppNotificationPayloadSpaceCollaborationCalloutCommentResolvers<ContextType>;
  InAppNotificationPayloadSpaceCollaborationCalloutPostComment?: InAppNotificationPayloadSpaceCollaborationCalloutPostCommentResolvers<ContextType>;
  InAppNotificationPayloadSpaceCollaborationCalloutReaction?: InAppNotificationPayloadSpaceCollaborationCalloutReactionResolvers<ContextType>;
  InAppNotificationPayloadSpaceCollaborationPoll?: InAppNotificationPayloadSpaceCollaborationPollResolvers<ContextType>;
  InAppNotificationPayloadSpaceCommunicationMessageDirect?: InAppNotificationPayloadSpaceCommunicationMessageDirectResolvers<ContextType>;
  InAppNotificationPayloadSpaceCommunicationUpdate?: InAppNotificationPayloadSpaceCommunicationUpdateResolvers<ContextType>;
  InAppNotificationPayloadSpaceCommunityActor?: InAppNotificationPayloadSpaceCommunityActorResolvers<ContextType>;
  InAppNotificationPayloadSpaceCommunityApplication?: InAppNotificationPayloadSpaceCommunityApplicationResolvers<ContextType>;
  InAppNotificationPayloadSpaceCommunityCalendarEvent?: InAppNotificationPayloadSpaceCommunityCalendarEventResolvers<ContextType>;
  InAppNotificationPayloadSpaceCommunityCalendarEventComment?: InAppNotificationPayloadSpaceCommunityCalendarEventCommentResolvers<ContextType>;
  InAppNotificationPayloadSpaceCommunityInvitation?: InAppNotificationPayloadSpaceCommunityInvitationResolvers<ContextType>;
  InAppNotificationPayloadSpaceCommunityInvitationPlatform?: InAppNotificationPayloadSpaceCommunityInvitationPlatformResolvers<ContextType>;
  InAppNotificationPayloadUserMessageDirect?: InAppNotificationPayloadUserMessageDirectResolvers<ContextType>;
  InAppNotificationPayloadVirtualContributor?: InAppNotificationPayloadVirtualContributorResolvers<ContextType>;
  InnovationFlow?: InnovationFlowResolvers<ContextType>;
  InnovationFlowSettings?: InnovationFlowSettingsResolvers<ContextType>;
  InnovationFlowState?: InnovationFlowStateResolvers<ContextType>;
  InnovationFlowStateSettings?: InnovationFlowStateSettingsResolvers<ContextType>;
  InnovationHub?: InnovationHubResolvers<ContextType>;
  InnovationPack?: InnovationPackResolvers<ContextType>;
  InputCreatorQueryResults?: InputCreatorQueryResultsResolvers<ContextType>;
  Invitation?: InvitationResolvers<ContextType>;
  KnowledgeBase?: KnowledgeBaseResolvers<ContextType>;
  KratosIdentity?: KratosIdentityResolvers<ContextType>;
  LanguageConfig?: LanguageConfigResolvers<ContextType>;
  LatestReleaseDiscussion?: LatestReleaseDiscussionResolvers<ContextType>;
  Library?: LibraryResolvers<ContextType>;
  License?: LicenseResolvers<ContextType>;
  LicenseEntitlement?: LicenseEntitlementResolvers<ContextType>;
  LicensePlan?: LicensePlanResolvers<ContextType>;
  LicensePolicy?: LicensePolicyResolvers<ContextType>;
  Licensing?: LicensingResolvers<ContextType>;
  LicensingCredentialBasedPolicyCredentialRule?: LicensingCredentialBasedPolicyCredentialRuleResolvers<ContextType>;
  LicensingGrantedEntitlement?: LicensingGrantedEntitlementResolvers<ContextType>;
  Lifecycle?: LifecycleResolvers<ContextType>;
  LifecycleDefinition?: GraphQLScalarType;
  Link?: LinkResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  LookupByNameQueryResults?: LookupByNameQueryResultsResolvers<ContextType>;
  LookupMyPrivilegesQueryResults?: LookupMyPrivilegesQueryResultsResolvers<ContextType>;
  LookupQueryResults?: LookupQueryResultsResolvers<ContextType>;
  Markdown?: GraphQLScalarType;
  McpApiKey?: McpApiKeyResolvers<ContextType>;
  McpApiKeyMintResult?: McpApiKeyMintResultResolvers<ContextType>;
  MeConversationsResult?: MeConversationsResultResolvers<ContextType>;
  MeQueryResults?: MeQueryResultsResolvers<ContextType>;
  MediaGallery?: MediaGalleryResolvers<ContextType>;
  Memo?: MemoResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageDetails?: MessageDetailsResolvers<ContextType>;
  MessageID?: GraphQLScalarType;
  MessageParent?: MessageParentResolvers<ContextType>;
  Messaging?: MessagingResolvers<ContextType>;
  Metadata?: MetadataResolvers<ContextType>;
  MigrateEmbeddings?: MigrateEmbeddingsResolvers<ContextType>;
  ModelCardAiEngineResult?: ModelCardAiEngineResultResolvers<ContextType>;
  ModelCardMonitoringResult?: ModelCardMonitoringResultResolvers<ContextType>;
  ModelCardSpaceUsageResult?: ModelCardSpaceUsageResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MySpaceResults?: MySpaceResultsResolvers<ContextType>;
  NVP?: NvpResolvers<ContextType>;
  NameID?: GraphQLScalarType;
  NotificationRecipientResult?: NotificationRecipientResultResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  OrganizationSettings?: OrganizationSettingsResolvers<ContextType>;
  OrganizationSettingsMembership?: OrganizationSettingsMembershipResolvers<ContextType>;
  OrganizationSettingsPrivacy?: OrganizationSettingsPrivacyResolvers<ContextType>;
  OrganizationVerification?: OrganizationVerificationResolvers<ContextType>;
  OrganizationsInRolesResponse?: OrganizationsInRolesResponseResolvers<ContextType>;
  OryConfig?: OryConfigResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PaginatedInAppNotifications?: PaginatedInAppNotificationsResolvers<ContextType>;
  PaginatedInnovationPacks?: PaginatedInnovationPacksResolvers<ContextType>;
  PaginatedLibraryTemplateResults?: PaginatedLibraryTemplateResultsResolvers<ContextType>;
  PaginatedOrganization?: PaginatedOrganizationResolvers<ContextType>;
  PaginatedSpaces?: PaginatedSpacesResolvers<ContextType>;
  PaginatedUsers?: PaginatedUsersResolvers<ContextType>;
  PaginatedVirtualContributor?: PaginatedVirtualContributorResolvers<ContextType>;
  Platform?: PlatformResolvers<ContextType>;
  PlatformAccessRole?: PlatformAccessRoleResolvers<ContextType>;
  PlatformAdminCommunicationQueryResults?: PlatformAdminCommunicationQueryResultsResolvers<ContextType>;
  PlatformAdminIdentityQueryResults?: PlatformAdminIdentityQueryResultsResolvers<ContextType>;
  PlatformAdminQueryResults?: PlatformAdminQueryResultsResolvers<ContextType>;
  PlatformFeatureFlag?: PlatformFeatureFlagResolvers<ContextType>;
  PlatformIntegrationSettings?: PlatformIntegrationSettingsResolvers<ContextType>;
  PlatformInvitation?: PlatformInvitationResolvers<ContextType>;
  PlatformLocations?: PlatformLocationsResolvers<ContextType>;
  PlatformRolesAccess?: PlatformRolesAccessResolvers<ContextType>;
  PlatformSettings?: PlatformSettingsResolvers<ContextType>;
  PlatformWellKnownVirtualContributorMapping?: PlatformWellKnownVirtualContributorMappingResolvers<ContextType>;
  PlatformWellKnownVirtualContributors?: PlatformWellKnownVirtualContributorsResolvers<ContextType>;
  Poll?: PollResolvers<ContextType>;
  PollOption?: PollOptionResolvers<ContextType>;
  PollOptionsChangedSubscriptionResult?: PollOptionsChangedSubscriptionResultResolvers<ContextType>;
  PollSettings?: PollSettingsResolvers<ContextType>;
  PollSettingsData?: PollSettingsDataResolvers<ContextType>;
  PollVote?: PollVoteResolvers<ContextType>;
  PollVoteUpdatedSubscriptionResult?: PollVoteUpdatedSubscriptionResultResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  PromptGraph?: PromptGraphResolvers<ContextType>;
  PromptGraphDataPoint?: PromptGraphDataPointResolvers<ContextType>;
  PromptGraphDataStruct?: PromptGraphDataStructResolvers<ContextType>;
  PromptGraphDefinition?: PromptGraphDefinitionResolvers<ContextType>;
  PromptGraphDefinitionDataPoint?: PromptGraphDefinitionDataPointResolvers<ContextType>;
  PromptGraphDefinitionDataStruct?: PromptGraphDefinitionDataStructResolvers<ContextType>;
  PromptGraphDefinitionEdge?: PromptGraphDefinitionEdgeResolvers<ContextType>;
  PromptGraphDefinitionNode?: PromptGraphDefinitionNodeResolvers<ContextType>;
  PromptGraphEdge?: PromptGraphEdgeResolvers<ContextType>;
  PromptGraphNode?: PromptGraphNodeResolvers<ContextType>;
  PruneInAppNotificationAdminResult?: PruneInAppNotificationAdminResultResolvers<ContextType>;
  PushSubscription?: PushSubscriptionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  Reaction?: ReactionResolvers<ContextType>;
  Reference?: ReferenceResolvers<ContextType>;
  RelayPaginatedSpace?: RelayPaginatedSpaceResolvers<ContextType>;
  RelayPaginatedSpaceEdge?: RelayPaginatedSpaceEdgeResolvers<ContextType>;
  RelayPaginatedSpacePageInfo?: RelayPaginatedSpacePageInfoResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  RoleSet?: RoleSetResolvers<ContextType>;
  RoleSetInvitationResult?: RoleSetInvitationResultResolvers<ContextType>;
  RolesResult?: RolesResultResolvers<ContextType>;
  RolesResultCommunity?: RolesResultCommunityResolvers<ContextType>;
  RolesResultOrganization?: RolesResultOrganizationResolvers<ContextType>;
  RolesResultSpace?: RolesResultSpaceResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  RoomEventSubscriptionResult?: RoomEventSubscriptionResultResolvers<ContextType>;
  RoomMessageEventSubscriptionResult?: RoomMessageEventSubscriptionResultResolvers<ContextType>;
  RoomMessageReactionEventSubscriptionResult?: RoomMessageReactionEventSubscriptionResultResolvers<ContextType>;
  RoomThreadUnreadCount?: RoomThreadUnreadCountResolvers<ContextType>;
  RoomUnreadCounts?: RoomUnreadCountsResolvers<ContextType>;
  SearchCursor?: GraphQLScalarType;
  SearchResult?: SearchResultResolvers<ContextType>;
  SearchResultCallout?: SearchResultCalloutResolvers<ContextType>;
  SearchResultCollaboraDocument?: SearchResultCollaboraDocumentResolvers<ContextType>;
  SearchResultMemo?: SearchResultMemoResolvers<ContextType>;
  SearchResultOrganization?: SearchResultOrganizationResolvers<ContextType>;
  SearchResultPost?: SearchResultPostResolvers<ContextType>;
  SearchResultSpace?: SearchResultSpaceResolvers<ContextType>;
  SearchResultUser?: SearchResultUserResolvers<ContextType>;
  SearchResultWhiteboard?: SearchResultWhiteboardResolvers<ContextType>;
  Sentry?: SentryResolvers<ContextType>;
  ServiceMetadata?: ServiceMetadataResolvers<ContextType>;
  Space?: SpaceResolvers<ContextType>;
  SpaceAbout?: SpaceAboutResolvers<ContextType>;
  SpaceAboutMembership?: SpaceAboutMembershipResolvers<ContextType>;
  SpacePendingMembershipInfo?: SpacePendingMembershipInfoResolvers<ContextType>;
  SpaceSettings?: SpaceSettingsResolvers<ContextType>;
  SpaceSettingsCollaboration?: SpaceSettingsCollaborationResolvers<ContextType>;
  SpaceSettingsLayout?: SpaceSettingsLayoutResolvers<ContextType>;
  SpaceSettingsMembership?: SpaceSettingsMembershipResolvers<ContextType>;
  SpaceSettingsPrivacy?: SpaceSettingsPrivacyResolvers<ContextType>;
  SpaceSubscription?: SpaceSubscriptionResolvers<ContextType>;
  StorageAggregator?: StorageAggregatorResolvers<ContextType>;
  StorageAggregatorParent?: StorageAggregatorParentResolvers<ContextType>;
  StorageBucket?: StorageBucketResolvers<ContextType>;
  StorageBucketParent?: StorageBucketParentResolvers<ContextType>;
  StorageBucketUploadFileResult?: StorageBucketUploadFileResultResolvers<ContextType>;
  StorageConfig?: StorageConfigResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SubspaceCreated?: SubspaceCreatedResolvers<ContextType>;
  Tagset?: TagsetResolvers<ContextType>;
  TagsetTemplate?: TagsetTemplateResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskColumnCount?: TaskColumnCountResolvers<ContextType>;
  Template?: TemplateResolvers<ContextType>;
  TemplateContentSpace?: TemplateContentSpaceResolvers<ContextType>;
  TemplateDefault?: TemplateDefaultResolvers<ContextType>;
  TemplateResult?: TemplateResultResolvers<ContextType>;
  TemplatesManager?: TemplatesManagerResolvers<ContextType>;
  TemplatesSet?: TemplatesSetResolvers<ContextType>;
  Timeline?: TimelineResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  UpdateWhiteboardGuestAccessResult?: UpdateWhiteboardGuestAccessResultResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  UrlResolverQueryClosestAncestor?: UrlResolverQueryClosestAncestorResolvers<ContextType>;
  UrlResolverQueryResultCalendar?: UrlResolverQueryResultCalendarResolvers<ContextType>;
  UrlResolverQueryResultCalloutsSet?: UrlResolverQueryResultCalloutsSetResolvers<ContextType>;
  UrlResolverQueryResultCollaboration?: UrlResolverQueryResultCollaborationResolvers<ContextType>;
  UrlResolverQueryResultInnovationPack?: UrlResolverQueryResultInnovationPackResolvers<ContextType>;
  UrlResolverQueryResultSpace?: UrlResolverQueryResultSpaceResolvers<ContextType>;
  UrlResolverQueryResultTemplatesSet?: UrlResolverQueryResultTemplatesSetResolvers<ContextType>;
  UrlResolverQueryResultVirtualContributor?: UrlResolverQueryResultVirtualContributorResolvers<ContextType>;
  UrlResolverQueryResults?: UrlResolverQueryResultsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAuthenticationResult?: UserAuthenticationResultResolvers<ContextType>;
  UserEmailChangeAuditEntries?: UserEmailChangeAuditEntriesResolvers<ContextType>;
  UserEmailChangeAuditEntriesPageInfo?: UserEmailChangeAuditEntriesPageInfoResolvers<ContextType>;
  UserEmailChangeAuditEntry?: UserEmailChangeAuditEntryResolvers<ContextType>;
  UserEmailChangeResult?: UserEmailChangeResultResolvers<ContextType>;
  UserGroup?: UserGroupResolvers<ContextType>;
  UserProfileSummary?: UserProfileSummaryResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
  UserSettingsAssistant?: UserSettingsAssistantResolvers<ContextType>;
  UserSettingsCommunication?: UserSettingsCommunicationResolvers<ContextType>;
  UserSettingsDashboard?: UserSettingsDashboardResolvers<ContextType>;
  UserSettingsHomeSpace?: UserSettingsHomeSpaceResolvers<ContextType>;
  UserSettingsNotification?: UserSettingsNotificationResolvers<ContextType>;
  UserSettingsNotificationChannels?: UserSettingsNotificationChannelsResolvers<ContextType>;
  UserSettingsNotificationOrganization?: UserSettingsNotificationOrganizationResolvers<ContextType>;
  UserSettingsNotificationPlatform?: UserSettingsNotificationPlatformResolvers<ContextType>;
  UserSettingsNotificationPlatformAdmin?: UserSettingsNotificationPlatformAdminResolvers<ContextType>;
  UserSettingsNotificationSound?: UserSettingsNotificationSoundResolvers<ContextType>;
  UserSettingsNotificationSpace?: UserSettingsNotificationSpaceResolvers<ContextType>;
  UserSettingsNotificationSpaceAdmin?: UserSettingsNotificationSpaceAdminResolvers<ContextType>;
  UserSettingsNotificationUser?: UserSettingsNotificationUserResolvers<ContextType>;
  UserSettingsNotificationUserMembership?: UserSettingsNotificationUserMembershipResolvers<ContextType>;
  UserSettingsNotificationVirtualContributor?: UserSettingsNotificationVirtualContributorResolvers<ContextType>;
  UserSettingsPrivacy?: UserSettingsPrivacyResolvers<ContextType>;
  UsersInRolesResponse?: UsersInRolesResponseResolvers<ContextType>;
  VcInteraction?: VcInteractionResolvers<ContextType>;
  VirtualAssistant?: VirtualAssistantResolvers<ContextType>;
  VirtualContributor?: VirtualContributorResolvers<ContextType>;
  VirtualContributorModelCard?: VirtualContributorModelCardResolvers<ContextType>;
  VirtualContributorModelCardFlag?: VirtualContributorModelCardFlagResolvers<ContextType>;
  VirtualContributorPlatformSettings?: VirtualContributorPlatformSettingsResolvers<ContextType>;
  VirtualContributorSettings?: VirtualContributorSettingsResolvers<ContextType>;
  VirtualContributorSettingsPrivacy?: VirtualContributorSettingsPrivacyResolvers<ContextType>;
  VirtualContributorUpdatedSubscriptionResult?: VirtualContributorUpdatedSubscriptionResultResolvers<ContextType>;
  VirtualContributorsInRolesResponse?: VirtualContributorsInRolesResponseResolvers<ContextType>;
  Visual?: VisualResolvers<ContextType>;
  VisualConstraints?: VisualConstraintsResolvers<ContextType>;
  Whiteboard?: WhiteboardResolvers<ContextType>;
  WhiteboardPreviewCoordinates?: WhiteboardPreviewCoordinatesResolvers<ContextType>;
  WhiteboardPreviewCoordinatesData?: WhiteboardPreviewCoordinatesDataResolvers<ContextType>;
  WhiteboardPreviewSettings?: WhiteboardPreviewSettingsResolvers<ContextType>;
};

export type SpaceDetailsFragment = {
  id: string;
  nameID: string;
  about: {
    id: string;
    profile: {
      displayName: string;
      visuals: Array<{ name: SchemaTypes.VisualType; id: string }>;
      tagset?: { tags: Array<string>; id: string; name: string } | undefined;
    };
  };
  community: { id: string };
};

export type UserDetailsFragment = {
  id: string;
  nameID: string;
  firstName: string;
  lastName: string;
  email: string;
  profile?:
    | {
        id: string;
        displayName: string;
        description?: any | undefined;
        url: string;
        visual?: { id: string; uri: string } | undefined;
      }
    | undefined;
  credentials?:
    | Array<{ type: SchemaTypes.CredentialType; resourceID: string }>
    | undefined;
};

export type AssignRoleToOrganizationMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.AssignRoleOnRoleSetInput;
}>;

export type AssignRoleToOrganizationMutation = {
  assignRoleToOrganization: { id: string };
};

export type AssignRoleToUserMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.AssignRoleOnRoleSetInput;
}>;

export type AssignRoleToUserMutation = { assignRoleToUser: { id: string } };

export type AssignUserToGroupMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.AssignUserGroupMemberInput;
}>;

export type AssignUserToGroupMutation = {
  assignUserToGroup: {
    id: string;
    members?:
      | Array<{
          id: string;
          email: string;
          firstName: string;
          lastName: string;
        }>
      | undefined;
  };
};

export type AssignUserToOrganizationMutationVariables = SchemaTypes.Exact<{
  roleData: SchemaTypes.AssignRoleOnRoleSetInput;
}>;

export type AssignUserToOrganizationMutation = {
  assignRoleToUser: {
    id: string;
    profile?: { id: string; displayName: string } | undefined;
  };
};

export type AssignUserAsOrganizationAdminMutationVariables = SchemaTypes.Exact<{
  roleData: SchemaTypes.AssignRoleOnRoleSetInput;
}>;

export type AssignUserAsOrganizationAdminMutation = {
  assignRoleToUser: { id: string };
};

export type AgrantCredentialToUserMutationVariables = SchemaTypes.Exact<{
  grantCredentialData: SchemaTypes.GrantAuthorizationCredentialInput;
}>;

export type AgrantCredentialToUserMutation = {
  grantCredentialToUser: {
    id: string;
    profile?: { id: string; displayName: string } | undefined;
    credentials?:
      | Array<{
          id: string;
          resourceID: string;
          type: SchemaTypes.CredentialType;
        }>
      | undefined;
  };
};

export type RevokeCredentialFromUserMutationVariables = SchemaTypes.Exact<{
  revokeCredentialData: SchemaTypes.RevokeAuthorizationCredentialInput;
}>;

export type RevokeCredentialFromUserMutation = {
  revokeCredentialFromUser: {
    id: string;
    profile?: { id: string; displayName: string } | undefined;
    credentials?:
      | Array<{
          id: string;
          resourceID: string;
          type: SchemaTypes.CredentialType;
        }>
      | undefined;
  };
};

export type CreateCalloutMutationVariables = SchemaTypes.Exact<{
  calloutData: SchemaTypes.CreateCalloutOnCalloutsSetInput;
}>;

export type CreateCalloutMutation = {
  createCalloutOnCalloutsSet: { id: string; nameID: string };
};

export type CreateGroupOnCommunityMutationVariables = SchemaTypes.Exact<{
  groupData: SchemaTypes.CreateUserGroupInput;
}>;

export type CreateGroupOnCommunityMutation = {
  createGroupOnCommunity: {
    id: string;
    profile?:
      | { id: string; displayName: string; visual?: { id: string } | undefined }
      | undefined;
  };
};

export type CreateGroupOnOrganizationMutationVariables = SchemaTypes.Exact<{
  groupData: SchemaTypes.CreateUserGroupInput;
}>;

export type CreateGroupOnOrganizationMutation = {
  createGroupOnOrganization: {
    id: string;
    profile?:
      | { id: string; displayName: string; visual?: { id: string } | undefined }
      | undefined;
  };
};

export type CreateOrganizationMutationVariables = SchemaTypes.Exact<{
  organizationData: SchemaTypes.CreateOrganizationInput;
}>;

export type CreateOrganizationMutation = {
  createOrganization: {
    nameID: string;
    id: string;
    profile?:
      | { id: string; displayName: string; visual?: { id: string } | undefined }
      | undefined;
  };
};

export type CreateContributionOnCalloutMutationVariables = SchemaTypes.Exact<{
  contributionData: SchemaTypes.CreateContributionOnCalloutInput;
}>;

export type CreateContributionOnCalloutMutation = {
  createContributionOnCallout: {
    id: string;
    post?:
      | {
          nameID: string;
          profile: {
            id: string;
            displayName: string;
            description?: any | undefined;
            tagset?: { tags: Array<string> } | undefined;
            visuals: Array<{ id: string }>;
          };
        }
      | undefined;
  };
};

export type CreateReferenceOnProfileMutationVariables = SchemaTypes.Exact<{
  referenceInput: SchemaTypes.CreateReferenceOnProfileInput;
}>;

export type CreateReferenceOnProfileMutation = {
  createReferenceOnProfile: {
    name: string;
    uri: string;
    description?: string | undefined;
  };
};

export type CreateSpaceMutationVariables = SchemaTypes.Exact<{
  spaceData: SchemaTypes.CreateSpaceOnAccountInput;
}>;

export type CreateSpaceMutation = {
  createSpace: { id: string; nameID: string };
};

export type CreateSubspaceMutationVariables = SchemaTypes.Exact<{
  subspaceData: SchemaTypes.CreateSubspaceInput;
}>;

export type CreateSubspaceMutation = {
  createSubspace: {
    id: string;
    nameID: string;
    about: {
      profile: { visuals: Array<{ name: SchemaTypes.VisualType; id: string }> };
    };
    community: { id: string };
    collaboration: { id: string };
  };
};

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
    profile?: { id: string; visual?: { id: string } | undefined } | undefined;
  };
};

export type DeleteOrganizationMutationVariables = SchemaTypes.Exact<{
  deleteData: SchemaTypes.DeleteOrganizationInput;
}>;

export type DeleteOrganizationMutation = { deleteOrganization: { id: string } };

export type DeleteReferenceMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.DeleteReferenceInput;
}>;

export type DeleteReferenceMutation = {
  deleteReference: {
    id: string;
    name: string;
    description?: string | undefined;
    uri: string;
  };
};

export type DeleteSpaceMutationVariables = SchemaTypes.Exact<{
  deleteData: SchemaTypes.DeleteSpaceInput;
}>;

export type DeleteSpaceMutation = { deleteSpace: { id: string } };

export type UpdateOrganizationMutationVariables = SchemaTypes.Exact<{
  organizationData: SchemaTypes.UpdateOrganizationInput;
}>;

export type UpdateOrganizationMutation = {
  updateOrganization: {
    id: string;
    nameID: string;
    profile?:
      | {
          id: string;
          references?:
            | Array<{ id: string; name: string; uri: string }>
            | undefined;
        }
      | undefined;
  };
};

export type UpdateProfileMutationVariables = SchemaTypes.Exact<{
  profileData: SchemaTypes.UpdateProfileDirectInput;
}>;

export type UpdateProfileMutation = { updateProfile: { id: string } };

export type UpdateSpaceMutationVariables = SchemaTypes.Exact<{
  spaceData: SchemaTypes.UpdateSpaceInput;
}>;

export type UpdateSpaceMutation = {
  updateSpace: {
    nameID: string;
    account: { host?: { nameID: string } | undefined };
    community: { id: string };
    about: {
      id: string;
      profile: {
        tagline?: string | undefined;
        visuals: Array<{ id: string; name: SchemaTypes.VisualType }>;
      };
    };
  };
};

export type UpdateVisualMutationVariables = SchemaTypes.Exact<{
  updateData: SchemaTypes.UpdateVisualInput;
}>;

export type UpdateVisualMutation = { updateVisual: { id: string } };

export type UploadFileOnLinkMutationVariables = SchemaTypes.Exact<{
  file: SchemaTypes.Scalars['Upload'];
  uploadData: SchemaTypes.StorageBucketUploadFileOnLinkInput;
}>;

export type UploadFileOnLinkMutation = {
  uploadFileOnLink: {
    id: string;
    uri: string;
    profile: { displayName: string; description?: any | undefined };
  };
};

export type UploadFileOnReferenceMutationVariables = SchemaTypes.Exact<{
  file: SchemaTypes.Scalars['Upload'];
  uploadData: SchemaTypes.StorageBucketUploadFileOnReferenceInput;
}>;

export type UploadFileOnReferenceMutation = {
  uploadFileOnReference: {
    id: string;
    description?: string | undefined;
    name: string;
    uri: string;
  };
};

export type UploadFileOnStorageBucketMutationVariables = SchemaTypes.Exact<{
  file: SchemaTypes.Scalars['Upload'];
  uploadData: SchemaTypes.StorageBucketUploadFileInput;
}>;

export type UploadFileOnStorageBucketMutation = {
  uploadFileOnStorageBucket: { id: string; url: string };
};

export type UploadImageOnVisualMutationVariables = SchemaTypes.Exact<{
  file: SchemaTypes.Scalars['Upload'];
  uploadData: SchemaTypes.VisualUploadImageInput;
}>;

export type UploadImageOnVisualMutation = {
  uploadImageOnVisual: {
    id: string;
    name: SchemaTypes.VisualType;
    uri: string;
  };
};

export type ConfigurationQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type ConfigurationQuery = {
  platform: {
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
};

export type DocumentQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['UUID'];
}>;

export type DocumentQuery = {
  lookup: {
    document?:
      | {
          id: string;
          mimeType: SchemaTypes.MimeType;
          url: string;
          displayName: string;
        }
      | undefined;
  };
};

export type FeatureFlagsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type FeatureFlagsQuery = {
  platform: {
    configuration: {
      featureFlags: Array<{
        name: SchemaTypes.PlatformFeatureFlagName;
        enabled: boolean;
      }>;
    };
  };
};

export type HostInfoQueryVariables = SchemaTypes.Exact<{
  spaceID: SchemaTypes.Scalars['UUID'];
}>;

export type HostInfoQuery = {
  lookup: {
    space?:
      | {
          account: {
            id: string;
            host?:
              | {
                  id: string;
                  nameID: string;
                  profile?:
                    | {
                        id: string;
                        displayName: string;
                        tagsets?:
                          | Array<{
                              id: string;
                              name: string;
                              tags: Array<string>;
                            }>
                          | undefined;
                      }
                    | undefined;
                }
              | undefined;
          };
        }
      | undefined;
  };
};

export type MetadataQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type MetadataQuery = {
  platform: {
    metadata: {
      services: Array<{
        name?: string | undefined;
        version?: string | undefined;
      }>;
    };
  };
};

export type OrganizationQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['UUID'];
}>;

export type OrganizationQuery = {
  organization: {
    id: string;
    nameID: string;
    profile?: { id: string; displayName: string } | undefined;
  };
};

export type OrganizationsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never;
}>;

export type OrganizationsQuery = {
  organizations: Array<{
    id: string;
    nameID: string;
    profile?:
      | {
          id: string;
          displayName: string;
          description?: any | undefined;
          visual?: { id: string; uri: string } | undefined;
        }
      | undefined;
    credentials?:
      | Array<{ type: SchemaTypes.CredentialType; resourceID: string }>
      | undefined;
  }>;
};

export type SpaceQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['UUID'];
}>;

export type SpaceQuery = {
  lookup: {
    space?:
      | {
          id: string;
          nameID: string;
          account: { id: string };
          community: { id: string; roleSet: { id: string } };
          about: {
            id: string;
            profile: {
              id: string;
              displayName: string;
              visuals: Array<{ name: SchemaTypes.VisualType; id: string }>;
              references?:
                | Array<{
                    id: string;
                    name: string;
                    description?: string | undefined;
                    uri: string;
                  }>
                | undefined;
            };
          };
          collaboration: { id: string };
        }
      | undefined;
  };
};

export type SpacesQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type SpacesQuery = {
  spaces: Array<{
    id: string;
    nameID: string;
    about: {
      id: string;
      profile: {
        displayName: string;
        visuals: Array<{ name: SchemaTypes.VisualType; id: string }>;
      };
    };
  }>;
};

export type SubspaceQueryVariables = SchemaTypes.Exact<{
  spaceID: SchemaTypes.Scalars['UUID'];
  subspaceNameID: SchemaTypes.Scalars['NameID'];
}>;

export type SubspaceQuery = {
  lookup: {
    space?:
      | {
          subspaceByNameID: {
            nameID: string;
            id: string;
            about: { id: string; profile: { displayName: string } };
            community: { id: string; roleSet: { id: string } };
            collaboration: {
              id: string;
              calloutsSet: { id: string; callouts: Array<{ nameID: string }> };
            };
          };
        }
      | undefined;
  };
};

export type SubspacesQueryVariables = SchemaTypes.Exact<{
  spaceID: SchemaTypes.Scalars['UUID'];
}>;

export type SubspacesQuery = {
  lookup: {
    space?:
      | {
          subspaces: Array<{
            id: string;
            nameID: string;
            about: {
              id: string;
              profile: {
                displayName: string;
                visuals: Array<{ name: SchemaTypes.VisualType; id: string }>;
              };
            };
            community: { id: string };
            collaboration: { id: string };
          }>;
        }
      | undefined;
  };
};

export type UserQueryVariables = SchemaTypes.Exact<{
  userID: SchemaTypes.Scalars['UUID'];
}>;

export type UserQuery = {
  user: {
    id: string;
    nameID: string;
    firstName: string;
    lastName: string;
    email: string;
    profile?:
      | {
          id: string;
          displayName: string;
          description?: any | undefined;
          url: string;
          visual?: { id: string; uri: string } | undefined;
        }
      | undefined;
    credentials?:
      | Array<{ type: SchemaTypes.CredentialType; resourceID: string }>
      | undefined;
  };
};

export type UsersQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>;

export type UsersQuery = {
  users: Array<{
    id: string;
    nameID: string;
    firstName: string;
    lastName: string;
    email: string;
    profile?:
      | {
          id: string;
          displayName: string;
          description?: any | undefined;
          url: string;
          visual?: { id: string; uri: string } | undefined;
        }
      | undefined;
    credentials?:
      | Array<{ type: SchemaTypes.CredentialType; resourceID: string }>
      | undefined;
  }>;
};

export type UsersForNotificationQueryVariables = SchemaTypes.Exact<{
  credentialsCriteriaData: SchemaTypes.UsersWithAuthorizationCredentialInput;
  includeSettings?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Boolean']>;
}>;

export type UsersForNotificationQuery = {
  usersWithAuthorizationCredential: Array<{
    id: string;
    nameID: string;
    firstName: string;
    lastName: string;
    email: string;
    settings?: { communication: { allowOtherUsersToSendMessages: boolean } };
    profile?:
      | {
          id: string;
          displayName: string;
          description?: any | undefined;
          url: string;
          visual?: { id: string; uri: string } | undefined;
        }
      | undefined;
    credentials?:
      | Array<{ type: SchemaTypes.CredentialType; resourceID: string }>
      | undefined;
  }>;
};

export type UsersWithAuthorizationCredentialQueryVariables = SchemaTypes.Exact<{
  credentialsCriteriaData: SchemaTypes.UsersWithAuthorizationCredentialInput;
}>;

export type UsersWithAuthorizationCredentialQuery = {
  usersWithAuthorizationCredential: Array<{
    id: string;
    nameID: string;
    firstName: string;
    lastName: string;
    email: string;
    profile?:
      | {
          id: string;
          displayName: string;
          description?: any | undefined;
          url: string;
          visual?: { id: string; uri: string } | undefined;
        }
      | undefined;
    credentials?:
      | Array<{ type: SchemaTypes.CredentialType; resourceID: string }>
      | undefined;
  }>;
};

export type UsersWithAuthorizationCredentialWithPreferencesQueryVariables =
  SchemaTypes.Exact<{
    credentialsCriteriaData: SchemaTypes.UsersWithAuthorizationCredentialInput;
  }>;

export type UsersWithAuthorizationCredentialWithPreferencesQuery = {
  usersWithAuthorizationCredential: Array<{
    id: string;
    nameID: string;
    firstName: string;
    lastName: string;
    email: string;
    profile?:
      | {
          id: string;
          displayName: string;
          description?: any | undefined;
          url: string;
          visual?: { id: string; uri: string } | undefined;
        }
      | undefined;
    credentials?:
      | Array<{ type: SchemaTypes.CredentialType; resourceID: string }>
      | undefined;
  }>;
};

export const SpaceDetailsFragmentDoc = gql`
  fragment SpaceDetails on Space {
    id
    nameID
    about {
      id
      profile {
        displayName
        visuals {
          name
          id
        }
        tagset {
          tags
          id
          name
        }
      }
    }
    community {
      id
    }
  }
`;
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    id
    nameID
    firstName
    lastName
    email
    profile {
      id
      displayName
      visual(type: AVATAR) {
        id
        uri
      }
      description
      url
    }
    credentials {
      type
      resourceID
    }
  }
`;
export const AssignRoleToOrganizationDocument = gql`
  mutation assignRoleToOrganization($input: AssignRoleOnRoleSetInput!) {
    assignRoleToOrganization(roleData: $input) {
      id
    }
  }
`;
export const AssignRoleToUserDocument = gql`
  mutation assignRoleToUser($input: AssignRoleOnRoleSetInput!) {
    assignRoleToUser(roleData: $input) {
      id
    }
  }
`;
export const AssignUserToGroupDocument = gql`
  mutation assignUserToGroup($input: AssignUserGroupMemberInput!) {
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
  mutation assignUserToOrganization($roleData: AssignRoleOnRoleSetInput!) {
    assignRoleToUser(roleData: $roleData) {
      id
      profile {
        id
        displayName
      }
    }
  }
`;
export const AssignUserAsOrganizationAdminDocument = gql`
  mutation assignUserAsOrganizationAdmin($roleData: AssignRoleOnRoleSetInput!) {
    assignRoleToUser(roleData: $roleData) {
      id
    }
  }
`;
export const AgrantCredentialToUserDocument = gql`
  mutation agrantCredentialToUser(
    $grantCredentialData: GrantAuthorizationCredentialInput!
  ) {
    grantCredentialToUser(grantCredentialData: $grantCredentialData) {
      id
      profile {
        id
        displayName
      }
      credentials {
        id
        resourceID
        type
      }
    }
  }
`;
export const RevokeCredentialFromUserDocument = gql`
  mutation revokeCredentialFromUser(
    $revokeCredentialData: RevokeAuthorizationCredentialInput!
  ) {
    revokeCredentialFromUser(revokeCredentialData: $revokeCredentialData) {
      id
      profile {
        id
        displayName
      }
      credentials {
        id
        resourceID
        type
      }
    }
  }
`;
export const CreateCalloutDocument = gql`
  mutation createCallout($calloutData: CreateCalloutOnCalloutsSetInput!) {
    createCalloutOnCalloutsSet(calloutData: $calloutData) {
      id
      nameID
    }
  }
`;
export const CreateGroupOnCommunityDocument = gql`
  mutation createGroupOnCommunity($groupData: CreateUserGroupInput!) {
    createGroupOnCommunity(groupData: $groupData) {
      id
      profile {
        id
        displayName
        visual(type: AVATAR) {
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
      profile {
        id
        displayName
        visual(type: AVATAR) {
          id
        }
      }
    }
  }
`;
export const CreateOrganizationDocument = gql`
  mutation createOrganization($organizationData: CreateOrganizationInput!) {
    createOrganization(organizationData: $organizationData) {
      nameID
      id
      profile {
        id
        displayName
        visual(type: AVATAR) {
          id
        }
      }
    }
  }
`;
export const CreateContributionOnCalloutDocument = gql`
  mutation createContributionOnCallout(
    $contributionData: CreateContributionOnCalloutInput!
  ) {
    createContributionOnCallout(contributionData: $contributionData) {
      id
      post {
        nameID
        profile {
          id
          displayName
          tagset {
            tags
          }
          description
          visuals {
            id
          }
        }
      }
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
export const CreateSpaceDocument = gql`
  mutation createSpace($spaceData: CreateSpaceOnAccountInput!) {
    createSpace(spaceData: $spaceData) {
      id
      nameID
    }
  }
`;
export const CreateSubspaceDocument = gql`
  mutation createSubspace($subspaceData: CreateSubspaceInput!) {
    createSubspace(subspaceData: $subspaceData) {
      id
      nameID
      about {
        profile {
          visuals {
            name
            id
          }
        }
      }
      community {
        id
      }
      collaboration {
        id
      }
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
        visual(type: AVATAR) {
          id
        }
      }
    }
  }
`;
export const DeleteOrganizationDocument = gql`
  mutation deleteOrganization($deleteData: DeleteOrganizationInput!) {
    deleteOrganization(deleteData: $deleteData) {
      id
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
export const DeleteSpaceDocument = gql`
  mutation deleteSpace($deleteData: DeleteSpaceInput!) {
    deleteSpace(deleteData: $deleteData) {
      id
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
  mutation updateProfile($profileData: UpdateProfileDirectInput!) {
    updateProfile(profileData: $profileData) {
      id
    }
  }
`;
export const UpdateSpaceDocument = gql`
  mutation updateSpace($spaceData: UpdateSpaceInput!) {
    updateSpace(spaceData: $spaceData) {
      nameID
      account {
        host {
          nameID
        }
      }
      community {
        id
      }
      about {
        id
        profile {
          tagline
          visuals {
            id
            name
          }
        }
      }
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
export const UploadFileOnLinkDocument = gql`
  mutation uploadFileOnLink(
    $file: Upload!
    $uploadData: StorageBucketUploadFileOnLinkInput!
  ) {
    uploadFileOnLink(file: $file, uploadData: $uploadData) {
      id
      uri
      profile {
        displayName
        description
      }
    }
  }
`;
export const UploadFileOnReferenceDocument = gql`
  mutation uploadFileOnReference(
    $file: Upload!
    $uploadData: StorageBucketUploadFileOnReferenceInput!
  ) {
    uploadFileOnReference(file: $file, uploadData: $uploadData) {
      id
      description
      name
      uri
    }
  }
`;
export const UploadFileOnStorageBucketDocument = gql`
  mutation uploadFileOnStorageBucket(
    $file: Upload!
    $uploadData: StorageBucketUploadFileInput!
  ) {
    uploadFileOnStorageBucket(file: $file, uploadData: $uploadData) {
      id
      url
    }
  }
`;
export const UploadImageOnVisualDocument = gql`
  mutation uploadImageOnVisual(
    $file: Upload!
    $uploadData: VisualUploadImageInput!
  ) {
    uploadImageOnVisual(file: $file, uploadData: $uploadData) {
      id
      name
      uri
    }
  }
`;
export const ConfigurationDocument = gql`
  query configuration {
    platform {
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
  }
`;
export const DocumentDocument = gql`
  query document($id: UUID!) {
    lookup {
      document(ID: $id) {
        id
        mimeType
        url
        displayName
      }
    }
  }
`;
export const FeatureFlagsDocument = gql`
  query featureFlags {
    platform {
      configuration {
        featureFlags {
          name
          enabled
        }
      }
    }
  }
`;
export const HostInfoDocument = gql`
  query hostInfo($spaceID: UUID!) {
    lookup {
      space(ID: $spaceID) {
        account {
          id
          host {
            id
            nameID
            profile {
              id
              displayName
              tagsets {
                id
                name
                tags
              }
            }
          }
        }
      }
    }
  }
`;
export const MetadataDocument = gql`
  query metadata {
    platform {
      metadata {
        services {
          name
          version
        }
      }
    }
  }
`;
export const OrganizationDocument = gql`
  query organization($id: UUID!) {
    organization(ID: $id) {
      id
      nameID
      profile {
        id
        displayName
      }
    }
  }
`;
export const OrganizationsDocument = gql`
  query organizations {
    organizations {
      id
      nameID
      profile {
        id
        displayName
        visual(type: AVATAR) {
          id
          uri
        }
        description
      }
      credentials {
        type
        resourceID
      }
    }
  }
`;
export const SpaceDocument = gql`
  query space($id: UUID!) {
    lookup {
      space(ID: $id) {
        id
        nameID
        account {
          id
        }
        community {
          id
          roleSet {
            id
          }
        }
        about {
          id
          profile {
            id
            displayName
            visuals {
              name
              id
            }
            references {
              id
              name
              description
              uri
            }
          }
        }
        collaboration {
          id
        }
      }
    }
  }
`;
export const SpacesDocument = gql`
  query spaces {
    spaces {
      id
      nameID
      about {
        id
        profile {
          displayName
          visuals {
            name
            id
          }
        }
      }
    }
  }
`;
export const SubspaceDocument = gql`
  query subspace($spaceID: UUID!, $subspaceNameID: NameID!) {
    lookup {
      space(ID: $spaceID) {
        subspaceByNameID(NAMEID: $subspaceNameID) {
          nameID
          id
          about {
            id
            profile {
              displayName
            }
          }
          community {
            id
            roleSet {
              id
            }
          }
          collaboration {
            id
            calloutsSet {
              id
              callouts {
                nameID
              }
            }
          }
        }
      }
    }
  }
`;
export const SubspacesDocument = gql`
  query subspaces($spaceID: UUID!) {
    lookup {
      space(ID: $spaceID) {
        subspaces {
          id
          nameID
          about {
            id
            profile {
              displayName
              visuals {
                name
                id
              }
            }
          }
          community {
            id
          }
          collaboration {
            id
          }
        }
      }
    }
  }
`;
export const UserDocument = gql`
  query user($userID: UUID!) {
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
export const UsersForNotificationDocument = gql`
  query usersForNotification(
    $credentialsCriteriaData: UsersWithAuthorizationCredentialInput!
    $includeSettings: Boolean = false
  ) {
    usersWithAuthorizationCredential(
      credentialsCriteriaData: $credentialsCriteriaData
    ) {
      ...UserDetails
      settings @include(if: $includeSettings) {
        communication {
          allowOtherUsersToSendMessages
        }
      }
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
    }
  }
  ${UserDetailsFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action();
const AssignRoleToOrganizationDocumentString = print(
  AssignRoleToOrganizationDocument
);
const AssignRoleToUserDocumentString = print(AssignRoleToUserDocument);
const AssignUserToGroupDocumentString = print(AssignUserToGroupDocument);
const AssignUserToOrganizationDocumentString = print(
  AssignUserToOrganizationDocument
);
const AssignUserAsOrganizationAdminDocumentString = print(
  AssignUserAsOrganizationAdminDocument
);
const AgrantCredentialToUserDocumentString = print(
  AgrantCredentialToUserDocument
);
const RevokeCredentialFromUserDocumentString = print(
  RevokeCredentialFromUserDocument
);
const CreateCalloutDocumentString = print(CreateCalloutDocument);
const CreateGroupOnCommunityDocumentString = print(
  CreateGroupOnCommunityDocument
);
const CreateGroupOnOrganizationDocumentString = print(
  CreateGroupOnOrganizationDocument
);
const CreateOrganizationDocumentString = print(CreateOrganizationDocument);
const CreateContributionOnCalloutDocumentString = print(
  CreateContributionOnCalloutDocument
);
const CreateReferenceOnProfileDocumentString = print(
  CreateReferenceOnProfileDocument
);
const CreateSpaceDocumentString = print(CreateSpaceDocument);
const CreateSubspaceDocumentString = print(CreateSubspaceDocument);
const CreateTagsetOnProfileDocumentString = print(
  CreateTagsetOnProfileDocument
);
const CreateUserDocumentString = print(CreateUserDocument);
const DeleteOrganizationDocumentString = print(DeleteOrganizationDocument);
const DeleteReferenceDocumentString = print(DeleteReferenceDocument);
const DeleteSpaceDocumentString = print(DeleteSpaceDocument);
const UpdateOrganizationDocumentString = print(UpdateOrganizationDocument);
const UpdateProfileDocumentString = print(UpdateProfileDocument);
const UpdateSpaceDocumentString = print(UpdateSpaceDocument);
const UpdateVisualDocumentString = print(UpdateVisualDocument);
const UploadFileOnLinkDocumentString = print(UploadFileOnLinkDocument);
const UploadFileOnReferenceDocumentString = print(
  UploadFileOnReferenceDocument
);
const UploadFileOnStorageBucketDocumentString = print(
  UploadFileOnStorageBucketDocument
);
const UploadImageOnVisualDocumentString = print(UploadImageOnVisualDocument);
const ConfigurationDocumentString = print(ConfigurationDocument);
const DocumentDocumentString = print(DocumentDocument);
const FeatureFlagsDocumentString = print(FeatureFlagsDocument);
const HostInfoDocumentString = print(HostInfoDocument);
const MetadataDocumentString = print(MetadataDocument);
const OrganizationDocumentString = print(OrganizationDocument);
const OrganizationsDocumentString = print(OrganizationsDocument);
const SpaceDocumentString = print(SpaceDocument);
const SpacesDocumentString = print(SpacesDocument);
const SubspaceDocumentString = print(SubspaceDocument);
const SubspacesDocumentString = print(SubspacesDocument);
const UserDocumentString = print(UserDocument);
const UsersDocumentString = print(UsersDocument);
const UsersForNotificationDocumentString = print(UsersForNotificationDocument);
const UsersWithAuthorizationCredentialDocumentString = print(
  UsersWithAuthorizationCredentialDocument
);
const UsersWithAuthorizationCredentialWithPreferencesDocumentString = print(
  UsersWithAuthorizationCredentialWithPreferencesDocument
);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    assignRoleToOrganization(
      variables: SchemaTypes.AssignRoleToOrganizationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.AssignRoleToOrganizationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.AssignRoleToOrganizationMutation>(
            AssignRoleToOrganizationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'assignRoleToOrganization',
        'mutation'
      );
    },
    assignRoleToUser(
      variables: SchemaTypes.AssignRoleToUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.AssignRoleToUserMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.AssignRoleToUserMutation>(
            AssignRoleToUserDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'assignRoleToUser',
        'mutation'
      );
    },
    assignUserToGroup(
      variables: SchemaTypes.AssignUserToGroupMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.AssignUserToGroupMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.AssignUserToGroupMutation>(
            AssignUserToGroupDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'assignUserToGroup',
        'mutation'
      );
    },
    assignUserToOrganization(
      variables: SchemaTypes.AssignUserToOrganizationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.AssignUserToOrganizationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.AssignUserToOrganizationMutation>(
            AssignUserToOrganizationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'assignUserToOrganization',
        'mutation'
      );
    },
    assignUserAsOrganizationAdmin(
      variables: SchemaTypes.AssignUserAsOrganizationAdminMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.AssignUserAsOrganizationAdminMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.AssignUserAsOrganizationAdminMutation>(
            AssignUserAsOrganizationAdminDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'assignUserAsOrganizationAdmin',
        'mutation'
      );
    },
    agrantCredentialToUser(
      variables: SchemaTypes.AgrantCredentialToUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.AgrantCredentialToUserMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.AgrantCredentialToUserMutation>(
            AgrantCredentialToUserDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'agrantCredentialToUser',
        'mutation'
      );
    },
    revokeCredentialFromUser(
      variables: SchemaTypes.RevokeCredentialFromUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.RevokeCredentialFromUserMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.RevokeCredentialFromUserMutation>(
            RevokeCredentialFromUserDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'revokeCredentialFromUser',
        'mutation'
      );
    },
    createCallout(
      variables: SchemaTypes.CreateCalloutMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.CreateCalloutMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.CreateCalloutMutation>(
            CreateCalloutDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createCallout',
        'mutation'
      );
    },
    createGroupOnCommunity(
      variables: SchemaTypes.CreateGroupOnCommunityMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.CreateGroupOnCommunityMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.CreateGroupOnCommunityMutation>(
            CreateGroupOnCommunityDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createGroupOnCommunity',
        'mutation'
      );
    },
    createGroupOnOrganization(
      variables: SchemaTypes.CreateGroupOnOrganizationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.CreateGroupOnOrganizationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.CreateGroupOnOrganizationMutation>(
            CreateGroupOnOrganizationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createGroupOnOrganization',
        'mutation'
      );
    },
    createOrganization(
      variables: SchemaTypes.CreateOrganizationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.CreateOrganizationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.CreateOrganizationMutation>(
            CreateOrganizationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createOrganization',
        'mutation'
      );
    },
    createContributionOnCallout(
      variables: SchemaTypes.CreateContributionOnCalloutMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.CreateContributionOnCalloutMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.CreateContributionOnCalloutMutation>(
            CreateContributionOnCalloutDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createContributionOnCallout',
        'mutation'
      );
    },
    createReferenceOnProfile(
      variables: SchemaTypes.CreateReferenceOnProfileMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.CreateReferenceOnProfileMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.CreateReferenceOnProfileMutation>(
            CreateReferenceOnProfileDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createReferenceOnProfile',
        'mutation'
      );
    },
    createSpace(
      variables: SchemaTypes.CreateSpaceMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.CreateSpaceMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.CreateSpaceMutation>(
            CreateSpaceDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createSpace',
        'mutation'
      );
    },
    createSubspace(
      variables: SchemaTypes.CreateSubspaceMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.CreateSubspaceMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.CreateSubspaceMutation>(
            CreateSubspaceDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createSubspace',
        'mutation'
      );
    },
    createTagsetOnProfile(
      variables: SchemaTypes.CreateTagsetOnProfileMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.CreateTagsetOnProfileMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.CreateTagsetOnProfileMutation>(
            CreateTagsetOnProfileDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createTagsetOnProfile',
        'mutation'
      );
    },
    createUser(
      variables: SchemaTypes.CreateUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.CreateUserMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.CreateUserMutation>(
            CreateUserDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createUser',
        'mutation'
      );
    },
    deleteOrganization(
      variables: SchemaTypes.DeleteOrganizationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.DeleteOrganizationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.DeleteOrganizationMutation>(
            DeleteOrganizationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'deleteOrganization',
        'mutation'
      );
    },
    deleteReference(
      variables: SchemaTypes.DeleteReferenceMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.DeleteReferenceMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.DeleteReferenceMutation>(
            DeleteReferenceDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'deleteReference',
        'mutation'
      );
    },
    deleteSpace(
      variables: SchemaTypes.DeleteSpaceMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.DeleteSpaceMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.DeleteSpaceMutation>(
            DeleteSpaceDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'deleteSpace',
        'mutation'
      );
    },
    updateOrganization(
      variables: SchemaTypes.UpdateOrganizationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UpdateOrganizationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UpdateOrganizationMutation>(
            UpdateOrganizationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateOrganization',
        'mutation'
      );
    },
    updateProfile(
      variables: SchemaTypes.UpdateProfileMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UpdateProfileMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UpdateProfileMutation>(
            UpdateProfileDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateProfile',
        'mutation'
      );
    },
    updateSpace(
      variables: SchemaTypes.UpdateSpaceMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UpdateSpaceMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UpdateSpaceMutation>(
            UpdateSpaceDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateSpace',
        'mutation'
      );
    },
    updateVisual(
      variables: SchemaTypes.UpdateVisualMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UpdateVisualMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UpdateVisualMutation>(
            UpdateVisualDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateVisual',
        'mutation'
      );
    },
    uploadFileOnLink(
      variables: SchemaTypes.UploadFileOnLinkMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UploadFileOnLinkMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UploadFileOnLinkMutation>(
            UploadFileOnLinkDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'uploadFileOnLink',
        'mutation'
      );
    },
    uploadFileOnReference(
      variables: SchemaTypes.UploadFileOnReferenceMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UploadFileOnReferenceMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UploadFileOnReferenceMutation>(
            UploadFileOnReferenceDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'uploadFileOnReference',
        'mutation'
      );
    },
    uploadFileOnStorageBucket(
      variables: SchemaTypes.UploadFileOnStorageBucketMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UploadFileOnStorageBucketMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UploadFileOnStorageBucketMutation>(
            UploadFileOnStorageBucketDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'uploadFileOnStorageBucket',
        'mutation'
      );
    },
    uploadImageOnVisual(
      variables: SchemaTypes.UploadImageOnVisualMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UploadImageOnVisualMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UploadImageOnVisualMutation>(
            UploadImageOnVisualDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'uploadImageOnVisual',
        'mutation'
      );
    },
    configuration(
      variables?: SchemaTypes.ConfigurationQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.ConfigurationQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.ConfigurationQuery>(
            ConfigurationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'configuration',
        'query'
      );
    },
    document(
      variables: SchemaTypes.DocumentQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.DocumentQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.DocumentQuery>(
            DocumentDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'document',
        'query'
      );
    },
    featureFlags(
      variables?: SchemaTypes.FeatureFlagsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.FeatureFlagsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.FeatureFlagsQuery>(
            FeatureFlagsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'featureFlags',
        'query'
      );
    },
    hostInfo(
      variables: SchemaTypes.HostInfoQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.HostInfoQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.HostInfoQuery>(
            HostInfoDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'hostInfo',
        'query'
      );
    },
    metadata(
      variables?: SchemaTypes.MetadataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.MetadataQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.MetadataQuery>(
            MetadataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'metadata',
        'query'
      );
    },
    organization(
      variables: SchemaTypes.OrganizationQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.OrganizationQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.OrganizationQuery>(
            OrganizationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'organization',
        'query'
      );
    },
    organizations(
      variables?: SchemaTypes.OrganizationsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.OrganizationsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.OrganizationsQuery>(
            OrganizationsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'organizations',
        'query'
      );
    },
    space(
      variables: SchemaTypes.SpaceQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.SpaceQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.SpaceQuery>(
            SpaceDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'space',
        'query'
      );
    },
    spaces(
      variables?: SchemaTypes.SpacesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.SpacesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.SpacesQuery>(
            SpacesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'spaces',
        'query'
      );
    },
    subspace(
      variables: SchemaTypes.SubspaceQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.SubspaceQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.SubspaceQuery>(
            SubspaceDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'subspace',
        'query'
      );
    },
    subspaces(
      variables: SchemaTypes.SubspacesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.SubspacesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.SubspacesQuery>(
            SubspacesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'subspaces',
        'query'
      );
    },
    user(
      variables: SchemaTypes.UserQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UserQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UserQuery>(
            UserDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'user',
        'query'
      );
    },
    users(
      variables?: SchemaTypes.UsersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UsersQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UsersQuery>(
            UsersDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'users',
        'query'
      );
    },
    usersForNotification(
      variables: SchemaTypes.UsersForNotificationQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UsersForNotificationQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UsersForNotificationQuery>(
            UsersForNotificationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'usersForNotification',
        'query'
      );
    },
    usersWithAuthorizationCredential(
      variables: SchemaTypes.UsersWithAuthorizationCredentialQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UsersWithAuthorizationCredentialQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UsersWithAuthorizationCredentialQuery>(
            UsersWithAuthorizationCredentialDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'usersWithAuthorizationCredential',
        'query'
      );
    },
    usersWithAuthorizationCredentialWithPreferences(
      variables: SchemaTypes.UsersWithAuthorizationCredentialWithPreferencesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SchemaTypes.UsersWithAuthorizationCredentialWithPreferencesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SchemaTypes.UsersWithAuthorizationCredentialWithPreferencesQuery>(
            UsersWithAuthorizationCredentialWithPreferencesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'usersWithAuthorizationCredentialWithPreferences',
        'query'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
