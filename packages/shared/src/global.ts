import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import bs from 'bs58';

import { Constants } from './constants';
import { Node } from './node';
import { Result } from './result';
import { Instruction as _Instruction } from './instruction';
import { Instruction as _Batch } from './instruction/batch-submit';
import './types/global';

/**
 * senTransaction() TransactionInstruction
 *
 * @see {@link types/global.ts}
 * @returns Promise<Result<string, Error>>
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* @ts-ignore */
Array.prototype.submit = async function () {
  const instructions: _Instruction[] = [];
  // dont use forEach
  // It is not possible to stop the process by RETURN in the middle of the process.
  return Try(async () => {
    let i = 0;
    for (const obj of this) {
      if (obj.isErr) {
        const errorMess: string = obj.error.message as string;
        throw Error(`[Array index of caught 'Result.err': ${i}]${errorMess}`);
      } else if (obj.isOk) {
        instructions.push(obj.value as _Instruction);
      } else {
        instructions.push(obj as _Instruction);
      }
      i++;
    }
    return _Batch.batchSubmit(instructions);
  });
};

/**
 * PubKey(@solana-suite) to PublicKey(@solana/web3.js)
 *
 * @see {@link types/global.ts}
 * @returns PublicKey
 */
String.prototype.toPublicKey = function () {
  return new PublicKey(this);
};

/**
 * Secret(@solana-suite) to Keypair(@solana/web3.js)
 *
 * @see {@link types/global.ts}
 * @returns Keypair
 */
String.prototype.toKeypair = function () {
  const decoded = bs.decode(this as string);
  return Keypair.fromSecretKey(decoded);
};

/**
 * Create explorer url for account address or signature
 *
 * @see {@link types/global.ts}
 * @returns string
 */
String.prototype.toExplorerUrl = function () {
  const endPointUrl = Node.getConnection().rpcEndpoint;
  debugLog('# toExplorerUrl rpcEndpoint:', endPointUrl);
  let cluster = '';
  if (endPointUrl === Constants.EndPointUrl.prd) {
    cluster = Constants.Cluster.prd;
  } else if (endPointUrl === Constants.EndPointUrl.prd2) {
    cluster = Constants.Cluster.prd;
  } else if (endPointUrl === Constants.EndPointUrl.test) {
    cluster = Constants.Cluster.test;
  } else if (endPointUrl === Constants.EndPointUrl.dev) {
    cluster = Constants.Cluster.dev;
  } else {
    cluster = Constants.Cluster.dev;
  }

  const address: string = this.toString();

  try {
    /* tslint:disable-next-line */
    new PublicKey(address);
    return `https://solscan.io/account/${address}?cluster=${cluster}`;
  } catch (_) {
    return `https://solscan.io/tx/${address}?cluster=${cluster}`;
  }
};

/**
 * LAMPORTS to SOL
 *
 * @see {@link types/global.ts}
 * @returns number
 */
Number.prototype.toSol = function () {
  return (this as number) / LAMPORTS_PER_SOL;
};

/**
 * SOL to LAMPORTS
 *
 * @see {@link types/global.ts}
 * @returns number
 */
Number.prototype.toLamports = function () {
  return (this as number) * LAMPORTS_PER_SOL;
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
  data4: unknown = ''
): void => {
  if (Constants.isDebugging || process.env.DEBUG == 'true') {
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
  asyncblock: () => Promise<T>
): Promise<Result<T, E>>;
export function Try<T, E extends Error>(block: () => T): Result<T, E>;
export function Try<T, E extends Error>(
  input: () => Promise<T>
): Result<T, Error> | Promise<Result<T, Error>> {
  try {
    const v = input();
    if (isPromise(v)) {
      return v.then(
        (x: T) => Result.ok(x),
        (err: E) => Result.err(err)
      );
    } else {
      return Result.ok(v);
    }
  } catch (e) {
    if (e instanceof Error) {
      return Result.err(e);
    }
    return Result.err(Error(e as string));
  }
}
