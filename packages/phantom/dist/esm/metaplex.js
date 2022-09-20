var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Keypair, Transaction } from '@solana/web3.js';
import { Validator, Bundlr, Metaplex, } from '@solana-suite/nft';
import { debugLog, Node, Result } from '@solana-suite/shared';
export var MetaplexPhantom;
(function (MetaplexPhantom) {
    const createNftBuilder = (params, phantom) => __awaiter(this, void 0, void 0, function* () {
        const metaplex = Bundlr.make(phantom);
        const payer = metaplex.identity();
        const useNewMint = Keypair.generate();
        const updateAuthority = metaplex.identity();
        const mintAuthority = metaplex.identity();
        const tokenOwner = metaplex.identity().publicKey;
        const instructions = yield Metaplex.createNftBuilderInstruction(payer, params, useNewMint, updateAuthority, mintAuthority, tokenOwner);
        const transaction = new Transaction();
        instructions.forEach((inst) => {
            transaction.feePayer = payer.publicKey;
            transaction.add(inst);
        });
        const blockhashObj = yield Node.getConnection().getLatestBlockhashAndContext();
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
        const valid = Validator.checkAll(input);
        if (valid.isErr) {
            return Result.err(valid.error);
        }
        const uploaded = yield Metaplex.uploadMetaContent(input, phantom);
        if (uploaded.isErr) {
            return Result.err(uploaded.error);
        }
        const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded.value;
        debugLog('# upload content url: ', uri);
        debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
        debugLog('# reducedMetadata: ', reducedMetadata);
        const mintInput = Object.assign({ uri,
            sellerFeeBasisPoints }, reducedMetadata);
        const connection = Node.getConnection();
        const builder = yield createNftBuilder(mintInput, phantom);
        debugLog('# mint: ', builder.mint.toString());
        builder.tx.feePayer = phantom.publicKey;
        const blockhashObj = yield connection.getLatestBlockhashAndContext();
        builder.tx.recentBlockhash = blockhashObj.value.blockhash;
        debugLog('# tx: ', builder.tx.signatures);
        const signed = yield phantom.signTransaction(builder.tx);
        const sig = yield connection
            .sendRawTransaction(signed.serialize())
            .then(Result.ok)
            .catch(Result.err);
        if (sig.isErr) {
            return Result.err(sig.error);
        }
        yield Node.confirmedSig(sig.unwrap());
        return Result.ok(builder.mint.toString());
    });
})(MetaplexPhantom || (MetaplexPhantom = {}));
