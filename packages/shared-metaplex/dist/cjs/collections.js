"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collections = void 0;
var Collections;
(function (Collections) {
    Collections.toInputConvert = (input) => (!input ? null : input.toPublicKey());
    Collections.toInputAuthorityConvert = (input) => (!input ? null : input.toKeypair());
    Collections.toOutputConvert = (output) => {
        return !output
            ? null
            : {
                address: output.address.toString(),
                verified: output.verified,
            };
    };
})(Collections = exports.Collections || (exports.Collections = {}));
//# sourceMappingURL=collections.js.map