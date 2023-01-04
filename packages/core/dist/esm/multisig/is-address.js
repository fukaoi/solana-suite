var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Try } from '@solana-suite/shared';
import { Multisig as _Get } from './get-info';
export var Multisig;
(function (Multisig) {
    Multisig.isAddress = (multisig) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const info = yield _Get.getInfo(multisig);
            if (info.isErr) {
                return false;
            }
            return true;
        }));
    });
})(Multisig || (Multisig = {}));
//# sourceMappingURL=is-address.js.map