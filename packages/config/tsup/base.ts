import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "internal/*": "../internal/*/src/index.ts",
  },
  format: ["cjs", "esm"],
  tsconfig: "./tsconfig.json",
  splitting: false,
  sourcemap: "inline",
  clean: true,
  dts: true,
});
