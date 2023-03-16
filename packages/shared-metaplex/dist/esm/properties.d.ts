import { MetaplexFileContent } from '@metaplex-foundation/js';
import { Secret, Result } from '@solana-suite/shared';
import { MetadataProperties, StorageType, _MetadataProperties } from './types';
export declare namespace Properties {
    const toInputConvert: (input: MetadataProperties | undefined, storageFunc: (data: MetaplexFileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>, storageType: StorageType, feePayer?: Secret) => Promise<_MetadataProperties>;
}
