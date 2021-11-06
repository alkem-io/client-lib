import { GraphQLClient } from 'graphql-request';
import { ClientConfig } from './config/ClientConfig';
import { getSdk, Sdk } from './graphql';
import {
  CreateChallengeOnEcoverseInput,
  UpdateEcoverseInput,
  UpdateChallengeInput,
  UpdateOrganizationInput,
  CreateUserInput,
  UpdateContextInput,
  UpdateReferenceInput,
  CreateEcoverseInput,
  CreateOpportunityInput,
  UpdateOpportunityInput,
  UserAuthorizationResetInput,
  EcoverseAuthorizationResetInput,
  OrganizationAuthorizationResetInput,
  CreateChallengeOnChallengeInput,
  AuthorizationCredential,
} from './types/alkemio-schema';
import { ErrorHandler, handleErrors } from './util/handleErrors';
import semver from 'semver';
import { AuthInfo } from 'src';
import { KratosPublicApiClient } from './util/kratos.public.api.client';

export class AlkemioClient {
  public apiToken: string;
  public config!: ClientConfig;
  public client!: Sdk;
  private errorHandler: ErrorHandler;

  constructor(config: ClientConfig) {
    this.apiToken = '';
    this.config = config;
    const client = new GraphQLClient(this.config.graphqlEndpoint);
    this.client = getSdk(client);
    this.errorHandler = handleErrors();
  }

  public async enableAuthentication() {
    if (this.config.authInfo) {
      const kratosPublicEndpoint = await this.getKratosPublicApiEndpoint();
      this.config.authInfo.apiEndpointFactory = () => {
        return kratosPublicEndpoint;
      };
      try {
        const apiToken = await this.getApiToken(this.config.authInfo);

        const client = new GraphQLClient(this.config.graphqlEndpoint, {
          headers: {
            authorization: `Bearer ${apiToken}`,
          },
        });
        this.client = getSdk(client);
      } catch (error) {
        throw new Error(
          `Unable to authenticate to Alkemio (Kratos) endpoint: ${error}`
        );
      }
    }
  }

  private async getApiToken(authInfo: AuthInfo): Promise<string> {
    const authClient = new KratosPublicApiClient(authInfo.apiEndpointFactory);
    this.apiToken = await authClient.authenticate(authInfo.credentials);
    return this.apiToken;
  }

  public async getKratosPublicApiEndpoint(): Promise<string> {
    const configuration = await this.client.configuration();
    const endpoint =
      configuration.data?.configuration.authentication.providers[0].config
        .kratosPublicBaseURL;

    return endpoint ?? 'http://localhost:3000/identity/ory/kratos/public/';
  }

  public async featureFlags() {
    const { data, errors } = await this.client.featureFlags();

    if (errors) {
      throw new Error(
        `Unable to query feature flags from: ${this.config.graphqlEndpoint}`
      );
    }
    return data?.configuration.platform.featureFlags;
  }

