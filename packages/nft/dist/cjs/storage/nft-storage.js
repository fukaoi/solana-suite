"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageNftStorage = void 0;
const nft_storage_1 = require("nft.storage");
const fs_1 = __importDefault(require("fs"));
const shared_1 = require("@solana-suite/shared");
const js_1 = require("@metaplex-foundation/js");
const metaplex_1 = require("../metaplex");
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
            file = fs_1.default.readFileSync(filepath);
        }
        else if (shared_1.isBrowser) {
            const filepath = filePath;
            file = (yield (0, js_1.useMetaplexFileFromBrowser)(filepath)).buffer;
        }
        else {
            return shared_1.Result.err(Error('Supported environment: only Node.js and Browser js'));
        }
        const blobImage = new nft_storage_1.Blob([file]);
        const res = yield connect.storeBlob(blobImage)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        return res.map(ok => createGatewayUrl(ok), err => err);
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
        if (metadata.seller_fee_basis_points) {
            metadata.seller_fee_basis_points
                = metaplex_1.MetaplexRoyalty.convertValue(metadata.seller_fee_basis_points);
        }
        const blobJson = new nft_storage_1.Blob([JSON.stringify(metadata)]);
        const res = yield connect.storeBlob(blobJson)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        return res.map(ok => createGatewayUrl(ok), err => err);
    });
})(StorageNftStorage = exports.StorageNftStorage || (exports.StorageNftStorage = {}));
