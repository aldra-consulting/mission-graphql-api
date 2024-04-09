import { type ApolloServerPlugin } from '@apollo/server';

import env from '@project/env';
import { type Apollo } from '@project/types';
import logger, { serverConfigTags } from '@project/utils/logging';

export default {
  serverWillStart: async () =>
    new Promise((resolve) => {
      const {
        ENVIRONMENT: environment,
        INTROSPECTION: introspection,
        PLAYGROUND: playground,
      } = env();

      logger.info(
        `Introspection query is ${
          introspection ? 'enabled' : 'disabled'
        } in ${environment} mode`,
        {
          tags: [...serverConfigTags, 'introspection'],
        }
      );

      logger.info(
        `GraphQL Playground is ${
          playground ? 'enabled' : 'disabled'
        } in ${environment} mode`,
        {
          tags: [...serverConfigTags, 'playground'],
        }
      );

      resolve();
    }),
} satisfies ApolloServerPlugin<Apollo.Context>;
