"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMetadata = void 0;
const collections_1 = require("./collections");
const creators_1 = require("./creators");
var NftMetadata;
(function (NftMetadata) {
    NftMetadata.toConvertInfra = (input, uri, sellerFeeBasisPoints) => {
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
})(NftMetadata = exports.NftMetadata || (exports.NftMetadata = {}));
//# sourceMappingURL=nft-metadata.js.map