import { Constants, Try } from '~/shared';
import { FileContent } from '~/types/converter';
import { PhantomProvider } from '~/types/phantom';
import Irys, { WebIrys } from '@irys/sdk';

export namespace ProvenanceLayer {
  export const upload = () => {};
  const TOKEN = 'solana';

  export const toBuffer = (content: FileContent) => {
    return Try(async () => {
      let buffer: ArrayBuffer;
      if (typeof content === 'string') {
        buffer = (await import('fs')).readFileSync(content);
      } else if (isArrayBuffer(content)) {
        buffer = content;
      } else {
        throw Error('No match content type');
      }
      return buffer;
    });
  };

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

  export const getWebIrys = async (provider: PhantomProvider) => {
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
