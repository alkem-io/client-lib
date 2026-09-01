/* eslint-disable @typescript-eslint/no-explicit-any */
import { PathLike, createReadStream, existsSync } from 'fs';
import { GraphQLClient } from 'graphql-request';
import { FileUpload } from 'graphql-upload';
import semver from 'semver';
import { AlkemioClientConfig } from './config/alkemio-client-config';
import {
  CreateCalloutOnCalloutsSetInput,
  CreateSpaceOnAccountInput,
  CreateSubspaceInput,
  getSdk,
  InputMaybe,
  RoleName,
  Sdk,
  UpdateSpaceInput,
  UpdateOrganizationInput,
  CreateUserInput,
  UpdateReferenceInput,
  AuthorizationCredential,
  CreateContributionOnCalloutInput,
  CalloutContributionType,
} from './generated/graphql';
import { AuthInfo, CreateReferenceOnProfileInput } from 'src';
import { KratosPublicApiClient } from './util/kratos.public.api.client';
import { log, LOG_LEVEL } from './util/logger';
import { toGraphQLResponse } from './util/toGraphQLResponse';
import * as SchemaTypes from './types/alkemio-schema';

const fileUploadHeaders = {
  'apollo-require-preflight': 'true',
  'x-apollo-operation-name': 'true',
};

export class AlkemioClient {
  public apiToken: string;
  public config!: AlkemioClientConfig;
  public privateClient!: Sdk;

  constructor(config: AlkemioClientConfig) {
    this.apiToken = '';
    this.config = config;
    this.config.loggingEnabled = config.loggingEnabled ?? false;
    const privateClient = new GraphQLClient(
      this.config.apiEndpointPrivateGraphql
    );
    this.privateClient = getSdk(privateClient);
  }

  public async enableAuthentication() {
    if (!this.config || !this.config.authInfo)
      throw new Error(
        'Can not enable authentication. Missing authentication credentials.'
      );

    // If Kratos public api end point is not set then get it from the Alkemio server config
    if (!this.config.authInfo?.kratosPublicApiEndpoint) {
      this.logMessage(
        'Kratos end point not set in config, obtaining from server'
      );

      const serverKratosPublicEndpoint =
        await this.getKratosPublicApiEndpoint();
      this.config.authInfo.kratosPublicApiEndpoint = serverKratosPublicEndpoint;
    }

    const kratosPublicEndpoint = this.config.authInfo.kratosPublicApiEndpoint;
    this.logMessage(
      `Getting API token with config ${JSON.stringify(this.config.authInfo)}`
    );
    try {
      const apiToken = await this.getApiToken(
        this.config?.authInfo as AuthInfo
      );
      this.logMessage(`API token: ${apiToken}`);
      const client = new GraphQLClient(this.config.apiEndpointPrivateGraphql, {
        headers: {
          authorization: `Bearer ${apiToken}`,
        },
      });
      this.privateClient = getSdk(client);
    } catch (error) {
      throw new Error(
        `Unable to authenticate to Alkemio (Kratos) endpoint (${kratosPublicEndpoint}): ${error}`
      );
    }
  }

  private logMessage(msg: string) {
    if (this.config.loggingEnabled) log(msg, LOG_LEVEL.INFO);
  }

  private async getApiToken(authInfo: AuthInfo): Promise<string> {
    if (!authInfo || !authInfo.kratosPublicApiEndpoint)
      throw new Error('Kratos Public API endpoint is not defined!');

    try {
      const authClient = new KratosPublicApiClient(
        authInfo.kratosPublicApiEndpoint
      );

      this.apiToken = await authClient.authenticate(authInfo.credentials);
    } catch (error) {
      throw new Error(`API authentication error! ${error}`);
    }

    if (!this.apiToken)
      throw new Error(
        'API token could not be acquired! Check your configuration and whether the Kratos Public API endpoint is accessible!'
      );

    return this.apiToken;
  }

