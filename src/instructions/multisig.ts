import {
  PublicKey,
  TransactionInstruction,
  Signer,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
} from "@solana/web3.js";

import * as BufferLayout from '@solana/buffer-layout';
import {Constants, Instruction} from "../";

export namespace MultisigInstruction {
  export const Layout = BufferLayout.struct([
    BufferLayout.u8('m'),
    BufferLayout.u8('n'),
    BufferLayout.u8('is_initialized'),
    Instruction.createLayoutPubKey('signer1'),
    Instruction.createLayoutPubKey('signer2'),
    Instruction.createLayoutPubKey('signer3'),
    Instruction.createLayoutPubKey('signer4'),
    Instruction.createLayoutPubKey('signer5'),
    Instruction.createLayoutPubKey('signer6'),
    Instruction.createLayoutPubKey('signer7'),
    Instruction.createLayoutPubKey('signer8'),
    Instruction.createLayoutPubKey('signer9'),
    Instruction.createLayoutPubKey('signer10'),
    Instruction.createLayoutPubKey('signer11'),
  ]);

  export const account = (
    account: Signer,
    feePayer: Signer,
    balanceNeeded: number
  ): TransactionInstruction => {
    return SystemProgram.createAccount(
      {
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: account.publicKey,
        lamports: balanceNeeded,
        space: Layout.span,
        programId: Constants.TOKEN_PROGRAM_ID
      }
    );
  }

  export const multisig = (
    m: number,
    account: Signer,
    signerPubkey: PublicKey[]
  ): TransactionInstruction => {
    const keys = [
      {
        pubkey: account.publicKey,
        isSigner: false,
        isWritable: true
      },
      {
        pubkey: SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false
      },
    ];
    signerPubkey.forEach(pubkey =>
      keys.push(
        {
          pubkey,
          isSigner: false,
          isWritable: false
        }
      ),
    );

    const dataLayout = BufferLayout.struct([
      BufferLayout.u8('instruction'),
      BufferLayout.u8('m'),
    ]);

    const data = Buffer.alloc(dataLayout.span);

    dataLayout.encode(
      {
        instruction: 2,
        m
      }
      , data
    );

    return new TransactionInstruction({
      keys,
      programId: Constants.TOKEN_PROGRAM_ID,
      data
    });
  }
}
