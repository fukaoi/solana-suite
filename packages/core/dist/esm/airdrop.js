var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, Result, debugLog } from '@solana-suite/shared';
export var Airdrop;
(function (Airdrop) {
    const DEFAULT_AIRDROP_AMOUNT = 1;
    const MAX_AIRDROP_SOL = 2;
    Airdrop.request = (pubkey, airdropAmount) => __awaiter(this, void 0, void 0, function* () {
        debugLog('Now airdropping...please wait');
        airdropAmount = !airdropAmount
            ? DEFAULT_AIRDROP_AMOUNT.toLamports()
            : airdropAmount.toLamports();
        if (airdropAmount > MAX_AIRDROP_SOL.toLamports()) {
            return Result.err(Error(`Over max airdrop amount: ${airdropAmount}`));
        }
        const sig = yield Node.getConnection()
            .requestAirdrop(pubkey, airdropAmount)
            .then(Result.ok)
            .catch(Result.err);
        if (sig.isErr) {
            return Result.err(Error(`Failed airdrop. ${sig.error.message}`));
        }
        yield Node.confirmedSig(sig.value);
        return Result.ok('success');
    });
})(Airdrop || (Airdrop = {}));
