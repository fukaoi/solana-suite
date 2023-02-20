var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createWrappedNativeAccount, createMint, createTransferInstruction, createCloseAccountInstruction, } from '@solana/spl-token';
import { Node, Instruction, debugLog, Try, } from '@solana-suite/shared';
import { AssociatedAccount } from '../associated-account';
export var SolNative;
(function (SolNative) {
    const RADIX = 10;
    // NOTICE: There is a lamports fluctuation when transfer under 0.001 sol
    // for multiSig only function
    SolNative.transferWithMultisig = (owner, dest, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const connection = Node.getConnection();
            const payer = feePayer ? feePayer : signers[0];
            const keypairs = signers.map((s) => s.toKeypair());
            const wrapped = yield createWrappedNativeAccount(connection, payer.toKeypair(), owner.toPublicKey(), parseInt(`${amount.toLamports()}`, RADIX));
            debugLog('# wrapped sol: ', wrapped.toBase58());
            const token = yield createMint(connection, payer.toKeypair(), owner.toPublicKey(), owner.toPublicKey(), 0);
            const sourceToken = yield AssociatedAccount.retryGetOrCreate(token.toString(), owner, payer);
            debugLog('# sourceToken: ', sourceToken);
            const destToken = yield AssociatedAccount.retryGetOrCreate(token.toString(), wrapped.toString(), payer);
            debugLog('# destToken: ', destToken);
            const inst1 = createTransferInstruction(sourceToken.toPublicKey(), destToken.toPublicKey(), owner.toPublicKey(), parseInt(`${amount}`, RADIX), // No lamports, its sol
            keypairs);
            const inst2 = createCloseAccountInstruction(wrapped, dest.toPublicKey(), owner.toPublicKey(), keypairs);
            return new Instruction([inst1, inst2], signers.map((s) => s.toKeypair()), feePayer === null || feePayer === void 0 ? void 0 : feePayer.toKeypair());
        }));
    });
})(SolNative || (SolNative = {}));
//# sourceMappingURL=transfer-with-multisig.js.map