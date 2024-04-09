import {
  type GraphQLFieldResolver,
  type GraphQLTypeResolver,
  type GraphQLResolveInfo,
} from 'graphql';

import { type Operation } from '@project/enums';

export namespace GraphQL {
  interface OperationFunctionArguments<
    Context extends object = object,
    Input = unknown,
    Root = unknown,
    Value = unknown,
  > {
    readonly root: Root;
    readonly input: Input;
    readonly value: Value;
    readonly context: Context;
    readonly info: GraphQLResolveInfo;
  }

  export type OperationFunction<Context extends object = object> = (
    args: OperationFunctionArguments<Context>
  ) => Promise<unknown>;

  export interface Operations<Context extends object = object> {
    readonly [Operation.QUERY]?: Record<symbol, OperationFunction<Context>>;
    readonly [Operation.MUTATION]?: Record<symbol, OperationFunction<Context>>;
    readonly [Operation.LOOKUP]?: Record<symbol, OperationFunction<Context>>;
  }

  export type OperationsConstructor = new () => Operations;

  export type Resolver =
    | GraphQLFieldResolver<unknown, unknown, unknown>
    | GraphQLTypeResolver<unknown, unknown>;

  export interface Resolvers {
    readonly Query?: Record<string, Resolver>;
    readonly Mutation?: Record<string, Resolver>;
  }
}
