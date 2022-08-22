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
exports.StorageArweave = void 0;
const js_1 = require("@metaplex-foundation/js");
const web3_js_1 = require("@solana/web3.js");
const fs_1 = __importDefault(require("fs"));
const shared_1 = require("@solana-suite/shared");
const bundlr_1 = require("../bundlr");
const metaplex_1 = require("../metaplex");
const validator_1 = require("../validator");
var StorageArweave;
(function (StorageArweave) {
    StorageArweave.getUploadPrice = (filePath, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let buffer;
        if (shared_1.isNode) {
            const filepath = filePath;
            buffer = fs_1.default.readFileSync(filepath);
        }
        else if (shared_1.isBrowser) {
            const filepath = filePath;
            buffer = (yield (0, js_1.useMetaplexFileFromBrowser)(filepath)).buffer;
        }
        else {
            return shared_1.Result.err(Error('Supported environment: only Node.js and Browser js'));
        }
        const res = yield bundlr_1.Bundlr.useStorage(feePayer).getUploadPrice(buffer.length);
        (0, shared_1.debugLog)('# buffer length, price', buffer.length, res.basisPoints / web3_js_1.LAMPORTS_PER_SOL);
        return shared_1.Result.ok({
            price: res.basisPoints / web3_js_1.LAMPORTS_PER_SOL,
            currency: res.currency,
        });
    });
    StorageArweave.uploadContent = (filePath, feePayer, fileOptions // only arweave, not nft-storage
    ) => __awaiter(this, void 0, void 0, function* () {
        (0, shared_1.debugLog)('# upload content: ', filePath);
        let file;
        if (shared_1.isNode) {
            const filepath = filePath;
            const buffer = fs_1.default.readFileSync(filepath);
            if (fileOptions) {
                file = (0, js_1.useMetaplexFile)(buffer, filepath, fileOptions);
            }
            else {
                file = (0, js_1.useMetaplexFile)(buffer, filepath);
            }
        }
        else if (shared_1.isBrowser) {
            const filepath = filePath;
            if (fileOptions) {
                file = yield (0, js_1.useMetaplexFileFromBrowser)(filepath, fileOptions);
            }
            else {
                file = yield (0, js_1.useMetaplexFileFromBrowser)(filepath);
            }
        }
        else {
            return shared_1.Result.err(Error('Supported environment: only Node.js and Browser js'));
        }
        return bundlr_1.Bundlr.useStorage(feePayer)
            .upload(file)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
    });
    StorageArweave.uploadMetadata = (metadata, feePayer) => __awaiter(this, void 0, void 0, function* () {
        (0, shared_1.debugLog)('# upload meta data: ', metadata);
        const valid = validator_1.Validator.checkAll(metadata);
        if (valid.isErr) {
            return valid;
        }
        if (metadata.seller_fee_basis_points) {
            metadata.seller_fee_basis_points = metaplex_1.MetaplexRoyalty.convertValue(metadata.seller_fee_basis_points);
        }
        return bundlr_1.Bundlr.make(feePayer)
            .nfts()
            .uploadMetadata(metadata)
            .then((res) => shared_1.Result.ok(res.uri))
            .catch(shared_1.Result.err);
    });
})(StorageArweave = exports.StorageArweave || (exports.StorageArweave = {}));
