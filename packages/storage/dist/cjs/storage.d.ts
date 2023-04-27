import { Result, Secret } from '@solana-suite/shared';
import { FileContent, InfraSideInput, UserSideInput } from '@solana-suite/shared-metaplex';
export declare namespace Storage {
    const toConvertOffchaindata: (input: UserSideInput.NftMetadata, sellerFeeBasisPoints: number) => InfraSideInput.Offchain;
    const uploadContent: (filePath: FileContent, storageType: InfraSideInput.StorageType, feePayer?: Secret) => Promise<Result<string, Error>>;
    const uploadMetaAndContent: (input: InfraSideInput.Offchain, filePath: FileContent, storageType: InfraSideInput.StorageType, feePayer?: Secret) => Promise<Result<string, Error>>;
}
