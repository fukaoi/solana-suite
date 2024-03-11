import { Transaction } from '@solana/web3.js';
import { Constants, debugLog, Result, Try } from '~/suite-utils';
import { Asset, AssetProof, Assets, PriorityFeeLevels } from '~/types/das-api';
import { Sortable } from '~/types/find';

export namespace DasApi {
  let dasUri: string;
  const connect = async (
    method: string,
    params: (
      | string
      | Pubkey
      | Sortable
      | number
      | undefined
      | Pubkey[]
      | Transaction
      | {
          [key: string]: unknown;
        }
    )[],
  ) => {
    dasUri = dasUri ? dasUri : Constants.DAS_API_URL;
    debugLog('# dasUri: ', dasUri);
    const response = await fetch(dasUri, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        id: 'das-api',
        params,
      }),
    });
    if (response.status !== 200) {
      const err = (await response.json()).error.message;
      throw Error(err);
    }
    return (await response.json()).result;
  };

  export const changeDasUri = (url: string): void => {
    dasUri = url;
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

  export const getPriorityFeeEstimate = async (
    accountOrTransaction: Pubkey[] | Transaction,
  ): Promise<Result<PriorityFeeLevels, Error>> => {
    return Try(async () => {
      const options = { includeAllPriorityFeeLevels: true };
      return (
        await connect('getPriorityFeeEstimate', [
          {
            accountOrTransaction,
            options,
          },
        ])
      ).priorityFeeLevels;
    });
  };
}
