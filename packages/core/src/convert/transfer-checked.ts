import { ParsedTransactionWithMeta } from '@solana/web3.js';

import { InfraSideOutput, PostTokenAccount, UserSideOutput } from '../types/';

import { Convert as _Shared } from './shared';

export namespace Convert.TransferChecked {
  export const intoUserSide = (
    output: InfraSideOutput.TransferChecked,
    meta: ParsedTransactionWithMeta,
    mappingTokenAccount?: PostTokenAccount[]
  ): UserSideOutput.History | undefined => {
    const history: UserSideOutput.History = {};

    if (mappingTokenAccount) {
      const foundSource = mappingTokenAccount.find(
        (m) => m.account === output.parsed.info.source
      );
      const foundDest = mappingTokenAccount.find(
        (m) => m.account === output.parsed.info.destination
      );
      foundSource && (history.source = foundSource.owner);
      foundDest && (history.destination = foundDest.owner);
    }

    history.tokenAmount = output.parsed.info.tokenAmount;
    history.mint = output.parsed.info.mint;
    history.multisigAuthority = output.parsed.info.multisigAuthority;
    history.signers = output.parsed.info.signers;
    history.type = output.program;
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
