import { Convert as C1 } from './collection';
import { Convert as C2 } from './creators';
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
                creators: C2.Creators.intoInfraSide(input.creators),
                collection: C1.Collection.intoInfraSide(input.collection),
                uses: input.uses || null,
            };
        };
        NftMetadata.intoUserSide = (input, uri, sellerFeeBasisPoints) => {
            return {
                name: input.name,
                symbol: input.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: C2.Creators.intoInfraSide(input.creators),
                collection: C1.Collection.intoInfraSide(input.collection),
                uses: input.uses || null,
            };
        };
    })(NftMetadata = Convert.NftMetadata || (Convert.NftMetadata = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=nft-metadata.js.map