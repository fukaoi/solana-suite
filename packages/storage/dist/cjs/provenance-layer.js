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
exports.ProvenanceLayer = void 0;
const shared_1 = require("@solana-suite/shared");
const sdk_1 = __importStar(require("@irys/sdk"));
var ProvenanceLayer;
(function (ProvenanceLayer) {
    const TOKEN = 'solana';
    ProvenanceLayer.uploadFile = (uploadFile, identity, tags) => __awaiter(this, void 0, void 0, function* () {
        const irys = yield ProvenanceLayer.getIrys(identity);
        let receipt;
        if (ProvenanceLayer.isUploadable(uploadFile)) {
            receipt = yield irys.uploadFile(uploadFile, { tags });
        }
        else {
            throw Error('No match file type or enviroment');
        }
        return `${shared_1.Constants.IRYS_GATEWAY_URL}/${receipt.id}`;
    });
    ProvenanceLayer.uploadData = (data, identity, tags) => __awaiter(this, void 0, void 0, function* () {
        const irys = yield ProvenanceLayer.getIrys(identity);
        const receipt = yield irys.upload(data, { tags });
        return `${shared_1.Constants.IRYS_GATEWAY_URL}/${receipt.id}`;
    });
    ProvenanceLayer.isNodeable = (value) => {
        if ((0, shared_1.isNode)()) {
            return typeof value === 'string';
        }
        return false;
    };
    ProvenanceLayer.isBrowserable = (value) => {
        if ((0, shared_1.isBrowser)()) {
            return value instanceof File;
        }
        return false;
    };
    ProvenanceLayer.isUploadable = (value) => {
        if ((0, shared_1.isNode)()) {
            return typeof value === 'string';
        }
        else if ((0, shared_1.isBrowser)()) {
            return value instanceof File;
        }
        return false;
    };
    // @internal
    ProvenanceLayer.fundArweave = (uploadFile, identity) => __awaiter(this, void 0, void 0, function* () {
        const irys = yield ProvenanceLayer.getIrys(identity);
        const byteLength = yield ProvenanceLayer.toByteLength(uploadFile);
        const willPay = yield calculateCost(byteLength, identity);
        const fundTx = yield irys.fund(irys.utils.toAtomic(willPay));
        (0, shared_1.debugLog)('# fundTx: ', fundTx);
    });
    // @internal
    ProvenanceLayer.toByteLength = (content) => __awaiter(this, void 0, void 0, function* () {
        let length = 100;
        if (ProvenanceLayer.isNodeable(content)) {
            length = (yield Promise.resolve().then(() => __importStar(require('fs')))).readFileSync(content).length;
        }
        else if (ProvenanceLayer.isBrowserable(content)) {
            length = content.size;
        }
        else {
            throw Error('No match content type');
        }
        return length;
    });
    // @internal
    ProvenanceLayer.getIrys = (identity) => __awaiter(this, void 0, void 0, function* () {
        if ((0, shared_1.isNode)()) {
            return ProvenanceLayer.getNodeIrys(identity);
        }
        else if ((0, shared_1.isBrowser)()) {
            return (yield ProvenanceLayer.getBrowserIrys(identity));
        }
        else {
            throw Error('Only Node.js or Browser');
        }
    });
    // @internal
    ProvenanceLayer.getNodeIrys = (secret) => {
        const clusterUrl = shared_1.Constants.switchCluster({
            cluster: shared_1.Constants.currentCluster,
        });
        const url = shared_1.Constants.BUNDLR_NETWORK_URL;
        const token = TOKEN;
        const key = secret;
        const irys = new sdk_1.default({
            url,
            token,
            key,
            config: { providerUrl: clusterUrl },
        });
        return irys;
    };
    // @internal
    ProvenanceLayer.getBrowserIrys = (provider) => __awaiter(this, void 0, void 0, function* () {
        const clusterUrl = shared_1.Constants.switchCluster({
            cluster: shared_1.Constants.currentCluster,
        });
        const url = shared_1.Constants.BUNDLR_NETWORK_URL;
        const token = TOKEN;
        const wallet = { rpcUrl: clusterUrl, name: TOKEN, provider: provider };
        const webIrys = new sdk_1.WebIrys({ url, token, wallet });
        yield webIrys.ready();
        return webIrys;
    });
    const calculateCost = (size, identity) => __awaiter(this, void 0, void 0, function* () {
        const irys = yield ProvenanceLayer.getIrys(identity);
        const priceAtomic = yield irys.getPrice(size);
        const priceConverted = irys.utils.fromAtomic(priceAtomic);
        (0, shared_1.debugLog)('# size: ', size);
        (0, shared_1.debugLog)('# price: ', priceConverted);
        return priceConverted;
    });
})(ProvenanceLayer = exports.ProvenanceLayer || (exports.ProvenanceLayer = {}));
//# sourceMappingURL=provenance-layer.js.map