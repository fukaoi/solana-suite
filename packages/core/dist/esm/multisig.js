var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, Instruction, Try } from '@solana-suite/shared';
import { PublicKey, Keypair } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Internals_Multisig } from './internals/_multisig';
export var Multisig;
(function (Multisig) {
    Multisig.isAddress = (multisig) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const info = yield Multisig.getMultisigInfo(multisig);
            if (info.isErr) {
                return false;
            }
            return true;
        }));
    });
    Multisig.getMultisigInfo = (multisig) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const info = yield Node.getConnection().getAccountInfo(multisig);
            if (info === null) {
                throw Error('Failed to find multisig');
            }
            if (!info.owner.equals(TOKEN_PROGRAM_ID)) {
                throw Error('Invalid multisig owner');
            }
            if (info.data.length !== Internals_Multisig.Layout.span) {
                throw Error('Invalid multisig size');
            }
            const data = Buffer.from(info.data);
            const multisigInfo = Internals_Multisig.Layout.decode(data);
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
            return multisigInfo;
        }));
    });
    Multisig.create = (m, feePayer, signerPubkey) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            if (m > signerPubkey.length) {
                throw Error('signers number less than m number');
            }
            const account = Keypair.generate();
            const connection = Node.getConnection();
            const balanceNeeded = yield connection.getMinimumBalanceForRentExemption(Internals_Multisig.Layout.span);
            const inst1 = Internals_Multisig.account(account, feePayer, balanceNeeded);
            const inst2 = Internals_Multisig.multisig(m, account, signerPubkey);
            return new Instruction([inst1, inst2], [account], feePayer, account.publicKey.toBase58());
        }));
    });
})(Multisig || (Multisig = {}));
