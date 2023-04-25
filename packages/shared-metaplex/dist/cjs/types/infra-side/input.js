"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfraSide = void 0;
/////////// ONCHAIN  //////////////
var InfraSide;
(function (InfraSide) {
    var Input;
    (function (Input) {
        let TokenStandard;
        (function (TokenStandard) {
            TokenStandard[TokenStandard["NonFungible"] = 0] = "NonFungible";
            TokenStandard[TokenStandard["FungibleAsset"] = 1] = "FungibleAsset";
            TokenStandard[TokenStandard["Fungible"] = 2] = "Fungible";
            TokenStandard[TokenStandard["NonFungibleEdition"] = 3] = "NonFungibleEdition";
            TokenStandard[TokenStandard["ProgrammableNonFungible"] = 4] = "ProgrammableNonFungible";
        })(TokenStandard = Input.TokenStandard || (Input.TokenStandard = {}));
    })(Input = InfraSide.Input || (InfraSide.Input = {}));
})(InfraSide = exports.InfraSide || (exports.InfraSide = {}));
//# sourceMappingURL=input.js.map