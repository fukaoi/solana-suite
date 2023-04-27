export var Collections;
(function (Collections) {
    Collections.toConvertInfra = (input) => {
        if (!input) {
            return null;
        }
        return {
            key: input.toPublicKey(),
            verified: false,
        };
    };
    Collections.toConvertUser = (output) => {
        if (!output) {
            return null;
        }
        return {
            address: output.address.toString(),
            verified: output.verified,
        };
    };
})(Collections || (Collections = {}));
//# sourceMappingURL=collections.js.map