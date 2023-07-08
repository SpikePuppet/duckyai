import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["esm"],
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: true,
  dts: true,
  shims: true,
  platform: "node",
  banner: {
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
  },
});