  public async getKratosPublicApiEndpoint(): Promise<string> {
    const configuration = await this.privateClient.configuration();
    const endpoint =
      configuration.data?.platform.configuration.authentication.providers[0]
        .config.kratosPublicBaseURL;

    return endpoint ?? 'http://localhost:3000/ory/kratos/public/';
  }

  public async featureFlags() {
    const { data } = await this.privateClient.featureFlags();

    return data?.platform.configuration.featureFlags;
  }

  public async validateConnection() {
    try {
      const serverVersion = await this.serverVersion();

      this.validateServerVersion(serverVersion);
      return serverVersion;
    } catch (error: any) {
      this.logMessage(
        `unable to validate the connection, error: ${error.toString()}`
      );
    }
    return 'server version not returned';
  }

  public validateServerVersion(serverVersion: string): boolean {
    const MIN_SERVER_VERSION = '0.14.1';
    const validVersion = semver.gte(serverVersion, MIN_SERVER_VERSION);
    if (!validVersion)
      throw new Error(
        `Detected server version (${serverVersion} not compatible with required server version: ${MIN_SERVER_VERSION})`
      );
    return true;
  }

  public async serverVersion(): Promise<string> {
    this.logMessage(
      `Obtaining server version using api endpoint: ${this.config.apiEndpointPrivateGraphql}`
    );
    const { data } = await this.privateClient.metadata();
    if (!data) {
      throw new Error(
        `Unable to query meta data from: ${this.config.apiEndpointPrivateGraphql}`
      );
    }
    const serverMetaData = data?.platform.metadata.services.find(
      service => service.name === 'alkemio-server'
    );
    if (!serverMetaData) throw new Error('Unable to locate server meta data');
    const serverVersion = serverMetaData.version;
    if (!serverVersion)
      throw new Error(
        `Unable to retrieve Alkemio server version: ${serverVersion}`
      );
    return serverVersion;
  }

  public async spaceExists(spaceID: string): Promise<boolean> {
    try {
      const result = await this.privateClient.space({
        id: spaceID,
      });
      if (result.data) return true;
    } catch (error: any) {
      this.logMessage(
        `unable to check if space exists, error: ${error.toString()}`
      );
      return false;
    }
    return true;
  }

  async spaceInfo(spaceID: string) {
    const response = await this.privateClient.space({
      id: spaceID,
    });
    return response.data?.lookup.space;
  }

  public async createSpace(spaceData: CreateSpaceOnAccountInput) {
    const result = await this.privateClient.createSpace({
      spaceData,
    });
    return result.data?.createSpace;
  }

  public async createSubspace(subspaceData: CreateSubspaceInput) {
    const { data } = await this.privateClient.createSubspace({
      subspaceData: subspaceData,
    });

    return data?.createSubspace;
  }

  public async addReference(
    profileID: string,
    referenceName: string,
    referenceURI: string,
    referenceDesc: string
  ) {
    const { data } = await this.privateClient.createReferenceOnProfile({
      referenceInput: {
        profileID: profileID,
        uri: referenceURI,
        name: referenceName,
        description: referenceDesc,
      },
    });

    return data?.createReferenceOnProfile;
  }

  public async updateUserProfile(
    userEmail: string,
    description?: string,
    avatarURI?: string,
    country?: string,
    city?: string
  ): Promise<boolean> {
    const { data } = await this.privateClient.user({
      userID: userEmail,
    });

    const profileID = data?.user.profile?.id;

    const avatarID = data?.user.profile?.visual?.id || '';

    if (profileID) {
      const profileUpdated = await this.updateProfile(
        profileID,
        description,
        country,
        city
      );
      if (avatarURI) {
        await this.updateVisual(avatarID, avatarURI);
      }
      return !!profileUpdated;
    }

    return false;
  }

  async updateProfile(
    profileID: string,
    description?: string,
    country?: string,
    city?: string
  ) {
    const { data } = await this.privateClient.updateProfile({
      profileData: {
        profileID: profileID,
        description: description,
        location: {
          country,
          city,
        },
      },
    });

    return data?.updateProfile;
  }

