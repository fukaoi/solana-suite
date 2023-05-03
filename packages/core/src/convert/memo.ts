import { ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';

import { DirectionFilter, InfraSideOutput, UserSideOutput } from '../types/';

import { Convert as _Shared } from './shared';

export namespace Convert.Memo {
  export const intoUserSide = (
    searchKey: PublicKey,
    output: InfraSideOutput.Memo,
    value: ParsedTransactionWithMeta,
    directionFilter?: DirectionFilter
  ): UserSideOutput.History | undefined => {
    const history: UserSideOutput.History = {};

    history.memo = output.parsed as string;
    history.type = output.program;
    history.date = _Shared.Shared.convertTimestampToDate(
      value.blockTime as number
    );
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
