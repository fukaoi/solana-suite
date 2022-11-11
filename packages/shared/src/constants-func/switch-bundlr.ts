import { Constants } from '../constants/enum';

export namespace ConstantsFunc {
  export const switchBundlr = (env: string): string => {
    switch (env) {
      case Constants.Cluster.dev:
      case Constants.Cluster.test:
      case Constants.Cluster.localhost:
        return 'https://devnet.bundlr.network';
      default: {
        const index = Date.now() % 2;
        const clusters = [
          'https://node1.bundlr.network',
          'https://node2.bundlr.network',
        ];
        return clusters[index];
      }
    }
  };
}
