import logger, { repositoryTags } from '@project/utils/logging';

import { MissionBookmarksSanityRepository } from '../../repository';
import MissionBookmarksEnityService from '../../services/mission-bookmarks';

import { type ApolloContextFunction } from './types';
import { createRequest, extractUser, createSanityClient } from './utils';

export default (async ({ req: { headers } }) => {
  const request = createRequest(headers);
  const user = await extractUser(headers);
  const sanityClient = createSanityClient();

  return {
    request,
    user,
    missionBookmarksService: new MissionBookmarksEnityService(
      new MissionBookmarksSanityRepository(
        sanityClient,
        logger.child({
          tags: [...repositoryTags, 'bookmark.missions'],
          requestId: request.id,
        })
      )
    ),
  };
}) satisfies ApolloContextFunction;
