import {Token} from '@solana/spl-token';
// import * as BufferLayout from 'buffer-layout';
import {
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction as SolanaTransaction
} from '@solana/web3.js';

import {Transaction, Wallet, Node, Constants} from './';


export namespace Multisig {
// const MultisigLayout = BufferLayout.struct([
  // BufferLayout.u8('m'),
  // BufferLayout.u8('n'),
  // BufferLayout.u8('is_initialized'),
  // Layout.publicKey('signer1'),
  // Layout.publicKey('signer2'),
  // Layout.publicKey('signer3'),
  // Layout.publicKey('signer4'),
  // Layout.publicKey('signer5'),
  // Layout.publicKey('signer6'),
  // Layout.publicKey('signer7'),
  // Layout.publicKey('signer8'),
  // Layout.publicKey('signer9'),
  // Layout.publicKey('signer10'),
  // Layout.publicKey('signer11'),
// ]);

  // export const create = async (m: number, signers: PublicKey[], feePayer: Keypair) {
    // const multisigAccount = Keypair.generate();
    // const connection = Node.getConnection();
    // const balanceNeeded = await Token.getMinBalanceRentForExemptMultisig(connection);
    // const transaction = new SolanaTransaction();
    // transaction.add(SystemProgram.createAccount({
      // fromPubkey: feePayer.publicKey,
      // newAccountPubkey: multisigAccount.publicKey,
      // lamports: balanceNeeded,
      // space: MultisigLayout.span,
      // programId: Constants.SPL_TOKEN_PROGRAM_ID
    // })); // create the new account

    // // create the new account
    // let keys = [
      // {pubkey: multisigAccount.publicKey, isSigner: false, isWritable: true},
      // {pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
    // ];
    // signers.forEach(signer =>
      // keys.push({pubkey: signer, isSigner: false, isWritable: false}),
    // );

    // const dataLayout = BufferLayout.struct([
      // BufferLayout.u8('instruction'),
      // BufferLayout.u8('m'),
    // ]);

    // const data = Buffer.alloc(dataLayout.span);
    // dataLayout.encode(
      // {
        // instruction: 2,
        // m
      // }
      // , data);
    // transaction.add({
      // keys,
      // programId: Constants.SPL_TOKEN_PROGRAM_ID,
      // data
    // }); // Send the two instructions

    // await sendAndConfirmTransaction(
      // 'createAccount and InitializeMultisig',
      // connection,
      // transaction,
      // feePayer,
      // multisigAccount,
    // );
    // return multisigAccount.publicKey;
  // }
}
