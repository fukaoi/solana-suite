var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, Try } from '@solana-suite/shared';
import { Collections, Creators, Pda, } from '@solana-suite/shared-metaplex';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Bundlr } from '@solana-suite/storage';
export var Metaplex;
(function (Metaplex) {
    Metaplex.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const allData = yield Bundlr.make()
                .nfts()
                .findAllByOwner({ owner: owner.toPublicKey() });
            const res = allData.map((d) => {
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
    Metaplex.findByOwner2 = (owner) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const info = yield Node.getConnection().getParsedTokenAccountsByOwner(owner.toPublicKey(), {
                programId: TOKEN_PROGRAM_ID,
            });
            info.value.forEach((el) => {
                // console.log('pubkey: ', el.pubkey.toString());
                const mint = el.account.data.parsed.info.mint;
                console.log('account: ', mint);
                const tokenAccount = Pda.getMetadata(mint.toPublicKey());
                console.log(tokenAccount);
            });
        }));
    });
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=find.js.map