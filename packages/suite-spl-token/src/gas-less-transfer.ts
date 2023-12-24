import { createTransferCheckedInstruction } from '@solana/spl-token';
import { Transaction } from '@solana/web3.js';
import { Node } from '~/node';
import { Result, Try } from '~/shared';
import { TransactionBuilder } from '~/transaction-builder';
import { Pubkey, Secret } from '~/types/account';
import { SplToken as Calculator } from './calculate-amount';
import { Account } from '~/account';
import { PartialSignStructure } from '~/types/transaction-builder';

export namespace SplToken {
  /**
   * Transfer without solana sol, delegate feepayer for commission
   *
   * @param {Pubkey} mint
   * @param {Secret} owner
   * @param {Pubkey} dest
   * @param {number} amount
   * @param {number} mintDecimal
   * @param {Pubkey} feePayer
   * @return Promise<Result<PartialSignStructure, Error>>
   */
  export const gasLessTransfer = async (
    mint: Pubkey,
    owner: Secret,
    dest: Pubkey,
    amount: number,
    mintDecimal: number,
    feePayer: Pubkey,
  ): Promise<Result<PartialSignStructure, Error>> => {
    return Try(async () => {
      const ownerPublicKey = owner.toKeypair().publicKey;
      const sourceToken = await Account.Associated.makeOrCreateInstruction(
        mint,
        ownerPublicKey.toString(),
        feePayer,
      );

      const destToken = await Account.Associated.makeOrCreateInstruction(
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
          ownerPublicKey,
          Calculator.calculateAmount(amount, mintDecimal),
          mintDecimal,
          [owner.toKeypair()],
        );
        tx.add(inst2);
      } else {
        // return instruction and undecided associated token account
        inst2 = createTransferCheckedInstruction(
          sourceToken.tokenAccount.toPublicKey(),
          mint.toPublicKey(),
          destToken.tokenAccount.toPublicKey(),
          ownerPublicKey,
          Calculator.calculateAmount(amount, mintDecimal),
          mintDecimal,
          [owner.toKeypair()],
        );
        tx.add(destToken.inst).add(inst2);
      }

      tx.recentBlockhash = blockhashObj.blockhash;
      tx.partialSign(owner.toKeypair());

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new TransactionBuilder.PartialSign(hex);
    });
  };
}
