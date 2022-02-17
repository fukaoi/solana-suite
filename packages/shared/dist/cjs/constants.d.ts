import { Commitment, PublicKey } from '@solana/web3.js';
import './global';
export declare namespace Constants {
    enum SolanaNet {
        prd = "mainnet-beta",
        dev = "devnet",
        test = "testnet",
        localhost = "localhost-devnet"
    }
    const currentCluster: string;
    const isDebugging: boolean;
}
export declare namespace ConstantsFunc {
    const switchApi: (env: string | undefined) => "https://api.mainnet-beta.solana.com" | "https://api.testnet.solana.com" | "https://api.devnet.solana.com" | "http://api.devnet.solana.com";
    const getNftStorageApiKey: () => string;
}
export declare namespace Constants {
    const WRAPPED_TOKEN_PROGRAM_ID: PublicKey;
    const MEMO_PROGRAM_ID: PublicKey;
    const METAPLEX_PROGRAM_ID: PublicKey;
    const COMMITMENT: Commitment;
    const NFT_STORAGE_API_KEY: string;
    const NFT_STORAGE_GATEWAY_URL = "https://ipfs.io/ipfs";
    const ARWEAVE_UPLOAD_SRV_URL = "https://us-central1-principal-lane-200702.cloudfunctions.net/uploadFile4";
    const ARWEAVE_GATEWAY_URL = "https://arweave.net";
    const AR_SOL_HOLDER_ID: PublicKey;
    const COIN_MARKET_URL = "https://api.coingecko.com/api/v3/simple/price";
}
