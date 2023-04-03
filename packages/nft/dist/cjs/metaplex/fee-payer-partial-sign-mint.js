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
exports.Metaplex = void 0;
const shared_1 = require("@solana-suite/shared");
const web3_js_1 = require("@solana/web3.js");
const storage_1 = require("@solana-suite/storage");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const mint_1 = require("./mint");
var Metaplex;
(function (Metaplex) {
    Metaplex.feePayerPartialSignMint = (owner, signer, input, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const valid = shared_metaplex_1.Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const sellerFeeBasisPoints = shared_metaplex_1.Royalty.convert(input.royalty);
            let uri = '';
            if (input.filePath && input.storageType === 'nftStorage') {
                const properties = yield shared_metaplex_1.Properties.toConvertInfra(input.properties, storage_1.Storage.uploadContent, input.storageType);
                input = Object.assign(Object.assign({}, input), { properties });
                const nftStorageMetadata = storage_1.Storage.toConvertNftStorageMetadata(input, sellerFeeBasisPoints);
                const uploaded = yield storage_1.Storage.uploadMetaContent(nftStorageMetadata, input.filePath, input.storageType);
                if (uploaded.isErr) {
                    throw uploaded;
                }
                uri = uploaded.value;
                (0, shared_1.debugLog)('# upload content url: ', uploaded);
            }
            else if (input.uri) {
                uri = input.uri;
            }
            else {
                throw Error(`Must set 'storageType=nftStorage + filePath' or 'uri'`);
            }
            const datav2 = shared_metaplex_1.MetaplexMetadata.toConvertInfra(input, uri, sellerFeeBasisPoints);
            const isMutable = input.isMutable === undefined ? true : input.isMutable;
            (0, shared_1.debugLog)('# input: ', input);
            (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# datav2: ', datav2);
            const mint = shared_1.KeypairAccount.create();
            const insts = yield mint_1.Metaplex.createMintInstructions(mint.toPublicKey(), owner.toPublicKey(), datav2, feePayer.toPublicKey(), isMutable);
            const blockhashObj = yield shared_1.Node.getConnection().getLatestBlockhash();
            const tx = new web3_js_1.Transaction({
                lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
                blockhash: blockhashObj.blockhash,
                feePayer: feePayer.toPublicKey(),
            });
            insts.forEach((inst) => tx.add(inst));
            tx.recentBlockhash = blockhashObj.blockhash;
            [signer, mint].forEach((signer) => tx.partialSign(signer.toKeypair()));
            const serializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = serializedTx.toString('hex');
            return new shared_1.PartialSignMintInstruction(hex, mint.pubkey);
        }));
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
//# sourceMappingURL=fee-payer-partial-sign-mint.js.map