/* eslint-disable @typescript-eslint/no-explicit-any */
import { PathLike, createReadStream, existsSync } from 'fs';
import { GraphQLClient } from 'graphql-request';
import { FileUpload } from 'graphql-upload';
import semver from 'semver';
import { AlkemioClientConfig } from './config/alkemio-client-config';
import { getSdk, InputMaybe, Sdk } from './generated/graphql';
import {
  CreateChallengeOnHubInput,
  UpdateHubInput,
  UpdateChallengeInput,
  UpdateOrganizationInput,
  CreateUserInput,
  UpdateReferenceInput,
  CreateHubInput,
  CreateOpportunityInput,
  UpdateOpportunityInput,
  CreateChallengeOnChallengeInput,
  AuthorizationCredential,
  CreatePostOnCalloutInput,
  CreateCalloutOnCollaborationInput,
  CalloutType,
  CalloutState,
} from './generated/graphql';
import { AuthInfo, CreateReferenceOnProfileInput } from 'src';
import { KratosPublicApiClient } from './util/kratos.public.api.client';
import { log, LOG_LEVEL } from './util/logger';
import { toGraphQLResponse } from './util/toGraphQLResponse';
import * as SchemaTypes from './types/alkemio-schema';

export class AlkemioClient {
  public apiToken: string;
  public config!: AlkemioClientConfig;
  public privateClient!: Sdk;

  constructor(config: AlkemioClientConfig) {
    this.apiToken = '';
    this.config = config;
    this.config.loggingEnabled = config.loggingEnabled ?? false;
    const privateClient = new GraphQLClient(
      this.config.apiEndpointPrivateGraphql
    );
    this.privateClient = getSdk(privateClient);
  }

  public async enableAuthentication() {
    if (!this.config || !this.config.authInfo)
      throw new Error(
        'Can not enable authentication. Missing authentication credentials.'
      );

    // If Kratos public api end point is not set then get it from the Alkemio server config
    if (!this.config.authInfo?.kratosPublicApiEndpoint) {
      this.logMessage(
        'Kratos end point not set in config, obtaining from server'
      );

      const serverKratosPublicEndpoint =
        await this.getKratosPublicApiEndpoint();
      this.config.authInfo.kratosPublicApiEndpoint = serverKratosPublicEndpoint;
    }

    const kratosPublicEndpoint = this.config.authInfo.kratosPublicApiEndpoint;
    this.logMessage(
      `Getting API token with config ${JSON.stringify(this.config.authInfo)}`
    );
    try {
      const apiToken = await this.getApiToken(
        this.config?.authInfo as AuthInfo
      );
      this.logMessage(`API token: ${apiToken}`);
      const client = new GraphQLClient(this.config.apiEndpointPrivateGraphql, {
        headers: {
          authorization: `Bearer ${apiToken}`,
        },
      });
      this.privateClient = getSdk(client);
    } catch (error) {
      throw new Error(
        `Unable to authenticate to Alkemio (Kratos) endpoint (${kratosPublicEndpoint}): ${error}`
      );
    }
  }

  private logMessage(msg: string) {
    if (this.config.loggingEnabled) log(msg, LOG_LEVEL.INFO);
  }

  private async getApiToken(authInfo: AuthInfo): Promise<string> {
    if (!authInfo || !authInfo.kratosPublicApiEndpoint)
      throw new Error('Kratos Public API endpoint is not defined!');

    try {
      const authClient = new KratosPublicApiClient(
        authInfo.kratosPublicApiEndpoint
      );

      this.apiToken = await authClient.authenticate(authInfo.credentials);
    } catch (error) {
      throw new Error(`API authentication error! ${error}`);
    }

    if (!this.apiToken)
      throw new Error(
        'API token could not be acquired! Check your configuration and whether the Kratos Public API endpoint is accessible!'
      );

    return this.apiToken;
  }

  public async getKratosPublicApiEndpoint(): Promise<string> {
    const configuration = await this.privateClient.configuration();
    const endpoint =
      configuration.data?.configuration.authentication.providers[0].config
        .kratosPublicBaseURL;

    return endpoint ?? 'http://localhost:3000/identity/ory/kratos/public/';
  }

  public async featureFlags() {
    const { data } = await this.privateClient.featureFlags();

    return data?.configuration.platform.featureFlags;
  }

