import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { Node } from 'node';
import { debugLog, Result, sleep } from 'shared';
import { Pubkey } from 'types/account';
import { UserSideOutput } from 'types/core';

//@internal
export namespace Signatures {
  const parseForTransaction = async (
    signature: string,
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
      transaction: ParsedTransactionWithMeta,
    ) => UserSideOutput.History | undefined,
    callback: (history: Result<UserSideOutput.History[], Error>) => void,
    options: {
      waitTime: number;
      narrowDown: number;
    },
    histories: UserSideOutput.History[] = [],
  ): Promise<void> => {
    try {
      debugLog('# options: ', options);
      const transactions = await Node.getConnection().getSignaturesForAddress(
        pubkey.toPublicKey(),
        {
          limit: options.narrowDown,
        },
      );

      debugLog('# transactions count:', transactions.length);

      for (const transaction of transactions) {
        parseForTransaction(transaction.signature)
          .then((signature) => {
            const history = parser(signature);
            if (history) {
              histories.push(history);
              callback(Result.ok(histories));
            }
          })
          .catch((e) => callback(Result.err(e)));
        await sleep(options.waitTime); // avoid 429 error
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
