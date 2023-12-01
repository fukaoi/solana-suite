import { Converter } from '~/converter';
import { DasApi } from '~/das-api';
import { Result, Try } from '~/shared';
import { Offchain } from '~/types/storage';
import { CompressedNftMetadata, NftMetadata } from '~/types/compressed-nft';

import { FindOptions, Sortable, SortBy, SortDirection } from '~/types/find';

export namespace CompressedNft {
  //@internal
  export const defaultSortBy: Sortable = {
    sortBy: SortBy.Recent,
    sortDirection: SortDirection.Desc,
  };

  const fetchOffchain = async (uri: string) => {
    const json = await (await fetch(uri)).json();
    return json;
  };

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
  ): Promise<Result<CompressedNftMetadata, Error>> => {
    return Try(async () => {
      const defaultOptions = {
        limit: 1000,
        page: 1,
        sortBy: defaultSortBy,
      };
      const { limit, page, sortBy, before, after } = {
        ...defaultOptions,
        ...options,
      };

      const assets = await DasApi.getAssetsByOwner(
        owner,
        limit,
        page,
        sortBy,
        before,
        after,
      );
      if (assets.isErr) {
        throw assets.error;
      }

      const items = assets.value.items;

      const metadatas = await Promise.all(
        items
          .filter((item) => item.compression.compressed === true)
          .map(async (item) => {
            const offchain: Offchain = await fetchOffchain(
              item.content.json_uri,
            );
            const merged = {
              onchain: item,
              offchain: offchain,
            };
            return Converter.CompressedNftMetadata.intoUser(merged);
          }),
      );
      return {
        page: assets.value.page,
        total: assets.value.total,
        limit: assets.value.limit,
        metadatas,
      };
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
  ): Promise<Result<NftMetadata, Error>> => {
    return Try(async () => {
      const asset = await DasApi.getAsset(mint);
      if (asset.isErr) {
        throw asset.error;
      }

      const offchain: Offchain = await fetchOffchain(
        asset.value.content.json_uri,
      );
      const merged = {
        onchain: asset.value,
        offchain: offchain,
      };
      return Converter.CompressedNftMetadata.intoUser(merged);
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
  ): Promise<Result<CompressedNftMetadata, Error>> => {
    return Try(async () => {
      const defaultOptions = {
        limit: 1000,
        page: 1,
        sortBy: defaultSortBy,
      };
      const { limit, page, sortBy, before, after } = {
        ...defaultOptions,
        ...options,
      };

      const assets = await DasApi.getAssetsByGroup(
        'collection',
        collectionMint,
        limit,
        page,
        sortBy,
        before,
        after,
      );
      if (assets.isErr) {
        throw assets.error;
      }

      const items = assets.value.items;

      const metadatas = await Promise.all(
        items
          .filter((item) => item.compression.compressed === true)
          .map(async (item) => {
            const offchain: Offchain = await fetchOffchain(
              item.content.json_uri,
            );
            const merged = {
              onchain: item,
              offchain: offchain,
            };
            return Converter.CompressedNftMetadata.intoUser(merged);
          }),
      );
      return {
        page: assets.value.page,
        total: assets.value.total,
        limit: assets.value.limit,
        metadatas,
      };
    });
  };
}
