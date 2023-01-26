export var Royalty;
(function (Royalty) {
    Royalty.THRESHOLD = 100;
    Royalty.convert = (percentage) => {
        return percentage * Royalty.THRESHOLD;
    };
})(Royalty || (Royalty = {}));
//# sourceMappingURL=royalty.js.map