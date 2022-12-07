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
const shared_1 = require("@solana-suite/shared");
var PhantomMetaplex;
(function (PhantomMetaplex) {
    const createNftBuilder = (params, phantom) => __awaiter(this, void 0, void 0, function* () {
        const metaplex = nft_1.Bundlr.make(phantom);
        const payer = metaplex.identity();
        const useNewMint = web3_js_1.Keypair.generate();
        const updateAuthority = metaplex.identity();
        const mintAuthority = metaplex.identity();
        const tokenOwner = metaplex.identity().publicKey;
        const instructions = yield nft_1.Metaplex.createNftBuilderInstruction(payer, params, useNewMint, updateAuthority, mintAuthority, tokenOwner);
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
     * @param {InputMetaplexMetadata}  input
     * @param {Phantom} phantom        phantom wallet object
     * @return Promise<Result<Instruction, Error>>
     */
    PhantomMetaplex.mint = (input, cluster, phantom) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const valid = nft_1.Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            shared_1.Node.changeConnection({ cluster });
            const uploaded = yield nft_1.Metaplex.uploadMetaContent(input, phantom);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            (0, shared_1.debugLog)('# upload content url: ', uri);
            (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# reducedMetadata: ', reducedMetadata);
            const mintInput = Object.assign({ uri,
                sellerFeeBasisPoints }, reducedMetadata);
            const connection = shared_1.Node.getConnection();
            const builder = yield createNftBuilder(mintInput, phantom);
            (0, shared_1.debugLog)('# mint: ', builder.useNewMint.publicKey.toString());
            builder.tx.feePayer = phantom.publicKey;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            builder.tx.recentBlockhash = blockhashObj.value.blockhash;
            builder.tx.partialSign(builder.useNewMint);
            const signed = yield phantom.signTransaction(builder.tx);
            (0, shared_1.debugLog)('# signed, signed.signatures: ', signed, signed.signatures.map((sig) => sig.publicKey.toString()));
            const sig = yield connection.sendRawTransaction(signed.serialize());
            yield shared_1.Node.confirmedSig(sig);
            return builder.useNewMint.publicKey.toString();
        }));
    });
})(PhantomMetaplex = exports.PhantomMetaplex || (exports.PhantomMetaplex = {}));
