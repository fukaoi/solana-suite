import { Result } from '@solana-suite/shared';
import { MetaplexFileContent } from '@metaplex-foundation/js';
export declare namespace NftStorage {
    const uploadContent: (filePath: MetaplexFileContent) => Promise<Result<string, Error>>;
    /**
     * Upload content
     *
     * @param {NftStorageMetadata} metadata
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
    const uploadMetadata: (metadata: NftStorageMetadata) => Promise<Result<string, Error>>;
}
