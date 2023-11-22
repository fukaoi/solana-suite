import { CompressedNft as Find } from './find';
import { CompressedNft as GasLess } from './gas-less-transfer';
import { CompressedNft as Mint } from './mint';
import { CompressedNft as Collection } from './mint-collection';
import { CompressedNft as Tree } from './tree';
import { CompressedNft as Transfer } from './transfer';

import '~/types/transaction';
import '~/transaction';

export const CompressedNft = {
  ...Find,
  ...GasLess,
  ...Mint,
  ...Tree,
  ...Collection,
  ...Transfer,
};
export * from '~/shared/exports';
