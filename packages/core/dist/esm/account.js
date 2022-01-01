import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, } from '@solana/web3.js';
import bs from 'bs58';
import { Transaction } from './';
import { Node, Result } from '@solana-suite/shared';
export class KeypairStr {
    pubkey;
    secret;
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
    Account.getBalance = async (pubkey, unit = 'sol') => {
        const balance = await Node.getConnection().getBalance(pubkey)
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
    };
    Account.getTokenBalance = async (pubkey, tokenKey) => {
        const res = await Account.findAssocaiatedTokenAddress(tokenKey, pubkey);
        if (res.isErr) {
            return Result.err(res.error);
        }
        return await Node.getConnection().getTokenAccountBalance(res.unwrap())
            .then((rpc) => Result.ok(rpc.value))
            .catch(Result.err);
    };
    Account.requestAirdrop = async (pubkey, airdropAmount) => {
        console.debug('Now airdropping...please wait');
        airdropAmount = !airdropAmount ? Account.DEFAULT_AIRDROP_AMOUNT : airdropAmount * LAMPORTS_PER_SOL;
        if (airdropAmount > Account.MAX_AIRDROP_SOL) {
            return Result.err(Error(`Over max airdrop amount: ${airdropAmount}`));
        }
        const sig = await Node.getConnection().requestAirdrop(pubkey, airdropAmount)
            .then(Result.ok)
            .catch(Result.err);
        if (sig.isErr) {
            return Result.err(Error('Failed airdrop'));
        }
        await Transaction.confirmedSig(sig.value);
        return Result.ok('success');
    };
    Account.create = () => {
        const keypair = Keypair.generate();
        return new KeypairStr(keypair.publicKey.toBase58(), bs.encode(keypair.secretKey));
    };
    Account.findAssocaiatedTokenAddress = async (tokenKey, owner) => {
        return await PublicKey.findProgramAddress([
            owner.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            tokenKey.toBuffer(),
        ], ASSOCIATED_TOKEN_PROGRAM_ID)
            .then(v => Result.ok(v[0]))
            .catch(Result.err);
    };
})(Account || (Account = {}));
