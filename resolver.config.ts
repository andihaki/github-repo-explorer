import path from "path";

export const resolver = {
  extensions: [".js", ".ts", ".jsx", ".tsx"],
  alias: {
    "@/assets": path.resolve(__dirname, "src/assets/"),
    "@/components": path.resolve(__dirname, "src/components/"),
    "@/pages": path.resolve(__dirname, "src/pages/"),
    "@/helpers": path.resolve(__dirname, "src/helpers/"),

    "@/config": path.resolve(__dirname, "src/config/"),
    "@/tests": path.resolve(__dirname, "src/tests/"),
  },
};
