"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const creators_1 = require("./creators");
const uses_1 = require("./uses");
var Convert;
(function (Convert) {
    var TokenMetadata;
    (function (TokenMetadata) {
        TokenMetadata.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
            return {
                name: input.name,
                symbol: input.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: creators_1.Convert.Creators.intoInfraSide(input.creators),
                collection: null,
                uses: input.uses || null,
            };
        };
        TokenMetadata.intoUserSide = (output) => {
            return {
                mint: output.onchain.mint.toString(),
                royalty: output.onchain.data.sellerFeeBasisPoints,
                name: TokenMetadata.deleteNullStrings(output.onchain.data.name),
                symbol: TokenMetadata.deleteNullStrings(output.onchain.data.symbol),
                uri: TokenMetadata.deleteNullStrings(output.onchain.data.uri),
                creators: creators_1.Convert.Creators.intoUserSide(output.onchain.data.creators),
                uses: uses_1.Convert.Uses.intoUserSide(output.onchain.uses),
                offchain: output.offchain,
            };
        };
        // delete NULL(0x00) strings function
        TokenMetadata.deleteNullStrings = (str) => {
            return str.replace(/\0/g, '');
        };
    })(TokenMetadata = Convert.TokenMetadata || (Convert.TokenMetadata = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=token-metadata.js.map