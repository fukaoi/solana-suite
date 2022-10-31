import { Instruction as PartialSignSubmit } from './partial-sign-submit';
import { Instruction as Submit } from './submit';

export const Instruction = {...Submit, ...PartialSignSubmit };
