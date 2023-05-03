var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, debugLog, Try } from '@solana-suite/shared';
export var Airdrop;
(function (Airdrop) {
    const DEFAULT_AIRDROP_AMOUNT = 1;
    const MAX_AIRDROP_SOL = 2;
    Airdrop.request = (pubkey, airdropAmount) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            debugLog('Now airdropping...please wait');
            airdropAmount = !airdropAmount
                ? DEFAULT_AIRDROP_AMOUNT.toLamports()
                : airdropAmount.toLamports();
            if (airdropAmount > MAX_AIRDROP_SOL.toLamports()) {
                throw Error(`Over max airdrop amount: ${airdropAmount}, max: ${MAX_AIRDROP_SOL.toLamports()}`);
            }
            const sig = yield Node.getConnection().requestAirdrop(pubkey.toPublicKey(), airdropAmount);
            yield Node.confirmedSig(sig);
            return 'success';
        }));
    });
})(Airdrop || (Airdrop = {}));
//# sourceMappingURL=airdrop.js.map