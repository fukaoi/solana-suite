import { ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';

import {
  DirectionFilter,
  InfraSideOutput,
  PostTokenAccount,
  UserSideOutput,
} from '../types/';

import { Convert as _Shared } from './shared';

export namespace Convert.Transfer {
  export const intoUserSide = (
    searchKey: PublicKey,
    output: InfraSideOutput.Transfer,
    meta: ParsedTransactionWithMeta,
    directionFilter?: DirectionFilter,
    mappingTokenAccount?: PostTokenAccount[]
  ): UserSideOutput.History | undefined => {
    const history: UserSideOutput.History = {};

    // validation check
    if (!output.parsed.info.destination || !output.parsed.info.lamports) {
      return;
    }

    if (mappingTokenAccount && output.program === 'spl-token') {
      const foundSource = mappingTokenAccount.find(
        (m) => m.account === output.parsed.info.source
      );
      const foundDest = mappingTokenAccount.find(
        (m) => m.account === output.parsed.info.destination
      );
      foundSource && (history.source = foundSource.owner);
      foundDest && (history.destination = foundDest.owner);
    } else {
      history.source = output.parsed.info.source;
      history.destination = output.parsed.info.destination;
    }

    history.sol = output.parsed.info.lamports?.toSol();
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

    if (!directionFilter) {
      return history;
    }

    if (history[directionFilter] === searchKey.toString()) {
      return history;
    }
  };
}
