"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collections = void 0;
var Collections;
(function (Collections) {
    Collections.toConvertInfra = (input) => {
        if (!input) {
            return null;
        }
        return {
            key: input.toPublicKey(),
            verified: false,
        };
    };
    Collections.toConvertUser = (output) => {
        if (!output) {
            return null;
        }
        return {
            address: output.address.toString(),
            verified: output.verified,
        };
    };
})(Collections = exports.Collections || (exports.Collections = {}));
//# sourceMappingURL=collections.js.map