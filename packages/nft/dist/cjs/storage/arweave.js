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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageArweave = void 0;
const js_1 = require("@metaplex-foundation/js");
const shared_1 = require("@solana-suite/shared");
const bundlr_1 = require("../bundlr");
const validator_1 = require("../validator");
var StorageArweave;
(function (StorageArweave) {
    StorageArweave.getUploadPrice = (filePath, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let buffer;
        if (shared_1.isNode) {
            const filepath = filePath;
            buffer = (yield Promise.resolve().then(() => __importStar(require('fs')))).readFileSync(filepath);
        }
        else if (shared_1.isBrowser) {
            const filepath = filePath;
            buffer = (0, js_1.useMetaplexFile)(filepath, '').buffer;
        }
        else {
            return shared_1.Result.err(Error('Supported environment: only Node.js and Browser js'));
        }
        const res = yield bundlr_1.Bundlr.useStorage(feePayer).getUploadPrice(buffer.length);
        (0, shared_1.debugLog)('# buffer length, price', buffer.length, parseInt(res.basisPoints).toSol());
        return shared_1.Result.ok({
            price: parseInt(res.basisPoints).toSol(),
            currency: res.currency,
        });
    });
    StorageArweave.uploadContent = (filePath, feePayer, fileOptions // only arweave, not nft-storage
    ) => __awaiter(this, void 0, void 0, function* () {
        (0, shared_1.debugLog)('# upload content: ', filePath);
        let file;
        if (shared_1.isNode) {
            const filepath = filePath;
            const buffer = (yield Promise.resolve().then(() => __importStar(require('fs')))).readFileSync(filepath);
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
                file = (0, js_1.useMetaplexFile)(filepath, '', fileOptions);
            }
            else {
                file = (0, js_1.useMetaplexFile)(filepath, '');
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
        return bundlr_1.Bundlr.make(feePayer)
            .nfts()
            .uploadMetadata(metadata)
            .then((res) => shared_1.Result.ok(res.uri))
            .catch(shared_1.Result.err);
    });
})(StorageArweave = exports.StorageArweave || (exports.StorageArweave = {}));
