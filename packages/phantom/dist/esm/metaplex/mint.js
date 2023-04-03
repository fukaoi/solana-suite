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
import { Storage } from '@solana-suite/storage';
import { debugLog, Node, Try, KeypairAccount, } from '@solana-suite/shared';
import { Royalty, Validator, Properties, MetaplexMetadata, } from '@solana-suite/shared-metaplex';
export var PhantomMetaplex;
(function (PhantomMetaplex) {
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
            Node.changeConnection({ cluster });
            //Convert porperties, Upload content
            const properties = yield Properties.toConvertInfra(input.properties, Storage.uploadContent, input.storageType);
            input = Object.assign(Object.assign({}, input), { properties });
            const sellerFeeBasisPoints = Royalty.convert(input.royalty);
            const nftStorageMetadata = Storage.toConvertNftStorageMetadata(input, sellerFeeBasisPoints);
            const uploaded = yield Storage.uploadMetaContent(nftStorageMetadata, input.filePath, input.storageType);
            if (uploaded.isErr) {
                throw uploaded;
            }
            const uri = uploaded.value;
            const datav2 = MetaplexMetadata.toConvertInfra(input, uri, sellerFeeBasisPoints);
            const connection = Node.getConnection();
            const mint = KeypairAccount.create();
            const isMutable = true;
            debugLog('# properties: ', properties);
            debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            debugLog('# mint: ', mint.pubkey);
            const tx = new Transaction();
            const insts = yield Metaplex.createMintInstructions(mint.toPublicKey(), phantom.publicKey, datav2, phantom.publicKey, isMutable);
            insts.forEach((inst) => {
                tx.add(inst);
            });
            tx.feePayer = phantom.publicKey;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            tx.recentBlockhash = blockhashObj.value.blockhash;
            tx.partialSign(mint.toKeypair());
            const signed = yield phantom.signTransaction(tx);
            debugLog('# signed, signed.signatures: ', signed, signed.signatures.map((sig) => sig.publicKey.toString()));
            const sig = yield connection.sendRawTransaction(signed.serialize());
            yield Node.confirmedSig(sig);
            return mint.pubkey;
        }));
    });
})(PhantomMetaplex || (PhantomMetaplex = {}));
//# sourceMappingURL=mint.js.map