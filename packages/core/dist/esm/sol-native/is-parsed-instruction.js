//@internal
export var SolNative;
(function (SolNative) {
    // Parsed transaction instruction, Type Guard
    SolNative.isParsedInstruction = (arg) => {
        return arg !== null && typeof arg === 'object' && 'parsed' in arg;
    };
})(SolNative || (SolNative = {}));
