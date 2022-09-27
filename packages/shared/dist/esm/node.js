var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { debugLog, Constants, ConstantsFunc, Result } from './';
import { Connection, } from '@solana/web3.js';
export var Node;
(function (Node) {
    const options = {
        cluster: '',
        commitment: Constants.COMMITMENT,
    };
    Node.getConnection = () => {
        debugLog('# [Before] Node info: ', options.cluster, options.commitment);
        // default setting
        if (!options.cluster) {
            options.cluster = ConstantsFunc.switchCluster(Constants.currentCluster);
        }
        // default setting
        if (!options.commitment) {
            options.commitment = Constants.COMMITMENT;
        }
        debugLog('# [After] Node info: ', options.cluster, options.commitment);
        return new Connection(options.cluster, options.commitment);
    };
    Node.changeConnection = (param) => {
        if (param.commitment) {
            options.commitment = param.commitment;
            debugLog('# Node change commitment: ', options.commitment);
        }
        if (param.cluster) {
            options.cluster = ConstantsFunc.switchCluster(param.cluster);
            debugLog('# Node change cluster: ', options.cluster);
        }
    };
    Node.confirmedSig = (signature, commitment = Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        /** @deprecated Instead, call `confirmTransaction` using a `TransactionConfirmationConfig` */
        return yield Node.getConnection()
            .confirmTransaction(signature, commitment)
            .then(Result.ok)
            .catch(Result.err);
    });
})(Node || (Node = {}));
