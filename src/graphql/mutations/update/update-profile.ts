import { gql } from 'graphql-request';

export const updateProfileMutation = gql`
  mutation updateProfile($profileData: ProfileInput!, $ID: Float!) {
    updateProfile(profileData: $profileData, ID: $ID)
  }
`;
