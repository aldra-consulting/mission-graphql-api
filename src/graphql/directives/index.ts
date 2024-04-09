import { type GraphQLSchema } from 'graphql';

import auth from './auth';

export const applyDirectives = (schema: GraphQLSchema): GraphQLSchema =>
  auth(schema);
