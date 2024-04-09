import { type IncomingHttpHeaders } from 'http';

import { createClient } from '@sanity/client';
import { Issuer } from 'openid-client';
import { v4 as uuid } from 'uuid';

import env from '@project/env';
import { isDefined } from '@project/utils/common';

import { type Apollo } from '../../types/apollo';
import { type Nullable } from '../../types/common';
import { type Identifier } from '../../types/identifier';

const extractRequestId = ({
  'request-id': header,
}: IncomingHttpHeaders): Identifier.Request => {
  if (Array.isArray(header)) {
    return (header.shift()?.trim() ?? uuid()) as Identifier.Request;
  }

  if (typeof header === 'string') {
    return (header.trim() || uuid()) as Identifier.Request;
  }

  return uuid() as Identifier.Request;
};

export const createRequest = (
  headers: IncomingHttpHeaders
): Apollo.Request => ({
  id: extractRequestId(headers),
});

export const extractUser = async ({
  authorization: header,
}: IncomingHttpHeaders): Promise<Nullable<Apollo.User>> => {
  const { OIDC_ISSUER: issuer, OIDC_AUDIENCE: audience } = env();

  const token = header?.trim().replace(/^Bearer\s+/i, '');

  if (isDefined(token)) {
    const { sub, sanity_person_id: sanityPersonId } = await Issuer.discover(
      issuer
    ).then(({ Client }) =>
      new Client({ client_id: audience }).userinfo<{
        sanity_person_id: Identifier.Person;
      }>(token)
    );

    return { id: sub as Identifier.User, sanityPersonId };
  }

  return null;
};

export const createSanityClient = () => {
  const {
    SANITY_TOKEN: token,
    SANITY_PROJECT_ID: projectId,
    SANITY_DATASET: dataset,
    SANITY_API_VERSION: apiVersion,
  } = env();

  return createClient({
    token,
    projectId,
    dataset,
    apiVersion,
    perspective: 'published',
    useCdn: true,
  });
};
