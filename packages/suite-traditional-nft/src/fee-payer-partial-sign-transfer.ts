import { Result } from "~/shared";
import { Pubkey, Secret } from "~/types/account";
import { PartialSignInstruction } from "~/instruction";
import { SplToken } from "@solana-suite/spl-token";

export namespace TraditionalNft {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const feePayerPartialSignTransferNft = async (
    mint: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    feePayer: Pubkey,
  ): Promise<Result<PartialSignInstruction, Error>> => {
    return SplToken.feePayerPartialSignTransfer(
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
