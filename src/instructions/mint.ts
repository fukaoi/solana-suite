//
// forked: solana-labs/solana-program-library
//
import {
  PublicKey,
  TransactionInstruction,
  Signer,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

import * as BufferLayout from '@solana/buffer-layout';
import {Instruction} from "../instruction";


export namespace MintInstruction {

 /**
   * Construct an InitializeMint instruction
   *
   * @param programId SPL Token program account
   * @param mint Token mint account
   * @param decimals Number of decimals in token account amounts
   * @param mintAuthority Minting authority
   * @param freezeAuthority Optional authority that can freeze token accounts
   */
  export const initMint = (
    programId: PublicKey,
    mint: PublicKey,
    decimals: number,
    mintAuthority: PublicKey,
    freezeAuthority: PublicKey | null,
  ): TransactionInstruction => {
    let keys = [
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
      programId,
      data,
    });
  }

  /**
   * Construct a MintToChecked instruction
   *
   * @param programId SPL Token program account
   * @param mint Public key of the mint
   * @param dest Public key of the account to mint to
   * @param authority The mint authority
   * @param multiSigners Signing accounts if `authority` is a multiSig
   * @param amount Amount to mint
   * @param decimals Number of decimals in amount to mint
   */
  export const mintToChecked = (
    programId: PublicKey,
    mint: PublicKey,
    dest: PublicKey,
    authority: PublicKey,
    multiSigners: Array<Signer>,
    amount: number | bigint,
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
        amount: amount,
        decimals,
      },
      data,
    );

    let keys = [
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
      programId: programId,
      data,
    });
  }
}
