import { Secret, Pubkey } from './account.js';
export { C as Creators, d as InputCollection, I as InputCreators, e as InputNftMetadata, M as MintOptions, a as Option, O as Options, c as UseMethod, U as Uses, b as bignum } from './mint-BjndrGyN.js';
import './storage.js';
import '@solana/web3.js';
import './phantom-aWSz-JUw.js';
import './das-api.js';
import './converter.js';
import '@metaplex-foundation/mpl-token-metadata';
import 'bn.js';

type BurnOptions = {
    feePayer: Secret;
};

type ThawOptions = {
    feePayer: Secret;
};

type GasLessMintOptions = {
    freezeAuthority: Pubkey;
    isPriorityFee: boolean;
};

type GasLessTransferOptions = {
    isPriorityFee: boolean;
};

type MintCollectionOptions = {
    feePayer: Secret;
    freezeAuthority: Pubkey;
    collectionSize: number;
};
type Collection = {
    address: Pubkey;
    verified: boolean;
};

type FreezeOptions = {
    feePayer: Secret;
};

type TransferOptions = {
    feePayer: Secret;
};

export type { BurnOptions, Collection, FreezeOptions, GasLessMintOptions, GasLessTransferOptions, MintCollectionOptions, ThawOptions, TransferOptions };
