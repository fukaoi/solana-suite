var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Try } from '@solana-suite/shared';
import { Creators, Collections, } from '@solana-suite/shared-metaplex';
import { Bundlr } from '@solana-suite/storage';
export var Metaplex;
(function (Metaplex) {
    Metaplex.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const allData = yield Bundlr.make()
                .nfts()
                .findAllByOwner({ owner: owner.toPublicKey() });
            const res = allData.map((d) => {
                console.log(d.json);
                return {
                    mint: d.mintAddress.toString(),
                    updateAuthority: d.updateAuthorityAddress.toString(),
                    royalty: d.sellerFeeBasisPoints,
                    name: d.name,
                    symbol: d.symbol,
                    uri: d.uri,
                    isMutable: d.isMutable,
                    primarySaleHappened: d.primarySaleHappened,
                    creators: Creators.toConvertUser(d.creators),
                    editionNonce: d.editionNonce,
                    collection: Collections.toConvertUser(d.collection),
                    uses: d.uses,
                };
            });
            return res;
        }));
    });
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=find.js.map