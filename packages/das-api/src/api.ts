import { Constants, debugLog, Result, Try } from '~/shared';
import { Asset, AssetProof, Assets } from '~/types/das-api';
import { Sortable } from '~/types/find';

export namespace DasApi {
  const connect = async (
    method: string,
    params: (string | Pubkey | Sortable | number | undefined)[],
  ) => {
    Constants.WarnningMessage.calculateProbability() &&
      console.warn(Constants.WarnningMessage.DAS_API_URL);
    debugLog('# das api url: ', Constants.DAS_API_URL);
    const response = await fetch(Constants.DAS_API_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        id: 'compression',
        params,
      }),
    });
    return (await response.json()).result;
  };

  export const getAssetProof = async (
    assetId: string,
  ): Promise<Result<AssetProof, Error>> => {
    return Try(async () => {
      return await connect('getAssetProof', [assetId]);
    });
  };

  export const getAsset = async (
    assetId: Pubkey,
  ): Promise<Result<Asset, Error>> => {
    return Try(async () => {
      return await connect('getAsset', [assetId]);
    });
  };

  export const getAssetsByOwner = async (
    ownerAddress: Pubkey,
    limit: number = 1000,
    page: number = 1,
    sortBy?: Sortable,
    before?: string,
    after?: string,
  ): Promise<Result<Assets, Error>> => {
    return Try(async () => {
      return await connect('getAssetsByOwner', [
        ownerAddress,
        sortBy,
        limit,
        page,
        before,
        after,
      ]);
    });
  };

  export const getAssetsByGroup = async (
    groupKey: string,
    groupValue: Pubkey,
    limit: number = 1000,
    page: number = 1,
    sortBy?: Sortable,
    before?: string,
    after?: string,
  ): Promise<Result<Assets, Error>> => {
    return Try(async () => {
      return await connect('getAssetsByGroup', [
        groupKey,
        groupValue,
        sortBy,
        limit,
        page,
        before,
        after,
      ]);
    });
  };
}
