"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
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
