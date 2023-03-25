import { MetaplexFileContent } from '@metaplex-foundation/js';
import { Secret, Result } from '@solana-suite/shared';
import { User, StorageType, Infra } from './types';
export declare namespace Properties {
    const toInputConvert: (input: User.Properties | undefined, storageFunc: (data: MetaplexFileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>, storageType: StorageType, feePayer?: Secret) => Promise<Infra.Properties>;
}
