var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserSideInput } from '@solana-suite/shared-metaplex';
import { Sortable, SplToken } from '@solana-suite/core';
export var Metaplex;
(function (Metaplex) {
    /**
     * Fetch minted metadata by owner Pubkey
     *
     * @param {Pubkey} owner
     * @param {Sortable} callback
     * @param {{sortable?: Sortable, isHolder?: boolean}} options?
     * @return Promise<Result<never, Error>>
     */
    Metaplex.findByOwner = (owner, callback, options) => __awaiter(this, void 0, void 0, function* () {
        const sortable = !(options === null || options === void 0 ? void 0 : options.sortable) ? Sortable.Desc : options === null || options === void 0 ? void 0 : options.sortable;
        const isHolder = !(options === null || options === void 0 ? void 0 : options.isHolder) ? true : false;
        yield SplToken.genericFindByOwner(owner, callback, UserSideInput.TokenStandard.NonFungible, sortable, isHolder);
    });
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=find.js.map