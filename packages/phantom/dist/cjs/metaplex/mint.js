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
exports.PhantomMetaplex = void 0;
const web3_js_1 = require("@solana/web3.js");
const nft_1 = require("@solana-suite/nft");
const storage_1 = require("@solana-suite/storage");
const shared_1 = require("@solana-suite/shared");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
var PhantomMetaplex;
(function (PhantomMetaplex) {
    const createNftBuilder = (params, phantom) => __awaiter(this, void 0, void 0, function* () {
        const metaplex = shared_metaplex_1.Bundlr.make(phantom);
        const payer = metaplex.identity();
        const useNewMint = shared_1.KeyPair.create();
        const updateAuthority = metaplex.identity();
        const mintAuthority = metaplex.identity();
        const tokenOwner = metaplex.identity();
        const instructions = yield nft_1.Metaplex.createNftBuilderInstruction(payer, params, useNewMint.secret, updateAuthority, mintAuthority, tokenOwner.publicKey.toString());
        const transaction = new web3_js_1.Transaction();
        transaction.feePayer = payer.publicKey;
        instructions.forEach((inst) => {
            transaction.add(inst);
        });
        return { tx: transaction, useNewMint: useNewMint };
    });
    /**
     * Upload content and NFT mint
     *
     * @param {InputNftMetadata}  input
     * @param {Phantom} phantom        phantom wallet object
     * @return Promise<Result<Instruction, Error>>
     */
    PhantomMetaplex.mint = (input, cluster, phantom) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const valid = shared_metaplex_1.Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            (0, shared_1.debugLog)('# input: ', input);
            shared_1.Node.changeConnection({ cluster });
            const uploaded = yield storage_1.Storage.uploadMetaContent(input);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            (0, shared_1.debugLog)('# upload content url: ', uri);
            (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# reducedMetadata: ', reducedMetadata);
            const mintInput = Object.assign({ uri,
                sellerFeeBasisPoints }, reducedMetadata);
            const connection = shared_1.Node.getConnection();
            const builder = yield createNftBuilder(mintInput, phantom);
            (0, shared_1.debugLog)('# mint: ', builder.useNewMint.pubkey);
            builder.tx.feePayer = phantom.publicKey;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            builder.tx.recentBlockhash = blockhashObj.value.blockhash;
            builder.tx.partialSign(builder.useNewMint.toKeypair());
            const signed = yield phantom.signTransaction(builder.tx);
            (0, shared_1.debugLog)('# signed, signed.signatures: ', signed, signed.signatures.map((sig) => sig.publicKey.toString()));
            const sig = yield connection.sendRawTransaction(signed.serialize());
            yield shared_1.Node.confirmedSig(sig);
            return builder.useNewMint.pubkey;
        }));
    });
})(PhantomMetaplex = exports.PhantomMetaplex || (exports.PhantomMetaplex = {}));
//# sourceMappingURL=mint.js.map