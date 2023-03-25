export var MetaplexMetadata;
(function (MetaplexMetadata) {
    MetaplexMetadata.toConvertDataV2 = (input, uri, sellerFeeBasisPoints) => {
        return {
            name: input.name,
            symbol: input.symbol,
            uri,
            sellerFeeBasisPoints,
            creators: null,
            collection: null,
            uses: null,
        };
    };
})(MetaplexMetadata || (MetaplexMetadata = {}));
//# sourceMappingURL=metaplex-metadata.js.map