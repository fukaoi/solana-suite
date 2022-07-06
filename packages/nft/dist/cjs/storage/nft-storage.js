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
var StorageNftStorage;
(function (StorageNftStorage) {
    const getNftStorageApiKey = () => {
        if (!shared_1.Constants.nftstorageApikey) {
            console.warn(`
        [Warning]
        --------------------------------------
        If will use @solana-suite/nft package
        your need to update nftstorage.apikey defin parameter in solana-suite.json.
        can get apikey from https://nft.storage/
        --------------------------------------
        `);
            return shared_1.Constants.NFT_STORAGE_API_KEY;
        }
        else {
            return shared_1.Constants.nftstorageApikey;
        }
    };
    const createGatewayUrl = (cid) => `${shared_1.Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
    const connect = new nft_storage_1.NFTStorage({ token: getNftStorageApiKey() });
    StorageNftStorage.uploadContent = (filePath) => __awaiter(this, void 0, void 0, function* () {
        const blobImage = new nft_storage_1.Blob([fs_1.default.readFileSync(filePath)]);
        const res = yield connect.storeBlob(blobImage)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        return res.map(ok => createGatewayUrl(ok), err => err);
    });
    StorageNftStorage.uploadMetadata = (input) => __awaiter(this, void 0, void 0, function* () {
        if (input.image) {
            const imageUrl = yield StorageNftStorage.uploadContent(input.image)
                .then(shared_1.Result.ok)
                .catch(shared_1.Result.err);
            if (imageUrl.isErr) {
                return imageUrl;
            }
            input.image = imageUrl.value;
        }
        const blobJson = new nft_storage_1.Blob([JSON.stringify(input)]);
        const metadata = yield connect.storeBlob(blobJson)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        return metadata.map(ok => createGatewayUrl(ok), err => err);
    });
})(StorageNftStorage = exports.StorageNftStorage || (exports.StorageNftStorage = {}));
