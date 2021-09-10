import {
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {
  Account,
  PublicKey,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {Util} from '../../util';
import {Transaction} from '../../transaction';

export namespace Metaplex {
  export const transfer = async (
    tokenId: string,
    sourceSecret: string,
    destination: string,
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    const tokenPubkey = new PublicKey(tokenId);
    const destPubkey = new PublicKey(destination);
    const signer = Util.createKeypair(sourceSecret);
    const token = new Token(Util.getConnection(), tokenPubkey, TOKEN_PROGRAM_ID, signer);
    const sourceTokenAccount = (await token.getOrCreateAssociatedAccountInfo(signer.publicKey)).address;
    const destTokenAccount = (await token.getOrCreateAssociatedAccountInfo(destPubkey)).address;

    console.debug(`[sourceTokenAccount:${sourceTokenAccount.toBase58()}]=>[destTokenAccount:${destTokenAccount.toBase58()}]`);

    const param = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      sourceTokenAccount,
      destTokenAccount,
      signer.publicKey,
      [],
      1
    );

    const instructions = instruction ? new Array(param, instruction) : [param];
    const fn = Transaction.send(
      signer.publicKey,
      [signer],
      destPubkey,
      1,
    );
    return await fn(instructions);
  }
}
