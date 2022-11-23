import { SplTokenPhantom as Add } from './add';
import { SplTokenPhantom as Mint } from './mint';
export const SplToken = Object.assign(Object.assign({}, Add), Mint);
