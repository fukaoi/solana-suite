import { createTransferCheckedInstruction } from '@solana/spl-token';
import { PublicKey, Keypair, Transaction } from '@solana/web3.js';

import {
  Node,
  Result,
  PartialSignInstruction,
  Try,
} from '@solana-suite/shared';

import { SplToken as _Calculator } from './calculate-amount';
import { AssociatedAccount } from '../associated-account';

export namespace SplToken {
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
      const sourceToken = await AssociatedAccount.makeOrCreateInstruction(
        mint,
        owner,
        feePayer
      );

      const destToken = await AssociatedAccount.makeOrCreateInstruction(
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
          _Calculator.calculateAmount(amount, mintDecimal),
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
          _Calculator.calculateAmount(amount, mintDecimal),
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
