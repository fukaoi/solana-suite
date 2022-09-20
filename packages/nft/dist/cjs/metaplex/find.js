"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const shared_1 = require("@solana-suite/shared");
const bundlr_1 = require("../bundlr");
var Metaplex;
(function (Metaplex) {
    Metaplex.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        const allData = yield bundlr_1.Bundlr.make()
            .nfts()
            .findAllByOwner({ owner })
            .run()
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (allData.isErr) {
            return shared_1.Result.err(allData.error);
        }
        const res = allData.unwrap().map((d) => {
            return {
                mint: d.mintAddress.toString(),
                updateAuthority: d.updateAuthorityAddress.toString(),
                royalty: d.sellerFeeBasisPoints,
                name: d.name,
                symbol: d.symbol,
                uri: d.uri,
                isMutable: d.isMutable,
                primarySaleHappened: d.primarySaleHappened,
                creators: d.creators,
                editionNonce: d.editionNonce,
                collection: d.collection,
                uses: d.uses,
            };
        });
        return shared_1.Result.ok(res);
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
