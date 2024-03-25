import { Secret, Pubkey } from './account.js';
import { Offchain, Attribute, FileType, StorageType } from './storage.js';
import { C as Creators, a as Uses, I as InputCreators, d as Options } from './mint-BWudQi1I.js';
import '@solana/web3.js';
import './phantom-aWSz-JUw.js';
import './das-api.js';
import './converter.js';
import '@metaplex-foundation/mpl-token-metadata';
import 'bn.js';

type BurnOptions = {
    feePayer: Secret;
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

type FreezeOptions = {
    feePayer: Secret;
};

type MintOptions = {
    feePayer: Secret;
    freezeAuthority: Pubkey;
};
type InputTokenMetadata = {
    name: string;
    symbol: string;
    filePath?: FileType;
    uri?: string;
    storageType?: StorageType;
    description?: string;
    royalty?: number;
    uses?: Uses;
    creators?: InputCreators[];
    attributes?: Attribute[];
    options?: Options;
};

type ThawOptions = {
    feePayer: Secret;
};

export type { BurnOptions, FreezeOptions, InputTokenMetadata, MintOptions, ThawOptions, TokenMetadata };
