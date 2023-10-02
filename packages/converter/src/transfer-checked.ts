import { ParsedTransactionWithMeta } from '@solana/web3.js';
import {
  CoreInfraSideOutput,
  CoreUserSideOutput,
  PostTokenAccount,
} from '~/types/core';
import { convertTimestampToDateTime } from '~/shared';

export namespace Converter {
  export namespace TransferChecked {
    export const intoUserSide = (
      output: CoreInfraSideOutput.TransferChecked,
      meta: ParsedTransactionWithMeta,
      mappingTokenAccount?: PostTokenAccount[],
    ): CoreUserSideOutput.History | undefined => {
      const history: CoreUserSideOutput.History = {};

      if (mappingTokenAccount) {
        const foundSource = mappingTokenAccount.find(
          (m) => m.account === output.parsed.info.source,
        );
        const foundDest = mappingTokenAccount.find(
          (m) => m.account === output.parsed.info.destination,
        );
        foundSource && (history.source = foundSource.owner);
        foundDest && (history.destination = foundDest.owner);
      }

      history.tokenAmount = output.parsed.info.tokenAmount;
      history.mint = output.parsed.info.mint;
      history.multisigAuthority = output.parsed.info.multisigAuthority;
      history.signers = output.parsed.info.signers;
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
}
