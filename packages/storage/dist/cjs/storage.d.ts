import { Result, Secret } from '@solana-suite/shared';
import { _InputNftMetadata, NftStorageMetadata, StorageType } from '@solana-suite/shared-metaplex';
import { MetaplexFileContent } from '@metaplex-foundation/js';
export declare namespace Storage {
    const toConvertNftStorageMetadata: (input: _InputNftMetadata, sellerFeeBasisPoints: number) => NftStorageMetadata;
    const uploadContent: (filePath: MetaplexFileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>;
    const uploadMetaContent: (input: NftStorageMetadata, filePath: MetaplexFileContent, feePayer?: Secret) => Promise<Result<string, Error>>;
}