  public async validateConnection() {
    try {
      const serverVersion = await this.serverVersion();

      this.validateServerVersion(serverVersion);
      return serverVersion;
    } catch (error: any) {
      this.logMessage(
        `unable to validate the connection, error: ${error.toString()}`
      );
    }
    return 'server version not returned';
  }

  public validateServerVersion(serverVersion: string): boolean {
    const MIN_SERVER_VERSION = '0.14.1';
    const validVersion = semver.gte(serverVersion, MIN_SERVER_VERSION);
    if (!validVersion)
      throw new Error(
        `Detected server version (${serverVersion} not compatible with required server version: ${MIN_SERVER_VERSION})`
      );
    return true;
  }

  public async serverVersion(): Promise<string> {
    this.logMessage(
      `Obtaining server version using api endpoint: ${this.config.apiEndpointPrivateGraphql}`
    );
    const { data } = await this.privateClient.metadata();
    if (!data) {
      throw new Error(
        `Unable to query meta data from: ${this.config.apiEndpointPrivateGraphql}`
      );
    }
    const serverMetaData = data?.metadata.services.find(
      service => service.name === 'alkemio-server'
    );
    if (!serverMetaData) throw new Error('Unable to locate server meta data');
    const serverVersion = serverMetaData.version;
    if (!serverVersion)
      throw new Error(
        `Unable to retrive Alkemio server version: ${serverVersion}`
      );
    return serverVersion;
  }

  public async spaceExists(spaceID: string): Promise<boolean> {
    try {
      const result = await this.privateClient.space({
        id: spaceID,
      });
      if (result.data) return true;
    } catch (error: any) {
      this.logMessage(
        `unable to check if space exists, error: ${error.toString()}`
      );
      return false;
    }
    return true;
  }

  async spaceInfo(spaceID: string) {
    const response = await this.privateClient.space({
      id: spaceID,
    });
    return response.data?.hub;
  }

  public async createSpace(spaceData: CreateHubInput) {
    const result = await this.privateClient.createSpace({
      spaceData: spaceData,
    });
    return result.data?.createHub;
  }

  public async createChallenge(challenge: CreateChallengeOnHubInput) {
    const { data } = await this.privateClient.createChallenge({
      challengeData: challenge,
    });

    return data?.createChallenge;
  }

  public async createChildChallenge(
    challengeData: CreateChallengeOnChallengeInput
  ) {
    const result = await this.privateClient.createChildChallenge({
      childChallengeData: challengeData,
    });

    return result.data?.createChildChallenge;
  }

  public async createOpportunity(opportunityData: CreateOpportunityInput) {
    const result = await this.privateClient.createOpportunity({
      opportunityData: opportunityData,
    });

    return result.data?.createOpportunity;
  }

  public async addReference(
    profileID: string,
    referenceName: string,
    referenceURI: string,
    referenceDesc: string
  ) {
    const { data } = await this.privateClient.createReferenceOnProfile({
      referenceInput: {
        profileID: profileID,
        uri: referenceURI,
        name: referenceName,
        description: referenceDesc,
      },
    });

    return data?.createReferenceOnProfile;
  }

  public async updateUserProfile(
    userEmail: string,
    description?: string,
    avatarURI?: string,
    country?: string,
    city?: string
  ): Promise<boolean> {
    const { data } = await this.privateClient.user({
      userID: userEmail,
    });

    const profileID = data?.user.profile?.id;

    const avatarID = data?.user.profile?.visual?.id || '';

    if (profileID) {
      const profileUpdated = await this.updateProfile(
        profileID,
        description,
        country,
        city
      );
      if (avatarURI) {
        await this.updateVisual(avatarID, avatarURI);
      }
      return !!profileUpdated;
    }

    return false;
  }

  async updateProfile(
    profileID: string,
    description?: string,
    country?: string,
    city?: string
  ) {
    const { data } = await this.privateClient.updateProfile({
      profileData: {
        profileID: profileID,
        description: description,
        location: {
          country,
          city,
        },
      },
    });

    return data?.updateProfile;
  }

  async updateVisual(visualID: string, uri: string) {
    const { data } = await this.privateClient.updateVisual({
      updateData: {
        visualID: visualID,
        uri: uri,
      },
    });
    return data?.updateVisual;
  }

  async createTagsetOnProfile(
    profileID: string,
    tagsetName: string,
    tags: string[]
  ): Promise<boolean> {
    if (tags) {
      await this.privateClient.createTagsetOnProfile({
        tagsetData: {
          profileID: profileID,
          name: tagsetName,
        },
      });
    }
    return true;
  }

