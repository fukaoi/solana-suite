var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProvenanceLayer } from './provenance-layer';
import { debugLog, Try } from '@solana-suite/shared';
export var Arweave;
(function (Arweave) {
    Arweave.uploadFile = (filePath, feePayer) => {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            debugLog('# upload file: ', filePath);
            yield ProvenanceLayer.fundArweave(filePath, feePayer);
            return yield ProvenanceLayer.uploadFile(filePath, feePayer);
        }));
    };
    Arweave.uploadData = (metadata, feePayer) => {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            debugLog('# upload meta data: ', metadata);
            return yield ProvenanceLayer.uploadData(JSON.stringify(metadata), feePayer);
        }));
    };
})(Arweave || (Arweave = {}));
//# sourceMappingURL=arweave.js.map