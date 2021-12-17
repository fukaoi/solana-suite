"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const metaplex_1 = require("../../src/metaplex");
const chai_1 = require("chai");
(0, mocha_1.describe)('MetaplexAccount', () => {
    (0, mocha_1.it)('find metaplex token address', async () => {
        const res = await metaplex_1.MetaplexAccount.findMetaplexAssocaiatedTokenAddress('D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubkey());
        chai_1.assert.isTrue(res.isOk);
        chai_1.assert.isNotNull(res.unwrap());
    });
});
