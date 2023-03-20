import { Keypair, PublicKey } from '@solana/web3.js';

export type BundlrSigner = Keypair | Phantom | undefined;

export type Phantom = {
  publicKey: PublicKey
  // original: @solana-suite/phantom/types/phantom.ts
};
