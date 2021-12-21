"use strict";
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
    const createGatewayUrl = (cid) => `${shared_1.Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
    const connect = () => new nft_storage_1.NFTStorage({ token: shared_1.Constants.NFT_STORAGE_API_KEY });
    const preUploadImage = async (client, imagePath) => {
        const blobImage = new nft_storage_1.Blob([fs_1.default.readFileSync(imagePath)]);
        const cid = await client.storeBlob(blobImage);
        return createGatewayUrl(cid);
    };
    StorageNftStorage.upload = async (storageData) => {
        const client = connect();
        const imageUrl = await preUploadImage(client, storageData.image)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (imageUrl.isErr)
            return imageUrl;
        storageData.image = imageUrl.value;
        const blobJson = new nft_storage_1.Blob([JSON.stringify(storageData)]);
        const metadata = await client.storeBlob(blobJson)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (metadata.isErr)
            return metadata;
        return shared_1.Result.ok(createGatewayUrl(metadata.value));
    };
})(StorageNftStorage = exports.StorageNftStorage || (exports.StorageNftStorage = {}));
