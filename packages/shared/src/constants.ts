import {
  Commitment,
  PublicKey
} from '@solana/web3.js';

import Config from './solana-suite.json';
import './global';

export namespace Constants {
  export enum Cluster {
    prd = 'mainnet-beta',
    prd2 = 'mainnet-beta-sereum',
    prdrr = 'mainnet-beta-round-robin',
    dev = 'devnet',
    test = 'testnet',
    localhost = 'localhost-devnet',
    custom = 'custom',
  }

  export const currentCluster = Config.cluster.type;
  export const customUrl = Config.cluster.customUrl;
  export const isDebugging = Config.debugging;
  export const nftStorageApiKey = Config.nftstorage.apikey;
}

export namespace ConstantsFunc {
  export const switchCluster = (env: string | undefined, customUrl = Constants.customUrl): string => {
    switch (env) {
      case Constants.Cluster.prd:
        return 'https://api.mainnet-beta.solana.com';
      case Constants.Cluster.prd2:
        return 'https://solana-api.projectserum.com';
      case Constants.Cluster.test:
        return 'https://api.testnet.solana.com';
      case Constants.Cluster.dev:
        return 'https://api.devnet.solana.com';
      case Constants.Cluster.prdrr:
        // don't require rigor, as it can be repeated alternately
        const index = Date.now() % 4;
        const clusters = [
          'https://api.mainnet-beta.solana.com',
          'https://solana-api.projectserum.com',
          'https://api.mainnet-beta.solana.com',
          'https://solana-api.projectserum.com',
        ];
        return clusters[index];
      case Constants.Cluster.custom:
        return customUrl;
      default:
        return 'http://api.devnet.solana.com';
    }
  }

  export const switchBundlr = (env: string): string => {
    switch (env) {
      case Constants.Cluster.dev:
      case Constants.Cluster.test:
      case Constants.Cluster.localhost:
        return 'https://devnet.bundlr.network';
      default:
        const index = Date.now() % 2;
        const clusters = [
          'https://node1.bundlr.network',
          'https://node2.bundlr.network',
        ];
        return clusters[index];
    }
  }

}

export namespace Constants {
  String.prototype.toPublicKey = function () {
    return new PublicKey(this);
  }
  export const WRAPPED_TOKEN_PROGRAM_ID = 'So11111111111111111111111111111111111111112'.toPublicKey();
  export const MEMO_PROGRAM_ID = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'.toPublicKey();
  export const METAPLEX_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'.toPublicKey();
  export const COMMITMENT: Commitment = 'confirmed';
  export const NFT_STORAGE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';
  export const NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
  export const BUNDLR_NETWORK_URL = ConstantsFunc.switchBundlr(Config.cluster.type);
}
