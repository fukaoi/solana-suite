import { Commitment, PublicKey } from '@solana/web3.js';
export declare namespace Constants {
    const currentCluster: string;
    const customClusterUrl: string[];
    const isDebugging: string;
    const nftStorageApiKey: string;
    enum Cluster {
        prd = 'mainnet-beta',
        prdMetaplex = 'mainnet-beta-metaplex',
        dev = 'devnet',
        test = 'testnet',
        localhost = 'localhost-devnet'
    }
    enum EndPointUrl {
        prd = 'https://api.mainnet-beta.solana.com',
        prdMetaplex = 'https://api.metaplex.solana.com',
        dev = 'https://api.devnet.solana.com',
        test = 'https://api.testnet.solana.com',
        localhost = 'http://api.devnet.solana.com'
    }
    const switchCluster: (param: {
        cluster?: string;
        customClusterUrl?: string[];
    }) => string;
    const switchBundlr: (env: string) => string;
    const WRAPPED_TOKEN_PROGRAM_ID: PublicKey;
    const MEMO_PROGRAM_ID: PublicKey;
    const METAPLEX_PROGRAM_ID: PublicKey;
    const COMMITMENT: Commitment;
    const NFT_STORAGE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';
    const NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
    const BUNDLR_NETWORK_URL: string;
}
