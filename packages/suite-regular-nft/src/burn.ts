import { Result } from '~/suite-utils';
import { Pubkey, Secret } from '~/types/account';
import { SplToken } from '~/suite-spl-token';
import { CommonStructure } from '~/types/transaction-builder';
import { BurnOptions } from '~/types/regular-nft';

export namespace RegularNft {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  /**
   * Burn existing token
   *
   * @param {Pubkey}  mint
   * @param {Pubkey}  owner
   * @param {Secret[]}  ownerOrMultisig
   * @param {Partial<BurnOptions>} options
   * @return Result<CommonStructure, Error>>
   */
  export const burn = (
    mint: Pubkey,
    owner: Pubkey,
    ownerOrMultisig: Secret[],
    options: Partial<BurnOptions> = {},
  ): Result<CommonStructure, Error> => {
    const feePayer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
    return SplToken.burn(
      mint,
      owner,
      ownerOrMultisig,
      NFT_AMOUNT,
      NFT_DECIMALS,
      {
        feePayer,
      },
    );
  };
}
