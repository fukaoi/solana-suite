import { Result, Try } from '~/shared';
import { Asset, AssetProof, Assets } from '~/types/das-api';
import { Sortable } from '~/types/find';

const rpcUrl =
  'https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639';
export namespace DasApi {
  export const getAssetProof = async (
    assetId: string,
  ): Promise<Result<AssetProof, Error>> => {
    return Try(async () => {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getAssetProof',
          id: 'compression',
          params: [assetId],
        }),
      });
      return (await response.json()).result;
    });
  };

  export const getAsset = async (
    assetId: Pubkey,
  ): Promise<Result<Asset, Error>> => {
    return Try(async () => {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getAsset',
          id: 'compression',
          params: [assetId],
        }),
      });
      return (await response.json()).result;
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
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getAssetsByOwner',
          id: 'compression',
          params: [ownerAddress, sortBy, limit, page, before, after],
        }),
      });
      return (await response.json()).result;
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
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getAssetsByGroup',
          id: 'compression',
          params: [groupKey, groupValue, sortBy, limit, page, before, after],
        }),
      });
      return (await response.json()).result;
    });
  };
}
