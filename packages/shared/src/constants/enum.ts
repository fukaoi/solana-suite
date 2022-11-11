import Config from '../solana-suite.json';

export namespace Constants {
  export const currentCluster = Config.cluster.type;
  export const customUrl = Config.cluster.customUrl;
  export const isDebugging = Config.debugging;
  export const nftStorageApiKey = Config.nftstorage.apikey;

  export enum Cluster {
    prd = 'mainnet-beta',
    prd2 = 'mainnet-beta-sereum',
    prdrr = 'mainnet-beta-round-robin',
    dev = 'devnet',
    test = 'testnet',
    localhost = 'localhost-devnet',
    custom = 'custom',
  }

  export enum EndPointUrl {
    prd = 'https://api.mainnet-beta.solana.com',
    prd2 = 'https://solana-api.projectserum.com',
    dev = 'https://api.devnet.solana.com',
    test = 'https://api.testnet.solana.com',
    localhost = 'http://api.devnet.solana.com',
  }
}
