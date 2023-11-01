import { SplToken as Add } from './add';
import { SplToken as Burn } from './burn';
import { SplToken as Find } from './find';
import { SplToken as Freeze } from './freeze';
import { SplToken as FeePayer } from './fee-payer-partial-sign-transfer';
import { SplToken as Mint } from './mint';
import { SplToken as Thaw } from './thaw';
import { SplToken as Transfer } from './transfer';
import '~/types/instruction';
import '~/instruction';

export const SplToken = {
  ...Add,
  ...Burn,
  ...Find,
  ...Freeze,
  ...FeePayer,
  ...Mint,
  ...Thaw,
  ...Transfer,
};

export * from '~/shared/exports';
