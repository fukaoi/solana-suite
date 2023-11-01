import { Keypair, PublicKey } from '@solana/web3.js';
import { PhantomProvider } from '../phantom';
import { Secret } from '../account';

export type BundlrSigner = Keypair | PhantomWallet | undefined;

export type PhantomWallet = {
  publicKey: PublicKey;
  // original: @solana-suite/phantom/types/phantom.ts
};

export type FileType = string | File;
export type UploadableFileType = string & File;
export type Identity = Secret | PhantomProvider;
export type Tags = [{ name: string; value: string }];
