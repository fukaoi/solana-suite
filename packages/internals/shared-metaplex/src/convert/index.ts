import { Convert as Collection } from 'collection';
import { Convert as Creators } from './creators';
import { Convert as NftMetadata } from './nft-metadata';
import { Convert as Properties } from './properties';
import { Convert as TokenMetadata } from './token-metadata';
import { Convert as Uses } from './uses';

export const Convert = {
  ...Collection,
  ...Creators,
  ...NftMetadata,
  ...Properties,
  ...TokenMetadata,
  ...Uses,
};