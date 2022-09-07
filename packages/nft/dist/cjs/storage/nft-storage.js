"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageNftStorage = void 0;
const nft_storage_1 = require("nft.storage");
const shared_1 = require("@solana-suite/shared");
const js_1 = require("@metaplex-foundation/js");
const validator_1 = require("../validator");
var StorageNftStorage;
(function (StorageNftStorage) {
    const getNftStorageApiKey = () => {
        if (!shared_1.Constants.nftStorageApiKey) {
            console.warn(`
        [Warning]
        --------------------------------------
        If will use @solana-suite/nft package
        your need to update nftStorage.apiKey define parameter in solana-suite.json.
        can get apiKey from https://nft.storage/
        --------------------------------------
        `);
            return shared_1.Constants.NFT_STORAGE_API_KEY;
        }
        else {
            return shared_1.Constants.nftStorageApiKey;
        }
    };
    const createGatewayUrl = (cid) => `${shared_1.Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
    const connect = new nft_storage_1.NFTStorage({ token: getNftStorageApiKey() });
    StorageNftStorage.uploadContent = (filePath) => __awaiter(this, void 0, void 0, function* () {
        (0, shared_1.debugLog)('# upload content: ', filePath);
        let file;
        if (shared_1.isNode) {
            const filepath = filePath;
            file = (yield Promise.resolve().then(() => __importStar(require('fs')))).readFileSync(filepath);
        }
        else if (shared_1.isBrowser) {
            const filepath = filePath;
            file = (0, js_1.useMetaplexFile)(filepath, 'test').buffer;
            console.log('SMT=>', filepath, file);
        }
        else {
            return shared_1.Result.err(Error('Supported environment: only Node.js and Browser js'));
        }
        const blobImage = new nft_storage_1.Blob([file]);
        const res = (yield connect
            .storeBlob(blobImage)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err));
        return res.map((ok) => createGatewayUrl(ok), (err) => err);
    });
    /**
     * Upload content
     *
     * @param {NftStorageMetadata} metadata
     * {
     *   name?: {string}                      // nft content name
     *   symbol?: {string}                    // nft ticker symbol
     *   description?: {string}               // nft content description
     *   sellerFeeBasisPoints?: number        // royalty percentage
     *   image?: {string}                     // uploaded uri of original content
     *   external_url?: {string}              // landing page, home page uri, related url
     *   attributes?: {JsonMetadataAttribute[]}     // game character parameter, personality, characteristics
     *   properties?: {JsonMetadataProperties<Uri>} // included file name, uri, supported file type
     *   collection?: Collection              // collections of different colors, shapes, etc.
     *   [key: string]: {unknown}             // optional param, Usually not used.
     * }
     * @return Promise<Result<string, Error>>
     */
    StorageNftStorage.uploadMetadata = (metadata) => __awaiter(this, void 0, void 0, function* () {
        (0, shared_1.debugLog)('# upload metadata: ', metadata);
        const valid = validator_1.Validator.checkAll(metadata);
        if (valid.isErr) {
            return valid;
        }
        const blobJson = new nft_storage_1.Blob([JSON.stringify(metadata)]);
        const res = (yield connect
            .storeBlob(blobJson)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err));
        return res.map((ok) => createGatewayUrl(ok), (err) => err);
    });
})(StorageNftStorage = exports.StorageNftStorage || (exports.StorageNftStorage = {}));
