import { mapSchema, MapperKind, getDirective } from '@graphql-tools/utils';
import { type GraphQLSchema, defaultFieldResolver } from 'graphql';
import { GraphQLError } from 'graphql';

import logger, { directiveTags } from '@project/utils/logging';

import { type Apollo } from '../../../types/apollo';

const DIRECTIVE_NAME = 'authenticated';

const directives: Record<string, unknown> = {};

export default (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const directive = getDirective(schema, type, DIRECTIVE_NAME)?.[0];

      if (directive) {
        directives[type.name] = directive;
      }

      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfiguration, _, type) => {
      const configuration = fieldConfiguration;

      const directive =
        getDirective(schema, configuration, DIRECTIVE_NAME)?.[0] ??
        directives[type];

      if (directive) {
        const { resolve = defaultFieldResolver } = configuration;

        configuration.resolve = function resolver(
          source,
          args,
          context: Apollo.Context,
          info
        ) {
          const {
            request: { id: requestId },
            user,
          } = context;

          if (!user?.id) {
            throw new GraphQLError('Unauthenticated', {
              extensions: {
                code: 'UNAUTHENTICATED',
                http: {
                  status: 401,
                },
              },
            });
          }

          logger.info('Access granted to authenticated user', {
            tags: [...directiveTags, 'auth', 'success'],
            requestId,
            userId: user.id,
          });

          return resolve(source, args, context, info);
        };
      }

      return configuration;
    },
  });
