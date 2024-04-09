import { gql } from 'graphql-tag';

export default gql`
  directive @authenticated repeatable on OBJECT | FIELD_DEFINITION
`;
