import { Commitment, PublicKey } from '@solana/web3.js';
import Config from '@solana-suite/config';

// WARNING: Not to be a circular reference
export namespace Constants {
  export const currentCluster = Config.cluster.type;
  export const customClusterUrl = Config.cluster.customClusterUrl;
  export const isDebugging = Config.debugging;
  export const nftStorageApiKey = Config.nftstorage.apikey;

  export enum Cluster {
    prd = 'mainnet-beta',
    prdMetaplex = 'mainnet-beta-metaplex',
    dev = 'devnet',
    test = 'testnet',
    localhost = 'localhost-devnet',
  }

  export enum EndPointUrl {
    prd = 'https://api.mainnet-beta.solana.com',
    prdMetaplex = 'https://api.metaplex.solana.com',
    dev = 'https://api.devnet.solana.com',
    test = 'https://api.testnet.solana.com',
    localhost = 'http://api.devnet.solana.com',
  }

  export const switchCluster = (param: {
    cluster?: string;
    customClusterUrl?: string[];
  }): string => {
    const { cluster: env, customClusterUrl } = param;

    // if setted custom url, most priority
    if (customClusterUrl && customClusterUrl.length > 0) {
      const index = Date.now() % customClusterUrl.length;
      return customClusterUrl[index];
    }

    switch (env) {
      case Constants.Cluster.prd:
        return Constants.EndPointUrl.prd;
      case Constants.Cluster.prdMetaplex:
        return Constants.EndPointUrl.prdMetaplex;
      case Constants.Cluster.test:
        return Constants.EndPointUrl.test;
      case Constants.Cluster.dev:
        return Constants.EndPointUrl.dev;
      default:
        return Constants.EndPointUrl.localhost;
    }
  };

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

  export const WRAPPED_TOKEN_PROGRAM_ID = new PublicKey(
    'So11111111111111111111111111111111111111112',
  );
  export const MEMO_PROGRAM_ID = new PublicKey(
    'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo',
  );
  export const METAPLEX_PROGRAM_ID = new PublicKey(
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  );
  export const COMMITMENT: Commitment = 'confirmed';
  export const NFT_STORAGE_API_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';
  export const NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
  export const BUNDLR_NETWORK_URL = switchBundlr(Config.cluster.type);
}
