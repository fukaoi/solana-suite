import defineConfig from "./node_modules/build-configs/tsup/base";

const format = ["esm"];
defineConfig.format = format;
const config = defineConfig;
export default config;
