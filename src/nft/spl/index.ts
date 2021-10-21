import {
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {
  Keypair,
  PublicKey,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {Transaction, SplToken, Node, Result} from '../../';

export namespace SplNft {

  const NFT_AMOUNT = 1;
  const NFT_DECIMAL = 0;

  export const create = (
    source: Keypair,
    authority: PublicKey = source.publicKey,
  ): Promise<Result<string, Error>> => {
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
  ): Promise<Result<TransactionSignature, Error>> => {
    const token = new Token(Node.getConnection(), tokenKey, TOKEN_PROGRAM_ID, source);
    const sourceTokenAccount = (await token.getOrCreateAssociatedAccountInfo(source.publicKey)).address;
    const destTokenAccount = (await token.getOrCreateAssociatedAccountInfo(dest)).address;

    const param = Token.createTransferCheckedInstruction(
      TOKEN_PROGRAM_ID,
      sourceTokenAccount,
      tokenKey,
      destTokenAccount,
      source.publicKey,
      [source],
      NFT_AMOUNT,
      NFT_DECIMAL
    );

    const instructions = instruction ? new Array(param, instruction) : [param];
    return Transaction.sendInstructions(
      [source],
      instructions
    );
  }
}
