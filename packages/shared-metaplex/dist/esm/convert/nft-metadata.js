import { Convert as CO } from './collection';
import { Convert as CR } from './creators';
import { Convert as CU } from './uses';
import { Convert as TM } from './token-metadata';
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
                creators: CR.Creators.intoInfraSide(input.creators),
                collection: CO.Collection.intoInfraSide(input.collection),
                uses: input.uses || null,
            };
        };
        NftMetadata.intoUserSide = (output) => {
            return {
                mint: output.onchain.mint.toString(),
                updateAuthority: output.onchain.updateAuthority.toString(),
                royalty: output.onchain.data.sellerFeeBasisPoints,
                name: TM.TokenMetadata.deleteNullStrings(output.onchain.data.name),
                symbol: TM.TokenMetadata.deleteNullStrings(output.onchain.data.symbol),
                uri: TM.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
                isMutable: output.onchain.isMutable,
                primarySaleHappened: output.onchain.primarySaleHappened,
                creators: CR.Creators.intoUserSide(output.onchain.data.creators),
                editionNonce: output.onchain.editionNonce,
                collection: CO.Collection.intoUserSide(output.onchain.collection),
                uses: CU.Uses.intoUserSide(output.onchain.uses),
                offchain: output.offchain,
            };
        };
    })(NftMetadata = Convert.NftMetadata || (Convert.NftMetadata = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=nft-metadata.js.map