export declare namespace Constants {
    const currentCluster: string;
    const customUrl: string;
    const isDebugging: boolean;
    const nftStorageApiKey: string;
    enum Cluster {
        prd = "mainnet-beta",
        prd2 = "mainnet-beta-sereum",
        prdrr = "mainnet-beta-round-robin",
        dev = "devnet",
        test = "testnet",
        localhost = "localhost-devnet",
        custom = "custom"
    }
    enum EndPointUrl {
        prd = "https://api.mainnet-beta.solana.com",
        prd2 = "https://solana-api.projectserum.com",
        dev = "https://api.devnet.solana.com",
        test = "https://api.testnet.solana.com",
        localhost = "http://api.devnet.solana.com"
    }
}
