import { Result } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { PartialSignTransaction } from '~/transaction';
import { SplToken } from '~/suite-spl-token';

export namespace RegularNft {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const feePayerPartialSignTransferNft = async (
    mint: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    feePayer: Pubkey,
  ): Promise<Result<PartialSignTransaction, Error>> => {
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
