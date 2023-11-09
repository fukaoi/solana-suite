import { FileType, StorageType, Attribute, Offchain } from './storage.mjs';
import { Uses, InputCreators, Options, Option, Collection, Creators } from './regular-nft.mjs';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './account.mjs';
import '@metaplex-foundation/mpl-token-metadata';
import './converter.mjs';
import 'bn.js';

type InputTokenMetadata = {
    name: string;
    symbol: string;
    filePath?: FileType;
    uri?: string;
    storageType: StorageType;
    description?: string;
    royalty?: number;
    uses?: Uses;
    creators?: InputCreators[];
    attributes?: Attribute[];
    options?: Options;
};

type NftMetadata = {
    mint: string;
    updateAuthority: string;
    royalty: number;
    name: string;
    symbol: string;
    uri: string;
    isMutable: boolean;
    primarySaleHappened: boolean;
    editionNonce: Option<number>;
    offchain: Offchain;
    tokenAmount: string;
    collection?: Collection | undefined;
    creators?: Creators[] | undefined;
    uses?: Uses | undefined;
    dateTime?: Date | undefined;
};
type TokenMetadata = {
    mint: string;
    name: string;
    symbol: string;
    uri: string;
    royalty: number;
    offchain: Offchain;
    tokenAmount: string;
    attributes?: Attribute | undefined;
    creators?: Creators[] | undefined;
    uses?: Uses | undefined;
    dateTime?: Date | undefined;
};

export { InputTokenMetadata, NftMetadata, TokenMetadata };
