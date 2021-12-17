"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const setup_1 = require("../utils/setup");
const randomAsset_1 = require("../utils/randomAsset");
const src_1 = require("../../src");
let source;
(0, mocha_1.describe)('StorageArweave', () => {
    before(async () => {
        const obj = await setup_1.Setup.generatekeyPair();
        source = obj.source;
    });
    (0, mocha_1.it)('Upload metadata json file and image', async () => {
        const asset = randomAsset_1.RandomAsset.storage();
        const res = await src_1.StorageArweave.upload(source.toKeypair(), asset);
        chai_1.assert.isTrue(res.isOk);
        chai_1.assert.isNotEmpty(res.unwrap());
        console.log('# arweave manifest url: ', res.unwrap());
    });
});
