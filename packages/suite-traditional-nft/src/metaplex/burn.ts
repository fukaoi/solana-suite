import { Instruction, Pubkey, Result, Secret } from 'shared';
import { SplToken } from '@solana-suite/core';

export namespace Metaplex {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const burn = (
    mint: Pubkey,
    owner: Pubkey,
    signer: Secret,
    feePayer?: Secret
  ): Result<Instruction, Error> => {
    return SplToken.burn(
      mint,
      owner,
      [signer],
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  };
}
