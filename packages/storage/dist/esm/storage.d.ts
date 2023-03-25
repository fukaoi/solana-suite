import { Result, Secret } from '@solana-suite/shared';
import { _InputNftMetadata, StorageMetadata, StorageType } from '@solana-suite/shared-metaplex';
import { MetaplexFileContent } from '@metaplex-foundation/js';
export declare namespace Storage {
    const toConvertNftStorageMetadata: (input: _InputNftMetadata, sellerFeeBasisPoints: number) => StorageMetadata;
    const uploadContent: (filePath: MetaplexFileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>;
    const uploadMetaContent: (input: StorageMetadata, filePath: MetaplexFileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>;
}
