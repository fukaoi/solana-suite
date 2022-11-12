"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplToken = void 0;
//@internal
var SplToken;
(function (SplToken) {
    SplToken.calculateAmount = (amount, mintDecimal) => {
        return amount * Math.pow(10, mintDecimal);
    };
})(SplToken = exports.SplToken || (exports.SplToken = {}));
