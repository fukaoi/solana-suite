import {
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PublicKey,
} from '@solana/web3.js';

import { DirectionFilter, UserSideOutput } from '../types/';

import { Convert as _Shared } from './shared';

export namespace Convert.MintTo {
  export const intoUserSide = (
    searchKey: PublicKey,
    instruction: ParsedInstruction,
    value: ParsedTransactionWithMeta,
    directionFilter?: DirectionFilter
  ): UserSideOutput.History | undefined => {
    const v: UserSideOutput.History = {
      info: {},
      type: '',
      sig: '',
      date: new Date(),
      innerInstruction: false,
    };
    v.memo = instruction.parsed as string;
    v.type = instruction.program;
    v.date = _Shared.Shared.convertTimestampToDate(value.blockTime as number);
    v.sig = value.transaction.signatures[0];
    v.innerInstruction = false;
    if (
      value.meta?.innerInstructions &&
      value.meta?.innerInstructions.length !== 0
    ) {
      // inner instructions
      v.innerInstruction = true;
    }

    if (directionFilter) {
      if (v.info[directionFilter] === searchKey.toString()) {
        return v;
      }
    } else {
      return v;
    }
  };
}
