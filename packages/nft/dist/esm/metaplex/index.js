import { Metaplex as Mint } from './mint';
import { Metaplex as Find } from './find';
import { Metaplex as Transfer } from './transfer';
export const Metaplex = Object.assign(Object.assign(Object.assign({}, Mint), Find), Transfer);
export * from './royalty';
