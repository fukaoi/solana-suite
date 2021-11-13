// forked: solana-labs/solana-program-library
import {
  PublicKey,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
} from '@solana/web3.js';

import {Constants} from '../';


export namespace TokenInstruction {
  /**
   * Construct the AssociatedTokenProgram instruction to create the associated
   * token account
   *
   * @param mint Token mint account
   * @param associatedAccount New associated account
   * @param owner Owner of the new account
   * @param payer Payer of fees
   */
  export const associatedTokenAccount = (
    mint: PublicKey,
    associatedAccount: PublicKey,
    owner: PublicKey,
    payer: PublicKey,
  ): TransactionInstruction => {
    const data = Buffer.alloc(0);

    const keys = [
      {pubkey: payer, isSigner: true, isWritable: true},
      {pubkey: associatedAccount, isSigner: false, isWritable: true},
      {pubkey: owner, isSigner: false, isWritable: false},
      {pubkey: mint, isSigner: false, isWritable: false},
      {pubkey: SystemProgram.programId, isSigner: false, isWritable: false},
      {pubkey: Constants.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
      {pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
    ];

    return new TransactionInstruction({
      keys,
      programId: Constants.ASSOCIATED_TOKEN_PROGRAM_ID,
      data,
    });
  }
}
