import {Token, TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction as SolanaTransaction,
  SystemProgram,
} from '@solana/web3.js';

import {
  Append,
  Transaction,
  Result,
  Node,
  Constants
} from './';

export namespace SolNative {
  export const wrappedTransfer = async (
    source: PublicKey,
    dest: PublicKey,
    signers: Keypair[],
    amount: number,
  ) => {
    const connection = Node.getConnection();
  
    const native = await Token.createWrappedNativeAccount(
      connection,
      TOKEN_PROGRAM_ID,
      source,
      signers[0],
      amount * LAMPORTS_PER_SOL
    );

    const token = new Token(
      connection, 
      Constants.WRAPPED_TOKEN_PROGRAM_ID, 
      TOKEN_PROGRAM_ID, 
      signers[0]
    );

    const tx = await sendAndConfirmTransaction(
      Node.getConnection(),
      new SolanaTransaction().add(
        SystemProgram.transfer({
          fromPubkey: source,
          toPubkey: native,
          lamports: 100
        }),
      ),
      signers,
    );
    await token.closeAccount(native, dest, source, []);
    return tx;
  }

  export const transfer = (
    source: PublicKey,
    destination: PublicKey,
    signers: Keypair[],
    amount: number,
  ) => async (append?: Append.Value)
      : Promise<Result<string, Error>> => {
      const sol = amount * LAMPORTS_PER_SOL;
      return Transaction.send(
        source,
        destination,
        signers,
        sol,
      )(append);
    }
}
