import {
  Constants,
  debugLog,
  isBrowser,
  isNode,
  Secret,
} from '@solana-suite/shared';
import { Identity, Phantom, Tags, UploadableFileType } from './types';

import { FileContent } from '@solana-suite/shared-metaplex';
import Irys, { WebIrys } from '@irys/sdk';
import { UploadResponse } from '@irys/sdk/build/esm/common/types';

export namespace ProvenanceLayer {
  const TOKEN = 'solana';

  export const uploadFile = async (
    uploadFile: FileContent,
    identity: Identity,
    tags?: Tags,
  ): Promise<string> => {
    const irys = await getIrys(identity);
    let receipt!: UploadResponse;
    if (isUploadable(uploadFile)) {
      receipt = await irys.uploadFile(uploadFile, { tags });
    } else {
      throw Error('No match file type or enviroment');
    }
    return `${Constants.IRYS_GATEWAY_URL}/${receipt.id}`;
  };

  export const uploadData = async (
    data: string,
    identity: Identity,
    tags?: Tags,
  ): Promise<string> => {
    const irys = await getIrys(identity);
    const receipt = await irys.upload(data, { tags });
    return `${Constants.IRYS_GATEWAY_URL}/${receipt.id}`;
  };

  export const isNodeable = (value: unknown): value is string => {
    if (isNode()) {
      return typeof value === 'string';
    }
    return false;
  };

  export const isBrowserable = (value: unknown): value is File => {
    if (isBrowser()) {
      return value instanceof File;
    }
    return false;
  };

  export const isUploadable = (value: unknown): value is UploadableFileType => {
    if (isNode()) {
      return typeof value === 'string';
    } else if (isBrowser()) {
      return value instanceof File;
    }
    return false;
  };

  // @internal
  export const fundArweave = async (
    uploadFile: FileContent,
    identity: Identity,
  ): Promise<void> => {
    const irys = await getIrys(identity);
    const byteLength = await toByteLength(uploadFile);
    const willPay = await calculateCost(byteLength, identity);
    const fundTx = await irys.fund(irys.utils.toAtomic(willPay));
    debugLog('# fundTx: ', fundTx);
  };

  // @internal
  export const toByteLength = async (content: FileContent): Promise<number> => {
    let length = 100;
    if (isNodeable(content)) {
      length = (await import('fs')).readFileSync(content).length;
    } else if (isBrowserable(content)) {
      length = content.size;
    } else {
      throw Error('No match content type');
    }
    return length;
  };

  // @internal
  export const getIrys = async <T extends Irys | WebIrys>(
    identity: Identity,
  ) => {
    if (isNode()) {
      return getNodeIrys(identity as Secret) as T;
    } else if (isBrowser()) {
      return (await getBrowserIrys(identity as Phantom)) as T;
    } else {
      throw Error('Only Node.js or Browser');
    }
  };

  // @internal
  export const getNodeIrys = (secret: Secret) => {
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
  export const getBrowserIrys = async (provider: Phantom): Promise<WebIrys> => {
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

  const calculateCost = async (size: number, identity: Identity) => {
    const irys = await getIrys(identity);
    const priceAtomic = await irys.getPrice(size);
    const priceConverted = irys.utils.fromAtomic(priceAtomic);
    debugLog('# size: ', size);
    debugLog('# price: ', priceConverted);
    return priceConverted;
  };
}
