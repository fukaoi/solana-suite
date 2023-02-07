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
exports.PhantomSplToken = void 0;
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
const storage_1 = require("@solana-suite/storage");
const core_1 = require("@solana-suite/core");
var PhantomSplToken;
(function (PhantomSplToken) {
    PhantomSplToken.mint = (owner, cluster, totalAmount, mintDecimal, phantom) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            shared_1.Node.changeConnection({ cluster });
            const connection = shared_1.Node.getConnection();
            const transaction = new web3_js_1.Transaction();
            const mint = web3_js_1.Keypair.generate();
            const input = {
                name: 'solana-suite-token',
                symbol: 'SST',
                royalty: 50,
                filePath: '../../../storage/test/assets/DOG.JPEG',
                storageType: 'nftStorage',
                isMutable: false,
            };
            const uploaded = yield storage_1.Storage.uploadMetaContent(input);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            const tokenMetadata = {
                name: reducedMetadata.name,
                symbol: reducedMetadata.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: reducedMetadata.creators,
                collection: reducedMetadata.collection,
                uses: reducedMetadata.uses,
            };
            const isMutable = !reducedMetadata.isMutable ? false : true;
            core_1.SplToken.createMintInstruction(connection, mint.publicKey, owner, totalAmount, mintDecimal, tokenMetadata, owner, isMutable);
            transaction.feePayer = owner;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            transaction.recentBlockhash = blockhashObj.value.blockhash;
            const signed = yield phantom.signAllTransactions([transaction]);
            // todo: refactoring
            (() => __awaiter(this, void 0, void 0, function* () {
                for (const sign of signed) {
                    const sig = yield connection.sendRawTransaction(sign.serialize());
                    console.log(sig);
                    yield shared_1.Node.confirmedSig(sig);
                }
            }))();
            return mint.publicKey.toString();
        }));
    });
})(PhantomSplToken = exports.PhantomSplToken || (exports.PhantomSplToken = {}));
//# sourceMappingURL=mint.js.map