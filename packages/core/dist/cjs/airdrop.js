"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airdrop = void 0;
const shared_1 = require("@solana-suite/shared");
var Airdrop;
(function (Airdrop) {
    const DEFAULT_AIRDROP_AMOUNT = 1;
    const MAX_AIRDROP_SOL = 2;
    Airdrop.request = (pubkey, airdropAmount) => __awaiter(this, void 0, void 0, function* () {
        (0, shared_1.debugLog)('Now airdropping...please wait');
        airdropAmount = !airdropAmount
            ? DEFAULT_AIRDROP_AMOUNT.toLamports()
            : airdropAmount.toLamports();
        if (airdropAmount > MAX_AIRDROP_SOL.toLamports()) {
            return shared_1.Result.err(Error(`Over max airdrop amount: ${airdropAmount}`));
        }
        const sig = yield shared_1.Node.getConnection()
            .requestAirdrop(pubkey, airdropAmount)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (sig.isErr) {
            return shared_1.Result.err(Error(`Failed airdrop. ${sig.error.message}`));
        }
        yield shared_1.Node.confirmedSig(sig.value);
        return shared_1.Result.ok('success');
    });
})(Airdrop = exports.Airdrop || (exports.Airdrop = {}));
