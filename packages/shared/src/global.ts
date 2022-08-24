import { PublicKey, Keypair, TransactionSignature } from '@solana/web3.js';

import bs from 'bs58';
import { Constants, Result, Instruction } from './';

import { Internal_Instruction } from './internal/_instruction';

declare global {
  interface String {
    toPublicKey(): PublicKey;
    toKeypair(): Keypair;
    toExplorerUrl(): string;
    toAddressUrl(): string;
  }

  interface Array<T> {
    submit(): Promise<Result<TransactionSignature, Error>>;
  }

  interface Console {
    debug(data: unknown, data2?: unknown, data3?: unknown): void;
  }
}

// @ts-ignore
Array.prototype.submit = async function () {
  const instructions: Instruction[] = [];
  // dont use forEach
  // It is not possible to stop the process by RETURN in the middle of the process.
  let i = 0;
  for (const obj of this) {
    if (obj.isErr) {
      return Result.err(
        Error(`[Array index of caught 'Result.err': ${i}]${obj.error.message}`)
      );
    } else if (obj.isOk) {
      instructions.push(obj.value);
    } else {
      instructions.push(obj);
    }
    i++;
  }
  return await Internal_Instruction.batchSubmit(instructions);
};

String.prototype.toPublicKey = function () {
  return new PublicKey(this);
};

String.prototype.toKeypair = function () {
  const decoded = bs.decode(this as string);
  return Keypair.fromSecretKey(decoded);
};

String.prototype.toExplorerUrl = function () {
  let cluster = Constants.currentCluster;
  if (Constants.currentCluster === 'localhost-devnet') {
    cluster = 'devnet';
  }
  try {
    /* tslint:disable-next-line */
    new PublicKey(this);
    return `https://solscan.io/account/${this}?cluster=${cluster}`;
  } catch (_) {
    return `https://solscan.io/tx/${this}?cluster=${cluster}`;
  }
};

export const debugLog = (
  data: unknown,
  data2: unknown = '',
  data3: unknown = ''
) => {
  if (Constants.isDebugging || process.env.DEBUG) {
    console.log('[DEBUG]', data, data2, data3);
  }
};

export const sleep = async (sec: number) =>
  new Promise((r) => setTimeout(r, sec * 1000));

export const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;
