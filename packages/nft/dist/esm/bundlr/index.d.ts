import { Metaplex as MetaplexFoundation, BundlrStorageDriver } from '@metaplex-foundation/js';
import { Keypair } from '@solana/web3.js';
export declare namespace Bundlr {
    const make: (feePayer?: Keypair) => MetaplexFoundation;
    const useStorage: (feePayer: Keypair) => BundlrStorageDriver;
}
