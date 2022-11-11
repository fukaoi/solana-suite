import { ConstantsFunc as Bundlr } from './switch-bundlr';
import { ConstantsFunc as Cluster } from './switch-cluster';
export const ConstantsFunc = Object.assign(Object.assign({}, Bundlr), Cluster);
