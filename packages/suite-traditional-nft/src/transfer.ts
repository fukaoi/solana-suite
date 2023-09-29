import { SplToken } from '@solana-suite/core';
import { Result } from 'shared';
import { Pubkey, Secret } from 'types/account';
import { Instruction } from 'instruction';

export namespace TraditionalNft {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const transfer = async (
    mint: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    feePayer?: Secret,
  ): Promise<Result<Instruction, Error>> => {
    return SplToken.transfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer,
    );
  };
}
