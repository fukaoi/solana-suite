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
const fs_1 = __importDefault(require("fs"));
const shared_1 = require("@solana-suite/shared");
var StorageArweave;
(function (StorageArweave) {
    const BUNDLR_CONNECT_TIMEOUT = 60000;
    StorageArweave.getUploadPrice = () => {
    };
    StorageArweave.uploadContent = (payer, filePath, fileOptions) => __awaiter(this, void 0, void 0, function* () {
        (0, shared_1.debugLog)('# upload content: ', filePath);
        const metaplex = js_1.Metaplex
            .make(shared_1.Node.getConnection())
            .use((0, js_1.keypairIdentity)(payer))
            .use((0, js_1.bundlrStorage)({
            address: shared_1.Constants.BUNDLR_NETWORK_URL,
            providerUrl: shared_1.ConstantsFunc.switchCluster(shared_1.Constants.currentCluster),
            timeout: BUNDLR_CONNECT_TIMEOUT,
        }));
        const driver = metaplex.storage().driver();
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
            return shared_1.Result.err(Error('Supported envriroment: only Node.js and Browser js'));
        }
        return driver.upload(file)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
    });
    StorageArweave.uploadMetadata = (payer, metadata) => __awaiter(this, void 0, void 0, function* () {
        (0, shared_1.debugLog)('# upload meta data: ', metadata);
        const metaplex = js_1.Metaplex
            .make(shared_1.Node.getConnection())
            .use((0, js_1.keypairIdentity)(payer))
            .use((0, js_1.bundlrStorage)({
            address: shared_1.Constants.BUNDLR_NETWORK_URL,
            providerUrl: shared_1.ConstantsFunc.switchCluster(shared_1.Constants.currentCluster),
            timeout: BUNDLR_CONNECT_TIMEOUT,
        }));
        return metaplex.nfts().uploadMetadata(metadata)
            .then(res => shared_1.Result.ok(res.uri))
            .catch(shared_1.Result.err);
    });
})(StorageArweave = exports.StorageArweave || (exports.StorageArweave = {}));
