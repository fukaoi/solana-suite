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
import { Node, Try, debugLog } from '@solana-suite/shared';
import { Storage } from '@solana-suite/storage';
import { SplToken } from '@solana-suite/core';
export var PhantomSplToken;
(function (PhantomSplToken) {
    PhantomSplToken.mint = (owner, cluster, totalAmount, mintDecimal, phantom) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            Node.changeConnection({ cluster });
            const connection = Node.getConnection();
            const transaction = new Transaction();
            const mint = Keypair.generate();
            const input = {
                name: 'solana-suite-token',
                symbol: 'SST',
                royalty: 50,
                filePath: '../../../storage/test/assets/DOG.JPEG',
                storageType: 'nftStorage',
                isMutable: false,
            };
            debugLog('# input: ', input);
            const uploaded = yield Storage.uploadMetaContent(input);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            const tokenMetadata = {
                name: reducedMetadata.name,
                symbol: reducedMetadata.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: reducedMetadata.creators,
                collection: reducedMetadata.collection,
                uses: reducedMetadata.uses,
            };
            const isMutable = !reducedMetadata.isMutable ? false : true;
            const insturctions = yield SplToken.createMintInstruction(connection, mint.publicKey, owner, totalAmount, mintDecimal, tokenMetadata, owner, isMutable);
            insturctions.forEach((inst) => transaction.add(inst));
            transaction.feePayer = owner;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            transaction.recentBlockhash = blockhashObj.value.blockhash;
            transaction.partialSign(mint);
            const signed = yield phantom.signAllTransactions([transaction]);
            // todo: refactoring
            console.log('signed', signed);
            (() => __awaiter(this, void 0, void 0, function* () {
                for (const sign of signed) {
                    const sig = yield connection.sendRawTransaction(sign.serialize());
                    console.log(sig);
                    yield Node.confirmedSig(sig);
                }
            }))();
            return mint.publicKey.toString();
        }));
    });
})(PhantomSplToken || (PhantomSplToken = {}));
//# sourceMappingURL=mint.js.map