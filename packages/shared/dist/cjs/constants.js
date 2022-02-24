"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantsFunc = exports.Constants = void 0;
const web3_js_1 = require("@solana/web3.js");
const solana_suite_json_1 = __importDefault(require("./solana-suite.json"));
require("./global");
var Constants;
(function (Constants) {
    let Cluster;
    (function (Cluster) {
        Cluster["prd"] = "mainnet-beta";
        Cluster["dev"] = "devnet";
        Cluster["test"] = "testnet";
        Cluster["localhost"] = "localhost-devnet";
    })(Cluster = Constants.Cluster || (Constants.Cluster = {}));
    Constants.currentCluster = solana_suite_json_1.default.cluster;
    Constants.isDebugging = solana_suite_json_1.default.debugging;
})(Constants = exports.Constants || (exports.Constants = {}));
var ConstantsFunc;
(function (ConstantsFunc) {
    ConstantsFunc.switchApi = (env) => {
        switch (env) {
            case Constants.Cluster.prd:
                return 'https://api.mainnet-beta.solana.com';
            case Constants.Cluster.test:
                return 'https://api.testnet.solana.com';
            case Constants.Cluster.dev:
                return 'https://api.devnet.solana.com';
            default:
                return 'http://api.devnet.solana.com';
        }
    };
    ConstantsFunc.getNftStorageApiKey = () => {
        if (!solana_suite_json_1.default.nftstorage.apikey) {
            console.warn(`
        [Warning]
        --------------------------------------
        If will use @solana-suite/nft package 
        your need to update nftstorage.apikey defin parameter in solana-suite.json.
        can get apikey from https://nft.storage/
        --------------------------------------
        `);
        }
        return solana_suite_json_1.default.nftstorage.apikey;
    };
})(ConstantsFunc = exports.ConstantsFunc || (exports.ConstantsFunc = {}));
(function (Constants) {
    String.prototype.toPublicKey = function () {
        return new web3_js_1.PublicKey(this);
    };
    Constants.WRAPPED_TOKEN_PROGRAM_ID = 'So11111111111111111111111111111111111111112'.toPublicKey();
    Constants.MEMO_PROGRAM_ID = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'.toPublicKey();
    Constants.METAPLEX_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'.toPublicKey();
    Constants.COMMITMENT = 'confirmed';
    // NFT.storage can store NFTs up to 32GB in size!
    Constants.NFT_STORAGE_API_KEY = ConstantsFunc.getNftStorageApiKey() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';
    Constants.NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
    Constants.ARWEAVE_UPLOAD_SRV_URL = 'https://us-central1-principal-lane-200702.cloudfunctions.net/uploadFile4';
    Constants.ARWEAVE_GATEWAY_URL = 'https://arweave.net';
    Constants.AR_SOL_HOLDER_ID = 'HvwC9QSAzvGXhhVrgPmauVwFWcYZhne3hVot9EbHuFTm'.toPublicKey();
    Constants.COIN_MARKET_URL = 'https://api.coingecko.com/api/v3/simple/price';
})(Constants = exports.Constants || (exports.Constants = {}));
