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
exports.SplToken = void 0;
const spl_token_1 = require("@solana/spl-token");
const _1 = require("./");
var SplToken;
(function (SplToken) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMALS = 0;
    let TransactionStatus;
    (function (TransactionStatus) {
        TransactionStatus["Transfer"] = "transfer";
        TransactionStatus["TransferChecked"] = "transferChecked";
    })(TransactionStatus || (TransactionStatus = {}));
    const isTransfer = (value) => {
        if (value.program === 'spl-token') {
            switch (value.parsed.type) {
                case TransactionStatus.Transfer:
                case TransactionStatus.TransferChecked:
                    return true;
                default:
                    return false;
            }
        }
        else {
            return false;
        }
    };
    const convertTimestmapToDate = (blockTime) => new Date(blockTime * 1000);
    SplToken.subscribeAccount = (pubkey, callback) => {
        return _1.Node.getConnection().onAccountChange(pubkey, () => __awaiter(this, void 0, void 0, function* () {
            const res = yield SplToken.getTransferHistory(pubkey, 1);
            if (res.isErr) {
                return res;
            }
            callback(res.value[0]);
        }));
    };
    SplToken.unsubscribeAccount = (subscribeId) => _1.Node.getConnection().removeAccountChangeListener(subscribeId);
    SplToken.getTransferHistory = (pubkey, limit) => __awaiter(this, void 0, void 0, function* () {
        const transactions = yield _1.Transaction.getAll(pubkey, limit);
        if (transactions.isErr) {
            return transactions;
        }
        const hist = [];
        for (const tx of transactions.unwrap()) {
            for (const inst of tx.transaction.message.instructions) {
                const value = inst;
                if (isTransfer(value)) {
                    const v = value.parsed;
                    v.date = convertTimestmapToDate(tx.blockTime);
                    hist.push(v);
                }
            }
        }
        return _1.Result.ok(hist);
    });
    SplToken.getTransferDestinationList = (pubkey) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const transactions = yield _1.Transaction.getAll(pubkey);
        if (transactions.isErr) {
            return _1.Result.err(transactions.error);
        }
        const hist = [];
        for (const tx of transactions.unwrap()) {
            const posts = (_a = tx.meta) === null || _a === void 0 ? void 0 : _a.postTokenBalances;
            if (posts.length > 0) {
                posts.forEach((p) => {
                    const amount = p.uiTokenAmount.uiAmount;
                    if (amount > 0) {
                        const index = p.accountIndex;
                        const dest = tx.transaction.message.accountKeys[index].pubkey;
                        const date = convertTimestmapToDate(tx.blockTime);
                        const v = { dest, date };
                        hist.push(v);
                    }
                });
            }
        }
        return _1.Result.ok(hist);
    });
    SplToken.mint = (owner, signers, totalAmount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const tokenRes = yield spl_token_1.Token.createMint(_1.Node.getConnection(), feePayer, owner, owner, mintDecimal, spl_token_1.TOKEN_PROGRAM_ID)
            .then(_1.Result.ok)
            .catch(_1.Result.err);
        if (tokenRes.isErr) {
            return _1.Result.err(tokenRes.error);
        }
        const token = tokenRes.value;
        const tokenAssociated = yield token.getOrCreateAssociatedAccountInfo(owner)
            .then(_1.Result.ok)
            .catch(_1.Result.err);
        if (tokenAssociated.isErr) {
            return _1.Result.err(tokenAssociated.error);
        }
        const inst = spl_token_1.Token.createMintToInstruction(spl_token_1.TOKEN_PROGRAM_ID, token.publicKey, tokenAssociated.value.address, owner, signers, totalAmount);
        return _1.Result.ok(new _1.Instruction([inst], signers, feePayer, token.publicKey.toBase58()));
    });
    SplToken.transfer = (tokenKey, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const token = new spl_token_1.Token(_1.Node.getConnection(), tokenKey, spl_token_1.TOKEN_PROGRAM_ID, feePayer);
        const sourceToken = yield token.getOrCreateAssociatedAccountInfo(owner)
            .then(_1.Result.ok)
            .catch(_1.Result.err);
        if (sourceToken.isErr) {
            return _1.Result.err(sourceToken.error);
        }
        const destToken = yield token.getOrCreateAssociatedAccountInfo(dest)
            .then(_1.Result.ok)
            .catch(_1.Result.err);
        if (destToken.isErr) {
            return _1.Result.err(destToken.error);
        }
        const inst = spl_token_1.Token.createTransferCheckedInstruction(spl_token_1.TOKEN_PROGRAM_ID, sourceToken.value.address, tokenKey, destToken.value.address, owner, signers, amount, mintDecimal);
        return _1.Result.ok(new _1.Instruction([inst], signers, feePayer));
    });
    SplToken.transferNft = (tokenKey, owner, dest, signers, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return SplToken.transfer(tokenKey, owner, dest, signers, NFT_AMOUNT, NFT_DECIMALS, feePayer);
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=spl-token.js.map