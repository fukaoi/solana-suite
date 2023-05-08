import { ParsedTransactionWithMeta } from '@solana/web3.js';

import {
  InfraSideOutput,
  PostTokenAccount,
  UserSideOutput,
} from '../types/';

import { Convert as _Shared } from './shared';

export namespace Convert.Memo {
  export const intoUserSide = (
    output: InfraSideOutput.Memo,
    outputTransfer: InfraSideOutput.Transfer,
    meta: ParsedTransactionWithMeta,
    mappingTokenAccount?: PostTokenAccount[]
  ): UserSideOutput.History | undefined => {
    const history: UserSideOutput.History = {};

    // case: transfer with memo
    if (outputTransfer.program !== '') {
      if (mappingTokenAccount && outputTransfer.program === 'spl-token') {
        const foundSource = mappingTokenAccount.find(
          (m) => m.account === outputTransfer.parsed.info.source
        );
        const foundDest = mappingTokenAccount.find(
          (m) => m.account === outputTransfer.parsed.info.destination
        );

        foundSource && (history.source = foundSource.owner);
        foundDest && (history.destination = foundDest.owner);
      } else {
        history.source = outputTransfer.parsed.info.source;
        history.destination = outputTransfer.parsed.info.destination;
      }
    }

    history.memo = output.parsed as string;
    history.type = output.program;
    history.date = _Shared.Shared.convertTimestampToDate(
      meta.blockTime as number
    );
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