var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PublicKey, Keypair, } from '@solana/web3.js';
import bs from 'bs58';
import { Constants, Result, Instruction, } from './';
// @ts-ignore
Array.prototype.submit = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const instructions = [];
        this.forEach((obj, i) => {
            if (obj.isErr) {
                return Result.err(Error(`[Array index: ${i}]${obj.error.message}`));
            }
            else if (obj.isOk) {
                instructions.push(obj.value);
            }
            else {
                instructions.push(obj);
            }
        });
        return yield Instruction.batchSubmit(instructions);
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
    try {
        /* tslint:disable-next-line */
        new PublicKey(this);
        return `https://solscan.io/account/${this}?cluster=${Constants.currentNetwork}`;
        // return `https://explorer.solana.com/address/${this}?cluster=${Constants.currentNetwork}`;
    }
    catch (_) {
        return `https://solscan.io/tx/${this}?cluster=${Constants.currentNetwork}`;
        // return `https://explorer.solana.com/tx/${this}?cluster=${Constants.currentNetwork}`;
    }
};
console.debug = (data, data2 = '', data3 = '') => {
    if (Constants.isDebugging)
        console.log(`\u001b[34m`, data, `\u001b[35m`, data2, `\u001b[36m`, data3);
};
console.error = (data, data2 = '', data3 = '') => {
    console.log(`\u001b[31m`, data, `\u001b[4m\u001b[31m`, data2, `\u001b[0m\u001b[31m`, data3);
};
export const tryCatch = (fn) => {
    try {
        return Result.ok(fn());
    }
    catch (e) {
        return Result.err(e);
    }
};
