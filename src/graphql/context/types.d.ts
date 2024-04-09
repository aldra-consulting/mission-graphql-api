import { type ContextFunction } from '@apollo/server';
import { type StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';

import { type Apollo } from '@project/types';

export type ApolloContextFunction = ContextFunction<
  [StandaloneServerContextFunctionArgument],
  Apollo.Context
>;
