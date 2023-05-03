import { Convert as CR } from './creators';
import { Convert as CU } from './uses';
export var Convert;
(function (Convert) {
    var TokenMetadata;
    (function (TokenMetadata) {
        TokenMetadata.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
            return {
                name: input.name,
                symbol: input.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: CR.Creators.intoInfraSide(input.creators),
                collection: null,
                uses: input.uses || null,
            };
        };
        TokenMetadata.intoUserSide = (output) => {
            return {
                mint: output.onchain.mint.toString(),
                royalty: output.onchain.data.sellerFeeBasisPoints,
                name: TokenMetadata.deleteNullStrings(output.onchain.data.name),
                symbol: TokenMetadata.deleteNullStrings(output.onchain.data.symbol),
                uri: TokenMetadata.deleteNullStrings(output.onchain.data.uri),
                creators: CR.Creators.intoUserSide(output.onchain.data.creators),
                uses: CU.Uses.intoUserSide(output.onchain.uses),
                offchain: output.offchain,
            };
        };
        // delete NULL(0x00) strings function
        TokenMetadata.deleteNullStrings = (str) => {
            return str.replace(/\0/g, '');
        };
    })(TokenMetadata = Convert.TokenMetadata || (Convert.TokenMetadata = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=token-metadata.js.map