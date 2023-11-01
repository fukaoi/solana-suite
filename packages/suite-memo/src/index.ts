import { Memo as Create } from './create';
import { Memo as Find } from './find';
import '~/types/instruction';
import '~/instruction';

export * from '~/shared/exports';
export const Memo = { ...Create, ...Find };
