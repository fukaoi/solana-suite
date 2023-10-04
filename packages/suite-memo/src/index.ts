import { Memo as Create } from './create';
import { Memo as History } from './history';
import '~/shared';
import '~/instruction';

export const Memo = { ...Create, ...History };


