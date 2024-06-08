import defineConfig from "../build-configs/tsup/base";

const format = ["esm"];
defineConfig.format = format;
const config = defineConfig;
export default config;
