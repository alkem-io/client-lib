import fs from "fs";

export class Mutations {
  // Add mutations
  addUserToGroupMutationFile = "./src/mutations/add/add-user-to-group";
  addUserToChallengeMutationFile = "./src/mutations/add/add-user-to-challenge";
  addTagToTagsetFile = "./src/mutations/add/add-tag-to-tagset";
  addChallengeLeadFile = "./src/mutations/add/add-challenge-lead";
  
  // Create mutations
  createGroupOnEcoverseMutationFile = "./src/mutations/create/create-group-on-ecoverse";
  createChallengeMutationFile = "./src/mutations/create/create-challenge";
  createRelationMutationFile = "./src/mutations/create/create-relation";
  createOrganisationMutationFile = "./src/mutations/create/create-organisation";
  createTagsetOnProfileFile = "./src/mutations/create/create-tagset-on-profile";
  createReferenceOnProfileFile = "./src/mutations/create/create-reference-on-profile";
  createUserMutationFile = "./src/mutations/create/create-user";
  createOpportunityMutationFile = "./src/mutations/create/create-opportunity";
  createActorGroupMutationFile = "./src/mutations/create/create-actor-group";
  createActorMutationFile = "./src/mutations/create/create-actor";
  createAspectMutationFile = "./src/mutations/create/create-aspect";
  
  // Update mutations
  updateActorMutationFile = "./src/mutations/update/update-actor";
  replaceTagsOnTagsetFile = "./src/mutations/update/replace-tags-on-tagset";
  updateEcoverseMutationFile = "./src/mutations/update/update-ecoverse";
  updateOrganisationMutationFile = "./src/mutations/update/update-organisation";
  updateProfileFile = "./src/mutations/update/update-profile";

  // Queries
  userQueryFile = "./src/mutations/queries/user";
  
  // Load in + store some of the mutations / queries
  createChallengeMutationStr: string;
  createUserMutationStr: string;
  createGroupOnEcoverseMutationStr: string;
  addUserToGroupMutationStr: string;
  addTagToTagsetMutationStr: string;
  addUserToChallengeMutationStr: string;
  addChallengeLeadMutationStr: string;
  createTagsetOnProfileMutationStr: string;
  createReferenceOnProfileMutationStr: string;
  createOpportunityMutationStr: string;
  createActorGroupMutationStr: string;
  createActorMutationStr: string;
  updateActorMutationStr: string;
  createAspectMutationStr: string;
  createOrganisationMutationStr: string;
  updateOrganisationMutationStr: string;
  createRelationMutationStr: string;
  replaceTagsOnTagsetMutationStr: string;
  userQueryStr: string;
  updateProfileStr: string;

  // Create the ecoverse with enough defaults set/ members populated
  constructor() {
    this.createUserMutationStr = fs
      .readFileSync(this.createUserMutationFile)
      .toString();

    this.createGroupOnEcoverseMutationStr = fs
      .readFileSync(this.createGroupOnEcoverseMutationFile)
      .toString();

    this.addUserToGroupMutationStr = fs
      .readFileSync(this.addUserToGroupMutationFile)
      .toString();

    this.addUserToChallengeMutationStr = fs
      .readFileSync(this.addUserToChallengeMutationFile)
      .toString();

    this.createTagsetOnProfileMutationStr = fs
      .readFileSync(this.createTagsetOnProfileFile)
      .toString();

    this.createReferenceOnProfileMutationStr = fs
      .readFileSync(this.createReferenceOnProfileFile)
      .toString();

    this.replaceTagsOnTagsetMutationStr = fs
      .readFileSync(this.replaceTagsOnTagsetFile)
      .toString();

    this.addTagToTagsetMutationStr = fs
      .readFileSync(this.addTagToTagsetFile)
      .toString();

    this.userQueryStr = fs.readFileSync(this.userQueryFile).toString();

    this.updateProfileStr = fs.readFileSync(this.updateProfileFile).toString();

    this.createChallengeMutationStr = fs
      .readFileSync(this.createChallengeMutationFile)
      .toString();

    this.createOpportunityMutationStr = fs
      .readFileSync(this.createOpportunityMutationFile)
      .toString();

    this.createActorGroupMutationStr = fs
      .readFileSync(this.createActorGroupMutationFile)
      .toString();

    this.createActorMutationStr = fs
      .readFileSync(this.createActorMutationFile)
      .toString();

    this.updateActorMutationStr = fs
      .readFileSync(this.updateActorMutationFile)
      .toString();

    this.createAspectMutationStr = fs
      .readFileSync(this.createAspectMutationFile)
      .toString();

    this.createOrganisationMutationStr = fs
      .readFileSync(this.createOrganisationMutationFile)
      .toString();

    this.updateOrganisationMutationStr = fs
      .readFileSync(this.updateOrganisationMutationFile)
      .toString();

    this.addChallengeLeadMutationStr = fs
      .readFileSync(this.addChallengeLeadFile)
      .toString();

    this.createRelationMutationStr = fs
      .readFileSync(this.createRelationMutationFile)
      .toString();
  }
}
