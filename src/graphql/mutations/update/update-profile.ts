import { gql } from '@apollo/client';

export const updateProfile = gql`
  mutation updateProfile($profileData: ProfileInput!, $ID: Float!) {
    updateProfile(profileData: $profileData, ID: $ID)
  }
`;
