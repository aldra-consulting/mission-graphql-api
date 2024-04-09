import { type ApolloServerPlugin } from '@apollo/server';

import { type Apollo } from '@project/types';
import logger, { requestTags } from '@project/utils/logging';

export default {
  requestDidStart: async ({
    queryHash,
    contextValue: {
      request: { id: requestId },
    },
  }) => {
    logger.debug('Request start', {
      tags: [...requestTags, 'start'],
      requestId,
      queryHash,
    });

    return Promise.resolve({
      willSendResponse: async ({ response: { http }, errors }) =>
        new Promise((resolve) => {
          http.headers.set('request-id', requestId);

          logger.debug('Request end', {
            tags: [...requestTags, 'end'],
            requestId,
            queryHash,
            errors: Boolean(errors),
          });

          resolve();
        }),
    });
  },
} satisfies ApolloServerPlugin<Apollo.Context>;
