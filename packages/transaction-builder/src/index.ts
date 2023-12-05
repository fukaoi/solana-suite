import { TransactionBuilder as Batch } from './batch';
import { TransactionBuilder as Common } from './common';
import { TransactionBuilder as Mint } from './mint';
import { TransactionBuilder as PartialSign } from './partial-sign';
import '~/types/global';
import '~/global';
export { StructTransaction } from './common';

export const TransactionBuilder = {
  ...Batch,
  ...Mint,
  ...Common,
  ...PartialSign,
};
