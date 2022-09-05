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
import { LAMPORTS_PER_SOL, SystemProgram, Transaction, } from '@solana/web3.js';
import { Result, Node, Instruction, PartialSignInstruction, debugLog, } from '@solana-suite/shared';
import { Internals } from '../internals/_index';
export var SolNative;
(function (SolNative) {
    const RADIX = 10;
    // NOTICE: There is a lamports fluctuation when transfer under 0.001 sol
    // for multiSig only function
    SolNative.transferWithMultisig = (owner, dest, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const connection = Node.getConnection();
        const payer = feePayer ? feePayer : signers[0];
        const wrapped = yield createWrappedNativeAccount(connection, payer, owner, parseInt(`${amount * LAMPORTS_PER_SOL}`, RADIX))
            .then(Result.ok)
            .catch(Result.err);
        if (wrapped.isErr) {
            return wrapped.error;
        }
        debugLog('# wrapped sol: ', wrapped.value.toBase58());
        const tokenRes = yield createMint(connection, payer, owner, owner, 0)
            .then(Result.ok)
            .catch(Result.err);
        if (tokenRes.isErr) {
            return Result.err(tokenRes.error);
        }
        const token = tokenRes.value;
        const sourceToken = yield Internals.retryGetOrCreateAssociatedAccountInfo(token, owner, payer);
        if (sourceToken.isErr) {
            return Result.err(sourceToken.error);
        }
        debugLog('# sourceToken: ', sourceToken.value);
        const destToken = yield Internals.retryGetOrCreateAssociatedAccountInfo(token, wrapped.value, payer);
        if (destToken.isErr) {
            return Result.err(destToken.error);
        }
        debugLog('# destToken: ', destToken.value);
        const inst1 = createTransferInstruction(sourceToken.value.toPublicKey(), destToken.value.toPublicKey(), owner, parseInt(`${amount}`, RADIX), // No lamports, its sol
        signers);
        const inst2 = createCloseAccountInstruction(wrapped.value, dest, owner, signers);
        return Result.ok(new Instruction([inst1, inst2], signers, feePayer));
    });
    SolNative.transfer = (source, destination, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const inst = SystemProgram.transfer({
            fromPubkey: source,
            toPubkey: destination,
            lamports: parseInt(`${amount * LAMPORTS_PER_SOL}`, RADIX),
        });
        return Result.ok(new Instruction([inst], signers, feePayer));
    });
    SolNative.feePayerPartialSignTransfer = (owner, dest, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const blockHashObj = yield Node.getConnection().getLatestBlockhash();
        const tx = new Transaction({
            blockhash: blockHashObj.blockhash,
            lastValidBlockHeight: blockHashObj.lastValidBlockHeight,
            feePayer,
        }).add(SystemProgram.transfer({
            fromPubkey: owner,
            toPubkey: dest,
            lamports: parseInt(`${amount * LAMPORTS_PER_SOL}`, RADIX),
        }));
        signers.forEach((signer) => {
            tx.partialSign(signer);
        });
        try {
            const serializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = serializedTx.toString('hex');
            return Result.ok(new PartialSignInstruction(hex));
        }
        catch (ex) {
            return Result.err(ex);
        }
    });
})(SolNative || (SolNative = {}));
