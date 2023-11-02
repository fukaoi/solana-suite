import { SolNative as Find } from './find';
import { SolNative as FeePayer } from './fee-payer-partial-sign-transfer';
import { SolNative as Transfer } from './transfer';
import { SolNative as TransferWithMultisig } from './transfer-with-multisig';
import '~/types/transaction';
import '~/transaction';

export const SolNative = {
  ...Find,
  ...FeePayer,
  ...Transfer,
  ...TransferWithMultisig,
};
export * from '~/shared/exports';
