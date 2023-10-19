import { Multisig as Create } from './create';
import { Multisig as GetInfo } from './get-info';
import { Multisig as IsAddress } from './is-address';
import '~/types/instruction';
import '~/instruction';

export const Multisig = { ...Create, ...GetInfo, ...IsAddress };
export * from '~/shared/exports';
