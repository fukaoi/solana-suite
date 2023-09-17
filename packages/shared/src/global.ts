import bs from 'bs58';
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Constants } from '~/constants';
import { Node } from '~/node';
import { Result } from '~/result';
import { Instruction as _Instruction } from '~/instruction';
import { Instruction as _Batch } from '~/instruction/batch-submit';
import { KeypairAccount } from '~/keypair-account';
import { BigNumber } from 'bignumber.js';
import { AnyObject, Explorer } from '~/types/global';

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
  if (!KeypairAccount.isPubkey(this.toString())) {
    throw Error(`No match KeyPair.PubKey: ${this.toString()}`);
  }
  return new PublicKey(this);
};

/**
 * Secret(@solana-suite) to Keypair(@solana/web3.js)
 *
 * @see {@link types/global.ts}
 * @returns Keypair
 */
String.prototype.toKeypair = function () {
  if (!KeypairAccount.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = bs.decode(this as string);
  return Keypair.fromSecretKey(decoded);
};

/**
 * Create explorer url for account address or signature
 *
 * @see {@link types/global.ts}
 * @returns string
 */
String.prototype.toExplorerUrl = function (
  explorer: Explorer = Explorer.Solscan,
) {
  const endPointUrl = Node.getConnection().rpcEndpoint;
  debugLog('# toExplorerUrl rpcEndpoint:', endPointUrl);
  let cluster = '';
  if (endPointUrl === Constants.EndPointUrl.prd) {
    cluster = Constants.Cluster.prd;
  } else if (endPointUrl === Constants.EndPointUrl.test) {
    cluster = Constants.Cluster.test;
  } else if (endPointUrl === Constants.EndPointUrl.dev) {
    cluster = Constants.Cluster.dev;
  } else {
    cluster = Constants.Cluster.dev;
  }

  const addressOrSignature: string = this.toString();
  let url = '';
  if (KeypairAccount.isPubkey(addressOrSignature)) {
    // address
    if (explorer === Explorer.SolanaFM) {
      url = `https://solana.fm/address/${addressOrSignature}?cluster=${cluster}`;
    } else {
      url = `https://solscan.io/account/${addressOrSignature}?cluster=${cluster}`;
    }
    // signature
  } else {
    // for Invalid type "never" of addressOrSignature, so `as string`
    if (explorer === Explorer.SolanaFM) {
      url = `https://solana.fm/tx/${
        addressOrSignature as string
      }?cluster=${cluster}`;
    } else {
      url = `https://solscan.io/tx/${
        addressOrSignature as string
      }?cluster=${cluster}`;
    }
  }
  return url;
};

/**
 * LAMPORTS to SOL
 *
 * @see {@link types/global.ts}
 * @returns number
 */
Number.prototype.toSol = function () {
  return BigNumber(this as number)
    .div(LAMPORTS_PER_SOL)
    .toNumber();
};

/**
 * SOL to LAMPORTS
 *
 * @see {@link types/global.ts}
 * @returns number
 */
Number.prototype.toLamports = function () {
  return BigNumber(this as number)
    .times(LAMPORTS_PER_SOL)
    .toNumber();
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
