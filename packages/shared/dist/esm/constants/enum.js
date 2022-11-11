import Config from '../solana-suite.json';
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
})(Constants || (Constants = {}));
