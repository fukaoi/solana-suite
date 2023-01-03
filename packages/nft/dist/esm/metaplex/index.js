import { Metaplex as Mint } from './mint';
import { Metaplex as Find } from './find';
import { Metaplex as FreePayer } from './fee-payer-partial-sign-mint';
import { Metaplex as Royalty } from './royalty';
import { Metaplex as Transfer } from './transfer';
export const Metaplex = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Mint), Find), FreePayer), Royalty), Transfer);
