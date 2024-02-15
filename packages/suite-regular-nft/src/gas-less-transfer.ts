import { Result } from '~/suite-utils';
import { Pubkey, Secret } from '~/types/account';
import { PartialSignStructure } from '~/types/transaction-builder';
import { GasLessTransferOptions } from '~/types/regular-nft';
import { SplToken } from '~/suite-spl-token';

export namespace RegularNft {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  /**
   * Transfer without solana sol, delegate feepayer for commission
   *
   * @param {Pubkey} mint
   * @param {Secret} owner
   * @param {Pubkey} dest
   * @param {Pubkey} feePayer
   * @param {Partial<GasLessTransferOptions>} options
   * @return Promise<Result<PartialSignStructure, Error>>
   */
  export const gasLessTransfer = async (
    mint: Pubkey,
    owner: Secret,
    dest: Pubkey,
    feePayer: Pubkey,
    options: Partial<GasLessTransferOptions> = {},
  ): Promise<Result<PartialSignStructure, Error>> => {
    return SplToken.gasLessTransfer(
      mint,
      owner,
      dest,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer,
      options,
    );
  };
}
