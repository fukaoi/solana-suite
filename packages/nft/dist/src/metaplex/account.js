"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexAccount = void 0;
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
var MetaplexAccount;
(function (MetaplexAccount) {
    MetaplexAccount.findMetaplexAssocaiatedTokenAddress = async (tokenKey) => {
        return await web3_js_1.PublicKey.findProgramAddress([
            Buffer.from('metadata'),
            shared_1.Constants.METAPLEX_PROGRAM_ID.toBuffer(),
            tokenKey.toBuffer(),
        ], shared_1.Constants.METAPLEX_PROGRAM_ID)
            .then(v => shared_1.Result.ok(v[0]))
            .catch((e) => shared_1.Result.err(e));
    };
})(MetaplexAccount = exports.MetaplexAccount || (exports.MetaplexAccount = {}));
