var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { debugLog, Try, Node, KeypairAccount, PartialSignMintInstruction, } from '@solana-suite/shared';
import { Transaction } from '@solana/web3.js';
import { Storage } from '@solana-suite/storage';
import { Validator, Properties, Royalty, MetaplexMetadata, } from '@solana-suite/shared-metaplex';
import { Metaplex as _Mint } from './mint';
export var Metaplex;
(function (Metaplex) {
    Metaplex.feePayerPartialSignMint = (owner, signer, input, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const valid = Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const sellerFeeBasisPoints = Royalty.convert(input.royalty);
            let uri = '';
            if (input.filePath && input.storageType === 'nftStorage') {
                const properties = yield Properties.toConvertInfra(input.properties, Storage.uploadContent, input.storageType);
                input = Object.assign(Object.assign({}, input), { properties });
                const nftStorageMetadata = Storage.toConvertNftStorageMetadata(input, sellerFeeBasisPoints);
                const uploaded = yield Storage.uploadMetaContent(nftStorageMetadata, input.filePath, input.storageType);
                if (uploaded.isErr) {
                    throw uploaded;
                }
                uri = uploaded.value;
                debugLog('# upload content url: ', uploaded);
            }
            else if (input.uri) {
                uri = input.uri;
            }
            else {
                throw Error(`Must set 'storageType=nftStorage + filePath' or 'uri'`);
            }
            const datav2 = MetaplexMetadata.toConvertInfra(input, uri, sellerFeeBasisPoints);
            const isMutable = input.isMutable === undefined ? true : input.isMutable;
            debugLog('# input: ', input);
            debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            debugLog('# datav2: ', datav2);
            const mint = KeypairAccount.create();
            const insts = yield _Mint.createMintInstructions(mint.toPublicKey(), owner.toPublicKey(), datav2, feePayer.toPublicKey(), isMutable);
            const blockhashObj = yield Node.getConnection().getLatestBlockhash();
            const tx = new Transaction({
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
            return new PartialSignMintInstruction(hex, mint.pubkey);
        }));
    });
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=fee-payer-partial-sign-mint.js.map