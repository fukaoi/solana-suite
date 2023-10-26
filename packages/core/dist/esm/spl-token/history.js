var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { debugLog, Node } from '@solana-suite/shared';
import { FilterType, ModuleName, } from '../types/';
import { Signatures } from '../signatures';
import { TransactionFilter } from '../transaction-filter';
export var SplToken;
(function (SplToken) {
    SplToken.getHistory = (target, filterType, onOk, onErr, options = {}) => __awaiter(this, void 0, void 0, function* () {
        try {
            const defaultValues = {
                waitTime: 0.03,
                narrowDown: 100,
            };
            const mergedOptions = Object.assign(Object.assign({}, defaultValues), options);
            if (filterType === FilterType.Memo) {
                const parser = TransactionFilter.parse(filterType, ModuleName.SplToken);
                yield Signatures.getForAdress(target, parser, (result) => result.match(onOk, onErr), mergedOptions);
            }
            else {
                const tokenAccounts = yield Node.getConnection().getParsedTokenAccountsByOwner(target.toPublicKey(), {
                    programId: TOKEN_PROGRAM_ID,
                });
                const storedHistories = [];
                debugLog('# tokenAccounts size: ', tokenAccounts.value.length);
                for (const account of tokenAccounts.value) {
                    const parser = TransactionFilter.parse(filterType, ModuleName.SplToken);
                    yield Signatures.getForAdress(account.pubkey.toString(), parser, (result) => result.match(onOk, onErr), mergedOptions, storedHistories);
                }
            }
        }
        catch (e) {
            if (e instanceof Error) {
                onErr(e);
            }
        }
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=history.js.map