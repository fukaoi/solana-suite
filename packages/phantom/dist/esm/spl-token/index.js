import { PhantomSplToken as Add } from './add';
import { PhantomSplToken as Mint } from './mint';
export const PhantomSplToken = Object.assign(Object.assign({}, Add), Mint);
