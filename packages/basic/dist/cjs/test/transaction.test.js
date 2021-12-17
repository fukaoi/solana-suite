"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const src_1 = require("../src");
const chai_1 = require("chai");
const signature1 = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';
(0, mocha_1.describe)('Transaction', () => {
    (0, mocha_1.it)('Get transaction data', async () => {
        const res = await src_1.Transaction.get(signature1);
        chai_1.assert.isObject(res);
    });
    (0, mocha_1.it)('Get all transaction data', async () => {
        const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
        const res = await src_1.Transaction.getAll(tokenKey.toPubkey());
        if (res.isOk) {
            chai_1.assert.isArray(res.value);
            chai_1.assert.isObject(res.value[0]);
        }
        else {
            chai_1.assert.isFalse(res.isErr, res.isErr && res.error.message);
        }
    });
});
