import { Offchain, Attribute, FileType, StorageType } from './storage.js';
import { C as Creators, U as Uses, I as InputCreators, O as Options } from './mint-8aee5f82.js';
import { Secret, Pubkey } from './account.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.js';
import './converter.js';
import '@metaplex-foundation/mpl-token-metadata';
import 'bn.js';

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

type MintOptions = {
    feePayer: Secret;
    freezeAuthority: Pubkey;
};
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

export { InputTokenMetadata, MintOptions, TokenMetadata };