  async addUserToGroup(userID: string, groupID: string): Promise<boolean> {
    const uID = userID;
    const gID = groupID;

    const { data } = await this.privateClient.assignUserToGroup({
      input: {
        userID: uID,
        groupID: gID,
      },
    });

    return !!data?.assignUserToGroup;
  }

  async addUserToOrganization(
    userID: string,
    organizationID: string
  ): Promise<boolean> {
    const uID = userID;
    const gID = organizationID;

    const { data } = await this.privateClient.assignUserToOrganization({
      input: {
        userID: uID,
        organizationID: gID,
      },
    });

    return !!data?.assignUserToOrganization;
  }

  async addUserToChallenge(
    spaceID: string,
    challengeName: string,
    userID: string
  ) {
    const response = await this.privateClient.challenge({
      hubID: spaceID,
      challengeID: challengeName,
    });
    const communityID = response.data?.hub.challenge?.community?.id;

    if (!response || !communityID) return;

    return await this.privateClient.assignUserToCommunity({
      input: {
        userID: userID,
        communityID: communityID,
      },
    });
  }

  public async opportunityByNameID(spaceID: string, opportunityNameID: string) {
    try {
      const result = await this.privateClient.opportunity({
        hubID: spaceID,
        opportunityID: opportunityNameID,
      });
      if (result.data) return result.data?.hub.opportunity;
    } catch (error) {
      return;
    }
  }

  async challengeByNameID(spaceNameID: string, challengeNameID: string) {
    try {
      const response = await this.privateClient.challenge({
        hubID: spaceNameID,
        challengeID: challengeNameID,
      });

      if (!response) return;
      return response.data?.hub.challenge;
    } catch (error) {
      return;
    }
  }

  async user(userID: string) {
    try {
      const response = await this.privateClient.user({
        userID: userID,
      });

      if (!response) return;
      return response.data?.user;
    } catch (error) {
      return;
    }
  }

  async addUserToOpportunity(
    spaceName: string,
    opportunityName: string,
    userID: string
  ) {
    const opportunityInfo = await this.opportunityByNameID(
      spaceName,
      opportunityName
    );
    const communityID = opportunityInfo?.community?.id;

    if (!communityID) return;

    return await this.privateClient.assignUserToCommunity({
      input: {
        userID: userID,
        communityID,
      },
    });
  }

  async addUserToSpace(spaceID: string, userID: string) {
    const spaceInfo = await this.spaceInfo(spaceID);
    const communityID = spaceInfo?.community?.id;

    if (!spaceInfo || !communityID) return;

    return await this.privateClient.assignUserToCommunity({
      input: {
        userID: userID,
        communityID,
      },
    });
  }

  async updateSpace(spaceData: UpdateHubInput) {
    const { data } = await this.privateClient.updateSpace({
      spaceData: spaceData,
    });

    return data?.updateHub;
  }

  public uploadFileOnReference(path: PathLike, referenceID: string) {
    if (!existsSync(path)) {
      throw new Error(`File at '${path}' does not exist`);
    }

    return this.privateClient
      .uploadFileOnReference({
        file: createReadStream(path) as unknown as FileUpload,
        uploadData: { referenceID },
      })
      .then(
        toGraphQLResponse<SchemaTypes.UploadFileOnReferenceMutation>,
        toGraphQLResponse<SchemaTypes.UploadFileOnReferenceMutation>
      );
  }

  public uploadImageOnVisual(path: PathLike, visualID: string) {
    if (!existsSync(path)) {
      throw new Error(`Image at '${path}' does not exist`);
    }

    return this.privateClient
      .uploadImageOnVisual({
        file: createReadStream(path) as unknown as FileUpload,
        uploadData: { visualID },
      })
      .then(
        toGraphQLResponse<SchemaTypes.UploadImageOnVisualMutation>,
        toGraphQLResponse<SchemaTypes.UploadImageOnVisualMutation>
      );
  }

  async createRelationOnCollaboration(
    collaborationID: string,
    type: string,
    description: string,
    actorName: string,
    actorRole: string,
    actorType: string
  ) {
    const { data } = await this.privateClient.createRelationOnCollaboration({
      relationData: {
        collaborationID,
        type,
        description,
        actorName,
        actorType,
        actorRole,
      },
    });

    return data?.createRelationOnCollaboration;
  }

