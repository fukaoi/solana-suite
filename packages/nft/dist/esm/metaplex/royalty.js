export var MetaplexRoyalty;
(function (MetaplexRoyalty) {
    MetaplexRoyalty.THRESHOLD = 100;
    MetaplexRoyalty.convertValue = (percentage) => {
        return percentage * MetaplexRoyalty.THRESHOLD;
    };
})(MetaplexRoyalty || (MetaplexRoyalty = {}));
