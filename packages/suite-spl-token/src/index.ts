import { SplToken as Add } from './add';
import { SplToken as Burn } from './burn';
import { SplToken as Find } from './find';
import { SplToken as Freeze } from './freeze';
import { SplToken as GasLess } from './gas-less-transfer';
import { SplToken as Mint } from './mint';
import { SplToken as Thaw } from './thaw';
import { SplToken as Transfer } from './transfer';

/** @namespace */
export const SplToken = {
  ...Add,
  ...Burn,
  ...Find,
  ...Freeze,
  ...GasLess,
  ...Mint,
  ...Thaw,
  ...Transfer,
};
