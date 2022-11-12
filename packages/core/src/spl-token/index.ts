import { SplToken as Burn } from './burn';
import { SplToken as Find } from './find';
import { SplToken as FeePayer } from './fee-payer-partial-sign-transfer';
import { SplToken as History } from './history';
import { SplToken as Mint } from './mint';
import { SplToken as Transfer } from './transfer';

export const SplToken = {
  ...Burn,
  ...History,
  ...Find,
  ...FeePayer,
  ...Mint,
  ...Transfer,
};
