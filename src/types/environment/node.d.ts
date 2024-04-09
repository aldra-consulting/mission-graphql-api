declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    HOST: string;
    PORT: string;
    OIDC_ISSUER: string;
    OIDC_AUDIENCE: string;
    INTROSPECTION: string;
    PLAYGROUND: string;
    SANITY_TOKEN: string;
    SANITY_PROJECT_ID: string;
    SANITY_DATASET: string;
    SANITY_API_VERSION: string;
  }
}
