"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const collection_1 = require("./collection");
const creators_1 = require("./creators");
var Convert;
(function (Convert) {
    var NftMetadata;
    (function (NftMetadata) {
        NftMetadata.intoInfra = (input, uri, sellerFeeBasisPoints) => {
            return {
                name: input.name,
                symbol: input.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: creators_1.Convert.Creators.intoInfra(input.creators),
                collection: collection_1.Convert.Collection.intoInfra(input.collection),
                uses: input.uses || null,
            };
        };
    })(NftMetadata = Convert.NftMetadata || (Convert.NftMetadata = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=nft-metadata.js.map