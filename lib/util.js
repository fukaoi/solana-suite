"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = exports.Default = void 0;
/////// GLOBAL FUNCTION //////
var Default;
(function (Default) {
    console.debug = (data, data2 = '') => {
        if (process.env.NODE_ENV === 'development'
            || process.env.NODE_ENV === 'testnet') {
            console.log(`\u001b[35m${data}`, `\u001b[36m${data2}`);
        }
    };
})(Default = exports.Default || (exports.Default = {}));
// export default module.exports;
/////// GLOBAL FUNCTION //////
var Util;
(function (Util) {
    Util.sleep = (sec) => __awaiter(this, void 0, void 0, function* () { return new Promise(r => setTimeout(r, sec * 1000)); });
    Util.dateFormat = () => {
        const t = new Date();
        return t.getFullYear() + '-' +
            ('0' + (t.getMonth() + 1)).slice(-2) + '-' +
            ('0' + (t.getDate())).slice(-2) + '/' +
            ('0' + t.getHours()).slice(-2) + ':' +
            ('0' + t.getMinutes()).slice(-2) + ':' +
            ('0' + t.getSeconds()).slice(-2);
    };
    Util.isEmpty = (val) => {
        if (val === null || val === undefined)
            return true;
        if (Array.isArray(val))
            return val.length > 0 ? false : true;
        if (typeof val === 'number')
            return false;
        console.log(Object.values(val).length);
        if (!Object.values(val).length)
            return false;
        return !Object.keys(val).length;
    };
})(Util = exports.Util || (exports.Util = {}));
