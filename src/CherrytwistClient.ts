import { GraphQLClient } from 'graphql-request';
import { ClientConfig } from './config/ClientConfig';
import { getSdk, Sdk } from './graphql';
import {
  CreateChallengeInput,
  UpdateEcoverseInput,
  CreateOpportunityInput,
  UpdateChallengeInput,
  UpdateOpportunityInput,
  UpdateOrganisationInput,
  CreateUserInput,
  UpdateContextInput,
  Reference,
  UpdateReferenceInput,
  CreateEcoverseInput,
} from './types/cherrytwist-schema';
import { ErrorHandler, handleErrors } from './util/handleErrors';
import semver from 'semver';

export class CherrytwistClient {
  public config: ClientConfig;
  private client: Sdk;
  private errorHandler: ErrorHandler;

  constructor(config: ClientConfig) {
    this.config = config;

    const client = new GraphQLClient(this.config.graphqlEndpoint, {
      headers: {
        authorization: `Bearer ${config.accessToken}`,
      },
    });
    this.client = getSdk(client);

    this.errorHandler = handleErrors();
  }

  public async validateConnection() {
    const serverVersion = await this.serverVersion();

    this.validateServerVersion(serverVersion);
    return serverVersion;
  }

  public validateServerVersion(serverVersion: string): boolean {
    const MIN_SERVER_VERSION = '0.11.0';
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
      service => service.name === 'ct-server'
    );
    if (!serverMetaData) throw new Error('Unable to locate server meta data');
    const serverVersion = serverMetaData.version;
    if (!serverVersion)
      throw new Error(`Unable to retrive CT server version: ${serverVersion}`);
    return serverVersion;
  }

  public async ecoverseExists(): Promise<boolean> {
    try {
      const result = await this.client.ecoverse({
        id: this.config.ecoverseID,
      });
      if (!result.errors) return true;
    } catch (error) {
      return false;
    }
    return true;
  }

  public async createEcoverse(ecoverseData: CreateEcoverseInput) {
    const result = await this.client.createEcoverse({
      ecoverseData: ecoverseData,
    });

    this.errorHandler(result.errors);

    return result.data?.createEcoverse;
  }

  public async createOpportunity(opportunity: CreateOpportunityInput) {
    const result = await this.client.createOpportunity({
      opportunityData: opportunity,
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
        parentID: profileID,
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
      email: userEmail,
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
          parentID: profileID,
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
    ecoverseID: string,
    challengeName: string,
    userID: string
  ) {
    const response = await this.client.challenge({
      ecoverseID: ecoverseID,
      challengeID: challengeName,
    });
    const communityID = response.data?.ecoverse.challenge?.community?.id;

    if (!response) return;

    return await this.client.addUserToCommunity({
      input: {
        userID: userID,
        communityID,
      },
    });
  }

  async addUserToEcoverse(userID: string) {
    const response = await this.ecoverseInfo();
    const communityID = response.data?.ecoverse?.community?.id;

    if (!response) return;

    return await this.client.addUserToCommunity({
      input: {
        userID: userID,
        communityID,
      },
    });
  }

  async addChallengeLead(challengeName: string, organisationID: string) {
    const { data, errors } = await this.client.addChallengeLead({
      input: {
        challengeID: challengeName,
        organisationID: organisationID,
      },
    });

    this.errorHandler(errors);

    return !!data?.assignChallengeLead;
  }

  async updateEcoverseContext(context: UpdateContextInput) {
    const { data, errors } = await this.client.updateEcoverse({
      ecoverseData: {
        ID: '1',
        nameID: 'test',
        context: context,
      },
    });

    this.errorHandler(errors);

    return data?.updateEcoverse;
  }

  async updateEcoverse(ecoverse: UpdateEcoverseInput) {
    const { data, errors } = await this.client.updateEcoverse({
      ecoverseData: ecoverse,
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
    opportunityID: string,
    actorGroupName: string,
    description: string
  ) {
    const { data, errors } = await this.client.createActorGroup({
      actorGroupData: {
        ecosystemModelID: opportunityID,
        name: actorGroupName,
        description,
      },
    });

    this.errorHandler(errors);

    return data?.createActorGroup;
  }

  // Create a actorgroup for the given opportunity
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

  // Create a actor group for the given opportunity
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

  // Create a aspect for the given opportunity
  async createAspect(
    opportunityID: string,
    title: string,
    framing: string,
    explanation: string
  ) {
    const { data, errors } = await this.client.createAspect({
      aspectData: {
        parentID: opportunityID,
        title,
        framing,
        explanation,
      },
    });

    this.errorHandler(errors);

    return data?.createAspect;
  }

  // Create a gouup at the ecoverse level with the given name
  async createEcoverseGroup(groupName: string) {
    const ecoverseInfo = await this.ecoverseInfo();

    const communityID = ecoverseInfo.data?.ecoverse.community?.id;
    const { data, errors } = await this.client.createGroupOnCommunity({
      groupData: {
        name: groupName,
        parentID: communityID,
      },
    });

    this.errorHandler(errors);

    return data?.createGroupOnCommunity;
  }

  public async createOrganisation(displayName: string, nameID: string) {
    const { data, errors } = await this.client.createOrganisation({
      organisationData: {
        nameID: nameID,
        displayName: displayName,
      },
    });

    this.errorHandler(errors);

    return data?.createOrganisation;
  }

  public async organisations() {
    const { data, errors } = await this.client.organisations();

    this.errorHandler(errors);

    return data?.organisations;
  }

  public async organisation(orgID: string) {
    const { data, errors } = await this.client.organisation({
      id: orgID,
    });

    this.errorHandler(errors);

    return data?.organisation;
  }

  public async createChallenge(challenge: CreateChallengeInput) {
    const { data, errors } = await this.client.createChallenge({
      challengeData: challenge,
    });

    this.errorHandler(errors);

    return data?.createChallenge;
  }

  public async challenges() {
    const { data, errors } = await this.client.challenges({
      ecoverseID: this.config.ecoverseID,
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

  public async updateOrganisation(organisation: UpdateOrganisationInput) {
    const { data, errors } = await this.client.updateOrganisation({
      organisationData: organisation,
    });

    this.errorHandler(errors);

    return data?.updateOrganisation;
  }

  public async createUser(user: CreateUserInput) {
    const { data, errors } = await this.client.createUser({
      userData: user,
    });

    this.errorHandler(errors);

    return data?.createUser;
  }

  public async groups() {
    const { data, errors } = await this.client.groups({
      ecoverseID: this.config.ecoverseID,
    });

    this.errorHandler(errors);

    return data?.ecoverse.community?.groups;
  }

  public async groupByName(name: string) {
    const groups = await this.groups();
    return groups?.find(x => x.name === name);
  }

  public async user(email: string) {
    const { data, errors } = await this.client.user({
      email,
    });

    this.errorHandler(errors);

    return data?.user;
  }

  public async users() {
    const { data, errors } = await this.client.users();

    this.errorHandler(errors);

    return data?.users;
  }

  public async opportunities() {
    const { data, errors } = await this.client.opportunities({
      ecoverseID: this.config.ecoverseID,
    });

    this.errorHandler(errors);

    return data?.ecoverse.opportunities;
  }

  async addUserToOpportunity(userID: string, opportunityID: string) {
    const opportunity = await this.client.opportunity({
      ecoverseID: this.config.ecoverseID,
      opportunityID: opportunityID,
    });
    const communityID = opportunity.data?.ecoverse.opportunity?.community?.id;
    return await this.addUserToCommunity(userID, communityID);
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

  async ecoverseInfo() {
    return await this.client.ecoverse({
      id: this.config.ecoverseID,
    });
  }

  async updateReferencesOnEcoverse(references: Omit<Reference, 'id'>[]) {
    const ecoverseInfo = await this.ecoverseInfo();
    const contextId = ecoverseInfo.data?.ecoverse.context?.id;
    if (!contextId) {
      throw new Error('Ecoverse context id does not exist.');
    }
    const existingReferences =
      ecoverseInfo.data?.ecoverse.context?.references || [];
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
      let ecoverseID = ecoverseInfo.data?.ecoverse.id;
      if (!ecoverseID) ecoverseID = '';
      await this.updateEcoverse({
        ID: ecoverseID,
        context: {
          references: updateRefsInput,
        },
      });
    }

    for (const newRef of newReferences) {
      this.client.createReferenceOnContext({
        input: {
          parentID: contextId,
          name: newRef.name,
          description: newRef.description,
          uri: newRef.uri,
        },
      });
    }
  }
}
