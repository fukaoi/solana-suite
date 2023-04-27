"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multisig = void 0;
const web3_js_1 = require("@solana/web3.js");
const buffer_layout_1 = require("@solana/buffer-layout");
const spl_token_1 = require("@solana/spl-token");
// @internal
var Multisig;
(function (Multisig) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const createLayoutPubKey = (property) => {
        return (0, buffer_layout_1.blob)(32, property);
    };
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    Multisig.Layout = (0, buffer_layout_1.struct)([
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
    Multisig.account = (newAccount, feePayer, balanceNeeded) => {
        return web3_js_1.SystemProgram.createAccount({
            fromPubkey: feePayer.publicKey,
            newAccountPubkey: newAccount.publicKey,
            lamports: balanceNeeded,
            space: Multisig.Layout.span,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
        });
    };
    Multisig.multisig = (m, feePayer, signerPubkey) => {
        const keys = [
            {
                pubkey: feePayer.publicKey,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false,
            },
        ];
        signerPubkey.forEach((pubkey) => keys.push({
            pubkey,
            isSigner: false,
            isWritable: false,
        }));
        const dataLayout = (0, buffer_layout_1.struct)([
            (0, buffer_layout_1.u8)('instruction'),
            (0, buffer_layout_1.u8)('m'),
        ]);
        const data = Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 2,
            m,
        }, data);
        return new web3_js_1.TransactionInstruction({
            keys,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
            data,
        });
    };
})(Multisig = exports.Multisig || (exports.Multisig = {}));
//# sourceMappingURL=instruction.js.map