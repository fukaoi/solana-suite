import { SplToken } from '~/suite-spl-token';
import { Result } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { TransferOptions } from '~/types/regular-nft';
import { CommonStructure } from '~/types/transaction-builder';

export namespace RegularNft {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  /**
   * Transfer NFT
   *
   * @param {Pubkey} mint             // mint address
   * @param {Pubkey} owner            // current owner
   * @param {Pubkey} dest             // new owner
   * @param {ThawOptions} options     // options
   * @return {Result<CommonStructure<unknown>, Error> }
   */
  export const transfer = (
    mint: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    ownerOrMultisig: Secret[],
    options: Partial<TransferOptions> = {},
  ): Promise<Result<CommonStructure, Error>> => {
    return SplToken.transfer(
      mint,
      owner,
      dest,
      ownerOrMultisig,
      NFT_AMOUNT,
      NFT_DECIMALS,
      options,
    );
  };
}
