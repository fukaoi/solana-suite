import { Result, Try } from '~/shared';
import { AssetProof } from '~/types/das-api';

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
          method: 'get_asset_proof',
          id: 'compression-example',
          params: [assetId],
        }),
      });
      return (await response.json()).result;
    });
  };

  // export const getAsset = (assetId: any): Promise<any> => {
  //   try {
  //     const response = await axios.post(this.rpcUrl, {
  //       jsonrpc: '2.0',
  //       method: 'get_asset',
  //       id: 'compression-example',
  //       params: [assetId],
  //     });
  //     return response.data.result;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
}
