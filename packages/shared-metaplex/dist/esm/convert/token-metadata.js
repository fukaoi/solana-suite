import { Convert as CR } from './creators';
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
        // export const intoUserSide = (
        //   input: UserSideOutput.TokenMetadata
        // ): UserSideOutput.TokenMetadata => {
        //   return {
        //     mint: input.onchain.mint.toString(),
        //     updateAuthority: input.onchain.updateAuthority.toString(),
        //     royalty: input.onchain.data.sellerFeeBasisPoints,
        //     name: input.onchain.data.name,
        //     symbol: input.onchain.data.symbol,
        //     uri: input.onchain.data.uri,
        //     isMutable: input.onchain.isMutable,
        //     primarySaleHappened: input.onchain.primarySaleHappened,
        //     creators: CR.Creators.intoUserSide(input.onchain.data.creators),
        //     editionNonce: input.onchain.editionNonce,
        //     collection: CO.Collection.intoUserSide(input.onchain.collection),
        //     uses: input.onchain.uses,
        //     offchain: input.offchain,
        //   };
        // };
    })(TokenMetadata = Convert.TokenMetadata || (Convert.TokenMetadata = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=token-metadata.js.map