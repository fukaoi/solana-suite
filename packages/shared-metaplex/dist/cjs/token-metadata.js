"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMetadata = void 0;
const creators_1 = require("./creators");
var TokenMetadata;
(function (TokenMetadata) {
    TokenMetadata.toConvertInfra = (input, uri, sellerFeeBasisPoints) => {
        return {
            name: input.name,
            symbol: input.symbol,
            uri,
            sellerFeeBasisPoints,
            creators: creators_1.Creators.toConvertInfra(input.creators),
            collection: null,
            uses: input.uses || null,
        };
    };
})(TokenMetadata = exports.TokenMetadata || (exports.TokenMetadata = {}));
//# sourceMappingURL=token-metadata.js.map