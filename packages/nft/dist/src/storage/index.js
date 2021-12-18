"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
__exportStar(require("./arweave"), exports);
__exportStar(require("./nft-storage"), exports);
var Storage;
(function (Storage) {
    Storage.initStorageData = () => {
        return {
            name: '',
            description: '',
            image: '',
            symbol: '',
            seller_fee_basis_points: 0,
            animation_url: '',
            external_url: '',
            category: '',
            attributes: [],
            collection: {},
            properties: [],
            creators: [],
        };
    };
})(Storage = exports.Storage || (exports.Storage = {}));
