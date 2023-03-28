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
            shared_1.Node.changeConnection({ cluster });
            //Convert porperties, Upload content
            const properties = yield shared_metaplex_1.Properties.toConvertInfra(input.properties, storage_1.Storage.uploadContent, input.storageType);
            input = Object.assign(Object.assign({}, input), { properties });
            const sellerFeeBasisPoints = shared_metaplex_1.Royalty.convert(input.royalty);
            const nftStorageMetadata = storage_1.Storage.toConvertNftStorageMetadata(input, sellerFeeBasisPoints);
            const uploaded = yield storage_1.Storage.uploadMetaContent(nftStorageMetadata, input.filePath, input.storageType);
            if (uploaded.isErr) {
                throw uploaded;
            }
            const uri = uploaded.value;
            const datav2 = shared_metaplex_1.MetaplexMetadata.toConvertInfra(input, uri, sellerFeeBasisPoints);
            const connection = shared_1.Node.getConnection();
            const mint = shared_1.KeypairAccount.create();
            const isMutable = true;
            (0, shared_1.debugLog)('# properties: ', properties);
            (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# mint: ', mint.pubkey);
            const tx = new web3_js_1.Transaction();
            const insts = yield nft_1.Metaplex.createMintInstructions(mint.toPublicKey(), phantom.publicKey, datav2, phantom.publicKey, isMutable);
            insts.forEach((inst) => {
                tx.add(inst);
            });
            tx.feePayer = phantom.publicKey;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            tx.recentBlockhash = blockhashObj.value.blockhash;
            tx.partialSign(mint.toKeypair());
            const signed = yield phantom.signTransaction(tx);
            (0, shared_1.debugLog)('# signed, signed.signatures: ', signed, signed.signatures.map((sig) => sig.publicKey.toString()));
            const sig = yield connection.sendRawTransaction(signed.serialize());
            yield shared_1.Node.confirmedSig(sig);
            return mint.pubkey;
        }));
    });
})(PhantomMetaplex = exports.PhantomMetaplex || (exports.PhantomMetaplex = {}));
//# sourceMappingURL=mint.js.map