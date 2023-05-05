"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
var Convert;
(function (Convert) {
    var Shared;
    (function (Shared) {
        Shared.convertTimestampToDate = (blockTime) => {
            return new Date(blockTime * 1000);
        };
    })(Shared = Convert.Shared || (Convert.Shared = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=shared.js.map