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
// export type DataV2 = {
//     name: string;
//     symbol: string;
//     uri: string;
//     sellerFeeBasisPoints: number;
//     creators: beet.COption<Creator[]>;
//     collection: beet.COption<Collection>;
//     uses: beet.COption<Uses>;
// };
// export declare const dataV2Beet: beet.FixableBeetArgsStruct<DataV2>;
//# sourceMappingURL=metaplex-metadata.js.map