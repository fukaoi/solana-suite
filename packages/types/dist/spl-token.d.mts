import { FileType, StorageType, Attribute, Offchain } from './storage.mjs';
import { d as Uses, e as InputCreators, O as Options, C as Creators } from './input-87190f29.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './account.mjs';
import '@metaplex-foundation/mpl-token-metadata';
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

export { InputTokenMetadata, TokenMetadata };
