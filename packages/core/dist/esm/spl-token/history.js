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
import { Node, Result } from '@solana-suite/shared';
import { FilterType, ModuleName } from '../types/';
import { Signatures } from '../signatures';
import { TransactionFilter } from '../transaction-filter';
export var SplToken;
(function (SplToken) {
    SplToken.getHistory = (target, filterType, callback, narrowDown = 1000 // Max number: 1000
    ) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (filterType === FilterType.Memo) {
                const parser = TransactionFilter.parse(filterType, ModuleName.SplToken);
                yield Signatures.getForAdress(target, parser, callback, narrowDown);
            }
            else {
                const tokenAccounts = yield Node.getConnection().getParsedTokenAccountsByOwner(target.toPublicKey(), {
                    programId: TOKEN_PROGRAM_ID,
                });
                for (const account of tokenAccounts.value) {
                    const parser = TransactionFilter.parse(filterType, ModuleName.SplToken);
                    yield Signatures.getForAdress(account.pubkey.toString(), parser, callback, narrowDown);
                }
            }
        }
        catch (e) {
            if (e instanceof Error) {
                callback(Result.err(e));
            }
        }
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=history.js.map