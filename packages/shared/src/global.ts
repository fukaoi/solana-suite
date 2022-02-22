import {
  PublicKey,
  Keypair,
  TransactionSignature,
} from '@solana/web3.js';

import bs from 'bs58';
import {
  Constants,
  Result,
  Instruction,
} from './';


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
}

// @ts-ignore
Array.prototype.submit = async function () {
  const instructions: Instruction[] = [];
  this.forEach((obj, i) => {
    if (obj.isErr) {
      return Result.err(Error(`[Array index: ${i}]${obj.error.message}`));
    } else if (obj.isOk) {
      instructions.push(obj.value);
    } else {
      instructions.push(obj);
    }
  });
  return await Instruction.batchSubmit(instructions);
}

String.prototype.toPublicKey = function () {
  return new PublicKey(this);
}

String.prototype.toKeypair = function () {
  const decoded = bs.decode(this as string);
  return Keypair.fromSecretKey(decoded);
}

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
}

console.debug = (
  data: unknown,
  data2: unknown = '',
  data3: unknown = ''
) => {
  if (Constants.isDebugging) console.log(
    `\u001b[34m`, data,
    `\u001b[35m`, data2,
    `\u001b[36m`, data3
  );
}

console.error = (
  data: unknown,
  data2: unknown = '',
  data3: unknown = ''
) => {
  console.log(
    `\u001b[31m`, data,
    `\u001b[4m\u001b[31m`, data2,
    `\u001b[0m\u001b[31m`, data3,
  );
}

export const tryCatch = (fn: () => {}) => {
  try {
    return Result.ok(fn());
  } catch (e: unknown) {
    return Result.err(e as Error);
  }
}
