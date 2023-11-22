import { Result } from '~/shared';
import { Pubkey } from '~/types/account';
import { RegularNftMetadata } from '~/types/regular-nft';
import { SplToken } from '~/suite-spl-token';
import { SortDirection } from '~/types/find';
import { OnErr, OnOk } from '~/types/shared';
import { TokenStandard } from '@metaplex-foundation/mpl-token-metadata';

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
    onOk: OnOk<RegularNftMetadata>,
    onErr: OnErr,
    options?: { sortable?: SortDirection; isHolder?: boolean },
  ): Promise<void> => {
    const sortable = !options?.sortable
      ? SortDirection.Desc
      : options?.sortable;
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
  ): Promise<Result<RegularNftMetadata, Error>> => {
    // return await SplToken.genericFindByMint<NftMetadata>(
    return await SplToken.genericFindByMint(mint, TokenStandard.NonFungible);
  };
}
