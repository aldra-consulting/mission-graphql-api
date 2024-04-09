import { type Identifiable } from '../common';
import { type Identifier } from '../identifier';

export namespace Sanity {
  export interface Document<
    Type extends Document.Type,
    ID extends string = string,
  > extends Identifiable<ID> {
    _id: ID;
    _type: Type;
    _rev: string;
    _createdAt: string;
    _updatedAt: string;
  }

  export interface Reference<ID extends string = string> {
    _ref: ID;
  }

  export namespace Document {
    export type Type = 'bookmark.missions';

    export namespace Bookmark {
      export interface Missions
        extends Document<'bookmark.missions', Identifier.Bookmark.Missions> {
        person: Reference.Person;
        missions: Reference.Mission[];
      }
    }
  }

  export namespace Reference {
    export interface Person extends Reference<Identifier.Person> {}

    export interface Mission extends Reference<Identifier.Mission> {}
  }
}
