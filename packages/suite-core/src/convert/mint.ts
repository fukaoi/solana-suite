import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { CoreInfraSideOutput, CoreUserSideOutput } from '~/types/core';
import { convertTimestampToDateTime } from '~/shared';

export namespace Convert.Mint {
  export const intoUserSide = (
    output: CoreInfraSideOutput.MintTo,
    meta: ParsedTransactionWithMeta,
  ): CoreUserSideOutput.History | undefined => {
    const history: CoreUserSideOutput.History = {};

    history.mint = output.parsed.info.mint;
    history.mintAuthority = output.parsed.info.mintAuthority;
    history.tokenAmount = output.parsed.info.tokenAmount;
    history.account = output.parsed.info.account;
    history.type = output.program;
    history.dateTime = convertTimestampToDateTime(meta.blockTime as number);
    history.sig = meta.transaction.signatures[0];
    history.innerInstruction = false;
    if (
      meta.meta?.innerInstructions &&
      meta.meta?.innerInstructions.length !== 0
    ) {
      // inner instructions
      history.innerInstruction = true;
    }
    return history;
  };
}
