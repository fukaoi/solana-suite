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
            verified: true,
        };
    };
    Collections.toConvertUser = (output) => {
        return !output ? null : output.toString();
    };
})(Collections = exports.Collections || (exports.Collections = {}));
//# sourceMappingURL=collections.js.map