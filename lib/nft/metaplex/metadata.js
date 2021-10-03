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
exports.MetaplexMetaData = void 0;
const web3_js_1 = require("@solana/web3.js");
const wallet_1 = require("../../wallet");
const constants_1 = require("../../constants");
const index_1 = require("./index");
const spl_token_1 = require("@solana/spl-token");
const node_1 = require("../../node");
var MetaplexMetaData;
(function (MetaplexMetaData) {
    MetaplexMetaData.getByTokenKey = (tokenKey) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const metaAccount = yield wallet_1.Wallet.findMetaplexAssocaiatedTokenAddress(tokenKey);
        // get rent data in a metaAccount
        const nfts = yield node_1.Node.getConnection().getParsedAccountInfo(metaAccount);
        const data = (_a = nfts === null || nfts === void 0 ? void 0 : nfts.value) === null || _a === void 0 ? void 0 : _a.data;
        if (data) {
            return index_1.MetaplexSerialize.decode(data);
        }
        return index_1.Metaplex.initFormat();
    });
    MetaplexMetaData.getByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        // Get all token by owner
        const tokens = yield node_1.Node.getConnection().getParsedTokenAccountsByOwner(owner, { programId: constants_1.Constants.SPL_TOKEN_PROGRAM_ID });
        const matches = [];
        // Filter only metaplex nft
        for (const token of tokens.value) {
            const decoded = yield MetaplexMetaData.getByTokenKey(token.account.data.parsed.info.mint.toPubKey());
            if (!decoded)
                continue;
            matches.push(decoded);
        }
        return matches;
    });
    MetaplexMetaData.create = (data, tokenKey, payer, mintAuthorityKey = payer, updateAuthority = payer) => (instructions) => __awaiter(this, void 0, void 0, function* () {
        let inst = [];
        inst = instructions ? instructions : inst;
        const metaAccount = yield wallet_1.Wallet.findMetaplexAssocaiatedTokenAddress(tokenKey);
        const txnData = index_1.MetaplexSerialize.serializeCreateArgs(data);
        const keys = [
            {
                pubkey: metaAccount,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: tokenKey,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: mintAuthorityKey,
                isSigner: true,
                isWritable: false,
            },
            {
                pubkey: payer,
                isSigner: true,
                isWritable: false,
            },
            {
                pubkey: updateAuthority,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: web3_js_1.SystemProgram.programId,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false,
            },
        ];
        inst.push(new web3_js_1.TransactionInstruction({
            keys,
            programId: constants_1.Constants.METAPLEX_PROGRAM_ID,
            data: txnData,
        }));
        return inst;
    });
    MetaplexMetaData.update = (data, newUpdateAuthority, primarySaleHappened, tokenKey, updateAuthority, signers) => (instructions) => __awaiter(this, void 0, void 0, function* () {
        let inst = [];
        inst = instructions ? instructions : inst;
        const associatedToken = yield wallet_1.Wallet.findAssocaiatedTokenAddress(updateAuthority, tokenKey);
        inst.push(wallet_1.Wallet.createAssociatedTokenAccountInstruction(associatedToken, updateAuthority, updateAuthority, tokenKey));
        inst.push(spl_token_1.Token.createMintToInstruction(constants_1.Constants.SPL_TOKEN_PROGRAM_ID, tokenKey, associatedToken, updateAuthority, signers, 1));
        const metaAccount = (yield wallet_1.Wallet.findMetaplexAssocaiatedTokenAddress(tokenKey));
        const txnData = index_1.MetaplexSerialize.serializeUpdateArgs(data, newUpdateAuthority, primarySaleHappened);
        const keys = [
            {
                pubkey: metaAccount,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: updateAuthority,
                isSigner: true,
                isWritable: false,
            },
        ];
        inst.push(new web3_js_1.TransactionInstruction({
            keys,
            programId: constants_1.Constants.METAPLEX_PROGRAM_ID,
            data: txnData,
        }));
        return inst;
    });
})(MetaplexMetaData = exports.MetaplexMetaData || (exports.MetaplexMetaData = {}));
