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
import { Constants, debugLog, Instruction, Node, Try } from './';
import { MAX_RETRIES } from './instruction/define';
export class MintInstruction extends Instruction {
    constructor(instructions, signers, feePayer, data) {
        super(instructions, signers, feePayer, data);
        this.submit = () => __awaiter(this, void 0, void 0, function* () {
            return Try(() => __awaiter(this, void 0, void 0, function* () {
                if (!(this instanceof MintInstruction)) {
                    throw Error('only MintInstruction object that can use this');
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
                if (Constants.currentCluster === Constants.Cluster.prd) {
                    debugLog('# Change metaplex cluster on mainnet-beta');
                    Node.changeConnection({ cluster: Constants.Cluster.prdMetaplex });
                }
                return yield sendAndConfirmTransaction(Node.getConnection(), transaction, finalSigners, options);
            }));
        });
    }
}
