// import { CompressedNft as Creator } from './creator';
import { CompressedNft as Delegate } from './delegate';
import { CompressedNft as Find } from './find';
import { CompressedNft as GasLessDelegate } from './gas-less-delegate';
import { CompressedNft as GasLessTransfer } from './gas-less-transfer';
import { CompressedNft as Mint } from './mint';
import { CompressedNft as Collection } from './mint-collection';
import { CompressedNft as Tree } from './tree';
import { CompressedNft as Transfer } from './transfer';

import '~/types/transaction-builder';
import '~/types/account';
import '~/transaction-builder';

export const CompressedNft = {
  // ...Creator,
  ...Delegate,
  ...Find,
  ...GasLessDelegate,
  ...GasLessTransfer,
  ...Mint,
  ...Tree,
  ...Collection,
  ...Transfer,
};
export * from '~/shared/exports';
