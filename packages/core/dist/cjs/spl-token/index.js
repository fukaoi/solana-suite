"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplToken = void 0;
const add_1 = require("./add");
const burn_1 = require("./burn");
const find_1 = require("./find");
const freeze_1 = require("./freeze");
const fee_payer_partial_sign_transfer_1 = require("./fee-payer-partial-sign-transfer");
const history_1 = require("./history");
const mint_1 = require("./mint");
const thaw_1 = require("./thaw");
const transfer_1 = require("./transfer");
exports.SplToken = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, add_1.SplToken), burn_1.SplToken), find_1.SplToken), freeze_1.SplToken), fee_payer_partial_sign_transfer_1.SplToken), history_1.SplToken), mint_1.SplToken), thaw_1.SplToken), transfer_1.SplToken);
//# sourceMappingURL=index.js.map