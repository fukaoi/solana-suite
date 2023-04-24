var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { Node, Try } from '@solana-suite/shared';
import { Collections, Creators, Pda, } from '@solana-suite/shared-metaplex';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Bundlr } from '@solana-suite/storage';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import fetch from 'cross-fetch';
export var Metaplex;
(function (Metaplex) {
    /**
     * Fetch minted metadata by owner Pubkey
     *
     * @param {Pubkey} owner
     * @return Promise<Result<OutputNftMetadata[], Error>>
     */
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
            var _a, e_1, _b, _c;
            const contentsDatas = [];
            try {
                const connection = Node.getConnection();
                const info = yield connection.getParsedTokenAccountsByOwner(owner.toPublicKey(), {
                    programId: TOKEN_PROGRAM_ID,
                });
                try {
                    // tokenStandard: 0(NFT) or 2 (SPL-TOKEN)
                    for (var _d = true, _e = __asyncValues(info.value), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                        _c = _f.value;
                        _d = false;
                        try {
                            const d = _c;
                            if (d.account.data.parsed.info.tokenAmount.uiAmount == 1) {
                                const mint = d.account.data.parsed.info.mint;
                                const metadata = yield Metadata.fromAccountAddress(connection, Pda.getMetadata(mint));
                                fetch(metadata.data.uri).then((response) => {
                                    response.json().then((json) => {
                                        contentsDatas.push({ onchain: metadata, offchain: json });
                                    });
                                });
                            }
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (e) {
                console.error('# EEEEE: ', e);
            }
            console.log(contentsDatas);
        }));
    });
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=find.js.map