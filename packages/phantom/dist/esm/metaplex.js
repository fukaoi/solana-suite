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
import { debugLog, Node, Try } from '@solana-suite/shared';
export var PhantomMetaplex;
(function (PhantomMetaplex) {
    const createNftBuilder = (params, phantom) => __awaiter(this, void 0, void 0, function* () {
        const metaplex = Bundlr.make(phantom);
        const payer = metaplex.identity();
        const useNewMint = Keypair.generate();
        const updateAuthority = metaplex.identity();
        const mintAuthority = metaplex.identity();
        const tokenOwner = metaplex.identity().publicKey;
        const instructions = yield Metaplex.createNftBuilderInstruction(payer, params, useNewMint, updateAuthority, mintAuthority, tokenOwner);
        const transaction = new Transaction();
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
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const valid = Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            Node.changeConnection({ cluster });
            const uploaded = yield Metaplex.uploadMetaContent(input, phantom);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            debugLog('# upload content url: ', uri);
            debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            debugLog('# reducedMetadata: ', reducedMetadata);
            const mintInput = Object.assign({ uri,
                sellerFeeBasisPoints }, reducedMetadata);
            const connection = Node.getConnection();
            const builder = yield createNftBuilder(mintInput, phantom);
            debugLog('# mint: ', builder.useNewMint.publicKey.toString());
            builder.tx.feePayer = phantom.publicKey;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            builder.tx.recentBlockhash = blockhashObj.value.blockhash;
            builder.tx.partialSign(builder.useNewMint);
            const signed = yield phantom.signTransaction(builder.tx);
            debugLog('# signed, signed.signatures: ', signed, signed.signatures.map((sig) => sig.publicKey.toString()));
            const sig = yield connection.sendRawTransaction(signed.serialize());
            yield Node.confirmedSig(sig);
            return builder.useNewMint.publicKey.toString();
        }));
    });
})(PhantomMetaplex || (PhantomMetaplex = {}));
