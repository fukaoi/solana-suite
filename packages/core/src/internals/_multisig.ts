import {
  PublicKey,
  TransactionInstruction,
  Keypair,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
} from '@solana/web3.js';

import { struct, u8, blob } from '@solana/buffer-layout';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// @internal
export namespace Internals_Multisig {
  const createLayoutPubKey = (property: string): any => {
    return blob(32, property);
  };

  export const Layout = struct<{
    m: number;
    n: number;
    is_initialized: number;
    signer1: PublicKey;
    signer2: PublicKey;
    signer3: PublicKey;
    signer4: PublicKey;
    signer5: PublicKey;
    signer6: PublicKey;
    signer7: PublicKey;
    signer8: PublicKey;
    signer9: PublicKey;
    signer10: PublicKey;
    signer11: PublicKey;
  }>([
    u8('m'),
    u8('n'),
    u8('is_initialized'),
    createLayoutPubKey('signer1'),
    createLayoutPubKey('signer2'),
    createLayoutPubKey('signer3'),
    createLayoutPubKey('signer4'),
    createLayoutPubKey('signer5'),
    createLayoutPubKey('signer6'),
    createLayoutPubKey('signer7'),
    createLayoutPubKey('signer8'),
    createLayoutPubKey('signer9'),
    createLayoutPubKey('signer10'),
    createLayoutPubKey('signer11'),
  ]);

  export const account = (
    newAccount: Keypair,
    feePayer: Keypair,
    balanceNeeded: number
  ): TransactionInstruction => {
    return SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: newAccount.publicKey,
      lamports: balanceNeeded,
      space: Layout.span,
      programId: TOKEN_PROGRAM_ID,
    });
  };

  export const multisig = (
    m: number,
    feePayer: Keypair,
    signerPubkey: PublicKey[]
  ): TransactionInstruction => {
    const keys = [
      {
        pubkey: feePayer.publicKey,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false,
      },
    ];
    signerPubkey.forEach((pubkey) =>
      keys.push({
        pubkey,
        isSigner: false,
        isWritable: false,
      })
    );

    const dataLayout = struct<{ instruction: number; m: number }>([
      u8('instruction'),
      u8('m'),
    ]);

    const data = Buffer.alloc(dataLayout.span);

    dataLayout.encode(
      {
        instruction: 2,
        m,
      },
      data
    );

    return new TransactionInstruction({
      keys,
      programId: TOKEN_PROGRAM_ID,
      data,
    });
  };
}
