"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolNative = void 0;
const find_1 = require("./find");
const history_1 = require("./history");
const transfer_1 = require("./transfer");
exports.SolNative = Object.assign(Object.assign(Object.assign({}, find_1.SolNative), history_1.SolNative), transfer_1.SolNative);
