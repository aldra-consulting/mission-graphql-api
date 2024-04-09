import { type ApolloServerPlugin } from '@apollo/server';

import { type Apollo } from '@project/types';

import ErrorHandler from './error-handler';
import RequestLogger from './request-logger';
import ServerConfiguration from './server-configuration';

export default [
  RequestLogger,
  ErrorHandler,
  ServerConfiguration,
] satisfies ApolloServerPlugin<Apollo.Context>[];
