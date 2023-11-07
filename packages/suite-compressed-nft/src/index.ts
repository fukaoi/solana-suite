import { CompressedNft as Tree } from './tree';
import { CompressedNft as Collection } from './mint-collection';

import '~/types/transaction';
import '~/transaction';

export const CompressedNft = { ...Tree, ...Collection };
export * from '~/shared/exports';
