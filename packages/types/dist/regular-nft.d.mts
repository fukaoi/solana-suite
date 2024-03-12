import { Secret, Pubkey } from './account.mjs';
export { C as Creators, d as InputCollection, I as InputCreators, e as InputNftMetadata, M as MintOptions, a as Option, O as Options, c as UseMethod, U as Uses, b as bignum } from './mint-BjeG6jbU.js';
import './storage.mjs';
import '@solana/web3.js';
import './phantom-aWSz-JUw.js';
import './das-api.mjs';
import './converter.mjs';
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
