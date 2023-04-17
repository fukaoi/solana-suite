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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const shared_1 = require("@solana-suite/shared");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const spl_token_1 = require("@solana/spl-token");
const storage_1 = require("@solana-suite/storage");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
var Metaplex;
(function (Metaplex) {
    /**
     * Fetch minted metadata by owner Pubkey
     *
     * @param {Pubkey} owner
     * @return Promise<Result<OutputNftMetadata[], Error>>
     */
    Metaplex.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const allData = yield storage_1.Bundlr.make()
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
                    creators: shared_metaplex_1.Creators.toConvertUser(d.creators),
                    editionNonce: d.editionNonce,
                    collection: shared_metaplex_1.Collections.toConvertUser(d.collection),
                    uses: d.uses,
                };
            });
            return res;
        }));
    });
    Metaplex.findByOwner2 = (owner) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const connection = shared_1.Node.getConnection();
            const info = yield connection.getParsedTokenAccountsByOwner(owner.toPublicKey(), {
                programId: spl_token_1.TOKEN_PROGRAM_ID,
            });
            for (let index = 0; index < info.value.length; index++) {
                const mint = info.value[index].account.data.parsed.info.mint;
                try {
                    const metaAccount = shared_metaplex_1.Pda.getMetadata(mint);
                    const metadata = yield mpl_token_metadata_1.Metadata.fromAccountAddress(connection, metaAccount);
                    const uri = metadata.data.uri;
                    const response = yield (0, cross_fetch_1.default)(uri);
                    const json = yield response.json();
                    console.log(mint);
                    // console.log('#metadata: ', metadata);
                    // console.log('#json: ', json);
                }
                catch (e) {
                    console.error('#maybe no nft: ', e);
                    console.error('#info: ', info.value[index]);
                }
            }
        }));
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
//# sourceMappingURL=find.js.map