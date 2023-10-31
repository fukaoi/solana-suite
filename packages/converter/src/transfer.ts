import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { InfraOutput } from '~/types/converter';
import { History } from '~/types/history';
import { convertTimestampToDateTime } from '~/shared';

export namespace Converter {
  export namespace Transfer {
    export const intoUserSide = (
      output: InfraOutput.Transfer,
      meta: ParsedTransactionWithMeta,
    ): History | undefined => {
      const history: History = {};

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
}
