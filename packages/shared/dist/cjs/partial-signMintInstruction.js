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
exports.PartialSignMintInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const _1 = require("./");
const define_1 = require("./instruction/define");
class PartialSignMintInstruction {
    constructor(instructions, mint) {
        this.submit = (feePayer) => __awaiter(this, void 0, void 0, function* () {
            return (0, _1.Try)(() => __awaiter(this, void 0, void 0, function* () {
                if (!(this instanceof PartialSignMintInstruction)) {
                    throw Error('only PartialSignInstruction object that can use this');
                }
                const decode = Buffer.from(this.hexInstruction, 'hex');
                const transactionFromJson = web3_js_1.Transaction.from(decode);
                transactionFromJson.partialSign(feePayer.toKeypair());
                const options = {
                    maxRetries: define_1.MAX_RETRIES,
                };
                if (_1.Node.getConnection().rpcEndpoint === _1.Constants.EndPointUrl.prd) {
                    (0, _1.debugLog)('# Change metaplex cluster on mainnet-beta');
                    _1.Node.changeConnection({ cluster: _1.Constants.Cluster.prdMetaplex });
                }
                const wireTransaction = transactionFromJson.serialize();
                return yield _1.Node.getConnection().sendRawTransaction(wireTransaction, options);
            }));
        });
        this.hexInstruction = instructions;
        this.data = mint; // Variables for mint address
    }
}
exports.PartialSignMintInstruction = PartialSignMintInstruction;
//# sourceMappingURL=partial-signMintInstruction.js.map