  public async validateConnection() {
    const serverVersion = await this.serverVersion();

    this.validateServerVersion(serverVersion);
    return serverVersion;
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
    const { data, errors } = await this.client.metadata();
    if (errors) {
      throw new Error(
        `Unable to query meta data from: ${this.config.graphqlEndpoint}`
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
      const result = await this.client.hub({
        id: hubID,
      });
      if (!result.errors) return true;
    } catch (error) {
      return false;
    }
    return true;
  }

  async hubInfo(hubID: string) {
    const response = await this.client.hub({
      id: hubID,
    });
    return response.data?.ecoverse;
  }

  public async authorizationResetUser(
    authorizationResetData: UserAuthorizationResetInput
  ) {
    const result = await this.client.authorizationPolicyResetOnUser({
      authorizationResetData: authorizationResetData,
    });

    this.errorHandler(result.errors);

    return result.data;
  }

  public async authorizationResetHub(
    authorizationResetData: EcoverseAuthorizationResetInput
  ) {
    const result = await this.client.authorizationPolicyResetOnHub({
      authorizationResetData: authorizationResetData,
    });

    this.errorHandler(result.errors);

    return result.data;
  }

  public async authorizationResetOrganization(
    authorizationResetData: OrganizationAuthorizationResetInput
  ) {
    const result = await this.client.authorizationPolicyResetOnOrganization({
      authorizationResetData: authorizationResetData,
    });

    this.errorHandler(result.errors);

    return result.data;
  }

  public async createHub(hubData: CreateEcoverseInput) {
    const result = await this.client.createHub({
      hubData: hubData,
    });
    return result.data?.createEcoverse;
  }

  public async createChallenge(challenge: CreateChallengeOnEcoverseInput) {
    const { data, errors } = await this.client.createChallenge({
      challengeData: challenge,
    });

    this.errorHandler(errors);

    return data?.createChallenge;
  }

  public async createChildChallenge(
    challengeData: CreateChallengeOnChallengeInput
  ) {
    const result = await this.client.createChildChallenge({
      childChallengeData: challengeData,
    });

    this.errorHandler(result.errors);

    return result.data?.createChildChallenge;
  }

  public async createOpportunity(opportunityData: CreateOpportunityInput) {
    const result = await this.client.createOpportunity({
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
    const { data, errors } = await this.client.createReferenceOnProfile({
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
    avatarURI?: string
  ): Promise<boolean> {
    const { data, errors } = await this.client.user({
      userID: userEmail,
    });

    const profileID = data?.user.profile?.id;

    this.errorHandler(errors);

    if (profileID) {
      return !!(await this.updateProfile(profileID, avatarURI, description));
    }

    return false;
  }

  async updateProfile(
    profileID: string,
    avatarURI?: string,
    description?: string
  ) {
    const { data, errors } = await this.client.updateProfile({
      profileData: {
        ID: profileID,
        avatar: avatarURI,
        description: description,
      },
    });
    this.errorHandler(errors);
    return data?.updateProfile;
  }

  async createTagsetOnProfile(
    profileID: string,
    tagsetName: string,
    tags: string[]
  ): Promise<boolean> {
    if (tags) {
      const { errors } = await this.client.createTagsetOnProfile({
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

    const { data, errors } = await this.client.addUserToGroup({
      input: {
        userID: uID,
        groupID: gID,
      },
    });

    this.errorHandler(errors);

    return !!data?.assignUserToGroup;
  }

  async addUserToChallenge(
    hubID: string,
    challengeName: string,
    userID: string
  ) {
    const response = await this.client.challenge({
      hubID: hubID,
      challengeID: challengeName,
    });
    const communityID = response.data?.ecoverse.challenge?.community?.id;

    if (!response || !communityID) return;

    return await this.client.addUserToCommunity({
      input: {
        userID: userID,
        communityID: communityID,
      },
    });
  }

  public async opportunityByNameID(hubID: string, opportunityNameID: string) {
    try {
      const result = await this.client.opportunity({
        hubID: hubID,
        opportunityID: opportunityNameID,
      });
      if (!result.errors) return result.data?.ecoverse.opportunity;
    } catch (error) {
      return;
    }
  }

  async challengeByNameID(hubNameID: string, challengeNameID: string) {
    try {
      const response = await this.client.challenge({
        hubID: hubNameID,
        challengeID: challengeNameID,
      });

      if (!response) return;
      return response.data?.ecoverse.challenge;
    } catch (error) {
      return;
    }
  }

  async user(userID: string) {
    try {
      const response = await this.client.user({
        userID: userID,
      });

      if (!response) return;
      return response.data?.user;
    } catch (error) {
      return;
    }
  }

  async addUserToOpportunity(
    ecoverseName: string,
    opportunityName: string,
    userID: string
  ) {
    const opportunityInfo = await this.opportunityByNameID(
      ecoverseName,
      opportunityName
    );
    const communityID = opportunityInfo?.community?.id;

    if (!communityID) return;

    return await this.client.addUserToCommunity({
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

    return await this.client.addUserToCommunity({
      input: {
        userID: userID,
        communityID,
      },
    });
  }

  async updateHubContext(hubID: string, context: UpdateContextInput) {
    const { data, errors } = await this.client.updateHub({
      hubData: {
        ID: hubID,
        context: context,
      },
    });

    this.errorHandler(errors);

    return data?.updateEcoverse;
  }

  async updateHub(hubData: UpdateEcoverseInput) {
    const { data, errors } = await this.client.updateHub({
      hubData: hubData,
    });

    this.errorHandler(errors);

    return data?.updateEcoverse;
  }

  async createRelation(
    opportunityID: string,
    type: string,
    description: string,
    actorName: string,
    actorRole: string,
    actorType: string
  ) {
    const { data, errors } = await this.client.createRelation({
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
    const { data, errors } = await this.client.createActorGroup({
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
    const { data, errors } = await this.client.createActor({
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
    const { data, errors } = await this.client.updateActor({
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
  async createAspect(
    contextID: string,
    title: string,
    framing: string,
    explanation: string
  ) {
    const { data, errors } = await this.client.createAspect({
      aspectData: {
        parentID: contextID,
        title,
        framing,
        explanation,
      },
    });

    this.errorHandler(errors);

    return data?.createAspect;
  }

  async createUserGroupOnHub(
    hubID: string,
    groupName: string,
    groupDesc: string
  ) {
    const ecoverseInfo = await this.hubInfo(hubID);
    const communityID = ecoverseInfo?.community?.id;
    if (!communityID) return;
    const { data, errors } = await this.client.createGroupOnCommunity({
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
    const { data, errors } = await this.client.createOrganization({
      organizationData: {
        nameID: nameID,
        displayName: displayName,
      },
    });

    this.errorHandler(errors);

    return data?.createOrganization;
  }

  public async organizations() {
    const { data, errors } = await this.client.organizations();

    this.errorHandler(errors);

    return data?.organizations;
  }

  public async organization(orgID: string) {
    const { data, errors } = await this.client.organization({
      id: orgID,
    });

    this.errorHandler(errors);

    return data?.organization;
  }

  public async challenges(hubID: string) {
    const { data, errors } = await this.client.challenges({
      hubID: hubID,
    });

    this.errorHandler(errors);

    return data?.ecoverse.challenges;
  }

  public async updateChallenge(challenge: UpdateChallengeInput) {
    const { data, errors } = await this.client.updateChallenge({
      challengeData: challenge,
    });

    this.errorHandler(errors);

    return data?.updateChallenge;
  }

  public async updateOpportunity(opportunity: UpdateOpportunityInput) {
    const { data, errors } = await this.client.updateOpportunity({
      opportunityData: opportunity,
    });

    this.errorHandler(errors);

    return data?.updateOpportunity;
  }

  public async updateOrganization(organization: UpdateOrganizationInput) {
    const { data, errors } = await this.client.updateOrganization({
      organizationData: organization,
    });

    this.errorHandler(errors);

    return data?.updateOrganization;
  }

  public async createUser(user: CreateUserInput) {
    const { data, errors } = await this.client.createUser({
      userData: user,
    });

    this.errorHandler(errors);

    return data?.createUser;
  }

  public async groups(hubID: string) {
    const { data, errors } = await this.client.groups({
      hubID: hubID,
    });

    this.errorHandler(errors);

    return data?.ecoverse.community?.groups;
  }

  public async groupByName(hubID: string, name: string) {
    const groups = await this.groups(hubID);
    return groups?.find(x => x.name === name);
  }

  public async users() {
    const { data, errors } = await this.client.users();

    this.errorHandler(errors);

    return data?.users;
  }

  public async usersWithAuthorizationCredential(
    credentialType: AuthorizationCredential,
    resourceID?: string
  ) {
    const { data, errors } = await this.client.usersWithAuthorizationCredential(
      {
        credentialsCriteriaData: {
          type: credentialType,
          resourceID: resourceID ?? undefined,
        },
      }
    );

    this.errorHandler(errors);

    return data?.usersWithAuthorizationCredential;
  }

  public async hubs() {
    const { data, errors } = await this.client.hubs();

    this.errorHandler(errors);

    return data?.ecoverses;
  }

  public async opportunities(hubID: string) {
    const { data, errors } = await this.client.opportunities({
      hubID: hubID,
    });

    this.errorHandler(errors);

    return data?.ecoverse.opportunities;
  }

  async addUserToCommunity(userID: string, communityID?: string) {
    const uID = userID;
    if (!communityID)
      throw new Error(`Unable to locate community: ${communityID}`);
    const cID = communityID;

    const { data, errors } = await this.client.addUserToCommunity({
      input: {
        userID: uID,
        communityID: cID,
      },
    });

    this.errorHandler(errors);

    return data?.assignUserToCommunity;
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
      this.client.createReferenceOnContext({
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
