import * as BufferLayout from '@solana/buffer-layout';
import {
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction as SolanaTransaction,
} from '@solana/web3.js';

import {
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {Transaction, Wallet, Node, Constants} from './';

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

  export const create = async (m: number, signers: PublicKey[], feePayer: Keypair) => {
    const multisigAccount = Wallet.create().secret.toKeypair();
    const connection = Node.getConnection();
    const balanceNeeded = await Token.getMinBalanceRentForExemptMultisig(connection);
    const transaction = new SolanaTransaction();

    transaction.add(SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: multisigAccount.publicKey,
      lamports: balanceNeeded,
      space: MultisigLayout.span,
      programId: TOKEN_PROGRAM_ID
    })); 

    const keys = [
      {pubkey: multisigAccount.publicKey, isSigner: false, isWritable: true},
      {pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
    ];
    signers.forEach(signer =>
      keys.push({pubkey: signer, isSigner: false, isWritable: false}),
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
      , data);
    transaction.add({
      keys,
      programId: TOKEN_PROGRAM_ID,
      data
    }); 

    await sendAndConfirmTransaction(
      connection,
      transaction,
      [multisigAccount],
    );
    return multisigAccount.publicKey;
  }
}
