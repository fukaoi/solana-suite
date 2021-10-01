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
const constants_1 = require("../../constants");
var StorageNftStorage;
(function (StorageNftStorage) {
    const createGatewayUrl = (cid) => `${constants_1.Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
    const connect = () => new nft_storage_1.NFTStorage({ token: constants_1.Constants.NFT_STORAGE_API_KEY });
    const preUploadImage = (client, imagePath) => __awaiter(this, void 0, void 0, function* () {
        const blobImage = new nft_storage_1.Blob([fs_1.default.readFileSync(imagePath)]);
        const cid = yield client.storeBlob(blobImage);
        return createGatewayUrl(cid);
    });
    StorageNftStorage.upload = (storageData) => __awaiter(this, void 0, void 0, function* () {
        const client = connect();
        storageData.image = yield preUploadImage(client, storageData.image);
        const blobJson = new nft_storage_1.Blob([JSON.stringify(storageData)]);
        const metadata = yield client.storeBlob(blobJson);
        return createGatewayUrl(metadata);
    });
})(StorageNftStorage = exports.StorageNftStorage || (exports.StorageNftStorage = {}));
