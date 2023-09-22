import { SplToken as Add } from './add';
import { SplToken as Burn } from './burn';
import { SplToken as Find } from './find';
import { SplToken as Freeze } from './freeze';
import { SplToken as FeePayer } from './fee-payer-partial-sign-transfer';
import { SplToken as History } from './history';
import { SplToken as Mint } from './mint';
import { SplToken as Thaw } from './thaw';
import { SplToken as Transfer } from './transfer';

export const SplToken = {
  ...Add,
  ...Burn,
  ...Find,
  ...Freeze,
  ...FeePayer,
  ...History,
  ...Mint,
  ...Thaw,
  ...Transfer,
};
