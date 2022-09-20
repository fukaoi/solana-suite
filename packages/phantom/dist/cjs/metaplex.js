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
exports.MetaplexPhantom = void 0;
const web3_js_1 = require("@solana/web3.js");
const nft_1 = require("@solana-suite/nft");
const shared_1 = require("@solana-suite/shared");
var MetaplexPhantom;
(function (MetaplexPhantom) {
    const createNftBuilder = (params, phantom) => __awaiter(this, void 0, void 0, function* () {
        const metaplex = nft_1.Bundlr.make(phantom);
        const payer = metaplex.identity();
        const useNewMint = web3_js_1.Keypair.generate();
        const updateAuthority = metaplex.identity();
        const mintAuthority = metaplex.identity();
        const tokenOwner = metaplex.identity().publicKey;
        const instructions = yield nft_1.Metaplex.createNftBuilderInstruction(payer, params, useNewMint, updateAuthority, mintAuthority, tokenOwner);
        const transaction = new web3_js_1.Transaction();
        instructions.forEach((inst) => {
            transaction.feePayer = payer.publicKey;
            transaction.add(inst);
        });
        const blockhashObj = yield shared_1.Node.getConnection().getLatestBlockhashAndContext();
        transaction.recentBlockhash = blockhashObj.value.blockhash;
        transaction.partialSign(useNewMint);
        return { tx: transaction, mint: useNewMint.publicKey };
    });
    /**
     * Upload content and NFT mint
     *
     * @param {InputMetaplexMetadata}  input
     * @param {Phantom} phantom        phantom wallet object
     * @return Promise<Result<Instruction, Error>>
     */
    MetaplexPhantom.mint = (input, phantom) => __awaiter(this, void 0, void 0, function* () {
        const valid = nft_1.Validator.checkAll(input);
        if (valid.isErr) {
            return shared_1.Result.err(valid.error);
        }
        const uploaded = yield nft_1.Metaplex.uploadMetaContent(input, phantom);
        if (uploaded.isErr) {
            return shared_1.Result.err(uploaded.error);
        }
        const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded.value;
        (0, shared_1.debugLog)('# upload content url: ', uri);
        (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
        (0, shared_1.debugLog)('# reducedMetadata: ', reducedMetadata);
        const mintInput = Object.assign({ uri,
            sellerFeeBasisPoints }, reducedMetadata);
        const connection = shared_1.Node.getConnection();
        const builder = yield createNftBuilder(mintInput, phantom);
        (0, shared_1.debugLog)('# mint: ', builder.mint.toString());
        builder.tx.feePayer = phantom.publicKey;
        const blockhashObj = yield connection.getLatestBlockhashAndContext();
        builder.tx.recentBlockhash = blockhashObj.value.blockhash;
        (0, shared_1.debugLog)('# tx: ', builder.tx.signatures);
        const signed = yield phantom.signTransaction(builder.tx);
        const sig = yield connection
            .sendRawTransaction(signed.serialize())
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (sig.isErr) {
            return shared_1.Result.err(sig.error);
        }
        yield shared_1.Node.confirmedSig(sig.unwrap());
        return shared_1.Result.ok(builder.mint.toString());
    });
})(MetaplexPhantom = exports.MetaplexPhantom || (exports.MetaplexPhantom = {}));
