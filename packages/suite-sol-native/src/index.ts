import { SolNative as Find } from './find';
import { SolNative as GasLess } from './gas-less-transfer';
import { SolNative as Transfer } from './transfer';
import { SolNative as TransferWithMultisig } from './transfer-with-multisig';
import '~/types/transaction';
import '~/transaction';

export const SolNative = {
  ...Find,
  ...GasLess,
  ...Transfer,
  ...TransferWithMultisig,
};
export * from '~/shared/exports';
