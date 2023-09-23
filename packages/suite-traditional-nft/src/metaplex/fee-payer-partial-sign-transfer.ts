import {
  PartialSignInstruction,
  Pubkey,
  Result,
  Secret,
} from '@solana-suite/shared';
import { SplToken } from '@solana-suite/core';

export namespace Metaplex {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const feePayerPartialSignTransferNft = async (
    mint: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    feePayer: Pubkey
  ): Promise<Result<PartialSignInstruction, Error>> => {
    return SplToken.feePayerPartialSignTransfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  };
}
