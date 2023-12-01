import { AnyObject } from '~/types/shared';
import { Constants } from './constants';
import { Result } from './result';

/**
 * convert buffer to Array
 *
 * @param {Buffer} buffer
 * @returns number[]
 */
export const bufferToArray = (buffer: Buffer): number[] => {
  const nums = [];
  for (const byte of buffer) {
    nums.push(buffer[byte]);
  }
  return nums;
};

/**
 * Overwrite JS Object
 *
 * @param {unknown} object
 * @param {OverwriteObject[]} targets
 * @returns Object
 */
export const overwriteObject = (
  object: unknown,
  targets: {
    existsKey: string;
    will: { key: string; value: unknown };
  }[],
): unknown => {
  const that: AnyObject = object as AnyObject;
  targets.forEach((target) => {
    delete that[target.existsKey];
    that[target.will.key] = target.will.value;
  });
  return that;
};

/**
 * Display log for solana-suite-config.js
 *
 * @param {unknown} data1
 * @param {unknown} data2
 * @param {unknown} data3
 * @param {unknown} data4
 * @returns void
 */
export const debugLog = (
  data1: unknown,
  data2: unknown = '',
  data3: unknown = '',
  data4: unknown = '',
): void => {
  if (Constants.isDebugging === 'true' || process.env.DEBUG === 'true') {
    console.log('[DEBUG]', data1, data2, data3, data4);
  }
};

/**
 * sleep timer
 *
 * @param {number} sec
 * @returns Promise<number>
 */
export const sleep = async (sec: number): Promise<number> => {
  return new Promise((r) => setTimeout(r, sec * 1000));
};

/**
 * Node.js or Browser js
 *
 * @returns boolean
 */
export const isBrowser = (): boolean => {
  return (
    typeof window !== 'undefined' && typeof window.document !== 'undefined'
  );
};

/**
 * Node.js or Browser js
 *
 * @returns boolean
 */
export const isNode = (): boolean => {
  return (
    typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null
  );
};

/**
 * argument is promise or other
 *
 * @param {unknown} obj
 * @returns boolean
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isPromise = (obj: unknown): obj is Promise<unknown> => {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof (obj as any).then === 'function'
  );
};

/**
 * Try async monad
 *
 * @returns Promise<Result<T, E>>
 */
export function Try<T, E extends Error>(
  asyncblock: () => Promise<T>,
  finallyInput?: () => void,
): Promise<Result<T, E>>;
export function Try<T, E extends Error>(block: () => T): Result<T, E>;
export function Try<T, E extends Error>(
  input: () => Promise<T>,
  finallyInput?: () => void,
): Result<T, Error> | Promise<Result<T, Error>> {
  try {
    const v = input();
    if (isPromise(v)) {
      return v.then(
        (x: T) => Result.ok(x),
        (err: E) => Result.err(err),
      );
    } else {
      return Result.ok(v);
    }
  } catch (e) {
    if (e instanceof Error) {
      return Result.err(e);
    }
    return Result.err(Error(e as string));
  } finally {
    if (finallyInput) {
      debugLog('# finally input:', finallyInput);
      finallyInput();
    }
  }
}

/**
 * argument is promise or other
 *
 * @param {number|undefined} created_at
 * @returns Date | undefined
 */
export const convertTimestampToDateTime = (
  created_at: number | undefined,
): Date | undefined => {
  if (created_at) {
    return new Date(created_at * 1000);
  }
  return;
};

/**
 * Get unix timestamp
 *
 * @returns number
 */
export const unixTimestamp = (): number => {
  return Math.floor(new Date().getTime() / 1000);
};
