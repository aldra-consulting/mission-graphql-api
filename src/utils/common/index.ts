import { type Hashable } from '@project/types';

/**
 * A type guard that checks whether provided value is non-nullable and allows
 * TypeScript compiler to correctly infer value type in further usage of the value.
 *
 * @function
 * @template T
 * @param {T} value
 *
 * @returns {boolean} Returns `true` if provided value is non-nullable, otherwise `false`
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function assertDefined<T extends Hashable>(
  value: T,
  subject?: string
): asserts value is NonNullable<T> {
  if (!isDefined(value)) {
    throw new Error(
      isDefined(subject)
        ? `Expected '${subject}' to be defined, but received '${String(value)}'`
        : `Expected a defined value, but received '${String(value)}'`
    );
  }
}
