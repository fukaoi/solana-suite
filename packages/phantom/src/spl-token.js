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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SplToken = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var shared_1 = require("@solana-suite/shared");
var core_1 = require("@solana-suite/core");
var SplToken;
(function (SplToken) {
    var _this = this;
    var initMint = function (connection, owner, mintDecimal) { return __awaiter(_this, void 0, void 0, function () {
        var keypair, lamports, transaction, blockhashObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keypair = web3_js_1.Keypair.generate();
                    return [4 /*yield*/, (0, spl_token_1.getMinimumBalanceForRentExemptMint)(connection)];
                case 1:
                    lamports = _a.sent();
                    transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount({
                        fromPubkey: owner,
                        newAccountPubkey: keypair.publicKey,
                        space: spl_token_1.MINT_SIZE,
                        lamports: lamports,
                        programId: spl_token_1.TOKEN_PROGRAM_ID
                    }), (0, spl_token_1.createInitializeMintInstruction)(keypair.publicKey, mintDecimal, owner, owner, spl_token_1.TOKEN_PROGRAM_ID));
                    transaction.feePayer = owner;
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 2:
                    blockhashObj = _a.sent();
                    // since solana v0.1.8
                    // const blockhashObj = await connection.getLatestBlockhash();
                    transaction.recentBlockhash = blockhashObj.blockhash;
                    transaction.partialSign(keypair);
                    return [2 /*return*/, shared_1.Result.ok({ tokenKey: keypair.publicKey, tx: transaction })];
            }
        });
    }); };
    SplToken.mint = function (owner, cluster, totalAmount, mintDecimal, signTransaction) { return __awaiter(_this, void 0, void 0, function () {
        var connection, tx, txData1, tokenKey, txData2, tokenAccount, transaction, blockhashObj, signed, _i, signed_1, sign, sig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shared_1.Node.changeConnection({ cluster: cluster });
                    connection = shared_1.Node.getConnection();
                    tx = new web3_js_1.Transaction();
                    return [4 /*yield*/, initMint(connection, owner, mintDecimal)];
                case 1:
                    txData1 = _a.sent();
                    if (txData1.isErr) {
                        return [2 /*return*/, shared_1.Result.err(txData1.error)];
                    }
                    tokenKey = txData1.unwrap().tokenKey;
                    return [4 /*yield*/, core_1.AssociatedAccount.makeOrCreateInstruction(txData1.unwrap().tokenKey, owner)];
                case 2:
                    txData2 = _a.sent();
                    if (txData2.isErr) {
                        return [2 /*return*/, shared_1.Result.err(txData2.error)];
                    }
                    tokenAccount = txData2.unwrap().tokenAccount.toPublicKey();
                    tx.add(txData2.unwrap().inst);
                    transaction = tx.add((0, spl_token_1.createMintToCheckedInstruction)(tokenKey, tokenAccount, owner, totalAmount, mintDecimal, [], spl_token_1.TOKEN_PROGRAM_ID));
                    transaction.feePayer = owner;
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 3:
                    blockhashObj = _a.sent();
                    // since solana v0.1.8
                    // const blockhashObj = await connection.getLatestBlockhash();
                    transaction.recentBlockhash = blockhashObj.blockhash;
                    return [4 /*yield*/, signTransaction([txData1.unwrap().tx, transaction])];
                case 4:
                    signed = _a.sent();
                    _i = 0, signed_1 = signed;
                    _a.label = 5;
                case 5:
                    if (!(_i < signed_1.length)) return [3 /*break*/, 9];
                    sign = signed_1[_i];
                    return [4 /*yield*/, connection
                            .sendRawTransaction(sign.serialize())
                            .then(shared_1.Result.ok)["catch"](shared_1.Result.err)];
                case 6:
                    sig = _a.sent();
                    if (sig.isErr) {
                        return [2 /*return*/, shared_1.Result.err(sig.error)];
                    }
                    return [4 /*yield*/, shared_1.Node.confirmedSig(sig.unwrap())];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 5];
                case 9: return [2 /*return*/, shared_1.Result.ok(tokenKey.toBase58())];
            }
        });
    }); };
    SplToken.addMinting = function (tokenKey, owner, cluster, totalAmount, mintDecimal, signTransaction) { return __awaiter(_this, void 0, void 0, function () {
        var connection, tx, txData1, tokenAccount, transaction, blockhashObj, signed, _i, signed_2, sign, sig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shared_1.Node.changeConnection({ cluster: cluster });
                    connection = shared_1.Node.getConnection();
                    tx = new web3_js_1.Transaction();
                    return [4 /*yield*/, core_1.AssociatedAccount.makeOrCreateInstruction(tokenKey, owner)];
                case 1:
                    txData1 = _a.sent();
                    if (txData1.isErr)
                        return [2 /*return*/, shared_1.Result.err(txData1.error)];
                    tokenAccount = txData1.unwrap().tokenAccount.toPublicKey();
                    console.log('tokenAccount: ', tokenAccount);
                    console.log('tx: ', txData1.unwrap().inst);
                    tx.add(txData1.unwrap().inst);
                    transaction = tx.add((0, spl_token_1.createMintToCheckedInstruction)(tokenKey, tokenAccount, owner, totalAmount, mintDecimal, [], spl_token_1.TOKEN_PROGRAM_ID));
                    transaction.feePayer = owner;
                    return [4 /*yield*/, connection.getRecentBlockhash()];
                case 2:
                    blockhashObj = _a.sent();
                    // since solana v0.1.8
                    // const blockhashObj = await connection.getLatestBlockhash();
                    transaction.recentBlockhash = blockhashObj.blockhash;
                    return [4 /*yield*/, signTransaction([transaction])];
                case 3:
                    signed = _a.sent();
                    _i = 0, signed_2 = signed;
                    _a.label = 4;
                case 4:
                    if (!(_i < signed_2.length)) return [3 /*break*/, 8];
                    sign = signed_2[_i];
                    return [4 /*yield*/, connection
                            .sendRawTransaction(sign.serialize())
                            .then(shared_1.Result.ok)["catch"](shared_1.Result.err)];
                case 5:
                    sig = _a.sent();
                    if (sig.isErr) {
                        return [2 /*return*/, shared_1.Result.err(sig.error)];
                    }
                    return [4 /*yield*/, shared_1.Node.confirmedSig(sig.unwrap())];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 4];
                case 8: return [2 /*return*/, shared_1.Result.ok(tokenKey.toBase58())];
            }
        });
    }); };
})(SplToken = exports.SplToken || (exports.SplToken = {}));
