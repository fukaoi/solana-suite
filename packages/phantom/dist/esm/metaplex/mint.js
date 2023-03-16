var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Transaction } from '@solana/web3.js';
import { Metaplex } from '@solana-suite/nft';
import { Storage, Bundlr } from '@solana-suite/storage';
import { debugLog, Node, Try, KeypairAccount, } from '@solana-suite/shared';
import { Validator, Creators, Collections, Properties, } from '@solana-suite/shared-metaplex';
export var PhantomMetaplex;
(function (PhantomMetaplex) {
    const createNftBuilder = (params, phantom) => __awaiter(this, void 0, void 0, function* () {
        const metaplex = Bundlr.make(phantom);
        const payer = metaplex.identity();
        const updateAuthority = metaplex.identity();
        const mintAuthority = metaplex.identity();
        const tokenOwner = metaplex.identity();
        const useNewMint = KeypairAccount.create();
        const instructions = yield Metaplex.createNftBuilderInstruction(payer, params, useNewMint.secret.toKeypair(), updateAuthority, mintAuthority, tokenOwner.publicKey.toString());
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
     * @param {InputNftMetadata}  input
     * @param {Phantom} phantom        phantom wallet object
     * @return Promise<Result<Instruction, Error>>
     */
    PhantomMetaplex.mint = (input, cluster, phantom) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const valid = Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            debugLog('# input: ', input);
            Node.changeConnection({ cluster });
            //Convert creators
            const creators = Creators.toInputConvert(input.creators);
            debugLog('# creators: ', creators);
            //Convert collection
            const collection = Collections.toInputConvert(input.collection);
            debugLog('# collection: ', collection);
            //Convert porperties, Upload content
            const properties = yield Properties.toInputConvert(input.properties, Storage.uploadContent, input.storageType);
            debugLog('# properties: ', properties);
            const overwrited = Object.assign(Object.assign({}, input), { creators,
                collection,
                properties });
            const uploaded = yield Storage.uploadMetaContent(overwrited);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            debugLog('# upload content url: ', uri);
            debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            debugLog('# reducedMetadata: ', reducedMetadata);
            const mintInput = Object.assign({ uri,
                sellerFeeBasisPoints }, reducedMetadata);
            const connection = Node.getConnection();
            const builder = yield createNftBuilder(mintInput, phantom);
            debugLog('# mint: ', builder.useNewMint.pubkey);
            builder.tx.feePayer = phantom.publicKey;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            builder.tx.recentBlockhash = blockhashObj.value.blockhash;
            builder.tx.partialSign(builder.useNewMint.toKeypair());
            const signed = yield phantom.signTransaction(builder.tx);
            debugLog('# signed, signed.signatures: ', signed, signed.signatures.map((sig) => sig.publicKey.toString()));
            const sig = yield connection.sendRawTransaction(signed.serialize());
            yield Node.confirmedSig(sig);
            return builder.useNewMint.pubkey;
        }));
    });
})(PhantomMetaplex || (PhantomMetaplex = {}));
//# sourceMappingURL=mint.js.map