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
    const history: UserSideOutput.History = {};

    history.memo = instruction.parsed as string;
    history.type = instruction.program;
    history.date = _Shared.Shared.convertTimestampToDate(value.blockTime as number);
    history.sig = value.transaction.signatures[0];
    history.innerInstruction = false;
    if (
      value.meta?.innerInstructions &&
      value.meta?.innerInstructions.length !== 0
    ) {
      // inner instructions
      history.innerInstruction = true;
    }

    if (directionFilter) {
      if (history[directionFilter] === searchKey.toString()) {
        return history;
      }
    } else {
      return history;
    }
  };
}
