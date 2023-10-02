import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { CoreInfraSideOutput, CoreUserSideOutput } from '~/types/core';
import { convertTimestampToDateTime } from '~/shared';

export namespace Convert.Transfer {
  export const intoUserSide = (
    output: CoreInfraSideOutput.Transfer,
    meta: ParsedTransactionWithMeta,
  ): CoreUserSideOutput.History | undefined => {
    const history: CoreUserSideOutput.History = {};

    // validation check
    if (!output.parsed.info.destination || !output.parsed.info.lamports) {
      return;
    }

    history.source = output.parsed.info.source;
    history.destination = output.parsed.info.destination;
    history.sol = output.parsed.info.lamports?.toSol().toString();
    history.type = output.program;
    history.dateTime = convertTimestampToDateTime(meta.blockTime as number);
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
