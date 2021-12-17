"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const randomAsset_1 = require("../utils/randomAsset");
const src_1 = require("../../src");
(0, mocha_1.describe)('StorageNftStorage', () => {
    (0, mocha_1.it)('Upload metadata json file and image', async () => {
        const asset = randomAsset_1.RandomAsset.storage();
        const res = await src_1.StorageNftStorage.upload(asset);
        chai_1.assert.isTrue(res.isOk);
        const url = res.unwrap();
        console.log('# upload url: ', url);
        chai_1.assert.isString(url);
    });
});
