"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.Metaplex = exports.MetaplexInstruction = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
const core_1 = require("@solana-suite/core");
const metadata_1 = require("./metadata");
__exportStar(require("./instructure"), exports);
__exportStar(require("./metadata"), exports);
__exportStar(require("./serialize"), exports);
__exportStar(require("./account"), exports);
var MetaplexInstruction;
(function (MetaplexInstruction) {
    MetaplexInstruction.mintAccount = (instructions, owner, // need sufficient sol account
    signers) => __awaiter(this, void 0, void 0, function* () {
        const mintRentExempt = yield shared_1.Node.getConnection().getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span);
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
    });
    MetaplexInstruction.mint = (instructions, createdAccount, owner, freezeAuthority) => __awaiter(this, void 0, void 0, function* () {
        const decimals = 0;
        instructions.push((0, spl_token_1.createInitializeMintInstruction)(createdAccount, decimals, owner, freezeAuthority, spl_token_1.TOKEN_PROGRAM_ID));
        return createdAccount.toBase58();
    });
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
    Metaplex.initializeMint = (payer, signers) => __awaiter(this, void 0, void 0, function* () {
        const instructions = [];
        const inst1 = yield MetaplexInstruction.mintAccount(instructions, payer, signers);
        signers = signers.concat(inst1.signers);
        const tokenKey = yield MetaplexInstruction.mint(instructions, inst1.mintAccount, payer, payer);
        return {
            instructions,
            signers,
            tokenKey
        };
    });
    Metaplex.mint = (data, owner, signers) => __awaiter(this, void 0, void 0, function* () {
        const inst1 = yield Metaplex.initializeMint(owner, signers);
        signers = signers.concat(inst1.signers);
        const inst2 = yield metadata_1.MetaplexMetaData.create(data, inst1.tokenKey.toPublicKey(), owner, owner, owner);
        if (inst2.isErr) {
            return shared_1.Result.err(inst2.error);
        }
        const inst3 = yield metadata_1.MetaplexMetaData.update(data, undefined, undefined, inst1.tokenKey.toPublicKey(), owner, signers);
        if (inst3.isErr)
            return shared_1.Result.err(inst3.error);
        const mergeInstructions = inst1.instructions.concat(inst2.unwrap()).concat(inst3.unwrap());
        return shared_1.Result.ok(new shared_1.Instruction(mergeInstructions, signers, undefined, inst1.tokenKey));
    });
    Metaplex.burn = (tokenKey, owner, signers, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const burnAmount = 1;
        const tokenDecimals = 0;
        return core_1.SplToken.burn(tokenKey, owner, signers, burnAmount, tokenDecimals, feePayer);
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
