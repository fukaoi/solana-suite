import { Convert as Collection } from './collection';
import { Convert as Creators } from './creators';
import { Convert as NftMetadata } from './nft-metadata';
import { Convert as Properties } from './properties';
import { Convert as TokenMetadata } from './token-metadata';
import { Convert as Uses } from './uses';
export declare const Convert: {
    Uses: typeof Uses.Uses;
    TokenMetadata: typeof TokenMetadata.TokenMetadata;
    Properties: typeof Properties.Properties;
    NftMetadata: typeof NftMetadata.NftMetadata;
    Creators: typeof Creators.Creators;
    Collection: typeof Collection.Collection;
};
