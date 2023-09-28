import defineConfig from "node_modules/build-configs/tsup/base";

const entry = {
  account: "src/account/index.ts",
  converter: "src/converter/index.ts",
  storage: "src/storage/index.ts",
  validator: "src/validator/index.ts",
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
