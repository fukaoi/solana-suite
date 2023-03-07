var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sendAndConfirmTransaction, Transaction, } from '@solana/web3.js';
import { Node, Try } from '../';
import { MAX_RETRIES } from './define';
export class Instruction {
    constructor(instructions, signers, feePayer, data) {
        this.submit = () => __awaiter(this, void 0, void 0, function* () {
            return Try(() => __awaiter(this, void 0, void 0, function* () {
                if (!(this instanceof Instruction)) {
                    throw Error('only Instruction object that can use this');
                }
                const transaction = new Transaction();
                let finalSigners = this.signers;
                if (this.feePayer) {
                    transaction.feePayer = this.feePayer.publicKey;
                    finalSigners = [this.feePayer, ...this.signers];
                }
                this.instructions.forEach((inst) => transaction.add(inst));
                const options = {
                    maxRetries: MAX_RETRIES,
                };
                return yield sendAndConfirmTransaction(Node.getConnection(), transaction, finalSigners, options);
            }));
        });
        this.instructions = instructions;
        this.signers = signers;
        this.feePayer = feePayer;
        this.data = data;
    }
}
//# sourceMappingURL=index.js.map