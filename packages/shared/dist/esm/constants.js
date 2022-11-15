import { PublicKey } from '@solana/web3.js';
import Config from './solana-suite.json';
// WARNING: Not to be a circular reference
export var Constants;
(function (Constants) {
    Constants.currentCluster = Config.cluster.type;
    Constants.customUrl = Config.cluster.customUrl;
    Constants.isDebugging = Config.debugging;
    Constants.nftStorageApiKey = Config.nftstorage.apikey;
    let Cluster;
    (function (Cluster) {
        Cluster["prd"] = "mainnet-beta";
        Cluster["prd2"] = "mainnet-beta-sereum";
        Cluster["prdrr"] = "mainnet-beta-round-robin";
        Cluster["dev"] = "devnet";
        Cluster["test"] = "testnet";
        Cluster["localhost"] = "localhost-devnet";
        Cluster["custom"] = "custom";
    })(Cluster = Constants.Cluster || (Constants.Cluster = {}));
    let EndPointUrl;
    (function (EndPointUrl) {
        EndPointUrl["prd"] = "https://api.mainnet-beta.solana.com";
        EndPointUrl["prd2"] = "https://solana-api.projectserum.com";
        EndPointUrl["dev"] = "https://api.devnet.solana.com";
        EndPointUrl["test"] = "https://api.testnet.solana.com";
        EndPointUrl["localhost"] = "http://api.devnet.solana.com";
    })(EndPointUrl = Constants.EndPointUrl || (Constants.EndPointUrl = {}));
    Constants.switchCluster = (env, customUrl = Constants.customUrl) => {
        switch (env) {
            case Constants.Cluster.prd:
                return Constants.EndPointUrl.prd;
            case Constants.Cluster.prd2:
                return Constants.EndPointUrl.prd2;
            case Constants.Cluster.test:
                return Constants.EndPointUrl.test;
            case Constants.Cluster.dev:
                return Constants.EndPointUrl.dev;
            case Constants.Cluster.prdrr: {
                // don't require rigor, as it can be repeated alternately
                const index = Date.now() % 4;
                const clusters = [
                    Constants.EndPointUrl.prd,
                    Constants.EndPointUrl.prd2,
                    Constants.EndPointUrl.prd,
                    Constants.EndPointUrl.prd2,
                ];
                return clusters[index];
            }
            case Constants.Cluster.custom:
                return customUrl;
            default:
                return Constants.EndPointUrl.localhost;
        }
    };
    Constants.switchBundlr = (env) => {
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
    Constants.WRAPPED_TOKEN_PROGRAM_ID = new PublicKey('So11111111111111111111111111111111111111112');
    Constants.MEMO_PROGRAM_ID = new PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo');
    Constants.METAPLEX_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    Constants.COMMITMENT = 'confirmed';
    Constants.NFT_STORAGE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';
    Constants.NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
    Constants.BUNDLR_NETWORK_URL = Constants.switchBundlr(Config.cluster.type);
})(Constants || (Constants = {}));
