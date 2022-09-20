"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Internals_Royalty = void 0;
var Internals_Royalty;
(function (Internals_Royalty) {
    Internals_Royalty.THRESHOLD = 100;
    Internals_Royalty.convertValue = (percentage) => {
        return percentage * Internals_Royalty.THRESHOLD;
    };
})(Internals_Royalty = exports.Internals_Royalty || (exports.Internals_Royalty = {}));
