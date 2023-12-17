import { Account } from '~/account';
import { TransactionBuilder } from '~/transaction-builder';
import { Result, Try } from '~/shared';
import { Pubkey, Secret } from '~/types/account';

import {
  createFreezeAccountInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import { FreezeOptions } from '~/types/spl-token';
import { CommonStructure } from '~/types/transaction-builder';

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
    options: Partial<FreezeOptions> = {},
  ): Result<CommonStructure, Error> => {
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

      return new TransactionBuilder.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair(),
      );
    });
  };
}
