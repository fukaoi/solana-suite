import { Pubkey, Result } from '@solana-suite/shared';
import { UserSideInput, UserSideOutput } from '@solana-suite/shared-metaplex';
import { Find, Sortable, SplToken } from '@solana-suite/core';

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
    onOk: Find.OnOk,
    onErr: Find.OnErr,
    options?: { sortable?: Sortable; isHolder?: boolean }
  ): Promise<void> => {
    const sortable = !options?.sortable ? Sortable.Desc : options?.sortable;
    const isHolder = !options?.isHolder ? true : false;
    await SplToken.genericFindByOwner<UserSideOutput.NftMetadata>(
      owner,
      (result) => result.match(onOk, onErr),
      UserSideInput.TokenStandard.NonFungible,
      sortable,
      isHolder
    );
  };

  /**
   * Fetch minted metadata by mint address
   *
   * @param {Pubkey} mint
   * @return Promise<Result<UserSideOutput.NftMetadata, Error>>
   */
  export const findByMint = async (
    mint: Pubkey
  ): Promise<Result<UserSideOutput.TokenMetadata, Error>> => {
    return await SplToken.genericFindByMint<UserSideOutput.NftMetadata>(
      mint,
      UserSideInput.TokenStandard.NonFungible
    );
  };
}
