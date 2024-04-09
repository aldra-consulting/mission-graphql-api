import { type GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper';
import { type GraphQLFieldResolver, type GraphQLTypeResolver } from 'graphql';

import { type GraphQL } from '../../types/graphql';

const isFieldResolver = (
  args: unknown[]
): args is Parameters<GraphQLFieldResolver<unknown, object, unknown>> =>
  args.length === 4;

const isTypeResolver = (
  args: unknown[]
): args is Parameters<GraphQLTypeResolver<unknown, object>> =>
  args.length === 3;

export const createResolver =
  (operation: GraphQL.OperationFunction): GraphQL.Resolver =>
  (...args: unknown[]) => {
    if (isFieldResolver(args)) {
      const [root, input, context, info] = args;

      return operation.call(null, { root, input, value: {}, context, info });
    }

    if (isTypeResolver(args)) {
      const [value, context, info] = args;

      return operation.call(null, {
        root: {},
        input: {},
        value,
        context,
        info,
      });
    }

    throw new Error('Unknown resolver type');
  };

export const createResolvers = (
  operations: Record<string, GraphQL.OperationFunction>
): GraphQL.Resolvers =>
  Object.entries(operations).reduce(
    (previous, [field, operation]) => ({
      ...previous,
      [field]: createResolver(operation),
    }),
    {}
  );

export const createRootResolver = (
  constructors: GraphQL.OperationsConstructor[]
): GraphQLResolverMap & GraphQL.Resolvers =>
  constructors
    .map((Constructor) => new Constructor())
    .reduce(
      (previous, { query = {}, mutation = {} }) => ({
        ...previous,
        Query: { ...previous.Query, ...createResolvers(query) },
        Mutation: { ...previous.Mutation, ...createResolvers(mutation) },
      }),
      {
        Query: {},
        Mutation: {},
      }
    );
