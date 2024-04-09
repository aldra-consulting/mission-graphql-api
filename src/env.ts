import { env } from 'process';

import { type Environment } from '@project/types';
import { validate } from '@project/utils/environment';

const {
  NODE_ENV: ENVIRONMENT,
  HOST = '0.0.0.0',
  PORT = 8006,
  OIDC_ISSUER = 'http://localhost:8001',
  OIDC_AUDIENCE = 'aldra.development',
  INTROSPECTION = true,
  PLAYGROUND = true,
  SANITY_TOKEN = '',
  SANITY_PROJECT_ID = '',
  SANITY_DATASET = 'production',
  SANITY_API_VERSION = '2024-03-09',
} = env;

export default () =>
  validate<Environment>(
    {
      ENVIRONMENT,
      HOST,
      PORT: Number(PORT),
      OIDC_ISSUER,
      OIDC_AUDIENCE,
      INTROSPECTION: Boolean(INTROSPECTION),
      PLAYGROUND: Boolean(PLAYGROUND),
      SANITY_TOKEN,
      SANITY_PROJECT_ID,
      SANITY_DATASET,
      SANITY_API_VERSION,
    },
    [
      'ENVIRONMENT',
      'HOST',
      'PORT',
      'OIDC_AUDIENCE',
      'OIDC_ISSUER',
      'INTROSPECTION',
      'PLAYGROUND',
      'SANITY_TOKEN',
      'SANITY_PROJECT_ID',
      'SANITY_DATASET',
      'SANITY_API_VERSION',
    ]
  );
