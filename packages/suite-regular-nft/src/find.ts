import { Result } from '~/shared';
import { Pubkey } from '~/types/account';
import { NftMetadata, TokenStandard } from '~/types/regular-nft';
import { SplToken } from '~/suite-spl-token';
import { Sortable } from '~/types/find';
import { OnErr, OnOk } from '~/types/shared';

export namespace RegularNft {
  /**
   * Fetch minted metadata by owner Pubkey
   *
   * @param {Pubkey} owner
   * @param {OnOk} onOk callback function
   * @param {OnErr} onErr callback function
   * @param {{sortable?: Sortable, isHolder?: boolean}} options?
   * @return Promise<void>
   */
  export const findByOwner = async (
    owner: Pubkey,
    onOk: OnOk<NftMetadata>,
    onErr: OnErr,
    options?: { sortable?: Sortable; isHolder?: boolean },
  ): Promise<void> => {
    const sortable = !options?.sortable ? Sortable.Desc : options?.sortable;
    const isHolder = !options?.isHolder ? true : false;
    await SplToken.genericFindByOwner(
      owner,
      (result: Result<[], Error>) => result.match(onOk, onErr),
      TokenStandard.NonFungible,
      sortable,
      isHolder,
    );
  };

  /**
   * Fetch minted metadata by mint address
   *
   * @param {Pubkey} mint
   * @return Promise<Result<NftMetadata, Error>>
   */
  export const findByMint = async (
    mint: Pubkey,
  ): Promise<Result<NftMetadata, Error>> => {
    // return await SplToken.genericFindByMint<NftMetadata>(
    return await SplToken.genericFindByMint(mint, TokenStandard.NonFungible);
  };
}
