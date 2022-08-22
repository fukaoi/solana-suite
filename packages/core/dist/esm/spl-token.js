var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createMint, createBurnCheckedInstruction, createMintToCheckedInstruction, createTransferCheckedInstruction, } from '@solana/spl-token';
import { Transaction, } from '@solana/web3.js';
import { Node, Result, Instruction, PartialSignInstruction, sleep, debugLog, } from '@solana-suite/shared';
import { Account as Acc, Account, Transaction as LocalTransaction, } from './';
export var SplToken;
(function (SplToken) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMALS = 0;
    const RETRY_OVER_LIMIT = 10;
    const RETRY_SLEEP_TIME = 3;
    SplToken.calculateAmount = (amount, mintDecimal) => {
        return amount * (Math.pow(10, mintDecimal));
    };
    SplToken.retryGetOrCreateAssociatedAccountInfo = (mint, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let counter = 1;
        while (counter < RETRY_OVER_LIMIT) {
            try {
                const inst = yield Acc.getOrCreateAssociatedTokenAccount(mint, owner, feePayer, true);
                if (inst.isOk && typeof inst.value === 'string') {
                    debugLog('# associatedTokenAccount: ', inst.value);
                    return Result.ok(inst.value);
                }
                return (yield inst.submit()).map((ok) => {
                    LocalTransaction.confirmedSig(ok);
                    return inst.unwrap().data;
                }, (err) => {
                    debugLog('# Error submit getOrCreateAssociatedTokenAccount: ', err);
                    throw err;
                });
            }
            catch (e) {
                debugLog(`# retry: ${counter} create token account: `, e);
            }
            yield sleep(RETRY_SLEEP_TIME);
            counter++;
        }
        return Result.err(Error(`retry action is over limit ${RETRY_OVER_LIMIT}`));
    });
    SplToken.mint = (owner, signers, totalAmount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const connection = Node.getConnection();
        const tokenRes = yield createMint(connection, feePayer, owner, owner, mintDecimal)
            .then(Result.ok)
            .catch(Result.err);
        if (tokenRes.isErr) {
            return Result.err(tokenRes.error);
        }
        const token = tokenRes.value;
        const tokenAssociated = yield SplToken.retryGetOrCreateAssociatedAccountInfo(token, owner, feePayer);
        if (tokenAssociated.isErr) {
            return Result.err(tokenAssociated.error);
        }
        const inst = createMintToCheckedInstruction(token, tokenAssociated.value.toPublicKey(), owner, SplToken.calculateAmount(totalAmount, mintDecimal), mintDecimal, signers);
        return Result.ok(new Instruction([inst], signers, feePayer, token.toBase58()));
    });
    SplToken.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const tokenAccount = yield Acc.findAssociatedTokenAddress(mint, owner);
        if (tokenAccount.isErr) {
            return Result.err(tokenAccount.error);
        }
        const inst = createBurnCheckedInstruction(tokenAccount.unwrap(), mint, owner, SplToken.calculateAmount(burnAmount, tokenDecimals), tokenDecimals, signers);
        return Result.ok(new Instruction([inst], signers, feePayer));
    });
    SplToken.transfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const sourceToken = yield SplToken.retryGetOrCreateAssociatedAccountInfo(mint, owner, feePayer);
        if (sourceToken.isErr) {
            return Result.err(sourceToken.error);
        }
        const destToken = yield SplToken.retryGetOrCreateAssociatedAccountInfo(mint, dest, feePayer);
        if (destToken.isErr) {
            return Result.err(destToken.error);
        }
        const inst = createTransferCheckedInstruction(sourceToken.value.toPublicKey(), mint, destToken.value.toPublicKey(), owner, SplToken.calculateAmount(amount, mintDecimal), mintDecimal, signers);
        return Result.ok(new Instruction([inst], signers, feePayer));
    });
    SplToken.transferNft = (mint, owner, dest, signers, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return SplToken.transfer(mint, owner, dest, signers, NFT_AMOUNT, NFT_DECIMALS, feePayer);
    });
    SplToken.feePayerPartialSignTransfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const sourceToken = yield Account.getOrCreateAssociatedTokenAccountInstruction(mint, owner, feePayer);
        const destToken = yield Account.getOrCreateAssociatedTokenAccountInstruction(mint, dest, feePayer);
        if (destToken.isErr) {
            return Result.err(destToken.error);
        }
        let inst2;
        const blockhashObj = yield Node.getConnection().getLatestBlockhash();
        const tx = new Transaction({
            lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
            blockhash: blockhashObj.blockhash,
            feePayer
        });
        // return associated token account
        if (!destToken.value.inst) {
            inst2 = createTransferCheckedInstruction((sourceToken.unwrap().tokenAccount).toPublicKey(), mint, destToken.value.tokenAccount.toPublicKey(), owner, SplToken.calculateAmount(amount, mintDecimal), mintDecimal, signers);
            tx.add(inst2);
        }
        else {
            // return instruction and undecided associated token account
            inst2 = createTransferCheckedInstruction((sourceToken.unwrap().tokenAccount).toPublicKey(), mint, destToken.value.tokenAccount.toPublicKey(), owner, SplToken.calculateAmount(amount, mintDecimal), mintDecimal, signers);
            tx.add(destToken.value.inst).add(inst2);
        }
        tx.recentBlockhash = blockhashObj.blockhash;
        signers.forEach(signer => {
            tx.partialSign(signer);
        });
        try {
            const sirializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = sirializedTx.toString('hex');
            return Result.ok(new PartialSignInstruction(hex));
        }
        catch (ex) {
            return Result.err(ex);
        }
    });
    SplToken.feePayerPartialSignTransferNft = (mint, owner, dest, signers, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return SplToken.feePayerPartialSignTransfer(mint, owner, dest, signers, NFT_AMOUNT, NFT_DECIMALS, feePayer);
    });
})(SplToken || (SplToken = {}));
