import {
  Token,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';

import {
  Account,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {Util} from './util';
import {_Transaction} from './_transaction';

export namespace SplToken {

  const NFT_AMOUNT = 1;
  const NFT_DECIMAL = 0;

  interface CreateResponse {
    tokenId: string,
  }

  export const create = async (
    sourceKeypair: Keypair,
    totalAmount: number,
    decimal: number,
    authority: string = sourceKeypair.publicKey.toBase58(),
  ): Promise<CreateResponse> => {
    const connection = Util.getConnection();
    const signer = new Account(sourceKeypair.secretKey);
    const authorityPubKey = new PublicKey(authority);

    const token = await Token.createMint(
      connection,
      signer,
      authorityPubKey,
      null,
      decimal,
      TOKEN_PROGRAM_ID
    );

    const tokenAccount = await token.createAssociatedTokenAccount(signer.publicKey);

    await token.mintTo(
      tokenAccount,
      authorityPubKey,
      [],
      totalAmount,
    );

    return {tokenId: token.publicKey.toBase58()};
  }

  export const createNft = (
    sourceKeypair: Keypair,
    authority: string = sourceKeypair.publicKey.toBase58(),
  ): Promise<CreateResponse> => {
    return create(
      sourceKeypair,
      NFT_AMOUNT,
      NFT_DECIMAL,
      authority
    );
  }

  export const transferNft = async (
    tokenId: string,
    sourceKeypair: Keypair,
    destination: string,
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    return transfer(
      tokenId,
      sourceKeypair,
      destination,
      NFT_AMOUNT,
      instruction
    );
  }

  export const transfer = async (
    tokenId: string,
    sourceKeypair: Keypair,
    destination: string,
    amount: number,
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    const tokenPubkey = new PublicKey(tokenId);
    const destPubkey = new PublicKey(destination);
    const signer = new Account(sourceKeypair.secretKey);
    const token = new Token(Util.getConnection(), tokenPubkey, TOKEN_PROGRAM_ID, signer);
    const sourceTokenAccount = (await token.getOrCreateAssociatedAccountInfo(sourceKeypair.publicKey)).address;
    const destTokenAccount = (await token.getOrCreateAssociatedAccountInfo(destPubkey)).address;

    console.debug(`[sourceTokenAccount:${sourceTokenAccount.toBase58()}]=>[destTokenAccount:${destTokenAccount.toBase58()}]`);

    const param = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      sourceTokenAccount,
      destTokenAccount,
      signer.publicKey,
      [],
      amount
    );

    const instructions = instruction ? new Array(param, instruction) : [param];
    const fn = await _Transaction.send(
      signer.publicKey,
      [signer],
      destPubkey,
      amount,
    );
    return fn(instructions);
  }
}
