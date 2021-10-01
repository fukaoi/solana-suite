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
const util_1 = require("../../util");
const metadata_1 = require("./metadata");
__exportStar(require("./instructure"), exports);
__exportStar(require("./metadata"), exports);
__exportStar(require("./serialize"), exports);
var Metaplex;
(function (Metaplex) {
    const TOKEN_PROGRAM_ID = new web3_js_1.PublicKey(constants_1.Constants.SPL_TOKEN_PROGRAM_ID);
    const createMintAccount = (instructions, payer, signers) => __awaiter(this, void 0, void 0, function* () {
        const mintRentExempt = yield util_1.Util.getConnection().getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span);
        const mintAccount = web3_js_1.Keypair.generate();
        instructions.push(web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: mintAccount.publicKey,
            lamports: mintRentExempt,
            space: spl_token_1.MintLayout.span,
            programId: TOKEN_PROGRAM_ID,
        }));
        signers.push(mintAccount);
        return mintAccount.publicKey;
    });
    const init = (instructions, mintAccount, payer, owner = payer, freezeAuthority = payer) => __awaiter(this, void 0, void 0, function* () {
        const decimals = 0;
        instructions.push(spl_token_1.Token.createInitMintInstruction(TOKEN_PROGRAM_ID, mintAccount, decimals, new web3_js_1.PublicKey(owner), new web3_js_1.PublicKey(freezeAuthority)));
        return mintAccount.toBase58();
    });
    Metaplex.initFormat = () => {
        return {
            updateAuthority: '',
            mint: '',
            name: '',
            symbol: '',
            uri: '',
            sellerFeeBasisPoints: '',
        };
    };
    Metaplex.create = (payer, signerSecrets) => (instructions) => __awaiter(this, void 0, void 0, function* () {
        let inst = [];
        inst = instructions ? instructions : inst;
        const signers = signerSecrets.map(s => util_1.Util.createKeypair(s));
        const mintAccount = yield createMintAccount(inst, new web3_js_1.PublicKey(payer), signers);
        const mintKey = yield init(inst, mintAccount, payer);
        return { instructions: inst, signers, mintKey };
    });
    Metaplex.mint = (data, owner) => __awaiter(this, void 0, void 0, function* () {
        const txsign = yield Metaplex.create(owner.pubkey, [owner.secret])();
        const metadataInst = yield metadata_1.MetaplexMetaData.create(data, txsign.mintKey, owner.pubkey)(txsign.instructions);
        const updateTx = yield metadata_1.MetaplexMetaData.update(data, undefined, undefined, txsign.mintKey, owner.pubkey, [owner.secret])(metadataInst);
        const signature = yield transaction_1.Transaction.sendInstructions(txsign.signers, updateTx);
        return { mintKey: txsign.mintKey, signature };
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
