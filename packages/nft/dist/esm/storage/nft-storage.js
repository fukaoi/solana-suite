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
import { Constants, Result, isNode, isBrowser, debugLog, } from '@solana-suite/shared';
import { useMetaplexFile } from '@metaplex-foundation/js';
import { Validator } from '../validator';
export var StorageNftStorage;
(function (StorageNftStorage) {
    const getNftStorageApiKey = () => {
        if (!Constants.nftStorageApiKey) {
            console.warn(`
        [Warning]
        --------------------------------------
        If will use @solana-suite/nft package
        your need to update nftStorage.apiKey define parameter in solana-suite.json.
        can get apiKey from https://nft.storage/
        --------------------------------------
        `);
            return Constants.NFT_STORAGE_API_KEY;
        }
        else {
            return Constants.nftStorageApiKey;
        }
    };
    const createGatewayUrl = (cid) => `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
    const connect = () => new NFTStorage({ token: getNftStorageApiKey() });
    StorageNftStorage.uploadContent = (filePath) => __awaiter(this, void 0, void 0, function* () {
        debugLog('# upload content: ', filePath);
        let file;
        if (isNode) {
            const filepath = filePath;
            file = (yield import('fs')).readFileSync(filepath);
        }
        else if (isBrowser) {
            const filepath = filePath;
            file = useMetaplexFile(filepath, '').buffer;
        }
        else {
            return Result.err(Error('Supported environment: only Node.js and Browser js'));
        }
        const blobImage = new Blob([file]);
        const res = (yield connect()
            .storeBlob(blobImage)
            .then(Result.ok)
            .catch(Result.err));
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
        debugLog('# upload metadata: ', metadata);
        const valid = Validator.checkAll(metadata);
        if (valid.isErr) {
            return valid;
        }
        const blobJson = new Blob([JSON.stringify(metadata)]);
        const res = (yield connect()
            .storeBlob(blobJson)
            .then(Result.ok)
            .catch(Result.err));
        return res.map((ok) => createGatewayUrl(ok), (err) => err);
    });
})(StorageNftStorage || (StorageNftStorage = {}));
