import { Result, Try } from '~/shared';
import { TransactionBuilder } from '~/transaction-builder';
import { Pubkey, Secret } from '~/types/account';
import { Account } from '~/account';
import {
  createThawAccountInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import { ThawOptions } from '~/types/spl-token';
import { CommonStructure } from '~/types/transaction-builder';

export namespace SplToken {
  /**
   * Thawing a target NFT
   * it should set to freezeAuthority when mint()
   *
   * @param {Pubkey} mint             // mint address
   * @param {Pubkey} owner            // current owner
   * @param {Secret} freezeAuthority  // setted freeze authority of nft
   * @param {Partial<ThawOptions>} options  // options
   */
  export const thaw = (
    mint: Pubkey,
    owner: Pubkey,
    freezeAuthority: Secret,
    options: Partial<ThawOptions> = {},
  ): Result<CommonStructure, Error> => {
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

      return new TransactionBuilder.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair(),
      );
    });
  };
}
