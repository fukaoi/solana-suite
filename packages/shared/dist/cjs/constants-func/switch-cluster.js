"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantsFunc = void 0;
const constants_1 = require("../constants");
var ConstantsFunc;
(function (ConstantsFunc) {
    ConstantsFunc.switchCluster = (env, customUrl = constants_1.Constants.customUrl) => {
        switch (env) {
            case constants_1.Constants.Cluster.prd:
                return constants_1.Constants.EndPointUrl.prd;
            case constants_1.Constants.Cluster.prd2:
                return constants_1.Constants.EndPointUrl.prd2;
            case constants_1.Constants.Cluster.test:
                return constants_1.Constants.EndPointUrl.test;
            case constants_1.Constants.Cluster.dev:
                return constants_1.Constants.EndPointUrl.dev;
            case constants_1.Constants.Cluster.prdrr: {
                // don't require rigor, as it can be repeated alternately
                const index = Date.now() % 4;
                const clusters = [
                    constants_1.Constants.EndPointUrl.prd,
                    constants_1.Constants.EndPointUrl.prd2,
                    constants_1.Constants.EndPointUrl.prd,
                    constants_1.Constants.EndPointUrl.prd2,
                ];
                return clusters[index];
            }
            case constants_1.Constants.Cluster.custom:
                return customUrl;
            default:
                return constants_1.Constants.EndPointUrl.localhost;
        }
    };
})(ConstantsFunc = exports.ConstantsFunc || (exports.ConstantsFunc = {}));
