import {
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {SplNft} from '../spl/spl-nft';

export namespace Metaplex {
  export const transfer = async (
    tokenKey: string,
    sourceSecret: string,
    destPubKey: string,
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {

    return await SplNft.transfer(
      tokenKey,
      sourceSecret,
      destPubKey,
      instruction
    );
  }
}
