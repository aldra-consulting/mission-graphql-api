import http from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';

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

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<Apollo.Context>({
  schema,
  logger,
  plugins: [...plugins, ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection,
});

try {
  await server.start();

  app.use('/health', cors(), (_, res) => res.json({ status: 'UP' }));

  app.use('/', cors(), express.json(), expressMiddleware(server, { context }));

  await new Promise<void>((resolve) => {
    httpServer.listen({ host, port }, resolve);
  });

  logger.info(
    `Application is running at http://${host}:${port} in ${environment} mode`,
    {
      tags: [...serverTags, 'start'],
    }
  );
} catch (error: unknown) {
  logger.error(`Application failed to start in ${environment} mode`, {
    tags: [...serverTags, 'start'],
    error,
  });
}
