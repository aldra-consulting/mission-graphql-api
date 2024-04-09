import { type ApolloServerPlugin } from '@apollo/server';

import { type Apollo } from '@project/types';
import logger, { requestTags } from '@project/utils/logging';

export default {
  requestDidStart: async ({
    queryHash,
    operationName: operation,
    contextValue: {
      request: { id: requestId },
    },
  }) =>
    Promise.resolve({
      didEncounterErrors: async ({ errors }) =>
        new Promise((resolve) => {
          errors.forEach((error) =>
            logger.error(error.message, {
              tags: [...requestTags, 'error'],
              requestId,
              operation,
              queryHash,
              error,
            })
          );

          resolve();
        }),
    }),
} satisfies ApolloServerPlugin<Apollo.Context>;
