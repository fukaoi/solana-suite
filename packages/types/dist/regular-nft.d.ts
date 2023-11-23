import { O as Option, C as Creators, U as Uses } from './input-3d6350ea.js';
export { I as InputCollection, e as InputCreators, b as InputNftMetadata, a as Options, d as UseMethod, c as bignum } from './input-3d6350ea.js';
import { Pubkey } from './account.js';
import { Offchain } from './storage.js';
import 'bn.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.js';
import './converter.js';
import '@metaplex-foundation/mpl-token-metadata';

type Collection = {
    address: Pubkey;
    verified: boolean;
};
type CollectionDetails = {
    __kind: string;
    size: number;
};
type RegularNftMetadata = {
    mint: string;
    updateAuthority: string;
    royalty: number;
    name: string;
    symbol: string;
    uri: string;
    isMutable: boolean;
    primarySaleHappened: boolean;
    editionNonce: Option<number>;
    offchain: Offchain;
    collection?: Collection | undefined;
    collectionDetails?: CollectionDetails | undefined;
    creators?: Creators[] | undefined;
    uses?: Uses | undefined;
    dateTime?: Date | undefined;
};

export { Collection, CollectionDetails, Creators, Option, RegularNftMetadata, Uses };
