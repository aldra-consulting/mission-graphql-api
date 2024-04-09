import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import env from '@project/env';
import { type Apollo } from '@project/types';
import logger, { serverTags } from '@project/utils/logging';

import context from './graphql/context';
import plugins from './graphql/plugins';
import schema from './graphql/schema';

const {
  ENVIRONMENT: environment,
  HOST: host,
  PORT: port,
  INTROSPECTION: introspection,
} = env();

startStandaloneServer(
  new ApolloServer<Apollo.Context>({
    schema,
    logger,
    plugins,
    introspection,
  }),
  {
    context,
    listen: { host, port },
  }
)
  .then(({ url }) => {
    logger.info(`Application is running at ${url} in ${environment} mode`, {
      tags: [...serverTags, 'start'],
    });
  })
  .catch((error: unknown) => {
    logger.error(`Application failed to start in ${environment} mode`, {
      tags: [...serverTags, 'start'],
      error,
    });
  });
