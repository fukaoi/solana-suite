var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Blob, NFTStorage } from "nft.storage";
import { Constants, debugLog, Try, } from "@solana-suite/shared";
import { ProvenanceLayer } from "./provenance-layer";
export var NftStorage;
(function (NftStorage) {
    let isDisplayWarning = false;
    const getNftStorageApiKey = () => {
        if (!Constants.nftStorageApiKey) {
            if (!isDisplayWarning) {
                console.warn(`
        [Warning]
        --------------------------------------
        If will use @solana-suite/nft package
        your need to update nftStorage.apiKey define parameter in solana-suite.json.
        can get apiKey from https://nft.storage/
        --------------------------------------
        `);
                isDisplayWarning = true;
            }
            return Constants.NFT_STORAGE_API_KEY;
        }
        else {
            return Constants.nftStorageApiKey;
        }
    };
    const createGatewayUrl = (cid) => `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
    const connect = () => new NFTStorage({ token: getNftStorageApiKey() });
    NftStorage.uploadContent = (filePath) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            debugLog("# upload content: ", filePath);
            let file;
            if (ProvenanceLayer.isNodeable(filePath)) {
                file = (yield import("fs")).readFileSync(filePath);
            }
            else if (ProvenanceLayer.isBrowserable(filePath)) {
                file = Buffer.from(yield filePath.arrayBuffer());
            }
            else {
                throw Error("Supported environment: only Node.js and Browser js");
            }
            const blobImage = new Blob([file]);
            const res = yield connect().storeBlob(blobImage);
            return createGatewayUrl(res);
        }));
    });
    /**
     * Upload content
     *
     * @param {StorageMetadata} metadata
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
    NftStorage.uploadMetadata = (metadata) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            debugLog("# upload metadata: ", metadata);
            const blobJson = new Blob([JSON.stringify(metadata)]);
            const res = yield connect().storeBlob(blobJson);
            return createGatewayUrl(res);
        }));
    });
})(NftStorage || (NftStorage = {}));
//# sourceMappingURL=nft-storage.js.map