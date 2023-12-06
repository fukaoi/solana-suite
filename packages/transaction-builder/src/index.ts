import { TransactionBuilder as Batch } from './batch';
import { TransactionBuilder as Common } from './common';
import { TransactionBuilder as Mint } from './mint';
import { TransactionBuilder as PartialSign } from './partial-sign';
import { TransactionBuilder as CalculateTxsize } from './calculate-txsize';
import '~/types/global';
import '~/global';

export const TransactionBuilder = {
  ...Batch,
  ...CalculateTxsize,
  ...Mint,
  ...Common,
  ...PartialSign,
};
