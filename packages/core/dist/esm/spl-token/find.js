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
import { debugLog, Node, Result } from '@solana-suite/shared';
import { Sortable } from '../types/spl-token';
import { Convert, Pda, UserSideInput, } from '@solana-suite/shared-metaplex';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import fetch from 'cross-fetch';
export var SplToken;
(function (SplToken) {
    // Sort by latest with unixtimestamp function
    const sortByUinixTimestamp = (sortable) => (a, b) => {
        if (!a.offchain.created_at) {
            a.offchain.created_at = 0;
        }
        if (!b.offchain.created_at) {
            b.offchain.created_at = 0;
        }
        if (sortable === Sortable.Desc) {
            return b.offchain.created_at - a.offchain.created_at;
        }
        else if (sortable === Sortable.Asc) {
            return a.offchain.created_at - b.offchain.created_at;
        }
        else {
            return b.offchain.created_at - a.offchain.created_at;
        }
    };
    const converter = (tokenStandard, metadata, json, tokenAmount) => {
        if (tokenStandard === UserSideInput.TokenStandard.Fungible) {
            return Convert.TokenMetadata.intoUserSide({
                onchain: metadata,
                offchain: json,
            }, tokenAmount);
        }
        else if (tokenStandard === UserSideInput.TokenStandard.NonFungible) {
            return Convert.NftMetadata.intoUserSide({
                onchain: metadata,
                offchain: json,
            });
        }
        else {
            throw Error(`No match tokenStandard: ${tokenStandard}`);
        }
    };
    SplToken.genericFindByOwner = (owner, callback, tokenStandard, sortable, isHolder) => __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            let data = [];
            const connection = Node.getConnection();
            const info = yield connection.getParsedTokenAccountsByOwner(owner.toPublicKey(), {
                programId: TOKEN_PROGRAM_ID,
            });
            info.value.length === 0 && callback(Result.ok([]));
            try {
                for (var _d = true, _e = __asyncValues(info.value), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const d = _c;
                        if (isHolder && d.account.data.parsed.info.tokenAmount.uiAmount < 1) {
                            debugLog('# findByOwner no hold metadata: ', d.account.data.parsed.info);
                            continue;
                        }
                        const mint = d.account.data.parsed.info.mint;
                        const tokenAmount = d.account.data.parsed.info
                            .tokenAmount;
                        try {
                            const metadata = yield Metadata.fromAccountAddress(connection, Pda.getMetadata(mint));
                            debugLog('# findByOwner metadata: ', metadata);
                            // tokenStandard: 0(NFT) or 2 (SPL-TOKEN)
                            if (metadata.tokenStandard !== tokenStandard) {
                                continue;
                            }
                            fetch(metadata.data.uri)
                                .then((response) => {
                                debugLog('# findByOwner response: ', metadata);
                                response
                                    .json()
                                    .then((json) => {
                                    data.push(converter(tokenStandard, metadata, json, tokenAmount));
                                    callback(Result.ok(data)); // need this call ?
                                })
                                    .catch((e) => {
                                    callback(Result.err(e));
                                })
                                    .finally(() => {
                                    const descAlgo = sortByUinixTimestamp(Sortable.Desc);
                                    const ascAlgo = sortByUinixTimestamp(Sortable.Asc);
                                    if (sortable === Sortable.Desc) {
                                        data = data.sort(descAlgo);
                                    }
                                    else if (sortable === Sortable.Asc) {
                                        data = data.sort(ascAlgo);
                                    }
                                    callback(Result.ok(data));
                                });
                            })
                                .catch((e) => {
                                callback(Result.err(e));
                            });
                        }
                        catch (e) {
                            if (e instanceof Error &&
                                e.message === 'Unable to find Metadata account') {
                                debugLog('# skip error for old SPL-TOKEN: ', mint);
                                continue;
                            }
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
            if (e instanceof Error) {
                callback(Result.err(e));
            }
        }
    });
    /**
     * Fetch minted metadata by owner Pubkey
     *
     * @param {Pubkey} owner
     * @param {FindByOwnerCallback} callback
     * @param {{sortable?: Sortable, isHolder?: boolean}} options?
     * @return Promise<Result<never, Error>>
     */
    SplToken.findByOwner = (owner, callback, options) => __awaiter(this, void 0, void 0, function* () {
        const sortable = !(options === null || options === void 0 ? void 0 : options.sortable) ? Sortable.Desc : options === null || options === void 0 ? void 0 : options.sortable;
        const isHolder = !(options === null || options === void 0 ? void 0 : options.isHolder) ? true : false;
        yield SplToken.genericFindByOwner(owner, callback, UserSideInput.TokenStandard.Fungible, sortable, isHolder);
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=find.js.map