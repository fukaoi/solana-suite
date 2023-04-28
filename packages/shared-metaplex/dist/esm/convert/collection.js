export var Convert;
(function (Convert) {
    var Collection;
    (function (Collection) {
        Collection.intoInfraSide = (input) => {
            if (!input) {
                return null;
            }
            return {
                key: input.toPublicKey(),
                verified: false,
            };
        };
        Collection.intoUserSide = (output) => {
            if (!output) {
                return null;
            }
            return {
                address: output.address.toString(),
                verified: output.verified,
            };
        };
    })(Collection = Convert.Collection || (Convert.Collection = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=collection.js.map