import { Keypair, PublicKey } from '@solana/web3.js';
import { Secret } from '@solana-suite/shared';
import { Phantom } from './bundlr';

export type BundlrSigner = Keypair | PhantomWallet | undefined;

export type PhantomWallet = {
  publicKey: PublicKey;
  // original: @solana-suite/phantom/types/phantom.ts
};

export type FileType = string | File;
export type UploadableFileType = string & File;
export type Identity = Secret | Phantom;
export type Tags = [{ name: string; value: string }];
