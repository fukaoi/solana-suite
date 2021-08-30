import {
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {Util} from '../../util';
import {SplToken} from '../../spl-token';

export namespace NftSpl {

  const NFT_AMOUNT = 1;
  const NFT_DECIMAL = 0;

  interface CreateResponse {
    tokenId: string,
  }

  export const createNft = (
    sourceSecret: string,
    authority: string = Util.createKeypair(sourceSecret).publicKey.toBase58(),
  ): Promise<CreateResponse> => {
    return SplToken.create(
      sourceSecret,
      NFT_AMOUNT,
      NFT_DECIMAL,
      authority
    );
  }

  export const transferNft = async (
    tokenId: string,
    sourceSecret: string,
    destPubkey: string,
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    return SplToken.transfer(
      tokenId,
      sourceSecret,
      destPubkey,
      NFT_AMOUNT,
      instruction
    );
  }
}
