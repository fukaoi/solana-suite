import { Result, Try } from '~/shared';
import { Transaction } from '~/transaction';
import { Pubkey, Secret } from '~/types/account';
import { Account } from '~/account';
import {
  createThawAccountInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import { AuthorityOptions } from '~/types/shared';

export namespace SplToken {
  /**
   * Thawing a target NFT
   * it should set to freezeAuthority when mint()
   *
   * @param {Pubkey} mint             // mint address
   * @param {Pubkey} owner            // current owner
   * @param {Secret} freezeAuthority  // setted freeze authority of nft
   * @param {Partial<AuthorityOptions>} options  // options
   */
  export const thaw = (
    mint: Pubkey,
    owner: Pubkey,
    freezeAuthority: Secret,
    options: Partial<AuthorityOptions> = {},
  ): Result<Transaction, Error> => {
    const payer = options.feePayer ? options.feePayer : freezeAuthority;
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey(),
      );

      const inst = createThawAccountInstruction(
        tokenAccount,
        mint.toPublicKey(),
        new Account.Keypair({ secret: freezeAuthority }).toPublicKey(),
      );

      return new Transaction(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair(),
      );
    });
  };
}
