/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from 'graphql-request';
import { ClientConfig } from './config/ClientConfig';
import { getSdk, Sdk } from './graphql';
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
  UserAuthorizationResetInput,
  HubAuthorizationResetInput,
  OrganizationAuthorizationResetInput,
  CreateChallengeOnChallengeInput,
  AuthorizationCredential,
  CreateAspectOnContextInput,
} from './types/alkemio-schema';
import { ErrorHandler, handleErrors } from './util/handleErrors';
import semver from 'semver';
import { AuthInfo } from 'src';
import { KratosPublicApiClient } from './util/kratos.public.api.client';
import { log, LOG_LEVEL } from './util/logger';

export class AlkemioClient {
  public apiToken: string;
  public config!: ClientConfig;
  public privateClient!: Sdk;
  private errorHandler: ErrorHandler;

  constructor(config: ClientConfig) {
    this.apiToken = '';
    this.config = config;
    this.config.loggingEnabled = config.loggingEnabled ?? false;
    const privateClient = new GraphQLClient(
      this.config.apiEndpointPrivateGraphql
    );
    this.privateClient = getSdk(privateClient);
    this.errorHandler = handleErrors();
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

      const serverKratosPublicEndpoint = await this.getKratosPublicApiEndpoint();
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
    const { data, errors } = await this.privateClient.featureFlags();

    if (errors) {
      throw new Error(
        `Unable to query feature flags from: ${this.config.apiEndpointPrivateGraphql}`
      );
    }
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
    const { data, errors } = await this.privateClient.metadata();
    if (errors) {
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

  public async hubExists(hubID: string): Promise<boolean> {
    try {
      const result = await this.privateClient.hub({
        id: hubID,
      });
      if (!result.errors) return true;
    } catch (error: any) {
      this.logMessage(
        `unable to check if hub exists, error: ${error.toString()}`
      );
      return false;
    }
    return true;
  }

  async hubInfo(hubID: string) {
    const response = await this.privateClient.hub({
      id: hubID,
    });
    return response.data?.hub;
  }

  public async authorizationResetUser(
    authorizationResetData: UserAuthorizationResetInput
  ) {
    const result = await this.privateClient.authorizationPolicyResetOnUser({
      authorizationResetData: authorizationResetData,
    });

    this.errorHandler(result.errors);

    return result.data;
  }

  public async authorizationResetHub(
    authorizationResetData: HubAuthorizationResetInput
  ) {
    const result = await this.privateClient.authorizationPolicyResetOnHub({
      authorizationResetData: authorizationResetData,
    });

    this.errorHandler(result.errors);

    return result.data;
  }

  public async authorizationResetOrganization(
    authorizationResetData: OrganizationAuthorizationResetInput
  ) {
    const result = await this.privateClient.authorizationPolicyResetOnOrganization(
      {
        authorizationResetData: authorizationResetData,
      }
    );

    this.errorHandler(result.errors);

    return result.data;
  }

  public async createHub(hubData: CreateHubInput) {
    const result = await this.privateClient.createHub({
      hubData: hubData,
    });
    return result.data?.createHub;
  }

  public async createChallenge(challenge: CreateChallengeOnHubInput) {
    const { data, errors } = await this.privateClient.createChallenge({
      challengeData: challenge,
    });

    this.errorHandler(errors);

    return data?.createChallenge;
  }

  public async createChildChallenge(
    challengeData: CreateChallengeOnChallengeInput
  ) {
    const result = await this.privateClient.createChildChallenge({
      childChallengeData: challengeData,
    });

    this.errorHandler(result.errors);

    return result.data?.createChildChallenge;
  }

  public async createOpportunity(opportunityData: CreateOpportunityInput) {
    const result = await this.privateClient.createOpportunity({
      opportunityData: opportunityData,
    });

    this.errorHandler(result.errors);

    return result.data?.createOpportunity;
  }

  public async addReference(
    profileID: string,
    referenceName: string,
    referenceURI: string,
    referenceDesc: string
  ) {
    const { data, errors } = await this.privateClient.createReferenceOnProfile({
      referenceInput: {
        profileID: profileID,
        uri: referenceURI,
        name: referenceName,
        description: referenceDesc,
      },
    });

    this.errorHandler(errors);

    return data?.createReferenceOnProfile;
  }

  public async updateUserProfile(
    userEmail: string,
    description?: string,
    avatarURI?: string,
    country?: string,
    city?: string
  ): Promise<boolean> {
    const { data, errors } = await this.privateClient.user({
      userID: userEmail,
    });

    const profileID = data?.user.profile?.id;

    const avatarID = data?.user.profile?.avatar?.id || '';

    this.errorHandler(errors);

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
    const { data, errors } = await this.privateClient.updateProfile({
      profileData: {
        ID: profileID,
        description: description,
        location: {
          country,
          city,
        },
      },
    });
    this.errorHandler(errors);
    return data?.updateProfile;
  }

  async updateVisual(visualID: string, uri: string) {
    const { data, errors } = await this.privateClient.updateVisual({
      updateData: {
        visualID: visualID,
        uri: uri,
      },
    });
    this.errorHandler(errors);
    return data?.updateVisual;
  }

  private async updateVisualOnContext(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visuals: any[],
    visualName: string,
    uri: string
  ) {
    const visual = visuals.find(v => v.name === visualName);
    if (visual) {
      return await this.updateVisual(visual.id, uri);
    }
  }

  async updateVisualsOnContext(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visuals: any[],
    banner: string,
    background: string,
    avatar: string
  ) {
    await this.updateVisualOnContext(visuals, 'banner', banner);
    await this.updateVisualOnContext(visuals, 'bannerNarrow', background);
    await this.updateVisualOnContext(visuals, 'avatar', avatar);
  }

  async createTagsetOnProfile(
    profileID: string,
    tagsetName: string,
    tags: string[]
  ): Promise<boolean> {
    if (tags) {
      const { errors } = await this.privateClient.createTagsetOnProfile({
        tagsetData: {
          profileID: profileID,
          name: tagsetName,
        },
      });

      this.errorHandler(errors);
    }
    return true;
  }

  async addUserToGroup(userID: string, groupID: string): Promise<boolean> {
    const uID = userID;
    const gID = groupID;

    const { data, errors } = await this.privateClient.assignUserToGroup({
      input: {
        userID: uID,
        groupID: gID,
      },
    });

    this.errorHandler(errors);

    return !!data?.assignUserToGroup;
  }

  async addUserToOrganization(
    userID: string,
    organizationID: string
  ): Promise<boolean> {
    const uID = userID;
    const gID = organizationID;

    const { data, errors } = await this.privateClient.assignUserToOrganization({
      input: {
        userID: uID,
        organizationID: gID,
      },
    });

    this.errorHandler(errors);

    return !!data?.assignUserToOrganization;
  }

  async addUserToChallenge(
    hubID: string,
    challengeName: string,
    userID: string
  ) {
    const response = await this.privateClient.challenge({
      hubID: hubID,
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

  public async opportunityByNameID(hubID: string, opportunityNameID: string) {
    try {
      const result = await this.privateClient.opportunity({
        hubID: hubID,
        opportunityID: opportunityNameID,
      });
      if (!result.errors) return result.data?.hub.opportunity;
    } catch (error) {
      return;
    }
  }

  async challengeByNameID(hubNameID: string, challengeNameID: string) {
    try {
      const response = await this.privateClient.challenge({
        hubID: hubNameID,
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
    hubName: string,
    opportunityName: string,
    userID: string
  ) {
    const opportunityInfo = await this.opportunityByNameID(
      hubName,
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

  async addUserToHub(hubID: string, userID: string) {
    const hubInfo = await this.hubInfo(hubID);
    const communityID = hubInfo?.community?.id;

    if (!hubInfo || !communityID) return;

    return await this.privateClient.assignUserToCommunity({
      input: {
        userID: userID,
        communityID,
      },
    });
  }

  async updateHub(hubData: UpdateHubInput) {
    const { data, errors } = await this.privateClient.updateHub({
      hubData: hubData,
    });

    this.errorHandler(errors);

    return data?.updateHub;
  }

  async createRelation(
    opportunityID: string,
    type: string,
    description: string,
    actorName: string,
    actorRole: string,
    actorType: string
  ) {
    const { data, errors } = await this.privateClient.createRelation({
      relationData: {
        parentID: opportunityID,
        type,
        description,
        actorName,
        actorType,
        actorRole,
      },
    });

    this.errorHandler(errors);

    return data?.createRelation;
  }

  async createActorGroup(
    ecosystemModelID: string,
    actorGroupName: string,
    description: string
  ) {
    const { data, errors } = await this.privateClient.createActorGroup({
      actorGroupData: {
        ecosystemModelID: ecosystemModelID,
        name: actorGroupName,
        description,
      },
    });

    this.errorHandler(errors);

    return data?.createActorGroup;
  }

  async createActor(
    actorGroupID: string,
    actorName: string,
    value?: string,
    impact?: string,
    description = ''
  ) {
    const { data, errors } = await this.privateClient.createActor({
      actorData: {
        actorGroupID: actorGroupID,
        name: actorName,
        value,
        impact,
        description,
      },
    });

    this.errorHandler(errors);

    return data?.createActor;
  }

  async updateActor(
    actorID: string,
    actorName: string,
    value: string,
    impact = '',
    description = ''
  ) {
    const { data, errors } = await this.privateClient.updateActor({
      actorData: {
        ID: actorID,
        name: actorName,
        value,
        impact,
        description,
      },
    });

    this.errorHandler(errors);

    return data?.updateActor;
  }

  // Create a aspect for the given context
  async createAspectOnContext(
    contextID: string,
    type: string,
    displayName: string,
    nameID: string,
    description: string,
    tags?: string[]
  ) {
    const aspectData: CreateAspectOnContextInput = {
      type,
      contextID,
      displayName,
      nameID,
      description,
      tags,
    };
    const { data, errors } = await this.privateClient.createAspectOnContext({
      aspectData: aspectData,
    });

    this.errorHandler(errors);

    return data?.createAspectOnContext;
  }

  async createUserGroupOnHub(
    hubID: string,
    groupName: string,
    groupDesc: string
  ) {
    const hubInfo = await this.hubInfo(hubID);
    const communityID = hubInfo?.community?.id;
    if (!communityID) return;
    const { data, errors } = await this.privateClient.createGroupOnCommunity({
      groupData: {
        name: groupName,
        parentID: communityID,
        profileData: {
          description: groupDesc,
        },
      },
    });

    this.errorHandler(errors);

    return data?.createGroupOnCommunity;
  }

  public async createOrganization(displayName: string, nameID: string) {
    const { data, errors } = await this.privateClient.createOrganization({
      organizationData: {
        nameID: nameID,
        displayName: displayName,
      },
    });

    this.errorHandler(errors);

    return data?.createOrganization;
  }

  public async deleteOrganization(orgID: string) {
    const { data, errors } = await this.privateClient.deleteOrganization({
      deleteData: {
        ID: orgID,
      },
    });

    this.errorHandler(errors);

    return data?.deleteOrganization;
  }

  public async organizations() {
    const { data, errors } = await this.privateClient.organizations();

    this.errorHandler(errors);

    return data?.organizations;
  }

  public async organization(orgID: string) {
    const { data, errors } = await this.privateClient.organization({
      id: orgID,
    });

    this.errorHandler(errors);

    return data?.organization;
  }

  public async challenges(hubID: string) {
    const { data, errors } = await this.privateClient.challenges({
      hubID: hubID,
    });

    this.errorHandler(errors);

    return data?.hub.challenges;
  }

  public async updateChallenge(challenge: UpdateChallengeInput) {
    const { data, errors } = await this.privateClient.updateChallenge({
      challengeData: challenge,
    });

    this.errorHandler(errors);

    return data?.updateChallenge;
  }

  public async updateOpportunity(opportunity: UpdateOpportunityInput) {
    const { data, errors } = await this.privateClient.updateOpportunity({
      opportunityData: opportunity,
    });

    this.errorHandler(errors);

    return data?.updateOpportunity;
  }

  public async updateOrganization(organization: UpdateOrganizationInput) {
    const { data, errors } = await this.privateClient.updateOrganization({
      organizationData: organization,
    });

    this.errorHandler(errors);

    return data?.updateOrganization;
  }

  public async createUser(user: CreateUserInput) {
    const { data, errors } = await this.privateClient.createUser({
      userData: user,
    });

    this.errorHandler(errors);

    return data?.createUser;
  }

  public async groups(hubID: string) {
    const { data, errors } = await this.privateClient.groups({
      hubID: hubID,
    });

    this.errorHandler(errors);

    return data?.hub.community?.groups;
  }

  public async groupByName(hubID: string, name: string) {
    const groups = await this.groups(hubID);
    return groups?.find(x => x.name === name);
  }

  public async users() {
    const { data, errors } = await this.privateClient.users();

    this.errorHandler(errors);

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
      queryResult = await this.privateClient.usersWithAuthorizationCredentialWithPreferences(
        payload
      );
    }

    this.errorHandler(queryResult.errors);

    return queryResult.data?.usersWithAuthorizationCredential;
  }

  public async hubs() {
    const { data, errors } = await this.privateClient.hubs();

    this.errorHandler(errors);

    return data?.hubs;
  }

  public async opportunities(hubID: string) {
    const { data, errors } = await this.privateClient.opportunities({
      hubID: hubID,
    });

    this.errorHandler(errors);

    return data?.hub.opportunities;
  }

  async assignOrganizationAsCommunityLead(
    communityID: string,
    organizationID: string
  ) {
    const { data, errors } = await this.privateClient.assignOrgAsLead({
      input: { communityID, organizationID },
    });

    this.errorHandler(errors);

    return data?.assignOrganizationAsCommunityLead;
  }

  async assignOrganizationAsCommunityMember(
    communityID: string,
    organizationID: string
  ) {
    const { data, errors } = await this.privateClient.assignOrgAsMember({
      input: { communityID, organizationID },
    });

    this.errorHandler(errors);

    return data?.assignOrganizationAsCommunityMember;
  }

  async assignUserAsCommunityLead(communityID: string, userID: string) {
    const { data, errors } = await this.privateClient.assignUserAsCommunityLead(
      {
        input: { communityID, userID },
      }
    );

    this.errorHandler(errors);

    return data?.assignUserAsCommunityLead;
  }

  async assignUserAsCommunityMember(communityID: string, userID: string) {
    const { data, errors } = await this.privateClient.assignUserToCommunity({
      input: { communityID, userID },
    });

    this.errorHandler(errors);

    return data?.assignUserAsCommunityMember;
  }

  async addUserToCommunity(userID: string, communityID?: string) {
    const uID = userID;
    if (!communityID)
      throw new Error(`Unable to locate community: ${communityID}`);
    const cID = communityID;

    const { data, errors } = await this.privateClient.assignUserToCommunity({
      input: {
        userID: uID,
        communityID: cID,
      },
    });

    this.errorHandler(errors);

    return data?.assignUserAsCommunityMember;
  }

  async updateReferencesOnHub(
    hubID: string,
    references: Omit<UpdateReferenceInput, 'ID'>[]
  ) {
    const hubInfo = await this.hubInfo(hubID);
    const contextId = hubInfo?.context?.id;
    if (!contextId) {
      throw new Error('Hub context id does not exist.');
    }
    const existingReferences = hubInfo?.context?.references || [];
    const newReferences = references.filter(r =>
      existingReferences.every(x => x.name !== r.name)
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
      await this.updateHub({
        ID: hubID,
        context: {
          references: updateRefsInput,
        },
      });
    }

    for (const newRef of newReferences) {
      this.privateClient.createReferenceOnContext({
        input: {
          contextID: contextId,
          name: newRef.name || '',
          description: newRef.description,
          uri: newRef.uri,
        },
      });
    }
  }
}
