import { Convert as Collection } from '../convert/collection';
import { Convert as Creators } from '../convert/creators';
import { Convert as NftMetadata } from '../convert/nft-metadata';
import { Convert as Properties } from '../convert/properties';
import { Convert as TokenMetadata } from '../convert/token-metadata';
import { Convert as Uses } from '../convert/uses';

export const Convert = Object.assign(
  {},
  Collection,
  Creators,
  NftMetadata,
  Properties,
  TokenMetadata,
  Uses,
);
