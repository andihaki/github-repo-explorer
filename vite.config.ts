import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    plugins: [react(), tsconfigPaths()],
    base: isDevelopment ? "" : "/github-repo-explorer/",
  };
});
