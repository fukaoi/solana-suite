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
export var SplToken;
(function (SplToken) {
    SplToken.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        const res = yield Node.getConnection()
            .getParsedTokenAccountsByOwner(owner, {
            programId: TOKEN_PROGRAM_ID,
        })
            .then(Result.ok)
            .catch(Result.err);
        if (res.isErr) {
            return Result.err(Error(res.error));
        }
        const info = res.unwrap().value.reduce((arr, d) => {
            if (d.account.data.parsed.info.tokenAmount.uiAmount > 0) {
                arr.push({
                    owner: owner.toString(),
                    mint: d.account.data.parsed.info.mint,
                    amount: d.account.data.parsed.info.tokenAmount.uiAmount,
                    tokenAccount: d.pubkey.toString(),
                });
            }
            return arr;
        }, []);
        return Result.ok(info);
    });
})(SplToken || (SplToken = {}));
