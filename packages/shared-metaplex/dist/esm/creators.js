export var Creators;
(function (Creators) {
    Creators.toInputConvert = (input) => {
        if (!input) {
            return [];
        }
        return input.map((data) => {
            const authority = data.authority ? data.authority.toKeypair() : undefined;
            const modify = {
                address: data.address.toPublicKey(),
                share: data.share,
                authority: authority,
            };
            return modify;
        });
    };
    Creators.toOutputConvert = (output) => {
        return output.map((data) => {
            const modify = {
                address: data.address.toString(),
                share: data.share,
                verified: data.verified,
            };
            return modify;
        });
    };
})(Creators || (Creators = {}));
//# sourceMappingURL=creators.js.map