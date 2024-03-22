import { Pubkey, Secret } from './account.mjs';
import { StorageType, FileType, Attribute, Properties } from './storage.mjs';
import BN from 'bn.js';

type bignum = number | BN;
type Option<T> = T | null;
declare enum UseMethod {
    Burn = 0,
    Multiple = 1,
    Single = 2
}
type Uses = {
    useMethod: UseMethod;
    remaining: bignum;
    total: bignum;
};
type Creators = {
    address: Pubkey;
    share: number;
    verified: boolean;
};
type InputCreators = {
    address: Pubkey;
    secret: Secret;
    share: number;
};

type InputCollection = Pubkey;
type Options = {
    [key: string]: unknown;
};
type InputNftMetadata = {
    name: string;
    symbol: string;
    royalty?: number;
    storageType?: StorageType;
    filePath?: FileType;
    uri?: string;
    isMutable?: boolean;
    description?: string;
    external_url?: string;
    animation_url?: string;
    attributes?: Attribute[];
    properties?: Properties;
    maxSupply?: bignum;
    creators?: InputCreators[];
    uses?: Uses;
    collection?: InputCollection;
    options?: Options;
};
type MintOptions = {
    freezeAuthority: Pubkey;
    feePayer: Secret;
};

export { type Creators as C, type InputCreators as I, type MintOptions as M, type Option as O, UseMethod as U, type Uses as a, type bignum as b, type InputCollection as c, type Options as d, type InputNftMetadata as e };
