import { createTransferCheckedInstruction } from '@solana/spl-token';
import { PublicKey, Keypair, Transaction } from '@solana/web3.js';

import {
  Node,
  Result,
  Instruction,
  PartialSignInstruction,
  Try,
} from '@solana-suite/shared';

import { Internals_SplToken } from '../internals/_spl-token';
import { Internals_AssociatedAccount } from '../internals/_associated-account';

export namespace SplToken {
  export const transfer = async (
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Keypair[],
    amount: number,
    mintDecimal: number,
    feePayer?: Keypair
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      !feePayer && (feePayer = signers[0]);

      const sourceToken = await Internals_AssociatedAccount.retryGetOrCreate(
        mint,
        owner,
        feePayer
      );

      const destToken = await Internals_AssociatedAccount.retryGetOrCreate(
        mint,
        dest,
        feePayer
      );

      const inst = createTransferCheckedInstruction(
        sourceToken.toPublicKey(),
        mint,
        destToken.toPublicKey(),
        owner,
        Internals_SplToken.calculateAmount(amount, mintDecimal),
        mintDecimal,
        signers
      );

      return new Instruction([inst], signers, feePayer);
    });
  };

  export const feePayerPartialSignTransfer = async (
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Keypair[],
    amount: number,
    mintDecimal: number,
    feePayer: PublicKey
  ): Promise<Result<PartialSignInstruction, Error>> => {
    return Try(async () => {
      const sourceToken =
        await Internals_AssociatedAccount.makeOrCreateInstruction(
          mint,
          owner,
          feePayer
        );

      const destToken =
        await Internals_AssociatedAccount.makeOrCreateInstruction(
          mint,
          dest,
          feePayer
        );

      let inst2;
      const blockhashObj = await Node.getConnection().getLatestBlockhash();

      const tx = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer,
      });

      // return associated token account
      if (!destToken.inst) {
        inst2 = createTransferCheckedInstruction(
          sourceToken.tokenAccount.toPublicKey(),
          mint,
          destToken.tokenAccount.toPublicKey(),
          owner,
          Internals_SplToken.calculateAmount(amount, mintDecimal),
          mintDecimal,
          signers
        );
        tx.add(inst2);
      } else {
        // return instruction and undecided associated token account
        inst2 = createTransferCheckedInstruction(
          sourceToken.tokenAccount.toPublicKey(),
          mint,
          destToken.tokenAccount.toPublicKey(),
          owner,
          Internals_SplToken.calculateAmount(amount, mintDecimal),
          mintDecimal,
          signers
        );
        tx.add(destToken.inst).add(inst2);
      }

      tx.recentBlockhash = blockhashObj.blockhash;
      signers.forEach((signer) => {
        tx.partialSign(signer);
      });

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new PartialSignInstruction(hex);
    });
  };
}
