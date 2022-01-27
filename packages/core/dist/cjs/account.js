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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.KeypairStr = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const _1 = require("./");
const shared_1 = require("@solana-suite/shared");
class KeypairStr {
    constructor(pubkey, secret) {
        this.pubkey = pubkey;
        this.secret = secret;
    }
    toPublicKey() {
        return new web3_js_1.PublicKey(this.pubkey);
    }
    toKeypair() {
        const decoded = bs58_1.default.decode(this.secret);
        return web3_js_1.Keypair.fromSecretKey(decoded);
    }
}
exports.KeypairStr = KeypairStr;
var Account;
(function (Account) {
    Account.DEFAULT_AIRDROP_AMOUNT = web3_js_1.LAMPORTS_PER_SOL * 1;
    Account.MAX_AIRDROP_SOL = web3_js_1.LAMPORTS_PER_SOL * 5;
    Account.getInfo = (pubkey) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const accountInfo = yield shared_1.Node.getConnection().getParsedAccountInfo(pubkey)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (accountInfo.isErr) {
            return shared_1.Result.err(accountInfo.error);
        }
        const data = ((_b = (_a = accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.data);
        if (!data) {
            // invalid pubkey 
            return shared_1.Result.err(Error('Not found publicKey. invalid data'));
        }
        else if (data.parsed) {
            // token account publicKey
            return shared_1.Result.ok(data.parsed.info);
        }
        else {
            // native address publicKey
            return shared_1.Result.ok(accountInfo.value.value);
        }
    });
    Account.getBalance = (pubkey, unit = 'sol') => __awaiter(this, void 0, void 0, function* () {
        const balance = yield shared_1.Node.getConnection().getBalance(pubkey)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (balance.isErr) {
            return balance;
        }
        switch (unit) {
            case 'sol': return shared_1.Result.ok((balance.value) / web3_js_1.LAMPORTS_PER_SOL);
            case 'lamports': return balance;
            default: return shared_1.Result.err(Error('no match unit'));
        }
    });
    Account.getTokenBalance = (pubkey, tokenKey) => __awaiter(this, void 0, void 0, function* () {
        const res = yield Account.findAssocaiatedTokenAddress(tokenKey, pubkey);
        if (res.isErr) {
            return shared_1.Result.err(res.error);
        }
        return yield shared_1.Node.getConnection().getTokenAccountBalance(res.unwrap())
            .then((rpc) => shared_1.Result.ok(rpc.value))
            .catch(shared_1.Result.err);
    });
    Account.requestAirdrop = (pubkey, airdropAmount) => __awaiter(this, void 0, void 0, function* () {
        console.debug('Now airdropping...please wait');
        airdropAmount = !airdropAmount ? Account.DEFAULT_AIRDROP_AMOUNT : airdropAmount * web3_js_1.LAMPORTS_PER_SOL;
        if (airdropAmount > Account.MAX_AIRDROP_SOL) {
            return shared_1.Result.err(Error(`Over max airdrop amount: ${airdropAmount}`));
        }
        const sig = yield shared_1.Node.getConnection().requestAirdrop(pubkey, airdropAmount)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (sig.isErr) {
            return shared_1.Result.err(Error('Failed airdrop'));
        }
        yield _1.Transaction.confirmedSig(sig.value);
        return shared_1.Result.ok('success');
    });
    Account.create = () => {
        const keypair = web3_js_1.Keypair.generate();
        return new KeypairStr(keypair.publicKey.toBase58(), bs58_1.default.encode(keypair.secretKey));
    };
    Account.findAssocaiatedTokenAddress = (tokenKey, owner) => __awaiter(this, void 0, void 0, function* () {
        return yield web3_js_1.PublicKey.findProgramAddress([
            owner.toBuffer(),
            spl_token_1.TOKEN_PROGRAM_ID.toBuffer(),
            tokenKey.toBuffer(),
        ], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)
            .then(v => shared_1.Result.ok(v[0]))
            .catch(shared_1.Result.err);
    });
})(Account = exports.Account || (exports.Account = {}));
