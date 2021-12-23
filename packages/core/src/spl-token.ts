import {
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';


import {
  PublicKey,
  Signer,
} from '@solana/web3.js';

import {Node, Result, Instruction} from '@solana-suite/shared';

export namespace SplToken {

  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const mint = async (
    owner: PublicKey,
    signers: Signer[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    !feePayer && (feePayer = signers[0]);

    const tokenRes = await Token.createMint(
      Node.getConnection(),
      feePayer,
      owner,
      owner,
      mintDecimal,
      TOKEN_PROGRAM_ID
    )
      .then(Result.ok)
      .catch(Result.err);

    if (tokenRes.isErr) {
      return Result.err(tokenRes.error);
    }

    const token = tokenRes.value;

    const tokenAssociated =
      await token.getOrCreateAssociatedAccountInfo(owner)
        .then(Result.ok)
        .catch(Result.err);

    if (tokenAssociated.isErr) {
      return Result.err(tokenAssociated.error);
    }

    const inst = Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      token.publicKey,
      tokenAssociated.value.address,
      owner,
      signers,
      totalAmount
    );

    return Result.ok(
      new Instruction(
        [inst],
        signers,
        feePayer,
        token.publicKey.toBase58()
      )
    );
  }

  export const transfer = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    mintDecimal: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    !feePayer && (feePayer = signers[0]);

    const token = new Token(
      Node.getConnection(),
      tokenKey,
      TOKEN_PROGRAM_ID,
      feePayer
    );

    const sourceToken = await token.getOrCreateAssociatedAccountInfo(owner)
      .then(Result.ok)
      .catch(Result.err);

    if (sourceToken.isErr) {
      return Result.err(sourceToken.error);
    }

    const destToken = await token.getOrCreateAssociatedAccountInfo(dest)
      .then(Result.ok)
      .catch(Result.err);

    if (destToken.isErr) {
      return Result.err(destToken.error);
    }

    const inst = Token.createTransferCheckedInstruction(
      TOKEN_PROGRAM_ID,
      sourceToken.value.address,
      tokenKey,
      destToken.value.address,
      owner,
      signers,
      amount,
      mintDecimal
    );

    return Result.ok(
      new Instruction(
        [inst],
        signers,
        feePayer
      ));
  }

  export const transferNft = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {
    return transfer(
      tokenKey,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  }
}
