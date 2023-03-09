export var Collections;
(function (Collections) {
    Collections.toInputConvert = (input) => (!input ? null : input.toPublicKey());
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