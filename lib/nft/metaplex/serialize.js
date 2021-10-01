"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexSerialize = void 0;
const borsh_1 = require("borsh");
const object_1 = require("./object");
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
            sellerFeeBasisPoints: '',
        };
    };
    MetaplexSerialize.serializeCreateArgs = (data) => {
        const value = new object_1.MetaplexObject.CreateMetadataArgs({ data, isMutable: true });
        return Buffer.from((0, borsh_1.serialize)(object_1.MetaplexObject.SCHEMA, value));
    };
    MetaplexSerialize.serializeUpdateArgs = (data, newUpdateAuthority, primarySaleHappened) => {
        const value = new object_1.MetaplexObject.UpdateMetadataArgs({
            data,
            updateAuthority: !newUpdateAuthority ? undefined : newUpdateAuthority,
            primarySaleHappened: primarySaleHappened === null || primarySaleHappened === undefined
                ? null
                : primarySaleHappened,
        });
        return Buffer.from((0, borsh_1.serialize)(object_1.MetaplexObject.SCHEMA, value));
    };
    MetaplexSerialize.decode = (data) => {
        const decoded = (0, borsh_1.deserializeUnchecked)(object_1.MetaplexObject.SCHEMA, object_1.MetaplexObject.Metadata, data);
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
