import { Convert as C1 } from './collection';
import { Convert as C2 } from './creators';
export var Convert;
(function (Convert) {
    var NftMetadata;
    (function (NftMetadata) {
        NftMetadata.intoInfra = (input, uri, sellerFeeBasisPoints) => {
            return {
                name: input.name,
                symbol: input.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: C2.Creators.intoInfra(input.creators),
                collection: C1.Collection.intoInfra(input.collection),
                uses: input.uses || null,
            };
        };
    })(NftMetadata = Convert.NftMetadata || (Convert.NftMetadata = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=nft-metadata.js.map