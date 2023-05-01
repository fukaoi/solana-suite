import { Convert as CO } from './collection';
import { Convert as CR } from './creators';
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
                creators: CR.Creators.intoInfraSide(input.creators),
                collection: CO.Collection.intoInfraSide(input.collection),
                uses: input.uses || null,
            };
        };
        NftMetadata.intoUserSide = (input) => {
            return {
                mint: input.onchain.mint.toString(),
                updateAuthority: input.onchain.updateAuthority.toString(),
                royalty: input.onchain.data.sellerFeeBasisPoints,
                name: input.onchain.data.name,
                symbol: input.onchain.data.symbol,
                uri: input.onchain.data.uri,
                isMutable: input.onchain.isMutable,
                primarySaleHappened: input.onchain.primarySaleHappened,
                creators: CR.Creators.intoUserSide(input.onchain.data.creators),
                editionNonce: input.onchain.editionNonce,
                collection: CO.Collection.intoUserSide(input.onchain.collection),
                uses: input.onchain.uses,
                offchain: input.offchain,
            };
        };
    })(NftMetadata = Convert.NftMetadata || (Convert.NftMetadata = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=nft-metadata.js.map