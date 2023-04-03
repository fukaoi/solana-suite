var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Arweave } from './arweave';
import { NftStorage } from './nft-storage';
export var Storage;
(function (Storage) {
    Storage.toConvertNftStorageMetadata = (input, sellerFeeBasisPoints) => {
        const data = {
            name: input.name,
            symbol: input.symbol,
            description: input.description,
            seller_fee_basis_points: sellerFeeBasisPoints,
            external_url: input.external_url,
            attributes: input.attributes,
            properties: input.properties,
            image: '',
            options: input.options,
        };
        return data;
    };
    Storage.uploadContent = (filePath, storageType, feePayer) => __awaiter(this, void 0, void 0, function* () {
        if (storageType === 'arweave') {
            if (!feePayer) {
                throw Error('Arweave needs to have feepayer');
            }
            return yield Arweave.uploadContent(filePath, feePayer);
        }
        else if (storageType === 'nftStorage') {
            return yield NftStorage.uploadContent(filePath);
        }
        else {
            throw Error('Not found storageType');
        }
    });
    Storage.uploadMetaContent = (input, filePath, storageType, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let storage;
        if (storageType === 'arweave') {
            if (!feePayer) {
                throw Error('Arweave needs to have feepayer');
            }
            storage = yield (yield Arweave.uploadContent(filePath, feePayer)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                input.image = ok;
                return yield Arweave.uploadMetadata(input, feePayer);
            }), (err) => {
                throw err;
            });
        }
        else if (storageType === 'nftStorage') {
            storage = yield (yield NftStorage.uploadContent(filePath)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                input.image = ok;
                return yield NftStorage.uploadMetadata(input);
            }), (err) => {
                throw err;
            });
        }
        else {
            throw Error('No match storageType');
        }
        if (!storage) {
            throw Error('Empty storage object');
        }
        return storage;
    });
})(Storage || (Storage = {}));
//# sourceMappingURL=storage.js.map