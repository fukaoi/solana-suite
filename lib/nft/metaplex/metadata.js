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
const serialize_1 = require("./serialize");
const util_1 = require("../../util");
const spl_token_1 = require("@solana/spl-token");
var MetaplexMetaData;
(function (MetaplexMetaData) {
    const TOKEN_PROGRAM_ID = new web3_js_1.PublicKey(constants_1.Constants.SPL_TOKEN_PROGRAM_ID);
    const METADATA_PROGRAM_ID = new web3_js_1.PublicKey(constants_1.Constants.METAPLEX_PROGRAM_ID);
    MetaplexMetaData.getByMintKey = (mintKey) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const metaAccount = (yield wallet_1.Wallet.findMetaplexAssocaiatedTokenAddress(mintKey)).toBase58();
        // get rent data in a metaAccount
        const nfts = yield util_1.Util.getConnection().getParsedAccountInfo(new web3_js_1.PublicKey(metaAccount));
        const data = (_a = nfts === null || nfts === void 0 ? void 0 : nfts.value) === null || _a === void 0 ? void 0 : _a.data;
        if (data) {
            return serialize_1.MetaplexSerialize.decode(data);
        }
        return serialize_1.MetaplexSerialize.initData();
    });
    MetaplexMetaData.getByOwner = (ownerPubKey) => __awaiter(this, void 0, void 0, function* () {
        // Get all token by owner
        const tokens = yield util_1.Util.getConnection().getParsedTokenAccountsByOwner(new web3_js_1.PublicKey(ownerPubKey), { programId: TOKEN_PROGRAM_ID });
        const matches = [];
        // Filter only metaplex nft
        for (const token of tokens.value) {
            const decoded = yield MetaplexMetaData.getByMintKey(token.account.data.parsed.info.mint);
            if (!decoded)
                continue;
            matches.push(decoded);
        }
        return matches;
    });
    MetaplexMetaData.create = (data, mintKey, payer, mintAuthorityKey = payer, updateAuthority = payer) => (instructions) => __awaiter(this, void 0, void 0, function* () {
        let inst = [];
        inst = instructions ? instructions : inst;
        const metaAccount = (yield wallet_1.Wallet.findMetaplexAssocaiatedTokenAddress(mintKey)).toBase58();
        console.log('# metaAccount', metaAccount);
        const txnData = serialize_1.MetaplexSerialize.serializeCreateArgs(data);
        const keys = [
            {
                pubkey: new web3_js_1.PublicKey(metaAccount),
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: new web3_js_1.PublicKey(mintKey),
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: new web3_js_1.PublicKey(mintAuthorityKey),
                isSigner: true,
                isWritable: false,
            },
            {
                pubkey: new web3_js_1.PublicKey(payer),
                isSigner: true,
                isWritable: false,
            },
            {
                pubkey: new web3_js_1.PublicKey(updateAuthority),
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
            programId: METADATA_PROGRAM_ID,
            data: txnData,
        }));
        return inst;
    });
    MetaplexMetaData.update = (data, newUpdateAuthority, primarySaleHappened, mintKey, updateAuthority, signerSecrets) => (instructions) => __awaiter(this, void 0, void 0, function* () {
        let inst = [];
        inst = instructions ? instructions : inst;
        const signers = util_1.Util.createSigners(signerSecrets);
        const associatedTokenAccount = yield wallet_1.Wallet.findAssocaiatedTokenAddress(updateAuthority, mintKey);
        console.log('# associatedTokenAccount: ', associatedTokenAccount.toBase58());
        inst.push(wallet_1.Wallet.createAssociatedTokenAccountInstruction(associatedTokenAccount.toBase58(), updateAuthority, updateAuthority, mintKey));
        inst.push(spl_token_1.Token.createMintToInstruction(TOKEN_PROGRAM_ID, new web3_js_1.PublicKey(mintKey), associatedTokenAccount, new web3_js_1.PublicKey(updateAuthority), signers, 1));
        const metaAccount = (yield wallet_1.Wallet.findMetaplexAssocaiatedTokenAddress(mintKey)).toBase58();
        const txnData = serialize_1.MetaplexSerialize.serializeUpdateArgs(data, newUpdateAuthority, primarySaleHappened);
        const keys = [
            {
                pubkey: new web3_js_1.PublicKey(metaAccount),
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: new web3_js_1.PublicKey(updateAuthority),
                isSigner: true,
                isWritable: false,
            },
        ];
        inst.push(new web3_js_1.TransactionInstruction({
            keys,
            programId: METADATA_PROGRAM_ID,
            data: txnData,
        }));
        return inst;
    });
})(MetaplexMetaData = exports.MetaplexMetaData || (exports.MetaplexMetaData = {}));
