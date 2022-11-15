import {
  PublicKey,
  ParsedTransactionWithMeta,
} from '@solana/web3.js';

import { Node } from '@solana-suite/shared';

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
    pubkey: PublicKey,
    limit?: number | undefined,
    before?: string | undefined,
    until?: string | undefined
  ): Promise<ParsedTransactionWithMeta[]> => {
    const transactions = await Node.getConnection().getSignaturesForAddress(
      pubkey,
      {
        limit,
        before,
        until,
      }
    );

    const signatures = transactions.map((tx) => get(tx.signature));
    return await Promise.all(signatures);
  };
}