  async createActorGroup(
    ecosystemModelID: string,
    actorGroupName: string,
    description: string
  ) {
    const { data } = await this.privateClient.createActorGroup({
      actorGroupData: {
        ecosystemModelID: ecosystemModelID,
        name: actorGroupName,
        description,
      },
    });

    return data?.createActorGroup;
  }

  async createActor(
    actorGroupID: string,
    actorName: string,
    value?: string,
    impact?: string,
    description = ''
  ) {
    const { data } = await this.privateClient.createActor({
      actorData: {
        actorGroupID: actorGroupID,
        name: actorName,
        value,
        impact,
        description,
      },
    });

    return data?.createActor;
  }

  async updateActor(
    actorID: string,
    actorName: string,
    value: string,
    impact = '',
    description = ''
  ) {
    const { data } = await this.privateClient.updateActor({
      actorData: {
        ID: actorID,
        name: actorName,
        value,
        impact,
        description,
      },
    });

    return data?.updateActor;
  }

  // Create a post for the given callout
  async createPostOnCallout(
    calloutID: string,
    type: string,
    displayName: string,
    nameID: string,
    description: string,
    tags?: string[]
  ) {
    const postData: CreatePostOnCalloutInput = {
      type,
      calloutID,
      nameID,
      profileData: {
        description,
        displayName,
      },
      tags: tags,
    };
    const { data } = await this.privateClient.createPostOnCallout({
      postData,
    });

    return data?.createPostOnCallout;
  }

  // Create a callout for the given collaboration
  async createCalloutOnCollaboration(
    collaborationID: string,
    displayName: string,
    description: string,
    type: CalloutType,
    state: CalloutState
  ) {
    const calloutData: CreateCalloutOnCollaborationInput = {
      collaborationID,
      type,
      state,
      profile: { displayName, description },
    };
    const { data } = await this.privateClient.createCalloutOnCollaboration({
      calloutData,
    });

    return data?.createCalloutOnCollaboration;
  }

  async createUserGroupOnSpace(
    spaceID: string,
    groupName: string,
    groupDesc: string
  ) {
    const spaceInfo = await this.spaceInfo(spaceID);
    const communityID = spaceInfo?.community?.id;
    if (!communityID) return;
    const { data } = await this.privateClient.createGroupOnCommunity({
      groupData: {
        name: groupName,
        parentID: communityID,
        profileData: {
          description: groupDesc,
          displayName: groupName,
        },
      },
    });

    return data?.createGroupOnCommunity;
  }

  public async createOrganization(displayName: string, nameID: string) {
    const { data } = await this.privateClient.createOrganization({
      organizationData: {
        nameID: nameID,
        profileData: {
          displayName: displayName,
        },
      },
    });

    return data?.createOrganization;
  }

  public async deleteOrganization(orgID: string) {
    const { data } = await this.privateClient.deleteOrganization({
      deleteData: {
        ID: orgID,
      },
    });

    return data?.deleteOrganization;
  }

  public async deleteOpportunity(opportunityID: string) {
    const { data } = await this.privateClient.deleteOpportunity({
      deleteData: {
        ID: opportunityID,
      },
    });

    return data?.deleteOpportunity;
  }

  public async deleteChallenge(challengeID: string) {
    const { data } = await this.privateClient.deleteChallenge({
      deleteData: {
        ID: challengeID,
      },
    });

    return data?.deleteChallenge;
  }

  public async organizations() {
    const { data } = await this.privateClient.organizations();

    return data?.organizations;
  }

  public async organization(orgID: string) {
    const { data } = await this.privateClient.organization({
      id: orgID,
    });

    return data?.organization;
  }

  public async challenges(spaceID: string) {
    const { data } = await this.privateClient.challenges({
      hubID: spaceID,
    });

    return data?.hub.challenges;
  }

  public async updateChallenge(challenge: UpdateChallengeInput) {
    const { data } = await this.privateClient.updateChallenge({
      challengeData: challenge,
    });

    return data?.updateChallenge;
  }

  public async updateOpportunity(opportunity: UpdateOpportunityInput) {
    const { data } = await this.privateClient.updateOpportunity({
      opportunityData: opportunity,
    });

    return data?.updateOpportunity;
  }

  public async updateOrganization(organization: UpdateOrganizationInput) {
    const { data } = await this.privateClient.updateOrganization({
      organizationData: organization,
    });

    return data?.updateOrganization;
  }

