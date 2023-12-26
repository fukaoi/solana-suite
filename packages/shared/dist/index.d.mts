import { PublicKey, Commitment } from '@solana/web3.js';
export { A as Account, E as Explorer, g as ExplorerOptions, h as FilterOptions, F as FilterType, K as KeypairAccount, p as Memo, l as MintTo, m as MintToChecked, M as ModuleName, N as Node, O as OwnerInfo, j as PostTokenAccount, P as Pubkey, R as Result, S as Secret, k as Transfer, n as TransferChecked, T as Try, V as Validator, f as ValidatorError, W as WithMemo, b as bufferToArray, e as convertTimestampToDateTime, d as debugLog, i as isBrowser, a as isNode, c as isPromise, o as overwriteObject, s as sleep, u as unixTimestamp } from './exports-80b0e900.js';
import 'bn.js';
import '@metaplex-foundation/mpl-token-metadata';

declare namespace Constants {
    namespace WarnningMessage {
        const NFT_STORAGE_API_KEY = "\n        [YOU HAVE TO DO]\n        --------------------------------------\n        You need to update nftStorageApiKey define parameter in solana-suite.json.\n        Can get api key from https://nft.storage/\n        --------------------------------------\n        ";
        const DAS_API_URL = "\n        [YOU HAVE TO DO]\n        --------------------------------------\n        You need to update dasApiUrl define parameter in solana-suite.json.\n        can get api url from https://www.helius.dev/\n        -------------------------------------- \n        ";
        const ANNOUNCE = "\n        [DEPRECATED]\n        --------------------------------------\n        Account, Node, toExplorer, Pubkey, Secret have been moved to \n        @solana-suite/utils \n        ------------------------------------- \n        ";
        const calculateProbability: () => boolean;
    }
}
declare namespace Constants {
    const currentCluster: string;
    const customClusterUrl: never[];
    const isDebugging: string;
    const nftStorageApiKey: string;
    const dasApiUrl: never[];
    enum Cluster {
        prd = "mainnet-beta",
        prdMetaplex = "mainnet-beta-metaplex",
        dev = "devnet",
        test = "testnet",
        localhost = "localhost-devnet"
    }
    enum EndPointUrl {
        prd = "https://api.mainnet-beta.solana.com",
        prdMetaplex = "https://api.metaplex.solana.com",
        dev = "https://api.devnet.solana.com",
        test = "https://api.testnet.solana.com",
        localhost = "http://api.devnet.solana.com"
    }
    enum BundlrUrl {
        prd = "https://node1.irys.xyz,https://node2.irys.xyz",
        dev = "https://devnet.irys.xyz"
    }
    enum DasApiUrl {
        dev = "https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92,https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639"
    }
    enum NftstorageApiKey {
        dev = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE"
    }
    const loadConfig: () => Promise<void>;
    const switchCluster: (param: {
        cluster?: string;
        customClusterUrl?: string[];
    }) => string;
    const switchBundlr: (env: string) => string;
    const switchDasApi: (env: string) => string;
    const switchNftStorage: (env: string) => string;
    const WRAPPED_TOKEN_PROGRAM_ID: PublicKey;
    const MEMO_PROGRAM_ID: PublicKey;
    const METAPLEX_PROGRAM_ID: PublicKey;
    const COMMITMENT: Commitment;
    const NFT_STORAGE_GATEWAY_URL = "https://ipfs.io/ipfs";
    const IRYS_GATEWAY_URL = "https://gateway.irys.xyz";
    const BUNDLR_NETWORK_URL: string;
    const DAS_API_URL: string;
    const NFT_STORAGE_API_KEY: string;
    const EXPLORER_SOLSCAN_URL = "https://solscan.io";
    const EXPLORER_SOLANAFM_URL = "https://solana.fm";
    const EXPLORER_XRAY_URL = "https://xray.helius.xyz";
}

export { Constants };
