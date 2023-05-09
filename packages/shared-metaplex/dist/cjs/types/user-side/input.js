"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSideInput = void 0;
var UserSideInput;
(function (UserSideInput) {
    let TokenStandard;
    (function (TokenStandard) {
        TokenStandard[TokenStandard["NonFungible"] = 0] = "NonFungible";
        TokenStandard[TokenStandard["FungibleAsset"] = 1] = "FungibleAsset";
        TokenStandard[TokenStandard["Fungible"] = 2] = "Fungible";
        TokenStandard[TokenStandard["NonFungibleEdition"] = 3] = "NonFungibleEdition";
        TokenStandard[TokenStandard["ProgrammableNonFungible"] = 4] = "ProgrammableNonFungible";
    })(TokenStandard = UserSideInput.TokenStandard || (UserSideInput.TokenStandard = {}));
})(UserSideInput = exports.UserSideInput || (exports.UserSideInput = {}));
//# sourceMappingURL=input.js.map