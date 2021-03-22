import { GraphQLClient } from 'graphql-request';
import { ClientConfig } from './config/ClientConfig';
import { getSdk, Sdk } from './graphql';
import {
  ChallengeInput,
  ContextInput,
  EcoverseInput,
  OpportunityInput,
  UpdateChallengeInput,
  UpdateOpportunityInput,
  UpdateOrganisationInput,
  UserInput,
} from './types/cherrytwist-schema';
import { ErrorHandler, handleErrors } from './util/handleErrors';
import semver from 'semver';

export class CherrytwistClient {
  private config: ClientConfig;
  private client: Sdk;
  private errorHandler: ErrorHandler;

  constructor(config: ClientConfig) {
    this.config = config;

    const client = new GraphQLClient(this.config.graphqlEndpoint, {
      headers: {
        authorization: 'Bearer',
      },
    });
    this.client = getSdk(client);

    this.errorHandler = handleErrors();
  }

  public async validateConnection(): Promise<boolean> {
    const { data, errors } = await this.client.ecoverseInfo();

    const ecoverseName = data?.ecoverse.name;

    if (errors || !ecoverseName) {
      return false;
    }

    await this.validateServerVersion();

    return true;
  }

  public async validateServerVersion(): Promise<boolean> {
    const serverVersion = await this.serverVersion();
    const MIN_SERVER_VERSION = '0.9.1';
    const validVersion = semver.gte(serverVersion, MIN_SERVER_VERSION);
    if (!validVersion)
      throw new Error(
        `Detected server version (${serverVersion} not compatible with required server version: ${MIN_SERVER_VERSION})`
      );
    return true;
  }

  public async serverVersion() {
    const { data, errors } = await this.client.metadata();
    if (errors) {
      throw new Error('Unable to query meta data');
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

  public async createOpportunity(opportunity: OpportunityInput) {
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
      profileID: Number(profileID),
      referenceInput: {
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
    const ID = Number(profileID);

    const { data, errors } = await this.client.updateProfile({
      ID,
      profileData: {
        avatar: avatarURI,
        description: description,
        tagsetsData: [],
        referencesData: [],
      },
    });
    this.errorHandler(errors);
    return data?.updateProfile;
  }

  async createTagset(
    profileID: string,
    tagsetName: string,
    tags: string[]
  ): Promise<boolean> {
    if (tags) {
      const { data, errors } = await this.client.createTagsetOnProfile({
        profileID: Number(profileID),
        tagsetName,
      });

      this.errorHandler(errors);

      const newTagsetId = Number(data?.createTagsetOnProfile.id);
      if (!data) return false;

      const { errors: replaceErrors } = await this.client.replaceTagsOnTagset({
        tagsetID: newTagsetId,
        tags,
      });

      this.errorHandler(replaceErrors);
    }
    return true;
  }

  async addUserToGroup(userID: string, groupID: string): Promise<boolean> {
    const uID = Number(userID);
    const gID = Number(groupID);

    const { data, errors } = await this.client.addUserToGroup({
      userID: uID,
      groupID: gID,
    });

    this.errorHandler(errors);

    return !!data?.addUserToGroup;
  }

  async addUserToChallenge(challengeName: string, userID: string) {
    const response = await this.client.challenge({ id: challengeName });
    const communityID = Number(
      response.data?.ecoverse.challenge?.community?.id
    );

    if (!response) return;

    return await this.client.addUserToCommunity({
      userID: Number(userID),
      communityID: communityID,
    });
  }

  async addUserToEcoverse(userID: string) {
    const response = await this.client.ecoverseInfo();
    const communityID = Number(response.data?.ecoverse?.community?.id);

    if (!response) return;

    return await this.client.addUserToCommunity({
      userID: Number(userID),
      communityID: communityID,
    });
  }

  async addChallengeLead(challengeName: string, organisationID: string) {
    const { data, errors } = await this.client.addChallengeLead({
      challengeID: challengeName,
      organisationID: organisationID,
    });

    this.errorHandler(errors);

    return !!data?.addChallengeLead;
  }

  async updateEcoverseContext(context: ContextInput) {
    const { data, errors } = await this.client.updateEcoverse({
      ecoverseData: {
        context: context,
      },
    });

    this.errorHandler(errors);

    return data?.updateEcoverse;
  }

  async updateEcoverse(ecoverse: EcoverseInput) {
    const { data, errors } = await this.client.updateEcoverse({
      ecoverseData: ecoverse,
    });

    this.errorHandler(errors);

    return data?.updateEcoverse;
  }

  async addTagToTagset(tagsetID: string, tagName: string) {
    const { data, errors } = await this.client.addTagToTagset({
      tagsetID: Number(tagsetID),
      tag: tagName,
    });

    this.errorHandler(errors);

    return data?.addTagToTagset;
  }

  async createRelation(
    opportunityID: string,
    type: string,
    description: string,
    actorName: string,
    actorRole: string,
    actorType: string
  ) {
    const relationData = {
      type,
      description,
      actorName,
      actorType,
      actorRole,
    };

    const { data, errors } = await this.client.createRelation({
      opportunityID: Number(opportunityID),
      relationData,
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
      opportunityID: Number(opportunityID),
      actorGroupData: {
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
      actorGroupID: Number(actorGroupID),
      actorData: {
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
      ID: Number(actorID),
      actorData: {
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
      opportunityID: Number(opportunityID),
      aspectData: {
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
    const ecoverseInfo = await this.client.ecoverseInfo();

    const communityID = Number(ecoverseInfo.data?.ecoverse.community?.id);
    const { data, errors } = await this.client.createGroupOnCommunity({
      groupName,
      communityID,
    });

    this.errorHandler(errors);

    return data?.createGroupOnCommunity;
  }

  public async createOrganisation(name: string) {
    const { data, errors } = await this.client.createOrganisation({
      organisationData: {
        name,
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

  public async createChallenge(challenge: ChallengeInput) {
    const { data, errors } = await this.client.createChallenge({
      challengeData: challenge,
    });

    this.errorHandler(errors);

    return data?.createChallenge;
  }

  public async challenges() {
    const { data, errors } = await this.client.challenges();

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

  public async createUser(user: UserInput) {
    const { data, errors } = await this.client.createUser({
      userData: user,
    });

    this.errorHandler(errors);

    return data?.createUser;
  }

  public async groups() {
    const { data, errors } = await this.client.groups();

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
    const { data, errors } = await this.client.opportunities();

    this.errorHandler(errors);

    return data?.ecoverse.opportunities;
  }

  async addUserToOpportunity(userID: string, opportunityID: string) {
    const opportunity = await this.client.opportunity({ id: opportunityID });
    const communityID = opportunity.data?.ecoverse.opportunity?.community?.id;
    return await this.addUserToCommunity(userID, communityID);
  }

  async addUserToCommunity(userID: string, communityID?: string) {
    const uID = Number(userID);
    if (!communityID)
      throw new Error(`Unable to locate community: ${communityID}`);
    const cID = Number(communityID);

    const { data, errors } = await this.client.addUserToCommunity({
      userID: uID,
      communityID: cID,
    });

    this.errorHandler(errors);

    return data?.addUserToCommunity;
  }
}
