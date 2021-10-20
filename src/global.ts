import {Result} from '@badrap/result';
import {
  PublicKey,
  Keypair
} from '@solana/web3.js';

import bs from 'bs58';
import {Constants} from './constants';

declare global {
  interface String {
    toPubKey(): PublicKey;
    toKeypair(): Keypair;
    toSigUrl(): string;
    toAddressUrl(): string;
  }
}

String.prototype.toPubKey = function () {
  return new PublicKey(this);
}

String.prototype.toKeypair = function () {
  const decoded = bs.decode(this as string);
  return Keypair.fromSecretKey(decoded);
}

String.prototype.toSigUrl = function () {
  return `https://explorer.solana.com/tx/${this}?cluster=${Constants.currentNetwork}`;
}

String.prototype.toAddressUrl = function () {
  return `https://explorer.solana.com/address/${this}?cluster=${Constants.currentNetwork}`;
}

console.debug = (data: any, data2: any = '') => {
  if (Constants.isDebugging()) console.log(`\u001b[35m${data}`, `\u001b[36m${data2}`);
}

  export const tryCatch = async(fn: () => {}) => {
  try {
    return await Result.ok(fn());
  } catch (e: unknown) {
    return Result.err(e as Error);
  }
}
