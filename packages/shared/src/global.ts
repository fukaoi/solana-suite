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
    toPubkey(): PublicKey;
    toKeypair(): Keypair;
    toExplorerUrl(): string;
    toAddressUrl(): string;
  }

  interface Array<T extends Instruction[]> {
    submit(): Promise<Result<TransactionSignature, Error>>;
  }
}

Array.prototype.submit = async function () {
  const instructions: Instruction[] = [];
  for (let i = 0;  i < this.length; i++) {
    if (this[i].isErr) {
      return Result.err(Error(`[Array index: ${i}]${this[i].error.message}`));
    } else if (this[i].isOk) {
      instructions.push(this[i].value);
    } else {
      instructions.push(this[i]);
    }
  }
  return await Instruction.batchSubmit(instructions);
}

String.prototype.toPubkey = function () {
  return new PublicKey(this);
}

String.prototype.toKeypair = function () {
  const decoded = bs.decode(this as string);
  return Keypair.fromSecretKey(decoded);
}

String.prototype.toExplorerUrl = function () {
  try {
    /* tslint:disable-next-line */
    new PublicKey(this);
    return `https://explorer.solana.com/address/${this}?cluster=${Constants.currentNetwork}`;
  } catch (_) {
    return `https://explorer.solana.com/tx/${this}?cluster=${Constants.currentNetwork}`;
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
