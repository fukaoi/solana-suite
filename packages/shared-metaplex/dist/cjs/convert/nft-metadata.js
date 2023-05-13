"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const collection_1 = require("./collection");
const creators_1 = require("./creators");
const uses_1 = require("./uses");
const token_metadata_1 = require("./token-metadata");
const shared_1 = require("@solana-suite/shared");
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
        NftMetadata.intoUserSide = (output) => {
            return {
                mint: output.onchain.mint.toString(),
                updateAuthority: output.onchain.updateAuthority.toString(),
                royalty: output.onchain.data.sellerFeeBasisPoints,
                name: token_metadata_1.Convert.TokenMetadata.deleteNullStrings(output.onchain.data.name),
                symbol: token_metadata_1.Convert.TokenMetadata.deleteNullStrings(output.onchain.data.symbol),
                uri: token_metadata_1.Convert.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
                isMutable: output.onchain.isMutable,
                primarySaleHappened: output.onchain.primarySaleHappened,
                creators: creators_1.Convert.Creators.intoUserSide(output.onchain.data.creators),
                editionNonce: output.onchain.editionNonce,
                collection: collection_1.Convert.Collection.intoUserSide(output.onchain.collection),
                uses: uses_1.Convert.Uses.intoUserSide(output.onchain.uses),
                dateTime: (0, shared_1.convertTimestampToDateTime)(output.offchain.created_at),
                offchain: output.offchain,
            };
        };
    })(NftMetadata = Convert.NftMetadata || (Convert.NftMetadata = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=nft-metadata.js.map