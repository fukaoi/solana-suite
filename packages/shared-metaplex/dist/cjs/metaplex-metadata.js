"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexMetadata = void 0;
var MetaplexMetadata;
(function (MetaplexMetadata) {
    MetaplexMetadata.toConvertDataV2 = (input, uri, sellerFeeBasisPoints) => {
        return {
            name: input.name,
            symbol: input.symbol,
            uri,
            sellerFeeBasisPoints,
            creators: null,
            collection: null,
            uses: null,
        };
    };
})(MetaplexMetadata = exports.MetaplexMetadata || (exports.MetaplexMetadata = {}));
//# sourceMappingURL=metaplex-metadata.js.map