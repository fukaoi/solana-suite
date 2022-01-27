var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, } from '@solana/web3.js';
import bs from 'bs58';
import { Transaction } from './';
import { Node, Result } from '@solana-suite/shared';
export class KeypairStr {
    constructor(pubkey, secret) {
        this.pubkey = pubkey;
        this.secret = secret;
    }
    toPublicKey() {
        return new PublicKey(this.pubkey);
    }
    toKeypair() {
        const decoded = bs.decode(this.secret);
        return Keypair.fromSecretKey(decoded);
    }
}
export var Account;
(function (Account) {
    Account.DEFAULT_AIRDROP_AMOUNT = LAMPORTS_PER_SOL * 1;
    Account.MAX_AIRDROP_SOL = LAMPORTS_PER_SOL * 5;
    Account.getInfo = (pubkey) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const accountInfo = yield Node.getConnection().getParsedAccountInfo(pubkey)
            .then(Result.ok)
            .catch(Result.err);
        if (accountInfo.isErr) {
            return Result.err(accountInfo.error);
        }
        const data = ((_b = (_a = accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.data);
        if (!data) {
            // invalid pubkey 
            return Result.err(Error('Not found publicKey. invalid data'));
        }
        else if (data.parsed) {
            // token account publicKey
            return Result.ok(data.parsed.info);
        }
        else {
            // native address publicKey
            return Result.ok(accountInfo.value.value);
        }
    });
    Account.getBalance = (pubkey, unit = 'sol') => __awaiter(this, void 0, void 0, function* () {
        const balance = yield Node.getConnection().getBalance(pubkey)
            .then(Result.ok)
            .catch(Result.err);
        if (balance.isErr) {
            return balance;
        }
        switch (unit) {
            case 'sol': return Result.ok((balance.value) / LAMPORTS_PER_SOL);
            case 'lamports': return balance;
            default: return Result.err(Error('no match unit'));
        }
    });
    Account.getTokenBalance = (pubkey, tokenKey) => __awaiter(this, void 0, void 0, function* () {
        const res = yield Account.findAssocaiatedTokenAddress(tokenKey, pubkey);
        if (res.isErr) {
            return Result.err(res.error);
        }
        return yield Node.getConnection().getTokenAccountBalance(res.unwrap())
            .then((rpc) => Result.ok(rpc.value))
            .catch(Result.err);
    });
    Account.requestAirdrop = (pubkey, airdropAmount) => __awaiter(this, void 0, void 0, function* () {
        console.debug('Now airdropping...please wait');
        airdropAmount = !airdropAmount ? Account.DEFAULT_AIRDROP_AMOUNT : airdropAmount * LAMPORTS_PER_SOL;
        if (airdropAmount > Account.MAX_AIRDROP_SOL) {
            return Result.err(Error(`Over max airdrop amount: ${airdropAmount}`));
        }
        const sig = yield Node.getConnection().requestAirdrop(pubkey, airdropAmount)
            .then(Result.ok)
            .catch(Result.err);
        if (sig.isErr) {
            return Result.err(Error('Failed airdrop'));
        }
        yield Transaction.confirmedSig(sig.value);
        return Result.ok('success');
    });
    Account.create = () => {
        const keypair = Keypair.generate();
        return new KeypairStr(keypair.publicKey.toBase58(), bs.encode(keypair.secretKey));
    };
    Account.findAssocaiatedTokenAddress = (tokenKey, owner) => __awaiter(this, void 0, void 0, function* () {
        return yield PublicKey.findProgramAddress([
            owner.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            tokenKey.toBuffer(),
        ], ASSOCIATED_TOKEN_PROGRAM_ID)
            .then(v => Result.ok(v[0]))
            .catch(Result.err);
    });
})(Account || (Account = {}));
