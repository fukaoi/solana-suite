import { Currency, Metaplex, BundlrStorageDriver } from '@metaplex-foundation/js';
import { Pubkey, Secret, Result } from '@solana-suite/shared';
import BN from 'bn.js';
import { PublicKey, Keypair } from '@solana/web3.js';

type Option<T> = T | null;
type bignum = number | BN;
type FileContent = string | Buffer | Uint8Array | ArrayBuffer;
declare namespace _Shared {
    type Properties = {
        creators?: {
            address?: string;
            share?: number;
            [key: string]: unknown;
        }[];
        files?: {
            type?: string;
            filePath?: FileContent;
            [key: string]: unknown;
        }[];
        [key: string]: unknown;
    };
    type Attribute = {
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    };
    enum UseMethod {
        Burn = 0,
        Multiple = 1,
        Single = 2
    }
    type Uses = {
        useMethod: UseMethod;
        remaining: bignum;
        total: bignum;
    };
    type Options = {
        [key: string]: unknown;
    };
}

declare namespace InfraSideInput {
    interface File extends Blob {
        readonly lastModified: number;
        readonly name: string;
    }
    type StorageNftStorageMetadata = {
        storageType?: 'nftStorage';
    };
    type StorageArweaveMetadata = {
        storageType?: 'arweave';
    };
    type Collection = {
        key: PublicKey;
        verified: boolean;
    };
    type Creators = {
        address: PublicKey;
        verified: boolean;
        share: number;
    };
    type Properties = _Shared.Properties;
    type Offchain = {
        name?: string;
        symbol?: string;
        description?: string;
        seller_fee_basis_points?: number;
        image?: string;
        external_url?: string;
        attributes?: _Shared.Attribute[];
        properties?: _Shared.Properties;
        collection?: {
            name?: string;
            family?: string;
            [key: string]: unknown;
        };
        created_at?: number;
    };
    type MetaplexDataV2 = {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        creators: Option<Creators[]>;
        collection: Option<Collection>;
        uses: Option<_Shared.Uses>;
    };
}

declare namespace UserSideInput {
    type Collection = Pubkey;
    type Creators = {
        address: Pubkey;
        share: number;
        verified: boolean;
    };
    type Properties = _Shared.Properties;
    enum TokenStandard {
        NonFungible = 0,
        FungibleAsset = 1,
        Fungible = 2,
        NonFungibleEdition = 3,
        ProgrammableNonFungible = 4
    }
    type NftMetadata = {
        name: string;
        symbol: string;
        royalty: number;
        storageType?: StorageType;
        filePath?: FileContent;
        uri?: string;
        isMutable?: boolean;
        description?: string;
        external_url?: string;
        attributes?: _Shared.Attribute[];
        properties?: Properties;
        maxSupply?: bignum;
        creators?: Creators[];
        uses?: _Shared.Uses;
        collection?: Collection;
        options?: _Shared.Options;
    };
    type TokenMetadata = {
        name: string;
        symbol: string;
        filePath?: FileContent;
        uri?: string;
        storageType?: StorageType;
        description?: string;
        royalty?: number;
        uses?: _Shared.Uses;
        creators?: Creators[];
        attributes?: _Shared.Attribute[];
        options?: _Shared.Options;
    };
}

type StorageType = 'nftStorage' | 'arweave' | string;

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
    const getUploadPrice: (filePath: FileContent, feePayer: Secret) => Promise<Result<{
        price: number;
        currency: Currency;
    }, Error>>;
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

export { Arweave, Bundlr, MetaplexFileOptions, NftStorage, Storage };
