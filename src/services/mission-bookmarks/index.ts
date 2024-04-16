import {
  type Sanity,
  type Repository,
  type Nullable,
  type Identifier,
} from '@project/types';

import { MissionBookmarksSanityRepository } from '../../repository';

export default class MissionBookmarksEnityService {
  #repository: Repository<Sanity.Document.Bookmark.Missions>;

  constructor(repository: Repository<Sanity.Document.Bookmark.Missions>) {
    this.#repository = repository;
  }

  listBookmarks = async (
    personId: Identifier.Person
  ): Promise<Identifier.Mission[]> => {
    try {
      if (this.#repository instanceof MissionBookmarksSanityRepository) {
        return this.#repository.listBookmarks(personId);
      }

      return [];
    } catch (error) {
      throw new Error('Unable to list mission bookmarks', { cause: error });
    }
  };

  toggleBookmark = async (
    missionId: Identifier.Mission,
    personId: Identifier.Person
  ): Promise<Nullable<boolean>> => {
    try {
      if (this.#repository instanceof MissionBookmarksSanityRepository) {
        return this.#repository.toggleBookmark(missionId, personId);
      }

      return undefined;
    } catch (error) {
      throw new Error('Unable to toggle mission bookmark', { cause: error });
    }
  };
}
