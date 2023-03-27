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
import { Node, Try, debugLog, Constants } from './';
import { MAX_RETRIES } from './instruction/define';
export class PartialSignMintInstruction {
    constructor(instructions, mint) {
        this.submit = (feePayer) => __awaiter(this, void 0, void 0, function* () {
            return Try(() => __awaiter(this, void 0, void 0, function* () {
                if (!(this instanceof PartialSignMintInstruction)) {
                    throw Error('only PartialSignInstruction object that can use this');
                }
                const decode = Buffer.from(this.hexInstruction, 'hex');
                const transactionFromJson = Transaction.from(decode);
                transactionFromJson.partialSign(feePayer.toKeypair());
                const options = {
                    maxRetries: MAX_RETRIES,
                };
                if (Node.getConnection().rpcEndpoint === Constants.EndPointUrl.prd) {
                    debugLog('# Change metaplex cluster on mainnet-beta');
                    Node.changeConnection({ cluster: Constants.Cluster.prdMetaplex });
                }
                const wireTransaction = transactionFromJson.serialize();
                return yield Node.getConnection().sendRawTransaction(wireTransaction, options);
            }));
        });
        this.hexInstruction = instructions;
        this.data = mint; // Variables for mint address
    }
}
//# sourceMappingURL=partial-signMintInstruction.js.map