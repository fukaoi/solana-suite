import { ParsedTransactionWithMeta } from '@solana/web3.js';

import { InfraSideOutput, UserSideOutput } from '../types/';

import { Convert as _Shared } from './shared';

export namespace Convert.Transfer {
  export const intoUserSide = (
    output: InfraSideOutput.Transfer,
    meta: ParsedTransactionWithMeta
  ): UserSideOutput.History | undefined => {
    const history: UserSideOutput.History = {};

    // validation check
    if (!output.parsed.info.destination || !output.parsed.info.lamports) {
      return;
    }

    history.source = output.parsed.info.source;
    history.destination = output.parsed.info.destination;
    history.sol = output.parsed.info.lamports?.toSol().toString();
    history.date = _Shared.Shared.convertTimestampToDate(
      meta.blockTime as number
    );
    history.sig = meta.transaction.signatures[0];
    history.innerInstruction = false;

    // inner instructions
    if (
      meta.meta?.innerInstructions &&
      meta.meta?.innerInstructions.length !== 0
    ) {
      history.innerInstruction = true;
    }

    return history;
  };
}
