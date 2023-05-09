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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplToken = void 0;
const shared_1 = require("@solana-suite/shared");
const spl_token_1 = require("../types/spl-token");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const spl_token_2 = require("@solana/spl-token");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
var SplToken;
(function (SplToken) {
    // Sort by latest with unixtimestamp function
    const sortByUinixTimestamp = (sortable) => (a, b) => {
        if (!a.offchain.created_at) {
            a.offchain.created_at = 0;
        }
        if (!b.offchain.created_at) {
            b.offchain.created_at = 0;
        }
        if (sortable === spl_token_1.Sortable.Desc) {
            return b.offchain.created_at - a.offchain.created_at;
        }
        else if (sortable === spl_token_1.Sortable.Asc) {
            return a.offchain.created_at - b.offchain.created_at;
        }
        else {
            throw Error(`No match sortable: ${sortable}`);
        }
    };
    const converter = (tokenStandard, metadata, json, tokenAmount) => {
        if (tokenStandard === shared_metaplex_1.UserSideInput.TokenStandard.Fungible) {
            return shared_metaplex_1.Convert.TokenMetadata.intoUserSide({
                onchain: metadata,
                offchain: json,
            }, tokenAmount);
        }
        else if (tokenStandard === shared_metaplex_1.UserSideInput.TokenStandard.NonFungible) {
            return shared_metaplex_1.Convert.NftMetadata.intoUserSide({
                onchain: metadata,
                offchain: json,
            });
        }
        else {
            throw Error(`No match tokenStandard: ${tokenStandard}`);
        }
    };
    SplToken.genericFindByOwner = (owner, callback, tokenStandard, sortable) => __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            let data = [];
            const connection = shared_1.Node.getConnection();
            const info = yield connection.getParsedTokenAccountsByOwner(owner.toPublicKey(), {
                programId: spl_token_2.TOKEN_PROGRAM_ID,
            });
            info.value.length === 0 && callback(shared_1.Result.ok([]));
            try {
                for (var _d = true, _e = __asyncValues(info.value), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const d = _c;
                        const mint = d.account.data.parsed.info.mint;
                        const tokenAmount = d.account.data.parsed.info.tokenAmount;
                        try {
                            const metadata = yield mpl_token_metadata_1.Metadata.fromAccountAddress(connection, shared_metaplex_1.Pda.getMetadata(mint));
                            (0, shared_1.debugLog)('# findByOwner metadata: ', metadata);
                            // tokenStandard: 0(NFT) or 2 (SPL-TOKEN)
                            if (metadata.tokenStandard !== tokenStandard) {
                                continue;
                            }
                            (0, cross_fetch_1.default)(metadata.data.uri).then((response) => {
                                (0, shared_1.debugLog)('# findByOwner response: ', metadata);
                                response
                                    .json()
                                    .then((json) => {
                                    data.push(converter(tokenStandard, metadata, json, tokenAmount));
                                    const descAlgo = sortByUinixTimestamp(spl_token_1.Sortable.Desc);
                                    const ascAlgo = sortByUinixTimestamp(spl_token_1.Sortable.Asc);
                                    if (sortable === spl_token_1.Sortable.Desc) {
                                        data = data.sort(descAlgo);
                                    }
                                    else if (sortable === spl_token_1.Sortable.Asc) {
                                        data = data.sort(ascAlgo);
                                    }
                                    callback(shared_1.Result.ok(data));
                                })
                                    .catch((e) => {
                                    callback(shared_1.Result.err(e));
                                });
                            });
                        }
                        catch (e) {
                            if (e instanceof Error &&
                                e.message === 'Unable to find Metadata account') {
                                (0, shared_1.debugLog)('# skip error for old SPL-TOKEN: ', mint);
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
                callback(shared_1.Result.err(e));
            }
        }
    });
    /**
     * Fetch minted metadata by owner Pubkey
     *
     * @param {Pubkey} owner
     * @param {FindByOwnerCallback} callback
     * @param {Sortable} sortable?
     * @return Promise<Result<never, Error>>
     */
    SplToken.findByOwner = (owner, callback, sortable) => __awaiter(this, void 0, void 0, function* () {
        yield SplToken.genericFindByOwner(owner, callback, shared_metaplex_1.UserSideInput.TokenStandard.Fungible, sortable);
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=find.js.map