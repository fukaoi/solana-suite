import * as BufferLayout from '@solana/buffer-layout';
import {
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction as SolanaTransaction,
  TransactionInstruction,
} from '@solana/web3.js';

import {
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {
  Wallet,
  Node,
  Result,
  Transaction
} from './';

export namespace Multisig {
  const createLayoutPubKey = (property: string = 'publicKey') =>
    BufferLayout.blob(32, property);

  const MultisigLayout = BufferLayout.struct([
    BufferLayout.u8('m'),
    BufferLayout.u8('n'),
    BufferLayout.u8('is_initialized'),
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

  export const create = (
    m: number,
    signer: Keypair,
    multisigPubKey: PublicKey[],
  ) => async (append?: Transaction.AppendValue)
      : Promise<Result<string, Error>> => {

      if (m > multisigPubKey.length)
        return Result.err(Error('signers number less than m number'));

      const multisigAccount = Wallet.create().secret.toKeypair();
      const connection = Node.getConnection();
      const balanceNeeded = await connection.getMinimumBalanceForRentExemption(
        MultisigLayout.span
      )
        .then(Result.ok)
        .catch(Result.err);

      if (balanceNeeded.isErr) return Result.err(balanceNeeded.error);

      const t = new SolanaTransaction();
      if (!append?.feePayer) {
        t.feePayer = signer.publicKey;
      } else {
        t.feePayer = append.feePayer;
      }

      t.add(SystemProgram.createAccount({
        fromPubkey: signer.publicKey,
        newAccountPubkey: multisigAccount.publicKey,
        lamports: balanceNeeded.value,
        space: MultisigLayout.span,
        programId: TOKEN_PROGRAM_ID
      }));

      const keys = [
        {
          pubkey: multisigAccount.publicKey,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false
        },
      ];
      multisigPubKey.forEach(pubkey =>
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

      if (append?.txInstructions)
        append.txInstructions.forEach((st: TransactionInstruction) => t.add(st));

      t.add({
        keys,
        programId: TOKEN_PROGRAM_ID,
        data
      });

      const sig = await sendAndConfirmTransaction(
        connection,
        t,
        [signer, multisigAccount],
      )
        .then(Result.ok)
        .catch(Result.err);

      if (sig.isErr) return sig;

      return Result.ok(multisigAccount.publicKey.toBase58());
    }
}