  public async createUser(user: CreateUserInput) {
    const { data } = await this.privateClient.createUser({
      userData: user,
    });

    return data?.createUser;
  }

  public async groups(spaceID: string) {
    const { data } = await this.privateClient.groups({
      hubID: spaceID,
    });

    return data?.hub.community?.groups;
  }

  public async groupByName(spaceID: string, name: string) {
    const groups = await this.groups(spaceID);
    return groups?.find((x: { name: string }) => x.name === name);
  }

  public async users() {
    const { data } = await this.privateClient.users();

    return data?.users;
  }

  public async usersWithAuthorizationCredential(
    credentialType: AuthorizationCredential,
    resourceID?: string,
    includeUserPreferences?: boolean
  ) {
    let queryResult;
    const payload = {
      credentialsCriteriaData: {
        type: credentialType,
        resourceID: resourceID ?? undefined,
      },
    };

    if (!includeUserPreferences) {
      queryResult = await this.privateClient.usersWithAuthorizationCredential(
        payload
      );
    } else {
      queryResult =
        await this.privateClient.usersWithAuthorizationCredentialWithPreferences(
          payload
        );
    }

    return queryResult.data?.usersWithAuthorizationCredential;
  }

  public async spaces() {
    const { data } = await this.privateClient.spaces();

    return data?.hubs;
  }

  public async opportunities(spaceID: string) {
    const { data } = await this.privateClient.opportunities({
      hubID: spaceID,
    });

    return data?.hub.opportunities;
  }

  async assignOrganizationAsCommunityLead(
    communityID: string,
    organizationID: string
  ) {
    const { data } = await this.privateClient.assignOrgAsLead({
      input: { communityID, organizationID },
    });

    return data?.assignOrganizationAsCommunityLead;
  }

  async assignOrganizationAsCommunityMember(
    communityID: string,
    organizationID: string
  ) {
    const { data } = await this.privateClient.assignOrgAsMember({
      input: { communityID, organizationID },
    });

    return data?.assignOrganizationAsCommunityMember;
  }

  async assignUserAsCommunityLead(communityID: string, userID: string) {
    const { data } = await this.privateClient.assignUserAsCommunityLead({
      input: { communityID, userID },
    });

    return data?.assignUserAsCommunityLead;
  }

  async assignUserAsCommunityMember(communityID: string, userID: string) {
    const { data } = await this.privateClient.assignUserToCommunity({
      input: { communityID, userID },
    });

    return data?.assignUserAsCommunityMember;
  }

  async addUserToCommunity(userID: string, communityID?: string) {
    const uID = userID;
    if (!communityID)
      throw new Error(`Unable to locate community: ${communityID}`);
    const cID = communityID;

    const { data } = await this.privateClient.assignUserToCommunity({
      input: {
        userID: uID,
        communityID: cID,
      },
    });

    return data?.assignUserAsCommunityMember;
  }

  async updateReferencesOnSpace(
    spaceID: string,
    references: Omit<UpdateReferenceInput, 'ID'>[]
  ) {
    const spaceInfo = await this.spaceInfo(spaceID);
    const profileId = spaceInfo?.profile.id;
    if (!profileId) {
      throw new Error('Space context id does not exist.');
    }
    const existingReferences = spaceInfo?.profile?.references || [];
    const newReferences = references.filter(r =>
      existingReferences.every(
        (x: { name: InputMaybe<string> }) => x.name !== r.name
      )
    );
    const oldReferences = existingReferences.filter(r =>
      references.some(x => x.name === r.name)
    );

    const updateRefsInput: UpdateReferenceInput[] = [];
    for (const oldRef of oldReferences) {
      const newRefInput: UpdateReferenceInput = {
        ID: oldRef.id,
        name: oldRef.name,
        description: oldRef.description,
        uri: oldRef.uri,
      };
      updateRefsInput.push(newRefInput);
    }
    if (updateRefsInput.length > 0) {
      await this.updateSpace({
        ID: spaceID,
        profileData: {
          references: updateRefsInput,
        },
      });
    }

    for (const newRef of newReferences) {
      const input: CreateReferenceOnProfileInput = {
        profileID: profileId,
        name: newRef.name || '',
        description: newRef.description,
        uri: newRef.uri,
      };
      this.privateClient.createReferenceOnProfile({
        referenceInput: input,
      });
    }
  }
}
