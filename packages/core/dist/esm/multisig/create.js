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
import { Keypair } from '@solana/web3.js';
import { Multisig as MultisigInstruction } from './instruction';
export var Multisig;
(function (Multisig) {
    Multisig.create = (m, feePayer, signerPubkey) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            if (m > signerPubkey.length) {
                throw Error('signers number less than m number');
            }
            const account = Keypair.generate();
            const connection = Node.getConnection();
            const balanceNeeded = yield connection.getMinimumBalanceForRentExemption(MultisigInstruction.Layout.span);
            const inst1 = MultisigInstruction.account(account, feePayer, balanceNeeded);
            const inst2 = MultisigInstruction.multisig(m, account, signerPubkey);
            return new Instruction([inst1, inst2], [account], feePayer, account.publicKey.toBase58());
        }));
    });
})(Multisig || (Multisig = {}));
