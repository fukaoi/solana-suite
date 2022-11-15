"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolNative = void 0;
//@internal
var SolNative;
(function (SolNative) {
    // Parsed transaction instruction, Type Guard
    SolNative.isParsedInstruction = (arg) => {
        return arg !== null && typeof arg === 'object' && 'parsed' in arg;
    };
})(SolNative = exports.SolNative || (exports.SolNative = {}));
