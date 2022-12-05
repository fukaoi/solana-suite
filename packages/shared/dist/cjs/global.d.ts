import { Result } from './result';
import './types/global';
/**
 * Display log for solana-suite-config.js
 *
 * @param {unknown} data1
 * @param {unknown} data2
 * @param {unknown} data3
 * @param {unknown} data4
 * @returns void
 */
export declare const debugLog: (data1: unknown, data2?: unknown, data3?: unknown, data4?: unknown) => void;
/**
 * sleep timer
 *
 * @param {number} sec
 * @returns Promise<number>
 */
export declare const sleep: (sec: number) => Promise<number>;
/**
 * Node.js or Browser js
 *
 * @returns boolean
 */
export declare const isBrowser: () => boolean;
/**
 * Node.js or Browser js
 *
 * @returns boolean
 */
export declare const isNode: () => boolean;
/**
 * argument is promise or other
 *
 * @param {unknown} obj
 * @returns boolean
 */
export declare const isPromise: (obj: unknown) => obj is Promise<unknown>;
/**
 * Try async monad
 *
 * @returns Promise<Result<T, E>>
 */
export declare function Try<T, E extends Error>(asyncblock: () => Promise<T>, finallyInput?: () => void): Promise<Result<T, E>>;
export declare function Try<T, E extends Error>(block: () => T): Result<T, E>;
