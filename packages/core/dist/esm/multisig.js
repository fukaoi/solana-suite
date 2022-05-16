var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, Result, Instruction, } from '@solana-suite/shared';
import { PublicKey, TransactionInstruction, SYSVAR_RENT_PUBKEY, SystemProgram, Keypair, } from '@solana/web3.js';
import { struct, u8, blob } from '@solana/buffer-layout';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
// @internal
var MultisigInstruction;
(function (MultisigInstruction) {
    const createLayoutPubKey = (property) => {
        return blob(32, property);
    };
    MultisigInstruction.Layout = struct([
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
    MultisigInstruction.account = (newAccount, feePayer, balanceNeeded) => {
        return SystemProgram.createAccount({
            fromPubkey: feePayer.publicKey,
            newAccountPubkey: newAccount.publicKey,
            lamports: balanceNeeded,
            space: MultisigInstruction.Layout.span,
            programId: TOKEN_PROGRAM_ID
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
                pubkey: SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false
            },
        ];
        signerPubkey.forEach(pubkey => keys.push({
            pubkey,
            isSigner: false,
            isWritable: false
        }));
        const dataLayout = struct([
            u8('instruction'),
            u8('m'),
        ]);
        const data = Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 2,
            m
        }, data);
        return new TransactionInstruction({
            keys,
            programId: TOKEN_PROGRAM_ID,
            data
        });
    };
})(MultisigInstruction || (MultisigInstruction = {}));
export var Multisig;
(function (Multisig) {
    Multisig.isAddress = (multisig) => __awaiter(this, void 0, void 0, function* () {
        const info = yield Multisig.getMultisigInfo(multisig);
        if (info.isErr) {
            return Result.ok(false);
        }
        return Result.ok(true);
    });
    Multisig.getMultisigInfo = (multisig) => __awaiter(this, void 0, void 0, function* () {
        const info = yield Node.getConnection().getAccountInfo(multisig);
        if (info === null) {
            return Result.err(Error('Failed to find multisig'));
        }
        if (!info.owner.equals(TOKEN_PROGRAM_ID)) {
            return Result.err(Error('Invalid multisig owner'));
        }
        if (info.data.length !== MultisigInstruction.Layout.span) {
            return Result.err(Error('Invalid multisig size'));
        }
        const data = Buffer.from(info.data);
        const multisigInfo = MultisigInstruction.Layout.decode(data);
        multisigInfo.signer1 = new PublicKey(multisigInfo.signer1);
        multisigInfo.signer2 = new PublicKey(multisigInfo.signer2);
        multisigInfo.signer3 = new PublicKey(multisigInfo.signer3);
        multisigInfo.signer4 = new PublicKey(multisigInfo.signer4);
        multisigInfo.signer5 = new PublicKey(multisigInfo.signer5);
        multisigInfo.signer6 = new PublicKey(multisigInfo.signer6);
        multisigInfo.signer7 = new PublicKey(multisigInfo.signer7);
        multisigInfo.signer8 = new PublicKey(multisigInfo.signer8);
        multisigInfo.signer9 = new PublicKey(multisigInfo.signer9);
        multisigInfo.signer10 = new PublicKey(multisigInfo.signer10);
        multisigInfo.signer11 = new PublicKey(multisigInfo.signer11);
        return Result.ok(multisigInfo);
    });
    Multisig.create = (m, feePayer, signerPubkey) => __awaiter(this, void 0, void 0, function* () {
        if (m > signerPubkey.length)
            return Result.err(Error('signers number less than m number'));
        const account = Keypair.generate();
        const connection = Node.getConnection();
        const balanceNeeded = yield connection.getMinimumBalanceForRentExemption(MultisigInstruction.Layout.span)
            .then(Result.ok)
            .catch(Result.err);
        if (balanceNeeded.isErr)
            return Result.err(balanceNeeded.error);
        const inst1 = MultisigInstruction.account(account, feePayer, balanceNeeded.value);
        const inst2 = MultisigInstruction.multisig(m, account, signerPubkey);
        return Result.ok(new Instruction([inst1, inst2], [account], feePayer, account.publicKey.toBase58()));
    });
})(Multisig || (Multisig = {}));
