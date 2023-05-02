"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Shared = void 0;
var _Shared;
(function (_Shared) {
    let UseMethod;
    (function (UseMethod) {
        UseMethod[UseMethod["Burn"] = 0] = "Burn";
        UseMethod[UseMethod["Multiple"] = 1] = "Multiple";
        UseMethod[UseMethod["Single"] = 2] = "Single";
    })(UseMethod = _Shared.UseMethod || (_Shared.UseMethod = {}));
    let TokenStandard;
    (function (TokenStandard) {
        TokenStandard[TokenStandard["NonFungible"] = 0] = "NonFungible";
        TokenStandard[TokenStandard["FungibleAsset"] = 1] = "FungibleAsset";
        TokenStandard[TokenStandard["Fungible"] = 2] = "Fungible";
        TokenStandard[TokenStandard["NonFungibleEdition"] = 3] = "NonFungibleEdition";
        TokenStandard[TokenStandard["ProgrammableNonFungible"] = 4] = "ProgrammableNonFungible";
    })(TokenStandard = _Shared.TokenStandard || (_Shared.TokenStandard = {}));
})(_Shared = exports._Shared || (exports._Shared = {}));
//# sourceMappingURL=shared.js.map