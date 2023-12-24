import { Pubkey } from '~/types/account';
import { DasApi } from '~/das-api';
import { Result, Try } from '~/shared';
import { Metadata, NftMetadata } from '~/types/nft';
import { FindOptions } from '~/types/find';

export namespace CompressedNft {
  /**
   * Find nft by owner address
   *
   * @param {Pubkey} owner
   * @param {Partial<FindOptions>} options
   * @return Promise<Result<CompressedNftMetadata, Error>>
   */
  export const findByOwner = async (
    owner: Pubkey,
    options: Partial<FindOptions> = {},
  ): Promise<Result<NftMetadata, Error>> => {
    return Try(async () => {
      return await DasApi.findByOwner(owner, true, options);
    });
  };

  /**
   * Find nft by mint address
   *
   * @param {Pubkey} mint
   * @return Promise<Result<NftMetadata, Error>>
   */
  export const findByMint = async (
    mint: Pubkey,
  ): Promise<Result<Partial<Metadata>, Error>> => {
    return Try(async () => {
      return await DasApi.findByMint(mint, true);
    });
  };

  /**
   * Find nft by collection mint
   *
   * @param {Pubkey} collectionMint
   * @param {Partial<FindOptions>} options
   * @return Promise<Result<CompressedNftMetadata, Error>>
   */
  export const findByCollection = async (
    collectionMint: Pubkey,
    options: Partial<FindOptions> = {},
  ): Promise<Result<NftMetadata, Error>> => {
    return Try(async () => {
      return DasApi.findByCollection(collectionMint, true, options);
    });
  };
}
