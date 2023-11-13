import { Try } from '~/shared';

const rpcUrl =
  'https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639';
export namespace Node {
  export namespace DasApi {
    export const getAssetProof = (assetId: string) => {
      Try(async () => {
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
        return response;
      });
    };
  }
}
