import { gql } from '@apollo/client';
import { CherrytwistClient } from 'src/CherrytwistClient';

export class EcoverseInfo {
  // Array of challenges info objects
  // challengesInfoArray: ChallengeInfo[];

  // // Array of challenges info objects
  // groupsIdsMap;

  // constructor() {
  //   this.challengesInfoArray = [];
  //   this.groupsIdsMap = new Map();
  // }

  // //
  // async initialise(ctClient: CherrytwistClient): Promise<boolean> {
  //   // Get the challengesInfo and store into a dictionary
  //   this.challengesInfoArray = await this.getChallengesInfo(ctClient);
  //   this.groupsIdsMap = await this.getGroupsInfo(ctClient);
  //   return true;
  // }

  // lookupChallengeID(challengeName: string): ChallengeInfo | undefined {
  //   const challengeNameLC = challengeName.toLowerCase();

  //   const challengeInfo = this.challengesInfoArray.find(
  //     challenge => challenge.name.toLowerCase() === challengeName.toLowerCase()
  //   );
  //   if (!challengeInfo) {
  //     // No match found
  //     throw new Error(
  //       `Not able to identify specified challenge: ${challengeName}`
  //     );
  //   }
  //   return challengeInfo;
  // }

  // async getChallengesInfo(
  //   ctClient: CherrytwistClient
  // ): Promise<ChallengeInfo[]> {
  //   ////////////////////////////////////////////////////////
  //   //
  //   const challengesInfoArray: ChallengeInfo[] = [];
  //   const challengesQuery = gql`
  //     {
  //       name
  //       challenges {
  //         id
  //         name
  //         groups {
  //           id
  //           name
  //         }
  //       }
  //     }
  //   `;

  //   ctClient.logger.info(
  //     `Loading challenges from server: ${ctClient.config.server}`
  //   );
  //   const ecoverseIdentifiersData = await ctClient.client.request(
  //     challengesQuery
  //   );
  //   var ecoverseName = ecoverseIdentifiersData.name;
  //   if (!ecoverseName) {
  //     ctClient.logger.error(`Unable to execute challenges query`);
  //     throw new Error('Unable to execute challenges query');
  //   }
  //   try {
  //     const challengesCount = ecoverseIdentifiersData.challenges.length;
  //     ctClient.logger.info(`...loaded challenges ok: ${challengesCount}`);
  //     for (var i = 0; i < challengesCount; i++) {
  //       const challenge = ecoverseIdentifiersData.challenges[i];
  //       const challengeName: string = challenge.name;
  //       const challengeInfo = new ChallengeInfo(challengeName);
  //       challengeInfo.challengeID = challenge.id;

  //       // Save the members group ID
  //       var challengeGroups = challenge.groups;
  //       for (var j = 0; j < challengeGroups.length; j++) {
  //         const group = challengeGroups[j];
  //         if (group.name === 'members') {
  //           const groupID = group.id;
  //           //this.logger.info(`...located members group id: ${groupID} `);
  //           challengeInfo.membersGroupID = groupID;
  //         }
  //       }
  //       challengesInfoArray.push(challengeInfo);

  //       ctClient.logger.info(
  //         `...challenge name: ${challengeName} ==> ${challengeInfo.ecoverseID} `
  //       );
  //     }
  //   } catch (e) {
  //     ctClient.logger.error(
  //       `Could not convert information from challenges query: ${e} `
  //     );
  //     throw new Error('Unable to parse challenges');
  //   }
  //   ctClient.logger.info(
  //     `==================== end ChallengesInfo ====================== `
  //   );
  //   ctClient.logger.info(` `);
  //   return challengesInfoArray;
  // }

  // async getGroupsInfo(ctClient: CherrytwistClient): Promise<Map<any, any>> {
  //   ////////////////////////////////////////////////////////
  //   //

  //   const groupsMap = new Map();
  //   const groupsQuery = gql`
  //     {
  //       name
  //       groups {
  //         id
  //         name
  //       }
  //       groupsWithTag(tag: "Team") {
  //         id
  //         name
  //       }
  //     }
  //   `;

  //   ctClient.logger.info(
  //     `Loading groups from server: ${ctClient.config.server}`
  //   );
  //   const groupsData = await ctClient.client.request(groupsQuery);
  //   var ecoverseName = groupsData.name;
  //   if (!ecoverseName) {
  //     ctClient.logger.error(`Unable to execute groups query`);
  //     throw new Error('Unable to execute groups query');
  //   }
  //   try {
  //     const groupsCount = groupsData.groups.length;
  //     ctClient.logger.info(`...loaded groups ok: ${groupsCount}`);
  //     for (var i = 0; i < groupsCount; i++) {
  //       const groupData = groupsData.groups[i];
  //       groupsMap.set(groupData.name, groupData.id);
  //       const groupName: string = groupData.name;

  //       ctClient.logger.info(
  //         `...group name: ${groupData.name} ==> ${groupData.id} `
  //       );
  //     }
  //     const teamsCount = groupsData.groupsWithTag.length;
  //     ctClient.logger.info(`...number of teams: ${teamsCount}`);
  //   } catch (e) {
  //     ctClient.logger.error(
  //       `Could not convert information from groups query: ${e} `
  //     );
  //     throw new Error('Unable to parse groups');
  //   }
  //   ctClient.logger.info(
  //     `==================== end GroupsInfo ====================== `
  //   );
  //   ctClient.logger.info(` `);
  //   return groupsMap;
  // }
}

export class ChallengeInfo {
  ecoverseID: string = '';
  challengeID = '';
  name: string = '';
  membersGroupID = '';

  constructor(challengeName: string) {
    this.name = challengeName;
  }
}
