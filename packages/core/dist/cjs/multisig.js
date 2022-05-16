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
exports.Multisig = void 0;
const shared_1 = require("@solana-suite/shared");
const web3_js_1 = require("@solana/web3.js");
const buffer_layout_1 = require("@solana/buffer-layout");
const spl_token_1 = require("@solana/spl-token");
// @internal
var MultisigInstruction;
(function (MultisigInstruction) {
    const createLayoutPubKey = (property) => {
        return (0, buffer_layout_1.blob)(32, property);
    };
    MultisigInstruction.Layout = (0, buffer_layout_1.struct)([
        (0, buffer_layout_1.u8)('m'),
        (0, buffer_layout_1.u8)('n'),
        (0, buffer_layout_1.u8)('is_initialized'),
        createLayoutPubKey('signer1'),
        createLayoutPubKey('signer2'),
        createLayoutPubKey('signer3'),
        createLayoutPubKey('signer4'),
        createLayoutPubKey('signer5'),
        createLayoutPubKey('signer6'),
        createLayoutPubKey('signer7'),
        createLayoutPubKey('signer8'),
        createLayoutPubKey('signer9'),
        createLayoutPubKey('signer10'),
        createLayoutPubKey('signer11'),
    ]);
    MultisigInstruction.account = (newAccount, feePayer, balanceNeeded) => {
        return web3_js_1.SystemProgram.createAccount({
            fromPubkey: feePayer.publicKey,
            newAccountPubkey: newAccount.publicKey,
            lamports: balanceNeeded,
            space: MultisigInstruction.Layout.span,
            programId: spl_token_1.TOKEN_PROGRAM_ID
        });
    };
    MultisigInstruction.multisig = (m, feePayer, signerPubkey) => {
        const keys = [
            {
                pubkey: feePayer.publicKey,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false
            },
        ];
        signerPubkey.forEach(pubkey => keys.push({
            pubkey,
            isSigner: false,
            isWritable: false
        }));
        const dataLayout = (0, buffer_layout_1.struct)([
            (0, buffer_layout_1.u8)('instruction'),
            (0, buffer_layout_1.u8)('m'),
        ]);
        const data = Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 2,
            m
        }, data);
        return new web3_js_1.TransactionInstruction({
            keys,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
            data
        });
    };
})(MultisigInstruction || (MultisigInstruction = {}));
var Multisig;
(function (Multisig) {
    Multisig.isAddress = (multisig) => __awaiter(this, void 0, void 0, function* () {
        const info = yield Multisig.getMultisigInfo(multisig);
        if (info.isErr) {
            return shared_1.Result.ok(false);
        }
        return shared_1.Result.ok(true);
    });
    Multisig.getMultisigInfo = (multisig) => __awaiter(this, void 0, void 0, function* () {
        const info = yield shared_1.Node.getConnection().getAccountInfo(multisig);
        if (info === null) {
            return shared_1.Result.err(Error('Failed to find multisig'));
        }
        if (!info.owner.equals(spl_token_1.TOKEN_PROGRAM_ID)) {
            return shared_1.Result.err(Error('Invalid multisig owner'));
        }
        if (info.data.length !== MultisigInstruction.Layout.span) {
            return shared_1.Result.err(Error('Invalid multisig size'));
        }
        const data = Buffer.from(info.data);
        const multisigInfo = MultisigInstruction.Layout.decode(data);
        multisigInfo.signer1 = new web3_js_1.PublicKey(multisigInfo.signer1);
        multisigInfo.signer2 = new web3_js_1.PublicKey(multisigInfo.signer2);
        multisigInfo.signer3 = new web3_js_1.PublicKey(multisigInfo.signer3);
        multisigInfo.signer4 = new web3_js_1.PublicKey(multisigInfo.signer4);
        multisigInfo.signer5 = new web3_js_1.PublicKey(multisigInfo.signer5);
        multisigInfo.signer6 = new web3_js_1.PublicKey(multisigInfo.signer6);
        multisigInfo.signer7 = new web3_js_1.PublicKey(multisigInfo.signer7);
        multisigInfo.signer8 = new web3_js_1.PublicKey(multisigInfo.signer8);
        multisigInfo.signer9 = new web3_js_1.PublicKey(multisigInfo.signer9);
        multisigInfo.signer10 = new web3_js_1.PublicKey(multisigInfo.signer10);
        multisigInfo.signer11 = new web3_js_1.PublicKey(multisigInfo.signer11);
        return shared_1.Result.ok(multisigInfo);
    });
    Multisig.create = (m, feePayer, signerPubkey) => __awaiter(this, void 0, void 0, function* () {
        if (m > signerPubkey.length)
            return shared_1.Result.err(Error('signers number less than m number'));
        const account = web3_js_1.Keypair.generate();
        const connection = shared_1.Node.getConnection();
        const balanceNeeded = yield connection.getMinimumBalanceForRentExemption(MultisigInstruction.Layout.span)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (balanceNeeded.isErr)
            return shared_1.Result.err(balanceNeeded.error);
        const inst1 = MultisigInstruction.account(account, feePayer, balanceNeeded.value);
        const inst2 = MultisigInstruction.multisig(m, account, signerPubkey);
        return shared_1.Result.ok(new shared_1.Instruction([inst1, inst2], [account], feePayer, account.publicKey.toBase58()));
    });
})(Multisig = exports.Multisig || (exports.Multisig = {}));
