import { Instruction, Pubkey, Result, Secret } from '@solana-suite/shared';
import { SplToken } from '@solana-suite/core';

export namespace Metaplex {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const burn = (
    mint: Pubkey,
    owner: Pubkey,
    signers: Secret[],
    feePayer?: Secret
  ): Result<Instruction, Error> => {
    return SplToken.burn(
      mint,
      owner,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  };
}
