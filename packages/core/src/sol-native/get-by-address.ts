import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { debugLog, Node, Pubkey } from '@solana-suite/shared';

//@internal
export namespace SolNative {
  const get = async (signature: string): Promise<ParsedTransactionWithMeta> => {
    const res = await Node.getConnection().getParsedTransaction(signature);
    if (!res) {
      return {} as ParsedTransactionWithMeta;
    }
    return res;
  };

  export const getByAddress = async (
    pubkey: Pubkey,
    parser?: (transaction: ParsedTransactionWithMeta) => void,
    limit?: number | undefined,
    before?: string | undefined,
    until?: string | undefined
  ): Promise<ParsedTransactionWithMeta[]> => {
    const transactions = await Node.getConnection().getSignaturesForAddress(
      pubkey.toPublicKey(),
      {
        limit,
        before,
        until,
      }
    );

    debugLog('# transactions count:', transactions.length);

    let results: ParsedTransactionWithMeta[] = [];
    // don't use  Promise.all, this is sync action
    for await (const transaction of transactions) {
      const signature = await get(transaction.signature);
      // parser(signature);
      results.push(signature);
    }

    return results;
  };
}
