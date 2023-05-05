import { Convert as _Collection } from './collection';
import { Convert as _Creators } from './creators';
import { Convert as _Uses } from './uses';
import { Convert as _Token } from './token-metadata';
export var Convert;
(function (Convert) {
    var NftMetadata;
    (function (NftMetadata) {
        NftMetadata.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
            return {
                name: input.name,
                symbol: input.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: _Creators.Creators.intoInfraSide(input.creators),
                collection: _Collection.Collection.intoInfraSide(input.collection),
                uses: input.uses || null,
            };
        };
        NftMetadata.intoUserSide = (output) => {
            return {
                mint: output.onchain.mint.toString(),
                updateAuthority: output.onchain.updateAuthority.toString(),
                royalty: output.onchain.data.sellerFeeBasisPoints,
                name: _Token.TokenMetadata.deleteNullStrings(output.onchain.data.name),
                symbol: _Token.TokenMetadata.deleteNullStrings(output.onchain.data.symbol),
                uri: _Token.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
                isMutable: output.onchain.isMutable,
                primarySaleHappened: output.onchain.primarySaleHappened,
                creators: _Creators.Creators.intoUserSide(output.onchain.data.creators),
                editionNonce: output.onchain.editionNonce,
                collection: _Collection.Collection.intoUserSide(output.onchain.collection),
                uses: _Uses.Uses.intoUserSide(output.onchain.uses),
                offchain: output.offchain,
            };
        };
    })(NftMetadata = Convert.NftMetadata || (Convert.NftMetadata = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=nft-metadata.js.map