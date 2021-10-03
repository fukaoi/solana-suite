"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const spl_token_1 = require("@solana/spl-token");
const transaction_1 = require("../../transaction");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../../constants");
const node_1 = require("../../node");
const metadata_1 = require("./metadata");
__exportStar(require("./instructure"), exports);
__exportStar(require("./metadata"), exports);
__exportStar(require("./serialize"), exports);
var Metaplex;
(function (Metaplex) {
    const createMintAccount = (instructions, payer, signers) => __awaiter(this, void 0, void 0, function* () {
        const mintRentExempt = yield node_1.Node.getConnection().getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span);
        const mintAccount = web3_js_1.Keypair.generate();
        instructions.push(web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: mintAccount.publicKey,
            lamports: mintRentExempt,
            space: spl_token_1.MintLayout.span,
            programId: constants_1.Constants.SPL_TOKEN_PROGRAM_ID,
        }));
        signers.push(mintAccount);
        return mintAccount.publicKey;
    });
    const init = (instructions, mintAccount, payer, owner = payer, freezeAuthority = payer) => __awaiter(this, void 0, void 0, function* () {
        const decimals = 0;
        instructions.push(spl_token_1.Token.createInitMintInstruction(constants_1.Constants.SPL_TOKEN_PROGRAM_ID, mintAccount, decimals, owner, freezeAuthority));
        return mintAccount.toBase58();
    });
    Metaplex.initFormat = () => {
        return {
            name: '',
            uri: '',
            symbol: '',
            update_authority: '',
            creators: [],
            seller_fee_basis_points: 0,
            primary_sale_happened: false
        };
    };
    Metaplex.create = (payer, signers) => (instructions) => __awaiter(this, void 0, void 0, function* () {
        let inst = [];
        inst = instructions ? instructions : inst;
        const mintAccount = yield createMintAccount(inst, payer, signers);
        const tokenKey = yield init(inst, mintAccount, payer);
        return { instructions: inst, signers, tokenKey };
    });
    Metaplex.mint = (data, owner) => __awaiter(this, void 0, void 0, function* () {
        const txsign = yield Metaplex.create(owner.publicKey, [owner])();
        const metadataInst = yield metadata_1.MetaplexMetaData.create(data, txsign.tokenKey.toPubKey(), owner.publicKey)(txsign.instructions);
        const updateTx = yield metadata_1.MetaplexMetaData.update(data, undefined, undefined, txsign.tokenKey.toPubKey(), owner.publicKey, [owner])(metadataInst);
        const signature = yield transaction_1.Transaction.sendInstructions(txsign.signers, updateTx);
        return { tokenKey: txsign.tokenKey, signature };
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
