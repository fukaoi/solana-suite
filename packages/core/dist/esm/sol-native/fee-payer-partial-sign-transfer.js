var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SystemProgram, Transaction, } from '@solana/web3.js';
import { Node, PartialSignInstruction, Try, } from '@solana-suite/shared';
export var SolNative;
(function (SolNative) {
    const RADIX = 10;
    SolNative.feePayerPartialSignTransfer = (owner, dest, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const blockHashObj = yield Node.getConnection().getLatestBlockhash();
            const tx = new Transaction({
                blockhash: blockHashObj.blockhash,
                lastValidBlockHeight: blockHashObj.lastValidBlockHeight,
                feePayer,
            }).add(SystemProgram.transfer({
                fromPubkey: owner,
                toPubkey: dest,
                lamports: parseInt(`${amount.toLamports()}`, RADIX),
            }));
            signers.forEach((signer) => {
                tx.partialSign(signer);
            });
            const serializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = serializedTx.toString('hex');
            return new PartialSignInstruction(hex);
        }));
    });
})(SolNative || (SolNative = {}));
//# sourceMappingURL=fee-payer-partial-sign-transfer.js.map