import { Secret, Pubkey } from './account.mjs';
export { C as Creators, c as InputCollection, I as InputCreators, e as InputNftMetadata, M as MintOptions, O as Option, d as Options, U as UseMethod, a as Uses, b as bignum } from './mint-856bfcb9.js';
import './storage.mjs';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.mjs';
import './converter.mjs';
import '@metaplex-foundation/mpl-token-metadata';
import 'bn.js';

type BurnOptions = {
    feePayer: Secret;
};

type GasLessMintOptions = {
    freezeAuthority: Pubkey;
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

type ThawOptions = {
    feePayer: Secret;
};

type TransferOptions = {
    feePayer: Secret;
};

export { BurnOptions, Collection, GasLessMintOptions, MintCollectionOptions, ThawOptions, TransferOptions };
