import { Result, Secret } from 'shared';
import { FileContent, InfraSideInput, UserSideInput } from 'types/converter';
import { StorageType } from 'types/storage';

declare namespace NftStorage {
    const uploadContent: (filePath: FileContent) => Promise<Result<string, Error>>;
    /**
     * Upload content
     *
     * @param {StorageMetadata} metadata
     * {
     *   name?: {string}                      // nft content name
     *   symbol?: {string}                    // nft ticker symbol
     *   description?: {string}               // nft content description
     *   sellerFeeBasisPoints?: number        // royalty percentage
     *   image?: {string}                     // uploaded uri of original content
     *   external_url?: {string}              // landing page, home page uri, related url
     *   attributes?: {JsonMetadataAttribute[]}     // game character parameter, personality, characteristics
     *   properties?: {JsonMetadataProperties<Uri>} // included file name, uri, supported file type
     *   collection?: Collection              // collections of different colors, shapes, etc.
     *   [key: string]: {unknown}             // optional param, Usually not used.
     * }
     * @return Promise<Result<string, Error>>
     */
    const uploadMetadata: (metadata: InfraSideInput.Offchain) => Promise<Result<string, Error>>;
}

declare namespace Storage {
    const toConvertOffchaindata: (input: UserSideInput.NftMetadata, sellerFeeBasisPoints: number) => InfraSideInput.Offchain;
    const uploadContent: (filePath: FileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>;
    const uploadMetaAndContent: (input: InfraSideInput.Offchain, filePath: FileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>;
}

export { NftStorage, Storage };
