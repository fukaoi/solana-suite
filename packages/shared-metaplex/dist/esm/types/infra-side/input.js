export var InfraSideInput;
(function (InfraSideInput) {
    let TokenStandard;
    (function (TokenStandard) {
        TokenStandard[TokenStandard["NonFungible"] = 0] = "NonFungible";
        TokenStandard[TokenStandard["FungibleAsset"] = 1] = "FungibleAsset";
        TokenStandard[TokenStandard["Fungible"] = 2] = "Fungible";
        TokenStandard[TokenStandard["NonFungibleEdition"] = 3] = "NonFungibleEdition";
        TokenStandard[TokenStandard["ProgrammableNonFungible"] = 4] = "ProgrammableNonFungible";
    })(TokenStandard = InfraSideInput.TokenStandard || (InfraSideInput.TokenStandard = {}));
})(InfraSideInput || (InfraSideInput = {}));
//# sourceMappingURL=input.js.map