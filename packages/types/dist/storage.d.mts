import { Keypair, PublicKey } from '@solana/web3.js';
import { P as PhantomProvider } from './phantom-e9a40784.js';
import { Secret } from './account.mjs';
import { Asset } from './das-api.mjs';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import './converter.mjs';

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

type StorageType = 'nftStorage' | 'arweave' | string;
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
        [key: string]: unknown;
    }[];
    [key: string]: unknown;
};
type Attribute = {
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
};

export { AssetAndOffchain, Attribute, BundlrSigner, FileType, Identity, MetadataAndOffchain, Offchain, PhantomWallet, Properties, StorageType, Tags, UploadableFileType };
