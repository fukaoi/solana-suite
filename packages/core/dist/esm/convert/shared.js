export var Convert;
(function (Convert) {
    var Shared;
    (function (Shared) {
        Shared.convertTimestampToDate = (blockTime) => {
            return new Date(blockTime * 1000);
        };
    })(Shared = Convert.Shared || (Convert.Shared = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=shared.js.map