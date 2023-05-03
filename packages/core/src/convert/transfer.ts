import { ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';

import {
  DirectionFilter,
  InfraSideOutput,
  MappingTokenAccount,
  UserSideOutput,
  WithMemo,
} from '../types/';

import { Convert as _Shared } from './shared';

export namespace Convert.Transfer {
  export const intoUserSide = (
    searchKey: PublicKey,
    output: InfraSideOutput.Transfer,
    meta: ParsedTransactionWithMeta,
    directionFilter?: DirectionFilter,
    mappingTokenAccount?: MappingTokenAccount[],
    isToken?: boolean,
    withMemos?: WithMemo[]
  ): UserSideOutput.History | undefined => {
    const history: UserSideOutput.History = {};

    if (isToken && mappingTokenAccount && output.program === 'spl-token') {
      const foundSource = mappingTokenAccount.find(
        (m) => m.account === output.parsed.info.source
      );
      const foundDest = mappingTokenAccount.find(
        (m) => m.account === output.parsed.info.destination
      );

      foundSource && (history.source = foundSource.owner);
      foundDest && (history.destination = foundDest.owner);
    }

    history.sol = output.parsed.info.lamports?.toSol();
    history.date = _Shared.Shared.convertTimestampToDate(
      meta.blockTime as number
    );
    history.sig = meta.transaction.signatures[0];
    history.innerInstruction = false;
    if (withMemos && withMemos.length > 0) {
      const finded = withMemos.find(
        (obj) => obj.sig === meta.transaction.signatures
      );
      finded && (history.memo = finded.memo);
    }

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
