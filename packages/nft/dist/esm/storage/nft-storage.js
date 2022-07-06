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
    const connect = new NFTStorage({ token: getNftStorageApiKey() });
    StorageNftStorage.uploadContent = (filePath) => __awaiter(this, void 0, void 0, function* () {
        const blobImage = new Blob([fs.readFileSync(filePath)]);
        const res = yield connect.storeBlob(blobImage)
            .then(Result.ok)
            .catch(Result.err);
        return res.map(ok => createGatewayUrl(ok), err => err);
    });
    StorageNftStorage.uploadMetadata = (input) => __awaiter(this, void 0, void 0, function* () {
        if (input.image) {
            const imageUrl = yield StorageNftStorage.uploadContent(input.image)
                .then(Result.ok)
                .catch(Result.err);
            if (imageUrl.isErr) {
                return imageUrl;
            }
            input.image = imageUrl.value;
        }
        const blobJson = new Blob([JSON.stringify(input)]);
        const metadata = yield connect.storeBlob(blobJson)
            .then(Result.ok)
            .catch(Result.err);
        return metadata.map(ok => createGatewayUrl(ok), err => err);
    });
})(StorageNftStorage || (StorageNftStorage = {}));
