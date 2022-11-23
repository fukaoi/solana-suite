"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplToken = void 0;
const add_1 = require("./add");
const mint_1 = require("./mint");
exports.SplToken = Object.assign(Object.assign({}, add_1.SplTokenPhantom), mint_1.SplTokenPhantom);
