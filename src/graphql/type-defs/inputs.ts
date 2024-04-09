import { gql } from 'graphql-tag';

export default gql`
  input ToggleBookmarkInput {
    missionId: ID!
  }
`;
