// forked: solana-labs/solana-program-library
import {
  PublicKey,
  TransactionInstruction,
  Signer,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
} from '@solana/web3.js';

import * as BufferLayout from '@solana/buffer-layout';
import {Instruction, Constants, u64} from '../';

export namespace MintInstruction {
  export const Layout: BufferLayout.Structure = BufferLayout.struct([
    BufferLayout.u32('mintAuthorityOption'),
    Instruction.createLayoutPubKey('mintAuthority'),
    Instruction.createLayoutUint64('supply'),
    BufferLayout.u8('decimals'),
    BufferLayout.u8('isInitialized'),
    BufferLayout.u32('freezeAuthorityOption'),
    Instruction.createLayoutPubKey('freezeAuthority'),
  ]);

  export const account = (
    mintAccount: Signer,
    payer: Signer,
    balanceNeeded: number
  ) =>
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mintAccount.publicKey,
      lamports: balanceNeeded,
      space: Layout.span,
      programId: Constants.TOKEN_PROGRAM_ID,
    })

  /**
    * Construct an InitializeMint instruction
    *
    * @param mint Token mint account
    * @param decimals Number of decimals in token account amounts
    * @param mintAuthority Minting authority
    * @param freezeAuthority Optional authority that can freeze token accounts
    */
  export const initMint = (
    mint: PublicKey,
    decimals: number,
    mintAuthority: PublicKey,
    freezeAuthority: PublicKey | null,
  ): TransactionInstruction => {
    const keys = [
      {pubkey: mint, isSigner: false, isWritable: true},
      {pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
    ];
    const commandDataLayout = BufferLayout.struct([
      BufferLayout.u8('instruction'),
      BufferLayout.u8('decimals'),
      Instruction.createLayoutPubKey('mintAuthority'),
      BufferLayout.u8('option'),
      Instruction.createLayoutPubKey('freezeAuthority'),
    ]);
    let data = Buffer.alloc(1024);
    {
      const encodeLength = commandDataLayout.encode(
        {
          instruction: 0, // InitializeMint instruction
          decimals,
          mintAuthority: Instruction.pubkeyToBuffer(mintAuthority),
          option: freezeAuthority === null ? 0 : 1,
          freezeAuthority: Instruction.pubkeyToBuffer(freezeAuthority || new PublicKey(0)),
        },
        data,
      );
      data = data.slice(0, encodeLength);
    }

    return new TransactionInstruction({
      keys,
      programId: Constants.TOKEN_PROGRAM_ID,
      data,
    });
  }

  /**
   * Construct a MintToChecked instruction
   *
   * @param mint Public key of the mint
   * @param dest Public key of the account to mint to
   * @param authority The mint authority
   * @param multiSigners Signing accounts if `authority` is a multiSig
   * @param amount Amount to mint
   * @param decimals Number of decimals in amount to mint
   */
  export const mintToChecked = (
    mint: PublicKey,
    dest: PublicKey,
    authority: PublicKey,
    multiSigners: Signer[],
    amount: number | u64,
    decimals: number,
  ): TransactionInstruction => {
    const dataLayout = BufferLayout.struct([
      BufferLayout.u8('instruction'),
      Instruction.createLayoutUint64('amount'),
      BufferLayout.u8('decimals'),
    ]);

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 14, // MintToChecked instruction
        amount: new u64(amount).toBuffer(),
        decimals,
      },
      data,
    );

    const keys = [
      {pubkey: mint, isSigner: false, isWritable: true},
      {pubkey: dest, isSigner: false, isWritable: true},
    ];
    if (multiSigners.length === 0) {
      keys.push({
        pubkey: authority,
        isSigner: true,
        isWritable: false,
      });
    } else {
      keys.push({pubkey: authority, isSigner: false, isWritable: false});
      multiSigners.forEach(signer =>
        keys.push({
          pubkey: signer.publicKey,
          isSigner: true,
          isWritable: false,
        }),
      );
    }

    return new TransactionInstruction({
      keys,
      programId: Constants.TOKEN_PROGRAM_ID,
      data,
    });
  }

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
