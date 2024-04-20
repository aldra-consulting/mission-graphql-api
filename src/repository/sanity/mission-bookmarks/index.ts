import groq from 'groq';

import { type Nullable, type Identifier, type Sanity } from '@project/types';
import { isDefined } from '@project/utils/common';

import SanityRepository from '..';
import { SanityDocumentNotFoundError } from '../errors';

export default class MissionBookmarksSanityRepository extends SanityRepository<Sanity.Document.Bookmark.Missions> {
  protected type = 'bookmark.missions' as const;

  findMany = ((): Promise<Sanity.Document.Bookmark.Missions[]> => {
    throw new Error('Not implemented');
  }) satisfies SanityRepository<Sanity.Document.Bookmark.Missions>['findMany'];

  findByIdOrThrow = (async (
    id: Identifier.Bookmark.Missions
  ): Promise<Sanity.Document.Bookmark.Missions> => {
    const query = groq`
      *[_type == $type && _id == $id][0]
    `;

    const document = await this.client
      .withConfig({ useCdn: false })
      .fetch<Nullable<Sanity.Document.Bookmark.Missions>>(query, {
        type: this.type,
        id,
      });

    if (!isDefined(document)) {
      throw new SanityDocumentNotFoundError<Sanity.Document.Bookmark.Missions>(
        id,
        this.type
      );
    }

    return document;
  }) satisfies SanityRepository<Sanity.Document.Bookmark.Missions>['findByIdOrThrow'];

  listBookmarks = async (
    personId: Identifier.Person
  ): Promise<Identifier.Mission[]> => {
    try {
      return this.findByIdOrThrow(
        this.#constructMissionBookmarksDocumentId(personId)
      ).then(({ missions }) => missions.map(({ _ref: id }) => id));
    } catch (error) {
      this.logger.warning(
        error instanceof Error ? error.message : String(error),
        { error }
      );
    }

    return [];
  };

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
      .commit({ autoGenerateArrayKeys: true, visibility: 'sync' })
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
      .commit({ visibility: 'sync' })
      .catch((error: unknown) =>
        this.logger.error(
          error instanceof Error ? error.message : String(error),
          { error }
        )
      );
  };
}
