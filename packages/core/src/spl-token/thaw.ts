import { KeypairAccount, Instruction, Pubkey, Result, Secret, Try } from '@solana-suite/shared';
import {
  createThawAccountInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';

export namespace SplToken {
  /**
   * Thawing a target NFT
   * it should set to freezeAuthority when mint()
   *
   * @param {Pubkey} mint             // mint address
   * @param {Pubkey} owner            // current owner
   * @param {Secret} freezeAuthority  // setted freeze authority of nft
   * @param {Secret} feePayer?       // fee payer
   */
  export const thaw = (
    mint: Pubkey,
    owner: Pubkey,
    freezeAuthority: Secret,
    feePayer?: Secret
  ): Result<Instruction, Error> => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey()
      );

      const inst = createThawAccountInstruction(
        tokenAccount,
        mint.toPublicKey(),
        new KeypairAccount({ secret: freezeAuthority }).toPublicKey()
      );

      return new Instruction(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
}
