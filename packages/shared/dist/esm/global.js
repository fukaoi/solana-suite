var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PublicKey, Keypair } from '@solana/web3.js';
import { Constants, Result } from './';
import { Internals_Instruction } from './internals/_instruction';
import bs from 'bs58';
import './types/global';
// @ts-ignore
Array.prototype.submit = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const instructions = [];
        // dont use forEach
        // It is not possible to stop the process by RETURN in the middle of the process.
        let i = 0;
        for (const obj of this) {
            if (obj.isErr) {
                return Result.err(Error(`[Array index of caught 'Result.err': ${i}]${obj.error.message}`));
            }
            else if (obj.isOk) {
                instructions.push(obj.value);
            }
            else {
                instructions.push(obj);
            }
            i++;
        }
        return yield Internals_Instruction.batchSubmit(instructions);
    });
};
String.prototype.toPublicKey = function () {
    return new PublicKey(this);
};
String.prototype.toKeypair = function () {
    const decoded = bs.decode(this);
    return Keypair.fromSecretKey(decoded);
};
String.prototype.toExplorerUrl = function () {
    let cluster = Constants.currentCluster;
    if (Constants.currentCluster === 'localhost-devnet') {
        cluster = 'devnet';
    }
    try {
        /* tslint:disable-next-line */
        new PublicKey(this);
        return `https://solscan.io/account/${this}?cluster=${cluster}`;
    }
    catch (_) {
        return `https://solscan.io/tx/${this}?cluster=${cluster}`;
    }
};
export const debugLog = (data, data2 = '', data3 = '') => {
    if (Constants.isDebugging || process.env.DEBUG) {
        console.log('[DEBUG]', data, data2, data3);
    }
};
export const sleep = (sec) => __awaiter(void 0, void 0, void 0, function* () { return new Promise((r) => setTimeout(r, sec * 1000)); });
export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const isNode = typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null;
