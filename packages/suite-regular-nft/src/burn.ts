import { Result } from '~/shared';
import { Transaction } from '~/transaction';
import { Pubkey, Secret } from '~/types/account';
import { SplToken } from '~/suite-spl-token';
import { AuthorityOptions } from '~/types/shared';

export namespace RegularNft {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const burn = (
    mint: Pubkey,
    owner: Pubkey,
    signer: Secret,
    options: Partial<AuthorityOptions>,
  ): Result<Transaction, Error> => {
    const feePayer = options.feePayer;
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
