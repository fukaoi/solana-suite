import {
  PublicKey,
  Keypair
} from '@solana/web3.js';

import bs from 'bs58';

declare global {
  interface String {
    toPubKey(): PublicKey;
    toKeypair(): Keypair;
  }
}

String.prototype.toPubKey = function () {
  return new PublicKey(this);
}

String.prototype.toKeypair = function () {
  const decoded = bs.decode(this as string);
  return Keypair.fromSecretKey(decoded);
}


