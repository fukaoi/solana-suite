import { Result } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { StructPartialSignTransaction } from '~/types/transaction-builder';
import { SplToken } from '~/suite-spl-token';

export namespace RegularNft {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const gasLessTransfer = async (
    mint: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    feePayer: Pubkey,
  ): Promise<Result<StructPartialSignTransaction, Error>> => {
    return SplToken.gasLessTransfer(
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
