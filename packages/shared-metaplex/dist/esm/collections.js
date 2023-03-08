export var Collections;
(function (Collections) {
    Collections.toInputConvert = (input) => (!input ? null : input.toPublicKey());
    Collections.toInputAuthorityConvert = (input) => (!input ? null : input.toKeypair());
    Collections.toOutputConvert = (output) => {
        return !output
            ? null
            : {
                address: output.address.toString(),
                verified: output.verified,
            };
    };
})(Collections || (Collections = {}));
//# sourceMappingURL=collections.js.map