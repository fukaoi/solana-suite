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
exports.Convert = void 0;
const shared_1 = require("@solana-suite/shared");
var Convert;
(function (Convert) {
    var Properties;
    (function (Properties) {
        Properties.intoInfraSide = (input, storageFunc, storageType, feePayer) => __awaiter(this, void 0, void 0, function* () {
            if (!input || !input.files) {
                return {};
            }
            const files = yield Promise.all(input.files.map((file) => __awaiter(this, void 0, void 0, function* () {
                if (!file.filePath) {
                    return {};
                }
                const res = yield storageFunc(file.filePath, storageType, feePayer);
                if (res.isErr) {
                    throw Error(res.error.message);
                }
                return (0, shared_1.overwriteObject)(file, [
                    {
                        existsKey: 'filePath',
                        will: { key: 'uri', value: res.value },
                    },
                ]);
            })));
            return Object.assign(Object.assign({}, input), { files });
        });
    })(Properties = Convert.Properties || (Convert.Properties = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=properties.js.map