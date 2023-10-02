import { Converter as Collection } from './collection';
import { Converter as Creators } from './creators';
import { Converter as Memo } from './memo';
import { Converter as Mint } from './mint';
import { Converter as NftMetadata } from './nft-metadata';
import { Converter as Properties } from './properties';
import { Converter as Royalty } from './royalty';
import { Converter as TokenMetadata } from './token-metadata';
import { Converter as TransferChecked } from './transfer-checked';
import { Converter as Transfer } from './transfer';
import { Converter as Uses } from './uses';

export const Converter = {
  ...Collection,
  ...Creators,
  ...Memo,
  ...Mint,
  ...NftMetadata,
  ...Properties,
  ...Royalty,
  ...TokenMetadata,
  ...TransferChecked,
  ...Transfer,
  ...Uses,
};
