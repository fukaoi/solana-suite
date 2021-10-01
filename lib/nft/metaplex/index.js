"use strict";
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
exports.Metaplex = exports.MetaplexObject = exports.MetaplexSerialize = exports.MetaplexMetaData = void 0;
const spl_token_1 = require("@solana/spl-token");
const transaction_1 = require("../../transaction");
const object_1 = require("./object");
const metadata_1 = require("./metadata");
const serialize_1 = require("./serialize");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("../../constants");
const util_1 = require("../../util");
// alias submodule 
exports.MetaplexMetaData = metadata_1.MetaplexMetaData;
exports.MetaplexSerialize = serialize_1.MetaplexSerialize;
exports.MetaplexObject = object_1.MetaplexObject;
var Metaplex;
(function (Metaplex) {
    Metaplex.Object = object_1.MetaplexObject;
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
        const metadataInst = yield exports.MetaplexMetaData.create(data, txsign.mintKey, owner.pubkey)(txsign.instructions);
        const updateTx = yield exports.MetaplexMetaData.update(data, undefined, undefined, txsign.mintKey, owner.pubkey, [owner.secret])(metadataInst);
        const signature = yield transaction_1.Transaction.sendInstructions(txsign.signers, updateTx);
        return { mintKey: txsign.mintKey, signature };
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
