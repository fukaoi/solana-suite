import { SolNative as Find } from './find';
import { SolNative as History } from './history';
import { SolNative as Transfer } from './transfer';

export const SolNative = { ...Find, ...History, ...Transfer };
