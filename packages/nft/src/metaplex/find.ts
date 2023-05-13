import { Pubkey, Result } from '@solana-suite/shared';
import { UserSideInput, UserSideOutput } from '@solana-suite/shared-metaplex';
import { Sortable, SplToken } from '@solana-suite/core';

export namespace Metaplex {
  /**
   * Fetch minted metadata by owner Pubkey
   *
   * @param {Pubkey} owner
   * @param {Sortable} callback
   * @param {{sortable?: Sortable, isHolder?: boolean}} options?
   * @return Promise<Result<never, Error>>
   */
  export const findByOwner = async (
    owner: Pubkey,
    callback: (result: Result<UserSideOutput.NftMetadata[], Error>) => void,
    options?: { sortable?: Sortable; isHolder?: boolean }
  ): Promise<void> => {
    const sortable = !options?.sortable ? Sortable.Desc : options?.sortable;
    const isHolder = !options?.isHolder ? true : false;
    await SplToken.genericFindByOwner<UserSideOutput.NftMetadata>(
      owner,
      callback,
      UserSideInput.TokenStandard.NonFungible,
      sortable,
      isHolder
    );
  };
}
