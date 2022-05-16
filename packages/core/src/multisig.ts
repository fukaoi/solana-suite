import {
  Node,
  Result,
  Instruction,
} from '@solana-suite/shared';

import {
  PublicKey,
  TransactionInstruction,
  Signer,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  Keypair,
} from '@solana/web3.js';

import {struct, u8, blob, LayoutObject, Blob} from '@solana/buffer-layout';
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';

// @internal
namespace MultisigInstruction {
  const createLayoutPubKey = (property: string): any => {
    return blob(32, property);
  }

  export const Layout = struct<{
    m: number,
    n: number,
    is_initialized: number,
    signer1: PublicKey,
    signer2: PublicKey,
    signer3: PublicKey,
    signer4: PublicKey,
    signer5: PublicKey,
    signer6: PublicKey,
    signer7: PublicKey,
    signer8: PublicKey,
    signer9: PublicKey,
    signer10: PublicKey,
    signer11: PublicKey,
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
    newAccount: Signer,
    feePayer: Signer,
    balanceNeeded: number
  ): TransactionInstruction => {
    return SystemProgram.createAccount(
      {
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: newAccount.publicKey,
        lamports: balanceNeeded,
        space: Layout.span,
        programId: TOKEN_PROGRAM_ID
      }
    );
  }

  export const multisig = (
    m: number,
    feePayer: Signer,
    signerPubkey: PublicKey[]
  ): TransactionInstruction => {
    const keys = [
      {
        pubkey: feePayer.publicKey,
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

    const dataLayout = struct<{instruction: number, m: number}>([
      u8('instruction'),
      u8('m'),
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
      programId: TOKEN_PROGRAM_ID,
      data
    });
  }
}

export namespace Multisig {
  export const isAddress = async (multisig: PublicKey)
    : Promise<Result<boolean, Error>> => {

    const info = await Multisig.getMultisigInfo(multisig);
    if (info.isErr) {
      return Result.ok(false);
    }
    return Result.ok(true);
  }

  export const getMultisigInfo = async (multisig: PublicKey)
    : Promise<Result<LayoutObject, Error>> => {
    const info = await Node.getConnection().getAccountInfo(multisig);
    if (info === null) {
      return Result.err(Error('Failed to find multisig'));
    }
    if (!info.owner.equals(TOKEN_PROGRAM_ID)) {
      return Result.err(Error('Invalid multisig owner'));
    }
    if (info.data.length !== MultisigInstruction.Layout.span) {
      return Result.err(Error('Invalid multisig size'));
    }

    const data = Buffer.from(info.data);
    const multisigInfo = MultisigInstruction.Layout.decode(data);
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

  export const create = async (
    m: number,
    feePayer: Signer,
    signerPubkey: PublicKey[],
  )
    : Promise<Result<Instruction, Error>> => {

    if (m > signerPubkey.length)
      return Result.err(Error('signers number less than m number'));

    const account = Keypair.generate();
    const connection = Node.getConnection();
    const balanceNeeded = await connection.getMinimumBalanceForRentExemption(
      MultisigInstruction.Layout.span
    )
      .then(Result.ok)
      .catch(Result.err);

    if (balanceNeeded.isErr) return Result.err(balanceNeeded.error);

    const inst1 = MultisigInstruction.account(
      account,
      feePayer,
      balanceNeeded.value
    );

    const inst2 = MultisigInstruction.multisig(
      m,
      account,
      signerPubkey,
    );

    return Result.ok(
      new Instruction(
        [inst1, inst2],
        [account],
        feePayer,
        account.publicKey.toBase58()
      )
    );
  }
}
