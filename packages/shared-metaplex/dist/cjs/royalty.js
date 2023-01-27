"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Royalty = void 0;
var Royalty;
(function (Royalty) {
    Royalty.THRESHOLD = 100;
    Royalty.convert = (percentage) => {
        return percentage * Royalty.THRESHOLD;
    };
})(Royalty = exports.Royalty || (exports.Royalty = {}));
//# sourceMappingURL=royalty.js.map