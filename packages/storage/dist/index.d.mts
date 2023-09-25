import { Secret, Result } from '@solana-suite/shared';
import { FileContent, InfraSideInput } from 'shared-metaplex/';
import { Metaplex, BundlrStorageDriver } from '@metaplex-foundation/js';
import { Keypair, PublicKey } from '@solana/web3.js';
import { FileContent as FileContent$1, InfraSideInput as InfraSideInput$1, UserSideInput, StorageType } from 'shared-metaplex';

interface MetaplexFileOptions {
    readonly displayName: string;
    readonly uniqueName: string;
    readonly contentType: string | undefined;
    readonly extension: string | undefined;
    readonly tags: {
        name: string;
        value: string;
    }[];
}
declare namespace Arweave {
    const uploadContent: (filePath: FileContent, feePayer: Secret, fileOptions?: MetaplexFileOptions) => Promise<Result<string, Error>>;
    const uploadMetadata: (metadata: InfraSideInput.Offchain, feePayer: Secret) => Promise<Result<string, Error>>;
}

type BundlrSigner = Keypair | Phantom | undefined;
type Phantom = {
    publicKey: PublicKey;
};

declare namespace Bundlr {
    const make: (feePayer?: BundlrSigner) => Metaplex;
    const useStorage: (feePayer: BundlrSigner) => BundlrStorageDriver;
}

declare namespace NftStorage {
    const uploadContent: (filePath: FileContent$1) => Promise<Result<string, Error>>;
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
    const uploadMetadata: (metadata: InfraSideInput$1.Offchain) => Promise<Result<string, Error>>;
}

declare namespace Storage {
    const toConvertOffchaindata: (input: UserSideInput.NftMetadata, sellerFeeBasisPoints: number) => InfraSideInput$1.Offchain;
    const uploadContent: (filePath: FileContent$1, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>;
    const uploadMetaAndContent: (input: InfraSideInput$1.Offchain, filePath: FileContent$1, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>;
}

export { Arweave, Bundlr, MetaplexFileOptions, NftStorage, Storage };
