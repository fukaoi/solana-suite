"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
var Collection;
(function (Collection) {
    Collection.toInputConvert = (input) => !input ? null : input.toPublicKey();
    Collection.toInputAuthorityConvert = (input) => (!input ? null : input.toKeypair());
    Collection.toOutputConvert = (output) => {
        return !output
            ? null
            : {
                address: output.address.toString(),
                verified: output.verified,
            };
    };
})(Collection = exports.Collection || (exports.Collection = {}));
//# sourceMappingURL=collection.js.map