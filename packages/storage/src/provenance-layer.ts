import { Constants, debugLog, isBrowser, isNode, Try } from '~/shared';
import { FileContent } from '~/types/converter';
import { PhantomProvider } from '~/types/phantom';
import Irys, { WebIrys } from '@irys/sdk';
import { UploadResponse } from '@irys/sdk/build/esm/common/types';

export namespace ProvenanceLayer {
  const TOKEN = 'solana';

  export const uploadFile = (
    uploadFile: string | File,
    identity: Secret | PhantomProvider,
  ) => {
    Try(async () => {
      const irys = await getIrys(identity);
      const tags = [{ name: 'application-id', value: 'MyNFTDrop' }];

      const buffer = await toBuffer(uploadFile);
      const willPay = await calculateCost(buffer.byteLength, identity);
      const fundTx = await irys.fund(irys.utils.toAtomic(willPay));
      debugLog('#fundTx: ', fundTx);
      let receipt!: UploadResponse;
      if (isNode() && typeof uploadFile === 'string') {
        receipt = await (irys as Irys).uploadFile(uploadFile, { tags });
      } else if (isBrowser() && typeof uploadFile !== 'string') {
        receipt = await (irys as WebIrys).uploadFile(uploadFile, { tags });
      }
      return `https://gateway.irys.xyz/${receipt.id}`;
    });
  };

  // @internal
  export const toBuffer = async (
    content: FileContent,
  ): Promise<ArrayBuffer> => {
    let buffer: ArrayBuffer;
    if (typeof content === 'string') {
      buffer = (await import('fs')).readFileSync(content);
    } else if (content instanceof File) {
      // todo File
      buffer = content;
    } else if (isArrayBuffer(content)) {
      buffer = content;
    } else {
      throw Error('No match content type');
    }
    return buffer;
  };

  // @internal
  export const getIrys = async (identity: Secret | PhantomProvider) => {
    return isNode()
      ? await getNodeIrys(identity as Secret)
      : await getBrowserIrys(identity as PhantomProvider);
  };

  // @internal
  export const getNodeIrys = async (secret: Secret) => {
    const url = Constants.BUNDLR_NETWORK_URL;
    const clusterUrl = Constants.currentCluster;
    const token = TOKEN;
    const key = secret;
    const irys = new Irys({
      url,
      token,
      key,
      config: { providerUrl: clusterUrl },
    });
    return irys;
  };

  // @internal
  export const getBrowserIrys = async (
    provider: PhantomProvider,
  ): Promise<WebIrys> => {
    const url = Constants.BUNDLR_NETWORK_URL;
    const token = TOKEN;
    const clusterUrl = Constants.currentCluster;
    const wallet = { rpcUrl: clusterUrl, name: TOKEN, provider: provider };
    const webIrys = new WebIrys({ url, token, wallet });
    await webIrys.ready();
    return webIrys;
  };

  const isArrayBuffer = (value: any): value is ArrayBuffer => {
    return value instanceof ArrayBuffer;
  };

  const calculateCost = async (
    size: number,
    identity: Secret | PhantomProvider,
  ) => {
    const irys = await getIrys(identity);
    const priceAtomic = await irys.getPrice(size);
    const priceConverted = irys.utils.fromAtomic(priceAtomic);
    debugLog('#size: ', size);
    debugLog(`#price: ${priceConverted}`);
    return priceConverted;
  };
}
