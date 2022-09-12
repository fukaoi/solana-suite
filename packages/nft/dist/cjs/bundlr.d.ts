import { Metaplex as MetaplexFoundation, BundlrStorageDriver } from '@metaplex-foundation/js';
import { Keypair } from '@solana/web3.js';
import { BundlrSigner } from './types/bundlr';
export declare namespace Bundlr {
    const make: (feePayer?: BundlrSigner) => MetaplexFoundation;
    const useStorage: (feePayer: Keypair) => BundlrStorageDriver;
}
