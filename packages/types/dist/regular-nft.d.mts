import { Secret, Pubkey } from './account.mjs';
export { C as Creators, c as InputCollection, I as InputCreators, e as InputNftMetadata, M as MintOptions, O as Option, d as Options, U as UseMethod, a as Uses, b as bignum } from './mint-DhknbGuT.mjs';
import './storage.mjs';
import '@solana/web3.js';
import './phantom-aWSz-JUw.mjs';
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

export type { BurnOptions, Collection, FreezeOptions, MintCollectionOptions, ThawOptions, TransferOptions };
