import {Metaplex as Mint} from './mint';
import {Metaplex as Find} from './find';
import {Metaplex as Transfer} from './transfer';

export const Metaplex = {...Mint, ...Find, ...Transfer,};

