"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexMetadata = void 0;
const collections_1 = require("./collections");
const creators_1 = require("./creators");
var MetaplexMetadata;
(function (MetaplexMetadata) {
    MetaplexMetadata.toConvertDataV2 = (input, uri, sellerFeeBasisPoints) => {
        return {
            name: input.name,
            symbol: input.symbol,
            uri,
            sellerFeeBasisPoints,
            creators: creators_1.Creators.toConvertInfra(input.creators),
            collection: collections_1.Collections.toConvertInfra(input.collection),
            uses: input.uses || null,
        };
    };
})(MetaplexMetadata = exports.MetaplexMetadata || (exports.MetaplexMetadata = {}));
//# sourceMappingURL=metaplex-metadata.js.map