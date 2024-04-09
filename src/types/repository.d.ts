import { type Identifiable } from './common';

export interface Repository<T extends Identifiable> {
  findMany: () => Promise<T[]>;
  findByIdOrThrow: (id: T['id']) => Promise<T>;
}