  async updateVisual(visualID: string, uri: string) {
    const { data } = await this.privateClient.updateVisual({
      updateData: {
        visualID: visualID,
        uri: uri,
      },
    });
    return data?.updateVisual;
  }

  async createTagsetOnProfile(
    profileID: string,
    tagsetName: string,
    tags: string[]
  ): Promise<boolean> {
    if (tags) {
      await this.privateClient.createTagsetOnProfile({
        tagsetData: {
          profileID: profileID,
          name: tagsetName,
        },
      });
    }
    return true;
  }

  async addUserToGroup(userID: string, groupID: string): Promise<boolean> {
    const uID = userID;
    const gID = groupID;

    const { data } = await this.privateClient.assignUserToGroup({
      input: {
        userID: uID,
        groupID: gID,
      },
    });

    return !!data?.assignUserToGroup;
  }

  async addUserToOrganization(
    userID: string,
    organizationRoleSetID: string
  ): Promise<boolean> {
    const { data } = await this.privateClient.assignUserToOrganization({
      roleData: {
        actorID: userID,
        roleSetID: organizationRoleSetID,
        role: SchemaTypes.RoleName.Associate,
      },
    });

    return !!data?.assignRoleToUser;
  }

  async addUserToSubspace(
    spaceID: string,
    subspaceNameID: string,
    userID: string
  ) {
    const response = await this.privateClient.subspace({
      spaceID,
      subspaceNameID,
    });
    const roleSetID =
      response.data?.lookup.space?.subspaceByNameID?.community?.roleSet?.id;

    if (!response || !roleSetID) return;

    return await this.privateClient.assignRoleToUser({
      input: {
        role: RoleName.Member,
        actorID: userID,
        roleSetID,
      },
    });
  }

  async subspaceByNameID(spaceID: string, subspaceNameID: string) {
    try {
      const response = await this.privateClient.subspace({
        spaceID,
        subspaceNameID,
      });

      if (!response) return;
      return response.data?.lookup.space?.subspaceByNameID;
    } catch (error) {
      return;
    }
  }

  async user(userID: string) {
    try {
      const response = await this.privateClient.user({
        userID: userID,
      });

      if (!response) return;
      return response.data?.user;
    } catch (error) {
      return;
    }
  }

  async addUserToSpace(spaceID: string, userID: string) {
    const spaceInfo = await this.spaceInfo(spaceID);
    const roleSetID = spaceInfo?.community?.roleSet?.id;

    if (!spaceInfo || !roleSetID) return;

    return await this.privateClient.assignRoleToUser({
      input: {
        role: RoleName.Member,
        actorID: userID,
        roleSetID,
      },
    });
  }

  async updateSpace(spaceData: UpdateSpaceInput) {
    const { data } = await this.privateClient.updateSpace({
      spaceData: spaceData,
    });

    return data?.updateSpace;
  }

  public uploadFileOnReference(path: PathLike, referenceID: string) {
    if (!existsSync(path)) {
      throw new Error(`File at '${path}' does not exist`);
    }

    return this.privateClient
      .uploadFileOnReference(
        {
          file: createReadStream(path) as unknown as FileUpload,
          uploadData: { referenceID },
        },
        fileUploadHeaders
      )
      .then(
        toGraphQLResponse<SchemaTypes.UploadFileOnReferenceMutation>,
        toGraphQLResponse<SchemaTypes.UploadFileOnReferenceMutation>
      );
  }

  public uploadFileOnLink(path: PathLike, linkID: string) {
    if (!existsSync(path)) {
      throw new Error(`File at '${path}' does not exist`);
    }

    return this.privateClient
      .uploadFileOnLink(
        {
          file: createReadStream(path) as unknown as FileUpload,
          uploadData: { linkID },
        },
        fileUploadHeaders
      )
      .then(
        toGraphQLResponse<SchemaTypes.UploadFileOnLinkMutation>,
        toGraphQLResponse<SchemaTypes.UploadFileOnLinkMutation>
      );
  }

