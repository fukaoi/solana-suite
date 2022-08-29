"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexRoyalty = void 0;
var MetaplexRoyalty;
(function (MetaplexRoyalty) {
    MetaplexRoyalty.THRESHOLD = 100;
    MetaplexRoyalty.convertValue = (percentage) => {
        return percentage * MetaplexRoyalty.THRESHOLD;
    };
})(MetaplexRoyalty = exports.MetaplexRoyalty || (exports.MetaplexRoyalty = {}));
