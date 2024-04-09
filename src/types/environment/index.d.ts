export interface Environment {
  ENVIRONMENT: 'development' | 'production';
  HOST: string;
  PORT: number;
  OIDC_ISSUER: string;
  OIDC_AUDIENCE: string;
  INTROSPECTION: boolean;
  PLAYGROUND: boolean;
  SANITY_TOKEN: string;
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  SANITY_API_VERSION: string;
}
