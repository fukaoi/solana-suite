var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { debugLog } from './global';
import { Result } from './result';
import { Constants } from './constants';
import { Connection, } from '@solana/web3.js';
export var Node;
(function (Node) {
    Node.options = {
        cluster: '',
        commitment: Constants.COMMITMENT,
    };
    Node.getConnection = () => {
        debugLog(`# [Before] cluster:${Node.options.cluster}, commitment:${Node.options.commitment}`);
        // default setting
        if (!Node.options.cluster) {
            Node.options.cluster = Constants.switchCluster(Constants.currentCluster);
        }
        // default setting
        if (!Node.options.commitment) {
            Node.options.commitment = Constants.COMMITMENT;
        }
        debugLog(`# [After] cluster:${Node.options.cluster}, commitment:${Node.options.commitment}`);
        return new Connection(Node.options.cluster, Node.options.commitment);
    };
    Node.changeConnection = (param) => {
        if (param.commitment) {
            Node.options.commitment = param.commitment;
            debugLog('# Node change commitment: ', Node.options.commitment);
        }
        if (param.cluster) {
            Node.options.cluster = Constants.switchCluster(param.cluster);
            debugLog('# Node change cluster: ', Node.options.cluster);
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
