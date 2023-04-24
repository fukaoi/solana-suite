import { Collections } from './collections';
import { Creators } from './creators';
export var NftMetadata;
(function (NftMetadata) {
    NftMetadata.toConvertInfra = (input, uri, sellerFeeBasisPoints) => {
        return {
            name: input.name,
            symbol: input.symbol,
            uri,
            sellerFeeBasisPoints,
            creators: Creators.toConvertInfra(input.creators),
            collection: Collections.toConvertInfra(input.collection),
            uses: input.uses || null,
        };
    };
})(NftMetadata || (NftMetadata = {}));
//# sourceMappingURL=nft-metadata.js.map