  public uploadImageOnVisual(path: PathLike, visualID: string) {
    if (!existsSync(path)) {
      throw new Error(`Image at '${path}' does not exist`);
    }

    return this.privateClient
      .uploadImageOnVisual(
        {
          file: createReadStream(path) as unknown as FileUpload,
          uploadData: { visualID },
        },
        fileUploadHeaders
      )
      .then(
        toGraphQLResponse<SchemaTypes.UploadImageOnVisualMutation>,
        toGraphQLResponse<SchemaTypes.UploadImageOnVisualMutation>
      );
  }

  public uploadFileOnStorageBucket(path: PathLike, storageBucketID: string) {
    if (!existsSync(path)) {
      throw new Error(`File at '${path}' does not exist`);
    }

    return this.privateClient
      .uploadFileOnStorageBucket(
        {
          file: createReadStream(path) as unknown as FileUpload,
          uploadData: { storageBucketId: storageBucketID },
        },
        fileUploadHeaders
      )
      .then(
        toGraphQLResponse<SchemaTypes.UploadFileOnStorageBucketMutation>,
        toGraphQLResponse<SchemaTypes.UploadFileOnStorageBucketMutation>
      );
  }

  // Create a post for the given callout
  async createPostOnCallout(
    calloutID: string,
    displayName: string,
    nameID: string,
    description: string,
    tags?: string[]
  ) {
    const contributionData: CreateContributionOnCalloutInput = {
      calloutID,
      type: CalloutContributionType.Post,
      post: {
        nameID,
        profileData: {
          description,
          displayName,
        },
        tags: tags,
      },
    };
    const { data } = await this.privateClient.createContributionOnCallout({
      contributionData: contributionData,
    });

    return data?.createContributionOnCallout;
  }

  // Create a callout
  async createCallout(
    calloutsSetID: string,
    displayName: string,
    description: string
  ) {
    const calloutData: CreateCalloutOnCalloutsSetInput = {
      calloutsSetID,
      framing: {
        profile: { displayName, description },
      },
    };
    const { data } = await this.privateClient.createCallout({
      calloutData,
    });

    return data?.createCalloutOnCalloutsSet;
  }

  public async createOrganization(displayName: string, nameID: string) {
    const { data } = await this.privateClient.createOrganization({
      organizationData: {
        nameID: nameID,
        profileData: {
          displayName: displayName,
        },
      },
    });

    return data?.createOrganization;
  }

  public async deleteOrganization(orgID: string) {
    const { data } = await this.privateClient.deleteOrganization({
      deleteData: {
        ID: orgID,
      },
    });

    return data?.deleteOrganization;
  }

  public async deleteSpace(spaceID: string) {
    const { data } = await this.privateClient.deleteSpace({
      deleteData: {
        ID: spaceID,
      },
    });

    return data?.deleteSpace;
  }

  public async organizations() {
    const { data } = await this.privateClient.organizations();

    return data?.organizations;
  }

  public async organization(orgID: string) {
    const { data } = await this.privateClient.organization({
      id: orgID,
    });

    return data?.organization;
  }

  public async subspaces(spaceID: string) {
    const { data } = await this.privateClient.subspaces({
      spaceID: spaceID,
    });

    return data?.lookup.space?.subspaces;
  }

  public async updateOrganization(organization: UpdateOrganizationInput) {
    const { data } = await this.privateClient.updateOrganization({
      organizationData: organization,
    });

    return data?.updateOrganization;
  }

  public async createUser(user: CreateUserInput) {
    const { data } = await this.privateClient.createUser({
      userData: user,
    });

    return data?.createUser;
  }

  public async users() {
    const { data } = await this.privateClient.users();

    return data?.users;
  }

