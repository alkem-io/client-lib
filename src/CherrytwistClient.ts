import fs from 'fs';
import { request, GraphQLClient, gql } from 'graphql-request';
import { exit } from 'process';
var jp = require('jsonpath');

export class CherrytwistClient {
  public url: string = "";

  private client: GraphQLClient;

  constructor(url: string) {
    this.url = url;
    this.client = new GraphQLClient(url);
  }

  /* Check that a connection can be made to the specified Ecoverse instance */
  public async testConnection(): Promise<Boolean> {
    const query = gql`
    {
        name
    }
  `
    const data = await this.client.request(query);
    var ecoverseName = data.name;
    if (!ecoverseName) {
      console.log(`Unable to connect to ecoverse at location: ${this.url}`);
      return false;
    }
    console.log(`Connected to ecoverse: ${ecoverseName}`);
    return true;
  }

  /* Creates a series of mutation requests to the server using the base mutation and 
   * variables stored in a directory that are to be submitted using the mtuation */
  public async submitSingleMutations (mutationQueryFile: string, variablesDir: string, type: string): Promise<Boolean> {
    console.log(`Loading ${type}s using: ${mutationQueryFile}`);
    const mutation = fs.readFileSync(mutationQueryFile).toString();
    const variables: string[] = fs.readdirSync(variablesDir);
    let i = 0;
    let count = 0;
    for (let variable of variables) {
      i++;
      console.log(`........${type}(${i}) submitted from: ${variable}`);
      const variableStr = fs.readFileSync(`${variablesDir}/${variable}`).toString();

      // Check that it can be converted into JSON ok before submitting
      try {
        const variableJSON = JSON.parse(variableStr);
      } catch (e) {
        console.log(`Could not convert to JSON - skipping ${variable}: ${e}`);
        continue;
      }

      // Upload the data
      try {
        const newData = await this.client.request(mutation, variableStr);
        const newID = jp.query(newData, '$.*.id')
        const newName = jp.query(newData, '$.*.name')
        console.log(`......................accepted: ${newName}, with id: ${newID}`);
        count++;
      } catch (e) {
        console.log(`Submission to the server from ${variable} rejected: ${e}`);
        continue;
      }


    }

    // Completed successfully
    console.log(`Loading of ${count} ${type}(s) completed (out of ${i})`);
    return true;
  }

  /* Submits mutations as described by the provided JSON file. */
   public async submitMultipleMutations (mutationsJsonFile: string): Promise<Boolean> {

    let multipleMutationsJSON;
    try {
      console.log(`Loading mutations from file: ${mutationsJsonFile}`);
      const mutationsFileStr = fs.readFileSync(mutationsJsonFile).toString();
      multipleMutationsJSON = JSON.parse(mutationsFileStr);
    } catch (e) {
      console.log(`Could not convert to JSON: ${mutationsJsonFile}: ${e}`);
      return false;
    }

    interface mutationDef {
      type: string,
      mutationFile: string,
      variablesDir: string
    }
    
    const mutations: mutationDef[] = multipleMutationsJSON.mutations;
    console.log(`Identified ${mutations.length} mutations to submit`);
    for (const mutation of mutations) {
      const result = await this.submitSingleMutations(mutation.mutationFile, mutation.variablesDir, mutation.type);
    }

    return true;
   }

}
