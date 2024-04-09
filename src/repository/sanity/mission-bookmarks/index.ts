import { type Identifier, type Sanity } from '@project/types';

import SanityRepository from '..';

export default class MissionBookmarksSanityRepository extends SanityRepository<Sanity.Document.Bookmark.Missions> {
  protected type = 'bookmark.missions' as const;

  findMany = ((): Promise<Sanity.Document.Bookmark.Missions[]> => {
    throw new Error('Not implemented');
  }) satisfies SanityRepository<Sanity.Document.Bookmark.Missions>['findMany'];

  findByIdOrThrow = ((): Promise<Sanity.Document.Bookmark.Missions> => {
    throw new Error('Not implemented');
  }) satisfies SanityRepository<Sanity.Document.Bookmark.Missions>['findByIdOrThrow'];

  toggleBookmark = async (
    missionId: Identifier.Mission,
    personId: Identifier.Person
  ): Promise<boolean> => {
    const documentId = this.#constructMissionBookmarksDocumentId(personId);

    const { missions } = await this.client.createIfNotExists<
      Partial<Sanity.Document.Bookmark.Missions>
    >({
      _id: documentId,
      _type: this.type,
      person: { _ref: personId },
      missions: [],
    });

    const hasBookmarkedMission = missions?.some(
      ({ _ref }) => _ref === missionId
    );

    if (hasBookmarkedMission) {
      this.#unsetBookmark(documentId, missionId);
    } else {
      this.#setBookmark(documentId, missionId);
    }

    return !hasBookmarkedMission;
  };

  #constructMissionBookmarksDocumentId = (
    personId: Identifier.Person
  ): Identifier.Bookmark.Missions =>
    `bookmark.missions.${personId}` as Identifier.Bookmark.Missions;

  #setBookmark = (
    documentId: Identifier.Bookmark.Missions,
    missionId: Identifier.Mission
  ): void => {
    this.client
      .patch(documentId)
      .append('missions', [{ _ref: missionId }])
      .commit({ autoGenerateArrayKeys: true })
      .catch((error: unknown) =>
        this.logger.error(
          error instanceof Error ? error.message : String(error),
          { error }
        )
      );
  };

  #unsetBookmark = (
    documentId: Identifier.Bookmark.Missions,
    missionId: Identifier.Mission
  ): void => {
    this.client
      .patch(documentId)
      .unset([`missions[_ref == "${missionId}"]`])
      .commit()
      .catch((error: unknown) =>
        this.logger.error(
          error instanceof Error ? error.message : String(error),
          { error }
        )
      );
  };
}
