import { gql } from 'graphql-tag';

import directives from './directives';
import inputs from './inputs';

export default gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  ${directives}
  ${inputs}

  type Query {
    listBookmarks: [ID!]! @authenticated
  }

  type Mutation {
    toggleBookmark(input: ToggleBookmarkInput!): Boolean @authenticated
  }
`;
