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
            const connection = Node.getConnection();
            const info = yield connection.getParsedTokenAccountsByOwner(owner.toPublicKey(), {
                programId: TOKEN_PROGRAM_ID,
            });
            for (let index = 0; index < info.value.length; index++) {
                const mint = info.value[index].account.data.parsed.info.mint;
                try {
                    const metaAccount = Pda.getMetadata(mint);
                    const metadata = yield Metadata.fromAccountAddress(connection, metaAccount);
                    const uri = metadata.data.uri;
                    const response = yield fetch(uri);
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
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=find.js.map