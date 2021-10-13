import {
  PublicKey,
  Keypair
} from '@solana/web3.js';

import bs from 'bs58';
import {Constants, ConstantsFunc} from './constants';

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
  return `https://explorer.solana.com/tx/${this}?cluster=${process.env.SOLANA_NETWORK}`;
}

String.prototype.toAddressUrl = function () {
  return `https://explorer.solana.com/address/${this}?cluster=${process.env.SOLANA_NETWORK}`;
}

console.debug = (data: any, data2: any = '') => {
  if (process.env.NODE_ENV === 'development'
    || process.env.NODE_ENV === 'test') {
    console.log(`\u001b[35m${data}`, `\u001b[36m${data2}`);
  }
}

