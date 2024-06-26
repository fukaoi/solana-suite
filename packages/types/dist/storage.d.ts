import { Keypair, PublicKey } from '@solana/web3.js';
import { P as PhantomProvider } from './phantom-aWSz-JUw.js';
import { Secret } from './account.js';
import { Asset } from './das-api.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import './converter.js';

type BundlrSigner = Keypair | PhantomWallet | undefined;
type PhantomWallet = {
    publicKey: PublicKey;
};
type FileType = string | File;
type UploadableFileType = string & File;
type Identity = Secret | PhantomProvider;
type Tags = [{
    name: string;
    value: string;
}];

type StorageType = 'filebase' | 'arweave' | string;
type MetadataAndOffchain = {
    onchain: Metadata;
    offchain: Offchain;
};
type AssetAndOffchain = {
    onchain: Asset;
    offchain: Offchain;
};
type Offchain = {
    name?: string;
    symbol?: string;
    description?: string;
    seller_fee_basis_points?: number;
    image?: string;
    external_url?: string;
    attributes?: Attribute[];
    properties?: Properties;
    collection?: {
        name?: string;
        family?: string;
        [key: string]: unknown;
    };
    collectionDetails?: {
        kind: string;
        size: number;
    };
    created_at?: number;
};
type Properties = {
    creators?: {
        address?: string;
        share?: number;
        [key: string]: unknown;
    }[];
    files?: {
        type?: string;
        filePath?: FileType;
        uri?: string;
        [key: string]: unknown;
    }[];
    category?: string;
    [key: string]: unknown;
};
type Attribute = {
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
};
type StorageOptions = {
    feePayer: Secret;
};

export type { AssetAndOffchain, Attribute, BundlrSigner, FileType, Identity, MetadataAndOffchain, Offchain, PhantomWallet, Properties, StorageOptions, StorageType, Tags, UploadableFileType };
