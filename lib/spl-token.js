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
const transaction_1 = require("./transaction");
const node_1 = require("./node");
var SplToken;
(function (SplToken) {
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
    SplToken.getTransferHistory = (pubkey) => __awaiter(this, void 0, void 0, function* () {
        const transactions = yield transaction_1.Transaction.getAll(pubkey);
        const hist = [];
        for (const tx of transactions) {
            for (const inst of tx.transaction.message.instructions) {
                const value = inst;
                if (isTransfer(value)) {
                    const v = value.parsed;
                    v.date = convertTimestmapToDate(tx.blockTime);
                    hist.push(v);
                }
            }
        }
        return hist;
    });
    SplToken.getTransferDestinationList = (pubkey) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const transactions = yield transaction_1.Transaction.getAll(pubkey);
        const hist = [];
        for (const tx of transactions) {
            const posts = (_a = tx.meta) === null || _a === void 0 ? void 0 : _a.postTokenBalances;
            if (posts.length > 1) {
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
        return hist;
    });
    SplToken.create = (source, totalAmount, decimal, authority = source.publicKey) => __awaiter(this, void 0, void 0, function* () {
        const connection = node_1.Node.getConnection();
        const token = yield spl_token_1.Token.createMint(connection, source, authority, null, decimal, spl_token_1.TOKEN_PROGRAM_ID);
        const tokenAccount = yield token.createAssociatedTokenAccount(source.publicKey);
        yield token.mintTo(tokenAccount, authority, [], totalAmount);
        return token.publicKey.toBase58();
    });
    SplToken.transfer = (tokenKey, source, dest, amount, instruction) => __awaiter(this, void 0, void 0, function* () {
        const token = new spl_token_1.Token(node_1.Node.getConnection(), tokenKey, spl_token_1.TOKEN_PROGRAM_ID, source);
        const sourceTokenAccount = (yield token.getOrCreateAssociatedAccountInfo(source.publicKey)).address;
        const destTokenAccount = (yield token.getOrCreateAssociatedAccountInfo(dest)).address;
        const param = spl_token_1.Token.createTransferInstruction(spl_token_1.TOKEN_PROGRAM_ID, sourceTokenAccount, destTokenAccount, source.publicKey, [], amount);
        const instructions = instruction ? new Array(param, instruction) : [param];
        const fn = transaction_1.Transaction.send(source.publicKey, [source], dest, amount);
        return yield fn(instructions);
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
