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
import { Node, Instruction, debugLog, Try } from '@solana-suite/shared';
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
            const wrapped = yield createWrappedNativeAccount(connection, payer, owner, parseInt(`${amount.toLamports()}`, RADIX));
            debugLog('# wrapped sol: ', wrapped.toBase58());
            const token = yield createMint(connection, payer, owner, owner, 0);
            const sourceToken = yield AssociatedAccount.retryGetOrCreate(token, owner, payer);
            debugLog('# sourceToken: ', sourceToken);
            const destToken = yield AssociatedAccount.retryGetOrCreate(token, wrapped, payer);
            debugLog('# destToken: ', destToken);
            const inst1 = createTransferInstruction(sourceToken.toPublicKey(), destToken.toPublicKey(), owner, parseInt(`${amount}`, RADIX), // No lamports, its sol
            signers);
            const inst2 = createCloseAccountInstruction(wrapped, dest, owner, signers);
            return new Instruction([inst1, inst2], signers, feePayer);
        }));
    });
})(SolNative || (SolNative = {}));
//# sourceMappingURL=transfer-with-multisig.js.map