import { type Brand } from './brand';

export namespace Identifier {
  export type Request = Brand<string, 'request.id'>;
  export type User = Brand<string, 'user.id'>;
  export type Mission = Brand<string, 'mission.id'>;
  export type Person = Brand<string, 'person.id'>;

  export namespace Bookmark {
    export type Missions = Brand<string, 'bookmark.missions.id'>;
  }
}
