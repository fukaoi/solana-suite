"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantsFunc = void 0;
const enum_1 = require("../constants/enum");
var ConstantsFunc;
(function (ConstantsFunc) {
    ConstantsFunc.switchCluster = (env, customUrl = enum_1.Constants.customUrl) => {
        switch (env) {
            case enum_1.Constants.Cluster.prd:
                return enum_1.Constants.EndPointUrl.prd;
            case enum_1.Constants.Cluster.prd2:
                return enum_1.Constants.EndPointUrl.prd2;
            case enum_1.Constants.Cluster.test:
                return enum_1.Constants.EndPointUrl.test;
            case enum_1.Constants.Cluster.dev:
                return enum_1.Constants.EndPointUrl.dev;
            case enum_1.Constants.Cluster.prdrr: {
                // don't require rigor, as it can be repeated alternately
                const index = Date.now() % 4;
                const clusters = [
                    enum_1.Constants.EndPointUrl.prd,
                    enum_1.Constants.EndPointUrl.prd2,
                    enum_1.Constants.EndPointUrl.prd,
                    enum_1.Constants.EndPointUrl.prd2,
                ];
                return clusters[index];
            }
            case enum_1.Constants.Cluster.custom:
                return customUrl;
            default:
                return enum_1.Constants.EndPointUrl.localhost;
        }
    };
})(ConstantsFunc = exports.ConstantsFunc || (exports.ConstantsFunc = {}));
