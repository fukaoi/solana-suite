"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const setup_1 = require("../test/utils/setup");
const src_1 = require("../src");
let source;
let dest;
const DUMMY_DATA = 'dummy memo data';
(0, mocha_1.describe)('Memo', () => {
    before(async () => {
        const obj = await setup_1.Setup.generatekeyPair();
        source = obj.source;
        dest = obj.dest;
    });
    (0, mocha_1.it)('encode', async () => {
        const res = src_1.Memo.encode(DUMMY_DATA);
        console.log(`# encoded: ${res}`, res);
        chai_1.assert.equal(res.length, 15);
    });
    (0, mocha_1.it)('create instruction', async () => {
        const res = src_1.Memo.create(DUMMY_DATA, [
            source.toPubkey(),
        ], [
            source.toKeypair()
        ]);
        console.log(`# create: `, res);
        chai_1.assert.isObject(res);
    });
    (0, mocha_1.it)('decode', async () => {
        const data = 'U1Gg9T9EGN5tDRw28wR3GxXWZBkoS3rg2U3iMZdViMJhd5pVNsxh79RW';
        const res = src_1.Memo.decode(data);
        console.log(`# decode: `, res, data);
        chai_1.assert.equal(res, '{"nft": "art", "url": "http://hoge.hoge"}');
    });
    (0, mocha_1.it)('send memo by own', async () => {
        const inst = src_1.Memo.create('{"memo": "send memo by own"}', [
            source.toPubkey(),
        ], [
            source.toKeypair()
        ]);
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isOk, res.unwrap());
        console.log('# tx signature: ', res.unwrap());
    });
    (0, mocha_1.it)('send memo by owners', async () => {
        const otherOwner = src_1.Account.create();
        const inst = src_1.Memo.create('{"memo": "send memo by owners"}', [
            otherOwner.toPubkey()
        ], [
            source.toKeypair(),
            otherOwner.toKeypair(),
        ]);
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isOk, res.unwrap());
        console.log('# tx signature: ', res.unwrap());
    });
    (0, mocha_1.it)('send memo by owners with fee payer', async () => {
        const owner1 = src_1.Account.create();
        const owner2 = src_1.Account.create();
        const inst = src_1.Memo.create('{"memo": "send memo by owners with fee payer"}', [
            owner1.toPubkey(),
            owner2.toPubkey(),
        ], [
            owner1.toKeypair(),
            owner2.toKeypair(),
        ], source.toKeypair());
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isOk, res.unwrap());
        console.log('# tx signature: ', res.unwrap());
    });
    (0, mocha_1.it)('send memo and sol transfer by owner', async () => {
        const owner1 = src_1.Account.create();
        const owner2 = src_1.Account.create();
        const inst1 = src_1.Memo.create('{"memo": "send memo by owners with fee payer"}', [
            owner1.toPubkey(),
            owner2.toPubkey(),
        ], [
            owner1.toKeypair(),
            owner2.toKeypair(),
        ], source.toKeypair());
        const inst2 = await src_1.SolNative.transfer(source.toPubkey(), dest.toPubkey(), [
            source.toKeypair()
        ], 0.00001);
        const res = await [inst1, inst2].submit();
        chai_1.assert.isTrue(res.isOk, res.unwrap());
        console.log('# tx signature: ', res.unwrap());
    });
    (0, mocha_1.it)('Max memo 283 length by i18n', async () => {
        const data500byte = `
    アメリカの地質調査所から気象庁に入った連絡によりますと、
    日本時間の14日午後0時20分ごろ、インドネシア付近のフローレス海を
    震源とするマグニチュード7.6の大きな地震がありました。
    気象庁によりますと、この地震による日本への津波の影響はありません。
    フローレス島など 最大50センチの津波のおそれインドネシアの気象当局は、
    この地震でフローレス島やその周辺のシッカ島、レンバタ島に最大で高さ
    50センチの津波が到達するおそれがあるとして海岸近くの人たちに避難を呼びかけています。
    震源は米国地質調査所国立地震情報センター(USGS,NEIC)による。太平洋津波警報センター.....
    `;
        const inst = src_1.Memo.create(data500byte, [
            source.toPubkey()
        ], [
            source.toKeypair()
        ]);
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isOk, res.unwrap());
        console.log('# tx signature: ', res.unwrap());
    });
    // it('Get memo data in transaction', async () => {
    // const res = await SplToken.getTransferHistory(source.toPubkey());
    // console.log(res.unwrap()[0]);
    // console.log(res.unwrap()[1]);
    // console.log(res.unwrap()[2]);
    // console.log(res.unwrap()[3]);
    // });
    (0, mocha_1.it)('[Err] Over max limit', async () => {
        const overData = 'a'.repeat(2000);
        const inst = src_1.Memo.create(overData, [
            source.toPubkey()
        ], [
            source.toKeypair()
        ]);
        const res = await inst.submit();
        chai_1.assert.isTrue(res.isErr);
    });
});
