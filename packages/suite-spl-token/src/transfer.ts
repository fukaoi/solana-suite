import { createTransferCheckedInstruction } from '@solana/spl-token';
import { Result, Try } from '~/suite-utils';
import { SplToken as Calculator } from './calculate-amount';
import { Account } from '~/account';
import { TransactionBuilder } from '~/transaction-builder';
import { Pubkey, Secret } from '~/types/account';
import { MintOptions } from '~/types/spl-token';
import { CommonStructure } from '~/types/transaction-builder';

export namespace SplToken {
  /**
   * Transfer NFT for only multiSig account
   *
   * @param {Pubkey} mint               // minted account
   * @param {Pubkey} owner              // current multisig owner
   * @param {Pubkey} dest               // new owner
   * @param {Secret[]} ownerOrMultisig  // owner or multisig account Secret
   * @param {number} amount             // want to transfer SOL amount
   * @param {number} mintDecimal        // minted token decimal
   * @param {Partial<MintOptions>} options       // options
   * @return {Result<CommonStructure<unknown>, Error> }
   */
  export const transfer = async (
    mint: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    ownerOrMultisig: Secret[],
    amount: number,
    mintDecimal: number,
    options: Partial<MintOptions> = {},
  ): Promise<Result<CommonStructure, Error>> => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
      const payerPubkey = new Account.Keypair({ secret: payer });
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());
      const sourceToken = await Account.Associated.makeOrCreateInstruction(
        mint,
        owner.toString(),
        payerPubkey.pubkey,
      );

      const destToken = await Account.Associated.makeOrCreateInstruction(
        mint,
        dest,
        payerPubkey.pubkey,
      );

      const inst = createTransferCheckedInstruction(
        sourceToken.tokenAccount.toPublicKey(),
        mint.toPublicKey(),
        destToken.tokenAccount.toPublicKey(),
        owner.toPublicKey(),
        Calculator.calculateAmount(amount, mintDecimal),
        mintDecimal,
        keypairs,
      );

      const instructions = destToken.inst ? [destToken.inst, inst] : [inst];

      return new TransactionBuilder.Common(
        instructions,
        keypairs,
        payer.toKeypair(),
      );
    });
  };
}
