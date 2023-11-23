import { SplToken } from '~/suite-spl-token';
import { Result } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { Transaction } from '~/transaction';
import { AuthorityOptions } from '../../types/src/shared/shared';

export namespace RegularNft {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const transfer = (
    mint: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    options: Partial<AuthorityOptions> = {},
  ): Promise<Result<Transaction, Error>> => {
    return SplToken.transfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      options.feePayer,
    );
  };
}
