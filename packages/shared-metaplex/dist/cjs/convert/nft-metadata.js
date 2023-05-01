"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const collection_1 = require("./collection");
const creators_1 = require("./creators");
const uses_1 = require("./uses");
var Convert;
(function (Convert) {
    var NftMetadata;
    (function (NftMetadata) {
        NftMetadata.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
            return {
                name: input.name,
                symbol: input.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: creators_1.Convert.Creators.intoInfraSide(input.creators),
                collection: collection_1.Convert.Collection.intoInfraSide(input.collection),
                uses: input.uses || null,
            };
        };
        NftMetadata.intoUserSide = (input) => {
            return {
                mint: input.onchain.mint.toString(),
                updateAuthority: input.onchain.updateAuthority.toString(),
                royalty: input.onchain.data.sellerFeeBasisPoints,
                name: NftMetadata.deleteNullStrings(input.onchain.data.name),
                symbol: NftMetadata.deleteNullStrings(input.onchain.data.symbol),
                uri: NftMetadata.deleteNullStrings(input.onchain.data.uri),
                isMutable: input.onchain.isMutable,
                primarySaleHappened: input.onchain.primarySaleHappened,
                creators: creators_1.Convert.Creators.intoUserSide(input.onchain.data.creators),
                editionNonce: input.onchain.editionNonce,
                collection: collection_1.Convert.Collection.intoUserSide(input.onchain.collection),
                uses: uses_1.Convert.Uses.intoUserSide(input.onchain.uses),
                offchain: input.offchain,
            };
        };
        // delete NULL(0x00) strings function
        NftMetadata.deleteNullStrings = (str) => {
            return str.replace(/\0/g, '');
        };
    })(NftMetadata = Convert.NftMetadata || (Convert.NftMetadata = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=nft-metadata.js.map