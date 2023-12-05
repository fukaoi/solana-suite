import { TransactionGenerator as Batch } from './batch';
import { TransactionGenerator as Common } from './common';
import { TransactionGenerator as Mint } from './mint';
import { TransactionGenerator as PartialSign } from './partial-sign';
import '~/types/global';
import '~/global';
export {StructTransaction} from './common';

export const TransactionGenerator = {
  ...Batch,
  ...Mint,
  ...Common,
  ...PartialSign,
};
