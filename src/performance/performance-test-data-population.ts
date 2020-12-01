/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'supertest';

const baseUrlDev = 'https://dev.cherrytwist.org/graphql';
const baseUrlTest = 'https://test.cherrytwist.org/graphql';
const baseUrlLocalhost = 'http://localhost:4000/graphql';

//,
const authorizationToken = 'Bearer {token}';

let userName = '';
let challengeName = '';
let groupName = '';
let opportunityTextId = '';
let userPhone = '';
let userEmail = '';

// Specify the number of Users to be created
const numberOfUsers = 2;

// Specify the number of Challenges to be created
const numberOfChallenges = 1;

// Specify the number of Groups to be created on Ecoverse
const numberOfGroupsOnEcoverse = 1;

// Specify the Ecoverse Group Id to which you want to add Users
const ecoverseGroupId = 2;

// Specify the Challenge Id to which you want to add Users
const challangeId = 1;

// Specify the range of Users from - to which to be added on a Challenge or a Group
// Utilized in functions: 'addUsersToEcoverseGroups()' and 'addUsersToChallengePopulation()'
const fromUserId = 1;
const toUserId = 2;

const uniqueId = (Date.now() + Math.random()).toString();
const uniqueTextId = Math.random().toString(36).slice(-6);

const ID = function () {
  return '_' + Math.random().toString(36);
};

opportunityTextId = 'opportunityTextId ' + uniqueId;
userName = 'testUser ' + uniqueId;
userPhone = 'userPhone ' + uniqueId;
userEmail = uniqueId + '@test.com';
groupName = 'testGroup' + uniqueId;

// Request definition
export const graphqlRequest = async (requestParams: any) => {
  return request(baseUrlLocalhost)
    .post('/')
    .send({ ...requestParams })
    .set({
      Accept: 'application/json',
      //,Authorization: authorizationToken,
    });
};

// Mutation requests

export const createUserMutation = async (userName: string) => {
  const requestParams = {
    operationName: 'CreateUser',
    query:
      'mutation CreateUser($userData: UserInput!) {createUser(userData: $userData) { id name }}',
    variables: {
      userData: {
        firstName: 'firstName' + uniqueId,
        lastName: 'lastName' + uniqueId,
        name: userName,
        email: `${userName}@test.com`,
        aadPassword: 'sjksdfh',
      },
    },
  };

  return await graphqlRequest(requestParams);
};

export const createChallangeMutation = async (challengeName: string) => {
  const requestParams = {
    operationName: null,
    query: `mutation CreateChallenge($challengeData: ChallengeInput!) {
            createChallenge(challengeData: $challengeData) {
              name
              id
              groups {
                id
                name
              }
            }
          }`,
    variables: {
      challengeData: {
        name: challengeName,
        textID: uniqueTextId,
        context: {
          tagline: 'test tagline' + uniqueId,
          background: 'test background' + uniqueId,
          vision: 'test vision' + uniqueId,
          impact: 'test impact' + uniqueId,
          who: 'test who' + uniqueId,

          references: [
            {
              name: 'test video' + uniqueId,
              uri: 'https://youtu.be/-wGlzcjs9CI',
              description: 'dest description' + uniqueId,
            },
          ],
        },
      },
    },
  };

  return await graphqlRequest(requestParams);
};

export const createGroupOnEcoverseMutation = async (testGroup: string) => {
  const requestParams = {
    operationName: 'CreateGroupOnEcoverse',
    query: `mutation CreateGroupOnEcoverse($groupName: String!) {
          createGroupOnEcoverse(groupName: $groupName) {
            name,
            id,
          }
        }`,
    variables: {
      groupName: testGroup,
    },
  };

  return await graphqlRequest(requestParams);
};

export const createGroupOnChallengeMutation = async (
  testGroup: string,
  challengeId: any
) => {
  const requestParams = {
    operationName: null,
    query: `mutation createGroupOnChallenge($groupName: String!, $challengeID: Float!) {
        createGroupOnChallenge(groupName: $groupName, challengeID: $challengeID) {
          name,
          id
        }
      }`,
    variables: {
      challengeID: parseFloat(challengeId),
      groupName: testGroup,
    },
  };

  return await graphqlRequest(requestParams);
};

export const addUserToGroupMutation = async (userId: any, groupId: any) => {
  const requestParams = {
    operationName: null,
    query: `mutation addUserToGroup($userID: Float!, $groupID: Float!) {
        addUserToGroup(groupID: $groupID, userID: $userID)
      }`,
    variables: {
      userID: parseFloat(userId),
      groupID: parseFloat(groupId),
    },
  };

  return await graphqlRequest(requestParams);
};

