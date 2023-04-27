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
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
var PhantomSplToken;
(function (PhantomSplToken) {
    PhantomSplToken.mint = (input, owner, cluster, totalAmount, mintDecimal, phantom) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            shared_1.Node.changeConnection({ cluster });
            const connection = shared_1.Node.getConnection();
            const transaction = new web3_js_1.Transaction();
            const mint = web3_js_1.Keypair.generate();
            input.royalty = 0;
            const sellerFeeBasisPoints = 0;
            const tokenStorageMetadata = storage_1.Storage.toConvertOffchaindata(input, input.royalty);
            let uri;
            if (input.filePath && input.storageType) {
                const uploaded = yield storage_1.Storage.uploadMetaAndContent(tokenStorageMetadata, input.filePath, input.storageType);
                if (uploaded.isErr) {
                    throw uploaded;
                }
                uri = uploaded.value;
            }
            else if (input.uri) {
                uri = input.uri;
            }
            else {
                throw Error(`Must set 'storageType + filePath' or 'uri'`);
            }
            const isMutable = true;
            const datav2 = shared_metaplex_1.TokenMetadata.toConvertInfra(input, uri, sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# datav2: ', datav2);
            (0, shared_1.debugLog)('# upload content url: ', uri);
            const insturctions = yield core_1.SplToken.createMintInstructions(mint.publicKey, owner.toPublicKey(), totalAmount, mintDecimal, datav2, owner.toPublicKey(), isMutable);
            insturctions.forEach((inst) => transaction.add(inst));
            transaction.feePayer = owner.toPublicKey();
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