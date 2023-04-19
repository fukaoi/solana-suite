import { Metaplex as Burn } from './burn';
import { Metaplex as Find } from './find';
import { Metaplex as FeePayer } from './fee-payer-partial-sign-mint';
import { Metaplex as FeePayerTransfer } from './fee-payer-partial-sign-transfer';
import { Metaplex as Mint } from './mint';
import { Metaplex as Transfer } from './transfer';

export const Metaplex = {
  ...Burn,
  ...Find,
  ...FeePayer,
  ...FeePayerTransfer,
  ...Mint,
  ...Transfer,
};
