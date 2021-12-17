import { NFTStorage, Blob } from 'nft.storage';
import fs from 'fs';
import { Constants, Result } from '@solana-suite/shared';
export var StorageNftStorage;
(function (StorageNftStorage) {
    const createGatewayUrl = (cid) => `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
    const connect = () => new NFTStorage({ token: Constants.NFT_STORAGE_API_KEY });
    const preUploadImage = async (client, imagePath) => {
        const blobImage = new Blob([fs.readFileSync(imagePath)]);
        const cid = await client.storeBlob(blobImage);
        return createGatewayUrl(cid);
    };
    StorageNftStorage.upload = async (storageData) => {
        const client = connect();
        const imageUrl = await preUploadImage(client, storageData.image)
            .then(Result.ok)
            .catch(Result.err);
        if (imageUrl.isErr)
            return imageUrl;
        storageData.image = imageUrl.value;
        const blobJson = new Blob([JSON.stringify(storageData)]);
        const metadata = await client.storeBlob(blobJson)
            .then(Result.ok)
            .catch(Result.err);
        if (metadata.isErr)
            return metadata;
        return Result.ok(createGatewayUrl(metadata.value));
    };
})(StorageNftStorage || (StorageNftStorage = {}));
