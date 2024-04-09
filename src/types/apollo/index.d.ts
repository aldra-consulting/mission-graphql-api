import { type Nullable, type Identifiable, type Identifier } from '..';

import type MissionBookmarksEnityService from '../../services/mission-bookmarks';

export namespace Apollo {
  interface Request extends Identifiable<Identifier.Request> {}

  interface User extends Identifiable<Identifier.User> {
    sanityPersonId: Identifier.Person;
  }

  export interface Context {
    request: Request;
    user: Nullable<User>;
    missionBookmarksService: MissionBookmarksEnityService;
  }
}
