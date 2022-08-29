var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { debugLog, Constants, ConstantsFunc, Result, } from './';
import { Connection, } from '@solana/web3.js';
export var Node;
(function (Node) {
    let cluster;
    let commitment;
    Node.getConnection = () => {
        // default setting
        if (!cluster) {
            cluster = ConstantsFunc.switchCluster(Constants.currentCluster);
        }
        // default setting
        if (!commitment) {
            commitment = Constants.COMMITMENT;
        }
        debugLog('# Node info: ', cluster, commitment);
        return new Connection(cluster, commitment);
    };
    Node.changeConnection = (param) => {
        if (param.commitment) {
            debugLog('# Node change commitment: ', commitment);
            commitment = param.commitment;
        }
        if (param.cluster) {
            debugLog('# Node change cluster: ', cluster);
            cluster = ConstantsFunc.switchCluster(param.cluster);
        }
    };
    Node.confirmedSig = (signature, commitment = Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        /** @deprecated Instead, call `confirmTransaction` using a `TransactionConfirmationConfig` */
        return yield Node.getConnection().confirmTransaction(signature, commitment)
            .then(Result.ok)
            .catch(Result.err);
    });
})(Node || (Node = {}));
