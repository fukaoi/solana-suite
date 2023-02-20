//@internal
export var SplToken;
(function (SplToken) {
    SplToken.calculateAmount = (amount, mintDecimal) => {
        return amount * Math.pow(10, mintDecimal);
    };
})(SplToken || (SplToken = {}));
//# sourceMappingURL=calculate-amount.js.map