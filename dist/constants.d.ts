import { Commitment } from '@solana/web3.js';
export declare namespace Constants {
    enum SolanaNet {
        prd = "mainnet-beta",
        dev = "devnet",
        test = "testnet"
    }
    const currentNetwork: any;
    const isDebugging: any;
}
export declare namespace ConstantsFunc {
    const switchApi: (env: string | undefined) => "https://api.mainnet-beta.solana.com" | "https://api.testnet.solana.com" | "http://api.devnet.solana.com";
}
export declare namespace Constants {
    const CURRENT_NETWORK: string;
    const API_URL: string;
    const WRAPPED_TOKEN_PROGRAM_ID: any;
    const MEMO_PROGRAM_ID: any;
    const METAPLEX_PROGRAM_ID: any;
    const COMMITMENT: Commitment;
    const NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE";
    const NFT_STORAGE_GATEWAY_URL = "https://ipfs.io/ipfs";
    const ARWEAVE_UPLOAD_SRV_URL = "https://us-central1-principal-lane-200702.cloudfunctions.net/uploadFile4";
    const ARWEAVE_GATEWAY_URL = "https://arweave.net";
    const AR_SOL_HOLDER_ID: any;
    const COIN_MARKET_URL = "https://api.coingecko.com/api/v3/simple/price";
}
