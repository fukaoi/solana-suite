"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const collection_1 = require("./collection");
const creators_1 = require("./creators");
const nft_metadata_1 = require("./nft-metadata");
const properties_1 = require("./properties");
const token_metadata_1 = require("./token-metadata");
exports.Convert = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, collection_1.Convert), creators_1.Convert), nft_metadata_1.Convert), properties_1.Convert), token_metadata_1.Convert);
//# sourceMappingURL=index.js.map