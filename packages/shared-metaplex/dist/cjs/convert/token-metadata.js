"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const creators_1 = require("./creators");
var Convert;
(function (Convert) {
    var TokenMetadata;
    (function (TokenMetadata) {
        TokenMetadata.intoInfra = (input, uri, sellerFeeBasisPoints) => {
            return {
                name: input.name,
                symbol: input.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: creators_1.Convert.Creators.intoInfra(input.creators),
                collection: null,
                uses: input.uses || null,
            };
        };
    })(TokenMetadata = Convert.TokenMetadata || (Convert.TokenMetadata = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=token-metadata.js.map