import { Memo as Create } from './create';
import { Memo as History } from './history';
import '~/types/instruction';
import '~/instruction';

export * from  '~/shared/exports';
export const Memo = { ...Create, ...History };
