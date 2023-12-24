import { Result, Try } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { TransactionBuilder } from '~/transaction-builder';

import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { createFreezeDelegatedAccountInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { Account } from '~/account';
import { CommonStructure } from '~/types/transaction-builder';
import { FreezeOptions } from '~/types/regular-nft';

export namespace RegularNft {
  /**
   * Freezing a target nft
   * it should set to freezeAuthority when mint()
   *
   * @param {Pubkey} mint             // mint address
   * @param {Pubkey} owner            // current owner
   * @param {Partial<FreezeOptions>} options
   * @return Result<CommonStructure, Error>
   */
  export const freeze = (
    mint: Pubkey,
    owner: Pubkey,
    freezeAuthority: Secret,
    options: Partial<FreezeOptions> = {},
  ): Result<CommonStructure, Error> => {
    return Try(() => {
      const payer = options.feePayer ? options.feePayer : freezeAuthority;
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
      return new TransactionBuilder.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair(),
      );
    });
  };
}
