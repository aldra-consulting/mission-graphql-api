import { GraphQLError } from 'graphql';

import { Operation } from '@project/enums';
import { type Apollo, type MissionOperations } from '@project/types';
import { isDefined } from '@project/utils/common';

export default class<Context extends Apollo.Context = Apollo.Context>
  implements MissionOperations<Context>
{
  [Operation.MUTATION] = {
    toggleBookmark: async ({
      context: { missionBookmarksService, user },
      input: {
        input: { missionId },
      },
    }) => {
      if (isDefined(user?.sanityPersonId)) {
        return missionBookmarksService.toggleBookmark(
          missionId,
          user.sanityPersonId
        );
      }

      throw new GraphQLError('Unauthorised', {
        extensions: {
          code: 'UNAUTHORISED',
        },
      });
    },
  } satisfies MissionOperations<Context>[Operation.MUTATION];
}
