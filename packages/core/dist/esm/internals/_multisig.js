import { TransactionInstruction, SYSVAR_RENT_PUBKEY, SystemProgram, } from '@solana/web3.js';
import { struct, u8, blob } from '@solana/buffer-layout';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
// @internal
export var Internals_Multisig;
(function (Internals_Multisig) {
    const createLayoutPubKey = (property) => {
        return blob(32, property);
    };
    Internals_Multisig.Layout = struct([
        u8('m'),
        u8('n'),
        u8('is_initialized'),
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
    Internals_Multisig.account = (newAccount, feePayer, balanceNeeded) => {
        return SystemProgram.createAccount({
            fromPubkey: feePayer.publicKey,
            newAccountPubkey: newAccount.publicKey,
            lamports: balanceNeeded,
            space: Internals_Multisig.Layout.span,
            programId: TOKEN_PROGRAM_ID,
        });
    };
    Internals_Multisig.multisig = (m, feePayer, signerPubkey) => {
        const keys = [
            {
                pubkey: feePayer.publicKey,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false,
            },
        ];
        signerPubkey.forEach((pubkey) => keys.push({
            pubkey,
            isSigner: false,
            isWritable: false,
        }));
        const dataLayout = struct([
            u8('instruction'),
            u8('m'),
        ]);
        const data = Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 2,
            m,
        }, data);
        return new TransactionInstruction({
            keys,
            programId: TOKEN_PROGRAM_ID,
            data,
        });
    };
})(Internals_Multisig || (Internals_Multisig = {}));
