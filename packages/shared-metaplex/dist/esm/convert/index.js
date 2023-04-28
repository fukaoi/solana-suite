import { Convert as Collection } from './collection';
import { Convert as Creators } from './creators';
import { Convert as NftMetadata } from './nft-metadata';
import { Convert as Properties } from './properties';
import { Convert as TokenMetadata } from './token-metadata';
export const Convert = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Collection), Creators), NftMetadata), Properties), TokenMetadata);
//# sourceMappingURL=index.js.map