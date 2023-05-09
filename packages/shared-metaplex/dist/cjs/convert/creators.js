"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
var Convert;
(function (Convert) {
    var Creators;
    (function (Creators) {
        Creators.intoInfraSide = (input) => {
            if (!input) {
                return null;
            }
            return input.map((data) => {
                let modify = null;
                modify = {
                    address: data.address.toPublicKey(),
                    share: data.share,
                    verified: data.verified,
                };
                return modify;
            });
        };
        Creators.intoUserSide = (output) => {
            if (!output) {
                return undefined;
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
    })(Creators = Convert.Creators || (Convert.Creators = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=creators.js.map