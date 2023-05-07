import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { debugLog, Node, Pubkey, Result } from '@solana-suite/shared';
import { UserSideOutput } from './types/';

//@internal
export namespace Signatures {
  const parseForTransaction = async (
    signature: string
  ): Promise<ParsedTransactionWithMeta> => {
    const res = await Node.getConnection().getParsedTransaction(signature);
    if (!res) {
      return {} as ParsedTransactionWithMeta;
    }
    return res;
  };

  export const getForAdress = async (
    pubkey: Pubkey,
    parser: (
      transaction: ParsedTransactionWithMeta
    ) => UserSideOutput.History | undefined,
    callback: (history: Result<UserSideOutput.History, Error>) => void,
    narrowDown: number,
    receiveLimit?: number
  ): Promise<void> => {
    try {
      const transactions = await Node.getConnection().getSignaturesForAddress(
        pubkey.toPublicKey(),
        {
          limit: narrowDown,
        }
      );

      debugLog('# transactions count:', transactions.length);

      // don't use  Promise.all, this is sync action
      let i = 1;
      for await (const transaction of transactions) {
        const signature = await parseForTransaction(transaction.signature);
        const history = parser(signature);
        if (history) {
          callback(Result.ok(history));
          i++;
        }
        if (receiveLimit && i > receiveLimit) {
          break;
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
