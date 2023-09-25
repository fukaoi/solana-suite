import { Pubkey, Result } from 'shared';
import { UserSideInput } from 'types/converter';
import { Find, OnErr, OnOk, Sortable, SplToken } from '@solana-suite/core';
import { NftMetadata } from '../types/';

export namespace Metaplex {
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
    onOk: OnOk<Find>,
    onErr: OnErr,
    options?: { sortable?: Sortable; isHolder?: boolean }
  ): Promise<void> => {
    const sortable = !options?.sortable ? Sortable.Desc : options?.sortable;
    const isHolder = !options?.isHolder ? true : false;
    await SplToken.genericFindByOwner(
      owner,
      (result: Result<[], Error>) => result.match(onOk, onErr),
      UserSideInput.TokenStandard.NonFungible,
      sortable,
      isHolder
    );
  };

  /**
   * Fetch minted metadata by mint address
   *
   * @param {Pubkey} mint
   * @return Promise<Result<NftMetadata, Error>>
   */
  export const findByMint = async (
    mint: Pubkey
  ): Promise<Result<NftMetadata, Error>> => {
    // return await SplToken.genericFindByMint<NftMetadata>(
    return await SplToken.genericFindByMint(
      mint,
      UserSideInput.TokenStandard.NonFungible
    );
  };
}
