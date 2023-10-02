import { Keypair, PublicKey } from '@solana/web3.js';

export type BundlrSigner = Keypair | PhantomWallet | undefined;

export type PhantomWallet = {
  publicKey: PublicKey;
  // original: @solana-suite/phantom/types/phantom.ts
};
