import { Metaplex as MetaplexFoundation, BundlrStorageDriver } from '@metaplex-foundation/js';
import { BundlrSigner } from './types/bundlr';
export declare namespace Bundlr {
    const make: (feePayer?: BundlrSigner) => MetaplexFoundation;
    const useStorage: (feePayer: BundlrSigner) => BundlrStorageDriver;
}
//# sourceMappingURL=bundlr.d.ts.map