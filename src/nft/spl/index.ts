import {
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {Util} from '../../util';
import {SplToken} from '../../spl-token';

export namespace SplNft {

  const NFT_AMOUNT = 1;
  const NFT_DECIMAL = 0;

  export const create = (
    sourceSecret: string,
    authority: string = Util.createKeypair(sourceSecret).publicKey.toBase58(),
  ): Promise<string> => {
    return SplToken.create(
      sourceSecret,
      NFT_AMOUNT,
      NFT_DECIMAL,
      authority
    );
  }

  export const transfer = async (
    tokenKey: string,
    sourceSecret: string,
    destPubkey: string,
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    return SplToken.transfer(
      tokenKey,
      sourceSecret,
      destPubkey,
      NFT_AMOUNT,
      instruction
    );
  }
}
