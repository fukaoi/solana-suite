import { Pubkey } from '@solana-suite/shared';
import { MetadataProperties, StorageType, _MetadataProperties } from './types';
export declare namespace Properties {
    const toInputConvert: (input: MetadataProperties | undefined, storageFunc: any, storageType: StorageType, feePayer?: Pubkey) => Promise<_MetadataProperties[]>;
}
