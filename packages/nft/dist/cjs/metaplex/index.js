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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
__exportStar(require("./internal/_mint"), exports);
__exportStar(require("./royalty"), exports);
const storage_1 = require("../storage");
const shared_1 = require("@solana-suite/shared");
const storage_2 = require("../storage");
const _mint_1 = require("./internal/_mint");
const royalty_1 = require("./royalty");
var Metaplex;
(function (Metaplex) {
    /**
     * Upload content and NFT mint
     *
     * @param {NftStorageMetaplexMetadata}  metadata
     * {
     *   name: string               // nft content name
     *   symbol: string             // nft ticker symbol
     *   filePath: string | File    // nft ticker symbol
     *   royalty: number            // royalty percentage
     *   description?: string       // nft content description
     *   external_url?: string      // landing page, home page uri, related url
     *   attributes?: JsonMetadataAttribute[]     // game character parameter, personality, characteristics
     *   properties?: JsonMetadataProperties<Uri> // include file name, uri, supported file type
     *   collection?: Collection                  // collections of different colors, shapes, etc.
     *   [key: string]: unknown                   // optional param, Usually not used.
     *   creators?: Creator[]          // other creators than owner
     *   uses?: Uses                   // usage feature: burn, single, multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     *   mintAuthority?: Signer        // mint authority
     *   updateAuthority?: Signer      // update minted authority
     *   freezeAuthority?: PublicKey   // freeze minted authority
     * }
     * @param {PublicKey} owner        // first minted owner
     * @param {Keypair} feePayer       // fee payer
     * @return Promise<Result<Instruction, Error>>
     */
    Metaplex.mint = (metadata, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const data = metadata;
        if (data.royalty) {
            data.sellerFeeBasisPoints = royalty_1.MetaplexRoyalty.convertValue(data.royalty);
            // copied to sellerFeeBasisPoints, no need key
            delete data.royalty;
        }
        let uri;
        const { filePath, storageType } = data, reducedMetadata = __rest(data, ["filePath", "storageType"]);
        if (storageType === 'arweave') {
            uri = yield storage_2.StorageArweave.uploadContent(filePath, feePayer)
                .map((ok) => __awaiter(this, void 0, void 0, function* () {
                reducedMetadata.image = ok;
                yield storage_2.StorageArweave.uploadMetadata(reducedMetadata, feePayer);
            }), (err) => err)
                .unwrap();
        }
        else if (storageType === 'nftStorage') {
            reducedMetadata.image = (yield storage_2.StorageArweave.uploadContent(filePath, feePayer)).unwrap();
            uri = (yield storage_1.StorageNftStorage.uploadMetadata(reducedMetadata)).unwrap();
        }
        else {
            return shared_1.Result.err(Error('storageType is `arweave` or `nftStorage`'));
        }
        // if (storageType === 'arweave') {
        //     reducedMetadata.image = (
        //       await StorageArweave.uploadContent(filePath!, feePayer)
        //     ).unwrap();
        //     uri = (
        //       await StorageArweave.uploadMetadata(reducedMetadata, feePayer)
        //     ).unwrap();
        //   } else if (storageType === 'nftStorage') {
        //     reducedMetadata.image = (
        //       await StorageArweave.uploadContent(filePath!, feePayer)
        //     ).unwrap();
        //     uri = (await StorageNftStorage.uploadMetadata(reducedMetadata)).unwrap();
        //   } else {
        //     return Result.err(Error('storageType is `arweave` or `nftStorage`'));
        //   }
        const mintInput = Object.assign({ uri }, reducedMetadata);
        return _mint_1.MetaplexInternal_Mint.create(mintInput, owner, feePayer);
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
