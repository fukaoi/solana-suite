"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const metaplex_1 = require("../../src/metaplex");
const setup_1 = require("../../test/utils/setup");
let source;
(0, mocha_1.describe)('MetaplexMetaData', () => {
    before(async () => {
        const obj = await setup_1.Setup.generatekeyPair();
        source = obj.source;
    });
    (0, mocha_1.it)('Create instructions for create metadata', async () => {
        const data = new metaplex_1.MetaplexInstructure.Data({
            name: 'Sample',
            symbol: 'SAMPLE',
            uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
            sellerFeeBasisPoints: 100,
            creators: null
        });
        const tokenKey = 'ZSMBYfbdn9eFJxs91p61nMbdZ7JALuXvUukqZu18skM'.toPubkey();
        const sourceStr = source.pubkey.toPubkey();
        const res = await metaplex_1.MetaplexMetaData.create(data, tokenKey, sourceStr, sourceStr, sourceStr);
        chai_1.assert.isTrue(res.isOk);
        chai_1.assert.isArray(res.unwrap());
        chai_1.assert.isObject(res.unwrap()[0]);
    });
    (0, mocha_1.it)('Create instructions for update metadata', async () => {
        const data = new metaplex_1.MetaplexInstructure.Data({
            name: 'Sample',
            symbol: 'SAMPLE',
            uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
            sellerFeeBasisPoints: 100,
            creators: null
        });
        const tokenKey = 'ZSMBYfbdn9eFJxs91p61nMbdZ7JALuXvUukqZu18skM'.toPubkey();
        const res = await metaplex_1.MetaplexMetaData.update(data, undefined, undefined, tokenKey, source.toPubkey(), [source.toKeypair()]);
        chai_1.assert.isTrue(res.isOk);
        chai_1.assert.isArray(res.unwrap());
        chai_1.assert.isObject(res.unwrap()[0]);
    });
    (0, mocha_1.it)('Get metadata by tokenKey', async () => {
        const orgData = {
            updateAuthority: '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U',
            name: 'Gropu1',
            symbol: '',
            uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
            sellerFeeBasisPoints: 0
        };
        const res = await metaplex_1.MetaplexMetaData.getByTokenKey('Hn1DMeFF9baMuGVaC5dWhKC2jaPEQnB4pdY9iqz6G4zf'.toPubkey());
        chai_1.assert.isTrue(res.isOk);
        const format = res.unwrap();
        chai_1.assert.equal(format.name, orgData.name);
        chai_1.assert.equal(format.symbol, orgData.symbol);
        chai_1.assert.equal(format.uri, orgData.uri);
        chai_1.assert.equal(format.update_authority, orgData.updateAuthority);
        chai_1.assert.equal(format.seller_fee_basis_points, orgData.sellerFeeBasisPoints);
    });
    (0, mocha_1.it)('Get metadata of nft by owner', async () => {
        const res = await metaplex_1.MetaplexMetaData.getByOwner('78DybLoke46TR6RW1HWZBMYt7qouGggQJjLATsfL7RwA'.toPubkey());
        chai_1.assert.isTrue(res.isOk);
        console.log(res);
    });
});
