import { Finality, PublicKey } from '@solana/web3.js';
import SolanaJsonConfig from '@solana-suite/config/load';

export let Config = SolanaJsonConfig;

export namespace Constants {
  export namespace WarnningMessage {
    export const NFT_STORAGE_API_KEY = `
        [YOU HAVE TO DO]
        --------------------------------------
        You need to update nftStorageApiKey define parameter in solana-suite.json.
        Can get api key from https://nft.storage/
        --------------------------------------
        `;
    export const DAS_API_URL = `
        [YOU HAVE TO DO]
        --------------------------------------
        You need to update dasApiUrl define parameter in solana-suite.json.
        can get api url from https://www.helius.dev/
        -------------------------------------- 
        `;
    // export const ANNOUNCE = `
    //     [DEPRECATED]
    //     --------------------------------------
    //     Account, Node, toExplorer, Pubkey, Secret have been moved to
    //     @solana-suite/utils
    //     -------------------------------------
    //     `;
  }
}

export namespace Constants {
  export const currentCluster = Config.cluster.type;
  export const customClusterUrl = Config.cluster.customClusterUrl;
  export const isDebugging = Config.debugging;
  export const customNftStorageApiKey = Config.nftStorageApiKey;
  export const customDasApiUrl = Config.dasApiUrl;

  export enum Cluster {
    prd = 'mainnet-beta',
    prdMetaplex = 'mainnet-beta-metaplex',
    dev = 'devnet',
    localhost = 'localhost-devnet',
  }

  export enum EndPointUrl {
    prd = 'https://api.mainnet-beta.solana.com',
    prdMetaplex = 'https://api.metaplex.solana.com',
    dev = 'https://api.devnet.solana.com',
    localhost = 'http://api.devnet.solana.com',
  }

  export enum BundlrUrl {
    prd = 'https://node1.irys.xyz,https://node2.irys.xyz',
    dev = 'https://devnet.irys.xyz',
  }

  export enum DasApiUrl {
    prd = 'https://mainnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92',
    dev = 'https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92',
  }

  export enum NftstorageApiKey {
    prd = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE',
    dev = prd,
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
      case Constants.Cluster.dev:
        return Constants.EndPointUrl.dev;
      default:
        return Constants.EndPointUrl.localhost;
    }
  };

  export const switchBundlr = (env: string): string => {
    switch (env) {
      case Constants.Cluster.prd: {
        const urls = Constants.BundlrUrl.prd.split(',');
        const index = Date.now() % urls.length;
        return urls[index];
      }
      default: {
        return Constants.BundlrUrl.dev;
      }
    }
  };

  export const switchDasApi = (env: string): string => {
    // if setted custom das url, most priority
    if (customDasApiUrl && customDasApiUrl.length > 0) {
      const index = Date.now() % customDasApiUrl.length;
      return customDasApiUrl[index];
    }

    switch (env) {
      case Constants.Cluster.prd: {
        if (customDasApiUrl.length < 1) {
          console.warn(Constants.WarnningMessage.DAS_API_URL);
        }
        const urls = Constants.DasApiUrl.prd.split(',');
        const index = Date.now() % urls.length;
        return urls[index];
      }
      default: {
        const urls = Constants.DasApiUrl.dev.split(',');
        const index = Date.now() % urls.length;
        return urls[index];
      }
    }
  };

  export const switchNftStorage = (env: string): string => {
    // if setted custom nft.storage api key, most priority
    if (customNftStorageApiKey) {
      return customNftStorageApiKey;
    }

    switch (env) {
      case Constants.Cluster.prd:
        return Constants.NftstorageApiKey.prd;
      default: {
        return Constants.NftstorageApiKey.dev;
      }
    }
  };

  export const loadConfig = async () => {
    Config = await import('@solana-suite/config/load');
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
  export const COMMITMENT: Finality = 'confirmed';
  export const MAX_TRANSACTION_VERSION: number = 0;
  export const MAX_TRANSACTION_RETRIES = 1;
  export const NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
  export const IRYS_GATEWAY_URL = 'https://gateway.irys.xyz';
  export const BUNDLR_NETWORK_URL = switchBundlr(Config.cluster.type);
  export const DAS_API_URL = switchDasApi(Config.cluster.type);
  export const NFT_STORAGE_API_KEY = switchNftStorage(Config.cluster.type);
  export const EXPLORER_SOLSCAN_URL = 'https://solscan.io';
  export const EXPLORER_SOLANAFM_URL = 'https://solana.fm';
  export const EXPLORER_XRAY_URL = 'https://xray.helius.xyz';
}

// Display All Announce
// console.log(Constants.WarnningMessage.ANNOUNCE);
