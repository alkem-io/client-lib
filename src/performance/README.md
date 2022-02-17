**Performance test data population**

The functions defined in `performance-test-data-population.ts` allows you to auto generate test data to the needed environment.

- Use the different functions, they should be commented out or not (on the bottom of the page).
  ```
  //createUsers();
  //createChallenges();
  //createGroupSOnHub();
  //addUsersToHubGroups();
  //addUsersToChallengePopulation();
  createPerformanceTestData();
  ```
- Populate data to 'Dev' or 'Test' environments: specify the `authorization token` (could be taken from the web application api calls response from the browser)

- Following entities could be populated:
  - `createUsers();` - adds `n` number of **Users** specified in parameter:
    - `let numberOfUsers = 2;`
  - `createChallenges();` - adds `n` number of **Challenges** specified in parameter:
    - `let numberOfChallenges = 1;`
  - `createGroupSOnHub();` - creates `n` number of **Group on Hub** level
  - `addUsersToHubGroups();` - adds `n` number of already created **Users** on specific **HubGroup** with the following parameters for groupId and userIds:
    - `let hubGroupId = 2;`
    - `let fromUserId = 1;`
    - `let toUserId = 2;`
  - `addUsersToChallengePopulation();` - adds `n` number of already created **Users** on specific **Challenege** with the following parameters for challengeId and userIds:
    - `let challangeId = 1;`
    - `let fromUserId = 1;`
    - `let toUserId = 2;`
  - `createPerformanceTestData();` - creates `n` number of **Challenges**, **1 GroupOnEachChallenge**, `n` number of **CreateUsers** and **AddUsersToGroupsOnChallenges**, specified in parameters:
    - `let numberOfChallenges = 1;`
    - `let numberOfUsers = 2;`

- Command to run the functions: `npx ts-node src/performance/performance-test-data-population.ts`
