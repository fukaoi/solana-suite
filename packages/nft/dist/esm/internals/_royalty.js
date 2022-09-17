export var Internals_Royalty;
(function (Internals_Royalty) {
    Internals_Royalty.THRESHOLD = 100;
    Internals_Royalty.convertValue = (percentage) => {
        return percentage * Internals_Royalty.THRESHOLD;
    };
})(Internals_Royalty || (Internals_Royalty = {}));
