import {SplToken as Burn} from './burn';
import {SplToken as Find} from './find';
import {SplToken as Mint} from './mint';
import {SplToken as Transfer} from './transfer';

export const SplToken = {...Burn, ...Find, ...Mint, ...Transfer};
