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
    limit?: number | undefined,
    before?: string | undefined,
    until?: string | undefined
  ): Promise<void> => {
    try {
      const transactions = await Node.getConnection().getSignaturesForAddress(
        pubkey.toPublicKey(),
        {
          limit,
          before,
          until,
        }
      );

      debugLog('# transactions count:', transactions.length);

      // don't use  Promise.all, this is sync action
      for await (const transaction of transactions) {
        const signature = await parseForTransaction(transaction.signature);
        const history = parser(signature);
        if (history) {
          callback(Result.ok(history));
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
