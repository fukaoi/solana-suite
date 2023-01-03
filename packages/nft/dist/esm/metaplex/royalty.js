//@internal
export var Metaplex;
(function (Metaplex) {
    Metaplex.THRESHOLD = 100;
    Metaplex.convertRoyalty = (percentage) => {
        return percentage * Metaplex.THRESHOLD;
    };
})(Metaplex || (Metaplex = {}));
