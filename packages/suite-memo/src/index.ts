import { Memo as Create } from './create';
import { Memo as History } from './history';
import '~/types/instruction';
import '~/instruction';

export const Memo = { ...Create, ...History };
