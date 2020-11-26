import { GraphQLClient, gql } from 'graphql-request';
import { EnvironmentConfig } from './util/EnvironmentFactory';
import { EcoverseInfo } from './util/EcoverseInfo';
const winston = require('winston');
require('dotenv').config();

export class CherrytwistClient {
  // The graphql end point for the ecoverse instance
  config: EnvironmentConfig;

  // The generic GraphQL client
  client: GraphQLClient;

  logger;
  profiler;

  // State / info of the ecoverse working with
  ecoverseInfo: EcoverseInfo;

  // Create the ecoverse with enough defaults set/ members populated
  constructor(environmentConfig: EnvironmentConfig) {
    this.config = environmentConfig;
    this.ecoverseInfo = new EcoverseInfo();

    // Set up the logging
    const logFormat = winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    );
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({ level: 'info', format: logFormat }),
        new winston.transports.File({
          filename: 'population-info.log',
          level: 'warn',
        }),
        new winston.transports.File({
          filename: 'population-warnings.log',
          level: 'warn',
        }),
      ],
    });

    this.profiler = winston.createLogger({
      transports: [
        new winston.transports.Console({ level: 'info', format: logFormat }),
        new winston.transports.File({
          filename: 'profile-info.log',
          level: 'silly',
        }),
      ],
    });

    this.client = new GraphQLClient(this.config.server);
  }

  /* Check that a connection can be made to the specified Ecoverse instance */
  public async testConnection(): Promise<Boolean> {
    const query = gql`
      {
        name
      }
    `;
    const data = await this.client.request(query);
    var ecoverseName = data.name;
    if (!ecoverseName) {
      this.logger.error(
        `Unable to connect to ecoverse at location: ${this.config.server}`
      );
      return false;
    }
    this.logger.info(`Connected to ecoverse: ${ecoverseName}`);
    return true;
  }

  // loadAdminToken() {
  //   const adminUserToken = fs.readFileSync(this.config.admin_token).toString();
  //   if (adminUserToken.length == 0)
  //     throw new Error(
  //       `Unable to load in admin user token from ${this.config.admin_token}`
  //     );
  //   this.logger.info(`Loaded admin user token ok`);
  //   // Set the auth header
  //   this.client.setHeader('Authorization', `Bearer ${adminUserToken}`);
  //   this.logger.info(`Bearer token:  ${adminUserToken}`);
  // }

  // Load in mutations file
  async createGroups(groupNames: string[]) {
    this.logger.info(
      `===================================================================`
    );

    this.logger.info(`To create ${groupNames.length} ecoverse groups`);
    // Iterate over the rows
    for (let i = 0; i < groupNames.length; i++) {
      const groupName = groupNames[i];
      await this.createEcoverseGroup(groupName);
    }
  }

  async createOpportunity(challengeID: number, opportunityJson: any) {
    // create the variable for the group mutation
    const createOpportunityVariable = gql`
                  {
                    "challengeID": ${challengeID},
                    "opportunityData":
                    {
                        "name": "${opportunityJson.name}",
                        "textID": "${opportunityJson.textID}",
                        "context": {
                          "background": "${opportunityJson.problem}",
                          "vision": "${opportunityJson.pilot_goal}",
                          "tagline": "${opportunityJson.spotlight}",
                          "who": "${opportunityJson.polaris.un_sdg}",
                          "impact": "${opportunityJson.polaris.long_term_vision}",
                          "references": [
                            {
                              "name": "github",
                              "uri": "${opportunityJson.urls.github}",
                              "description": "make it buildable"
                            },
                            {
                              "name": "demo",
                              "uri": "${opportunityJson.urls.demo}",
                              "description": "make it understandable"
                            },
                            {
                              "name": "poster",
                              "uri": "${opportunityJson.images.poster}",
                              "description": "make it visual"
                            },
                            {
                              "name": "meme",
                              "uri": "${opportunityJson.images.meme}",
                              "description": "make it resonate"
                            }
                          ]
                        }
                    }
          }`;

    const response = await this.client.request(
      this.mutations.createOpportunityMutationStr,
      createOpportunityVariable
    );
    this.logger.verbose(
      `Created opportunity with name: ${response.createOpportunityOnChallenge.name}`
    );
    const opportunityID = response.createOpportunityOnChallenge.id;

    // Create actor groups
    const stakeholderAG = await this.createActorGroup(
      opportunityID,
      'stakeholders',
      'test'
    );
    const stakeholders = opportunityJson.stakeholders;
    for (let i = 0; i < stakeholders.length; i++) {
      const stakeholder = stakeholders[i];
      const stakeholderResponse = await this.createActor(
        stakeholderAG.createActorGroup.id,
        stakeholder.name,
        stakeholder.wins_how,
        stakeholder.required_effort
      );
      this.logger.verbose(`${stakeholderResponse}`);
    }
    const keyUsersAG = await this.createActorGroup(
      opportunityID,
      'key_users',
      'test'
    );
    const keyUsers = opportunityJson.key_users;
    for (let i = 0; i < keyUsers.length; i++) {
      const keyUser = keyUsers[i];
      const keyUserResponse = await this.createActor(
        keyUsersAG.createActorGroup.id,
        keyUser.name,
        keyUser.wins_how,
        keyUser.required_effort
      );
      this.logger.verbose(`${keyUserResponse}`);
    }
    const collaboratorsAG = await this.createActorGroup(
      opportunityID,
      'collaborations',
      'test'
    );

    // Create the aspects
    const solutionDetails = opportunityJson.solution_details;

    var jp = require('jsonpath');
    var solutionsRoot = jp.query(opportunityJson, '$.solution_details');
    var solutions = solutionsRoot[0];
    const solutionAspectNames = Object.keys(solutions);
    for (let i = 0; i < solutionAspectNames.length; i++) {
      const name = solutionAspectNames[i];
      var solution = solutions[name];
      const aspectResponse = await this.createAspect(
        opportunityID,
        name,
        solution.question,
        solution.explanation
      );
      this.logger.verbose(`${aspectResponse.createAspect.title}`);
    }

    // Create the collaborations
    const outgoingRelations = opportunityJson.collaborations.outgoing;
    for (let i = 0; i < outgoingRelations.length; i++) {
      const relation = outgoingRelations[i];
      const response = await this.createRelation(
        opportunityID,
        'outgoing',
        relation.reason,
        'peer',
        'group',
        relation.team_name
      );
    }

    const incomingRelations = opportunityJson.collaborations.incoming;
    for (let i = 0; i < incomingRelations.length; i++) {
      const relation = incomingRelations[i];
      const response = await this.createRelation(
        opportunityID,
        'incoming',
        relation.reason,
        relation.role,
        relation.organization,
        relation.name
      );
    }

    this.logger.verbose(
      `Finished creating opportunity: ${response.createOpportunityOnChallenge.name}`
    );
  }

  escapeStrings(input: string): string {
    if (!input) return '';
    return input
      .replace(/[\\]/g, '\\\\')
      .replace(/[\/]/g, '\\/')
      .replace(/[\b]/g, '\\b')
      .replace(/[\f]/g, '\\f')
      .replace(/[\n]/g, '\\n')
      .replace(/[\r]/g, '\\r')
      .replace(/[\t]/g, '\\t')
      .replace(/[\"]/g, '\\"')
      .replace(/\\'/g, "\\'")
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
      ); // last line to filter out emojis
  }

  async createOpportunity2(
    challengeID: number,
    opportunityJson: any,
    teamJson: any
  ) {
    let demoRef = '';
    if (teamJson.demoUrl && teamJson.demoUrl.length > 0) {
      demoRef = `{
          "name": "demo",
          "uri": "${teamJson.demoUrl}",
          "description": "make it understandable"
        },`;
    }
    let posterRef = '';
    if (teamJson.flagUrl && teamJson.flagUrl.length > 0) {
      posterRef = `{
          "name": "poster",
          "uri": "${teamJson.flagUrl}",
          "description": "make it visual"
        },`;
    }
    // create the variable for the group mutation
    const createOpportunityVariable = gql`
                  {
                    "challengeID": ${challengeID},
                    "opportunityData":
                    {
                        "name": "${teamJson.name}",
                        "textID": "opp_${teamJson.ct_id}",
                        "context": {
                          "background": "${this.escapeStrings(
                            teamJson.problem
                          )}",
                          "vision": "${this.escapeStrings(teamJson.solution)}",
                          "tagline": "${this.escapeStrings(
                            opportunityJson.spotlight
                          )}",
                          "who": "${this.escapeStrings(
                            opportunityJson.polaris_un_sdg
                          )}",
                          "impact": "${this.escapeStrings(
                            opportunityJson.polaris_long_term_vision
                          )}",
                          "references": [
                            {
                              "name": "github",
                              "uri": "${teamJson.githubUrl}",
                              "description": "make it buildable"
                            },
                            ${demoRef}
                            ${posterRef}
                            {
                              "name": "meme",
                              "uri": "${teamJson.memeUrl}",
                              "description": "make it resonate"
                            },
                            {
                              "name": "miroboard",
                              "uri": "${teamJson.miroBoard}",
                              "description": "make it over seeable"
                            }
                          ]
                        }
                    }
          }`;

    let variableJson = null;
    const escapedStr = this.escapeStrings(createOpportunityVariable);
    try {
      variableJson = JSON.parse(createOpportunityVariable);
    } catch (e) {
      this.logger.error(`${e.message}`);
      this.logger.info(`before: ${createOpportunityVariable}`);
      this.logger.info(`after: ${escapedStr}`);
      return false;
    }
    const response = await this.client.request(
      this.mutations.createOpportunityMutationStr,
      JSON.stringify(variableJson)
    );
    this.logger.verbose(
      `Created opportunity with name: ${response.createOpportunityOnChallenge.name}`
    );
    const opportunityID = response.createOpportunityOnChallenge.id;
    // Check if need to remove any references

    // Create actor groups
    const stakeholderAG = await this.createActorGroup(
      opportunityID,
      'stakeholders',
      'test'
    );

    if (
      opportunityJson.stakeholder_1 &&
      opportunityJson.stakeholder_1.name.length > 0
    ) {
      await this.createActor(
        stakeholderAG.createActorGroup.id,
        opportunityJson.stakeholder_1.name,
        opportunityJson.stakeholder_1.wins_how,
        opportunityJson.stakeholder_1.required_effort
      );
    }
    if (
      opportunityJson.stakeholder_2 &&
      opportunityJson.stakeholder_2.name.length > 0
    ) {
      await this.createActor(
        stakeholderAG.createActorGroup.id,
        opportunityJson.stakeholder_2.name,
        opportunityJson.stakeholder_2.wins_how,
        opportunityJson.stakeholder_2.required_effort
      );
    }
    if (
      opportunityJson.stakeholder_3 &&
      opportunityJson.stakeholder_3.name.length > 0
    ) {
      await this.createActor(
        stakeholderAG.createActorGroup.id,
        opportunityJson.stakeholder_3.name,
        opportunityJson.stakeholder_3.wins_how,
        opportunityJson.stakeholder_3.required_effort
      );
    }

    const keyUsersAG = await this.createActorGroup(
      opportunityID,
      'key_users',
      'test'
    );
    const keyUsers = opportunityJson.key_users;
    if (
      opportunityJson.key_user_1 &&
      opportunityJson.key_user_1.name.length > 0
    ) {
      await this.createActor(
        keyUsersAG.createActorGroup.id,
        opportunityJson.key_user_1.name,
        opportunityJson.key_user_1.wins_how,
        opportunityJson.key_user_1.required_effort
      );
    }
    if (
      opportunityJson.key_user_2 &&
      opportunityJson.key_user_2.name.length > 0
    ) {
      await this.createActor(
        keyUsersAG.createActorGroup.id,
        opportunityJson.key_user_2.name,
        opportunityJson.key_user_2.wins_how,
        opportunityJson.key_user_2.required_effort
      );
    }
    if (
      opportunityJson.key_user_3 &&
      opportunityJson.key_user_3.name.length > 0
    ) {
      await this.createActor(
        keyUsersAG.createActorGroup.id,
        opportunityJson.key_user_3.name,
        opportunityJson.key_user_3.wins_how,
        opportunityJson.key_user_3.required_effort
      );
    }

    const aspectsToSkip = ['problem', 'solution', 'url_github', 'url_demo'];
    // Create the aspects
    var jp = require('jsonpath');
    var solutionsRoot = jp.query(opportunityJson, '$.solution_details');
    var solutions = solutionsRoot[0];
    const solutionAspectNames = Object.keys(solutions);
    if (solutionAspectNames) {
      for (let i = 0; i < solutionAspectNames.length; i++) {
        let name = solutionAspectNames[i];
        if (!name) continue;
        if (aspectsToSkip.includes(name)) continue;
        var solution = solutions[name];
        let framing: string = '';
        if (solution.question) {
          framing = solution.question;
          if (solution.question.length > 255) {
            framing = framing.slice(0, 255);
            this.logger.warn(`Truncating framing in aspect: ${name}`);
          }
        }
        name = name.replace(/_/g, ' ');
        if (solution && framing.length > 0) {
          const aspectResponse = await this.createAspect(
            opportunityID,
            name,
            framing,
            solution.explanation
          );

          this.logger.verbose(`${aspectResponse.createAspect.title}`);
        }
      }
    }

    const descriptionMax = 399;
    // Create the team collaborations
    const teamRelations = opportunityJson.team_ups;
    if (teamRelations) {
      for (let i = 0; i < teamRelations.length; i++) {
        const teamRelation = teamRelations[i];
        let description = '';
        if (teamRelation.reason) {
          description = teamRelation.reason;
        }
        if (description.length > descriptionMax) {
          description = description.slice(0, descriptionMax);
          this.logger.warn(
            `Truncating description in aspect: ${teamRelation.team.name}`
          );
        }
        // Complete hack
        //description = description.

        await this.createRelation(
          opportunityID,
          'outgoing',
          this.escapeStrings(description),
          'team',
          'group',
          teamRelation.team.name
        );
      }
    }

    const ecosystemRelations = opportunityJson.ecosystem_joins;
    if (ecosystemRelations) {
      for (let i = 0; i < ecosystemRelations.length; i++) {
        const ecosystemJoin = ecosystemRelations[i];
        let description = '';
        if (ecosystemJoin.reason) {
          description = ecosystemJoin.reason;
        }
        if (description.length > descriptionMax) {
          description = description.slice(0, descriptionMax);
          this.logger.warn(
            `Truncating description in aspect: ${ecosystemJoin.user.name}`
          );
        }
        // Complete hack
        //description = description.replace('\\xF0\\x9F\\x98', '');
        await this.createRelation(
          opportunityID,
          'incoming',
          this.escapeStrings(description),
          ecosystemJoin.user.organisation,
          'user',
          ecosystemJoin.user.name
        );
      }
    }

    this.logger.info(
      `==> Finished creating opportunity: ${response.createOpportunityOnChallenge.name}`
    );
  }

  async addReference(
    refName: string,
    refURI: string,
    refDesc: string,
    userProfileID: string
  ): Promise<Boolean> {
    const createReferenceVariable = gql`
              {
    "profileID": ${userProfileID},
    "referenceInput":
                  {
                    "name": "${refName}",
                    "uri": "${refURI}",
                    "description": "${refDesc}"
                  }
    }`;
    const createReferenceResponse = await this.client.request(
      this.mutations.createReferenceOnProfileMutationStr,
      createReferenceVariable
    );

    this.logger.info(
      `...........added "${refName}" reference with the following URI: ${refURI}`
    );

    return true;
  }

  async updateUserProfile(
    userEmail: string,
    description: string,
    avatarURI: string
  ): Promise<Boolean> {
    const userVariable = gql`{"ID": "${userEmail}"}`;
    let profileID = '';
    let profileDesc = '';
    try {
      const getUserResponse = await this.client.request(
        this.mutations.userQueryStr,
        userVariable
      );
      profileID = getUserResponse.user.profile.id;
      profileDesc = getUserResponse.user.profile.description;
      this.logger.info(
        `...........got user with email "${userEmail}" with the following ID: ${getUserResponse.user.id}`
      );
    } catch (e) {
      this.logger.warn(`Unable to locate user: ${userEmail}`);
      return false;
    }
    await this.updateProfile(profileID, description, avatarURI);
    return true;
  }

  async updateProfile(
    profileID: string,
    description: string,
    avatarURI: string
  ): Promise<Boolean> {
    let profileDesc = '';
    try {
      // hacky: if an empty string is passed in then do not update the description field
      let descToUse = description;
      if (description && description.length == 0) {
        descToUse = profileDesc;
      }
      // get the users id
      const updateProfileVariable = gql`{
        "ID": ${profileID},
        "profileData": {
        "avatar": "${avatarURI}",
        "description": "${description}"
        }
      }`;
      const updateProfileResponse = await this.client.request(
        this.mutations.updateProfileStr,
        updateProfileVariable
      );
      this.logger.info(`...........updated avatar to be "${avatarURI}"`);

      return true;
    } catch (e) {
      this.logger.warn(`Unable to update profile: ${profileID} - ${e}`);
      return false;
    }
  }

  async addTagset(
    tagsStr: string,
    tagsetName: string,
    profileID: string
  ): Promise<Boolean> {
    if (tagsStr) {
      // Add the skills tagset
      const createTagsetVariable = gql`
                  {
                      "profileID": ${profileID},
                      "tagsetName": "${tagsetName}"
                  } `;
      const tagsetResponse = await this.client.request(
        this.mutations.createTagsetOnProfileMutationStr,
        createTagsetVariable
      );
      this.logger.info(`....created ${tagsetName} tagset`);

      // Now set the tags
      const tagsJSON = this.convertCsvToJson(tagsStr);
      const tagsetID = tagsetResponse.createTagsetOnProfile.id;
      const replaceTagsVariable = gql`
                  {
                      "tagsetID": ${tagsetID},
                       "tags": ${tagsJSON}
                  } `;

      const replaceTagsOnTagsetResponse = await this.client.request(
        this.mutations.replaceTagsOnTagsetMutationStr,
        replaceTagsVariable
      );
      this.logger.info(`...........added the following tags: ${tagsStr}`);
    }
    return true;
  }

  convertCsvToJson(tagsCsv: string): string {
    var tagsArr = tagsCsv.split(',');
    const tagsJSON = JSON.stringify(tagsArr);
    return tagsJSON;
  }

  async addUserToGroup(userID: string, groupID: string): Promise<Boolean> {
    let success = false;
    const addUserToGroupVariable = gql`
              {
                "userID": ${userID},
                "groupID": ${groupID}
                  
              }`;
    try {
      success = await this.client.request(
        this.mutations.addUserToGroupMutationStr,
        addUserToGroupVariable
      );
      this.logger.info('added user to group');
    } catch (e) {
      this.logger.error(`Unable to add user to group ${groupID}: ${e}`);
    }
    if (!success)
      this.logger.warn(`Unable to add user (${userID} to group (${groupID}))`);
    return success;
  }

  async addUserToChallenge(
    challengeName: string,
    userID: string
  ): Promise<Boolean> {
    const challengeInfo = this.ecoverseInfo.lookupChallengeID(challengeName);
    if (!challengeInfo) return false;
    const addUserToChallengeVariable = gql`
              {
                "userID": ${userID},
                "challengeID": ${challengeInfo.challengeID}      
              }`;

    const groupResponse = await this.client.request(
      this.mutations.addUserToChallengeMutationStr,
      addUserToChallengeVariable
    );

    if (groupResponse) {
      this.logger.info(`....added user to challenge: ${challengeName}`);
    }

    return true;
  }

  async addChallengeLead(
    challengeName: string,
    organisationID: string
  ): Promise<Boolean> {
    const challengeInfo = this.ecoverseInfo.lookupChallengeID(challengeName);
    if (!challengeInfo) return false;
    const variable = gql`
              {
                "organisationID": ${organisationID},
                "challengeID": ${challengeInfo.challengeID}                     
              }`;

    const challengeResponse = await this.client.request(
      this.mutations.addChallengeLeadMutationStr,
      variable
    );

    if (challengeResponse) {
      this.logger.info(`....added lead to challenge: ${challengeName}`);
    }

    return true;
  }

  // Set the ecoverse context
  async updateEcoverseContext(variableFile: string): Promise<Boolean> {
    const updateEcoverseMutationStr = fs
      .readFileSync(this.mutations.updateEcoverseMutationFile)
      .toString();
    const variable = fs.readFileSync(variableFile).toString();

    try {
      const result = await this.client.request(
        updateEcoverseMutationStr,
        variable
      );
      if (result) {
        this.logger.info(`==> Update of ecoverse data completed successfully!`);
      }
    } catch (e) {
      this.logger.info(`Could not create ecoverse context: ${e} `);
      return false;
    }
    return true;
  }

  // Create a gouup at the ecoverse level with the given name
  async addTagToTagset(tagsetID: string, tagName: string): Promise<Boolean> {
    // create the variable for the group mutation
    const addTagToTagsetVariable = gql`
          {
             "tagsetID": ${tagsetID},
            "tag": "${tagName}"
          }`;

    await this.client.request(
      this.mutations.addTagToTagsetMutationStr,
      addTagToTagsetVariable
    );
    this.logger.info(`...........and added the "${tagName}" tag`);
    return true;
  }

  // Create a relation for the given opportunity
  async createRelation(
    opportunityID: number,
    type: string,
    description: string,
    actorRole: string,
    actorType: string,
    actorName: string
  ): Promise<any> {
    // create the variable for the group mutation
    const createRelationVariable = gql`
                  {
                    "opportunityID": ${opportunityID},
                    "relationData":
                      {
                        "type": "${type}",
                        "description": "${description}",
                        "actorName": "${actorName}",
                        "actorType": "${actorType}",
                        "actorRole": "${actorRole}"
                      }
          }`;

    const createRelationResponse = await this.client.request(
      this.mutations.createRelationMutationStr,
      createRelationVariable
    );
    this.logger.info(
      `...........and added the following relation: ${type} - ${actorName}`
    );
    return createRelationResponse;
  }

  // Create a actorgroup for the given opportunity
  async createActorGroup(
    opportunityID: number,
    actorGroupName: string,
    description: string
  ): Promise<any> {
    // create the variable for the group mutation
    const createActorGroupVariable = gql`
                  {
                    "opportunityID": ${opportunityID},
                    "actorGroupData":
                    {
                        "name": "${actorGroupName}",
                        "description": "${description}"
                    }
          }`;

    const createActorGroupResponse = await this.client.request(
      this.mutations.createActorGroupMutationStr,
      createActorGroupVariable
    );
    this.logger.info(
      `...........and added the following actor group: ${actorGroupName}`
    );
    return createActorGroupResponse;
  }

  // Create a actorgroup for the given opportunity
  async createActor(
    actorGroupID: number,
    actorName: string,
    value: string,
    impact: string,
    description = ''
  ): Promise<any> {
    // create the variable for the group mutation
    const createActorVariable = gql`
                  {
                    "actorGroupID": ${actorGroupID},
                    "actorData":
                    {
                        "name": "${actorName}",
                        "description": "${description}",
                        "value": "${value}",
                        "impact": "${impact}"
                    }
          }`;

    const createActorResponse = await this.client.request(
      this.mutations.createActorMutationStr,
      createActorVariable
    );
    this.logger.info(`...........and added the following actor : ${actorName}`);
    return createActorResponse;
  }

  // Create a actorgroup for the given opportunity
  async updateActor(
    actorID: number,
    actorName: string,
    value: string,
    impact = '',
    description = ''
  ): Promise<any> {
    // create the variable for the group mutation
    const updateActorVariable = gql`
                  {
                    "ID": ${actorID},
                    "actorData":
                    {
                        "name": "${actorName}",
                        "description": "${description}",
                        "value": "${value}",
                        "impact": "${impact}"
                    }
          }`;

    const createActorResponse = await this.client.request(
      this.mutations.updateActorMutationStr,
      updateActorVariable
    );
    this.logger.info(`...........updated the following actor : ${actorName}`);
    return createActorResponse;
  }

  // Create a aspect for the given opportunity
  async createAspect(
    opportunityID: number,
    title: string,
    framing: string,
    explanation: string
  ): Promise<any> {
    // create the variable for the group mutation
    //this.logger.error(`Framing length: ${framing.length}`);
    const createAspectVariable = gql`
                  {
                    "opportunityID": ${opportunityID},
                    "aspectData":
                    {
                      "title": "${title}",
                      "framing": "${framing}",
                      "explanation": "${explanation}"                    
                    }
          }`;

    const createAspectResponse = await this.client.request(
      this.mutations.createAspectMutationStr,
      createAspectVariable
    );
    this.logger.info(`...........and added the following aspect : ${title}`);
    return createAspectResponse;
  }

  // Create a gouup at the ecoverse level with the given name
  async createEcoverseGroup(groupName: string): Promise<any> {
    // create the variable for the group mutation
    const createGroupVariable = gql`
                  {
                    "groupName": "${groupName}"
                  }`;

    const createGroupResponse = await this.client.request(
      this.mutations.createGroupOnEcoverseMutationStr,
      createGroupVariable
    );
    this.logger.info(`...........and added the following group: ${groupName}`);
    return createGroupResponse;
  }

  // Load in mutations file
  async updateHostOrganisation(
    name: string,
    logoUri?: string
  ): Promise<Boolean> {
    try {
      const queryHostInfo = gql`
        query {
          host {
            id
            profile {
              id
            }
          }
        }
      `;
      const hostInfoResponse = await this.client.request(queryHostInfo);
      const hostID = hostInfoResponse.host.id;
      const hostProfileID = hostInfoResponse.host.profile.id;
      // Now update the name
      const variableUpdateName = gql`
          {
            "orgID": ${hostID},
            "organisationData": 
            {
              "name": "${name}"
            }
          }`;
      const result = await this.client.request(
        this.mutations.updateOrganisationMutationStr,
        variableUpdateName
      );
      if (logoUri) {
        await this.addReference(
          'logo',
          logoUri,
          'Logo for the ecoverse host',
          hostProfileID
        );
      }
      if (result) {
        this.logger.info(`==> Updated host organisation successfully!`);
      }
    } catch (e) {
      this.logger.info(`Could not create organisations: ${e} `);
      return false;
    }
    return true;
  }
}
