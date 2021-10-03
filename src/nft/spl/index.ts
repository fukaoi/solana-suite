import {
  Keypair,
  PublicKey,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {SplToken} from '../../spl-token';

export namespace SplNft {

  const NFT_AMOUNT = 1;
  const NFT_DECIMAL = 0;

  export const create = (
    source: Keypair,
    authority: PublicKey = source.publicKey,
  ): Promise<string> => {
    return SplToken.create(
      source,
      NFT_AMOUNT,
      NFT_DECIMAL,
      authority
    );
  }

  export const transfer = async (
    tokenKey: PublicKey,
    source: Keypair,
    dest: PublicKey,
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    return SplToken.transfer(
      tokenKey,
      source,
      dest,
      NFT_AMOUNT,
      instruction
    );
  }
}
