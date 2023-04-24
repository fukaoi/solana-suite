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
import { Collections, Creators, } from '@solana-suite/shared-metaplex';
import { Bundlr } from '@solana-suite/storage';
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
    // export const findByOwner2 = async (owner: Pubkey) => {
    //   return Try(async () => {
    //     try {
    //       const connection = Node.getConnection();
    //       const info = await connection.getParsedTokenAccountsByOwner(
    //         owner.toPublicKey(),
    //         {
    //           programId: TOKEN_PROGRAM_ID,
    //         }
    //       );
    //
    //       const metadatas = [{metadata: any, mint: String, json: any}];
    //       for await (const d of info.value) {
    //         if (d.account.data.parsed.info.tokenAmount.uiAmount == 1) {
    //           const mint = d.account.data.parsed.info.mint;
    //           const metadata = await Metadata.fromAccountAddress(
    //             connection,
    //             Pda.getMetadata(mint)
    //           );
    //           metadatas.push({metadata, mint});
    //           fetch(metadata.data.uri).then((response) => {
    //             response.json().then((json) => {
    //               console.log('# json: ', json);
    //             });
    //           });
    //         }
    //       }
    //     } catch (e) {
    //       console.error('# EEEEE: ', e);
    //     }
    //   });
    // };
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=find.js.map