var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Result } from '@solana-suite/shared';
import { Signatures } from '../signatures';
import { TransactionFilter } from '../transaction-filter';
export var SplToken;
(function (SplToken) {
    SplToken.getHistory = (mint, target, filterType, callback, narrowDown = 1000 // Max number
    ) => __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenAccount = yield getAssociatedTokenAddress(mint.toPublicKey(), target.toPublicKey(), true);
            const parser = TransactionFilter.parse(filterType);
            yield Signatures.getForAdress(tokenAccount.toString(), parser, callback, narrowDown);
        }
        catch (e) {
            if (e instanceof Error) {
                callback(Result.err(e));
            }
        }
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=history.js.map