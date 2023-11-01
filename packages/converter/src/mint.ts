import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { MintTo } from '~/types/transaction-filter';
import { History } from '~/types/history';
import { convertTimestampToDateTime } from '~/shared';

export namespace Converter {
  export namespace Mint {
    export const intoUserSide = (
      output: MintTo,
      meta: ParsedTransactionWithMeta,
    ): History | undefined => {
      const history: History = {};

      history.mint = output.parsed.info.mint;
      history.mintAuthority = output.parsed.info.mintAuthority;
      history.tokenAmount = output.parsed.info.tokenAmount;
      history.account = output.parsed.info.account as string;
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
}