export const addUserToChallenge = async (userId: any, challengeId: any) => {
  const requestParams = {
    operationName: null,
    query: `mutation addUserToChallenge($userID: Float!, $challengeID: Float!) {
        addUserToChallenge(challengeID: $challengeID, userID: $userID) {
          name
          id
        }
      }`,
    variables: {
      userID: parseFloat(userId),
      challengeID: parseFloat(challengeId),
    },
  };

  return await graphqlRequest(requestParams);
};

// ***Data Generation***

// This function creates Users Without adding them anywhere
const createUsers = async () => {
  for (let i = 1; i <= numberOfUsers; i++) {
    userName = 'testUser ' + ID().toString();

    const response = await createUserMutation(userName);
    console.log(
      `User with name: '${response.body.data.createUser.name}' and id: '${response.body.data.createUser.id}', is created`
    );
  }
};

// This function creates Users and is utilized by 'createPerformanceTestData()' only
const createUsersInGroupInChallenge = async () => {
  let userIds = '';
  userName = 'testUser ' + ID().toString();

  const response = await createUserMutation(userName);
  userIds = response.body.data.createUser.id;
  console.log(
    `User with name: '${response.body.data.createUser.name}' and id: '${response.body.data.createUser.id}', is created`
  );
  return parseFloat(userIds);
};

// This function creates Challenges, where 'numberOfChallenges' is parameter defined by the user
const createChallenges = async () => {
  let challengeId = '';
  for (let i = 1; i <= numberOfChallenges; i++) {
    challengeName = 'challengeName ' + ID().toString();

    const response = await createChallangeMutation(challengeName);
    challengeId = response.body.data.createChallenge.id;
    console.log(
      `Challenge with name: '${response.body.data.createChallenge.name}' and id: '${response.body.data.createChallenge.id}', is created`
    );
  }
  return parseFloat(challengeId);
};

// This function creates Challanges, Groups onChallenges, Users and add the Users to the GroupsNnChallenges
const createPerformanceTestData = async () => {
  // Create Challanges
  for (let i = 1; i <= numberOfChallenges; i++) {
    const responseChallengeId = await createChallenges();
    // console.log(`Challenge with Id: ${responseChallengeId} is created`);

    // Create Groups on Challenges
    if (
      responseChallengeId.toString() !== 'undefined' ||
      responseChallengeId.toString() !== null
    ) {
      const responseGroupOnChallenge = await createGroupOnChallengeMutation(
        groupName,
        responseChallengeId
      );
      console.log(
        `Group with name: '${responseGroupOnChallenge.body.data.createGroupOnChallenge.name}' and id: '${responseGroupOnChallenge.body.data.createGroupOnChallenge.id}', is created on Challenge`
      );
      const responseGroupOnChallengeID =
        responseGroupOnChallenge.body.data.createGroupOnChallenge.id;

      // Create Users
      if (responseGroupOnChallenge.status.toString() == '200') {
        for (let i = 1; i <= numberOfUsers; i++) {
          const responseCreateUserId = await createUsersInGroupInChallenge();

          // Add Users to the Challenge Group
          const responseAddUsertoGroup = await addUserToGroupMutation(
            responseCreateUserId,
            responseGroupOnChallengeID
          );
          const addUserToGroupStatus =
            responseAddUsertoGroup.body.data.addUserToGroup;
          console.log(`User is added to group: '${addUserToGroupStatus}'`);
        }
      }
    }
  }
};

// This function creates Ecoverse Groups
const createGroupSOnEcoverse = async () => {
  for (let i = 1; i <= numberOfGroupsOnEcoverse; i++) {
    groupName = 'groupName ' + ID().toString();
    const response = await createGroupOnEcoverseMutation(groupName);
    console.log(
      `Ecoverse Group with name: ${response.body.data.createGroupOnEcoverse.name} and id: ${response.body.data.createGroupOnEcoverse.id} is created`
    );
  }
};

// This function adds the Users to a EcoverseGroup with known groupId
const addUsersToEcoverseGroups = async () => {
  for (let i = fromUserId; i <= toUserId; i++) {
    const response = await addUserToGroupMutation([i], ecoverseGroupId);
    const responseUserAddedToGroup = response.body.data.addUserToGroup;
    console.log(
      `User with id: '${[i]}' is added to Group: '${responseUserAddedToGroup}'`
    );
  }
};

// This function adds the Users to a Challenge with known challengeId
const addUsersToChallengePopulation = async () => {
  for (let i = fromUserId; i <= toUserId; i++) {
    const responseAddUserToChallenge = await addUserToChallenge(
      [i],
      challangeId
    );
    const responseAddUserToChallengeName =
      responseAddUserToChallenge.body.data.addUserToChallenge.name;
    console.log(
      `User with id: '${[
        i,
      ]}' is added to Challange called: '${responseAddUserToChallengeName}'`
    );
  }
};

//createUsers();
//createChallenges();
//createGroupSOnEcoverse();
//addUsersToEcoverseGroups();
//addUsersToChallengePopulation();
createPerformanceTestData();
