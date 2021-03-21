import { GraphQLClient } from 'graphql-request';
import { ClientConfig } from './config/ClientConfig';
import { getSdk, Sdk } from './graphql';
import {
  ChallengeInput,
  ContextInput,
  EcoverseInput,
  OpportunityInput,
  UpdateChallengeInput,
  UserInput,
} from './types/cherrytwist-schema';
import { ErrorHandler, handleErrors } from './util/handleErrors';

export class CherrytwistClient {
  private config: ClientConfig;
  private client: Sdk;
  private errorHandler: ErrorHandler;

  constructor(config: ClientConfig) {
    this.config = config;

    const client = new GraphQLClient(config.graphqlEndpoint, {
      headers: {
        authorization: 'Bearer',
      },
    });
    this.client = getSdk(client);

    this.errorHandler = handleErrors();
  }

  public async testConnection(): Promise<boolean> {
    try {
      const { data, errors } = await this.client.ecoverseName();

      const ecoverseName = data?.name;

      if (errors) {
        return false;
      }
      return !!ecoverseName;
    } catch (ex) {
      return false;
    }
  }

  private async getChallenge(name: string) {
    const {
      data: challengesData,
      errors: challengesErrors,
    } = await this.client.challengesBase();

    this.errorHandler(challengesErrors);

    if (!challengesData) return;
    const challenges = challengesData.challenges;

    const challenge = challenges.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );

    return challenge;
  }

  // TODO [ATS]: Change ChallengeId to be string;
  public async createOpportunity(
    challengeID: number,
    opportunity: OpportunityInput
  ) {
    const result = await this.client.createOpportunity({
      challengeID,
      opportunityData: opportunity,
    });

    this.errorHandler(result.errors);

    return result.data?.createOpportunityOnChallenge;
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
    const challenge = await this.getChallenge(challengeName);

    if (!challenge) return;

    const { data, errors } = await this.client.addUserToChallenge({
      userID: Number(userID),
      challengeID: Number(challenge.id),
    });

    this.errorHandler(errors);
    return data?.addUserToChallenge;
  }

  async addUserToChallengeByEmail(email: string, challengeName: string) {
    const user = await this.user(email);

    if (!user) throw new Error(`User ${email} not found!`);

    return await this.addUserToChallenge(challengeName, user.id);
  }

  async addChallengeLead(challengeName: string, organisationID: string) {
    const challenge = await this.getChallenge(challengeName);

    if (!challenge) return false;
    const { data, errors } = await this.client.addChallengeLead({
      challengeID: Number(challenge.id),
      organisationID: Number(organisationID),
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
    const { data, errors } = await this.client.createGroupOnEcoverse({
      groupName,
    });

    this.errorHandler(errors);

    return data?.createGroupOnEcoverse;
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

    return data?.challenges;
  }

  public async updateChallenge(challenge: UpdateChallengeInput) {
    const { data, errors } = await this.client.updateChallenge({
      challengeData: challenge,
    });

    this.errorHandler(errors);

    return data?.updateChallenge;
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

    return data?.groups;
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

    return data?.opportunities;
  }

  async addUserToOpportunity(userID: string, opportunityID: string) {
    const uID = Number(userID);
    const oID = Number(opportunityID);

    const { data, errors } = await this.client.addUserToOpportunity({
      userID: uID,
      opportunityID: oID,
    });

    this.errorHandler(errors);

    return data?.addUserToOpportunity;
  }
}
