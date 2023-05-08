import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { debugLog, Node, Pubkey, Result, sleep } from '@solana-suite/shared';
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
    callback: (history: Result<UserSideOutput.History[], Error>) => void,
    narrowDown: number = 1000
  ): Promise<void> => {
    try {
      const transactions = await Node.getConnection().getSignaturesForAddress(
        pubkey.toPublicKey(),
        {
          limit: narrowDown,
        }
      );

      debugLog('# transactions count:', transactions.length);
      let histories: UserSideOutput.History[] = [];

      // don't use  Promise.all, this is sync action
      // let i = 1;
      // for (const transaction of transactions) {
      //   const signature = await parseForTransaction(transaction.signature);
      //   const history = parser(signature);
      //   if (history) {
      //     histories.push(history);
      //     callback(Result.ok(histories));
      //     i++;
      //   }
      //   if (receiveLimit && i > receiveLimit) {
      //     break;
      //   }
      // }

      for (const transaction of transactions) {
        parseForTransaction(transaction.signature).then((signature) => {
          const history = parser(signature);
          if (history) {
            histories.push(history);
            callback(Result.ok(histories));
          }
        });
        await sleep(0.05); // avoid 429 error
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
