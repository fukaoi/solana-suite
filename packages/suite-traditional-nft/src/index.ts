import 'types/global';
import { TraditionalNft as Burn } from './burn';
import { TraditionalNft as Find } from './find';
import { TraditionalNft as Freeze } from './freeze';
import { TraditionalNft as FeePayer } from './fee-payer-partial-sign-mint';
import { TraditionalNft as FeePayerTransfer } from './fee-payer-partial-sign-transfer';
import { TraditionalNft as Mint } from './mint';
import { TraditionalNft as Thaw } from './thaw';
import { TraditionalNft as Transfer } from './transfer';

export const TraditionalNft = {
  ...Burn,
  ...Find,
  ...Freeze,
  ...FeePayer,
  ...FeePayerTransfer,
  ...Mint,
  ...Thaw,
  ...Transfer,
};
