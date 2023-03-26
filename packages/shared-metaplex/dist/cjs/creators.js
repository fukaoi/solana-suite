"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Creators = void 0;
var Creators;
(function (Creators) {
    Creators.toConvertInfra = (input) => {
        if (!input) {
            return [];
        }
        return input.map((data) => {
            const modify = {
                address: data.address.toPublicKey(),
                share: data.share,
                verified: data.verified,
            };
            return modify;
        });
    };
    Creators.toConvertUser = (output) => {
        if (!output) {
            return [];
        }
        return output.map((data) => {
            const modify = {
                address: data.address.toString(),
                share: data.share,
                verified: data.verified,
            };
            return modify;
        });
    };
})(Creators = exports.Creators || (exports.Creators = {}));
//# sourceMappingURL=creators.js.map