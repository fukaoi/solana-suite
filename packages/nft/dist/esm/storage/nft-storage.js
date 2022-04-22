var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NFTStorage, Blob } from 'nft.storage';
import fs from 'fs';
import { Constants, Result } from '@solana-suite/shared';
export var StorageNftStorage;
(function (StorageNftStorage) {
    const getNftStorageApiKey = () => {
        if (!Constants.nftstorageApikey) {
            console.warn(`
        [Warning]
        --------------------------------------
        If will use @solana-suite/nft package
        your need to update nftstorage.apikey defin parameter in solana-suite.json.
        can get apikey from https://nft.storage/
        --------------------------------------
        `);
            return Constants.NFT_STORAGE_API_KEY;
        }
        else {
            return Constants.nftstorageApikey;
        }
    };
    const createGatewayUrl = (cid) => `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
    const connect = () => new NFTStorage({ token: getNftStorageApiKey() });
    const preUploadImage = (client, imagePath) => __awaiter(this, void 0, void 0, function* () {
        const blobImage = new Blob([fs.readFileSync(imagePath)]);
        const cid = yield client.storeBlob(blobImage);
        return createGatewayUrl(cid);
    });
    StorageNftStorage.upload = (storageData) => __awaiter(this, void 0, void 0, function* () {
        const client = connect();
        const imageUrl = yield preUploadImage(client, storageData.image)
            .then(Result.ok)
            .catch(Result.err);
        if (imageUrl.isErr)
            return imageUrl;
        storageData.image = imageUrl.value;
        const blobJson = new Blob([JSON.stringify(storageData)]);
        const metadata = yield client.storeBlob(blobJson)
            .then(Result.ok)
            .catch(Result.err);
        if (metadata.isErr)
            return metadata;
        return Result.ok(createGatewayUrl(metadata.value));
    });
})(StorageNftStorage || (StorageNftStorage = {}));
