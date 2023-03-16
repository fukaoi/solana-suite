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
exports.Properties = void 0;
const shared_1 = require("@solana-suite/shared");
var Properties;
(function (Properties) {
    Properties.toInputConvert = (input, storageFunc, storageType, feePayer) => __awaiter(this, void 0, void 0, function* () {
        if (!input || !input.files) {
            return {};
        }
        const files = yield Promise.all(input.files.map((data) => __awaiter(this, void 0, void 0, function* () {
            const res = yield storageFunc(data.filePath, storageType, feePayer);
            if (res.isErr) {
                throw Error(res.error.message);
            }
            return (0, shared_1.overwriteObject)(data, [
                {
                    existsKey: 'filePath',
                    will: { key: 'uri', value: res.value },
                },
            ]);
        })));
        return Object.assign(Object.assign({}, input), { files });
    });
})(Properties = exports.Properties || (exports.Properties = {}));
//# sourceMappingURL=properties.js.map