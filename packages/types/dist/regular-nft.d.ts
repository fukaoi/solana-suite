export { e as Collection, f as CollectionDetails, C as Creators, I as InputCollection, a as InputNftMetadata, M as MetaplexDataV2, N as NftMetadata, c as Option, O as Options, g as TokenMetadata, T as TokenStandard, U as UseMethod, d as Uses, b as bignum } from './output-5d8fd37a.js';
import { Pubkey } from './account.js';
import './storage.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import '@metaplex-foundation/mpl-token-metadata';
import './converter.js';
import 'bn.js';

type CollectionAccounts = {
    collectionMetadata: Pubkey;
    collectionAuthority: Pubkey;
    collectionMint: Pubkey;
};

export { CollectionAccounts };
