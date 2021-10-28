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
  Append,
  Wallet,
  Node,
  Result,
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

  export const getMultisigInfo = async (multisig: PublicKey)
    : Promise<Result<BufferLayout.LayoutObject, Error>> => {
    const info = await Node.getConnection().getAccountInfo(multisig);
    if (info === null) {
      return Result.err(Error('Failed to find multisig'));
    }
    if (!info.owner.equals(TOKEN_PROGRAM_ID)) {
      return Result.err(Error('Invalid multisig owner'));
    }
    if (info.data.length !== MultisigLayout.span) {
      return Result.err(Error('Invalid multisig size'));
    }

    const data = Buffer.from(info.data);
    const multisigInfo = MultisigLayout.decode(data);
    multisigInfo.signer1 = new PublicKey(multisigInfo.signer1);
    multisigInfo.signer2 = new PublicKey(multisigInfo.signer2);
    multisigInfo.signer3 = new PublicKey(multisigInfo.signer3);
    multisigInfo.signer4 = new PublicKey(multisigInfo.signer4);
    multisigInfo.signer5 = new PublicKey(multisigInfo.signer5);
    multisigInfo.signer6 = new PublicKey(multisigInfo.signer6);
    multisigInfo.signer7 = new PublicKey(multisigInfo.signer7);
    multisigInfo.signer8 = new PublicKey(multisigInfo.signer8);
    multisigInfo.signer9 = new PublicKey(multisigInfo.signer9);
    multisigInfo.signer10 = new PublicKey(multisigInfo.signer10);
    multisigInfo.signer11 = new PublicKey(multisigInfo.signer11);

    return Result.ok(multisigInfo);
  }

  export const create = (
    m: number,
    signer: Keypair,
    multisigPubKey: PublicKey[],
  ) => async (append?: Append.Value)
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
