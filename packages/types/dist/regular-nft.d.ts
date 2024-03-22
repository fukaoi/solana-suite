import { Secret, Pubkey } from './account.js';
export { C as Creators, c as InputCollection, I as InputCreators, e as InputNftMetadata, M as MintOptions, O as Option, d as Options, U as UseMethod, a as Uses, b as bignum } from './mint-BWudQi1I.js';
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
