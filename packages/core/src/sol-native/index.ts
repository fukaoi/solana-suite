import { SolNative as Find } from './find';
import { SolNative as FeePayer } from './fee-payer-partial-sign-transfer';
import { SolNative as History } from './history';
import { SolNative as Transfer } from './transfer';
import { SolNative as TransferWithMultisig } from './transfer-with-multisig';

export const SolNative = {
  ...Find,
  ...FeePayer,
  ...History,
  ...Transfer,
  ...TransferWithMultisig,
};
