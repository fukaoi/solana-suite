import { Constants, debugLog, isBrowser, isNode, Result, Try } from '~/shared';
import { FileContent } from '~/types/converter';
import { PhantomProvider } from '~/types/phantom';
import { UploadableFileType } from '~/types/storage';
import Irys, { WebIrys } from '@irys/sdk';
import { UploadResponse } from '@irys/sdk/build/esm/common/types';

export namespace ProvenanceLayer {
  const TOKEN = 'solana';

  export const uploadFile = (
    uploadFile: string | File,
    identity: Secret | PhantomProvider,
    tags?: [{ name: string; value: string }],
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      const irys = await getIrys(identity);
      let receipt!: UploadResponse;
      if (isUploadable(uploadFile)) {
        receipt = await irys.uploadFile(uploadFile, { tags });
      } else if (isUploadable(uploadFile)) {
        receipt = await irys.uploadFile(uploadFile, { tags });
      } else {
        throw Error('No match file type or enviroment');
      }
      return `${Constants.IRYS_GATEWAY_URL}/${receipt.id}`;
    });
  };

  // @internal
  export const fundArweave = async (
    uploadFile: string | File,
    identity: Secret | PhantomProvider,
  ): Promise<void> => {
    const irys = await getIrys(identity);
    const byteLength = await toByteLength(uploadFile);
    const willPay = await calculateCost(byteLength, identity);
    const fundTx = await irys.fund(irys.utils.toAtomic(willPay));
    debugLog('# fundTx: ', fundTx);
  };

  // @internal
  export const toByteLength = async (content: FileContent): Promise<number> => {
    let length: number = 100;
    if (isUploadable(content)) {
      length = (await import('fs')).readFileSync(content).length;
    } else if (isUploadable(content)) {
      length = content.size;
    } else if (isArrayBuffer(content)) {
      length = content.byteLength;
    } else {
      throw Error('No match content type');
    }
    return length;
  };

  // @internal
  export const getIrys = async <T extends Irys | WebIrys>(
    identity: Secret | PhantomProvider,
  ) => {
    if (isNode()) {
      return (await getNodeIrys(identity as Secret)) as T;
    } else if (isBrowser()) {
      return (await getBrowserIrys(identity as PhantomProvider)) as T;
    } else {
      throw Error('Only Node.js or Browser');
    }
  };

  // @internal
  export const getNodeIrys = async (secret: Secret) => {
    const clusterUrl = Constants.switchCluster({
      cluster: Constants.currentCluster,
    });
    const url = Constants.BUNDLR_NETWORK_URL;
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
    const clusterUrl = Constants.switchCluster({
      cluster: Constants.currentCluster,
    });
    const url = Constants.BUNDLR_NETWORK_URL;
    const token = TOKEN;
    const wallet = { rpcUrl: clusterUrl, name: TOKEN, provider: provider };
    const webIrys = new WebIrys({ url, token, wallet });
    await webIrys.ready();
    return webIrys;
  };

  const isArrayBuffer = (value: any): value is ArrayBuffer => {
    return value instanceof ArrayBuffer;
  };

  const isUploadable = (value: any): value is UploadableFileType => {
    if (isNode()) {
      return typeof value === 'string';
    } else if (isBrowser()) {
      return value instanceof File;
    }
    return false;
  };

  const calculateCost = async (
    size: number,
    identity: Secret | PhantomProvider,
  ) => {
    const irys = await getIrys(identity);
    const priceAtomic = await irys.getPrice(size);
    const priceConverted = irys.utils.fromAtomic(priceAtomic);
    debugLog('# size: ', size);
    debugLog(`# price: ${priceConverted}`);
    return priceConverted;
  };
}
