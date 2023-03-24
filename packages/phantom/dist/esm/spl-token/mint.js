var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Transaction, Keypair } from '@solana/web3.js';
import { Node, Try, debugLog, overwriteObject, } from '@solana-suite/shared';
import { Storage } from '@solana-suite/storage';
import { SplToken } from '@solana-suite/core';
import { Creators, } from '@solana-suite/shared-metaplex';
export var PhantomSplToken;
(function (PhantomSplToken) {
    PhantomSplToken.mint = (input, owner, cluster, totalAmount, mintDecimal, phantom) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            Node.changeConnection({ cluster });
            const connection = Node.getConnection();
            const transaction = new Transaction();
            const mint = Keypair.generate();
            debugLog('# input: ', input);
            const creatorsValue = Creators.toInputConvert(input.creators);
            const overwrited = overwriteObject(input, [
                {
                    existsKey: 'creators',
                    will: {
                        key: 'creators',
                        value: creatorsValue,
                    },
                },
            ]);
            const uploaded = yield Storage.uploadMetaContent(overwrited);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            debugLog('# upload content url: ', uri);
            debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            debugLog('# reducedMetadata: ', reducedMetadata);
            const tokenMetadata = {
                name: reducedMetadata.name,
                symbol: reducedMetadata.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: reducedMetadata.creators,
                collection: undefined,
                uses: reducedMetadata.uses,
            };
            const isMutable = !reducedMetadata.isMutable ? false : true;
            const insturctions = yield SplToken.createMintInstructions(mint.publicKey, owner.toPublicKey(), totalAmount, mintDecimal, tokenMetadata, owner.toPublicKey(), isMutable);
            insturctions.forEach((inst) => transaction.add(inst));
            transaction.feePayer = owner.toPublicKey();
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            transaction.recentBlockhash = blockhashObj.value.blockhash;
            transaction.partialSign(mint);
            const signed = yield phantom.signTransaction(transaction);
            debugLog('# signed, signed.signatures: ', signed, signed.signatures.map((sig) => sig.publicKey.toString()));
            const sig = yield connection.sendRawTransaction(signed.serialize());
            yield Node.confirmedSig(sig);
            return mint.publicKey.toString();
        }));
    });
})(PhantomSplToken || (PhantomSplToken = {}));
//# sourceMappingURL=mint.js.map