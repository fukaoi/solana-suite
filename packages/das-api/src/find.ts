import { Converter } from '~/converter';
import { Pubkey } from '~/types/account';
import { Metadata, NftMetadata } from '~/types/nft';
import { Offchain } from '~/types/storage';
import { FindOptions, Sortable, SortBy, SortDirection } from '~/types/find';
import { DasApi as Api } from './api';
import { debugLog } from '~/suite-utils';

export namespace DasApi {
  //@internal
  export const defaultSortBy: Sortable = {
    sortBy: SortBy.Recent,
    sortDirection: SortDirection.Desc,
  };

  export const fetchOffchain = async (uri: string) => {
    const response = await fetch(uri);
    if (response.status !== 200) {
      return {};
    }
    return await response.json();
  };

  /**
   * Find nft by mint address
   *
   * @param {Pubkey} mint
   * @param {boolean} isCompressed
   * @return Promise<Result<NftMetadata, Error>>
   */
  export const findByMint = async (
    mint: Pubkey,
    isCompressed: boolean,
  ): Promise<Partial<Metadata>> => {
    const asset = await Api.getAsset(mint);
    if (asset.isErr) {
      throw asset.error;
    }

    if (asset.value.compression.compressed === isCompressed) {
      const offchain: Offchain = await fetchOffchain(
        asset.value.content.json_uri,
      );
      const merged = {
        onchain: asset.value,
        offchain: offchain,
      };
      return Converter.Nft.intoUser(merged);
    }
    return {};
  };

  /**
   * Find nft by owner address
   *
   * @param {Pubkey} owner
   * @param {boolean} isCompressed
   * @param {Partial<FindOptions>} options
   * @return Promise<Result<CompressedNftMetadata, Error>>
   */
  export const findByOwner = async (
    owner: Pubkey,
    isCompressed: boolean,
    options: Partial<FindOptions> = {},
  ): Promise<NftMetadata> => {
    const defaultOptions = {
      limit: 1000,
      page: 1,
      sortBy: defaultSortBy,
    };
    const { limit, page, sortBy, before, after } = {
      ...defaultOptions,
      ...options,
    };

    const assets = await Api.getAssetsByOwner(
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
        .filter((item) => item.compression.compressed === isCompressed)
        .map(async (item) => {
          try {
            const offchain: Offchain = await fetchOffchain(
              item.content.json_uri,
            );
            const merged = {
              onchain: item,
              offchain: offchain,
            };
            return Converter.Nft.intoUser(merged);
          } catch (err) {
            debugLog('# Failed fetch offchain url: ', item.content.json_uri);
            return Converter.Nft.intoUser({
              onchain: item,
              offchain: {},
            });
          }
        }),
    );
    return {
      page: assets.value.page,
      total: assets.value.total,
      limit: assets.value.limit,
      metadatas,
    };
  };

  /**
   * Find nft by collection mint
   *
   * @param {Pubkey} collectionMint
   * @param {boolean} isCompressed,
   * @param {Partial<FindOptions>} options
   * @return Promise<Result<CompressedNftMetadata, Error>>
   */
  export const findByCollection = async (
    collectionMint: Pubkey,
    isCompressed: boolean,
    options: Partial<FindOptions> = {},
  ): Promise<NftMetadata> => {
    const defaultOptions = {
      limit: 1000,
      page: 1,
      sortBy: defaultSortBy,
    };
    const { limit, page, sortBy, before, after } = {
      ...defaultOptions,
      ...options,
    };

    const assets = await Api.getAssetsByGroup(
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
        .filter((item) => item.compression.compressed === isCompressed)
        .map(async (item) => {
          const offchain: Offchain = await fetchOffchain(item.content.json_uri);
          const merged = {
            onchain: item,
            offchain: offchain,
          };
          return Converter.Nft.intoUser(merged);
        }),
    );
    return {
      page: assets.value.page,
      total: assets.value.total,
      limit: assets.value.limit,
      metadatas,
    };
  };
}
