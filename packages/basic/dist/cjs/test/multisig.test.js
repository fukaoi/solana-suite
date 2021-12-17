"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../src/");
const setup_1 = require("./utils/setup");
let source;
describe('Multisig', () => {
    before(async () => {
        const obj = await setup_1.Setup.generatekeyPair();
        source = obj.source;
    });
    it('Is multisig address', async () => {
        const signer1 = src_1.Account.create();
        const signer2 = src_1.Account.create();
        const inst = await src_1.Multisig.create(2, source.secret.toKeypair(), [
            signer1.toPubkey(),
            signer2.toPubkey(),
        ]);
        chai_1.assert.isTrue(inst.isOk, `${inst.unwrap()}`);
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isOk, `${res.unwrap()}`);
        const address = inst.unwrap().data;
        console.log('# multisig address: ', address);
        const isAddress = await src_1.Multisig.isAddress(address.toPubkey());
        chai_1.assert.isTrue(isAddress.isOk);
        chai_1.assert.isTrue(isAddress.unwrap());
    });
    it('[Err]Invalid multisig address', async () => {
        const signer1 = src_1.Account.create();
        const signer2 = src_1.Account.create();
        const inst = await src_1.Multisig.create(2, source.toKeypair(), [
            signer1.toPubkey(),
            signer2.toPubkey(),
        ]);
        const address = inst.unwrap().data;
        const res = await src_1.Multisig.isAddress(address.toPubkey());
        chai_1.assert.isTrue(res.isOk);
        chai_1.assert.isFalse(res.unwrap());
    });
    it('Create account 2 of 2', async () => {
        const signer1 = src_1.Account.create();
        const signer2 = src_1.Account.create();
        const inst = await src_1.Multisig.create(2, source.toKeypair(), [
            signer1.toPubkey(),
            signer2.toPubkey(),
        ]);
        chai_1.assert.isTrue(inst.isOk, `${inst.unwrap()}`);
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isOk, `${res.unwrap()}`);
        console.log('# multisig account: ', inst.unwrap().data);
    });
    it('Create account 2 of 3', async () => {
        const signer1 = src_1.Account.create();
        const signer2 = src_1.Account.create();
        const signer3 = src_1.Account.create();
        const inst = await src_1.Multisig.create(2, source.toKeypair(), [
            signer1.toPubkey(),
            signer2.toPubkey(),
            signer3.toPubkey(),
        ]);
        chai_1.assert.isTrue(inst.isOk, `${inst.unwrap()}`);
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isOk, `${res.unwrap()}`);
        console.log('# multisig account: ', inst.unwrap().data);
    });
    it('[Err] m number less than signers number', async () => {
        const signer1 = src_1.Account.create();
        const res = await src_1.Multisig.create(2, source.toKeypair(), [
            signer1.toPubkey(),
        ]);
        chai_1.assert.isTrue(res.isErr);
    });
    it('Get multisig info', async () => {
        const signer1 = src_1.Account.create();
        const signer2 = src_1.Account.create();
        const inst = await src_1.Multisig.create(2, source.toKeypair(), [
            signer1.toPubkey(),
            signer2.toPubkey(),
        ]);
        chai_1.assert.isTrue(inst.isOk, `${inst.unwrap()}`);
        await inst.submit();
        const res = await src_1.Multisig.getMultisigInfo(inst.unwrap().data.toPubkey());
        chai_1.assert.isTrue(res.isOk, `${res.unwrap()}`);
    });
});
