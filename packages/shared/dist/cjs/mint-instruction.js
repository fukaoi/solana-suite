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
exports.MintInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const _1 = require("./");
const define_1 = require("./instruction/define");
class MintInstruction extends _1.Instruction {
    constructor(instructions, signers, feePayer, data) {
        super(instructions, signers, feePayer, data);
        this.submit = () => __awaiter(this, void 0, void 0, function* () {
            return (0, _1.Try)(() => __awaiter(this, void 0, void 0, function* () {
                if (!(this instanceof MintInstruction)) {
                    throw Error('only MintInstruction object that can use this');
                }
                const transaction = new web3_js_1.Transaction();
                const blockhashObj = yield _1.Node.getConnection().getLatestBlockhash();
                transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
                transaction.recentBlockhash = blockhashObj.blockhash;
                let finalSigners = this.signers;
                if (this.feePayer) {
                    transaction.feePayer = this.feePayer.publicKey;
                    finalSigners = [this.feePayer, ...this.signers];
                }
                this.instructions.forEach((inst) => transaction.add(inst));
                const options = {
                    maxRetries: define_1.MAX_RETRIES,
                };
                if (_1.Node.getConnection().rpcEndpoint === _1.Constants.EndPointUrl.prd) {
                    (0, _1.debugLog)('# Change metaplex cluster on mainnet-beta');
                    _1.Node.changeConnection({ cluster: _1.Constants.Cluster.prdMetaplex });
                }
                return yield (0, web3_js_1.sendAndConfirmTransaction)(_1.Node.getConnection(), transaction, finalSigners, options);
            }));
        });
    }
}
exports.MintInstruction = MintInstruction;
//# sourceMappingURL=mint-instruction.js.map