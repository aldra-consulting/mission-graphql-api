import { env } from 'process';

import { createLogger, format, transports } from 'winston';

const { NODE_ENV: environment, npm_package_name: name } = env;

const { combine, errors, timestamp, json, prettyPrint } = format;
const { Console } = transports;

export default createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    errors({ stack: true }),
    environment === 'production' ? json() : prettyPrint()
  ),
  transports: [new Console({ level: 'info' })],
  defaultMeta: {
    service: name,
  },
});

export const serverTags = ['server'] as const;
export const serverConfigTags = ['server', 'config'] as const;
export const requestTags = [...serverTags, 'request'] as const;
export const repositoryTags = [...serverTags, 'repository'] as const;
export const serviceTags = [...serverTags, 'service'] as const;
export const operationTags = [...requestTags, 'operation'] as const;
export const directiveTags = [...requestTags, 'directive'] as const;
