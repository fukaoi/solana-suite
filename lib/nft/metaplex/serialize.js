"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexSerialize = void 0;
const bs58_1 = __importDefault(require("bs58"));
const python_struct_1 = __importDefault(require("python-struct"));
const util_1 = require("util");
const constants_1 = require("../../constants");
var MetaplexSerialize;
(function (MetaplexSerialize) {
    MetaplexSerialize.initData = () => {
        return {
            publishAddress: '',
            mintKey: '',
            name: '',
            symbol: '',
            uri: '',
            fee: 0
        };
    };
    const REPLACE = new RegExp('\u0000', 'g');
    MetaplexSerialize.decode = (data) => {
        const decodeData = MetaplexSerialize.initData();
        const textDecoder = new util_1.TextDecoder();
        let i = 1;
        decodeData.publishAddress = bs58_1.default.encode(python_struct_1.default.unpack(`<${'B'.repeat(32)}`, data.slice(i, i + 32)));
        i += 32;
        decodeData.mintKey = bs58_1.default.encode(python_struct_1.default.unpack(`<${'B'.repeat(32)}`, data.slice(i, i + 32)));
        if (decodeData.mintKey === constants_1.Constants.SYSTEM_PROGRAM_ID)
            return undefined;
        i += 32;
        const nameLength = python_struct_1.default.unpack('<I', data.slice(i, i + 4))[0];
        i += 4;
        if (nameLength !== 32)
            return undefined;
        const nameBuffer = python_struct_1.default.unpack(`<${'B'.repeat(nameLength)}`, data.slice(i, i + nameLength));
        decodeData.name = textDecoder.decode(Uint8Array.from(nameBuffer)).replace(REPLACE, '');
        i += nameLength;
        const symbolLength = python_struct_1.default.unpack('<I', data.slice(i, i + 4))[0];
        i += 4;
        const symbolBuffer = python_struct_1.default.unpack(`<${'B'.repeat(symbolLength)}`, data.slice(i, i + symbolLength));
        decodeData.symbol = textDecoder.decode(Uint8Array.from(symbolBuffer)).replace(REPLACE, '');
        i += symbolLength;
        const uriLength = python_struct_1.default.unpack('<I', data.slice(i, i + 4))[0];
        i += 4;
        const uriBuffer = python_struct_1.default.unpack(`<${'B'.repeat(uriLength)}`, data.slice(i, i + uriLength));
        decodeData.uri = textDecoder.decode(Uint8Array.from(uriBuffer)).replace(REPLACE, '');
        i += uriLength;
        decodeData.fee = parseInt(python_struct_1.default.unpack('<h', data.slice(i, i + 2))[0].toString(), 10);
        return decodeData;
    };
})(MetaplexSerialize = exports.MetaplexSerialize || (exports.MetaplexSerialize = {}));
