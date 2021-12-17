"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const solana_suite_1 = require("solana-suite");
const metaplex_1 = require("../../src/metaplex");
const setup_1 = require("../utils/setup");
let source;
let dest;
(0, mocha_1.describe)('Metaplex', () => {
    before(async () => {
        const obj = await setup_1.Setup.generatekeyPair();
        source = obj.source;
        dest = obj.dest;
    });
    (0, mocha_1.it)('Mint nft', async () => {
        const data = new metaplex_1.MetaplexInstructure.Data({
            name: 'Sample',
            symbol: 'SAMPLE',
            uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
            sellerFeeBasisPoints: 100,
            creators: null
        });
        const inst = await metaplex_1.Metaplex.mint(data, source.toPubkey(), [source.toKeypair()]);
        chai_1.assert.isTrue(inst.isOk);
        const res = await inst.submit();
        console.log('# tokenKey: ', inst.unwrap().data);
        console.log('# signature: ', res.unwrap());
    });
    (0, mocha_1.it)('Mint batched nft', async () => {
        const data = new metaplex_1.MetaplexInstructure.Data({
            name: 'NFT',
            symbol: 'NFT',
            uri: 'https://example.com',
            sellerFeeBasisPoints: 100,
            creators: null
        });
        const inst1 = await metaplex_1.Metaplex.mint(data, source.toPubkey(), [source.toKeypair()]);
        const inst2 = await metaplex_1.Metaplex.mint(data, source.toPubkey(), [source.toKeypair()]);
        const res = await [inst1, inst2].submit();
        chai_1.assert.isTrue(res.isOk);
        console.log('# tokenKey1: ', inst1.unwrap().data);
        console.log('# tokenKey2: ', inst2.unwrap().data);
        console.log('# signature: ', res.unwrap());
    });
    (0, mocha_1.it)('Transfer nft', async () => {
        const data = new metaplex_1.MetaplexInstructure.Data({
            name: 'Sample',
            symbol: 'SAMPLE',
            uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
            sellerFeeBasisPoints: 100,
            creators: null
        });
        const inst1 = await metaplex_1.Metaplex.mint(data, source.toPubkey(), [source.toKeypair()]);
        chai_1.assert.isTrue(inst1.isOk);
        const resMint = await inst1.submit();
        console.log('# tokenKey: ', inst1.unwrap().data);
        console.log('# signature: ', resMint.unwrap());
        chai_1.assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
        const inst2 = await solana_suite_1.SplToken.transferNft(inst1.unwrap().data.toPubkey(), source.toPubkey(), dest.toPubkey(), [source.toKeypair()]);
        const res = await inst2.submit();
        console.log('# signature: ', res.unwrap());
    });
    (0, mocha_1.it)('Transfer nft with fee payer', async () => {
        const feePayer = solana_suite_1.Account.create();
        await solana_suite_1.Account.requestAirdrop(feePayer.toPubkey());
        const beforeFeePayer = await solana_suite_1.Account.getBalance(feePayer.toPubkey());
        const data = new metaplex_1.MetaplexInstructure.Data({
            name: 'Sample',
            symbol: 'SAMPLE',
            uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
            sellerFeeBasisPoints: 100,
            creators: null
        });
        const inst1 = await metaplex_1.Metaplex.mint(data, source.toPubkey(), [source.toKeypair()]);
        chai_1.assert.isTrue(inst1.isOk);
        const resMint = await inst1.submit();
        console.log('# tokenKey: ', inst1.unwrap().data);
        console.log('# signature: ', resMint.unwrap());
        chai_1.assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
        const beforeSource = await solana_suite_1.Account.getBalance(source.toPubkey());
        const inst2 = await solana_suite_1.SplToken.transferNft(inst1.unwrap().data.toPubkey(), source.toPubkey(), dest.toPubkey(), [source.toKeypair()], feePayer.toKeypair());
        const res = await inst2.submit();
        console.log('# signature: ', res.unwrap());
        const afterFeePayer = await solana_suite_1.Account.getBalance(feePayer.toPubkey());
        const afterSource = await solana_suite_1.Account.getBalance(source.toPubkey());
        chai_1.assert.isTrue(beforeFeePayer.unwrap() > afterFeePayer.unwrap());
        chai_1.assert.equal(beforeSource.unwrap(), afterSource.unwrap());
    });
    (0, mocha_1.it)('Transfer nft with multi sig', async () => {
        // create multisig
        const signer1 = solana_suite_1.Account.create();
        const signer2 = solana_suite_1.Account.create();
        const multisig = await solana_suite_1.Multisig.create(2, source.toKeypair(), [
            signer1.toPubkey(),
            signer2.toPubkey(),
        ]);
        const resMulti = await multisig.submit();
        (0, chai_1.assert)(resMulti.isOk, `${resMulti.unwrap()}`);
        const multisigAddress = multisig.unwrap().data;
        console.log('# multisig address: ', multisigAddress);
        // create nft
        const data = new metaplex_1.MetaplexInstructure.Data({
            name: 'Sample',
            symbol: 'SAMPLE',
            uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
            sellerFeeBasisPoints: 100,
            creators: null
        });
        const inst1 = await metaplex_1.Metaplex.mint(data, source.toPubkey(), [source.toKeypair()]);
        chai_1.assert.isTrue(inst1.isOk);
        const resMint = await inst1.submit();
        console.log('# tokenKey: ', inst1.unwrap().data);
        console.log('# signature: ', resMint.unwrap());
        chai_1.assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
        // transfer from source to multisig address
        const inst2 = await solana_suite_1.SplToken.transferNft(inst1.unwrap().data.toPubkey(), source.toPubkey(), multisigAddress.toPubkey(), [
            source.toKeypair(),
        ]);
        const resTransfer = await inst2.submit();
        console.log('# signature: ', resTransfer.unwrap());
        // transfer from multisig address to dest
        const inst3 = await solana_suite_1.SplToken.transferNft(inst1.unwrap().data.toPubkey(), multisigAddress.toPubkey(), dest.toPubkey(), [
            signer1.toKeypair(),
            signer2.toKeypair(),
        ], source.toKeypair());
        const res = await inst3.submit();
        console.log('# signature: ', res.unwrap());
    });
});
