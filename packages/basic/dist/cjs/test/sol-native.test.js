"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const src_1 = require("../src");
const chai_1 = require("chai");
const setup_1 = require("../test/utils/setup");
let source;
let dest;
(0, mocha_1.describe)('SolNative', () => {
    (0, mocha_1.before)(async () => {
        const obj = await setup_1.Setup.generatekeyPair();
        source = obj.source;
        dest = obj.dest;
    });
    (0, mocha_1.it)('transfer transaction', async () => {
        const solAmount = 0.0001;
        const inst = await src_1.SolNative.transfer(source.toPubkey(), dest.toPubkey(), [source.toKeypair()], solAmount);
        chai_1.assert.isTrue(inst.isOk, `${inst.unwrap()}`);
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isOk, `${res.unwrap()}`);
        console.log('# tx signature: ', res.unwrap());
    });
    (0, mocha_1.it)('transfer transaction with fee payer', async () => {
        const solAmount = 0.0001;
        const owner = src_1.Account.create();
        await src_1.Account.requestAirdrop(owner.toPubkey());
        const feePayer = source;
        /* tslint:disable-next-line */
        const before = (await src_1.Account.getBalance(feePayer.pubkey.toPubkey())).unwrap();
        console.log(before);
        const inst = await src_1.SolNative.transfer(owner.toPubkey(), dest.toPubkey(), [
            owner.toKeypair(),
        ], solAmount, feePayer.toKeypair());
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isOk, `${res.unwrap()}`);
        console.log('# tx signature: ', res.unwrap());
        const after = (await src_1.Account.getBalance(feePayer.pubkey.toPubkey())).unwrap();
        chai_1.assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
    });
    (0, mocha_1.it)('Use internal multisigTransfer()', async () => {
        const amount = 0.0001;
        const inst = await src_1.SolNative.transferWithMultisig(source.toPubkey(), dest.toPubkey(), [
            source.toKeypair(),
        ], amount);
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isOk, `${res.unwrap()}`);
        console.log('# signature :', res.unwrap());
    });
    (0, mocha_1.it)('transfer transaction with multi sig', async () => {
        const signer1 = src_1.Account.create();
        const signer2 = src_1.Account.create();
        const inst1 = await src_1.Multisig.create(2, source.toKeypair(), [
            signer1.toPubkey(),
            signer2.toPubkey(),
        ]);
        chai_1.assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
        const amount = 0.0001;
        const multisig = inst1.unwrap().data;
        const inst2 = await src_1.SolNative.transferWithMultisig(multisig.toPubkey(), dest.toPubkey(), [
            source.toKeypair(),
            signer1.toKeypair(),
            signer2.toKeypair(),
        ], amount, source.toKeypair());
        chai_1.assert.isTrue(inst2.isOk, `${inst2.unwrap()}`);
        const res = await [inst1, inst2].submit();
        chai_1.assert.isTrue(res.isOk, res.unwrap().toString());
        console.log('# signature: ', res.unwrap());
    });
});
