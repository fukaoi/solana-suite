import { ParsedTransactionWithMeta } from '@solana/web3.js';

import { InfraSideOutput, UserSideOutput } from '../types/';

import { Convert as _Shared } from './shared';

export namespace Convert.Mint {
  export const intoUserSide = (
    output: InfraSideOutput.MintTo,
    value: ParsedTransactionWithMeta
  ): UserSideOutput.History | undefined => {
    const history: UserSideOutput.History = {};

    history.mint = output.parsed.info.mint;
    history.mintAuthority = output.parsed.info.mintAuthority;
    history.tokenAmount = output.parsed.info.tokenAmount;
    history.account = output.parsed.info.account;
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
    return history;
  };
}
