"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const burn_1 = require("./burn");
const find_1 = require("./find");
const freeze_1 = require("./freeze");
const fee_payer_partial_sign_mint_1 = require("./fee-payer-partial-sign-mint");
const fee_payer_partial_sign_transfer_1 = require("./fee-payer-partial-sign-transfer");
const mint_1 = require("./mint");
const thaw_1 = require("./thaw");
const transfer_1 = require("./transfer");
exports.Metaplex = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, burn_1.Metaplex), find_1.Metaplex), freeze_1.Metaplex), fee_payer_partial_sign_mint_1.Metaplex), fee_payer_partial_sign_transfer_1.Metaplex), mint_1.Metaplex), thaw_1.Metaplex), transfer_1.Metaplex);
//# sourceMappingURL=index.js.map