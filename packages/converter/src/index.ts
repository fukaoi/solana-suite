import { Converter as Collection } from './collection';
import { Converter as Creators } from './creators';
import { Converter as NftMetadata } from './nft-metadata';
import { Converter as Properties } from './properties';
import { Converter as Royalty } from './royalty';
import { Converter as TokenMetadata } from './token-metadata';
import { Converter as Uses } from './uses';
import 'types/global';

export const Converter = {
  ...Collection,
  ...Creators,
  ...NftMetadata,
  ...Properties,
  ...Royalty,
  ...TokenMetadata,
  ...Uses,
};
