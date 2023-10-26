var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Constants, debugLog, isBrowser, isNode, } from '@solana-suite/shared';
import Irys, { WebIrys } from '@irys/sdk';
export var ProvenanceLayer;
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
        return `${Constants.IRYS_GATEWAY_URL}/${receipt.id}`;
    });
    ProvenanceLayer.uploadData = (data, identity, tags) => __awaiter(this, void 0, void 0, function* () {
        const irys = yield ProvenanceLayer.getIrys(identity);
        const receipt = yield irys.upload(data, { tags });
        return `${Constants.IRYS_GATEWAY_URL}/${receipt.id}`;
    });
    ProvenanceLayer.isNodeable = (value) => {
        if (isNode()) {
            return typeof value === 'string';
        }
        return false;
    };
    ProvenanceLayer.isBrowserable = (value) => {
        if (isBrowser()) {
            return value instanceof File;
        }
        return false;
    };
    ProvenanceLayer.isUploadable = (value) => {
        if (isNode()) {
            return typeof value === 'string';
        }
        else if (isBrowser()) {
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
        debugLog('# fundTx: ', fundTx);
    });
    // @internal
    ProvenanceLayer.toByteLength = (content) => __awaiter(this, void 0, void 0, function* () {
        let length = 100;
        if (ProvenanceLayer.isNodeable(content)) {
            length = (yield import('fs')).readFileSync(content).length;
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
        if (isNode()) {
            return ProvenanceLayer.getNodeIrys(identity);
        }
        else if (isBrowser()) {
            return (yield ProvenanceLayer.getBrowserIrys(identity));
        }
        else {
            throw Error('Only Node.js or Browser');
        }
    });
    // @internal
    ProvenanceLayer.getNodeIrys = (secret) => {
        const clusterUrl = Constants.switchCluster({
            cluster: Constants.currentCluster,
        });
        const url = Constants.BUNDLR_NETWORK_URL;
        const token = TOKEN;
        const key = secret;
        const irys = new Irys({
            url,
            token,
            key,
            config: { providerUrl: clusterUrl },
        });
        return irys;
    };
    // @internal
    ProvenanceLayer.getBrowserIrys = (provider) => __awaiter(this, void 0, void 0, function* () {
        const clusterUrl = Constants.switchCluster({
            cluster: Constants.currentCluster,
        });
        const url = Constants.BUNDLR_NETWORK_URL;
        const token = TOKEN;
        const wallet = { rpcUrl: clusterUrl, name: TOKEN, provider: provider };
        const webIrys = new WebIrys({ url, token, wallet });
        yield webIrys.ready();
        return webIrys;
    });
    const calculateCost = (size, identity) => __awaiter(this, void 0, void 0, function* () {
        const irys = yield ProvenanceLayer.getIrys(identity);
        const priceAtomic = yield irys.getPrice(size);
        const priceConverted = irys.utils.fromAtomic(priceAtomic);
        debugLog('# size: ', size);
        debugLog('# price: ', priceConverted);
        return priceConverted;
    });
})(ProvenanceLayer || (ProvenanceLayer = {}));
//# sourceMappingURL=provenance-layer.js.map