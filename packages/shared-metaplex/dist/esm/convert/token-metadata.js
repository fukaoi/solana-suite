import { Convert as C1 } from './creators';
export var Convert;
(function (Convert) {
    var TokenMetadata;
    (function (TokenMetadata) {
        TokenMetadata.intoInfra = (input, uri, sellerFeeBasisPoints) => {
            return {
                name: input.name,
                symbol: input.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: C1.Creators.intoInfra(input.creators),
                collection: null,
                uses: input.uses || null,
            };
        };
    })(TokenMetadata = Convert.TokenMetadata || (Convert.TokenMetadata = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=token-metadata.js.map