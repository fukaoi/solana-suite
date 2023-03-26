import { Collections } from './collections';
import { Creators } from './creators';
export var MetaplexMetadata;
(function (MetaplexMetadata) {
    MetaplexMetadata.toConvertInfra = (input, uri, sellerFeeBasisPoints) => {
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
})(MetaplexMetadata || (MetaplexMetadata = {}));
//# sourceMappingURL=metaplex-metadata.js.map