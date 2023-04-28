"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
var Convert;
(function (Convert) {
    var Collection;
    (function (Collection) {
        Collection.intoInfraSide = (input) => {
            if (!input) {
                return null;
            }
            return {
                key: input.toPublicKey(),
                verified: false,
            };
        };
        Collection.intoUserSide = (output) => {
            if (!output) {
                return null;
            }
            return {
                address: output.address.toString(),
                verified: output.verified,
            };
        };
    })(Collection = Convert.Collection || (Convert.Collection = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=collection.js.map