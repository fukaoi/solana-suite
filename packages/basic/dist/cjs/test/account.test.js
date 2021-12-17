"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const src_1 = require("../src");
const chai_1 = require("chai");
const web3_js_1 = require("@solana/web3.js");
const setup_1 = require("./utils/setup");
let source;
(0, mocha_1.describe)('Account', () => {
    before(async () => {
        const obj = await setup_1.Setup.generatekeyPair();
        source = obj.source;
    });
    (0, mocha_1.it)('Reuest airdrop with 3 SOL', async () => {
        const res = await src_1.Account.requestAirdrop(source.toPubkey(), 3);
        chai_1.assert.isTrue(res.isOk, res.unwrap());
        const balance = await src_1.Account.getBalance(source.toPubkey());
        chai_1.assert.isTrue(balance.isOk, balance.unwrap().toString());
    });
    (0, mocha_1.it)('Get balance at publicKey', async () => {
        const res = await src_1.Account.getBalance(source.toPubkey());
        chai_1.assert.isTrue(res.isOk);
        console.log('# balance sol: ', res.unwrap());
    });
    (0, mocha_1.it)('Get token balance at publicKey', async () => {
        const pubkey = 'D1r8Uea5uVQ9u3uNr8Nrg49t6BmkgnwLYYVmwZ3WhbPT';
        const tokenkey = '5k1WAQeAYUPiQnNWF557zBTqhMHfsi5utnE7TVSjd5Ut';
        const res = await src_1.Account.getTokenBalance(pubkey.toPubkey(), tokenkey.toPubkey());
        chai_1.assert.isTrue(res.isOk);
        console.log('# balance token: ', res.unwrap());
    });
    (0, mocha_1.it)('Get lamports balance at publicKey', async () => {
        const res = await src_1.Account.getBalance(source.toPubkey(), 'lamports');
        chai_1.assert.isTrue(res.isOk);
        console.log('# balance lamports: ', res.unwrap());
    });
    (0, mocha_1.it)('find token address', async () => {
        const res = await src_1.Account.findAssocaiatedTokenAddress('D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubkey(), '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS'.toPubkey());
        chai_1.assert.isTrue(res.isOk);
        chai_1.assert.isNotNull(res.unwrap());
    });
    (0, mocha_1.it)('string to PublicKey', async () => {
        const pubkey = '6KJBDz6qPZZyJ9gAWXSgHufqAzU8pnhQmVdTitfusYS5';
        const res = pubkey.toPubkey();
        chai_1.assert.deepEqual(res, new web3_js_1.PublicKey(pubkey));
    });
    (0, mocha_1.it)('Account to PublicKey', async () => {
        const account = src_1.Account.create();
        const res = account.toPubkey();
        chai_1.assert.deepEqual(res, new web3_js_1.PublicKey(account.pubkey));
    });
    (0, mocha_1.it)('Account to Keypair', async () => {
        const account = src_1.Account.create();
        const res = account.toKeypair();
        chai_1.assert.deepEqual(res, account.secret.toKeypair());
    });
});
