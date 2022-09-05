var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Result } from '@solana-suite/shared';
import { Bundlr } from '../bundlr';
export var Metaplex;
(function (Metaplex) {
    Metaplex.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        // ) => {
        const allData = yield Bundlr.make()
            .nfts()
            .findAllByOwner(owner)
            .then(Result.ok)
            .catch(Result.err);
        if (allData.isErr) {
            return Result.err(allData.error);
        }
        const res = allData.unwrap().map((d) => {
            return {
                mint: d.mint.toString(),
                updateAuthority: d.updateAuthority.toString(),
                name: d.name,
                symbol: d.symbol,
                uri: d.uri,
                royalty: d.sellerFeeBasisPoints,
                creators: d.creators,
                isMutable: d.isMutable,
                editionNonce: d.editionNonce,
                tokenStandard: d.tokenStandard,
                collection: d.collection,
                primarySaleHappened: d.primarySaleHappened,
                uses: d.uses,
            };
        });
        return Result.ok(res);
    });
})(Metaplex || (Metaplex = {}));
