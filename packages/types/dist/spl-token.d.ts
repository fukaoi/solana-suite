import { Secret, Pubkey } from './account.js';
import { Offchain, Attribute, FileType, StorageType } from './storage.js';
import { C as Creators, U as Uses, I as InputCreators, O as Options } from './mint-7af43c5c.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.js';
import './converter.js';
import '@metaplex-foundation/mpl-token-metadata';
import 'bn.js';

type BurnOptions = {
    feePayer: Secret;
};

type GasLessTransferOptions = {
    isPriorityFee: boolean;
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

export { BurnOptions, FreezeOptions, GasLessTransferOptions, InputTokenMetadata, MintOptions, ThawOptions, TokenMetadata };
