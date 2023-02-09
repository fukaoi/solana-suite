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
    PhantomSplToken.mint = (input, owner, cluster, totalAmount, mintDecimal, phantom) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            shared_1.Node.changeConnection({ cluster });
            const connection = shared_1.Node.getConnection();
            const transaction = new web3_js_1.Transaction();
            const mint = web3_js_1.Keypair.generate();
            (0, shared_1.debugLog)('# input: ', input);
            const uploaded = yield storage_1.Storage.uploadMetaContent(input);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            (0, shared_1.debugLog)('# upload content url: ', uri);
            (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# reducedMetadata: ', reducedMetadata);
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
            const insturctions = yield core_1.SplToken.createMintInstruction(connection, mint.publicKey, owner, totalAmount, mintDecimal, tokenMetadata, owner, isMutable);
            insturctions.forEach((inst) => transaction.add(inst));
            transaction.feePayer = owner;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            transaction.recentBlockhash = blockhashObj.value.blockhash;
            transaction.partialSign(mint);
            const signed = yield phantom.signTransaction(transaction);
            (0, shared_1.debugLog)('# signed, signed.signatures: ', signed, signed.signatures.map((sig) => sig.publicKey.toString()));
            const sig = yield connection.sendRawTransaction(signed.serialize());
            yield shared_1.Node.confirmedSig(sig);
            return mint.publicKey.toString();
        }));
    });
})(PhantomSplToken = exports.PhantomSplToken || (exports.PhantomSplToken = {}));
//# sourceMappingURL=mint.js.map