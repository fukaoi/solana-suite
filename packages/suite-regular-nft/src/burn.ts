import { Result } from '~/shared';
import { Transaction } from '~/transaction';
import { Pubkey, Secret } from '~/types/account';
import { SplToken } from '~/suite-spl-token';

export namespace RegularNft {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const burn = (
    mint: Pubkey,
    owner: Pubkey,
    signer: Secret,
    feePayer?: Secret,
  ): Result<Transaction, Error> => {
    return SplToken.burn(
      mint,
      owner,
      [signer],
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer,
    );
  };
}
