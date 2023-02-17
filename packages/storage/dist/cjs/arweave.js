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
exports.Arweave = void 0;
const js_1 = require("@metaplex-foundation/js");
const shared_1 = require("@solana-suite/shared");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
var Arweave;
(function (Arweave) {
    Arweave.getUploadPrice = (filePath, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            let buffer;
            if ((0, shared_1.isNode)()) {
                const filepath = filePath;
                buffer = (yield Promise.resolve().then(() => __importStar(require('fs')))).readFileSync(filepath);
            }
            else if ((0, shared_1.isBrowser)()) {
                const filepath = filePath;
                buffer = (0, js_1.toMetaplexFile)(filepath, '').buffer;
            }
            else {
                throw Error('Supported environment: only Node.js and Browser js');
            }
            const res = yield shared_metaplex_1.Bundlr.useStorage(feePayer.toKeypair()).getUploadPrice(buffer.length);
            const basisPoints = res.basisPoints.toString();
            (0, shared_1.debugLog)('# buffer length, price', buffer.length, parseInt(basisPoints).toSol());
            return {
                price: parseInt(basisPoints).toSol(),
                currency: res.currency,
            };
        }));
    });
    Arweave.uploadContent = (filePath, feePayer, fileOptions // only arweave, not nft-storage
    ) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            (0, shared_1.debugLog)('# upload content: ', filePath);
            let file;
            if ((0, shared_1.isNode)()) {
                const filepath = filePath;
                const buffer = (yield Promise.resolve().then(() => __importStar(require('fs')))).readFileSync(filepath);
                if (fileOptions) {
                    file = (0, js_1.toMetaplexFile)(buffer, filepath, fileOptions);
                }
                else {
                    file = (0, js_1.toMetaplexFile)(buffer, filepath);
                }
            }
            else if ((0, shared_1.isBrowser)()) {
                const filepath = filePath;
                if (fileOptions) {
                    file = (0, js_1.toMetaplexFile)(filepath, '', fileOptions);
                }
                else {
                    file = (0, js_1.toMetaplexFile)(filepath, '');
                }
            }
            else {
                throw Error('Supported environment: only Node.js and Browser js');
            }
            return shared_metaplex_1.Bundlr.useStorage(feePayer.toKeypair()).upload(file);
        }));
    });
    Arweave.uploadMetadata = (metadata, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            (0, shared_1.debugLog)('# upload meta data: ', metadata);
            const uploaded = yield shared_metaplex_1.Bundlr.make(feePayer.toKeypair())
                .nfts()
                .uploadMetadata(metadata);
            return uploaded.uri;
        }));
    });
})(Arweave = exports.Arweave || (exports.Arweave = {}));
//# sourceMappingURL=arweave.js.map