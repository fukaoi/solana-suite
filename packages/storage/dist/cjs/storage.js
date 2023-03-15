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
exports.Storage = void 0;
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const arweave_1 = require("./arweave");
const nft_storage_1 = require("./nft-storage");
var Storage;
(function (Storage) {
    const initNftStorageMetadata = (input, sellerFeeBasisPoints, options) => {
        const data = {
            name: input.name,
            symbol: input.symbol,
            description: input.description,
            seller_fee_basis_points: sellerFeeBasisPoints,
            external_url: input.external_url,
            attributes: input.attributes,
            properties: input.properties,
            image: '',
        };
        return Object.assign(Object.assign({}, data), options);
    };
    Storage.uploadContent = (filePath, storageType, feePayer) => __awaiter(this, void 0, void 0, function* () {
        if (storageType === 'arweave') {
            if (!feePayer) {
                throw Error('Arweave needs to have feepayer');
            }
            return yield arweave_1.Arweave.uploadContent(filePath, feePayer);
        }
        else if (storageType === 'nftStorage') {
            return yield nft_storage_1.NftStorage.uploadContent(filePath);
        }
        else {
            throw Error('Not found storageType');
        }
    });
    Storage.uploadMetaContent = (input, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let storage;
        const { filePath, storageType, royalty, options } = input, reducedMetadata = __rest(input, ["filePath", "storageType", "royalty", "options"]);
        const sellerFeeBasisPoints = shared_metaplex_1.Royalty.convert(royalty);
        const storageData = initNftStorageMetadata(input, sellerFeeBasisPoints, options);
        if (storageType === 'arweave') {
            if (!feePayer) {
                throw Error('Arweave needs to have feepayer');
            }
            storage = yield (yield arweave_1.Arweave.uploadContent(filePath, feePayer)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                storageData.image = ok;
                return yield arweave_1.Arweave.uploadMetadata(storageData, feePayer);
            }), (err) => {
                throw err;
            });
        }
        else if (storageType === 'nftStorage') {
            storage = yield (yield nft_storage_1.NftStorage.uploadContent(filePath)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                storageData.image = ok;
                return yield nft_storage_1.NftStorage.uploadMetadata(storageData);
            }), (err) => {
                throw err;
            });
        }
        if (!storage) {
            throw Error('Empty storage object');
        }
        return {
            uri: storage.unwrap(),
            sellerFeeBasisPoints,
            reducedMetadata,
        };
    });
})(Storage = exports.Storage || (exports.Storage = {}));
//# sourceMappingURL=storage.js.map