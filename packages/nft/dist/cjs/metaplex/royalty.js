"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
//@internal
var Metaplex;
(function (Metaplex) {
    Metaplex.THRESHOLD = 100;
    Metaplex.convertRoyalty = (percentage) => {
        return percentage * Metaplex.THRESHOLD;
    };
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
