import { Result, Try } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { TransactionBuilder } from '~/transaction-builder';
import { Account } from '~/account';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { createThawDelegatedAccountInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { ThawOptions } from '~/types/regular-nft';
import { CommonStructure } from '~/types/transaction-builder';

export namespace RegularNft {
  /**
   * Thawing a target NFT
   * it should set to freezeAuthority when mint()
   *
   * @param {Pubkey} mint             // mint address
   * @param {Pubkey} owner            // current owner
   * @param {Secret} freezeAuthority  // setted freeze authority of nft
   * @param {ThawOptions} options     // options
   * @return {Result<CommonStructure<unknown>, Error> }
   */
  export const thaw = (
    mint: Pubkey,
    owner: Pubkey,
    freezeAuthority: Secret,
    options: Partial<ThawOptions> = {},
  ): Result<CommonStructure<unknown>, Error> => {
    return Try(() => {
      const payer = options.feePayer ? options.feePayer : freezeAuthority;
      const tokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey(),
      );
      const editionAddress = Account.Pda.getMasterEdition(mint);

      const inst = createThawDelegatedAccountInstruction({
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
