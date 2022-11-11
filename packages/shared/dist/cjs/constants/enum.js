"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
const solana_suite_json_1 = __importDefault(require("../solana-suite.json"));
var Constants;
(function (Constants) {
    Constants.currentCluster = solana_suite_json_1.default.cluster.type;
    Constants.customUrl = solana_suite_json_1.default.cluster.customUrl;
    Constants.isDebugging = solana_suite_json_1.default.debugging;
    Constants.nftStorageApiKey = solana_suite_json_1.default.nftstorage.apikey;
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
})(Constants = exports.Constants || (exports.Constants = {}));
