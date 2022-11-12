import { Constants } from '../constants';
export var ConstantsFunc;
(function (ConstantsFunc) {
    ConstantsFunc.switchCluster = (env, customUrl = Constants.customUrl) => {
        switch (env) {
            case Constants.Cluster.prd:
                return Constants.EndPointUrl.prd;
            case Constants.Cluster.prd2:
                return Constants.EndPointUrl.prd2;
            case Constants.Cluster.test:
                return Constants.EndPointUrl.test;
            case Constants.Cluster.dev:
                return Constants.EndPointUrl.dev;
            case Constants.Cluster.prdrr: {
                // don't require rigor, as it can be repeated alternately
                const index = Date.now() % 4;
                const clusters = [
                    Constants.EndPointUrl.prd,
                    Constants.EndPointUrl.prd2,
                    Constants.EndPointUrl.prd,
                    Constants.EndPointUrl.prd2,
                ];
                return clusters[index];
            }
            case Constants.Cluster.custom:
                return customUrl;
            default:
                return Constants.EndPointUrl.localhost;
        }
    };
})(ConstantsFunc || (ConstantsFunc = {}));
