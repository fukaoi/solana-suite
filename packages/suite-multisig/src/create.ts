import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from '@solana/web3.js';
import { blob, struct, u8 } from '@solana/buffer-layout';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { Pubkey, Secret } from '~/types/account';
import { TransactionBuilder } from '~/transaction-builder';
import { CommonStructure } from '~/types/transaction-builder';

export namespace Multisig {
  /**
   * Create multisig
   *
   * @param {number} m                 //  number of multisig
   * @param {Secret} feePayer          //  memo owner
   * @param {Pubkey[]} signerPubkeys   //  signers
   * @return Promise<Result<CommonStructure<Pubkey>, Error>>
   */
  export const create = async (
    m: number,
    feePayer: Secret,
    signerPubkeys: Pubkey[],
  ): Promise<Result<CommonStructure<Pubkey>, Error>> => {
    return Try(async () => {
      if (m > signerPubkeys.length) {
        throw Error('signers number less than m number');
      }

      const account = Keypair.generate();
      const connection = Node.getConnection();
      const balanceNeeded = await connection.getMinimumBalanceForRentExemption(
        MultisigInstruction.Layout.span,
      );

      const inst1 = MultisigInstruction.account(
        account,
        feePayer.toKeypair(),
        balanceNeeded,
      );

      const inst2 = MultisigInstruction.multisig(
        m,
        account,
        signerPubkeys.map((pubkey: Pubkey) => pubkey.toPublicKey()),
      );

      return new TransactionBuilder.Common<Pubkey>(
        [inst1, inst2],
        [account],
        feePayer.toKeypair(),
        account.publicKey.toString(),
      );
    });
  };
}

export namespace MultisigInstruction {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const createLayoutPubKey = (property: string): any => {
    return blob(32, property);
  };

  /* eslint-disable @typescript-eslint/no-unsafe-argument */
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
    balanceNeeded: number,
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
    signerPubkey: PublicKey[],
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
      }),
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
      data,
    );

    return new TransactionInstruction({
      keys,
      programId: TOKEN_PROGRAM_ID,
      data,
    });
  };
}
