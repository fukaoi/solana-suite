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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = exports.MetaplexInstruction = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
const metadata_1 = require("./metadata");
__exportStar(require("./instructure"), exports);
__exportStar(require("./metadata"), exports);
__exportStar(require("./serialize"), exports);
__exportStar(require("./account"), exports);
var MetaplexInstruction;
(function (MetaplexInstruction) {
    MetaplexInstruction.mintAccount = async (instructions, owner, // need sufficient sol account
    signers) => {
        const mintRentExempt = await shared_1.Node.getConnection().getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span);
        const newAccount = web3_js_1.Keypair.generate();
        instructions.push(web3_js_1.SystemProgram.createAccount({
            fromPubkey: owner,
            newAccountPubkey: newAccount.publicKey,
            lamports: mintRentExempt,
            space: spl_token_1.MintLayout.span,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
        }));
        signers.push(newAccount);
        return {
            mintAccount: newAccount.publicKey,
            signers
        };
    };
    MetaplexInstruction.mint = async (instructions, createdAccount, owner, freezeAuthority) => {
        const decimals = 0;
        instructions.push(spl_token_1.Token.createInitMintInstruction(spl_token_1.TOKEN_PROGRAM_ID, createdAccount, decimals, owner, freezeAuthority));
        return createdAccount.toBase58();
    };
})(MetaplexInstruction = exports.MetaplexInstruction || (exports.MetaplexInstruction = {}));
var Metaplex;
(function (Metaplex) {
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
    Metaplex.initializeMint = async (payer, signers) => {
        const instructions = [];
        const inst1 = await MetaplexInstruction.mintAccount(instructions, payer, signers);
        signers = signers.concat(inst1.signers);
        const tokenKey = await MetaplexInstruction.mint(instructions, inst1.mintAccount, payer, payer);
        return {
            instructions,
            signers,
            tokenKey
        };
    };
    Metaplex.mint = async (data, owner, signers) => {
        const inst1 = await Metaplex.initializeMint(owner, signers);
        signers = signers.concat(inst1.signers);
        const inst2 = await metadata_1.MetaplexMetaData.create(data, inst1.tokenKey.toPubkey(), owner, owner, owner);
        if (inst2.isErr) {
            return shared_1.Result.err(inst2.error);
        }
        const inst3 = await metadata_1.MetaplexMetaData.update(data, undefined, undefined, inst1.tokenKey.toPubkey(), owner, signers);
        if (inst3.isErr)
            return shared_1.Result.err(inst3.error);
        const mergeInstructions = inst1.instructions.concat(inst2.unwrap()).concat(inst3.unwrap());
        return shared_1.Result.ok(new shared_1.Instruction(mergeInstructions, signers, undefined, inst1.tokenKey));
    };
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
