import { describe, it, before } from 'mocha';
import { SolNative, Account, Multisig } from '../src';
import { assert } from 'chai';
import { Setup } from '../test/utils/setup';
let source;
let dest;
describe('SolNative', () => {
    before(async () => {
        const obj = await Setup.generatekeyPair();
        source = obj.source;
        dest = obj.dest;
    });
    it('transfer transaction', async () => {
        const solAmount = 0.0001;
        const inst = await SolNative.transfer(source.toPubkey(), dest.toPubkey(), [source.toKeypair()], solAmount);
        assert.isTrue(inst.isOk, `${inst.unwrap()}`);
        const res = await inst.submit();
        assert.isTrue(res.isOk, `${res.unwrap()}`);
        console.log('# tx signature: ', res.unwrap());
    });
    it('transfer transaction with fee payer', async () => {
        const solAmount = 0.0001;
        const owner = Account.create();
        await Account.requestAirdrop(owner.toPubkey());
        const feePayer = source;
        /* tslint:disable-next-line */
        const before = (await Account.getBalance(feePayer.pubkey.toPubkey())).unwrap();
        console.log(before);
        const inst = await SolNative.transfer(owner.toPubkey(), dest.toPubkey(), [
            owner.toKeypair(),
        ], solAmount, feePayer.toKeypair());
        const res = await inst.submit();
        assert.isTrue(res.isOk, `${res.unwrap()}`);
        console.log('# tx signature: ', res.unwrap());
        const after = (await Account.getBalance(feePayer.pubkey.toPubkey())).unwrap();
        assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
    });
    it('Use internal multisigTransfer()', async () => {
        const amount = 0.0001;
        const inst = await SolNative.transferWithMultisig(source.toPubkey(), dest.toPubkey(), [
            source.toKeypair(),
        ], amount);
        const res = await inst.submit();
        assert.isTrue(res.isOk, `${res.unwrap()}`);
        console.log('# signature :', res.unwrap());
    });
    it('transfer transaction with multi sig', async () => {
        const signer1 = Account.create();
        const signer2 = Account.create();
        const inst1 = await Multisig.create(2, source.toKeypair(), [
            signer1.toPubkey(),
            signer2.toPubkey(),
        ]);
        assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
        const amount = 0.0001;
        const multisig = inst1.unwrap().data;
        const inst2 = await SolNative.transferWithMultisig(multisig.toPubkey(), dest.toPubkey(), [
            source.toKeypair(),
            signer1.toKeypair(),
            signer2.toKeypair(),
        ], amount, source.toKeypair());
        assert.isTrue(inst2.isOk, `${inst2.unwrap()}`);
        const res = await [inst1, inst2].submit();
        assert.isTrue(res.isOk, res.unwrap().toString());
        console.log('# signature: ', res.unwrap());
    });
});
