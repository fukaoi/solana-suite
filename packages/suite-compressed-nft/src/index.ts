// import { CompressedNft as Creator } from './creator';
import { CompressedNft as Delegate } from './delegate';
import { CompressedNft as Find } from './find';
import { CompressedNft as GasLessDelegate } from './gas-less-delegate';
import { CompressedNft as GasLessTransfer } from './gas-less-transfer';
import { CompressedNft as Mint } from './mint';
import { CompressedNft as Collection } from './mint-collection';
import { CompressedNft as Space } from './space';
import { CompressedNft as Transfer } from './transfer';

/** @namespace */
export const CompressedNft = {
  // ...Creator,
  ...Delegate,
  ...Find,
  ...GasLessDelegate,
  ...GasLessTransfer,
  ...Mint,
  ...Space,
  ...Collection,
  ...Transfer,
};
