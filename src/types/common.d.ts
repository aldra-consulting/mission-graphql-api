export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | null
  | symbol
  | undefined;

export type Hashable = NonNullable<Primitive>;

export type Nullable<T = never> = T | null | undefined;

export interface Identifiable<ID extends Hashable = string> {
  id: ID;
}

export interface Converter<Source, Target> {
  convert(source: Source): Target;
}
