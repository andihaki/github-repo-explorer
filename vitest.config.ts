import path from "path";
import { defineConfig } from "vitest/config";

import { resolver } from "./resolver.config";

export default defineConfig(({ mode }) => ({
  css: {
    modules:
      mode !== "test"
        ? {}
        : {
            generateScopedName: (name) => name,
          },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: path.resolve(__dirname, "src/tests/setUpTests.ts"),
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.tsx", "src/tests", "src/**/*.test.{ts,tsx}"],
      reportsDirectory: "./coverage",
    },
  },
  resolve: resolver,
}));
