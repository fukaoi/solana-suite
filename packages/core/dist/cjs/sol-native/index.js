"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolNative = void 0;
const find_1 = require("./find");
const fee_payer_partial_sign_transfer_1 = require("./fee-payer-partial-sign-transfer");
const history_1 = require("./history");
const transfer_1 = require("./transfer");
const transfer_with_multisig_1 = require("./transfer-with-multisig");
exports.SolNative = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, find_1.SolNative), fee_payer_partial_sign_transfer_1.SolNative), history_1.SolNative), transfer_1.SolNative), transfer_with_multisig_1.SolNative);