  public async usersWithAuthorizationCredential(
    credentialType: AuthorizationCredential,
    resourceID?: string,
    includeUserPreferences?: boolean
  ) {
    let queryResult;
    const payload = {
      credentialsCriteriaData: {
        type: credentialType,
        resourceID: resourceID ?? undefined,
      },
    };

    if (!includeUserPreferences) {
      queryResult = await this.privateClient.usersWithAuthorizationCredential(
        payload
      );
    } else {
      queryResult =
        await this.privateClient.usersWithAuthorizationCredentialWithPreferences(
          payload
        );
    }

    return queryResult.data?.usersWithAuthorizationCredential;
  }

  public async usersForNotification(
    credentialType: AuthorizationCredential,
    resourceID?: string,
    includePreferences?: boolean,
    includeSettings?: boolean
  ) {
    const payload = {
      credentialsCriteriaData: {
        type: credentialType,
        resourceID: resourceID ?? undefined,
      },
      includePreferences,
      includeSettings,
    };

    const response = await this.privateClient.usersForNotification(payload);
    if (!response || !response.data) {
      throw new Error('Failed to retrieve users for notification');
    }
    const {
      data: { usersWithAuthorizationCredential },
    } = response;

    return usersWithAuthorizationCredential;
  }

  public async spaces() {
    const { data } = await this.privateClient.spaces();

    return data?.spaces;
  }

  async assignOrganizationAsCommunityLead(
    roleSetID: string,
    organizationID: string
  ) {
    const { data } = await this.privateClient.assignRoleToOrganization({
      input: {
        roleSetID,
        actorID: organizationID,
        role: RoleName.Lead,
      },
    });

    return data?.assignRoleToOrganization;
  }

  async assignOrganizationAsCommunityMember(
    roleSetID: string,
    organizationID: string
  ) {
    const { data } = await this.privateClient.assignRoleToOrganization({
      input: {
        role: RoleName.Member,
        actorID: organizationID,
        roleSetID,
      },
    });

    return data?.assignRoleToOrganization;
  }

  async assignUserAsCommunityLead(roleSetID: string, userID: string) {
    const { data } = await this.privateClient.assignRoleToUser({
      input: {
        role: RoleName.Lead,
        actorID: userID,
        roleSetID,
      },
    });

    return data?.assignRoleToUser;
  }

  async assignUserAsCommunityMember(roleSetID: string, userID: string) {
    const { data } = await this.privateClient.assignRoleToUser({
      input: {
        roleSetID,
        actorID: userID,
        role: RoleName.Member,
      },
    });

    return data?.assignRoleToUser;
  }

  async addUserToCommunity(userID: string, roleSetID: string) {
    const { data } = await this.privateClient.assignRoleToUser({
      input: {
        role: RoleName.Member,
        actorID: userID,
        roleSetID,
      },
    });

    return data?.assignRoleToUser;
  }

  async updateReferencesOnSpace(
    spaceID: string,
    references: Omit<UpdateReferenceInput, 'ID'>[]
  ) {
    const spaceInfo = await this.spaceInfo(spaceID);
    const profileId = spaceInfo?.about.profile.id;
    if (!profileId) {
      throw new Error('Space context id does not exist.');
    }
    const existingReferences = spaceInfo?.about.profile?.references || [];
    const newReferences = references.filter(r =>
      existingReferences.every(
        (x: { name: InputMaybe<string> }) => x.name !== r.name
      )
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
      await this.updateSpace({
        ID: spaceID,
        about: {
          profile: {
            references: updateRefsInput,
          },
        },
      });
    }

    for (const newRef of newReferences) {
      const input: CreateReferenceOnProfileInput = {
        profileID: profileId,
        name: newRef.name || '',
        description: newRef.description,
        uri: newRef.uri,
      };
      this.privateClient.createReferenceOnProfile({
        referenceInput: input,
      });
    }
  }

  async document(documentID: string) {
    const response = await this.privateClient.document({
      id: documentID,
    });
    return response.data?.lookup.document;
  }
}
