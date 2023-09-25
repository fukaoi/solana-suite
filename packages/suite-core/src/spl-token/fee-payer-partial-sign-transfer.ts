import { createTransferCheckedInstruction } from '@solana/spl-token';
import { Transaction } from '@solana/web3.js';
import {
  Node,
  Result,
  PartialSignInstruction,
  Try,
  Pubkey,
  Secret,
} from 'shared';

import { SplToken as _Calculator } from './calculate-amount';
import { AssociatedAccount } from '../associated-account';

export namespace SplToken {
  export const feePayerPartialSignTransfer = async (
    mint: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    amount: number,
    mintDecimal: number,
    feePayer: Pubkey,
  ): Promise<Result<PartialSignInstruction, Error>> => {
    return Try(async () => {
      const keypairs = signers.map((s) => s.toKeypair());

      const sourceToken = await AssociatedAccount.makeOrCreateInstruction(
        mint,
        owner,
        feePayer,
      );

      const destToken = await AssociatedAccount.makeOrCreateInstruction(
        mint,
        dest,
        feePayer,
      );

      let inst2;
      const blockhashObj = await Node.getConnection().getLatestBlockhash();

      const tx = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey(),
      });

      // return associated token account
      if (!destToken.inst) {
        inst2 = createTransferCheckedInstruction(
          sourceToken.tokenAccount.toPublicKey(),
          mint.toPublicKey(),
          destToken.tokenAccount.toPublicKey(),
          owner.toPublicKey(),
          _Calculator.calculateAmount(amount, mintDecimal),
          mintDecimal,
          keypairs,
        );
        tx.add(inst2);
      } else {
        // return instruction and undecided associated token account
        inst2 = createTransferCheckedInstruction(
          sourceToken.tokenAccount.toPublicKey(),
          mint.toPublicKey(),
          destToken.tokenAccount.toPublicKey(),
          owner.toPublicKey(),
          _Calculator.calculateAmount(amount, mintDecimal),
          mintDecimal,
          keypairs,
        );
        tx.add(destToken.inst).add(inst2);
      }

      tx.recentBlockhash = blockhashObj.blockhash;
      keypairs.forEach((signer) => {
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
