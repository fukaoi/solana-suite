import { Creators } from './creators';
export var TokenMetadata;
(function (TokenMetadata) {
    TokenMetadata.toConvertInfra = (input, uri, sellerFeeBasisPoints) => {
        return {
            name: input.name,
            symbol: input.symbol,
            uri,
            sellerFeeBasisPoints,
            creators: Creators.toConvertInfra(input.creators),
            collection: null,
            uses: input.uses || null,
        };
    };
})(TokenMetadata || (TokenMetadata = {}));
//# sourceMappingURL=token-metadata.js.map