var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Transaction, } from '@solana/web3.js';
import { Node } from './node';
import { Try } from './global';
import { MAX_RETRIES } from './instruction/define';
export class PartialSignInstruction {
    constructor(instructions) {
        this.submit = (feePayer) => __awaiter(this, void 0, void 0, function* () {
            return Try(() => __awaiter(this, void 0, void 0, function* () {
                if (!(this instanceof PartialSignInstruction)) {
                    throw Error('only PartialSignInstruction object that can use this');
                }
                const decode = Buffer.from(this.hexInstruction, 'hex');
                const transactionFromJson = Transaction.from(decode);
                transactionFromJson.partialSign(feePayer);
                const options = {
                    maxRetries: MAX_RETRIES,
                };
                const wireTransaction = transactionFromJson.serialize();
                return yield Node.getConnection().sendRawTransaction(wireTransaction, options);
            }));
        });
        this.hexInstruction = instructions;
    }
}
//# sourceMappingURL=partial-signInstruction.js.map