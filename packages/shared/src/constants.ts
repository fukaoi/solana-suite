import { Commitment, PublicKey } from '@solana/web3.js';
import Config from '@solana-suite/config';

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

  export enum BundlrUrl {
    prd = 'https://node1.irys.xyz,https://node2.irys.xyz',
    dev = 'https://devnet.irys.xyz',
  }

  export enum DasApiUrl {
    dev = 'https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92,https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639',
  }

  export enum NftstorageApiKey {
    dev = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE',
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
      case Constants.Cluster.prd:
        const urls = Constants.BundlrUrl.prd.split(',');
        const index = Date.now() % urls.length;
        return urls[index];
      default: {
        return Constants.BundlrUrl.dev;
      }
    }
  };

  export const switchDasApi = (env: string): string => {
    const warning = WarnningMessage.DAS_API_URL;
    switch (env) {
      case Constants.Cluster.prd:
        throw Error(warning);
      default: {
        Constants.WarnningMessage.calculateProbability() &&
          console.warn(warning);
        console.warn(Constants.WarnningMessage);
        const urls = Constants.DasApiUrl.dev.split(',');
        const index = Date.now() % urls.length;
        return urls[index];
      }
    }
  };

  export const switchNftStorage = (env: string): string => {
    const warning = WarnningMessage.NFT_STORAGE_API_KEY;
    switch (env) {
      case Constants.Cluster.prd:
        throw Error(warning);
      default: {
        Constants.WarnningMessage.calculateProbability() &&
          console.warn(warning);
        return Constants.NftstorageApiKey.dev;
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
  export const NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
  export const IRYS_GATEWAY_URL = 'https://gateway.irys.xyz';
  export const BUNDLR_NETWORK_URL = switchBundlr(Config.cluster.type);
  export const DAS_API_URL = switchDasApi(Config.cluster.type);
  export const NFT_STORAGE_API_KEY = switchNftStorage(Config.cluster.type);
  Config.cluster.type;
  export const EXPLORER_SOLSCAN_URL = 'https://solscan.io';
  export const EXPLORER_SOLANAFM_URL = 'https://solana.fm';
  export const EXPLORER_XRAY_URL = 'https://xray.helius.xyz';
}

export namespace Constants {
  export namespace WarnningMessage {
    export const NFT_STORAGE_API_KEY = `
        [Warning]
        --------------------------------------
        You need to update nftStorage.apiKey define parameter in solana-suite.json.
        Can get api key from https://nft.storage/
        --------------------------------------
        `;
    export const DAS_API_URL = `
        [Warning]
        --------------------------------------
        You need to update dasApiUrl define parameter in solana-suite.json.
        can get api url from https://www.helius.dev/
        -------------------------------------- 
        `;

    export const calculateProbability = (): Boolean => {
      const randomValue = Math.random();
      const probability = 1 / 3;
      return randomValue < probability;
    };
  }
}
