import { SplToken as Burn } from './burn';
import { SplToken as Find } from './find';
import { SplToken as History } from './history';
import { SplToken as Mint } from './mint';
import { SplToken as Transfer } from './transfer';
export const SplToken = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Burn), History), Find), Mint), Transfer);
