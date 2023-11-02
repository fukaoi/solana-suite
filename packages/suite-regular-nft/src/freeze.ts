import { Result, Try } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { Transaction } from '~/transaction';

import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { createFreezeDelegatedAccountInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { Account } from '~/account';

export namespace RegularNft {
  /**
   * Freezing a target nft
   * it should set to freezeAuthority when mint()
   * @param {Pubkey} mint             // mint address
   * @param {Pubkey} owner            // current owner
   * @param {Secret} freezeAuthority  // setted freeze authority of nft
   * @param {Secret} feePayer?       // fee payer
   */
  export const freeze = (
    mint: Pubkey,
    owner: Pubkey,
    freezeAuthority: Secret,
    feePayer?: Secret,
  ): Result<Transaction, Error> => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey(),
      );
      const editionAddress = Account.Pda.getMasterEdition(mint);

      const inst = createFreezeDelegatedAccountInstruction({
        delegate: new Account.Keypair({
          secret: freezeAuthority,
        }).toPublicKey(),
        tokenAccount: tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey(),
      });
      return new Transaction(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair(),
      );
    });
  };
}
