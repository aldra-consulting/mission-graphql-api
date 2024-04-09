import { type SanityClient } from '@sanity/client';
import { type Logger } from 'winston';

import { type Repository, type Sanity } from '@project/types';

export default abstract class SanityRepository<
  T extends Sanity.Document<Sanity.Document.Type>,
> implements Repository<T>
{
  protected abstract type: Sanity.Document.Type;

  protected client: SanityClient;

  protected logger: Logger;

  constructor(client: SanityClient, logger: Logger) {
    this.client = client;
    this.logger = logger;
  }

  abstract findMany: () => Promise<T[]>;

  abstract findByIdOrThrow: (id: T['id']) => Promise<T>;
}
