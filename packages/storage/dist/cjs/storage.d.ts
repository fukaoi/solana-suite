import { Result, Secret } from '@solana-suite/shared';
import { StorageMetadata, StorageType, InputNftMetadata, FileContent } from '@solana-suite/shared-metaplex';
export declare namespace Storage {
    const toConvertNftStorageMetadata: (input: InputNftMetadata, sellerFeeBasisPoints: number) => StorageMetadata;
    const uploadContent: (filePath: FileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>;
    const uploadMetaAndContent: (input: StorageMetadata, filePath: FileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>;
}
