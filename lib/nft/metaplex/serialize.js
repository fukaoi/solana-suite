"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexSerialize = void 0;
const borsh_1 = require("borsh");
const _1 = require("./");
const web3_js_1 = require("@solana/web3.js");
var MetaplexSerialize;
(function (MetaplexSerialize) {
    const REPLACE = new RegExp('\u0000', 'g');
    MetaplexSerialize.initData = () => {
        return {
            updateAuthority: '',
            mint: '',
            name: '',
            symbol: '',
            uri: '',
        };
    };
    MetaplexSerialize.serializeCreateArgs = (data) => {
        const value = new _1.MetaplexInstructure.CreateMetadataArgs({ data, isMutable: true });
        return Buffer.from((0, borsh_1.serialize)(_1.MetaplexInstructure.SCHEMA, value));
    };
    MetaplexSerialize.serializeUpdateArgs = (data, newUpdateAuthority, primarySaleHappened) => {
        const value = new _1.MetaplexInstructure.UpdateMetadataArgs({
            data,
            updateAuthority: !newUpdateAuthority ? undefined : newUpdateAuthority,
            primarySaleHappened: primarySaleHappened === null || primarySaleHappened === undefined
                ? null
                : primarySaleHappened,
        });
        return Buffer.from((0, borsh_1.serialize)(_1.MetaplexInstructure.SCHEMA, value));
    };
    MetaplexSerialize.decode = (data) => {
        const decoded = (0, borsh_1.deserializeUnchecked)(_1.MetaplexInstructure.SCHEMA, _1.MetaplexInstructure.Metadata, data);
        const name = decoded.data.name.replace(REPLACE, '');
        const symbol = decoded.data.symbol.replace(REPLACE, '');
        const uri = decoded.data.uri.replace(REPLACE, '');
        const updateAuthority = new web3_js_1.PublicKey(decoded.updateAuthority).toBase58();
        const mint = new web3_js_1.PublicKey(decoded.mint).toBase58();
        const sellerFeeBasisPoints = decoded.data.sellerFeeBasisPoints;
        return {
            name,
            symbol,
            uri,
            updateAuthority,
            mint,
            sellerFeeBasisPoints
        };
    };
})(MetaplexSerialize = exports.MetaplexSerialize || (exports.MetaplexSerialize = {}));
