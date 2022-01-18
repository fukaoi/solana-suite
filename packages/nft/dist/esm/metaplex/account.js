var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PublicKey, } from '@solana/web3.js';
import { Constants, Result } from '@solana-suite/shared';
export var MetaplexAccount;
(function (MetaplexAccount) {
    MetaplexAccount.findMetaplexAssocaiatedTokenAddress = (tokenKey) => __awaiter(this, void 0, void 0, function* () {
        return yield PublicKey.findProgramAddress([
            Buffer.from('metadata'),
            Constants.METAPLEX_PROGRAM_ID.toBuffer(),
            tokenKey.toBuffer(),
        ], Constants.METAPLEX_PROGRAM_ID)
            .then(v => Result.ok(v[0]))
            .catch((e) => Result.err(e));
    });
})(MetaplexAccount || (MetaplexAccount = {}));
