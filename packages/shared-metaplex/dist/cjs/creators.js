"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Creators = void 0;
var Creators;
(function (Creators) {
    Creators.toInputConvert = (input) => {
        if (!input) {
            return [];
        }
        return input.map((data) => {
            const authority = data.authority
                ? (data.authority).toKeypair()
                : undefined;
            const modify = {
                address: data.address.toPublicKey(),
                share: data.share,
                authority: authority,
            };
            return modify;
        });
    };
    Creators.toOutputConvert = (output) => {
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