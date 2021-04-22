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
    const MIN_SERVER_VERSION = '0.10.7';
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
        parentID: Number(profileID),
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

  async createTagset(
    profileID: string,
    tagsetName: string,
    tags: string[]
  ): Promise<boolean> {
    if (tags) {
      const { data, errors } = await this.client.createTagsetOnProfile({
        tagsetData: {
          parentID: Number(profileID),
          name: tagsetName,
        },
      });

      this.errorHandler(errors);

      const newTagsetId = Number(data?.createTagsetOnProfile.id);
      if (!data) return false;

      const { errors: replaceErrors } = await this.client.updateTagset({
        tagsetData: {
          ID: newTagsetId,
          tags,
        },
      });

      this.errorHandler(replaceErrors);
    }
    return true;
  }

  async addUserToGroup(userID: string, groupID: string): Promise<boolean> {
    const uID = Number(userID);
    const gID = Number(groupID);

    const { data, errors } = await this.client.addUserToGroup({
      input: {
        userID: uID,
        groupID: gID,
      },
    });

    this.errorHandler(errors);

    return !!data?.assignUserToGroup;
  }

  async addUserToChallenge(challengeName: string, userID: string) {
    const response = await this.client.challenge({ id: challengeName });
    const communityID = Number(
      response.data?.ecoverse.challenge?.community?.id
    );

    if (!response) return;

    return await this.client.addUserToCommunity({
      input: {
        userID: Number(userID),
        communityID,
      },
    });
  }

  async addUserToEcoverse(userID: string) {
    const response = await this.client.ecoverseInfo();
    const communityID = Number(response.data?.ecoverse?.community?.id);

    if (!response) return;

    return await this.client.addUserToCommunity({
      input: {
        userID: Number(userID),
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
    const relationData = {
      parentID: Number(opportunityID),
      type,
      description,
      actorName,
      actorType,
      actorRole,
    };

    const { data, errors } = await this.client.createRelation({
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
      actorGroupData: {
        parentID: Number(opportunityID),
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
        parentID: Number(actorGroupID),
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
        parentID: Number(opportunityID),
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
      groupData: {
        name: groupName,
        parentID: communityID,
      },
    });

    this.errorHandler(errors);

    return data?.createGroupOnCommunity;
  }

  public async createOrganisation(name: string, textID: string) {
    const { data, errors } = await this.client.createOrganisation({
      organisationData: {
        textID,
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

  public async createChallenge(challenge: CreateChallengeInput) {
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

  public async createUser(user: CreateUserInput) {
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
      input: {
        userID: uID,
        communityID: cID,
      },
    });

    this.errorHandler(errors);

    return data?.assignUserToCommunity;
  }

  async updateEcoverseReferences(references: Omit<Reference, 'id'>[]) {
    const ecoverseInfo = await this.client.ecoverseInfo();
    const contextId = ecoverseInfo.data?.ecoverse.context?.id;
    if (!contextId) {
      throw new Error('Ecoverse context id does not exitsts.');
    }
    const existinggReferences =
      ecoverseInfo.data?.ecoverse.context?.references || [];
    const newReferences = references.filter(r =>
      existinggReferences.every(x => x.name !== r.name)
    );
    const oldReferences = existinggReferences.filter(r =>
      references.some(x => x.name === r.name)
    );

    for (const oldRef of oldReferences) {
      this.client.updateReference({
        input: {
          ID: Number(oldRef.id),
          name: oldRef.name,
          description: oldRef.description,
          uri: oldRef.uri,
        },
      });
    }

    for (const newRef of newReferences) {
      this.client.createReferenceOnContext({
        input: {
          parentID: Number(contextId),
          name: newRef.name,
          description: newRef.description,
          uri: newRef.uri,
        },
      });
    }
  }
}
