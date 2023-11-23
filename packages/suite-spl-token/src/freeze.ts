import { Account } from '~/account';
import { Transaction } from '~/transaction';
import { Result, Try } from '~/shared';
import { Pubkey, Secret } from '~/types/account';

import {
  createFreezeAccountInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import { AuthorityOptions } from '~/types/shared';

export namespace SplToken {
  /**
   * Freezing a target nft
   * it should set to freezeAuthority when mint()
   * @param {Pubkey} mint             // mint address
   * @param {Pubkey} owner            // current owner
   * @param {Partial<AuthorityOptions>} options // options
   */
  export const freeze = (
    mint: Pubkey,
    owner: Pubkey,
    freezeAuthority: Secret,
    options: Partial<AuthorityOptions> = {},
  ): Result<Transaction, Error> => {
    return Try(() => {
      const payer = options.feePayer ? options.feePayer : freezeAuthority;
      const tokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey(),
      );
      const inst = createFreezeAccountInstruction(
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
