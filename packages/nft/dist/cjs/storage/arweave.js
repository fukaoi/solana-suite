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
    StorageArweave.uploadContent = (payer, filePath, fileName, fileOptions) => __awaiter(this, void 0, void 0, function* () {
        const metaplex = js_1.Metaplex
            .make(shared_1.Node.getConnection())
            .use((0, js_1.keypairIdentity)(payer))
            .use((0, js_1.bundlrStorage)({
            address: shared_1.Constants.BUNDLR_NETWORK_URL,
            providerUrl: shared_1.ConstantsFunc.switchCluster(shared_1.Constants.currentCluster),
            timeout: BUNDLR_CONNECT_TIMEOUT,
        }));
        const driver = metaplex.storage().driver();
        const buffer = fs_1.default.readFileSync(filePath);
        let file;
        if (fileOptions) {
            file = (0, js_1.useMetaplexFile)(buffer, fileName, fileOptions);
        }
        else {
            file = (0, js_1.useMetaplexFile)(buffer, fileName);
        }
        return driver.upload(file)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
    });
    StorageArweave.uploadMetadata = (payer, input) => __awaiter(this, void 0, void 0, function* () {
        const metaplex = js_1.Metaplex
            .make(shared_1.Node.getConnection())
            .use((0, js_1.keypairIdentity)(payer))
            .use((0, js_1.bundlrStorage)({
            address: shared_1.Constants.BUNDLR_NETWORK_URL,
            providerUrl: shared_1.ConstantsFunc.switchCluster(shared_1.Constants.currentCluster),
            timeout: BUNDLR_CONNECT_TIMEOUT,
        }));
        return metaplex.nfts().uploadMetadata(input)
            .then(res => shared_1.Result.ok(res.uri))
            .catch(shared_1.Result.err);
    });
})(StorageArweave = exports.StorageArweave || (exports.StorageArweave = {}));
