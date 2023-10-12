import { Constants } from '~/shared';
import { FileContent } from '~/types/converter';
import { PhantomProvider } from '~/types/phantom';
import Irys, { WebIrys } from '@irys/sdk';

export namespace ProvenanceLayer {
  export const upload = () => {};
  const TOKEN = 'solana';

  // @internal
  export const toBuffer = async (
    content: FileContent,
  ): Promise<ArrayBuffer> => {
    let buffer: ArrayBuffer;
    if (typeof content === 'string') {
      buffer = (await import('fs')).readFileSync(content);
    } else if (isArrayBuffer(content)) {
      buffer = content;
    } else {
      throw Error('No match content type');
    }
    return buffer;
  };

  // @internal
  export const getIrys = async (secret: Secret) => {
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
}
