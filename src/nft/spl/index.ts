import {
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {
  Keypair,
  PublicKey,
  TransactionSignature,
} from '@solana/web3.js';

import {Transaction, SplToken, Node, Result} from '../../';

export namespace SplNft {

  const NFT_AMOUNT = 1;
  const NFT_DECIMAL = 0;

  export const create = (
    source: PublicKey,
    feePayer: Keypair,
  ): Promise<Result<string, Error>> => {
    return SplToken.mint(
      source,
      feePayer,
      NFT_AMOUNT,
      NFT_DECIMAL,
    );
  }

  export const transfer = (
    tokenKey: PublicKey,
    source: PublicKey,
    dest: PublicKey,
  ) => async (append: Transaction.AppendValue)
      : Promise<Result<TransactionSignature, Error>> => {
      const token = new Token(Node.getConnection(), tokenKey, TOKEN_PROGRAM_ID, append.signers[0]);
      const sourceToken = await token.getOrCreateAssociatedAccountInfo(source)
        .then(Result.ok)
        .catch(Result.err);

      if (sourceToken.isErr) return Result.err(sourceToken.error);

      const destToken = await token.getOrCreateAssociatedAccountInfo(dest)
        .then(Result.ok)
        .catch(Result.err);

      if (destToken.isErr) return Result.err(destToken.error);

      const param = Token.createTransferCheckedInstruction(
        TOKEN_PROGRAM_ID,
        sourceToken.value.address,
        tokenKey,
        destToken.value.address,
        source,
        append.signers,
        NFT_AMOUNT,
        NFT_DECIMAL
      );

      const instructions =
        append.txInstructions
          ? new Array(append.txInstructions, [param]).flat()
          : [param];

      return await Transaction.sendInstruction()
        ({
          signers: append.signers,
          txInstructions: instructions
        });
    }
}
