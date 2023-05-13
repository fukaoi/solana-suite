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
exports.Metaplex = void 0;
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const core_1 = require("@solana-suite/core");
var Metaplex;
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
        const sortable = !(options === null || options === void 0 ? void 0 : options.sortable) ? core_1.Sortable.Desc : options === null || options === void 0 ? void 0 : options.sortable;
        const isHolder = !(options === null || options === void 0 ? void 0 : options.isHolder) ? true : false;
        yield core_1.SplToken.genericFindByOwner(owner, callback, shared_metaplex_1.UserSideInput.TokenStandard.NonFungible, sortable, isHolder);
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
//# sourceMappingURL=find.js.map