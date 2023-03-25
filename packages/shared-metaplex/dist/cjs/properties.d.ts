import { MetaplexFileContent } from '@metaplex-foundation/js';
import { Secret, Result } from '@solana-suite/shared';
import { IProperties, StorageType } from './types';
export declare namespace Properties {
    const toInputConvert: (input: IProperties | undefined, storageFunc: (data: MetaplexFileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>, storageType: StorageType, feePayer?: Secret) => Promise<IProperties>;
}
