import { RegularNft as Burn } from './burn';
import { RegularNft as Find } from './find';
import { RegularNft as Freeze } from './freeze';
import { RegularNft as GasLessMint } from './gas-less-mint';
import { RegularNft as GasLessTransfer } from './gas-less-transfer';
import { RegularNft as Mint } from './mint';
import { RegularNft as MintCollection } from './mint-collection';
import { RegularNft as Thaw } from './thaw';
import { RegularNft as Transfer } from './transfer';

/** @namespace */
export const RegularNft = {
  ...Burn,
  ...Find,
  ...Freeze,
  ...GasLessMint,
  ...GasLessTransfer,
  ...Mint,
  ...MintCollection,
  ...Thaw,
  ...Transfer,
};
