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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arweave = void 0;
const provenance_layer_1 = require("./provenance-layer");
const shared_1 = require("@solana-suite/shared");
var Arweave;
(function (Arweave) {
    Arweave.uploadFile = (filePath, feePayer) => {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            (0, shared_1.debugLog)("# upload file: ", filePath);
            yield provenance_layer_1.ProvenanceLayer.fundArweave(filePath, feePayer);
            return yield provenance_layer_1.ProvenanceLayer.uploadFile(filePath, feePayer);
        }));
    };
    Arweave.uploadData = (metadata, feePayer) => {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            (0, shared_1.debugLog)("# upload meta data: ", metadata);
            return yield provenance_layer_1.ProvenanceLayer.uploadData(JSON.stringify(metadata), feePayer);
        }));
    };
})(Arweave = exports.Arweave || (exports.Arweave = {}));
//# sourceMappingURL=arweave.js.map