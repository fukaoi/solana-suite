"use strict";
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
    pubkey;
    secret;
    constructor(pubkey, secret) {
        this.pubkey = pubkey;
        this.secret = secret;
    }
    toPubkey() {
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
    Account.getBalance = async (pubkey, unit = 'sol') => {
        const balance = await shared_1.Node.getConnection().getBalance(pubkey)
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
    };
    Account.getTokenBalance = async (pubkey, tokenKey) => {
        const res = await Account.findAssocaiatedTokenAddress(pubkey, tokenKey);
        if (res.isErr) {
            return shared_1.Result.err(res.error);
        }
        return await shared_1.Node.getConnection().getTokenAccountBalance(res.unwrap())
            .then((rpc) => shared_1.Result.ok(rpc.value))
            .catch(shared_1.Result.err);
    };
    Account.requestAirdrop = async (pubkey, airdropAmount) => {
        console.debug('Now airdropping...please wait');
        airdropAmount = !airdropAmount ? Account.DEFAULT_AIRDROP_AMOUNT : airdropAmount * web3_js_1.LAMPORTS_PER_SOL;
        if (airdropAmount > Account.MAX_AIRDROP_SOL) {
            return shared_1.Result.err(Error(`Over max airdrop amount: ${airdropAmount}`));
        }
        const sig = await shared_1.Node.getConnection().requestAirdrop(pubkey, airdropAmount)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (sig.isErr) {
            return shared_1.Result.err(Error('Failed airdrop'));
        }
        await _1.Transaction.confirmedSig(sig.value);
        return shared_1.Result.ok('success');
    };
    Account.create = () => {
        const keypair = web3_js_1.Keypair.generate();
        return new KeypairStr(keypair.publicKey.toBase58(), bs58_1.default.encode(keypair.secretKey));
    };
    Account.findAssocaiatedTokenAddress = async (owner, tokenKey) => {
        return await web3_js_1.PublicKey.findProgramAddress([
            owner.toBuffer(),
            spl_token_1.TOKEN_PROGRAM_ID.toBuffer(),
            tokenKey.toBuffer(),
        ], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)
            .then(v => shared_1.Result.ok(v[0]))
            .catch(shared_1.Result.err);
    };
})(Account = exports.Account || (exports.Account = {}));
