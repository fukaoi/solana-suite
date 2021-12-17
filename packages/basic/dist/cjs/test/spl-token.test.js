"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const setup_1 = require("../test/utils/setup");
const src_1 = require("../src/");
let source;
let dest;
let tokenKeyStr;
const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6'.toPubkey();
const MINT_DECIMAL = 2;
(0, mocha_1.describe)('SplToken', () => {
    before(async () => {
        const obj = await setup_1.Setup.generatekeyPair();
        source = obj.source;
        dest = obj.dest;
    });
    (0, mocha_1.it)('Get token transfer history by tokenKey', async () => {
        const limit = 3;
        const res = await src_1.SplToken.getTransferHistory(tokenKey, 3);
        chai_1.assert.isTrue(res.isOk);
        res.unwrap().forEach((v) => {
            chai_1.assert.isNotEmpty(v.type);
            chai_1.assert.isNotEmpty(v.info.source);
            chai_1.assert.isNotEmpty(v.info.destination);
            chai_1.assert.isNotEmpty(v.info.authority);
            chai_1.assert.isNotNull(v.date);
        });
        chai_1.assert.equal(res.unwrap().length, limit);
    });
    mocha_1.it.only('Get token transfer history by owner address', async () => {
        const limit = 3;
        const owner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu'.toPubkey();
        const res = await src_1.SplToken.getTransferHistory(owner, limit);
        chai_1.assert.isTrue(res.isOk);
        res.unwrap().forEach((v) => {
            chai_1.assert.isNotEmpty(v.type);
            chai_1.assert.isNotEmpty(v.info.source);
            chai_1.assert.isNotEmpty(v.info.destination);
            chai_1.assert.isNotEmpty(v.info.authority);
            chai_1.assert.isNotNull(v.date);
        });
        chai_1.assert.equal(res.unwrap().length, limit);
    });
    (0, mocha_1.it)('Get token transfer destination history', async () => {
        const res = await src_1.SplToken.getTransferDestinationList(tokenKey);
        chai_1.assert.isTrue(res.isOk);
        res.unwrap().forEach((v) => {
            chai_1.assert.isNotEmpty(v.dest);
            chai_1.assert.isNotNull(v.date);
        });
    });
    (0, mocha_1.it)('Create token', async () => {
        const TOKEN_TOTAL_AMOUNT = 10000000;
        const inst = await src_1.SplToken.mint(source.pubkey.toPubkey(), [source.secret.toKeypair()], TOKEN_TOTAL_AMOUNT, MINT_DECIMAL);
        chai_1.assert.isTrue(inst.isOk, `${inst.unwrap()}`);
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isOk, res.unwrap());
        tokenKeyStr = inst.unwrap().data;
        console.log('# tokenKey: ', tokenKeyStr);
    });
    (0, mocha_1.it)('[Err]lack signer for multisig', async () => {
        const signer1 = src_1.Account.create();
        const signer2 = src_1.Account.create();
        const multisig = await src_1.Multisig.create(2, source.toKeypair(), [
            signer1.toPubkey(),
            signer2.toPubkey()
        ]);
        const TOKEN_TOTAL_AMOUNT = 10000000;
        const mint = await src_1.SplToken.mint(multisig.unwrap().data.toPubkey(), [
            source.toKeypair(),
            signer1.toKeypair(),
        ], TOKEN_TOTAL_AMOUNT, MINT_DECIMAL);
        const res = await [
            multisig,
            mint
        ].submit();
        chai_1.assert.isFalse(res.isOk);
    });
    (0, mocha_1.it)('Create token, batch transfer', async () => {
        const TOKEN_TOTAL_AMOUNT = 10000000;
        const inst1 = await src_1.SplToken.mint(source.pubkey.toPubkey(), [
            source.secret.toKeypair(),
        ], TOKEN_TOTAL_AMOUNT, MINT_DECIMAL);
        chai_1.assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
        const token = inst1.unwrap().data;
        console.log('# tokenKey: ', token);
        const inst2 = await src_1.SplToken.transfer(token.toPubkey(), source.pubkey.toPubkey(), dest.pubkey.toPubkey(), [
            source.secret.toKeypair(),
        ], 1, MINT_DECIMAL, source.secret.toKeypair());
        chai_1.assert.isTrue(inst1.isOk);
        const inst3 = await src_1.SplToken.transfer(token.toPubkey(), source.pubkey.toPubkey(), dest.pubkey.toPubkey(), [
            source.secret.toKeypair(),
        ], 1, MINT_DECIMAL, source.secret.toKeypair());
        chai_1.assert.isTrue(inst2.isOk);
        const sig = await [
            inst1,
            inst2,
            inst3
        ].submit();
        chai_1.assert.isTrue(sig.isOk, sig.unwrap());
        console.log('signature: ', sig.unwrap());
    });
    (0, mocha_1.it)('Create token, transfer with multisig and fee payer', async () => {
        // create multisig
        const signer1 = src_1.Account.create();
        const signer2 = src_1.Account.create();
        const multiInst = await src_1.Multisig.create(2, source.secret.toKeypair(), [
            signer1.pubkey.toPubkey(),
            signer2.pubkey.toPubkey()
        ]);
        chai_1.assert.isTrue(multiInst.isOk, `${multiInst.unwrap()}`);
        const multisig = multiInst.unwrap().data.toPubkey();
        console.log('# multisig address :', multisig.toBase58());
        // create nft
        const TOKEN_TOTAL_AMOUNT = 10000000;
        const mintInst = await src_1.SplToken.mint(multisig, [
            source.secret.toKeypair(),
            signer1.secret.toKeypair(),
            signer2.secret.toKeypair(),
        ], TOKEN_TOTAL_AMOUNT, MINT_DECIMAL, source.secret.toKeypair());
        chai_1.assert.isTrue(mintInst.isOk, `${mintInst.unwrap()}`);
        const token = mintInst.unwrap().data.toPubkey();
        console.log('# tokenKey: ', token.toBase58());
        // transfer from multisig to dest
        const inst = await src_1.SplToken.transfer(token, multisig, dest.pubkey.toPubkey(), [
            signer1.secret.toKeypair(),
            signer2.secret.toKeypair(),
        ], 1, MINT_DECIMAL, source.secret.toKeypair());
        chai_1.assert.isTrue(inst.isOk, `${inst.unwrap()}`);
        const sig = await [
            multiInst,
            mintInst,
            inst
        ].submit();
        console.log('signature: ', `${sig.unwrap()}`);
    });
    (0, mocha_1.it)('Subscribe a account(pubkey)', async () => {
        const subscribeId = src_1.SplToken.subscribeAccount(dest.pubkey.toPubkey(), (v) => {
            console.log('# Subscribe result: ', v);
            chai_1.assert.isNotEmpty(v.type);
            chai_1.assert.isNotNull(v.date);
            chai_1.assert.isNotNull(v.info.mint);
            chai_1.assert.isNotEmpty(v.info.source);
            chai_1.assert.isNotEmpty(v.info.destination);
        });
        for (let i = 0; i < 3; i++)
            await sendContinuously();
        await sleep(15);
        src_1.SplToken.unsubscribeAccount(subscribeId);
        chai_1.assert.ok('success subscribe');
    });
});
const sendContinuously = async () => {
    const inst = await src_1.SplToken.transfer(tokenKeyStr.toPubkey(), source.pubkey.toPubkey(), dest.pubkey.toPubkey(), [source.secret.toKeypair()], 1, MINT_DECIMAL);
    inst.isOk && inst.value.submit();
};
const sleep = async (sec) => new Promise(r => setTimeout(r, sec * 1000));
